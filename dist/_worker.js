var bt=Object.defineProperty;var He=e=>{throw TypeError(e)};var xt=(e,t,r)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var f=(e,t,r)=>xt(e,typeof t!="symbol"?t+"":t,r),Ie=(e,t,r)=>t.has(e)||He("Cannot "+r);var i=(e,t,r)=>(Ie(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?He("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),h=(e,t,r,s)=>(Ie(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),m=(e,t,r)=>(Ie(e,t,"access private method"),r);var Ue=(e,t,r,s)=>({set _(a){h(e,t,a,r)},get _(){return i(e,t,s)}});var $e=(e,t,r)=>(s,a)=>{let o=-1;return n(0);async function n(d){if(d<=o)throw new Error("next() called multiple times");o=d;let c,l=!1,p;if(e[d]?(p=e[d][0][0],s.req.routeIndex=d):p=d===e.length&&a||void 0,p)try{c=await p(s,()=>n(d+1))}catch(u){if(u instanceof Error&&t)s.error=u,c=await t(u,s),l=!0;else throw u}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},yt=Symbol(),_t=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,o=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return o!=null&&o.startsWith("multipart/form-data")||o!=null&&o.startsWith("application/x-www-form-urlencoded")?wt(e,{all:r,dot:s}):{}};async function wt(e,t){const r=await e.formData();return r?Et(r,t):{}}function Et(e,t){const r=Object.create(null);return e.forEach((s,a)=>{t.all||a.endsWith("[]")?Rt(r,a,s):r[a]=s}),t.dot&&Object.entries(r).forEach(([s,a])=>{s.includes(".")&&(Ot(r,s,a),delete r[s])}),r}var Rt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ot=(e,t,r)=>{let s=e;const a=t.split(".");a.forEach((o,n)=>{n===a.length-1?s[o]=r:((!s[o]||typeof s[o]!="object"||Array.isArray(s[o])||s[o]instanceof File)&&(s[o]=Object.create(null)),s=s[o])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Tt=e=>{const{groups:t,path:r}=jt(e),s=Qe(r);return St(s,t)},jt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const a=`@${s}`;return t.push([a,r]),a}),{groups:t,path:e}},St=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let a=e.length-1;a>=0;a--)if(e[a].includes(s)){e[a]=e[a].replace(s,t[r][1]);break}}return e},Oe={},Ct=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Oe[s]||(r[2]?Oe[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Oe[s]=[e,r[1],!0]),Oe[s]}return null},ke=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Nt=e=>ke(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const a=t.charCodeAt(s);if(a===37){const o=t.indexOf("?",s),n=t.slice(r,o===-1?void 0:o);return Nt(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(a===63)break}return t.slice(r,s)},At=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))s+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){r.length===0&&s===""?r.push("/"):r.push(s);const o=a.replace("?","");s+="/"+o,r.push(s)}else s+="/"+a}),r.filter((a,o,n)=>n.indexOf(a)===o)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ke(e,rt):e):e,tt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const d=e.charCodeAt(n+t.length+1);if(d===61){const c=n+t.length+2,l=e.indexOf("&",c);return Le(e.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";n=e.indexOf(`&${t}`,n+1)}if(s=/[%+]/.test(e),!s)return}const a={};s??(s=/[%+]/.test(e));let o=e.indexOf("?",8);for(;o!==-1;){const n=e.indexOf("&",o+1);let d=e.indexOf("=",o);d>n&&n!==-1&&(d=-1);let c=e.slice(o+1,d===-1?n===-1?void 0:n:d);if(s&&(c=Le(c)),o=n,c==="")continue;let l;d===-1?l="":(l=e.slice(d+1,n===-1?void 0:n),s&&(l=Le(l))),r?(a[c]&&Array.isArray(a[c])||(a[c]=[]),a[c].push(l)):a[c]??(a[c]=l)}return t?a[t]:a},Dt=tt,It=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,Be=e=>ke(e,rt),ne,S,H,at,ot,Pe,B,Ye,st=(Ye=class{constructor(e,t="/",r=[[]]){g(this,H);f(this,"raw");g(this,ne);g(this,S);f(this,"routeIndex",0);f(this,"path");f(this,"bodyCache",{});g(this,B,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const a=Object.keys(t)[0];return a?t[a].then(o=>(a==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,h(this,S,r),h(this,ne,{})}param(e){return e?m(this,H,at).call(this,e):m(this,H,ot).call(this)}query(e){return Dt(this.url,e)}queries(e){return It(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await _t(this,e))}json(){return i(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,B).call(this,"text")}arrayBuffer(){return i(this,B).call(this,"arrayBuffer")}blob(){return i(this,B).call(this,"blob")}formData(){return i(this,B).call(this,"formData")}addValidatedData(e,t){i(this,ne)[e]=t}valid(e){return i(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return i(this,S)}get matchedRoutes(){return i(this,S)[0].map(([[,e]])=>e)}get routePath(){return i(this,S)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,S=new WeakMap,H=new WeakSet,at=function(e){const t=i(this,S)[0][this.routeIndex][1][e],r=m(this,H,Pe).call(this,t);return r&&/\%/.test(r)?Be(r):r},ot=function(){const e={},t=Object.keys(i(this,S)[0][this.routeIndex][1]);for(const r of t){const s=m(this,H,Pe).call(this,i(this,S)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?Be(s):s)}return e},Pe=function(e){return i(this,S)[1]?i(this,S)[1][e]:e},B=new WeakMap,Ye),Lt={Stringify:1},nt=async(e,t,r,s,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const o=e.callbacks;return o!=null&&o.length?(a?a[0]+=e:a=[e],Promise.all(o.map(d=>d({phase:t,buffer:a,context:s}))).then(d=>Promise.all(d.filter(Boolean).map(c=>nt(c,t,!1,s,a))).then(()=>a[0]))):Promise.resolve(e)},Ft="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),me,be,F,ie,P,j,xe,le,ce,J,ye,_e,q,ae,ze,Pt=(ze=class{constructor(e,t){g(this,q);g(this,me);g(this,be);f(this,"env",{});g(this,F);f(this,"finalized",!1);f(this,"error");g(this,ie);g(this,P);g(this,j);g(this,xe);g(this,le);g(this,ce);g(this,J);g(this,ye);g(this,_e);f(this,"render",(...e)=>(i(this,le)??h(this,le,t=>this.html(t)),i(this,le).call(this,...e)));f(this,"setLayout",e=>h(this,xe,e));f(this,"getLayout",()=>i(this,xe));f(this,"setRenderer",e=>{h(this,le,e)});f(this,"header",(e,t,r)=>{this.finalized&&h(this,j,new Response(i(this,j).body,i(this,j)));const s=i(this,j)?i(this,j).headers:i(this,J)??h(this,J,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});f(this,"status",e=>{h(this,ie,e)});f(this,"set",(e,t)=>{i(this,F)??h(this,F,new Map),i(this,F).set(e,t)});f(this,"get",e=>i(this,F)?i(this,F).get(e):void 0);f(this,"newResponse",(...e)=>m(this,q,ae).call(this,...e));f(this,"body",(e,t,r)=>m(this,q,ae).call(this,e,t,r));f(this,"text",(e,t,r)=>!i(this,J)&&!i(this,ie)&&!t&&!r&&!this.finalized?new Response(e):m(this,q,ae).call(this,e,t,Fe(Ft,r)));f(this,"json",(e,t,r)=>m(this,q,ae).call(this,JSON.stringify(e),t,Fe("application/json",r)));f(this,"html",(e,t,r)=>{const s=a=>m(this,q,ae).call(this,a,t,Fe("text/html; charset=UTF-8",r));return typeof e=="object"?nt(e,Lt.Stringify,!1,{}).then(s):s(e)});f(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});f(this,"notFound",()=>(i(this,ce)??h(this,ce,()=>new Response),i(this,ce).call(this,this)));h(this,me,e),t&&(h(this,P,t.executionCtx),this.env=t.env,h(this,ce,t.notFoundHandler),h(this,_e,t.path),h(this,ye,t.matchResult))}get req(){return i(this,be)??h(this,be,new st(i(this,me),i(this,_e),i(this,ye))),i(this,be)}get event(){if(i(this,P)&&"respondWith"in i(this,P))return i(this,P);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,P))return i(this,P);throw Error("This context has no ExecutionContext")}get res(){return i(this,j)||h(this,j,new Response(null,{headers:i(this,J)??h(this,J,new Headers)}))}set res(e){if(i(this,j)&&e){e=new Response(e.body,e);for(const[t,r]of i(this,j).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=i(this,j).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of s)e.headers.append("set-cookie",a)}else e.headers.set(t,r)}h(this,j,e),this.finalized=!0}get var(){return i(this,F)?Object.fromEntries(i(this,F)):{}}},me=new WeakMap,be=new WeakMap,F=new WeakMap,ie=new WeakMap,P=new WeakMap,j=new WeakMap,xe=new WeakMap,le=new WeakMap,ce=new WeakMap,J=new WeakMap,ye=new WeakMap,_e=new WeakMap,q=new WeakSet,ae=function(e,t,r){const s=i(this,j)?new Headers(i(this,j).headers):i(this,J)??new Headers;if(typeof t=="object"&&"headers"in t){const o=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,d]of o)n.toLowerCase()==="set-cookie"?s.append(n,d):s.set(n,d)}if(r)for(const[o,n]of Object.entries(r))if(typeof n=="string")s.set(o,n);else{s.delete(o);for(const d of n)s.append(o,d)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ie);return new Response(e,{status:a,headers:s})},ze),y="ALL",kt="all",Mt=["get","post","put","delete","options","patch"],it="Can not add a route since the matcher is already built.",lt=class extends Error{},Ht="__COMPOSED_HANDLER",Ut=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,_,ct,N,K,Te,je,de,$t=(de=class{constructor(t={}){g(this,_);f(this,"get");f(this,"post");f(this,"put");f(this,"delete");f(this,"options");f(this,"patch");f(this,"all");f(this,"on");f(this,"use");f(this,"router");f(this,"getPath");f(this,"_basePath","/");g(this,C,"/");f(this,"routes",[]);g(this,N,Ut);f(this,"errorHandler",qe);f(this,"onError",t=>(this.errorHandler=t,this));f(this,"notFound",t=>(h(this,N,t),this));f(this,"fetch",(t,...r)=>m(this,_,je).call(this,t,r[1],r[0],t.method));f(this,"request",(t,r,s,a)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,a)));f(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(m(this,_,je).call(this,t.request,t,void 0,t.request.method))})});[...Mt,kt].forEach(o=>{this[o]=(n,...d)=>(typeof n=="string"?h(this,C,n):m(this,_,K).call(this,o,i(this,C),n),d.forEach(c=>{m(this,_,K).call(this,o,i(this,C),c)}),this)}),this.on=(o,n,...d)=>{for(const c of[n].flat()){h(this,C,c);for(const l of[o].flat())d.map(p=>{m(this,_,K).call(this,l.toUpperCase(),i(this,C),p)})}return this},this.use=(o,...n)=>(typeof o=="string"?h(this,C,o):(h(this,C,"*"),n.unshift(o)),n.forEach(d=>{m(this,_,K).call(this,y,i(this,C),d)}),this);const{strict:s,...a}=t;Object.assign(this,a),this.getPath=s??!0?t.getPath??Ze:At}route(t,r){const s=this.basePath(t);return r.routes.map(a=>{var n;let o;r.errorHandler===qe?o=a.handler:(o=async(d,c)=>(await $e([],r.errorHandler)(d,()=>a.handler(d,c))).res,o[Ht]=a.handler),m(n=s,_,K).call(n,a.method,a.path,o)}),this}basePath(t){const r=m(this,_,ct).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let a,o;s&&(typeof s=="function"?o=s:(o=s.optionHandler,s.replaceRequest===!1?a=c=>c:a=s.replaceRequest));const n=o?c=>{const l=o(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};a||(a=(()=>{const c=se(this._basePath,t),l=c==="/"?0:c.length;return p=>{const u=new URL(p.url);return u.pathname=u.pathname.slice(l)||"/",new Request(u,p)}})());const d=async(c,l)=>{const p=await r(a(c.req.raw),...n(c));if(p)return p;await l()};return m(this,_,K).call(this,y,se(t,"*"),d),this}},C=new WeakMap,_=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,h(t,N,i(this,N)),t.routes=this.routes,t},N=new WeakMap,K=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const a={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,a]),this.routes.push(a)},Te=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},je=function(t,r,s,a){if(a==="HEAD")return(async()=>new Response(null,await m(this,_,je).call(this,t,r,s,"GET")))();const o=this.getPath(t,{env:s}),n=this.router.match(a,o),d=new Pt(t,{path:o,matchResult:n,env:s,executionCtx:r,notFoundHandler:i(this,N)});if(n[0].length===1){let l;try{l=n[0][0][0][0](d,async()=>{d.res=await i(this,N).call(this,d)})}catch(p){return m(this,_,Te).call(this,p,d)}return l instanceof Promise?l.then(p=>p||(d.finalized?d.res:i(this,N).call(this,d))).catch(p=>m(this,_,Te).call(this,p,d)):l??i(this,N).call(this,d)}const c=$e(n[0],this.errorHandler,i(this,N));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return m(this,_,Te).call(this,l,d)}})()},de),dt=[];function Bt(e,t){const r=this.buildAllMatchers(),s=((a,o)=>{const n=r[a]||r[y],d=n[2][o];if(d)return d;const c=o.match(n[0]);if(!c)return[[],dt];const l=c.indexOf("",1);return[n[1][l],c]});return this.match=s,s(e,t)}var Ce="[^/]+",ve=".*",ge="(?:|/.*)",oe=Symbol(),qt=new Set(".\\+*[^]$()");function Wt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ve||e===ge?1:t===ve||t===ge?-1:e===Ce?1:t===Ce?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var X,Q,A,te,Vt=(te=class{constructor(){g(this,X);g(this,Q);g(this,A,Object.create(null))}insert(t,r,s,a,o){if(t.length===0){if(i(this,X)!==void 0)throw oe;if(o)return;h(this,X,r);return}const[n,...d]=t,c=n==="*"?d.length===0?["","",ve]:["","",Ce]:n==="/*"?["","",ge]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const p=c[1];let u=c[2]||Ce;if(p&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw oe;if(l=i(this,A)[u],!l){if(Object.keys(i(this,A)).some(v=>v!==ve&&v!==ge))throw oe;if(o)return;l=i(this,A)[u]=new te,p!==""&&h(l,Q,a.varIndex++)}!o&&p!==""&&s.push([p,i(l,Q)])}else if(l=i(this,A)[n],!l){if(Object.keys(i(this,A)).some(p=>p.length>1&&p!==ve&&p!==ge))throw oe;if(o)return;l=i(this,A)[n]=new te}l.insert(d,r,s,a,o)}buildRegExpStr(){const r=Object.keys(i(this,A)).sort(Wt).map(s=>{const a=i(this,A)[s];return(typeof i(a,Q)=="number"?`(${s})@${i(a,Q)}`:qt.has(s)?`\\${s}`:s)+a.buildRegExpStr()});return typeof i(this,X)=="number"&&r.unshift(`#${i(this,X)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},X=new WeakMap,Q=new WeakMap,A=new WeakMap,te),Ne,we,Ke,Yt=(Ke=class{constructor(){g(this,Ne,{varIndex:0});g(this,we,new Vt)}insert(e,t,r){const s=[],a=[];for(let n=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${n}`;return a[n]=[l,c],n++,d=!0,l}),!d)break}const o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=a.length-1;n>=0;n--){const[d]=a[n];for(let c=o.length-1;c>=0;c--)if(o[c].indexOf(d)!==-1){o[c]=o[c].replace(d,a[n][1]);break}}return i(this,we).insert(o,t,s,i(this,Ne),r),s}buildRegExp(){let e=i(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,o,n)=>o!==void 0?(r[++t]=Number(o),"$()"):(n!==void 0&&(s[Number(n)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Ne=new WeakMap,we=new WeakMap,Ke),zt=[/^$/,[],Object.create(null)],Se=Object.create(null);function pt(e){return Se[e]??(Se[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Kt(){Se=Object.create(null)}function Gt(e){var l;const t=new Yt,r=[];if(e.length===0)return zt;const s=e.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,u],[v,x])=>p?1:v?-1:u.length-x.length),a=Object.create(null);for(let p=0,u=-1,v=s.length;p<v;p++){const[x,w,D]=s[p];x?a[w]=[D.map(([E])=>[E,Object.create(null)]),dt]:u++;let b;try{b=t.insert(w,u,x)}catch(E){throw E===oe?new lt(w):E}x||(r[u]=D.map(([E,U])=>{const Ee=Object.create(null);for(U-=1;U>=0;U--){const[Re,I]=b[U];Ee[Re]=I}return[E,Ee]}))}const[o,n,d]=t.buildRegExp();for(let p=0,u=r.length;p<u;p++)for(let v=0,x=r[p].length;v<x;v++){const w=(l=r[p][v])==null?void 0:l[1];if(!w)continue;const D=Object.keys(w);for(let b=0,E=D.length;b<E;b++)w[D[b]]=d[w[D[b]]]}const c=[];for(const p in n)c[p]=r[n[p]];return[o,c,a]}function re(e,t){if(e){for(const r of Object.keys(e).sort((s,a)=>a.length-s.length))if(pt(r).test(t))return[...e[r]]}}var W,V,Ae,ut,Ge,Jt=(Ge=class{constructor(){g(this,Ae);f(this,"name","RegExpRouter");g(this,W);g(this,V);f(this,"match",Bt);h(this,W,{[y]:Object.create(null)}),h(this,V,{[y]:Object.create(null)})}add(e,t,r){var d;const s=i(this,W),a=i(this,V);if(!s||!a)throw new Error(it);s[e]||[s,a].forEach(c=>{c[e]=Object.create(null),Object.keys(c[y]).forEach(l=>{c[e][l]=[...c[y][l]]})}),t==="/*"&&(t="*");const o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=pt(t);e===y?Object.keys(s).forEach(l=>{var p;(p=s[l])[t]||(p[t]=re(s[l],t)||re(s[y],t)||[])}):(d=s[e])[t]||(d[t]=re(s[e],t)||re(s[y],t)||[]),Object.keys(s).forEach(l=>{(e===y||e===l)&&Object.keys(s[l]).forEach(p=>{c.test(p)&&s[l][p].push([r,o])})}),Object.keys(a).forEach(l=>{(e===y||e===l)&&Object.keys(a[l]).forEach(p=>c.test(p)&&a[l][p].push([r,o]))});return}const n=et(t)||[t];for(let c=0,l=n.length;c<l;c++){const p=n[c];Object.keys(a).forEach(u=>{var v;(e===y||e===u)&&((v=a[u])[p]||(v[p]=[...re(s[u],p)||re(s[y],p)||[]]),a[u][p].push([r,o-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,V)).concat(Object.keys(i(this,W))).forEach(t=>{e[t]||(e[t]=m(this,Ae,ut).call(this,t))}),h(this,W,h(this,V,void 0)),Kt(),e}},W=new WeakMap,V=new WeakMap,Ae=new WeakSet,ut=function(e){const t=[];let r=e===y;return[i(this,W),i(this,V)].forEach(s=>{const a=s[e]?Object.keys(s[e]).map(o=>[o,s[e][o]]):[];a.length!==0?(r||(r=!0),t.push(...a)):e!==y&&t.push(...Object.keys(s[y]).map(o=>[o,s[y][o]]))}),r?Gt(t):null},Ge),Y,k,Je,Xt=(Je=class{constructor(e){f(this,"name","SmartRouter");g(this,Y,[]);g(this,k,[]);h(this,Y,e.routers)}add(e,t,r){if(!i(this,k))throw new Error(it);i(this,k).push([e,t,r])}match(e,t){if(!i(this,k))throw new Error("Fatal error");const r=i(this,Y),s=i(this,k),a=r.length;let o=0,n;for(;o<a;o++){const d=r[o];try{for(let c=0,l=s.length;c<l;c++)d.add(...s[c]);n=d.match(e,t)}catch(c){if(c instanceof lt)continue;throw c}this.match=d.match.bind(d),h(this,Y,[d]),h(this,k,void 0);break}if(o===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(i(this,k)||i(this,Y).length!==1)throw new Error("No active router has been determined yet.");return i(this,Y)[0]}},Y=new WeakMap,k=new WeakMap,Je),fe=Object.create(null),z,T,Z,pe,O,M,G,ue,Qt=(ue=class{constructor(t,r,s){g(this,M);g(this,z);g(this,T);g(this,Z);g(this,pe,0);g(this,O,fe);if(h(this,T,s||Object.create(null)),h(this,z,[]),t&&r){const a=Object.create(null);a[t]={handler:r,possibleKeys:[],score:0},h(this,z,[a])}h(this,Z,[])}insert(t,r,s){h(this,pe,++Ue(this,pe)._);let a=this;const o=Tt(r),n=[];for(let d=0,c=o.length;d<c;d++){const l=o[d],p=o[d+1],u=Ct(l,p),v=Array.isArray(u)?u[0]:l;if(v in i(a,T)){a=i(a,T)[v],u&&n.push(u[1]);continue}i(a,T)[v]=new ue,u&&(i(a,Z).push(u),n.push(u[1])),a=i(a,T)[v]}return i(a,z).push({[t]:{handler:s,possibleKeys:n.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,pe)}}),a}search(t,r){var c;const s=[];h(this,O,fe);let o=[this];const n=Qe(r),d=[];for(let l=0,p=n.length;l<p;l++){const u=n[l],v=l===p-1,x=[];for(let w=0,D=o.length;w<D;w++){const b=o[w],E=i(b,T)[u];E&&(h(E,O,i(b,O)),v?(i(E,T)["*"]&&s.push(...m(this,M,G).call(this,i(E,T)["*"],t,i(b,O))),s.push(...m(this,M,G).call(this,E,t,i(b,O)))):x.push(E));for(let U=0,Ee=i(b,Z).length;U<Ee;U++){const Re=i(b,Z)[U],I=i(b,O)===fe?{}:{...i(b,O)};if(Re==="*"){const $=i(b,T)["*"];$&&(s.push(...m(this,M,G).call(this,$,t,i(b,O))),h($,O,I),x.push($));continue}const[gt,Me,he]=Re;if(!u&&!(he instanceof RegExp))continue;const L=i(b,T)[gt],mt=n.slice(l).join("/");if(he instanceof RegExp){const $=he.exec(mt);if($){if(I[Me]=$[0],s.push(...m(this,M,G).call(this,L,t,i(b,O),I)),Object.keys(i(L,T)).length){h(L,O,I);const De=((c=$[0].match(/\//))==null?void 0:c.length)??0;(d[De]||(d[De]=[])).push(L)}continue}}(he===!0||he.test(u))&&(I[Me]=u,v?(s.push(...m(this,M,G).call(this,L,t,I,i(b,O))),i(L,T)["*"]&&s.push(...m(this,M,G).call(this,i(L,T)["*"],t,I,i(b,O)))):(h(L,O,I),x.push(L)))}}o=x.concat(d.shift()??[])}return s.length>1&&s.sort((l,p)=>l.score-p.score),[s.map(({handler:l,params:p})=>[l,p])]}},z=new WeakMap,T=new WeakMap,Z=new WeakMap,pe=new WeakMap,O=new WeakMap,M=new WeakSet,G=function(t,r,s,a){const o=[];for(let n=0,d=i(t,z).length;n<d;n++){const c=i(t,z)[n],l=c[r]||c[y],p={};if(l!==void 0&&(l.params=Object.create(null),o.push(l),s!==fe||a&&a!==fe))for(let u=0,v=l.possibleKeys.length;u<v;u++){const x=l.possibleKeys[u],w=p[l.score];l.params[x]=a!=null&&a[x]&&!w?a[x]:s[x]??(a==null?void 0:a[x]),p[l.score]=!0}}return o},ue),ee,Xe,Zt=(Xe=class{constructor(){f(this,"name","TrieRouter");g(this,ee);h(this,ee,new Qt)}add(e,t,r){const s=et(t);if(s){for(let a=0,o=s.length;a<o;a++)i(this,ee).insert(e,s[a],r);return}i(this,ee).insert(e,t,r)}match(e,t){return i(this,ee).search(e,t)}},ee=new WeakMap,Xe),ht=class extends $t{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Jt,new Zt]})}},er=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(o=>typeof o=="string"?o==="*"?()=>o:n=>o===n?n:null:typeof o=="function"?o:n=>o.includes(n)?n:null)(r.origin),a=(o=>typeof o=="function"?o:Array.isArray(o)?()=>o:()=>[])(r.allowMethods);return async function(n,d){var p;function c(u,v){n.res.headers.set(u,v)}const l=await s(n.req.header("origin")||"",n);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(p=r.exposeHeaders)!=null&&p.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),n.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const u=await a(n.req.header("origin")||"",n);u.length&&c("Access-Control-Allow-Methods",u.join(","));let v=r.allowHeaders;if(!(v!=null&&v.length)){const x=n.req.header("Access-Control-Request-Headers");x&&(v=x.split(/\s*,\s*/))}return v!=null&&v.length&&(c("Access-Control-Allow-Headers",v.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await d(),r.origin!=="*"&&n.header("Vary","Origin",{append:!0})}},tr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=sr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let a=t[s[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},rr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sr=rr,ar=(...e)=>{let t=e.filter(a=>a!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const a of r)a===".."&&s.length>0&&s.at(-1)!==".."?s.pop():a!=="."&&s.push(a);return s.join("/")||"."},ft={br:".br",zstd:".zst",gzip:".gz"},or=Object.keys(ft),nr="index.html",ir=e=>{const t=e.root??"./",r=e.path,s=e.join??ar;return async(a,o)=>{var p,u,v,x;if(a.finalized)return o();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((p=e.onNotFound)==null?void 0:p.call(e,a.req.path,a)),o()}let d=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(d)&&(d=s(d,nr));const c=e.getContent;let l=await c(d,a);if(l instanceof Response)return a.newResponse(l.body,l);if(l){const w=e.mimes&&We(d,e.mimes)||We(d);if(a.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||tr.test(w))){const D=new Set((u=a.req.header("Accept-Encoding"))==null?void 0:u.split(",").map(b=>b.trim()));for(const b of or){if(!D.has(b))continue;const E=await c(d+ft[b],a);if(E){l=E,a.header("Content-Encoding",b),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((v=e.onFound)==null?void 0:v.call(e,d,a)),a.body(l)}await((x=e.onNotFound)==null?void 0:x.call(e,d,a)),await o()}},lr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const a=r[e]||e;if(!a)return null;const o=await s.get(a,{type:"stream"});return o||null},cr=e=>async function(r,s){return ir({...e,getContent:async o=>lr(o,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},dr=e=>cr(e);const R=new ht;R.use("/api/*",er());R.use("/static/*",dr({root:"./public"}));R.get("/api/dashboard/summary",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),s=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_oncology = 'Y'
    `).first(),a=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_novel = 'Y'
    `).first(),o=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_biosimilar = 'Y'
    `).first(),n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_orphan = 'Y'
    `).first();return e.json({total:(r==null?void 0:r.count)||0,oncology:(s==null?void 0:s.count)||0,novel:(a==null?void 0:a.count)||0,biosimilar:(o==null?void 0:o.count)||0,orphan:(n==null?void 0:n.count)||0})}catch(r){return console.error("Summary error:",r),e.json({error:"Failed to fetch summary"},500)}});R.get("/api/dashboard/therapeutic-area",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        therapeutic_area,
        COUNT(*) as count
      FROM fda_approvals
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != ''
      GROUP BY therapeutic_area
      ORDER BY count DESC
      LIMIT 10
    `).all();return e.json(r.results||[])}catch(r){return console.error("Therapeutic area error:",r),e.json({error:"Failed to fetch therapeutic areas"},500)}});R.get("/api/dashboard/sponsors",async e=>{const{DB:t}=e.env,r=e.req.query("limit")||"10";try{const s=await t.prepare(`
      SELECT 
        sponsor,
        COUNT(*) as count
      FROM fda_approvals
      WHERE sponsor IS NOT NULL AND sponsor != ''
      GROUP BY sponsor
      ORDER BY count DESC
      LIMIT ?
    `).bind(parseInt(r)).all();return e.json(s.results||[])}catch(s){return console.error("Sponsors error:",s),e.json({error:"Failed to fetch sponsors"},500)}});R.get("/api/dashboard/monthly-trend",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        approval_month,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_month IS NOT NULL
      GROUP BY approval_month
      ORDER BY approval_month ASC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Monthly trend error:",r),e.json({error:"Failed to fetch monthly trend"},500)}});R.get("/api/dashboard/approval-types",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        approval_type,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_type IS NOT NULL AND approval_type != ''
      GROUP BY approval_type
      ORDER BY count DESC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Approval types error:",r),e.json({error:"Failed to fetch approval types"},500)}});R.get("/api/approvals",async e=>{const{DB:t}=e.env,r=parseInt(e.req.query("page")||"1"),s=parseInt(e.req.query("limit")||"20"),a=(r-1)*s;try{const o=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),n=await t.prepare(`
      SELECT * FROM fda_approvals
      ORDER BY approval_date DESC
      LIMIT ? OFFSET ?
    `).bind(s,a).all();return e.json({data:n.results||[],pagination:{page:r,limit:s,total:(o==null?void 0:o.count)||0,totalPages:Math.ceil(((o==null?void 0:o.count)||0)/s)}})}catch(o){return console.error("Approvals list error:",o),e.json({error:"Failed to fetch approvals"},500)}});R.get("/api/approvals/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id");try{const s=await t.prepare(`
      SELECT * FROM fda_approvals WHERE id = ?
    `).bind(r).first();return s?e.json(s):e.json({error:"Not found"},404)}catch(s){return console.error("Approval detail error:",s),e.json({error:"Failed to fetch approval detail"},500)}});R.get("/api/approvals/search/:query",async e=>{const{DB:t}=e.env,r=e.req.param("query");if(!r||r.trim()==="")return e.json({error:"Query parameter required"},400);try{const s=`%${r}%`,a=await t.prepare(`
      SELECT * FROM fda_approvals
      WHERE 
        product_name LIKE ? OR
        active_ingredient LIKE ? OR
        sponsor LIKE ? OR
        indication LIKE ?
      ORDER BY approval_date DESC
      LIMIT 50
    `).bind(s,s,s,s).all();return e.json(a.results||[])}catch(s){return console.error("Search error:",s),e.json({error:"Failed to search approvals"},500)}});R.post("/api/approvals/filter",async e=>{const{DB:t}=e.env;try{const r=await e.req.json();let s="SELECT * FROM fda_approvals WHERE 1=1";const a=[];r.approval_month&&(s+=" AND approval_month = ?",a.push(r.approval_month)),r.therapeutic_area&&(s+=" AND therapeutic_area = ?",a.push(r.therapeutic_area)),r.is_oncology&&(s+=" AND is_oncology = ?",a.push(r.is_oncology)),r.is_novel&&(s+=" AND is_novel = ?",a.push(r.is_novel)),r.is_biosimilar&&(s+=" AND is_biosimilar = ?",a.push(r.is_biosimilar)),r.is_orphan&&(s+=" AND is_orphan = ?",a.push(r.is_orphan)),r.sponsor&&(s+=" AND sponsor = ?",a.push(r.sponsor)),r.approval_type&&(s+=" AND approval_type = ?",a.push(r.approval_type)),s+=" ORDER BY approval_date DESC LIMIT 100";const o=await t.prepare(s).bind(...a).all();return e.json(o.results||[])}catch(r){return console.error("Filter error:",r),e.json({error:"Failed to filter approvals"},500)}});R.get("/api/filters/options",async e=>{var r,s,a,o;const{DB:t}=e.env;try{const n=await t.prepare(`
      SELECT DISTINCT approval_month FROM fda_approvals 
      WHERE approval_month IS NOT NULL 
      ORDER BY approval_month DESC
    `).all(),d=await t.prepare(`
      SELECT DISTINCT therapeutic_area FROM fda_approvals 
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != '' AND therapeutic_area != 'Not specified'
      ORDER BY therapeutic_area
    `).all(),c=await t.prepare(`
      SELECT DISTINCT sponsor FROM fda_approvals 
      WHERE sponsor IS NOT NULL AND sponsor != ''
      ORDER BY sponsor
    `).all(),l=await t.prepare(`
      SELECT DISTINCT approval_type FROM fda_approvals 
      WHERE approval_type IS NOT NULL AND approval_type != ''
      ORDER BY approval_type
    `).all();return e.json({months:((r=n.results)==null?void 0:r.map(p=>p.approval_month))||[],therapeutic_areas:((s=d.results)==null?void 0:s.map(p=>p.therapeutic_area))||[],sponsors:((a=c.results)==null?void 0:a.map(p=>p.sponsor))||[],approval_types:((o=l.results)==null?void 0:o.map(p=>p.approval_type))||[]})}catch(n){return console.error("Filter options error:",n),e.json({error:"Failed to fetch filter options"},500)}});R.get("/api/versions",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT * FROM data_versions 
      ORDER BY uploaded_at DESC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Versions error:",r),e.json({error:"Failed to fetch versions"},500)}});R.post("/api/versions/backup",async e=>{const{DB:t}=e.env;try{const r=await e.req.json(),{version_name:s,month:a,description:o}=r,n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),d=(n==null?void 0:n.count)||0,l=(await t.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description)
      VALUES (?, ?, ?, ?)
    `).bind(s,a,d,o||"").run()).meta.last_row_id;return await t.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(l).run(),e.json({success:!0,version_id:l,record_count:d})}catch(r){return console.error("Backup error:",r),e.json({error:"Failed to create backup"},500)}});R.post("/api/versions/restore/:versionId",async e=>{const{DB:t}=e.env,r=e.req.param("versionId");try{const s=await t.prepare(`
      SELECT * FROM data_versions WHERE id = ?
    `).bind(r).first();return s?(await t.prepare("DELETE FROM fda_approvals").run(),await t.prepare(`
      INSERT INTO fda_approvals 
      SELECT NULL as id,
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals_backup
      WHERE version_id = ?
    `).bind(r).run(),await t.prepare("UPDATE data_versions SET is_active = 0").run(),await t.prepare("UPDATE data_versions SET is_active = 1 WHERE id = ?").bind(r).run(),e.json({success:!0,version_name:s.version_name,record_count:s.record_count})):e.json({error:"Version not found"},404)}catch(s){return console.error("Restore error:",s),e.json({error:"Failed to restore version"},500)}});R.post("/api/data/upload",async e=>{const{DB:t}=e.env;try{const r=await e.req.json(),{data:s,version_name:a,month:o,description:n}=r;if(!s||!Array.isArray(s)||s.length===0)return e.json({error:"Invalid data format"},400);const d=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),c=(d==null?void 0:d.count)||0;if(c>0){const v=(await t.prepare(`
        INSERT INTO data_versions (version_name, month, record_count, description, is_active)
        VALUES (?, ?, ?, ?, ?)
      `).bind(`Backup before ${a}`,o||"unknown",c,"Auto backup before new data upload",0).run()).meta.last_row_id;await t.prepare(`
        INSERT INTO fda_approvals_backup 
        SELECT NULL as id, ? as version_id, 
               approval_month, approval_date, nda_bla_number, application_number,
               application_type, product_name, active_ingredient, sponsor,
               indication, therapeutic_area, is_oncology, is_biosimilar,
               is_novel, is_orphan, approval_type, remarks,
               fda_approval_page, fda_drugs_url, approval_letter,
               source, data_collection_date, created_at
        FROM fda_approvals
      `).bind(v).run()}await t.prepare("DELETE FROM fda_approvals").run();for(const u of s)await t.prepare(`
        INSERT INTO fda_approvals (
          approval_month, approval_date, nda_bla_number, application_number,
          application_type, product_name, active_ingredient, sponsor,
          indication, therapeutic_area, is_oncology, is_biosimilar,
          is_novel, is_orphan, approval_type, remarks,
          fda_approval_page, fda_drugs_url, approval_letter,
          source, data_collection_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(u.approval_month,u.approval_date,u.nda_bla_number,u.application_number,u.application_type,u.product_name,u.active_ingredient,u.sponsor,u.indication,u.therapeutic_area,u.is_oncology,u.is_biosimilar,u.is_novel,u.is_orphan,u.approval_type,u.remarks,u.fda_approval_page,u.fda_drugs_url,u.approval_letter,u.source,u.data_collection_date).run();const p=(await t.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).bind(a,o,s.length,n||"",1).run()).meta.last_row_id;return await t.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(p).run(),e.json({success:!0,version_id:p,record_count:s.length,old_record_count:c})}catch(r){return console.error("Upload error:",r),e.json({error:"Failed to upload data: "+r.message},500)}});R.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FDA 승인 대시보드 - 2026년 1월</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    </head>
    <body class="bg-gray-50">
        <!-- 헤더 -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            <i class="fas fa-pills text-blue-600 mr-2"></i>
                            FDA 승인 대시보드
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">전문의약품 승인 현황 관리</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600">현재 버전</p>
                        <p class="text-lg font-semibold text-gray-900" id="current-version">-</p>
                    </div>
                </div>
            </div>
            
            <!-- 탭 네비게이션 -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex space-x-4 border-t border-gray-200">
                    <button onclick="switchTab('dashboard')" id="tab-dashboard" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                        <i class="fas fa-chart-line mr-2"></i>대시보드
                    </button>
                    <button onclick="switchTab('data-manage')" id="tab-data-manage" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-upload mr-2"></i>데이터 관리
                    </button>
                    <button onclick="switchTab('versions')" id="tab-versions" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-history mr-2"></i>버전 관리
                    </button>
                </nav>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <!-- 대시보드 탭 -->
            <div id="dashboard-tab" class="tab-content">
                <!-- 필터 영역 -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-filter text-blue-600 mr-2"></i>
                            필터
                        </h2>
                        <button onclick="resetFilters()" class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            <i class="fas fa-redo mr-2"></i>필터 초기화
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">승인 월</label>
                            <select id="filter-month" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">치료영역</label>
                            <select id="filter-therapeutic-area" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">제약사</label>
                            <select id="filter-sponsor" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">승인 유형</label>
                            <select id="filter-approval-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">구분</label>
                            <select id="filter-category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                                <option value="oncology">항암제</option>
                                <option value="novel">신약</option>
                                <option value="biosimilar">바이오시밀러</option>
                                <option value="orphan">희귀의약품</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button onclick="applyFilters()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-search mr-2"></i>필터 적용
                        </button>
                    </div>
                </div>
                
                <!-- 요약 통계 카드 -->
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">전체 승인</p>
                                <p class="text-3xl font-bold text-gray-900" id="total-count">-</p>
                            </div>
                            <i class="fas fa-check-circle text-4xl text-blue-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">항암제</p>
                                <p class="text-3xl font-bold text-gray-900" id="oncology-count">-</p>
                            </div>
                            <i class="fas fa-ribbon text-4xl text-red-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">신약</p>
                                <p class="text-3xl font-bold text-gray-900" id="novel-count">-</p>
                            </div>
                            <i class="fas fa-star text-4xl text-green-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">바이오시밀러</p>
                                <p class="text-3xl font-bold text-gray-900" id="biosimilar-count">-</p>
                            </div>
                            <i class="fas fa-dna text-4xl text-purple-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">희귀의약품</p>
                                <p class="text-3xl font-bold text-gray-900" id="orphan-count">-</p>
                            </div>
                            <i class="fas fa-heart text-4xl text-orange-500"></i>
                        </div>
                    </div>
                </div>

                <!-- 차트 영역 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- 치료영역별 분포 -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-pie text-blue-600 mr-2"></i>
                            치료영역별 분포 (Top 10)
                        </h2>
                        <canvas id="therapeuticAreaChart"></canvas>
                    </div>
                    
                    <!-- 제약사별 승인 건수 -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-bar text-green-600 mr-2"></i>
                            제약사별 승인 건수 (Top 10)
                        </h2>
                        <canvas id="sponsorsChart"></canvas>
                    </div>
                </div>

                <!-- 승인 목록 테이블 -->
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-list text-blue-600 mr-2"></i>
                            승인 목록
                        </h2>
                        <div class="flex items-center gap-2">
                            <input type="text" id="search-input" placeholder="검색..." 
                                   class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <button id="search-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">승인일</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품명</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주성분</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제약사</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">치료영역</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상세</th>
                                </tr>
                            </thead>
                            <tbody id="approvals-table" class="bg-white divide-y divide-gray-200">
                                <!-- 데이터가 여기에 동적으로 추가됩니다 -->
                            </tbody>
                        </table>
                    </div>
                    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div class="text-sm text-gray-600" id="pagination-info">
                            로딩 중...
                        </div>
                        <div class="flex gap-2">
                            <button id="prev-page" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                                이전
                            </button>
                            <button id="next-page" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 데이터 관리 탭 -->
            <div id="data-manage-tab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                        <i class="fas fa-upload text-blue-600 mr-2"></i>
                        새로운 데이터 업로드
                    </h2>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">버전 이름</label>
                        <input type="text" id="version-name" placeholder="예: 2026년 2월 FDA 승인 데이터"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">승인 월</label>
                        <input type="month" id="data-month"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">설명 (선택사항)</label>
                        <textarea id="version-description" rows="3" placeholder="데이터에 대한 설명을 입력하세요..."
                                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-file-excel mr-2"></i>
                            엑셀 파일 선택
                        </label>
                        <input type="file" id="excel-file" accept=".xlsx,.xls"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <p class="mt-2 text-sm text-gray-500">
                            <i class="fas fa-info-circle mr-1"></i>
                            지원 형식: .xlsx, .xls | 'English' 시트에서 데이터를 읽어옵니다.
                        </p>
                    </div>
                    
                    <div id="upload-preview" class="mb-6 hidden">
                        <h3 class="text-sm font-medium text-gray-700 mb-2">미리보기</h3>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-600">
                                <span class="font-semibold">레코드 수:</span> <span id="preview-count">0</span>건
                            </p>
                            <p class="text-sm text-gray-600 mt-2">
                                <span class="font-semibold">주요 정보:</span> <span id="preview-info">-</span>
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <button onclick="uploadExcel()" id="upload-btn" 
                                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            <i class="fas fa-cloud-upload-alt mr-2"></i>
                            업로드 및 적용
                        </button>
                        <button onclick="backupCurrentData()" 
                                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <i class="fas fa-save mr-2"></i>
                            현재 데이터 백업만 하기
                        </button>
                    </div>
                    
                    <div id="upload-status" class="mt-6 hidden">
                        <!-- 업로드 상태 메시지 -->
                    </div>
                </div>
            </div>
            
            <!-- 버전 관리 탭 -->
            <div id="versions-tab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-history text-blue-600 mr-2"></i>
                            데이터 버전 히스토리
                        </h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">버전 이름</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">레코드 수</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드 일시</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                                </tr>
                            </thead>
                            <tbody id="versions-table" class="bg-white divide-y divide-gray-200">
                                <!-- 버전 목록이 여기에 동적으로 추가됩니다 -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

        <!-- 푸터 -->
        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-gray-500">
                    데이터 출처: FDA Official + Drugs.com + ASCO | 
                    Powered by Hono + Cloudflare Pages
                </p>
            </div>
        </footer>

        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Ve=new ht,pr=Object.assign({"/src/index.tsx":R});let vt=!1;for(const[,e]of Object.entries(pr))e&&(Ve.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Ve.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),vt=!0);if(!vt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ve as default};
