// Shared between the page (GSAP writes) and the 3D scene (shader reads).
// Kept separate so importing it never pulls three.js into the page bundle.

export type SceneState = {
  morph: number   // 0 = website, 1 = orb, 2 = phone
  talk: number    // 0..1 voice-ring activity
  shift: number   // world-x offset (desktop: scene sits right of the copy)
  dim: number     // 0..1 overall brightness
  lift: number    // world-y offset (phones: scene sits above the chapter cards)
}

export const createSceneState = (): SceneState => ({ morph: 0, talk: 0, shift: 0, dim: 1, lift: 0 })
