'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Mic, MicOff, Send, X } from 'lucide-react'

// Floating "talk to WebCrew" avatar widget — the front door of webcrew.app.
// Voice + text chat with the same Gemini Live sales brain that answers the
// live demo phone number, streamed over a WebSocket to the AI Reception
// Cloud Run service (pipeline/src/reception/browser-relay.ts).
//
// The face is a CSS/canvas-free animated avatar (no pre-rendered video to
// generate, host, or keep in sync) — a ring that glows while WebCrew is
// speaking and a mouth shape that reacts to the actual output audio's
// amplitude per chunk, plus an idle breathing/blink loop. $0 marginal cost,
// no asset pipeline, works identically on every load.

const WS_URL = process.env.NEXT_PUBLIC_WIDGET_WS_URL ?? 'wss://ai-reception-459352382653.us-central1.run.app/widget-ws'
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const NAVY = '#0d172b'
const ORANGE = '#ff6b1a'

type Status = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error' | 'ended'
type TranscriptLine = { role: 'ai' | 'visitor'; text: string }

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; size: 'invisible'; callback: (token: string) => void }) => string
      reset: (id?: string) => void
    }
  }
}

// ─── PCM helpers ───────────────────────────────────────────────────────────

function floatTo16BitPCM(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length)
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]))
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return out
}

// Box-filter (averaging) decimation, not point sampling. Naive nearest-neighbor
// downsampling (picking every Nth sample) introduces aliasing that measurably
// degrades Gemini's speech transcription — found 2026-08-23 auditing a real
// conversation where the model's actual comprehension stayed correct (replies
// tracked context fine) but its displayed transcript randomly rendered clearly-
// English speech in Hindi/Telugu script, consistent with STT struggling on
// degraded/aliased audio rather than a language-detection bug.
function downsampleTo16k(input: Float32Array, inputRate: number): Float32Array {
  if (inputRate === 16000) return input
  const ratio = inputRate / 16000
  const outLength = Math.floor(input.length / ratio)
  const out = new Float32Array(outLength)
  for (let i = 0; i < outLength; i++) {
    const start = Math.floor(i * ratio)
    const end = Math.min(input.length, Math.floor((i + 1) * ratio))
    let sum = 0
    for (let j = start; j < end; j++) sum += input[j]
    out[i] = end > start ? sum / (end - start) : input[start] ?? 0
  }
  return out
}

function int16ToBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary)
}

function base64ToInt16(b64: string): Int16Array {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Int16Array(bytes.buffer)
}

function rmsOf(pcm: Int16Array): number {
  if (pcm.length === 0) return 0
  let sum = 0
  for (let i = 0; i < pcm.length; i++) sum += pcm[i] * pcm[i]
  return Math.sqrt(sum / pcm.length) / 32768
}

export default function AvatarWidget() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [mouthLevel, setMouthLevel] = useState(0)
  const [transcript, setTranscript] = useState<TranscriptLine[]>([])
  const [textInput, setTextInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [sectionCaption, setSectionCaption] = useState<string | null>(null)

  const panelRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const captureCtxRef = useRef<AudioContext | null>(null)
  const playbackCtxRef = useRef<AudioContext | null>(null)
  const nextPlayTimeRef = useRef(0)
  const streamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const turnstileTokenRef = useRef<string>('')
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current,
        { yPercent: 8, opacity: 0, scale: 0.96 },
        { yPercent: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [open])

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [transcript])

  useEffect(() => () => teardown(), [])

  // Scroll companion — a section-authored caption (data-avatar-caption on each
  // <section>) surfaces in a speech bubble as it becomes the most-visible one,
  // so the avatar "roams" the page narrating without any per-scroll AI call.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-avatar-caption]'))
    if (targets.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      let best: { ratio: number; caption: string } | null = null
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const caption = (entry.target as HTMLElement).dataset.avatarCaption ?? ''
        if (!best || entry.intersectionRatio > best.ratio) best = { ratio: entry.intersectionRatio, caption }
      }
      if (best) setSectionCaption(prev => (prev === best!.caption ? prev : best!.caption))
    }, { threshold: 0, rootMargin: '-35% 0px -35% 0px' })
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (bubbleRef.current) {
      gsap.fromTo(bubbleRef.current,
        { y: 6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [sectionCaption])

  function openWidget() {
    setOpen(true)
    if (status === 'idle' || status === 'ended' || status === 'error') startSession()
  }

  function teardown() {
    wsRef.current?.close()
    wsRef.current = null
    processorRef.current?.disconnect()
    processorRef.current = null
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    captureCtxRef.current?.close().catch(() => {})
    captureCtxRef.current = null
    playbackCtxRef.current?.close().catch(() => {})
    playbackCtxRef.current = null
  }

  async function getTurnstileToken(): Promise<string> {
    if (!TURNSTILE_SITE_KEY) return ''
    if (!window.turnstile) {
      await new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.async = true
        script.onload = () => resolve()
        document.head.appendChild(script)
      })
    }
    return new Promise((resolve) => {
      const container = document.createElement('div')
      document.body.appendChild(container)
      window.turnstile?.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        size: 'invisible',
        callback: (token: string) => { resolve(token); container.remove() },
      })
      setTimeout(() => resolve(''), 8000) // don't hang the widget forever if Turnstile fails to load
    })
  }

  // Connects the WS + Gemini session — text chat works off this alone.
  // Mic capture is layered on separately via startMic() so a denied/failed
  // mic permission degrades to text-only instead of blocking the session.
  async function startSession() {
    setErrorMsg('')
    setStatus('connecting')
    setTranscript([])

    try {
      turnstileTokenRef.current = await getTurnstileToken()

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const playbackCtx: AudioContext = new AudioCtx()
      playbackCtxRef.current = playbackCtx
      nextPlayTimeRef.current = playbackCtx.currentTime

      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'start', turnstileToken: turnstileTokenRef.current }))
      }

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        if (msg.type === 'ready') {
          setStatus('listening')
          startMic() // best-effort — failure here just means text-only, session already connected
        } else if (msg.type === 'audio') {
          playChunk(msg.data)
        } else if (msg.type === 'text') {
          setTranscript(prev => {
            const last = prev[prev.length - 1]
            if (last && last.role === msg.role) return [...prev.slice(0, -1), { role: msg.role, text: last.text + msg.text }]
            return [...prev, { role: msg.role, text: msg.text }]
          })
        } else if (msg.type === 'interrupted') {
          nextPlayTimeRef.current = playbackCtx.currentTime
        } else if (msg.type === 'error') {
          setErrorMsg(msg.message ?? 'Something went wrong.')
          setStatus('error')
        } else if (msg.type === 'closed') {
          setStatus('ended')
        }
      }
      ws.onerror = () => { setErrorMsg('Connection error.'); setStatus('error') }
      ws.onclose = (event) => {
        // A server rejection (bad origin, daily cap, missing config) closes
        // the socket directly with a non-1000 code and never sends a JSON
        // 'error'/'closed' message first — this is the only signal for that
        // case, so it must also release the mic/audio contexts.
        teardown()
        if (event.code !== 1000) {
          setErrorMsg(event.reason || 'Connection closed unexpectedly.')
          setStatus('error')
        } else {
          setStatus(s => (s === 'error' ? s : 'ended'))
        }
      }
    } catch {
      setErrorMsg('Could not connect. You can still try again, or type below.')
      setStatus('error')
    }
  }

  // Mic capture — independent of the WS session so it can be retried without
  // reconnecting. Downsamples to 16kHz PCM16, sent as base64 JSON frames.
  async function startMic() {
    if (streamRef.current) return // already capturing
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1 } })
      streamRef.current = stream

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const captureCtx: AudioContext = new AudioCtx()
      captureCtxRef.current = captureCtx

      const source = captureCtx.createMediaStreamSource(stream)
      const processor = captureCtx.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor
      processor.onaudioprocess = (e) => {
        const ws = wsRef.current
        if (!ws || ws.readyState !== WebSocket.OPEN) return
        const input = e.inputBuffer.getChannelData(0)
        const down = downsampleTo16k(input, captureCtx.sampleRate)
        const pcm = floatTo16BitPCM(down)
        ws.send(JSON.stringify({ type: 'audio', data: int16ToBase64(pcm) }))
      }
      source.connect(processor)
      processor.connect(captureCtx.destination)
    } catch (e: any) {
      setErrorMsg(e?.name === 'NotAllowedError' ? 'Microphone access was denied. You can still type below.' : 'Could not start the microphone. You can still type below.')
    }
  }

  function stopMic() {
    processorRef.current?.disconnect()
    processorRef.current = null
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    captureCtxRef.current?.close().catch(() => {})
    captureCtxRef.current = null
  }

  function playChunk(base64Pcm24: string) {
    const ctx = playbackCtxRef.current
    if (!ctx) return
    const pcm = base64ToInt16(base64Pcm24)
    const level = rmsOf(pcm)
    setMouthLevel(level)
    setStatus('speaking')

    const float32 = new Float32Array(pcm.length)
    for (let i = 0; i < pcm.length; i++) float32[i] = pcm[i] / 32768
    const buffer = ctx.createBuffer(1, float32.length, 24000)
    buffer.copyToChannel(float32, 0)

    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.connect(ctx.destination)
    const startAt = Math.max(ctx.currentTime, nextPlayTimeRef.current)
    src.start(startAt)
    nextPlayTimeRef.current = startAt + buffer.duration
    src.onended = () => {
      if (ctx.currentTime >= nextPlayTimeRef.current - 0.02) {
        setMouthLevel(0)
        setStatus(s => (s === 'speaking' ? 'listening' : s))
      }
    }
  }

  function sendText() {
    const text = textInput.trim()
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'text', text }))
    setTranscript(prev => [...prev, { role: 'visitor', text }])
    setTextInput('')
  }

  function toggleMic() {
    if (streamRef.current) {
      stopMic()
    } else if (wsRef.current?.readyState === WebSocket.OPEN) {
      startMic() // session already connected — just (re)try the mic
    } else {
      startSession() // no session yet — start fresh (covers idle/ended/error states)
    }
  }

  function closePanel() {
    if (status === 'listening' || status === 'speaking' || status === 'connecting') {
      wsRef.current?.send(JSON.stringify({ type: 'stop' }))
    }
    teardown()
    setStatus('idle')
    setOpen(false)
  }

  const speaking = status === 'speaking'
  const active = status === 'listening' || status === 'speaking' || status === 'connecting'

  return (
    <>
      <style>{`
        @keyframes wc-avatar-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
        @keyframes wc-avatar-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        @keyframes wc-avatar-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(255,107,26,0.45); } 100% { box-shadow: 0 0 0 14px rgba(255,107,26,0); } }
        .wc-avatar-eye { animation: wc-avatar-blink 4.5s ease-in-out infinite; }
        .wc-avatar-face-idle { animation: wc-avatar-breathe 3.2s ease-in-out infinite; }
        .wc-avatar-launcher.wc-avatar-active { animation: wc-avatar-pulse-ring 1.6s ease-out infinite; }
      `}</style>

      {!open && sectionCaption && (
        <div
          ref={bubbleRef}
          onClick={openWidget}
          role="button"
          tabIndex={0}
          style={{
            position: 'fixed', bottom: 100, right: 24, zIndex: 9500,
            maxWidth: 240, background: '#fff', color: '#0f172a',
            borderRadius: '16px 16px 4px 16px', padding: '10px 14px',
            fontSize: 13, lineHeight: 1.4, fontFamily: 'var(--font-body, system-ui), sans-serif',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)', cursor: 'pointer',
          }}
        >
          {sectionCaption}
        </div>
      )}

      {!open && (
        <button
          onClick={openWidget}
          aria-label="Chat with WebCrew's AI"
          className={active ? 'wc-avatar-launcher wc-avatar-active' : 'wc-avatar-launcher'}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9500,
            width: 64, height: 64, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: `radial-gradient(circle at 35% 30%, #16233f, ${NAVY})`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <MiniFace speaking={speaking} />
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9500,
            width: 'min(360px, calc(100vw - 32px))', maxHeight: 'min(560px, calc(100vh - 48px))',
            display: 'flex', flexDirection: 'column',
            background: '#ffffff', borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden',
            fontFamily: 'var(--font-body, system-ui), sans-serif',
          }}
        >
          <div style={{ background: NAVY, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#16233f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MiniFace speaking={speaking} mouthLevel={mouthLevel} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>WebCrew AI</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
                {status === 'connecting' && 'Connecting…'}
                {status === 'listening' && 'Listening — say hi, or type below'}
                {status === 'speaking' && 'Speaking…'}
                {status === 'error' && (errorMsg || 'Unavailable')}
                {status === 'ended' && 'Chat ended'}
                {status === 'idle' && 'Starting…'}
              </div>
            </div>
            <button onClick={closePanel} aria-label="Close" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minHeight: 160 }}>
            {transcript.length === 0 && status !== 'error' && (
              <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
                Say hello, or ask what WebCrew can do for your business.
              </div>
            )}
            {transcript.map((line, i) => (
              <div key={i} style={{
                alignSelf: line.role === 'ai' ? 'flex-start' : 'flex-end',
                background: line.role === 'ai' ? '#f1f5f9' : ORANGE,
                color: line.role === 'ai' ? '#0f172a' : '#fff',
                borderRadius: 14, padding: '8px 12px', fontSize: 13.5, lineHeight: 1.45, maxWidth: '85%',
              }}>
                {line.text}
              </div>
            ))}
            {errorMsg && status === 'error' && (
              <div style={{ color: '#b91c1c', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                {errorMsg} Prefer to talk? Call <a href="tel:+19182555151" style={{ color: '#b91c1c', fontWeight: 700 }}>(918) 255-5151</a>.
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', padding: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={toggleMic}
              aria-label={streamRef.current ? 'End voice chat' : 'Start voice chat'}
              style={{
                width: 38, height: 38, borderRadius: '50%', border: 'none', flexShrink: 0, cursor: 'pointer',
                background: streamRef.current ? ORANGE : '#e2e8f0',
                color: streamRef.current ? '#fff' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {streamRef.current ? <Mic size={16} /> : <MicOff size={16} />}
            </button>
            <input
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendText() }}
              placeholder="Type a message…"
              style={{ flex: 1, border: '1px solid #e2e8f0', borderRadius: 100, padding: '9px 14px', fontSize: 13.5, outline: 'none' }}
            />
            <button
              onClick={sendText}
              aria-label="Send"
              style={{ width: 38, height: 38, borderRadius: '50%', border: 'none', background: NAVY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function MiniFace({ speaking, mouthLevel = 0 }: { speaking: boolean; mouthLevel?: number }) {
  const openHeight = 3 + Math.min(9, mouthLevel * 40)
  return (
    <div className={speaking ? '' : 'wc-avatar-face-idle'} style={{ width: 26, height: 26, position: 'relative' }}>
      <div className="wc-avatar-eye" style={{ position: 'absolute', top: 6, left: 4, width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
      <div className="wc-avatar-eye" style={{ position: 'absolute', top: 6, right: 4, width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
      {speaking ? (
        <div style={{
          position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)',
          width: 12, height: openHeight, borderRadius: 6,
          background: ORANGE, transition: 'height 60ms linear',
        }} />
      ) : (
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: 11, height: 4, borderRadius: '0 0 11px 11px',
          borderTop: 'none', borderLeft: `1.5px solid ${ORANGE}`, borderRight: `1.5px solid ${ORANGE}`, borderBottom: `1.5px solid ${ORANGE}`,
        }} />
      )}
    </div>
  )
}
