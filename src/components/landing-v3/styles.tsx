// Styles for the v3 landing. Prefixed `v3-` so they can't touch the current homepage.
// Brand: navy #0d172b + orange #ff6b1a (same as the live site), fonts from layout.tsx.

const css = `
.v3-page{--wc-navy:#0d172b;--wc-orange:#ff6b1a;--n:#0d172b;--n2:#16223a;--o:#ff6b1a;--o2:#ff8a47;--bg:#f6f7f9;--ink:#10182b;--mut:#5d6779;--line:#e4e7ed;
  background:var(--bg);color:var(--ink);font-family:var(--font-body);overflow-x:clip}
.v3-page h1,.v3-page h2,.v3-page h3,.v3-page b,.v3-page strong,.v3-logo{font-family:var(--font-display)}
.v3-page em{font-style:normal;color:var(--o)}

/* nav */
.v3-nav{position:fixed;inset:0 0 auto;z-index:50;height:64px;display:flex;align-items:center;gap:28px;padding:0 5vw;
  background:rgba(13,23,43,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.06)}
.v3-logo{display:flex;align-items:center;gap:10px;color:#fff;font-weight:800;font-size:19px;text-decoration:none}
.v3-navlinks{display:flex;gap:26px;margin-left:auto}.v3-navlinks a{color:rgba(255,255,255,.75);font-size:14px;text-decoration:none}.v3-navlinks a:hover{color:#fff}
.v3-nav-cta{display:inline-flex;align-items:center;gap:8px;background:var(--o);color:#fff;font-weight:700;font-size:14px;padding:10px 16px;border-radius:999px;text-decoration:none;transition:transform .2s,background .2s}
.v3-nav-cta:hover{background:var(--o2);transform:translateY(-1px)}
.v3-menu{display:none;margin-left:auto;background:none;border:0;color:#fff}
.v3-mobile-nav{position:fixed;top:64px;inset-inline:0;z-index:49;background:var(--n);padding:12px 5vw 20px;display:grid;gap:4px}
.v3-mobile-nav a{color:#fff;padding:12px 0;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.08)}

/* story + 3D stage */
.v3-story{position:relative;overflow:clip;color:#fff;background:radial-gradient(1200px 700px at 75% 35%,#1b2a4a 0%,var(--n) 55%,#0a1222 100%)}
.v3-stage{position:sticky;top:0;height:100vh;height:100svh;margin-bottom:-100vh;margin-bottom:-100svh;z-index:0;pointer-events:none;overflow:hidden}
.v3-canvas{position:absolute!important;inset:0}
.v3-stage-glow{position:absolute;inset:0;background:radial-gradient(600px 420px at 72% 50%,rgba(255,107,26,.12),transparent 70%)}
.v3-hero,.v3-chapter,.v3-preview{position:relative;z-index:1}
.v3-hero{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:110px 5vw 70px}
.v3-hero-copy{max-width:600px}
.v3-pill{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:#ffd2b8;background:rgba(255,107,26,.12);border:1px solid rgba(255,107,26,.3);padding:7px 13px;border-radius:999px}
.v3-hero h1{font-size:clamp(40px,5.6vw,74px);line-height:1.02;letter-spacing:-.03em;font-weight:800;margin:22px 0 20px}
.v3-wm{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.06em;margin-right:.24em}.v3-w{display:inline-block}
.v3-lede{font-size:clamp(16px,1.35vw,19px);line-height:1.6;color:rgba(255,255,255,.78);max-width:540px}.v3-lede b{color:#fff}
.v3-funnel{margin-top:26px}
.v3-trust{display:flex;flex-wrap:wrap;gap:18px;margin-top:20px;font-size:13px;color:rgba(255,255,255,.7)}
.v3-trust span{display:inline-flex;align-items:center;gap:6px}.v3-trust svg{width:16px;height:16px;color:#32d583}

/* funnel */
.v3-form,.v3-questions,.v3-progress{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:16px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.v3-source+.v3-source{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.1)}
.v3-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.v3-tabs button{font-size:12.5px;padding:6px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:transparent;color:rgba(255,255,255,.8);cursor:pointer}
.v3-tabs button.on{background:#fff;color:var(--n);border-color:#fff;font-weight:700}.v3-tabs button:disabled{opacity:.35;cursor:not-allowed}
.v3-tabs .v3-tab-x{margin-left:auto;padding:6px 8px}
.v3-page input,.v3-page textarea{width:100%;font:inherit;font-size:16px;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:12px;padding:13px 14px;outline:none}
.v3-form input+textarea,.v3-form textarea+small{margin-top:8px}
.v3-page input:focus,.v3-page textarea:focus{border-color:var(--o);box-shadow:0 0 0 4px rgba(255,107,26,.18)}
.v3-form small,.v3-questions small{display:block;font-size:12px;color:rgba(255,255,255,.6);margin-top:6px}
.v3-exp{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.v3-exp button{text-align:left;padding:11px 13px;border-radius:12px;border:1px solid rgba(255,255,255,.16);background:transparent;color:#fff;cursor:pointer}
.v3-exp button b{display:block;font-size:14px}.v3-exp button span{font-size:12px;color:rgba(255,255,255,.65)}
.v3-exp button.on{border-color:var(--o);background:rgba(255,107,26,.14)}
.v3-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-top:14px}
.v3-add{background:none;border:0;color:rgba(255,255,255,.75);font-size:13.5px;display:inline-flex;gap:6px;align-items:center;cursor:pointer}
.v3-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--o);color:#fff;font-weight:700;font-size:15px;border:0;border-radius:12px;padding:13px 20px;cursor:pointer;text-decoration:none;transition:transform .2s,background .2s,box-shadow .2s;box-shadow:0 10px 30px -10px rgba(255,107,26,.6)}
.v3-btn:hover{background:var(--o2);transform:translateY(-1px)}.v3-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.v3-btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.25);box-shadow:none}
.v3-error{display:flex;gap:6px;align-items:center;color:#ffb4a6;font-size:13.5px;margin-top:10px}
.v3-questions>p{font-size:14px;color:rgba(255,255,255,.8);margin:0 0 6px}
.v3-questions fieldset{border:0;padding:0;margin:14px 0 0}.v3-questions legend{font-weight:700;font-size:14.5px;margin-bottom:2px}
.v3-questions fieldset small{margin:0 0 8px}
.v3-chips{display:flex;flex-wrap:wrap;gap:6px}
.v3-chips button{padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-size:13px;cursor:pointer}
.v3-chips button.on{background:var(--o);border-color:var(--o)}
.v3-pstep{display:flex;align-items:center;gap:10px;font-size:14px;color:rgba(255,255,255,.5);padding:6px 0}
.v3-pstep span{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-size:12px;border:1px solid rgba(255,255,255,.2)}
.v3-pstep.active{color:#fff}.v3-pstep.active span{border-color:var(--o);color:var(--o)}
.v3-pstep.done{color:rgba(255,255,255,.8)}.v3-pstep.done span{background:#32d583;border-color:#32d583;color:var(--n)}
.v3-pbar{height:4px;border-radius:4px;background:rgba(255,255,255,.1);margin-top:10px;overflow:hidden}
.v3-pbar div{height:100%;background:linear-gradient(90deg,var(--o),#ffb37f);transition:width .6s ease}
.v3-ready{display:flex;align-items:center;gap:8px;color:#32d583;font-weight:600}
.v3-spin{animation:v3spin 1s linear infinite}@keyframes v3spin{to{transform:rotate(360deg)}}

/* preview */
.v3-preview{padding:90px 5vw 60px;text-align:center}
.v3-preview h2{font-size:clamp(30px,3.6vw,48px);margin:8px 0 10px;letter-spacing:-.02em}
.v3-preview>p{color:rgba(255,255,255,.75);max-width:620px;margin:0 auto}
.v3-iframe{margin:28px auto 0;max-width:1100px;height:min(78vh,760px);border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.15);box-shadow:0 40px 90px -30px rgba(0,0,0,.7);background:#fff}
.v3-iframe iframe{width:100%;height:100%;border:0}
.v3-preview-actions{display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap}

/* chapters */
.v3-chapter{min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:0 5vw}
.v3-chapter-card{max-width:500px;background:rgba(13,23,43,.5);border:1px solid rgba(255,255,255,.08);border-radius:22px;padding:34px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.v3-chapter-card h2{font-size:clamp(32px,3.8vw,52px);line-height:1.05;letter-spacing:-.025em;margin:10px 0 14px}
.v3-chapter-card p{color:rgba(255,255,255,.78);line-height:1.65;font-size:16.5px;margin:0}
.v3-chapter-price{display:block;margin-top:16px;font-weight:700;color:#fff}.v3-chapter-price s{color:rgba(255,255,255,.45);font-weight:500}
.v3-eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--o);margin:0}
.v3-eyebrow.light{color:#ffb37f}

/* static fallback stage */
.v3-static{position:absolute;inset:0}
.v3-static>div{position:absolute;top:50%;left:72%;transform:translate(-50%,-50%);transition:opacity .7s ease,transform .7s ease;opacity:0}
.v3-static-site{width:min(38vw,420px);aspect-ratio:3.2/2.2;border:1.5px solid rgba(135,147,166,.6);border-radius:10px;padding:8% 6%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6%;align-content:end}
.v3-static-site i{height:30%;min-height:30px;border:1px solid rgba(135,147,166,.45);border-radius:6px}.v3-static-site i:first-child{grid-column:1/-1;height:40px;background:rgba(135,147,166,.2)}
.v3-static-orb{width:min(30vw,320px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffd2b8,#ff6b1a 45%,#7a2b05 100%);box-shadow:0 0 120px rgba(255,107,26,.55)}
.v3-static-phone{width:min(14vw,150px);aspect-ratio:1/2;border:2px solid #fff;border-radius:22px;display:grid;place-items:center;color:var(--o);box-shadow:0 0 80px rgba(255,107,26,.4)}
.v3-static.ch0 .v3-static-site,.v3-static.ch1 .v3-static-orb,.v3-static.ch2 .v3-static-orb,.v3-static.ch3 .v3-static-phone{opacity:1}

/* light sections */
.v3-section{padding:110px 5vw;max-width:1180px;margin:0 auto}
.v3-section h2{font-size:clamp(32px,4vw,54px);line-height:1.05;letter-spacing:-.025em;margin:10px 0 36px;font-weight:800}
.v3-ba{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.v3-ba-col{border-radius:22px;padding:30px;border:1px solid var(--line);background:#fff}
.v3-ba-col h3{margin:0 0 16px;font-size:20px}
.v3-ba-col ul{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.v3-ba-col li{display:flex;gap:10px;align-items:flex-start;line-height:1.5;color:var(--mut)}.v3-ba-col li svg{flex:none;margin-top:3px}
.v3-ba-col.old li svg{color:#d0453a}
.v3-ba-col.new{background:var(--n);border-color:var(--n);color:#fff;box-shadow:0 30px 70px -30px rgba(13,23,43,.6)}
.v3-ba-col.new li{color:rgba(255,255,255,.85)}.v3-ba-col.new li svg{color:var(--o)}
.v3-dark{max-width:none;background:var(--n);color:#fff}
.v3-split{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.v3-muted-light{color:rgba(255,255,255,.75);line-height:1.65;font-size:17px;margin:-16px 0 26px}
.v3-call{display:inline-flex;align-items:center;gap:14px;background:#fff;color:var(--n);border-radius:16px;padding:14px 18px;text-decoration:none;transition:transform .2s}
.v3-call:hover{transform:translateY(-2px)}.v3-call span{display:grid}.v3-call small{color:var(--mut);font-size:12.5px}.v3-call>svg:first-child{color:var(--o)}
.v3-video{border-radius:22px;overflow:hidden;background:var(--n2);border:1px solid rgba(255,255,255,.08);min-height:360px}
.v3-video video{width:100%;display:block}
.v3-call-sim{position:relative;padding:34px 26px;display:flex;flex-direction:column;gap:10px}
.v3-sim-tag{position:absolute;top:12px;right:14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.v3-bubble{max-width:80%;margin:0;padding:11px 14px;border-radius:16px;font-size:14.5px;line-height:1.45;opacity:0;animation:v3bub .5s ease forwards}
.v3-bubble.caller{align-self:flex-start;background:rgba(255,255,255,.1);border-bottom-left-radius:4px}
.v3-bubble.ai{align-self:flex-end;background:var(--o);border-bottom-right-radius:4px}
@keyframes v3bub{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.v3-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.v3-card{background:#fff;border:1px solid var(--line);border-radius:20px;padding:26px;transition:transform .3s,box-shadow .3s}
.v3-card:hover{transform:translateY(-6px);box-shadow:0 24px 50px -24px rgba(13,23,43,.35)}
.v3-card svg{color:var(--o)}.v3-card h3{font-size:17px;margin:14px 0 6px}.v3-card p{color:var(--mut);font-size:14.5px;line-height:1.55;margin:0}
.v3-steps{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.v3-steps li{background:#fff;border:1px solid var(--line);border-radius:20px;padding:26px}
.v3-steps b{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--n);color:#fff}
.v3-steps h3{margin:14px 0 6px;font-size:18px}.v3-steps p{margin:0;color:var(--mut);line-height:1.55}
.v3-upsell{display:flex;gap:14px;align-items:flex-start;margin-top:22px;padding:20px 22px;border-radius:18px;background:rgba(255,107,26,.08);border:1px solid rgba(255,107,26,.25)}
.v3-upsell svg{color:var(--o);flex:none;margin-top:2px}.v3-upsell p{margin:0;line-height:1.6;color:var(--ink)}
.v3-faq{display:grid;gap:10px}
.v3-faq button{display:flex;justify-content:space-between;gap:16px;text-align:left;width:100%;background:#fff;border:1px solid var(--line);border-radius:16px;padding:18px 20px;cursor:pointer;font:inherit;color:var(--ink)}
.v3-faq b{font-size:16px}.v3-faq p{color:var(--mut);line-height:1.6;margin:8px 0 0}.v3-faq svg{flex:none;transition:transform .25s}.v3-faq svg.open{transform:rotate(180deg)}
.v3-footer{display:flex;flex-wrap:wrap;gap:16px 30px;align-items:center;justify-content:space-between;padding:34px 5vw;background:var(--n);color:rgba(255,255,255,.7);font-size:14px}
.v3-footer p{margin:0}.v3-footer div{display:flex;gap:18px}.v3-footer a{color:rgba(255,255,255,.8);text-decoration:none}
.v3-sticky{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:12px;background:var(--n);color:#fff;padding:10px 10px 10px 18px;border-radius:999px;box-shadow:0 20px 50px -15px rgba(0,0,0,.5);font-size:14px;max-width:calc(100vw - 24px)}
.v3-sticky a{display:inline-flex;align-items:center;gap:6px;background:var(--o);color:#fff;padding:9px 14px;border-radius:999px;text-decoration:none;font-weight:700;white-space:nowrap}
.v3-sticky button{background:none;border:0;color:rgba(255,255,255,.6);cursor:pointer}

@media (max-width:1024px){.v3-cards{grid-template-columns:1fr 1fr}}
@media (max-width:860px){
  .v3-navlinks,.v3-nav-cta{display:none}.v3-menu{display:block}
  .v3-hero{padding-top:96px;align-items:flex-start}
  .v3-hero h1{text-shadow:0 2px 30px rgba(13,23,43,.8)}
  .v3-chapter{align-items:flex-end;padding-bottom:9vh}
  .v3-chapter-card{padding:24px;background:rgba(13,23,43,.78)}
  .v3-static>div{left:50%;top:40%}
  .v3-ba,.v3-split,.v3-steps{grid-template-columns:1fr}.v3-split{gap:30px}
  .v3-section{padding:80px 5vw}
  .v3-exp{grid-template-columns:1fr}
  .v3-sticky span{display:none}
}
@media (max-width:520px){.v3-cards{grid-template-columns:1fr}.v3-row .v3-btn{width:100%}}
@media (prefers-reduced-motion:reduce){.v3-bubble{animation:none;opacity:1}.v3-static>div{transition:none}}

.v3-sitebuild{margin:12px 0 0;padding:10px 14px;border-radius:10px;background:rgba(255,107,26,.08);border:1px solid rgba(255,107,26,.25);font-size:15px}
`

export function V3Styles() {
  return <style>{css}</style>
}
