// Landing v4 styles. Warm paper + ink, one accent (WebCrew orange, darkened for contrast), one navy band.
const css = `
.l4{--paper:#f6f3ed;--paper-2:#efeae0;--ink:#15130f;--ink-2:#3b382f;--muted:#6a665c;--line:#e0dace;--accent:#c2410c;--accent-2:#9a3412;--navy:#0f1a2b;
  --r:14px;background:var(--paper);color:var(--ink);font-family:var(--l4-body),system-ui,sans-serif;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
.l4 *{box-sizing:border-box}
.l4 a{color:inherit}
.l4 h1,.l4 h2,.l4 h3{font-family:var(--l4-display),Georgia,serif;font-weight:500;letter-spacing:-.02em;line-height:1.06;margin:0}
.l4 h1{font-size:clamp(44px,6vw,80px);font-variation-settings:"opsz" 144}
.l4 h1 em,.l4 h2 em{font-style:italic;color:var(--accent)}
.l4 h2{font-size:clamp(32px,4vw,52px);font-variation-settings:"opsz" 120}
.l4 h3{font-size:22px;line-height:1.2}
.l4-wrap{max-width:1180px;margin:0 auto;padding:0 28px}
.l4-eyebrow{font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin:0 0 16px;display:flex;align-items:center;gap:10px}
.l4-eyebrow:before{content:"";width:22px;height:1.5px;background:currentColor}
.l4-eyebrow.light{color:#f4a77c}
.l4-lede{font-size:19px;color:var(--ink-2);max-width:560px;margin:22px 0 0}
.l4-muted{color:var(--muted);margin:14px 0 0}
.l4-muted-light{color:#b9c0cc;margin:18px 0 0;max-width:520px}

/* nav */
.l4-nav{position:sticky;top:0;z-index:30;background:rgba(246,243,237,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.l4-nav-in{display:flex;align-items:center;gap:28px;height:68px}
.l4-logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:19px;text-decoration:none;letter-spacing:-.01em}
.l4-nav nav{display:flex;gap:26px;margin-left:auto}
.l4-nav nav a{text-decoration:none;font-size:15px;color:var(--ink-2)}
.l4-nav nav a:hover{color:var(--ink)}
.l4-nav-call{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid var(--accent);background:var(--accent);color:#fff!important;border-radius:999px;font-size:14px;font-weight:700;text-decoration:none;white-space:nowrap}
.l4-nav-call:hover{background:var(--accent-2);border-color:var(--accent-2)}
.l4-topbar{display:flex;align-items:center;justify-content:center;gap:8px;padding:9px 16px;background:var(--ink);color:#fff!important;text-decoration:none;font-size:14px;letter-spacing:.02em;text-align:center}
.l4-topbar strong{font-weight:800}
.l4-topbar svg{color:#f4a77c;flex:none}
.l4-topbar:hover strong{text-decoration:underline}
@media (max-width:620px){.l4-topbar{font-size:12.5px;padding:8px 10px}.l4-topbar-sub,.l4-hide-sm{display:none}.l4-nav-call{padding:8px 12px;font-size:13px}}

/* buttons */
.l4-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--accent);color:#fff!important;border:0;border-radius:10px;padding:14px 20px;font:600 16px var(--l4-body),sans-serif;text-decoration:none;cursor:pointer;white-space:nowrap;transition:background .2s,transform .2s}
.l4-btn:hover{background:var(--accent-2)}
.l4-btn:active{transform:translateY(1px)}
.l4-btn:disabled{opacity:.5;cursor:not-allowed}
.l4-btn.ghost{background:transparent;color:var(--ink)!important;border:1px solid var(--line)}
.l4-btn.ghost:hover{border-color:var(--ink)}
.l4-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}

/* hero */
.l4-hero{padding:72px 0 64px}
.l4-hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.l4-funnel{margin-top:32px}
.l4-form label{display:block;font-size:14px;font-weight:600;margin-bottom:8px}
.l4-input{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:6px 6px 6px 16px;box-shadow:0 1px 2px rgba(20,18,12,.04),0 12px 32px -18px rgba(20,18,12,.25)}
.l4-input:focus-within{border-color:var(--ink)}
.l4-input svg{color:var(--muted);flex:none}
.l4-input input{flex:1;min-width:0;border:0;outline:0;font:17px var(--l4-body),sans-serif;background:transparent;padding:10px 0}
.l4-hint{font-size:14px;color:var(--muted);margin:10px 0 0}
.l4-trust{display:flex;flex-wrap:wrap;gap:8px 22px;list-style:none;padding:0;margin:22px 0 0;font-size:14px;color:var(--ink-2)}
.l4-trust li{display:flex;align-items:center;gap:6px}
.l4-trust svg{color:var(--accent)}
.l4-note{display:flex;gap:8px;align-items:center;margin:14px 0 0;padding:10px 14px;border-radius:10px;background:#fff6ef;border:1px solid #f5cdb4;font-size:15px}
.l4-error{color:#b42318;font-size:14px;display:flex;align-items:center;gap:6px;margin:10px 0 0}
.l4-ready{display:flex;gap:8px;align-items:center;font-weight:600}
.l4-ready svg{color:#15803d}
.l4-spin{animation:l4spin 1s linear infinite}
@keyframes l4spin{to{transform:rotate(360deg)}}

/* hero visual */
.l4-visual{position:relative;padding:20px 0 40px}
.l4-frame{border-radius:var(--r);overflow:hidden;background:#fff;border:1px solid var(--line);box-shadow:0 30px 60px -30px rgba(20,18,12,.35);transform:perspective(1600px) rotateY(-6deg) rotateX(2deg);transform-origin:left center}
.l4-frame img{display:block;width:100%;height:auto}
.l4-browser{display:flex;align-items:center;gap:6px;padding:10px 12px;background:#f1ede5;border-bottom:1px solid var(--line)}
.l4-browser span{width:10px;height:10px;border-radius:50%;background:#d8d1c3}
.l4-browser em{font-style:normal;font-size:12px;color:var(--muted);margin-left:10px}
.l4-card{position:absolute;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;box-shadow:0 18px 40px -18px rgba(20,18,12,.4);font-size:14px;max-width:270px;animation:l4float 6s ease-in-out infinite}
.l4-card p{margin:0}
.l4-card-h{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px!important}
.l4-card-chat{left:-34px;bottom:4px}
.l4-q{background:var(--paper-2);border-radius:10px 10px 10px 2px;padding:7px 10px;width:max-content;max-width:100%}
.l4-a{background:var(--ink);color:#fff;border-radius:10px 10px 2px 10px;padding:7px 10px;margin-top:6px!important}
.l4-card-call{right:-16px;top:-6px;animation-delay:-3s}
.l4-strong{font-weight:700;font-size:16px}
.l4-tag{display:flex;align-items:center;gap:6px;color:#15803d;font-weight:600;margin-top:4px!important}
.l4-example{position:absolute;right:0;bottom:6px;margin:0;font-size:12px;color:var(--muted)}
@keyframes l4float{50%{transform:translateY(-6px)}}

/* strip */
.l4-strip{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--paper-2)}
.l4-strip-in{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:22px;padding-bottom:22px;font-size:15px;font-weight:600;color:var(--ink-2)}
.l4-strip span{display:flex;align-items:center;gap:9px}
.l4-strip svg{color:var(--accent)}

/* sections */
.l4-sec{padding:112px 0}
.l4-paper{background:var(--paper-2)}
.l4-two{display:grid;grid-template-columns:1fr 1fr;gap:72px}
.l4-two.l4-center{align-items:center}
.l4-prose p{margin:0 0 18px;color:var(--ink-2);font-size:18px}
.l4-prose b{color:var(--ink)}
.l4-head{max-width:720px;margin-bottom:56px}
.l4-included{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line)}
.l4-included li{padding:32px 32px 36px 0;border-bottom:1px solid var(--line)}
.l4-included li:not(:nth-child(3n)){border-right:1px solid var(--line);margin-right:0}
.l4-included li:not(:nth-child(3n+1)){padding-left:32px}
.l4-num{display:block;font-family:var(--l4-display),serif;font-size:15px;color:var(--accent);margin-bottom:16px}
.l4-included p{color:var(--muted);margin:10px 0 0;font-size:16px}

/* dark */
.l4-dark{background:var(--navy);color:#fff}
.l4-dark h2{color:#fff}
.l4-call{display:inline-flex;align-items:center;gap:14px;margin-top:30px;padding:14px 18px;background:#fff;color:var(--ink)!important;border-radius:12px;text-decoration:none;font-weight:700;font-size:18px}
.l4-call span{display:flex;flex-direction:column}
.l4-call small{font-weight:500;font-size:13px;color:var(--muted)}
.l4-call svg:first-child{color:var(--accent)}
.l4-transcript{background:#152338;border:1px solid #23344f;border-radius:18px;padding:26px;display:flex;flex-direction:column;gap:10px}
.l4-bubble{margin:0;max-width:84%;padding:10px 14px;border-radius:14px;font-size:15px;line-height:1.45}
.l4-bubble.caller{background:#23344f;color:#e6ebf2;border-bottom-left-radius:4px}
.l4-bubble.ai{background:#fff;color:var(--ink);align-self:flex-end;border-bottom-right-radius:4px}
.l4-after{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;padding-top:14px;border-top:1px solid #23344f}
.l4-after span{display:inline-flex;align-items:center;gap:6px;font-size:13px;background:#1c2c45;color:#cfd7e3;padding:6px 10px;border-radius:999px}

/* steps */
.l4-steps{list-style:none;margin:0 0 64px;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.l4-steps b{display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid var(--ink);font-family:var(--l4-display),serif;font-weight:500;margin-bottom:18px}
.l4-steps p{color:var(--muted);margin:10px 0 0;font-size:16px}
.l4-shot{margin:0;border-radius:var(--r);overflow:hidden;border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(20,18,12,.4);background:#fff}
.l4-shot img{display:block;width:100%;height:auto}

/* pricing */
.l4-price-wrap{display:grid;grid-template-columns:1fr 440px;gap:72px;align-items:center}
.l4-price-wrap a{color:var(--accent)}
.l4-price{background:#fff;border:1px solid var(--line);border-radius:20px;padding:36px;box-shadow:0 30px 60px -36px rgba(20,18,12,.35)}
.l4-badge{display:inline-block;margin:0 0 18px;padding:5px 12px;border-radius:999px;background:#fff1e8;color:var(--accent-2);font-size:13px;font-weight:700}
.l4-amount{margin:0;font-size:18px;color:var(--muted);display:flex;align-items:baseline;gap:8px}
.l4-amount span{font-family:var(--l4-display),serif;font-size:64px;color:var(--ink);line-height:1;letter-spacing:-.03em}
.l4-amount s{font-size:18px}
.l4-price-sub{color:var(--muted);font-size:15px;margin:10px 0 22px}
.l4-price ul{list-style:none;padding:0;margin:0 0 26px;display:grid;gap:10px;font-size:15px}
.l4-price li{display:flex;gap:10px;align-items:flex-start}
.l4-price li svg{color:var(--accent);flex:none;margin-top:4px}
.l4-price .l4-btn{width:100%}
.l4-fine{display:flex;align-items:center;justify-content:center;gap:6px;font-size:13px;color:var(--muted);margin:12px 0 0}

/* faq */
.l4-faq{border-top:1px solid var(--line)}
.l4-faq>div{border-bottom:1px solid var(--line)}
.l4-faq button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;background:none;border:0;padding:22px 0;font:600 18px var(--l4-body),sans-serif;text-align:left;cursor:pointer;color:var(--ink)}
.l4-faq button svg{flex:none;transition:transform .2s;color:var(--muted)}
.l4-faq .open button svg{transform:rotate(180deg)}
.l4-faq p{margin:-6px 0 22px;color:var(--ink-2);max-width:620px}
.l4 #faq .l4-muted a{color:var(--accent)}

/* final + go live */
.l4-final{background:var(--paper-2);border-top:1px solid var(--line)}
.l4-final-in{text-align:center;max-width:640px;margin:0 auto}
.l4-final-in p{color:var(--muted);margin:16px 0 28px;font-size:18px}
.l4-golive{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.l4-mini{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:8px}
.l4-mini li{display:flex;gap:8px;align-items:center}
.l4-mini svg{color:var(--accent)}
.l4-golive-form{background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px;display:grid;gap:14px}
.l4-golive-form label{display:grid;gap:6px;font-size:14px;font-weight:600}
.l4-golive-form input:not([type=checkbox]){border:1px solid var(--line);border-radius:10px;padding:12px 14px;font:16px var(--l4-body),sans-serif;background:var(--paper)}
.l4-golive-form input:focus{outline:2px solid var(--ink);outline-offset:-1px}
.l4-consent{display:flex!important;grid-template-columns:none;gap:10px!important;font-weight:400!important;font-size:12.5px!important;color:var(--muted);line-height:1.45}
.l4-consent input{margin-top:3px}

/* result */
.l4-result{padding:24px 0 80px}
.l4-result-in{background:#fff;border:1px solid var(--line);border-radius:22px;padding:32px;box-shadow:0 40px 80px -40px rgba(20,18,12,.35)}
.l4-result-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;flex-wrap:wrap;margin-bottom:22px}
.l4-iframe{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:14px}
.l4-iframe iframe{display:block;width:100%;height:78vh;min-height:560px;border:0;background:#fff}

/* demo questions / progress */
.l4-questions{background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px;display:grid;gap:16px}
.l4-questions>p{margin:0;font-size:15px;color:var(--ink-2)}
.l4-questions fieldset{border:0;padding:0;margin:0;display:grid;gap:8px}
.l4-questions legend{font-weight:600;font-size:15px;margin-bottom:6px}
.l4-questions input,.l4-questions textarea{border:1px solid var(--line);border-radius:10px;padding:10px 12px;font:15px var(--l4-body),sans-serif}
.l4-chips{display:flex;flex-wrap:wrap;gap:8px}
.l4-chips button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:7px 13px;font:14px var(--l4-body),sans-serif;cursor:pointer}
.l4-chips button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.l4-progress{background:#fff;border:1px solid var(--line);border-radius:16px;padding:20px;display:grid;gap:10px}
.l4-pstep{display:flex;align-items:center;gap:10px;font-size:15px;color:var(--muted)}
.l4-pstep span{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;border:1px solid var(--line);font-size:12px}
.l4-pstep.active{color:var(--ink);font-weight:600}
.l4-pstep.done span{background:var(--ink);color:#fff;border-color:var(--ink)}
.l4-pbar{height:4px;background:var(--paper-2);border-radius:4px;overflow:hidden;margin-top:6px}
.l4-pbar div{height:100%;background:var(--accent);transition:width .6s}

/* footer */
.l4-foot{border-top:1px solid var(--line);padding:32px 0}
.l4-foot-in{display:flex;align-items:center;gap:24px;flex-wrap:wrap;font-size:14px;color:var(--muted)}
.l4-foot nav{margin-left:auto;display:flex;gap:20px}
.l4-foot nav a{text-decoration:none}

/* reveal */
.l4-reveal{opacity:0;transform:translateY(18px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.l4-reveal.in{opacity:1;transform:none}

.l4-tabs{display:inline-flex;background:var(--paper-2);border:1px solid var(--line);border-radius:12px;padding:4px;margin-bottom:14px}
.l4-tabs button{border:0;background:none;padding:9px 16px;border-radius:9px;font:600 15px var(--l4-body),sans-serif;color:var(--muted);cursor:pointer}
.l4-tabs button.on{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(20,18,12,.12)}
.l4-sub{margin:0 0 14px;font-size:15px;color:var(--muted)}
.l4-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:12px;margin-bottom:14px}
.l4-grid label{display:grid;gap:6px;font-size:14px;font-weight:600}
.l4-grid input{border:1px solid var(--line);border-radius:10px;padding:12px 14px;font:16px var(--l4-body),sans-serif;background:#fff}
.l4-grid input:focus{outline:2px solid var(--ink);outline-offset:-1px}
.l4-wide{width:100%}
.l4-callcta{display:block;text-decoration:none;margin-top:22px}
.l4-or{display:flex;align-items:center;gap:12px;font-size:13px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:14px}
.l4-or:before,.l4-or:after{content:"";height:1px;flex:1;background:var(--line)}
.l4-callcta-in{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:14px;background:var(--ink);color:#fff;transition:transform .2s,background .2s}
.l4-callcta:hover .l4-callcta-in{background:#000;transform:translateY(-1px)}
.l4-callcta-in svg{color:#f4a77c;flex:none}
.l4-callcta-in>span{display:flex;flex-direction:column;gap:2px}
.l4-callcta strong{font-size:18px;font-weight:700;letter-spacing:-.01em}
.l4-callcta small{font-size:14px;color:#c9c4b8}
.l4-final-row{justify-content:center}
.l4-hero-side{display:flex;flex-direction:column;gap:28px;min-width:0}
.l4-callcta-side{margin-top:0}
.l4-callcta-side .l4-callcta-in{padding:22px 24px;border-radius:18px;box-shadow:0 18px 40px -18px rgba(27,26,23,.55);border:2px solid var(--accent)}
.l4-callcta-side .l4-callcta-in svg{width:30px;height:30px}
.l4-callcta-side strong{font-size:22px}
.l4-callcta-form{display:none}
@media (max-width:980px){.l4-callcta-side{display:none}.l4-callcta-form{display:block}}
@media (max-width:980px){
  .l4-hero-grid,.l4-two,.l4-price-wrap,.l4-golive{grid-template-columns:1fr;gap:44px}
  .l4-included{grid-template-columns:1fr 1fr}
  .l4-included li,.l4-included li:not(:nth-child(3n+1)){padding:26px 22px 28px 0;border-right:0}
  .l4-included li:nth-child(odd){border-right:1px solid var(--line)}
  .l4-included li:nth-child(even){padding-left:22px}
  .l4-steps{grid-template-columns:1fr}
  .l4-nav nav{display:none}
  .l4-nav-call{margin-left:auto}
  .l4-sec{padding:80px 0}
  .l4-frame{transform:none}
}
@media (max-width:620px){
  .l4{font-size:16px}
  .l4-wrap{padding:0 20px}
  .l4-hero{padding:44px 0 40px}
  .l4-input{flex-wrap:wrap;padding:8px}
  .l4-input input{flex-basis:calc(100% - 40px)}
  .l4-input .l4-btn{width:100%}
  .l4-grid{grid-template-columns:1fr}
  .l4-included{grid-template-columns:1fr}
  .l4-included li,.l4-included li:nth-child(even){padding:24px 0;border-right:0!important}
  .l4-card-chat{left:-6px;bottom:-14px;max-width:220px}
  .l4-card-call{right:-6px;top:-18px}
  .l4-strip-in{justify-content:flex-start}
  .l4-result-in{padding:18px}
  .l4-iframe iframe{height:70vh}
  .l4-foot nav{margin-left:0}
}
@media (prefers-reduced-motion:reduce){.l4-card{animation:none}.l4-reveal{opacity:1;transform:none;transition:none}}
`

export function L4Styles() {
  return <style>{css}</style>
}
