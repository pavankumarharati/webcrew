'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// One particle system, three shapes:
//   A = an old, grey website (nav bar, hero block, three cards, text lines)
//   B = the AI salesperson orb (sphere + a voice ring that ripples when it "talks")
//   C = a phone with ringing waves (the AI Reception upsell)
// GSAP ScrollTrigger writes into `SceneState`; the shader interpolates. One draw call.

import type { SceneState } from './scene-state'

const rand = (() => {
  // Deterministic PRNG so server/client and every visit look the same.
  let s = 1234567
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
})()

type Rect = [x: number, y: number, w: number, h: number, weight: number, fill?: boolean]

function sampleRects(rects: Rect[], n: number, out: Float32Array) {
  const total = rects.reduce((a, r) => a + r[4], 0)
  let i = 0
  for (const [x, y, w, h, wt, fill] of rects) {
    const count = Math.round((wt / total) * n)
    for (let k = 0; k < count && i < n; k++, i++) {
      let px: number, py: number
      if (fill) {
        // Text lines / filled blocks: scanlines.
        const rows = Math.max(1, Math.round(h / 0.07))
        py = y + h - (Math.floor(rand() * rows) + 0.5) * (h / rows)
        px = x + rand() * w
      } else {
        // Outline.
        const p = rand() * 2 * (w + h)
        if (p < w) { px = x + p; py = y }
        else if (p < w + h) { px = x + w; py = y + (p - w) }
        else if (p < 2 * w + h) { px = x + (p - w - h); py = y + h }
        else { px = x; py = y + (p - 2 * w - h) }
      }
      out[i * 3] = px + (rand() - 0.5) * 0.012
      out[i * 3 + 1] = py + (rand() - 0.5) * 0.012
      out[i * 3 + 2] = (rand() - 0.5) * 0.05
    }
  }
  // Leftovers (rounding) go on the outer frame.
  for (; i < n; i++) {
    out[i * 3] = -1.6 + rand() * 3.2; out[i * 3 + 1] = 1.1; out[i * 3 + 2] = 0
  }
}

function buildGeometry(n: number) {
  const posA = new Float32Array(n * 3)
  const posB = new Float32Array(n * 3)
  const posC = new Float32Array(n * 3)
  const aRand = new Float32Array(n)
  const aRing = new Float32Array(n)
  const aArc = new Float32Array(n)

  // A — old website, 3.2 × 2.2 centred on origin.
  sampleRects([
    [-1.6, -1.1, 3.2, 2.2, 14],            // browser frame
    [-1.6, 0.86, 3.2, 0.24, 6, true],      // top bar
    [-1.45, 0.1, 1.5, 0.55, 8, true],      // headline block
    [0.25, -0.05, 1.2, 0.75, 6],           // hero image box
    [-1.45, -0.05, 0.9, 0.08, 2, true],    // button
    [-1.45, -0.95, 0.88, 0.7, 4],          // card 1
    [-0.44, -0.95, 0.88, 0.7, 4],          // card 2
    [0.57, -0.95, 0.88, 0.7, 4],           // card 3
    [-1.35, -0.75, 0.6, 0.2, 2, true],     // card text
    [-0.34, -0.75, 0.6, 0.2, 2, true],
    [0.67, -0.75, 0.6, 0.2, 2, true],
  ], n, posA)

  // B — orb: 82% sphere (fibonacci), 18% voice ring.
  const ringStart = Math.floor(n * 0.82)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < ringStart; i++) {
    const y = 1 - (i / (ringStart - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const R = 1.05 + (rand() - 0.5) * 0.04
    posB[i * 3] = Math.cos(th) * r * R
    posB[i * 3 + 1] = y * R
    posB[i * 3 + 2] = Math.sin(th) * r * R
  }
  for (let i = ringStart; i < n; i++) {
    const a = rand() * Math.PI * 2
    const R = 1.55 + (rand() - 0.5) * 0.06
    posB[i * 3] = Math.cos(a) * R
    posB[i * 3 + 1] = Math.sin(a) * R * 0.28
    posB[i * 3 + 2] = Math.sin(a) * R * 0.9
    aRing[i] = 1
  }

  // C — phone (1.1 × 2.1) + three ringing arcs each side.
  const tmp = new Float32Array(n * 3)
  const phoneN = Math.floor(n * 0.72)
  sampleRects([
    [-0.55, -1.05, 1.1, 2.1, 12],          // body
    [-0.46, -0.85, 0.92, 1.68, 8],         // screen
    [-0.16, 0.92, 0.32, 0.04, 1, true],    // speaker
    [-0.3, -0.62, 0.6, 0.16, 3, true],     // "answer" button
    [-0.32, 0.25, 0.64, 0.32, 4, true],    // caller card
  ], phoneN, tmp)
  posC.set(tmp.subarray(0, phoneN * 3))
  for (let i = phoneN; i < n; i++) {
    const side = rand() < 0.5 ? -1 : 1
    const arc = Math.floor(rand() * 3)
    const R = 0.95 + arc * 0.28
    const a = (rand() - 0.5) * 1.1
    posC[i * 3] = side * Math.cos(a) * R
    posC[i * 3 + 1] = Math.sin(a) * R * 0.9 + 0.1
    posC[i * 3 + 2] = (rand() - 0.5) * 0.04
    aArc[i] = 1
  }

  for (let i = 0; i < n; i++) aRand[i] = rand()

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(posA, 3))
  g.setAttribute('posB', new THREE.BufferAttribute(posB, 3))
  g.setAttribute('posC', new THREE.BufferAttribute(posC, 3))
  g.setAttribute('aRand', new THREE.BufferAttribute(aRand, 1))
  g.setAttribute('aRing', new THREE.BufferAttribute(aRing, 1))
  g.setAttribute('aArc', new THREE.BufferAttribute(aArc, 1))
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 4)
  return g
}

const vertex = /* glsl */ `
  uniform float uMorph, uTime, uTalk, uPixel, uSize;
  attribute vec3 posB, posC;
  attribute float aRand, aRing, aArc;
  varying float vMix1, vMix2, vRand, vRing, vArc;

  void main() {
    float t1 = clamp(uMorph, 0.0, 1.0);
    float t2 = clamp(uMorph - 1.0, 0.0, 1.0);
    // Staggered per-point so the shape dissolves rather than slides.
    float e1 = smoothstep(aRand * 0.45, aRand * 0.45 + 0.55, t1);
    float e2 = smoothstep(aRand * 0.45, aRand * 0.45 + 0.55, t2);

    vec3 a = position;
    // Old site: faint "dead page" drift.
    a.z += sin(uTime * 0.6 + aRand * 40.0) * 0.015;

    vec3 b = posB;
    float breathe = 1.0 + 0.025 * sin(uTime * 1.6) + 0.05 * uTalk * sin(uTime * 7.0 + aRand * 6.28);
    b *= breathe;
    if (aRing > 0.5) {
      float ang = atan(b.z, b.x);
      float wave = sin(ang * 9.0 + uTime * 5.0) * 0.5 + sin(ang * 4.0 - uTime * 3.0) * 0.5;
      b += normalize(vec3(b.x, 0.0, b.z)) * wave * 0.16 * uTalk;
      b.y += wave * 0.06 * uTalk;
    }

    vec3 c = posC;
    if (aArc > 0.5) {
      float pulse = fract(uTime * 0.9 + aRand * 0.2);
      c *= 1.0 + pulse * 0.08;
    }

    vec3 p = mix(mix(a, b, e1), c, e2);
    // Swirl mid-transition.
    float mid = sin(3.14159 * e1) + sin(3.14159 * e2);
    p += vec3(sin(aRand * 91.0 + uTime), cos(aRand * 57.0 + uTime * 0.8), sin(aRand * 23.0)) * 0.35 * mid;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.6 + aRand * 0.8) * (1.0 + 0.6 * mid);
    gl_PointSize = size * uPixel / -mv.z;

    vMix1 = e1; vMix2 = e2; vRand = aRand; vRing = aRing; vArc = aArc;
  }
`

const fragment = /* glsl */ `
  uniform float uDim, uTalk, uTime;
  varying float vMix1, vMix2, vRand, vRing, vArc;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);

    vec3 grey   = vec3(0.62, 0.68, 0.8);
    vec3 orange = vec3(1.0, 0.42, 0.10);
    vec3 warm   = vec3(1.0, 0.78, 0.55);
    vec3 white  = vec3(0.95, 0.97, 1.0);

    vec3 orbCol = mix(orange, warm, step(0.82, vRand));
    if (vRing > 0.5) orbCol = mix(orange, white, 0.35 + 0.4 * uTalk);
    vec3 phoneCol = mix(white, orange, clamp(vArc + step(0.86, vRand) * 0.6, 0.0, 1.0));

    vec3 col = mix(mix(grey, orbCol, vMix1), phoneCol, vMix2);
    float a = alpha * (0.62 + 0.18 * vMix1 - 0.1 * vMix2) * uDim;
    gl_FragColor = vec4(col * a, a);
  }
`

function Particles({ state, count }: { state: SceneState; count: number }) {
  const geometry = useMemo(() => buildGeometry(count), [count])
  const group = useRef<THREE.Group>(null)
  const { viewport, size, gl } = useThree()
  const uniforms = useMemo(() => ({
    uMorph: { value: 0 }, uTime: { value: 0 }, uTalk: { value: 0 }, uDim: { value: 1 },
    uPixel: { value: 1 }, uSize: { value: 0.042 },
  }), [])
  const pointer = useRef({ x: 0, y: 0 })
  const mat = useRef<THREE.ShaderMaterial>(null)

  useFrame((s, delta) => {
    // three copies the uniforms object on the material: always write to the material's own.
    const u = (mat.current?.uniforms ?? uniforms) as typeof uniforms
    u.uTime.value += Math.min(delta, 0.05)
    // Ease toward the scroll target so scrubbing never looks stepped.
    u.uMorph.value += (state.morph - u.uMorph.value) * 0.12
    u.uTalk.value += (state.talk - u.uTalk.value) * 0.08
    u.uDim.value += (state.dim - u.uDim.value) * 0.1
    u.uPixel.value = size.height * gl.getPixelRatio() * 0.5

    pointer.current.x += (s.pointer.x - pointer.current.x) * 0.05
    pointer.current.y += (s.pointer.y - pointer.current.y) * 0.05
    const g = group.current
    if (g) {
      // Fit: the website panel is 3.2 wide; never let it clip on narrow screens.
      const fit = viewport.width < 3 ? viewport.width / 3.4 : Math.min(0.82, viewport.width / 4.6)
      g.scale.setScalar(fit)
      g.position.x += (state.shift * fit - g.position.x) * 0.08
      g.position.y += (state.lift - g.position.y) * 0.08
      const spin = u.uMorph.value > 0.5 && u.uMorph.value < 1.5 ? u.uTime.value * 0.25 : 0
      g.rotation.y = pointer.current.x * 0.25 + spin * (1 - Math.abs(u.uMorph.value - 1))
      g.rotation.x = -pointer.current.y * 0.15
    }
  })

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={mat}
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function MorphScene({ state, active, mobile }: { state: SceneState; active: boolean; mobile: boolean }) {
  return (
    <Canvas
      className="v3-canvas"
      dpr={[1, mobile ? 1.25 : 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <Particles state={state} count={mobile ? 3200 : 7000} />
    </Canvas>
  )
}
