define(["exports"],(function(t){"use strict";try{self["workbox:core:7.2.0"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:7.2.0"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:i})}catch(t){c=Promise.reject(t)}const h=r&&r.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;const c=()=>(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return c().registerRoute(a),a}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch(t){}class u{constructor(t={}){this.h=t.statuses,this.u=t.headers}isResponseCacheable(t){let e=!0;return this.h&&(e=this.h.includes(t.status)),this.u&&e&&(e=Object.keys(this.u).some((e=>t.headers.get(e)===this.u[e]))),e}}try{self["workbox:strategies:7.2.0"]&&_()}catch(t){}const l={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null},f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},w=t=>[f.prefix,t,f.suffix].filter((t=>t&&t.length>0)).join("-"),d=t=>t||w(f.precache),p=t=>t||w(f.runtime);function y(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class m{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const g=new Set;function R(t){return"string"==typeof t?new Request(t):t}class v{constructor(t,e){this.l={},Object.assign(this,e),this.event=e.event,this.p=t,this.m=new m,this.R=[],this.v=[...t.plugins],this.q=new Map;for(const t of this.v)this.q.set(t,{});this.event.waitUntil(this.m.promise)}async fetch(t){const{event:e}=this;let n=R(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.p.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=R(t);let s;const{cacheName:n,matchOptions:i}=this.p,r=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=R(t);var i;await(i=0,new Promise((t=>setTimeout(t,i))));const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(a=r.url,new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var a;const o=await this.D(e);if(!o)return!1;const{cacheName:c,matchOptions:h}=this.p,u=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),f=l?await async function(t,e,s,n){const i=y(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===y(e.url,s))return t.match(e,n)}(u,r.clone(),["__WB_REVISION__"],h):null;try{await u.put(r,l?o.clone():o)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of g)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:f,newResponse:o.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.l[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=R(await t({mode:e,request:n,event:this.event,params:this.params}));this.l[s]=n}return this.l[s]}hasCallback(t){for(const e of this.p.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.p.plugins)if("function"==typeof e[t]){const s=this.q.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.R.push(t),t}async doneWaiting(){let t;for(;t=this.R.shift();)await t}destroy(){this.m.resolve(null)}async D(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class b{constructor(t={}){this.cacheName=p(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new v(this,{event:e,request:s,params:n}),r=this.U(i,s,e);return[r,this._(r,i,s,e)]}async U(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.I(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async _(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}function q(t){t.then((()=>{}))}function D(){return D=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},D.apply(null,arguments)}let U,x;const I=new WeakMap,L=new WeakMap,E=new WeakMap,C=new WeakMap,N=new WeakMap;let O={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return L.get(t);if("objectStoreNames"===e)return t.objectStoreNames||E.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return T(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function k(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(x||(x=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(M(this),e),T(I.get(this))}:function(...e){return T(t.apply(M(this),e))}:function(e,...s){const n=t.call(M(this),e,...s);return E.set(n,e.sort?e.sort():[e]),T(n)}}function B(t){return"function"==typeof t?k(t):(t instanceof IDBTransaction&&function(t){if(L.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),n()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));L.set(t,e)}(t),e=t,(U||(U=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,O):t);var e}function T(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(T(t.result)),n()},r=()=>{s(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&I.set(e,t)})).catch((()=>{})),N.set(e,t),e}(t);if(C.has(t))return C.get(t);const e=B(t);return e!==t&&(C.set(t,e),N.set(e,t)),e}const M=t=>N.get(t);const P=["get","getKey","getAll","getAllKeys","count"],W=["put","add","delete","clear"],j=new Map;function S(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(j.get(e))return j.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,i=W.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!P.includes(s))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),i&&r.done]))[0]};return j.set(e,r),r}O=(t=>D({},t,{get:(e,s,n)=>S(e,s)||t.get(e,s,n),has:(e,s)=>!!S(e,s)||t.has(e,s)}))(O);try{self["workbox:expiration:7.2.0"]&&_()}catch(t){}const K="cache-entries",A=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class F{constructor(t){this.L=null,this.C=t}N(t){const e=t.createObjectStore(K,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}O(t){this.N(t),this.C&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),T(s).then((()=>{}))}(this.C)}async setTimestamp(t,e){const s={url:t=A(t),timestamp:e,cacheName:this.C,id:this.k(t)},n=(await this.getDb()).transaction(K,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(K,this.k(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(K).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.C&&(t&&s.timestamp<t||e&&r>=e?i.push(n.value):r++),n=await n.continue()}const a=[];for(const t of i)await s.delete(K,t.id),a.push(t.url);return a}k(t){return this.C+"|"+A(t)}async getDb(){return this.L||(this.L=await function(t,e,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),o=T(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(T(a.result),t.oldVersion,t.newVersion,T(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),o.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(t=>i(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.O.bind(this)})),this.L}}class H{constructor(t,e={}){this.B=!1,this.T=!1,this.M=e.maxEntries,this.P=e.maxAgeSeconds,this.W=e.matchOptions,this.C=t,this.j=new F(t)}async expireEntries(){if(this.B)return void(this.T=!0);this.B=!0;const t=this.P?Date.now()-1e3*this.P:0,e=await this.j.expireEntries(t,this.M),s=await self.caches.open(this.C);for(const t of e)await s.delete(t,this.W);this.B=!1,this.T&&(this.T=!1,q(this.expireEntries()))}async updateTimestamp(t){await this.j.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.P){const e=await this.j.getTimestamp(t),s=Date.now()-1e3*this.P;return void 0===e||e<s}return!1}async delete(){this.T=!1,await this.j.expireEntries(1/0)}}function $(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:7.2.0"]&&_()}catch(t){}function G(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class V{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class J{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.S.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.S=t}}let Q,z;async function X(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,o=function(){if(void 0===Q){const t=new Response("");if("body"in t)try{new Response(t.body),Q=!0}catch(t){Q=!1}Q=!1}return Q}()?i.body:await i.blob();return new Response(o,a)}class Y extends b{constructor(t={}){t.cacheName=d(t.cacheName),super(t),this.K=!1!==t.fallbackToNetwork,this.plugins.push(Y.copyRedirectedCacheableResponsesPlugin)}async I(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.A(t,e):await this.F(t,e))}async F(t,e){let n;const i=e.params||{};if(!this.K)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=i.integrity,r=t.integrity,a=!r||r===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?r||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.H(),await e.cachePut(t,n.clone()))}return n}async A(t,e){this.H();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}H(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==Y.copyRedirectedCacheableResponsesPlugin&&(n===Y.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(Y.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}Y.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},Y.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await X(t):t};class Z{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.$=new Map,this.G=new Map,this.V=new Map,this.p=new Y({cacheName:d(t),plugins:[...e,new J({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.p}precache(t){this.addToCacheList(t),this.J||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.J=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=G(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.$.has(i)&&this.$.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.$.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.V.has(t)&&this.V.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.V.set(t,n.integrity)}if(this.$.set(i,t),this.G.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return $(t,(async()=>{const e=new V;this.strategy.plugins.push(e);for(const[e,s]of this.$){const n=this.V.get(s),i=this.G.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return $(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.$.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.$}getCachedURLs(){return[...this.$.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.$.get(e.href)}getIntegrityForCacheKey(t){return this.V.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const tt=()=>(z||(z=new Z),z);class et extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}t.CacheFirst=class extends b{async I(t,e){let n,i=await e.cacheMatch(t);if(!i)try{i=await e.fetchAndCachePut(t)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}},t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.X.isResponseCacheable(t)?t:null,this.X=new u(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.Y(n),r=this.Z(s);q(r.expireEntries());const a=r.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.Z(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.tt=t,this.P=t.maxAgeSeconds,this.et=new Map,t.purgeOnQuotaError&&function(t){g.add(t)}((()=>this.deleteCacheAndMetadata()))}Z(t){if(t===p())throw new s("expire-custom-caches-only");let e=this.et.get(t);return e||(e=new H(t,this.tt),this.et.set(t,e)),e}Y(t){if(!this.P)return!0;const e=this.st(t);if(null===e)return!0;return e>=Date.now()-1e3*this.P}st(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.et)await self.caches.delete(t),await e.delete();this.et=new Map}},t.NavigationRoute=class extends i{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.nt(t)),t),this.it=e,this.rt=s}nt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.rt)if(t.test(s))return!1;return!!this.it.some((t=>t.test(s)))}},t.NetworkFirst=class extends b{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(l),this.ot=t.networkTimeoutSeconds||0}async I(t,e){const n=[],i=[];let r;if(this.ot){const{id:s,promise:a}=this.ct({request:t,logs:n,handler:e});r=s,i.push(a)}const a=this.ht({timeoutId:r,request:t,logs:n,handler:e});i.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(i))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}ct({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.ot)})),id:n}}async ht({timeoutId:t,request:e,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(i=t)}return t&&clearTimeout(t),!i&&r||(r=await n.cacheMatch(e)),r}},t.StaleWhileRevalidate=class extends b{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(l)}async I(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let i,r=await e.cacheMatch(t);if(r);else try{r=await n}catch(t){t instanceof Error&&(i=t)}if(!r)throw new s("no-response",{url:t.url,error:i});return r}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=d();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.createHandlerBoundToURL=function(t){return tt().createHandlerBoundToURL(t)},t.precacheAndRoute=function(t,e){!function(t){tt().precache(t)}(t),function(t){const e=tt();h(new et(e,t))}(e)},t.registerRoute=h}));
