if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const l=e=>n(e,o),t={module:{uri:o},exports:c,require:l};s[o]=Promise.all(i.map((e=>t[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-23f7095e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/approval-icon-CeGvUdXF.png",revision:null},{url:"assets/background-DeONy2DN.png",revision:null},{url:"assets/clients-BmDn19FZ.png",revision:null},{url:"assets/index-CF2y1oer.css",revision:null},{url:"assets/index-DKJGMthR.js",revision:null},{url:"assets/loginbackground-DbAwXWd7.jpg",revision:null},{url:"assets/orders-C7yzN0Ri.png",revision:null},{url:"assets/references-icon-BH2iS7un.png",revision:null},{url:"assets/settings-blF5Ud1v.png",revision:null},{url:"assets/settingsbackground-5Mda_Bl_.jpg",revision:null},{url:"assets/urgent-icon-BDe48bq2.png",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"icons/favicon-16x16.png",revision:"eb5b69fd0a56af7e81bfc5ecaf053b26"},{url:"icons/favicon-32x32.png",revision:"16909874d2a9bec6c3e2ed624f2f4b4c"},{url:"icons/pwa-192x192.png",revision:"9b0167e961c1eada4727b1c4b81423f6"},{url:"icons/pwa-512x512.png",revision:"1d3f226255706bddeaed88e44c4fc018"},{url:"index.html",revision:"3acbdf799b1c968e375820c2f3c0a448"},{url:"screenshots/desktop.png",revision:"3dbfc36797bf39e144075b4c212e3eb1"},{url:"screenshots/mobile.png",revision:"048e498ef625bd345453f5d707ccb2cb"},{url:"icons/pwa-192x192.png",revision:"9b0167e961c1eada4727b1c4b81423f6"},{url:"icons/pwa-512x512.png",revision:"1d3f226255706bddeaed88e44c4fc018"},{url:"icons/favicon-16x16.png",revision:"eb5b69fd0a56af7e81bfc5ecaf053b26"},{url:"icons/favicon-32x32.png",revision:"16909874d2a9bec6c3e2ed624f2f4b4c"},{url:"screenshots/desktop.png",revision:"3dbfc36797bf39e144075b4c212e3eb1"},{url:"screenshots/mobile.png",revision:"048e498ef625bd345453f5d707ccb2cb"},{url:"manifest.webmanifest",revision:"90c97322088a4ee60bbe70e350466af6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https?:\/\//,new e.NetworkFirst({cacheName:"api-cache",networkTimeoutSeconds:10,plugins:[new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/\.(js|css|html)$/,new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[]}),"GET"),e.registerRoute(/\.(png|jpg|jpeg|svg|gif)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET")}));
