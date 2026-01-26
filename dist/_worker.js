var mt=Object.defineProperty;var $e=e=>{throw TypeError(e)};var yt=(e,t,r)=>t in e?mt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>yt(e,typeof t!="symbol"?t+"":t,r),Pe=(e,t,r)=>t.has(e)||$e("Cannot "+r);var o=(e,t,r)=>(Pe(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?$e("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Pe(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Pe(e,t,"access private method"),r);var qe=(e,t,r,s)=>({set _(a){f(e,t,a,r)},get _(){return o(e,t,s)}});var Ue=(e,t,r)=>(s,a)=>{let n=-1;return i(0);async function i(d){if(d<=n)throw new Error("next() called multiple times");n=d;let l,c=!1,h;if(e[d]?(h=e[d][0][0],s.req.routeIndex=d):h=d===e.length&&a||void 0,h)try{l=await h(s,()=>i(d+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),c=!0;else throw u}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||c)&&(s.res=l),s}},bt=Symbol(),wt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,n=(e instanceof st?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?Et(e,{all:r,dot:s}):{}};async function Et(e,t){const r=await e.formData();return r?Rt(r,t):{}}function Rt(e,t){const r=Object.create(null);return e.forEach((s,a)=>{t.all||a.endsWith("[]")?Ot(r,a,s):r[a]=s}),t.dot&&Object.entries(r).forEach(([s,a])=>{s.includes(".")&&(jt(r,s,a),delete r[s])}),r}var Ot=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},jt=(e,t,r)=>{let s=e;const a=t.split(".");a.forEach((n,i)=>{i===a.length-1?s[n]=r:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ct=e=>{const{groups:t,path:r}=_t(e),s=Qe(r);return Tt(s,t)},_t=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const a=`@${s}`;return t.push([a,r]),a}),{groups:t,path:e}},Tt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let a=e.length-1;a>=0;a--)if(e[a].includes(s)){e[a]=e[a].replace(s,t[r][1]);break}}return e},je={},St=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return je[s]||(r[2]?je[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:je[s]=[e,r[1],!0]),je[s]}return null},Fe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},At=e=>Fe(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const a=t.charCodeAt(s);if(a===37){const n=t.indexOf("?",s),i=t.slice(r,n===-1?void 0:n);return At(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(a===63)break}return t.slice(r,s)},Nt=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))s+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){r.length===0&&s===""?r.push("/"):r.push(s);const n=a.replace("?","");s+="/"+n,r.push(s)}else s+="/"+a}),r.filter((a,n,i)=>i.indexOf(a)===n)},He=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Fe(e,rt):e):e,tt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const d=e.charCodeAt(i+t.length+1);if(d===61){const l=i+t.length+2,c=e.indexOf("&",l);return He(e.slice(l,c===-1?void 0:c))}else if(d==38||isNaN(d))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const a={};s??(s=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const i=e.indexOf("&",n+1);let d=e.indexOf("=",n);d>i&&i!==-1&&(d=-1);let l=e.slice(n+1,d===-1?i===-1?void 0:i:d);if(s&&(l=He(l)),n=i,l==="")continue;let c;d===-1?c="":(c=e.slice(d+1,i===-1?void 0:i),s&&(c=He(c))),r?(a[l]&&Array.isArray(a[l])||(a[l]=[]),a[l].push(c)):a[l]??(a[l]=c)}return t?a[t]:a},Dt=tt,Pt=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,ke=e=>Fe(e,rt),ie,T,$,at,nt,Le,k,Ye,st=(Ye=class{constructor(e,t="/",r=[[]]){g(this,$);p(this,"raw");g(this,ie);g(this,T);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,k,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const a=Object.keys(t)[0];return a?t[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,T,r),f(this,ie,{})}param(e){return e?x(this,$,at).call(this,e):x(this,$,nt).call(this)}query(e){return Dt(this.url,e)}queries(e){return Pt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await wt(this,e))}json(){return o(this,k).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,k).call(this,"text")}arrayBuffer(){return o(this,k).call(this,"arrayBuffer")}blob(){return o(this,k).call(this,"blob")}formData(){return o(this,k).call(this,"formData")}addValidatedData(e,t){o(this,ie)[e]=t}valid(e){return o(this,ie)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[bt](){return o(this,T)}get matchedRoutes(){return o(this,T)[0].map(([[,e]])=>e)}get routePath(){return o(this,T)[0].map(([[,e]])=>e)[this.routeIndex].path}},ie=new WeakMap,T=new WeakMap,$=new WeakSet,at=function(e){const t=o(this,T)[0][this.routeIndex][1][e],r=x(this,$,Le).call(this,t);return r&&/\%/.test(r)?ke(r):r},nt=function(){const e={},t=Object.keys(o(this,T)[0][this.routeIndex][1]);for(const r of t){const s=x(this,$,Le).call(this,o(this,T)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?ke(s):s)}return e},Le=function(e){return o(this,T)[1]?o(this,T)[1][e]:e},k=new WeakMap,Ye),Ht={Stringify:1},it=async(e,t,r,s,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(a?a[0]+=e:a=[e],Promise.all(n.map(d=>d({phase:t,buffer:a,context:s}))).then(d=>Promise.all(d.filter(Boolean).map(l=>it(l,t,!1,s,a))).then(()=>a[0]))):Promise.resolve(e)},It="text/plain; charset=UTF-8",Ie=(e,t)=>({"Content-Type":e,...t}),xe,me,I,oe,L,C,ye,ce,le,J,be,we,B,ae,Ke,Lt=(Ke=class{constructor(e,t){g(this,B);g(this,xe);g(this,me);p(this,"env",{});g(this,I);p(this,"finalized",!1);p(this,"error");g(this,oe);g(this,L);g(this,C);g(this,ye);g(this,ce);g(this,le);g(this,J);g(this,be);g(this,we);p(this,"render",(...e)=>(o(this,ce)??f(this,ce,t=>this.html(t)),o(this,ce).call(this,...e)));p(this,"setLayout",e=>f(this,ye,e));p(this,"getLayout",()=>o(this,ye));p(this,"setRenderer",e=>{f(this,ce,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,C,new Response(o(this,C).body,o(this,C)));const s=o(this,C)?o(this,C).headers:o(this,J)??f(this,J,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,oe,e)});p(this,"set",(e,t)=>{o(this,I)??f(this,I,new Map),o(this,I).set(e,t)});p(this,"get",e=>o(this,I)?o(this,I).get(e):void 0);p(this,"newResponse",(...e)=>x(this,B,ae).call(this,...e));p(this,"body",(e,t,r)=>x(this,B,ae).call(this,e,t,r));p(this,"text",(e,t,r)=>!o(this,J)&&!o(this,oe)&&!t&&!r&&!this.finalized?new Response(e):x(this,B,ae).call(this,e,t,Ie(It,r)));p(this,"json",(e,t,r)=>x(this,B,ae).call(this,JSON.stringify(e),t,Ie("application/json",r)));p(this,"html",(e,t,r)=>{const s=a=>x(this,B,ae).call(this,a,t,Ie("text/html; charset=UTF-8",r));return typeof e=="object"?it(e,Ht.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(o(this,le)??f(this,le,()=>new Response),o(this,le).call(this,this)));f(this,xe,e),t&&(f(this,L,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,we,t.path),f(this,be,t.matchResult))}get req(){return o(this,me)??f(this,me,new st(o(this,xe),o(this,we),o(this,be))),o(this,me)}get event(){if(o(this,L)&&"respondWith"in o(this,L))return o(this,L);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,L))return o(this,L);throw Error("This context has no ExecutionContext")}get res(){return o(this,C)||f(this,C,new Response(null,{headers:o(this,J)??f(this,J,new Headers)}))}set res(e){if(o(this,C)&&e){e=new Response(e.body,e);for(const[t,r]of o(this,C).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=o(this,C).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of s)e.headers.append("set-cookie",a)}else e.headers.set(t,r)}f(this,C,e),this.finalized=!0}get var(){return o(this,I)?Object.fromEntries(o(this,I)):{}}},xe=new WeakMap,me=new WeakMap,I=new WeakMap,oe=new WeakMap,L=new WeakMap,C=new WeakMap,ye=new WeakMap,ce=new WeakMap,le=new WeakMap,J=new WeakMap,be=new WeakMap,we=new WeakMap,B=new WeakSet,ae=function(e,t,r){const s=o(this,C)?new Headers(o(this,C).headers):o(this,J)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,d]of n)i.toLowerCase()==="set-cookie"?s.append(i,d):s.set(i,d)}if(r)for(const[n,i]of Object.entries(r))if(typeof i=="string")s.set(n,i);else{s.delete(n);for(const d of i)s.append(n,d)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,oe);return new Response(e,{status:a,headers:s})},Ke),b="ALL",Ft="all",Mt=["get","post","put","delete","options","patch"],ot="Can not add a route since the matcher is already built.",ct=class extends Error{},$t="__COMPOSED_HANDLER",qt=e=>e.text("404 Not Found",404),Be=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},S,w,lt,A,G,Ce,_e,de,Ut=(de=class{constructor(t={}){g(this,w);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,S,"/");p(this,"routes",[]);g(this,A,qt);p(this,"errorHandler",Be);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,A,t),this));p(this,"fetch",(t,...r)=>x(this,w,_e).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,a)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,a)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,w,_e).call(this,t.request,t,void 0,t.request.method))})});[...Mt,Ft].forEach(n=>{this[n]=(i,...d)=>(typeof i=="string"?f(this,S,i):x(this,w,G).call(this,n,o(this,S),i),d.forEach(l=>{x(this,w,G).call(this,n,o(this,S),l)}),this)}),this.on=(n,i,...d)=>{for(const l of[i].flat()){f(this,S,l);for(const c of[n].flat())d.map(h=>{x(this,w,G).call(this,c.toUpperCase(),o(this,S),h)})}return this},this.use=(n,...i)=>(typeof n=="string"?f(this,S,n):(f(this,S,"*"),i.unshift(n)),i.forEach(d=>{x(this,w,G).call(this,b,o(this,S),d)}),this);const{strict:s,...a}=t;Object.assign(this,a),this.getPath=s??!0?t.getPath??Ze:Nt}route(t,r){const s=this.basePath(t);return r.routes.map(a=>{var i;let n;r.errorHandler===Be?n=a.handler:(n=async(d,l)=>(await Ue([],r.errorHandler)(d,()=>a.handler(d,l))).res,n[$t]=a.handler),x(i=s,w,G).call(i,a.method,a.path,n)}),this}basePath(t){const r=x(this,w,lt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let a,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?a=l=>l:a=s.replaceRequest));const i=n?l=>{const c=n(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};a||(a=(()=>{const l=se(this._basePath,t),c=l==="/"?0:l.length;return h=>{const u=new URL(h.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,h)}})());const d=async(l,c)=>{const h=await r(a(l.req.raw),...i(l));if(h)return h;await c()};return x(this,w,G).call(this,b,se(t,"*"),d),this}},S=new WeakMap,w=new WeakSet,lt=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,A,o(this,A)),t.routes=this.routes,t},A=new WeakMap,G=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const a={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,a]),this.routes.push(a)},Ce=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},_e=function(t,r,s,a){if(a==="HEAD")return(async()=>new Response(null,await x(this,w,_e).call(this,t,r,s,"GET")))();const n=this.getPath(t,{env:s}),i=this.router.match(a,n),d=new Lt(t,{path:n,matchResult:i,env:s,executionCtx:r,notFoundHandler:o(this,A)});if(i[0].length===1){let c;try{c=i[0][0][0][0](d,async()=>{d.res=await o(this,A).call(this,d)})}catch(h){return x(this,w,Ce).call(this,h,d)}return c instanceof Promise?c.then(h=>h||(d.finalized?d.res:o(this,A).call(this,d))).catch(h=>x(this,w,Ce).call(this,h,d)):c??o(this,A).call(this,d)}const l=Ue(i[0],this.errorHandler,o(this,A));return(async()=>{try{const c=await l(d);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return x(this,w,Ce).call(this,c,d)}})()},de),dt=[];function kt(e,t){const r=this.buildAllMatchers(),s=((a,n)=>{const i=r[a]||r[b],d=i[2][n];if(d)return d;const l=n.match(i[0]);if(!l)return[[],dt];const c=l.indexOf("",1);return[i[1][c],l]});return this.match=s,s(e,t)}var Se="[^/]+",ge=".*",ve="(?:|/.*)",ne=Symbol(),Bt=new Set(".\\+*[^]$()");function Wt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ge||e===ve?1:t===ge||t===ve?-1:e===Se?1:t===Se?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var X,Q,N,te,zt=(te=class{constructor(){g(this,X);g(this,Q);g(this,N,Object.create(null))}insert(t,r,s,a,n){if(t.length===0){if(o(this,X)!==void 0)throw ne;if(n)return;f(this,X,r);return}const[i,...d]=t,l=i==="*"?d.length===0?["","",ge]:["","",Se]:i==="/*"?["","",ve]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const h=l[1];let u=l[2]||Se;if(h&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw ne;if(c=o(this,N)[u],!c){if(Object.keys(o(this,N)).some(v=>v!==ge&&v!==ve))throw ne;if(n)return;c=o(this,N)[u]=new te,h!==""&&f(c,Q,a.varIndex++)}!n&&h!==""&&s.push([h,o(c,Q)])}else if(c=o(this,N)[i],!c){if(Object.keys(o(this,N)).some(h=>h.length>1&&h!==ge&&h!==ve))throw ne;if(n)return;c=o(this,N)[i]=new te}c.insert(d,r,s,a,n)}buildRegExpStr(){const r=Object.keys(o(this,N)).sort(Wt).map(s=>{const a=o(this,N)[s];return(typeof o(a,Q)=="number"?`(${s})@${o(a,Q)}`:Bt.has(s)?`\\${s}`:s)+a.buildRegExpStr()});return typeof o(this,X)=="number"&&r.unshift(`#${o(this,X)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},X=new WeakMap,Q=new WeakMap,N=new WeakMap,te),Ae,Ee,Ge,Yt=(Ge=class{constructor(){g(this,Ae,{varIndex:0});g(this,Ee,new zt)}insert(e,t,r){const s=[],a=[];for(let i=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return a[i]=[c,l],i++,d=!0,c}),!d)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=a.length-1;i>=0;i--){const[d]=a[i];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(d)!==-1){n[l]=n[l].replace(d,a[i][1]);break}}return o(this,Ee).insert(n,t,s,o(this,Ae),r),s}buildRegExp(){let e=o(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,i)=>n!==void 0?(r[++t]=Number(n),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Ae=new WeakMap,Ee=new WeakMap,Ge),Kt=[/^$/,[],Object.create(null)],Te=Object.create(null);function ht(e){return Te[e]??(Te[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Gt(){Te=Object.create(null)}function Vt(e){var c;const t=new Yt,r=[];if(e.length===0)return Kt;const s=e.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,u],[v,y])=>h?1:v?-1:u.length-y.length),a=Object.create(null);for(let h=0,u=-1,v=s.length;h<v;h++){const[y,E,D]=s[h];y?a[E]=[D.map(([R])=>[R,Object.create(null)]),dt]:u++;let m;try{m=t.insert(E,u,y)}catch(R){throw R===ne?new ct(E):R}y||(r[u]=D.map(([R,q])=>{const Re=Object.create(null);for(q-=1;q>=0;q--){const[Oe,P]=m[q];Re[Oe]=P}return[R,Re]}))}const[n,i,d]=t.buildRegExp();for(let h=0,u=r.length;h<u;h++)for(let v=0,y=r[h].length;v<y;v++){const E=(c=r[h][v])==null?void 0:c[1];if(!E)continue;const D=Object.keys(E);for(let m=0,R=D.length;m<R;m++)E[D[m]]=d[E[D[m]]]}const l=[];for(const h in i)l[h]=r[i[h]];return[n,l,a]}function re(e,t){if(e){for(const r of Object.keys(e).sort((s,a)=>a.length-s.length))if(ht(r).test(t))return[...e[r]]}}var W,z,Ne,ut,Ve,Jt=(Ve=class{constructor(){g(this,Ne);p(this,"name","RegExpRouter");g(this,W);g(this,z);p(this,"match",kt);f(this,W,{[b]:Object.create(null)}),f(this,z,{[b]:Object.create(null)})}add(e,t,r){var d;const s=o(this,W),a=o(this,z);if(!s||!a)throw new Error(ot);s[e]||[s,a].forEach(l=>{l[e]=Object.create(null),Object.keys(l[b]).forEach(c=>{l[e][c]=[...l[b][c]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ht(t);e===b?Object.keys(s).forEach(c=>{var h;(h=s[c])[t]||(h[t]=re(s[c],t)||re(s[b],t)||[])}):(d=s[e])[t]||(d[t]=re(s[e],t)||re(s[b],t)||[]),Object.keys(s).forEach(c=>{(e===b||e===c)&&Object.keys(s[c]).forEach(h=>{l.test(h)&&s[c][h].push([r,n])})}),Object.keys(a).forEach(c=>{(e===b||e===c)&&Object.keys(a[c]).forEach(h=>l.test(h)&&a[c][h].push([r,n]))});return}const i=et(t)||[t];for(let l=0,c=i.length;l<c;l++){const h=i[l];Object.keys(a).forEach(u=>{var v;(e===b||e===u)&&((v=a[u])[h]||(v[h]=[...re(s[u],h)||re(s[b],h)||[]]),a[u][h].push([r,n-c+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(o(this,z)).concat(Object.keys(o(this,W))).forEach(t=>{e[t]||(e[t]=x(this,Ne,ut).call(this,t))}),f(this,W,f(this,z,void 0)),Gt(),e}},W=new WeakMap,z=new WeakMap,Ne=new WeakSet,ut=function(e){const t=[];let r=e===b;return[o(this,W),o(this,z)].forEach(s=>{const a=s[e]?Object.keys(s[e]).map(n=>[n,s[e][n]]):[];a.length!==0?(r||(r=!0),t.push(...a)):e!==b&&t.push(...Object.keys(s[b]).map(n=>[n,s[b][n]]))}),r?Vt(t):null},Ve),Y,F,Je,Xt=(Je=class{constructor(e){p(this,"name","SmartRouter");g(this,Y,[]);g(this,F,[]);f(this,Y,e.routers)}add(e,t,r){if(!o(this,F))throw new Error(ot);o(this,F).push([e,t,r])}match(e,t){if(!o(this,F))throw new Error("Fatal error");const r=o(this,Y),s=o(this,F),a=r.length;let n=0,i;for(;n<a;n++){const d=r[n];try{for(let l=0,c=s.length;l<c;l++)d.add(...s[l]);i=d.match(e,t)}catch(l){if(l instanceof ct)continue;throw l}this.match=d.match.bind(d),f(this,Y,[d]),f(this,F,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(o(this,F)||o(this,Y).length!==1)throw new Error("No active router has been determined yet.");return o(this,Y)[0]}},Y=new WeakMap,F=new WeakMap,Je),pe=Object.create(null),K,j,Z,he,O,M,V,ue,Qt=(ue=class{constructor(t,r,s){g(this,M);g(this,K);g(this,j);g(this,Z);g(this,he,0);g(this,O,pe);if(f(this,j,s||Object.create(null)),f(this,K,[]),t&&r){const a=Object.create(null);a[t]={handler:r,possibleKeys:[],score:0},f(this,K,[a])}f(this,Z,[])}insert(t,r,s){f(this,he,++qe(this,he)._);let a=this;const n=Ct(r),i=[];for(let d=0,l=n.length;d<l;d++){const c=n[d],h=n[d+1],u=St(c,h),v=Array.isArray(u)?u[0]:c;if(v in o(a,j)){a=o(a,j)[v],u&&i.push(u[1]);continue}o(a,j)[v]=new ue,u&&(o(a,Z).push(u),i.push(u[1])),a=o(a,j)[v]}return o(a,K).push({[t]:{handler:s,possibleKeys:i.filter((d,l,c)=>c.indexOf(d)===l),score:o(this,he)}}),a}search(t,r){var l;const s=[];f(this,O,pe);let n=[this];const i=Qe(r),d=[];for(let c=0,h=i.length;c<h;c++){const u=i[c],v=c===h-1,y=[];for(let E=0,D=n.length;E<D;E++){const m=n[E],R=o(m,j)[u];R&&(f(R,O,o(m,O)),v?(o(R,j)["*"]&&s.push(...x(this,M,V).call(this,o(R,j)["*"],t,o(m,O))),s.push(...x(this,M,V).call(this,R,t,o(m,O)))):y.push(R));for(let q=0,Re=o(m,Z).length;q<Re;q++){const Oe=o(m,Z)[q],P=o(m,O)===pe?{}:{...o(m,O)};if(Oe==="*"){const U=o(m,j)["*"];U&&(s.push(...x(this,M,V).call(this,U,t,o(m,O))),f(U,O,P),y.push(U));continue}const[vt,Me,fe]=Oe;if(!u&&!(fe instanceof RegExp))continue;const H=o(m,j)[vt],xt=i.slice(c).join("/");if(fe instanceof RegExp){const U=fe.exec(xt);if(U){if(P[Me]=U[0],s.push(...x(this,M,V).call(this,H,t,o(m,O),P)),Object.keys(o(H,j)).length){f(H,O,P);const De=((l=U[0].match(/\//))==null?void 0:l.length)??0;(d[De]||(d[De]=[])).push(H)}continue}}(fe===!0||fe.test(u))&&(P[Me]=u,v?(s.push(...x(this,M,V).call(this,H,t,P,o(m,O))),o(H,j)["*"]&&s.push(...x(this,M,V).call(this,o(H,j)["*"],t,P,o(m,O)))):(f(H,O,P),y.push(H)))}}n=y.concat(d.shift()??[])}return s.length>1&&s.sort((c,h)=>c.score-h.score),[s.map(({handler:c,params:h})=>[c,h])]}},K=new WeakMap,j=new WeakMap,Z=new WeakMap,he=new WeakMap,O=new WeakMap,M=new WeakSet,V=function(t,r,s,a){const n=[];for(let i=0,d=o(t,K).length;i<d;i++){const l=o(t,K)[i],c=l[r]||l[b],h={};if(c!==void 0&&(c.params=Object.create(null),n.push(c),s!==pe||a&&a!==pe))for(let u=0,v=c.possibleKeys.length;u<v;u++){const y=c.possibleKeys[u],E=h[c.score];c.params[y]=a!=null&&a[y]&&!E?a[y]:s[y]??(a==null?void 0:a[y]),h[c.score]=!0}}return n},ue),ee,Xe,Zt=(Xe=class{constructor(){p(this,"name","TrieRouter");g(this,ee);f(this,ee,new Qt)}add(e,t,r){const s=et(t);if(s){for(let a=0,n=s.length;a<n;a++)o(this,ee).insert(e,s[a],r);return}o(this,ee).insert(e,t,r)}match(e,t){return o(this,ee).search(e,t)}},ee=new WeakMap,Xe),ft=class extends Ut{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Jt,new Zt]})}},er=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(n=>typeof n=="string"?n==="*"?()=>n:i=>n===i?i:null:typeof n=="function"?n:i=>n.includes(i)?i:null)(r.origin),a=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(r.allowMethods);return async function(i,d){var h;function l(u,v){i.res.headers.set(u,v)}const c=await s(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),r.credentials&&l("Access-Control-Allow-Credentials","true"),(h=r.exposeHeaders)!=null&&h.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const u=await a(i.req.header("origin")||"",i);u.length&&l("Access-Control-Allow-Methods",u.join(","));let v=r.allowHeaders;if(!(v!=null&&v.length)){const y=i.req.header("Access-Control-Request-Headers");y&&(v=y.split(/\s*,\s*/))}return v!=null&&v.length&&(l("Access-Control-Allow-Headers",v.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await d(),r.origin!=="*"&&i.header("Vary","Origin",{append:!0})}},tr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=sr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let a=t[s[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},rr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},sr=rr,ar=(...e)=>{let t=e.filter(a=>a!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const a of r)a===".."&&s.length>0&&s.at(-1)!==".."?s.pop():a!=="."&&s.push(a);return s.join("/")||"."},pt={br:".br",zstd:".zst",gzip:".gz"},nr=Object.keys(pt),ir="index.html",or=e=>{const t=e.root??"./",r=e.path,s=e.join??ar;return async(a,n)=>{var h,u,v,y;if(a.finalized)return n();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((h=e.onNotFound)==null?void 0:h.call(e,a.req.path,a)),n()}let d=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(d)&&(d=s(d,ir));const l=e.getContent;let c=await l(d,a);if(c instanceof Response)return a.newResponse(c.body,c);if(c){const E=e.mimes&&We(d,e.mimes)||We(d);if(a.header("Content-Type",E||"application/octet-stream"),e.precompressed&&(!E||tr.test(E))){const D=new Set((u=a.req.header("Accept-Encoding"))==null?void 0:u.split(",").map(m=>m.trim()));for(const m of nr){if(!D.has(m))continue;const R=await l(d+pt[m],a);if(R){c=R,a.header("Content-Encoding",m),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((v=e.onFound)==null?void 0:v.call(e,d,a)),a.body(c)}await((y=e.onNotFound)==null?void 0:y.call(e,d,a)),await n()}},cr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const a=r[e]||e;if(!a)return null;const n=await s.get(a,{type:"stream"});return n||null},lr=e=>async function(r,s){return or({...e,getContent:async n=>cr(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},dr=e=>lr(e);const _=new ft;_.use("/api/*",er());_.use("/static/*",dr({root:"./public"}));_.get("/api/dashboard/summary",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),s=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_oncology = 'Y'
    `).first(),a=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_novel = 'Y'
    `).first(),n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_biosimilar = 'Y'
    `).first(),i=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_orphan = 'Y'
    `).first();return e.json({total:(r==null?void 0:r.count)||0,oncology:(s==null?void 0:s.count)||0,novel:(a==null?void 0:a.count)||0,biosimilar:(n==null?void 0:n.count)||0,orphan:(i==null?void 0:i.count)||0})}catch(r){return console.error("Summary error:",r),e.json({error:"Failed to fetch summary"},500)}});_.get("/api/dashboard/therapeutic-area",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        therapeutic_area,
        COUNT(*) as count
      FROM fda_approvals
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != ''
      GROUP BY therapeutic_area
      ORDER BY count DESC
      LIMIT 10
    `).all();return e.json(r.results||[])}catch(r){return console.error("Therapeutic area error:",r),e.json({error:"Failed to fetch therapeutic areas"},500)}});_.get("/api/dashboard/sponsors",async e=>{const{DB:t}=e.env,r=e.req.query("limit")||"10";try{const s=await t.prepare(`
      SELECT 
        sponsor,
        COUNT(*) as count
      FROM fda_approvals
      WHERE sponsor IS NOT NULL AND sponsor != ''
      GROUP BY sponsor
      ORDER BY count DESC
      LIMIT ?
    `).bind(parseInt(r)).all();return e.json(s.results||[])}catch(s){return console.error("Sponsors error:",s),e.json({error:"Failed to fetch sponsors"},500)}});_.get("/api/dashboard/monthly-trend",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        approval_month,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_month IS NOT NULL
      GROUP BY approval_month
      ORDER BY approval_month ASC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Monthly trend error:",r),e.json({error:"Failed to fetch monthly trend"},500)}});_.get("/api/dashboard/approval-types",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        approval_type,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_type IS NOT NULL AND approval_type != ''
      GROUP BY approval_type
      ORDER BY count DESC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Approval types error:",r),e.json({error:"Failed to fetch approval types"},500)}});_.get("/api/approvals",async e=>{const{DB:t}=e.env,r=parseInt(e.req.query("page")||"1"),s=parseInt(e.req.query("limit")||"20"),a=(r-1)*s;try{const n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),i=await t.prepare(`
      SELECT * FROM fda_approvals
      ORDER BY approval_date DESC
      LIMIT ? OFFSET ?
    `).bind(s,a).all();return e.json({data:i.results||[],pagination:{page:r,limit:s,total:(n==null?void 0:n.count)||0,totalPages:Math.ceil(((n==null?void 0:n.count)||0)/s)}})}catch(n){return console.error("Approvals list error:",n),e.json({error:"Failed to fetch approvals"},500)}});_.get("/api/approvals/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id");try{const s=await t.prepare(`
      SELECT * FROM fda_approvals WHERE id = ?
    `).bind(r).first();return s?e.json(s):e.json({error:"Not found"},404)}catch(s){return console.error("Approval detail error:",s),e.json({error:"Failed to fetch approval detail"},500)}});_.get("/api/approvals/search/:query",async e=>{const{DB:t}=e.env,r=e.req.param("query");if(!r||r.trim()==="")return e.json({error:"Query parameter required"},400);try{const s=`%${r}%`,a=await t.prepare(`
      SELECT * FROM fda_approvals
      WHERE 
        product_name LIKE ? OR
        active_ingredient LIKE ? OR
        sponsor LIKE ? OR
        indication LIKE ?
      ORDER BY approval_date DESC
      LIMIT 50
    `).bind(s,s,s,s).all();return e.json(a.results||[])}catch(s){return console.error("Search error:",s),e.json({error:"Failed to search approvals"},500)}});_.post("/api/approvals/filter",async e=>{const{DB:t}=e.env;try{const r=await e.req.json();let s="SELECT * FROM fda_approvals WHERE 1=1";const a=[];r.therapeutic_area&&(s+=" AND therapeutic_area = ?",a.push(r.therapeutic_area)),r.is_oncology&&(s+=" AND is_oncology = ?",a.push(r.is_oncology)),r.is_novel&&(s+=" AND is_novel = ?",a.push(r.is_novel)),r.is_biosimilar&&(s+=" AND is_biosimilar = ?",a.push(r.is_biosimilar)),r.is_orphan&&(s+=" AND is_orphan = ?",a.push(r.is_orphan)),r.sponsor&&(s+=" AND sponsor = ?",a.push(r.sponsor)),r.approval_type&&(s+=" AND approval_type = ?",a.push(r.approval_type)),s+=" ORDER BY approval_date DESC LIMIT 100";const n=await t.prepare(s).bind(...a).all();return e.json(n.results||[])}catch(r){return console.error("Filter error:",r),e.json({error:"Failed to filter approvals"},500)}});_.get("/",e=>e.html(`
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
                        <p class="text-sm text-gray-500 mt-1">2026년 1월 전문의약품 승인 현황</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600">데이터 수집일</p>
                        <p class="text-lg font-semibold text-gray-900">2026-01-26</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
  `));const ze=new ft,hr=Object.assign({"/src/index.tsx":_});let gt=!1;for(const[,e]of Object.entries(hr))e&&(ze.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),ze.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),gt=!0);if(!gt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
