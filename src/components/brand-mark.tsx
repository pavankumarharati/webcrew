'use client'

// Animated brand mark — the AI-crew face, recolored to the site's actual
// palette (blue→purple gradient, not the widget's navy/orange), reused as
// the logo everywhere a static image used to sit. Same breathe/blink idle
// loop as MiniFace in avatar-widget.tsx, decoupled from widget state.
export default function BrandMark({ size = 32 }: { size?: number }) {
  const eye = Math.max(3, size * 0.14)
  const mouthW = size * 0.42
  const mouthH = mouthW * 0.3
  const mouthBorder = Math.max(1.25, size * 0.055)

  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%', position: 'relative', flexShrink: 0,
        background: 'radial-gradient(circle at 35% 30%, #16233f, var(--wc-navy, #0b1220))',
      }}
    >
      <style>{`
        @keyframes wc-mark-blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.1); } }
        @keyframes wc-mark-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        .wc-mark-eye { animation: wc-mark-blink 4.5s ease-in-out infinite; }
        .wc-mark-idle { animation: wc-mark-breathe 3.2s ease-in-out infinite; }
      `}</style>
      <div className="wc-mark-idle" style={{ position: 'absolute', inset: 0 }}>
        <div className="wc-mark-eye" style={{ position: 'absolute', top: size * 0.32, left: size * 0.28, width: eye, height: eye, borderRadius: '50%', background: '#fff' }} />
        <div className="wc-mark-eye" style={{ position: 'absolute', top: size * 0.32, right: size * 0.28, width: eye, height: eye, borderRadius: '50%', background: '#fff' }} />
        <div style={{
          position: 'absolute', bottom: size * 0.274, left: '50%', transform: 'translateX(-50%)',
          width: mouthW, height: mouthH, borderRadius: `0 0 ${mouthW}px ${mouthW}px`,
          borderTop: 'none', borderLeft: `${mouthBorder}px solid var(--wc-orange, #ff6b1a)`,
          borderRight: `${mouthBorder}px solid var(--wc-orange, #ff6b1a)`,
          borderBottom: `${mouthBorder}px solid var(--wc-orange, #ff6b1a)`,
        }} />
      </div>
    </div>
  )
}
