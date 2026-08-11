import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  motion, AnimatePresence, useScroll, useSpring, useTransform,
  useMotionValueEvent, useReducedMotion, MotionConfig
} from "framer-motion";
import Icon from "./components/ui/Icon";
import GhIcon from "./components/ui/GhIcon";
import LiIcon from "./components/ui/LiIcon";
import R from "./components/ui/R";
import Magnetic from "./components/ui/Magnetic";
import Tilt from "./components/ui/Tilt";
import Stat from "./components/ui/Stat";
import Rotator from "./components/ui/Rotator";
import Cursor from "./components/ui/Cursor";
import { EASE } from "./components/ui/ease";

const CSS = `
@font-face{font-family:'Space Grotesk';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.woff2) format('woff2')}
@font-face{font-family:'Space Grotesk';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.woff2) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff2) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-500-normal.woff2) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-weight:600;font-display:swap;src:url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.woff2) format('woff2')}

.dbx{--bg:#F8F8F6;--card:#FFFFFF;--tx:#111111;--mut:#666666;--bd:#E8E8E8;--ac:#2563EB;--ac2:#06B6D4;--ok:#22C55E;
--sh:0 24px 60px -24px rgba(17,17,17,.14);--band:#111112;
font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--tx);min-height:100vh;overflow-x:clip;
-webkit-font-smoothing:antialiased;transition:background .5s ease,color .5s ease}
.dbx.dark{--bg:#0D0D0D;--card:#181818;--tx:#F5F5F4;--mut:#9C9C9C;--bd:#262626;--band:#141414;--sh:0 24px 60px -24px rgba(0,0,0,.65)}
.dbx *,.dbx *::before,.dbx *::after{box-sizing:border-box;margin:0;padding:0}
.dbx ::selection{background:rgba(37,99,235,.22)}
.dbx :focus-visible{outline:2px solid var(--ac);outline-offset:3px;border-radius:6px}
.dbx img{display:block;max-width:100%}
.dbx button{font:inherit;color:inherit;background:none;border:none;cursor:pointer}
.dbx a{color:inherit;text-decoration:none}
.dbx.cx, .dbx.cx a, .dbx.cx button{cursor:none}
.dbx.cx input,.dbx.cx textarea{cursor:text}
.hg{font-family:'Space Grotesk','Inter',sans-serif}
.grad{background:linear-gradient(92deg,var(--ac),var(--ac2));-webkit-background-clip:text;background-clip:text;color:transparent}
.shell{max-width:1400px;margin:0 auto;padding:0 clamp(16px,4vw,40px)}
section{position:relative;padding:clamp(72px,10vw,128px) 0;scroll-margin-top:96px}

.progress{position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--ac),var(--ac2));transform-origin:0 50%;z-index:999}
.cur-dot{position:fixed;top:0;left:0;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:var(--ac);z-index:1001;pointer-events:none}
.cur-ring{position:fixed;top:0;left:0;width:36px;height:36px;margin:-18px 0 0 -18px;border:1.5px solid color-mix(in srgb,var(--tx) 32%,transparent);border-radius:50%;z-index:1000;pointer-events:none;transition:width .25s,height .25s,margin .25s,border-color .25s,background .25s}
.cur-ring.hov{width:56px;height:56px;margin:-28px 0 0 -28px;border-color:var(--ac);background:rgba(37,99,235,.07)}
.loader{position:fixed;inset:0;background:var(--bg);z-index:1200;display:grid;place-items:center}
.loader .lb{font-family:'Space Grotesk';font-weight:700;font-size:clamp(64px,12vw,120px);letter-spacing:-.05em;display:flex}
.loader .lb span{display:inline-block;overflow:hidden}
.loader .lb i{display:inline-block;font-style:normal}
.loader .lb .o{color:transparent;-webkit-text-stroke:2px var(--tx)}
.loader .lline{width:200px;height:2px;background:var(--bd);margin:24px auto 0;overflow:hidden;border-radius:99px}
.loader .lsub{margin-top:16px;text-align:center;color:var(--mut);font-size:12px;letter-spacing:.35em;text-transform:uppercase}
.navwrap{position:fixed;top:16px;left:0;right:0;z-index:900;display:flex;justify-content:center;padding:0 16px}
.navpill{width:min(1400px,100%);display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 10px 10px 20px;border:1px solid var(--bd);border-radius:20px;background:color-mix(in srgb,var(--bg) 72%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:var(--sh)}
.logo{display:flex;align-items:center;gap:10px}
.logo-badge{width:36px;height:36px;border-radius:12px;background:var(--tx);color:var(--bg);display:grid;place-items:center;font-weight:700;font-size:14px;letter-spacing:-.02em}
.logo-name{font-weight:700;font-size:15px;letter-spacing:-.01em}
.navlinks{display:flex;gap:2px}
.nl{position:relative;padding:8px 12px;border-radius:999px;font-size:13.5px;font-weight:500;color:var(--mut);transition:color .25s}
.nl:hover{color:var(--tx)}
.nl.active{color:var(--tx)}
.nl.active::after{content:'';position:absolute;left:50%;bottom:1px;width:4px;height:4px;border-radius:50%;background:var(--ac);transform:translateX(-50%)}
.nav-actions{display:flex;align-items:center;gap:8px}
.iconbtn{width:40px;height:40px;border-radius:12px;border:1px solid var(--bd);background:var(--card);display:grid;place-items:center;transition:transform .25s,border-color .25s,box-shadow .25s}
.iconbtn:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--ac) 45%,var(--bd));box-shadow:0 8px 20px -10px rgba(37,99,235,.35)}
.nav-cta{display:none}
.menu-btn{display:none}
@media(min-width:1024px){.nav-cta{display:inline-flex}}
@media(max-width:1023px){.navlinks{display:none}.menu-btn{display:grid}}
@media(max-width:560px){.logo-name{display:none}}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:999px;font-weight:600;font-size:14px;border:1px solid transparent;transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s,background .3s,border-color .3s}
.btn-primary{background:var(--tx);color:var(--bg)}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 32px -14px rgba(17,17,17,.4)}
.btn-ghost{background:var(--card);border-color:var(--bd)}
.btn-ghost:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--ac) 45%,var(--bd));box-shadow:0 12px 28px -14px rgba(37,99,235,.3)}
.hero{padding-top:clamp(120px,17vh,170px);overflow:clip}
.herobg{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px);background-size:64px 64px;opacity:.4;mask-image:radial-gradient(ellipse 90% 70% at 50% 25%,black,transparent 75%);-webkit-mask-image:radial-gradient(ellipse 90% 70% at 50% 25%,black,transparent 75%)}
.orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.orb.a{width:560px;height:560px;top:-160px;left:-140px;background:radial-gradient(circle,rgba(37,99,235,.28),transparent 62%)}
.orb.b{width:520px;height:520px;top:-80px;right:-160px;background:radial-gradient(circle,rgba(6,182,212,.22),transparent 62%)}
.avail{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border:1px solid var(--bd);border-radius:999px;background:var(--card);font-size:12.5px;font-weight:600;color:var(--mut)}
.avail b{width:8px;height:8px;border-radius:50%;background:var(--ok);animation:pulse 2s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(34,197,94,.45)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
.hname{position:relative;z-index:1;margin-top:clamp(20px,3vw,36px);font-family:'Space Grotesk';font-weight:700;text-transform:uppercase;font-size:clamp(42px,9.2vw,132px);line-height:.95;letter-spacing:-.035em;display:flex;flex-wrap:wrap;column-gap:.045em}
.hname .outl{color:transparent;-webkit-text-stroke:2px var(--tx)}
.hname .w{display:inline-block;overflow:hidden}
.hname .wi{display:inline-block}
.hero-grid{position:relative;display:grid;grid-template-columns:1.05fr auto auto;gap:clamp(24px,4vw,56px);align-items:end;margin-top:clamp(16px,3vw,40px)}
.hleft{padding-bottom:8px;max-width:440px}
.roleline{font-family:'Space Grotesk';font-weight:700;font-size:clamp(22px,2.6vw,32px);letter-spacing:-.02em;display:flex;align-items:center;gap:10px}
.rotator{display:inline-block;overflow:hidden;height:1.25em;vertical-align:bottom}
.rotator>span{display:inline-block}
.hleft p{margin-top:16px;color:var(--mut);font-size:15.5px;line-height:1.7}
.hbtns{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.hmeta{display:flex;align-items:center;gap:8px;margin-top:24px;color:var(--mut);font-size:13px}
.portrait{position:relative;z-index:2;width:clamp(240px,26vw,380px);aspect-ratio:4/5;border-radius:220px 220px 28px 28px;overflow:hidden;border:1px solid var(--bd);box-shadow:var(--sh);margin-top:clamp(-150px,-7.5vw,-70px);background:var(--card)}
.portrait img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.05);transition:filter .7s ease,transform 1.2s cubic-bezier(.22,1,.36,1)}
.portrait:hover img{filter:grayscale(0);transform:scale(1.04)}
.hsocial{display:flex;flex-direction:column;gap:10px;padding-bottom:8px}
.spill{display:flex;align-items:center;gap:9px;padding:11px 18px;border:1px solid var(--bd);border-radius:999px;background:var(--card);font-size:13px;font-weight:600;transition:transform .3s,border-color .3s,box-shadow .3s}
.spill:hover{transform:translateX(-4px);border-color:color-mix(in srgb,var(--ac) 45%,var(--bd));box-shadow:0 10px 24px -12px rgba(37,99,235,.35)}
.shint{display:flex;align-items:center;gap:14px;color:var(--mut);font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;margin-top:clamp(48px,7vw,80px)}
.shint i{width:1.5px;height:44px;background:var(--bd);position:relative;overflow:hidden;border-radius:99px}
.shint i::after{content:'';position:absolute;inset:0;background:var(--ac);animation:drip 1.7s ease-in-out infinite}
@keyframes drip{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
@media(max-width:960px){
 .hero-grid{grid-template-columns:1fr}
 .portrait{order:-1;margin-top:0;width:min(320px,80%)}
 .hsocial{flex-direction:row;flex-wrap:wrap}
 .hleft{max-width:100%}
}
.marquee{overflow:hidden;border-block:1px solid var(--bd);padding:20px 0;background:var(--card)}
.marquee-track{display:flex;width:max-content;animation:marq 30s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.mgroup{display:flex;align-items:center;gap:56px;padding-right:56px}
.mitem{font-family:'Space Grotesk';font-weight:700;font-size:clamp(18px,2.4vw,28px);letter-spacing:.02em;text-transform:uppercase;white-space:nowrap;color:var(--mut)}
.mitem.o{color:transparent;-webkit-text-stroke:1px var(--mut)}
.msep{color:var(--ac)}
@keyframes marq{to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.marquee-track{animation:none}}
.shead{position:relative;display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(36px,5vw,64px)}
.sindex{font-size:13px;color:var(--ac);font-weight:600;letter-spacing:.14em}
.stitle{font-family:'Space Grotesk';font-size:clamp(34px,5.4vw,68px);font-weight:700;letter-spacing:-.03em}
.stitle .slash{color:var(--ac)}
.ghost{position:absolute;top:-14px;left:50%;transform:translateX(-50%);font-family:'Space Grotesk';font-weight:700;font-size:clamp(80px,17vw,230px);color:transparent;-webkit-text-stroke:1px var(--tx);opacity:.05;pointer-events:none;user-select:none;white-space:nowrap;letter-spacing:.02em}
.dbx.dark .ghost{opacity:.08}
.about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(32px,5vw,72px);align-items:start}
.about-txt h3{font-family:'Space Grotesk';font-size:clamp(22px,2.6vw,32px);font-weight:700;letter-spacing:-.02em;line-height:1.25}
.about-txt p{margin-top:20px;color:var(--mut);font-size:15.5px;line-height:1.8}
.traits{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.trait{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;padding:9px 16px;border:1px solid var(--bd);border-radius:999px;background:var(--card)}
.trait i{width:6px;height:6px;border-radius:50%;background:linear-gradient(90deg,var(--ac),var(--ac2))}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.stat{background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:24px;transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .35s}
.stat:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--ac) 40%,var(--bd));box-shadow:0 18px 40px -20px rgba(37,99,235,.3)}
.stat .ic{width:40px;height:40px;border-radius:12px;background:rgba(37,99,235,.09);color:var(--ac);display:grid;place-items:center;margin-bottom:16px}
.stat b{font-family:'Space Grotesk';font-size:clamp(30px,3.4vw,42px);font-weight:700;letter-spacing:-.03em;display:block}
.stat span{display:block;margin-top:6px;color:var(--mut);font-size:13px;font-weight:500}
@media(max-width:960px){.about-grid{grid-template-columns:1fr}}
.frow{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
.fchip{padding:10px 18px;border:1px solid var(--bd);border-radius:999px;background:var(--card);font-size:13px;font-weight:600;color:var(--mut);transition:all .3s}
.fchip:hover{color:var(--tx);transform:translateY(-2px)}
.fchip.on{background:var(--tx);color:var(--bg);border-color:var(--tx)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
@media(max-width:900px){.pgrid{grid-template-columns:1fr}}
.pcard{background:var(--card);border:1px solid var(--bd);border-radius:24px;overflow:hidden;box-shadow:var(--sh);display:flex;flex-direction:column;transition:border-color .3s}
.pcard:hover{border-color:color-mix(in srgb,var(--ac) 35%,var(--bd))}
.pimg{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--bd)}
.pimg img{width:100%;height:100%;object-fit:cover;transition:transform 1.1s cubic-bezier(.22,1,.36,1)}
.pcard:hover .pimg img{transform:scale(1.06)}
.pimg::after{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.18) 50%,transparent 70%);transform:translateX(-120%);transition:transform 1s ease}
.pcard:hover .pimg::after{transform:translateX(120%)}
.pcat{position:absolute;top:16px;left:16px;padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--card) 82%,transparent);backdrop-filter:blur(8px);font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tx)}
.pbody{padding:28px;display:flex;flex-direction:column;gap:14px;flex:1}
.pbody h3{font-family:'Space Grotesk';font-size:22px;font-weight:700;letter-spacing:-.02em}
.pbody p{color:var(--mut);font-size:14.5px;line-height:1.7}
.ptags{display:flex;flex-wrap:wrap;gap:8px}
.ptag{font-size:12px;font-weight:600;color:var(--mut);padding:6px 12px;border:1px solid var(--bd);border-radius:999px;background:var(--bg)}
.pacts{display:flex;gap:10px;margin-top:auto;padding-top:10px}
.pbtn{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;padding:10px 16px;border-radius:999px;border:1px solid var(--bd);transition:all .3s}
.pbtn:hover{border-color:var(--ac);color:var(--ac);transform:translateY(-2px)}
.pbtn.solid{background:var(--tx);color:var(--bg);border-color:var(--tx)}
.pbtn.solid:hover{color:var(--bg);transform:translateY(-2px);box-shadow:0 10px 24px -12px rgba(17,17,17,.5)}
.band{background:var(--band);color:#F8F8F6;border-block:1px solid var(--bd)}
.band .stitle .slash{color:var(--ac2)}
.band .ghost{-webkit-text-stroke-color:#fff;opacity:.06}
.bandhead{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap}
.bandnote{color:rgba(248,248,246,.55);font-size:14px;font-weight:500}
.xrow{display:grid;grid-template-columns:1.2fr .8fr;gap:24px;padding:32px 0;border-bottom:1px solid rgba(255,255,255,.12);transition:padding-left .35s cubic-bezier(.22,1,.36,1)}
.xrow:last-child{border-bottom:none}
.xrow:hover{padding-left:16px}
.xrow h3{font-family:'Space Grotesk';font-size:clamp(20px,2.4vw,28px);font-weight:700;letter-spacing:-.02em}
.xrow .org{color:var(--ac2);font-weight:600;font-size:14px;margin-top:6px}
.xrow p{color:rgba(248,248,246,.6);font-size:14px;line-height:1.7;margin-top:10px;max-width:520px}
.xrow .per{justify-self:end;align-self:start;color:rgba(248,248,246,.55);font-size:13px;font-weight:600;letter-spacing:.06em;padding:8px 14px;border:1px solid rgba(255,255,255,.16);border-radius:999px;white-space:nowrap}
@media(max-width:760px){.xrow{grid-template-columns:1fr}.xrow .per{justify-self:start}}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:960px){.sgrid{grid-template-columns:1fr}}
.scard{background:var(--card);border:1px solid var(--bd);border-radius:24px;padding:32px;transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .35s}
.scard:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--ac) 40%,var(--bd));box-shadow:0 24px 48px -24px rgba(37,99,235,.3)}
.scard .hd{display:flex;align-items:center;gap:12px;margin-bottom:24px}
.scard .hd .ic{width:44px;height:44px;border-radius:14px;background:rgba(37,99,235,.09);color:var(--ac);display:grid;place-items:center}
.scard .hd h3{font-family:'Space Grotesk';font-size:19px;font-weight:700;letter-spacing:-.01em}
.schips{display:flex;flex-wrap:wrap;gap:10px}
.schip{padding:10px 16px;border:1px solid var(--bd);border-radius:12px;background:var(--bg);font-size:13.5px;font-weight:600;transition:all .3s cubic-bezier(.22,1,.36,1)}
.schip:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--ac) 45%,var(--bd));box-shadow:0 10px 22px -12px rgba(37,99,235,.4);color:var(--ac)}
.bar{height:6px;border-radius:99px;background:var(--bd);overflow:hidden;margin-top:8px}
.barfill{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--ac),var(--ac2))}
.arow{margin-bottom:18px}
.arow .lb{display:flex;justify-content:space-between;font-size:13.5px;font-weight:600;margin-bottom:2px}
.arow .lb span:last-child{color:var(--mut)}
.achrow{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 4px 16px;scrollbar-width:none}
.achrow::-webkit-scrollbar{display:none}
.ach{min-width:290px;max-width:320px;scroll-snap-align:start;background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:28px;transition:transform .35s,border-color .3s,box-shadow .35s}
.ach:hover{transform:translateY(-6px);border-color:color-mix(in srgb,var(--ac) 40%,var(--bd));box-shadow:0 20px 44px -22px rgba(37,99,235,.35)}
.ach .ic{width:44px;height:44px;border-radius:14px;background:rgba(37,99,235,.09);color:var(--ac);display:grid;place-items:center;margin-bottom:20px}
.ach h3{font-family:'Space Grotesk';font-size:18px;font-weight:700}
.ach p{margin-top:10px;color:var(--mut);font-size:13.5px;line-height:1.7}
.ach .num{margin-top:20px;font-family:'Space Grotesk';font-weight:700;color:var(--bd);font-size:28px;-webkit-text-stroke:1px var(--mut);color:transparent}
.edu-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:40px}
@media(max-width:900px){.edu-grid{grid-template-columns:1fr}}
.edu{background:var(--card);border:1px solid var(--bd);border-radius:24px;padding:32px;display:flex;gap:20px;align-items:flex-start}
.edu .ic{flex:none;width:48px;height:48px;border-radius:16px;background:rgba(37,99,235,.09);color:var(--ac);display:grid;place-items:center}
.edu h3{font-family:'Space Grotesk';font-size:20px;font-weight:700;letter-spacing:-.01em}
.edu .deg{margin-top:8px;color:var(--mut);font-size:14px;line-height:1.7}
.edu .per{margin-top:14px;display:inline-block;font-size:12px;font-weight:700;letter-spacing:.08em;padding:7px 14px;border-radius:999px;border:1px solid var(--bd);color:var(--mut)}
.intcard{background:var(--card);border:1px solid var(--bd);border-radius:24px;padding:32px}
.intcard h3{font-family:'Space Grotesk';font-size:20px;font-weight:700;margin-bottom:20px}
.ichips{display:flex;flex-wrap:wrap;gap:10px}
.ichip{padding:11px 18px;border:1px solid var(--bd);border-radius:999px;background:var(--bg);font-size:13.5px;font-weight:600;transition:all .35s cubic-bezier(.22,1,.36,1)}
.ichip:hover{transform:translateY(-4px) rotate(-1deg);border-color:var(--ac);color:var(--ac);box-shadow:0 12px 26px -14px rgba(37,99,235,.45)}
.contact{ text-align:center}
.ctitle{font-family:'Space Grotesk';font-weight:700;font-size:clamp(38px,7vw,92px);letter-spacing:-.035em;line-height:1.02;text-transform:uppercase}
.csub{margin:24px auto 0;max-width:560px;color:var(--mut);font-size:15.5px;line-height:1.8}
.cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:clamp(40px,5vw,64px);text-align:left}
@media(max-width:1023px){.cgrid{grid-template-columns:1fr 1fr}}
@media(max-width:560px){.cgrid{grid-template-columns:1fr}}
.ccard{position:relative;display:flex;flex-direction:column;gap:6px;padding:24px;border-radius:20px;background:var(--card);border:1px solid var(--bd);transition:transform .35s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .35s}
.ccard:hover{transform:translateY(-5px);border-color:color-mix(in srgb,var(--ac) 45%,var(--bd));box-shadow:0 20px 44px -22px rgba(37,99,235,.4)}
.ccard .ic{width:42px;height:42px;border-radius:13px;background:rgba(37,99,235,.09);color:var(--ac);display:grid;place-items:center;margin-bottom:12px}
.ccard .lb{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--mut)}
.ccard .vl{font-weight:600;font-size:14.5px;word-break:break-all}
.ccard .arr{position:absolute;top:20px;right:20px;color:var(--mut);transition:transform .3s,color .3s}
.ccard:hover .arr{transform:translate(3px,-3px);color:var(--ac)}
.copybtn{position:absolute;bottom:20px;right:20px;width:34px;height:34px;border-radius:10px;border:1px solid var(--bd);display:grid;place-items:center;color:var(--mut);transition:all .25s}
.copybtn:hover{color:var(--ac);border-color:var(--ac)}
.footer{border-top:1px solid var(--bd);padding:32px 0}
.fwrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.fwrap p{color:var(--mut);font-size:13px}
.fwrap .made{display:flex;align-items:center;gap:6px}
.fwrap .made svg{color:#EF4444}
.topbtn{width:44px;height:44px;border-radius:14px;border:1px solid var(--bd);background:var(--card);display:grid;place-items:center;transition:all .3s}
.topbtn:hover{transform:translateY(-3px);border-color:var(--ac);color:var(--ac)}
.mmenu{position:fixed;inset:0;z-index:950;background:var(--bg);display:flex;flex-direction:column;padding:20px 24px 32px}
.mm-head{display:flex;justify-content:space-between;align-items:center}
.mm-links{margin-top:48px;display:flex;flex-direction:column;gap:4px}
.mm-link{display:flex;align-items:baseline;gap:14px;padding:10px 0;font-family:'Space Grotesk';font-weight:700;font-size:clamp(30px,8vw,44px);letter-spacing:-.02em;text-align:left}
.mm-link small{font-size:12px;color:var(--ac);font-weight:700;letter-spacing:.14em}
.mm-foot{margin-top:auto;display:flex;gap:10px;flex-wrap:wrap}
.pal{position:fixed;inset:0;z-index:1100;background:rgba(10,10,12,.45);backdrop-filter:blur(10px)}
.pal-panel{position:absolute;top:14%;left:50%;transform:translateX(-50%);width:min(620px,calc(100vw - 32px));background:var(--card);border:1px solid var(--bd);border-radius:20px;box-shadow:var(--sh);overflow:hidden}
.pal-in{display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid var(--bd)}
.pal-in input{flex:1;background:none;border:none;outline:none;font:inherit;font-size:15px;color:var(--tx)}
.pal-list{max-height:320px;overflow-y:auto;padding:8px}
.pal-item{width:100%;display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;font-size:14px;font-weight:500;text-align:left}
.pal-item .k{margin-left:auto;font-size:11px;color:var(--mut);border:1px solid var(--bd);border-radius:6px;padding:3px 7px}
.pal-item.sel,.pal-item:hover{background:rgba(37,99,235,.08);color:var(--ac)}
.pal-foot{display:flex;gap:16px;padding:12px 20px;border-top:1px solid var(--bd);color:var(--mut);font-size:11.5px}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);z-index:1300;background:var(--tx);color:var(--bg);padding:13px 22px;border-radius:999px;font-weight:600;font-size:14px;box-shadow:0 18px 40px -16px rgba(0,0,0,.4);display:flex;align-items:center;gap:9px;white-space:nowrap}
`;

const IMG = {
  portrait: "/photos/ppic.jpg",
  cart: "/photos/cart.png.png",
  workdipz: "/photos/workdipz.png",
  charo: "/photos/charo.png",
  najik: "/photos/najikkosathi.png",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["AI Engineer", "Software Developer", "UI/UX Designer", "Problem Solver"];

const PROJECTS = [
  {
    title: "Human Following Cart", cat: "Robotics", img: IMG.cart,
    desc: "Smart autonomous cart that tracks and follows its user using ultrasonic & IR sensors with an embedded control loop.",
    tags: ["Robotics", "Arduino", "Sensors", "Embedded Systems"],
    repo: "https://github.com/dipeshbh7/human-following-cart"
  },
  {
    title: "WorkDipZ", cat: "Mobile", img: IMG.workdipz,
    desc: "Productivity-first task management Android application with a clean, focused and fast interface.",
    tags: ["Android", "Kotlin", "UI/UX", "Productivity"],
    repo: "https://github.com/dipeshbh7/WorkDipz"
  },
  {
    title: "Najik Ko Sathi", cat: "Mobile", img: IMG.najik,
    desc: "A mobile-first home services companion for Nepal that helps users diagnose household problems, connect with trusted service providers, track repairs, and stay on top of routine maintenance — all through a polished React and Capacitor experience.",
    tags: ["React", "Capacitor", "Mobile", "Home Services"],
    repo: "https://github.com/dipeshbh7/najikko-sathi"
  },
  {
    title: "Charo Game", cat: "Web", img: IMG.charo,
    desc: "A traditional Nepali game reimagined as an interactive digital experience for the browser.",
    tags: ["Game Development", "JavaScript", "Interactive"],
    repo: "https://github.com/dipeshbh7/charo-game"
  },
];
const FILTERS = ["All", "Robotics", "Mobile", "Web"];

const EXPERIENCE = [
  {
    role: "Vice President", org: "IT Club", period: "2024 — Present",
    desc: "Leading the campus tech community — organizing workshops, hackathons and peer-learning sessions."
  },
  {
    role: "Event Coordinator", org: "KYC 2025", period: "2025",
    desc: "Coordinated logistics and technical operations for the college's flagship annual event."
  },
  {
    role: "College Ambassador", org: "Thrive 2025", period: "2025",
    desc: "Represented the college and hosted participants at a national-level technology fest."
  },
];

const ACHIEVEMENTS = [
  { icon: "trophy", t: "Hackathons", d: "Built AI-driven solutions under pressure at national-level hackathons." },
  { icon: "cpu", t: "Tech Exhibitions", d: "Showcased robotics & software projects at campus technology expos." },
  { icon: "users", t: "Leadership", d: "Vice President of the IT Club — building a culture of shipping." },
  { icon: "bulb", t: "Innovation", d: "Pitched healthcare-AI concepts that bridge ML with real needs." },
  { icon: "award", t: "Certificates", d: "Continuous upskilling across AI, security, design and development." },
];

const INTERESTS = ["Artificial Intelligence", "Cybersecurity", "Robotics", "Open Source", "Web Development", "Problem Solving"];

const AREAS = [
  { name: "Web Development", v: 92 },
  { name: "Artificial Intelligence", v: 88 },
  { name: "UI/UX Design", v: 86 },
  { name: "Robotics", v: 78 },
  { name: "Cybersecurity", v: 74 },
];

const EMAIL = "dipeshbh121@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/dipesh-bhattarai-2b286736a";
const GITHUB = "https://github.com/dipeshbh7";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [palOpen, setPalOpen] = useState(false);
  const [palQ, setPalQ] = useState("");
  const [palSel, setPalSel] = useState(0);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("All");
  const lastY = useRef(0);
  const konami = useRef(0);
  const palInput = useRef(null);
  const reduce = useReducedMotion();
  const canCursor = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer:fine)").matches, []);

  const { scrollY, scrollYProgress } = useScroll();
  const prog = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  const orbYA = useTransform(scrollY, [0, 800], [0, 120]);
  const orbYB = useTransform(scrollY, [0, 800], [0, -70]);

  useMotionValueEvent(scrollY, "change", (v) => {
    setNavHidden(v > lastY.current + 6 && v > 180);
    if (Math.abs(v - lastY.current) > 6) lastY.current = v;
  });

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1700); return () => clearTimeout(t); }, []);
  useEffect(() => {
    document.body.style.overflow = (loading || menuOpen || palOpen) ? "hidden" : "";
  }, [loading, menuOpen, palOpen]);

  useEffect(() => {
    document.title = "Dipesh Bhattarai — AI Engineer, Software Developer & UI/UX Designer";
    const meta = (name, content, attr = "name") => {
      let m = document.querySelector(`meta[${attr}="${name}"]`);
      if (!m) { m = document.createElement("meta"); m.setAttribute(attr, name); document.head.appendChild(m); }
      m.setAttribute("content", content);
    };
    meta("description", "Portfolio of Dipesh Bhattarai — BSc CSIT student from Nepal building intelligent digital experiences through software, AI and thoughtful design.");
    meta("og:title", "Dipesh Bhattarai — AI Engineer & Software Developer", "property");
    meta("og:type", "website", "property");
    meta("twitter:card", "summary_large_image");
    let f = document.querySelector('link[rel="icon"]');
    if (!f) { f = document.createElement("link"); f.rel = "icon"; document.head.appendChild(f); }
    f.href = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='#2563EB'/><text x='32' y='43' font-family='Arial,sans-serif' font-size='26' font-weight='700' fill='#fff' text-anchor='middle'>DB</text></svg>");
  }, []);

  const showToast = useCallback((msg) => setToast({ id: Date.now(), msg }), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const goTo = useCallback((id) => {
    setMenuOpen(false); setPalOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText(EMAIL); showToast("Email copied to clipboard"); }
    catch { showToast(EMAIL); }
  }, [showToast]);

  const downloadResume = useCallback(() => {
    const txt = `DIPESH BHATTARAI
AI Engineer | Software Developer | UI/UX Designer
Nepal | ${EMAIL}
${LINKEDIN} | ${GITHUB}

SUMMARY
BSc CSIT student at Far Western University who builds at the intersection of AI, software and design. Curious builder who ships robots, apps and experiences.

EDUCATION
Far Western University — BSc CSIT (Pursuing)

EXPERIENCE
Vice President — IT Club (2024–Present)
Event Coordinator — KYC 2025
College Ambassador — Thrive 2025

PROJECTS
Human Following Cart — Robotics / Arduino / Embedded Systems
WorkDipZ — Android / Kotlin / UI-UX
Charo Game — JavaScript / Game Development

SKILLS
C, JavaScript, HTML, CSS | Git, GitHub, Figma, Notion | AI, Cybersecurity, Robotics, Web Dev, UI/UX
`;
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "Dipesh-Bhattarai-Resume.txt"; a.click();
    URL.revokeObjectURL(url);
    showToast("Resume downloaded ✓");
  }, [showToast]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = "home";
        for (const s of NAV) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = s.id;
        }
        setActive(cur);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const SEQ = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalOpen((v) => !v); return; }
      if (e.key === "Escape") { setPalOpen(false); setMenuOpen(false); return; }
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      const k = e.key.toLowerCase();
      konami.current = SEQ[konami.current] === k ? konami.current + 1 : (SEQ[0] === k ? 1 : 0);
      if (konami.current === SEQ.length) { showToast("Keep Building 🚀"); konami.current = 0; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showToast]);

  const cmds = useMemo(() => [
    ...NAV.map((n) => ({ l: `Go to ${n.label}`, k: "section", i: "home", run: () => goTo(n.id) })),
    { l: dark ? "Switch to Light Mode" : "Switch to Dark Mode", k: "theme", i: dark ? "sun" : "moon", run: () => setDark((v) => !v) },
    { l: "Copy Email", k: "clipboard", i: "copy", run: copyEmail },
    { l: "Download Resume", k: "pdf", i: "down", run: downloadResume },
    { l: "Open GitHub", k: "external", i: "code", run: () => window.open(GITHUB, "_blank") },
    { l: "Open LinkedIn", k: "external", i: "users", run: () => window.open(LINKEDIN, "_blank") },
  ], [dark, goTo, copyEmail, downloadResume]);
  const filtered = useMemo(() => {
    const q = palQ.trim().toLowerCase();
    return q ? cmds.filter((c) => c.l.toLowerCase().includes(q) || c.k.includes(q)) : cmds;
  }, [cmds, palQ]);
  useEffect(() => { setPalSel(0); }, [palQ, palOpen]);
  useEffect(() => { if (palOpen) setTimeout(() => palInput.current?.focus(), 60); }, [palOpen]);

  const shownProjects = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <MotionConfig reducedMotion="user">
      <div className={"dbx" + (dark ? " dark" : "") + (canCursor && !reduce ? " cx" : "")}>
        <style>{CSS}</style>

        <motion.div className="progress" style={{ scaleX: prog }} />
        <Cursor />

        {/* loader */}
        <AnimatePresence>
          {loading && (
            <motion.div className="loader" exit={{ y: "-100%" }} transition={{ duration: 0.7, ease: EASE }}>
              <div>
                <div className="lb hg">
                  <span><motion.i className="o" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: EASE }}>D</motion.i></span>
                  <span><motion.i initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>B</motion.i></span>
                </div>
                <div className="lline"><motion.div style={{ height: "100%", background: "linear-gradient(90deg,var(--ac),var(--ac2))" }} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.4, ease: "easeInOut" }} /></div>
                <div className="lsub">Dipesh Bhattarai</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* nav */}
        <motion.header className="navwrap" animate={{ y: navHidden ? -96 : 0 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
          <div className="navpill">
            <button className="logo" onClick={() => goTo("home")} aria-label="Back to home">
              <span className="logo-badge hg">DB</span>
              <span className="logo-name hg">dipesh.bhattarai</span>
            </button>
            <nav className="navlinks" aria-label="Primary">
              {NAV.map((n) => (
                <button key={n.id} className={"nl" + (active === n.id ? " active" : "")} onClick={() => goTo(n.id)}>{n.label}</button>
              ))}
            </nav>
            <div className="nav-actions">
              <button className="iconbtn" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
                <Icon n={dark ? "sun" : "moon"} size={17} />
              </button>
              <button className="iconbtn" onClick={() => setPalOpen(true)} aria-label="Open command palette">
                <Icon n="cmd" size={16} />
              </button>
              <Magnetic className="nav-cta">
                <button className="btn btn-primary" onClick={() => goTo("contact")}>Let's Talk <Icon n="upR" size={15} /></button>
              </Magnetic>
              <button className="iconbtn menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <Icon n="menu" size={18} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div className="mmenu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="mm-head">
                <span className="logo"><span className="logo-badge hg">DB</span><span className="logo-name hg">dipesh.bhattarai</span></span>
                <button className="iconbtn" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon n="x" size={18} /></button>
              </div>
              <div className="mm-links">
                {NAV.map((n, idx) => (
                  <motion.button key={n.id} className="mm-link" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.5, ease: EASE }} onClick={() => goTo(n.id)}>
                    <small>0{idx + 1}</small>{n.label}
                  </motion.button>
                ))}
              </div>
              <div className="mm-foot">
                <a className="spill" href={GITHUB} target="_blank" rel="noreferrer"><GhIcon size={15} /> GitHub</a>
                <a className="spill" href={LINKEDIN} target="_blank" rel="noreferrer"><LiIcon size={15} /> LinkedIn</a>
                <button className="spill" onClick={copyEmail}><Icon n="mail" size={15} /> Email</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* command palette */}
        <AnimatePresence>
          {palOpen && (
            <motion.div className="pal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setPalOpen(false)}>
              <motion.div className="pal-panel" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.3, ease: EASE }} onClick={(e) => e.stopPropagation()}>
                <div className="pal-in">
                  <Icon n="cmd" size={16} />
                  <input ref={palInput} value={palQ} placeholder="Type a command or search…"
                    onChange={(e) => setPalQ(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") { e.preventDefault(); setPalSel((s) => Math.min(s + 1, filtered.length - 1)); }
                      if (e.key === "ArrowUp") { e.preventDefault(); setPalSel((s) => Math.max(s - 1, 0)); }
                      if (e.key === "Enter" && filtered[palSel]) { filtered[palSel].run(); setPalOpen(false); setPalQ(""); }
                    }}
                    aria-label="Command search" />
                  <span className="pal-item k" style={{ padding: "3px 8px" }}>esc</span>
                </div>
                <div className="pal-list">
                  {filtered.map((c, idx) => (
                    <button key={c.l} className={"pal-item" + (idx === palSel ? " sel" : "")}
                      onMouseEnter={() => setPalSel(idx)}
                      onClick={() => { c.run(); setPalOpen(false); setPalQ(""); }}>
                      <Icon n={c.i} size={16} /> {c.l} <span className="k">{c.k}</span>
                    </button>
                  ))}
                  {filtered.length === 0 && <div className="pal-item" style={{ color: "var(--mut)" }}>No results found.</div>}
                </div>
                <div className="pal-foot"><span>↵ select</span><span>↑↓ navigate</span><span>esc close</span><span style={{ marginLeft: "auto" }}>⌘K</span></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* toast */}
        <AnimatePresence>
          {toast && (
            <motion.div key={toast.id} className="toast" initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} transition={{ duration: 0.35, ease: EASE }}>
              <Icon n="spark" size={15} /> {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        <main id="home">
          {/* ============ HERO ============ */}
          <div className="hero shell">
            <motion.div className="orb a" style={{ y: orbYA }} />
            <motion.div className="orb b" style={{ y: orbYB }} />
            <div className="herobg" />

            <h1 className="hname hg" aria-label="Dipesh Bhattarai">
              <span className="w"><motion.span className="wi outl" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.7, duration: 0.9, ease: EASE }}>DIPESH</motion.span></span>
              <span className="w"><motion.span className="wi" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 1.82, duration: 0.9, ease: EASE }}>BHATTARAI</motion.span></span>
            </h1>

            <div className="hero-grid">
              <motion.div className="hleft" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8, ease: EASE }}>
                <div className="roleline">I'm a <Rotator /></div>
                <p>I build intelligent digital experiences through software, AI and thoughtful design — turning curious ideas into real, working products from Nepal to anywhere.</p>
                <div className="hbtns">
                  <Magnetic><button className="btn btn-primary" onClick={() => goTo("projects")}>View Projects <Icon n="upR" size={15} /></button></Magnetic>
                  <Magnetic><button className="btn btn-ghost" onClick={downloadResume}><Icon n="down" size={15} /> Download Resume</button></Magnetic>
                </div>
                <div className="hmeta"><Icon n="pin" size={14} /> Kathmandu Valley, Nepal · BSc CSIT @ Far Western University</div>
              </motion.div>

              <motion.div className="portrait" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.9, ease: EASE }}>
                <img src={IMG.portrait} alt="Portrait of Dipesh Bhattarai" loading="eager" />
              </motion.div>

              <motion.div className="hsocial" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8, ease: EASE }}>
                <a className="spill" href={GITHUB} target="_blank" rel="noreferrer"><GhIcon size={15} /> GitHub</a>
                <a className="spill" href={LINKEDIN} target="_blank" rel="noreferrer"><LiIcon size={15} /> LinkedIn</a>
                <button className="spill" onClick={copyEmail}><Icon n="mail" size={15} /> Email</button>
              </motion.div>
            </div>

            <div className="shint"><i /> Scroll to explore</div>
          </div>

          {/* ============ MARQUEE ============ */}
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((g) => (
                <div className="mgroup" key={g}>
                  {["AI Engineer", "Software Developer", "UI/UX Designer", "Robotics", "Cybersecurity", "Web Development", "Problem Solver"].map((t, idx) => (
                    <React.Fragment key={t}>
                      <span className={"mitem" + (idx % 2 ? " o" : "")}>{t}</span>
                      <span className="msep">✦</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ============ ABOUT ============ */}
          <section id="about">
            <span className="ghost">ABOUT</span>
            <div className="shell">
              <R className="shead"><span className="sindex">/01</span><h2 className="stitle hg"><span className="slash">/</span>ABOUT ME</h2></R>
              <div className="about-grid">
                <div className="about-txt">
                  <R><h3>Curious mind. Builder's hands. I turn "what if" into "it works".</h3></R>
                  <R delay={0.08}><p>I'm a BSc CSIT student at Far Western University who loves building at the intersection of artificial intelligence, software and design. What began as curiosity about how things work has become a journey of shipping robots, mobile apps, games and AI concepts that solve real problems.</p></R>
                  <R delay={0.14}><p>From hackathons to leading the IT Club, I look for problems worth solving — and solve them with clarity, craft and a bias for shipping. I'm always learning, always building, always iterating.</p></R>
                  <R delay={0.2} className="traits">
                    {["Curious", "Builder", "Innovator", "Leader", "Lifelong Learner"].map((t) => (
                      <span className="trait" key={t}><i />{t}</span>
                    ))}
                  </R>
                </div>
                <div className="stats">
                  <Stat icon="trophy" value={6} suffix="+" label="Hackathons & Events" />
                  <Stat icon="code" value={10} suffix="+" label="Projects Built" delay={0.06} />
                  <Stat icon="cpu" value={12} suffix="+" label="Technologies Used" delay={0.12} />
                  <Stat icon="users" value={3} suffix="+" label="Leadership Roles" delay={0.18} />
                </div>
              </div>
            </div>
          </section>

          {/* ============ PROJECTS ============ */}
          <section id="projects">
            <span className="ghost">WORK</span>
            <div className="shell">
              <R className="shead"><span className="sindex">/02</span><h2 className="stitle hg"><span className="slash">/</span>SELECTED PROJECTS</h2></R>
              <R className="frow">
                {FILTERS.map((f) => (
                  <button key={f} className={"fchip" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>{f}</button>
                ))}
              </R>
              <motion.div className="pgrid" layout>
                <AnimatePresence mode="popLayout">
                  {shownProjects.map((p, idx) => (
                    <motion.div key={p.title} layout initial={{ opacity: 0, y: 32, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, delay: idx * 0.06, ease: EASE }}>
                      <Tilt className="pcard">
                        <div className="pimg">
                          <img src={p.img} alt={p.title + " preview"} loading="lazy" />
                          <span className="pcat">{p.cat}</span>
                        </div>
                        <div className="pbody">
                          <h3 className="hg">{p.title}</h3>
                          <p>{p.desc}</p>
                          <div className="ptags">{p.tags.map((t) => <span className="ptag" key={t}>{t}</span>)}</div>
                          <div className="pacts">
                            <a className="pbtn solid" href={p.repo} target="_blank" rel="noreferrer"><GhIcon size={14} /> GitHub</a>
                            <button className="pbtn" onClick={() => showToast("🚀 Live demo coming soon")}>Live Demo <Icon n="upR" size={14} /></button>
                          </div>
                        </div>
                      </Tilt>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* ============ EXPERIENCE ============ */}
          <section id="experience" className="band">
            <span className="ghost">JOURNEY</span>
            <div className="shell">
              <R className="shead bandhead">
                <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span className="sindex" style={{ color: "var(--ac2)" }}>/03</span>
                  <h2 className="stitle hg"><span className="slash">/</span>EXPERIENCE</h2>
                </span>
                <span className="bandnote">Leadership · Community · Ownership</span>
              </R>
              {EXPERIENCE.map((x, idx) => (
                <R className="xrow" key={x.org} delay={idx * 0.08}>
                  <div>
                    <h3 className="hg">{x.role}</h3>
                    <div className="org">{x.org}</div>
                    <p>{x.desc}</p>
                  </div>
                  <span className="per">{x.period}</span>
                </R>
              ))}
            </div>
          </section>

          {/* ============ SKILLS ============ */}
          <section id="skills">
            <span className="ghost">STACK</span>
            <div className="shell">
              <R className="shead"><span className="sindex">/04</span><h2 className="stitle hg"><span className="slash">/</span>SKILLS & TOOLS</h2></R>
              <div className="sgrid">
                <R className="scard">
                  <div className="hd"><span className="ic"><Icon n="code" size={20} /></span><h3 className="hg">Programming</h3></div>
                  <div className="schips">{["C", "JavaScript", "HTML", "CSS", "Kotlin"].map((s) => <span className="schip" key={s}>{s}</span>)}</div>
                </R>
                <R className="scard" delay={0.08}>
                  <div className="hd"><span className="ic"><Icon n="wrench" size={20} /></span><h3 className="hg">Tools</h3></div>
                  <div className="schips">{["Git", "GitHub", "Figma", "Canva", "Notion", "ChatGPT"].map((s) => <span className="schip" key={s}>{s}</span>)}</div>
                </R>
                <R className="scard" delay={0.16}>
                  <div className="hd"><span className="ic"><Icon n="spark" size={20} /></span><h3 className="hg">Focus Areas</h3></div>
                  {AREAS.map((a) => (
                    <div className="arow" key={a.name}>
                      <div className="lb"><span>{a.name}</span><span>{a.v}%</span></div>
                      <div className="bar">
                        <motion.span className="barfill" initial={{ width: 0 }} whileInView={{ width: a.v + "%" }}
                          viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }} />
                      </div>
                    </div>
                  ))}
                </R>
              </div>
            </div>
          </section>

          {/* ============ ACHIEVEMENTS ============ */}
          <section id="achievements">
            <span className="ghost">HONORS</span>
            <div className="shell">
              <R className="shead"><span className="sindex">/05</span><h2 className="stitle hg"><span className="slash">/</span>ACHIEVEMENTS</h2></R>
              <div className="achrow">
                {ACHIEVEMENTS.map((a, idx) => (
                  <R className="ach" key={a.t} delay={idx * 0.06}>
                    <span className="ic"><Icon n={a.icon} size={20} /></span>
                    <h3 className="hg">{a.t}</h3>
                    <p>{a.d}</p>
                    <div className="num">0{idx + 1}</div>
                  </R>
                ))}
              </div>
              <div className="edu-grid">
                <R className="edu">
                  <span className="ic"><Icon n="cap" size={22} /></span>
                  <div>
                    <h3 className="hg">Far Western University</h3>
                    <p className="deg">Bachelor of Science in Computer Science and Information Technology (BSc CSIT) — focusing on AI, systems, security and human-centered design.</p>
                    <span className="per">2023 — PRESENT</span>
                  </div>
                </R>
                <R className="intcard" delay={0.08}>
                  <h3 className="hg">Beyond The Code</h3>
                  <div className="ichips">
                    {INTERESTS.map((i) => <span className="ichip" key={i}>{i}</span>)}
                  </div>
                </R>
              </div>
            </div>
          </section>

          {/* ============ CONTACT ============ */}
          <section id="contact" className="contact">
            <span className="ghost">CONTACT</span>
            <div className="shell">
              <R delay={0.06}><h2 className="ctitle hg">Let's Build Something<br /><span className="grad">Amazing</span> Together.</h2></R>
              <R delay={0.12}><p className="csub">Whether it's an AI idea, a product to ship, or a hackathon team to strengthen — my inbox is open. Let's create something clear, useful and memorable.</p></R>
              <div className="cgrid">
                <R delay={0.05}>
                  <a className="ccard" href={"mailto:" + EMAIL}>
                    <span className="ic"><Icon n="mail" size={19} /></span>
                    <span className="lb">Email</span>
                    <span className="vl">{EMAIL}</span>
                    <span className="arr"><Icon n="upR" size={16} /></span>
                    <button className="copybtn" aria-label="Copy email" onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyEmail(); }}><Icon n="copy" size={14} /></button>
                  </a>
                </R>
                <R delay={0.15}>
                  <a className="ccard" href={LINKEDIN} target="_blank" rel="noreferrer">
                    <span className="ic"><LiIcon size={18} /></span>
                    <span className="lb">LinkedIn</span>
                    <span className="vl">dipesh-bhattarai</span>
                    <span className="arr"><Icon n="upR" size={16} /></span>
                  </a>
                </R>
                <R delay={0.2}>
                  <a className="ccard" href={GITHUB} target="_blank" rel="noreferrer">
                    <span className="ic"><GhIcon size={18} /></span>
                    <span className="lb">GitHub</span>
                    <span className="vl">github.com/dipeshbh7</span>
                    <span className="arr"><Icon n="upR" size={16} /></span>
                  </a>
                </R>
              </div>
            </div>
          </section>
        </main>

        {/* footer */}
        <footer className="footer">
          <div className="shell fwrap">
            <button className="topbtn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}>
              <Icon n="up" size={17} />
            </button>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
