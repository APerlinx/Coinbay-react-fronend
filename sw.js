if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-589f033a.css",revision:null},{url:"assets/index-ed0c8866.js",revision:null},{url:"index.html",revision:"72c6444e2bbcbbf86de07f1317079900"},{url:"registerSW.js",revision:"aa220df43ad46e28b53be425c9893f07"},{url:"./assets/imgs/cookie.svg",revision:"8018432236d35d2e3a485d43edaaf0ca"},{url:"manifest.webmanifest",revision:"ad83d7d3b8c49eb5436d78fa5dc9f843"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
