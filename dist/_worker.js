var bt=Object.defineProperty;var He=e=>{throw TypeError(e)};var xt=(e,t,r)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var v=(e,t,r)=>xt(e,typeof t!="symbol"?t+"":t,r),Ie=(e,t,r)=>t.has(e)||He("Cannot "+r);var i=(e,t,r)=>(Ie(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?He("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,a)=>(Ie(e,t,"write to private field"),a?a.call(e,r):t.set(e,r),r),b=(e,t,r)=>(Ie(e,t,"access private method"),r);var Ue=(e,t,r,a)=>({set _(s){f(e,t,s,r)},get _(){return i(e,t,a)}});var $e=(e,t,r)=>(a,s)=>{let o=-1;return n(0);async function n(d){if(d<=o)throw new Error("next() called multiple times");o=d;let c,l=!1,p;if(e[d]?(p=e[d][0][0],a.req.routeIndex=d):p=d===e.length&&s||void 0,p)try{c=await p(a,()=>n(d+1))}catch(h){if(h instanceof Error&&t)a.error=h,c=await t(h,a),l=!0;else throw h}else a.finalized===!1&&r&&(c=await r(a));return c&&(a.finalized===!1||l)&&(a.res=c),a}},yt=Symbol(),_t=async(e,t=Object.create(null))=>{const{all:r=!1,dot:a=!1}=t,o=(e instanceof at?e.raw.headers:e.headers).get("Content-Type");return o!=null&&o.startsWith("multipart/form-data")||o!=null&&o.startsWith("application/x-www-form-urlencoded")?wt(e,{all:r,dot:a}):{}};async function wt(e,t){const r=await e.formData();return r?Et(r,t):{}}function Et(e,t){const r=Object.create(null);return e.forEach((a,s)=>{t.all||s.endsWith("[]")?Rt(r,s,a):r[s]=a}),t.dot&&Object.entries(r).forEach(([a,s])=>{a.includes(".")&&(Ot(r,a,s),delete r[a])}),r}var Rt=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ot=(e,t,r)=>{let a=e;const s=t.split(".");s.forEach((o,n)=>{n===s.length-1?a[o]=r:((!a[o]||typeof a[o]!="object"||Array.isArray(a[o])||a[o]instanceof File)&&(a[o]=Object.create(null)),a=a[o])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Tt=e=>{const{groups:t,path:r}=St(e),a=Qe(r);return jt(a,t)},St=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,a)=>{const s=`@${a}`;return t.push([s,r]),s}),{groups:t,path:e}},jt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[a]=t[r];for(let s=e.length-1;s>=0;s--)if(e[s].includes(a)){e[s]=e[s].replace(a,t[r][1]);break}}return e},Oe={},Ct=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const a=`${e}#${t}`;return Oe[a]||(r[2]?Oe[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Oe[a]=[e,r[1],!0]),Oe[a]}return null},ke=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Nt=e=>ke(e,decodeURI),Ze=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let a=r;for(;a<t.length;a++){const s=t.charCodeAt(a);if(s===37){const o=t.indexOf("?",a),n=t.slice(r,o===-1?void 0:o);return Nt(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(s===63)break}return t.slice(r,a)},At=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ae=(e,t,...r)=>(r.length&&(t=ae(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),et=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let a="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))a+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&a===""?r.push("/"):r.push(a);const o=s.replace("?","");a+="/"+o,r.push(a)}else a+="/"+s}),r.filter((s,o,n)=>n.indexOf(s)===o)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ke(e,rt):e):e,tt=(e,t,r)=>{let a;if(!r&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const d=e.charCodeAt(n+t.length+1);if(d===61){const c=n+t.length+2,l=e.indexOf("&",c);return Le(e.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";n=e.indexOf(`&${t}`,n+1)}if(a=/[%+]/.test(e),!a)return}const s={};a??(a=/[%+]/.test(e));let o=e.indexOf("?",8);for(;o!==-1;){const n=e.indexOf("&",o+1);let d=e.indexOf("=",o);d>n&&n!==-1&&(d=-1);let c=e.slice(o+1,d===-1?n===-1?void 0:n:d);if(a&&(c=Le(c)),o=n,c==="")continue;let l;d===-1?l="":(l=e.slice(d+1,n===-1?void 0:n),a&&(l=Le(l))),r?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(l)):s[c]??(s[c]=l)}return t?s[t]:s},Dt=tt,It=(e,t)=>tt(e,t,!0),rt=decodeURIComponent,Be=e=>ke(e,rt),ne,j,H,st,ot,Pe,B,Ye,at=(Ye=class{constructor(e,t="/",r=[[]]){m(this,H);v(this,"raw");m(this,ne);m(this,j);v(this,"routeIndex",0);v(this,"path");v(this,"bodyCache",{});m(this,B,e=>{const{bodyCache:t,raw:r}=this,a=t[e];if(a)return a;const s=Object.keys(t)[0];return s?t[s].then(o=>(s==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,j,r),f(this,ne,{})}param(e){return e?b(this,H,st).call(this,e):b(this,H,ot).call(this)}query(e){return Dt(this.url,e)}queries(e){return It(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,a)=>{t[a]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await _t(this,e))}json(){return i(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,B).call(this,"text")}arrayBuffer(){return i(this,B).call(this,"arrayBuffer")}blob(){return i(this,B).call(this,"blob")}formData(){return i(this,B).call(this,"formData")}addValidatedData(e,t){i(this,ne)[e]=t}valid(e){return i(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return i(this,j)}get matchedRoutes(){return i(this,j)[0].map(([[,e]])=>e)}get routePath(){return i(this,j)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,j=new WeakMap,H=new WeakSet,st=function(e){const t=i(this,j)[0][this.routeIndex][1][e],r=b(this,H,Pe).call(this,t);return r&&/\%/.test(r)?Be(r):r},ot=function(){const e={},t=Object.keys(i(this,j)[0][this.routeIndex][1]);for(const r of t){const a=b(this,H,Pe).call(this,i(this,j)[0][this.routeIndex][1][r]);a!==void 0&&(e[r]=/\%/.test(a)?Be(a):a)}return e},Pe=function(e){return i(this,j)[1]?i(this,j)[1][e]:e},B=new WeakMap,Ye),Lt={Stringify:1},nt=async(e,t,r,a,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const o=e.callbacks;return o!=null&&o.length?(s?s[0]+=e:s=[e],Promise.all(o.map(d=>d({phase:t,buffer:s,context:a}))).then(d=>Promise.all(d.filter(Boolean).map(c=>nt(c,t,!1,a,s))).then(()=>s[0]))):Promise.resolve(e)},Ft="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),me,be,F,ie,P,S,xe,le,ce,J,ye,_e,q,se,ze,Pt=(ze=class{constructor(e,t){m(this,q);m(this,me);m(this,be);v(this,"env",{});m(this,F);v(this,"finalized",!1);v(this,"error");m(this,ie);m(this,P);m(this,S);m(this,xe);m(this,le);m(this,ce);m(this,J);m(this,ye);m(this,_e);v(this,"render",(...e)=>(i(this,le)??f(this,le,t=>this.html(t)),i(this,le).call(this,...e)));v(this,"setLayout",e=>f(this,xe,e));v(this,"getLayout",()=>i(this,xe));v(this,"setRenderer",e=>{f(this,le,e)});v(this,"header",(e,t,r)=>{this.finalized&&f(this,S,new Response(i(this,S).body,i(this,S)));const a=i(this,S)?i(this,S).headers:i(this,J)??f(this,J,new Headers);t===void 0?a.delete(e):r!=null&&r.append?a.append(e,t):a.set(e,t)});v(this,"status",e=>{f(this,ie,e)});v(this,"set",(e,t)=>{i(this,F)??f(this,F,new Map),i(this,F).set(e,t)});v(this,"get",e=>i(this,F)?i(this,F).get(e):void 0);v(this,"newResponse",(...e)=>b(this,q,se).call(this,...e));v(this,"body",(e,t,r)=>b(this,q,se).call(this,e,t,r));v(this,"text",(e,t,r)=>!i(this,J)&&!i(this,ie)&&!t&&!r&&!this.finalized?new Response(e):b(this,q,se).call(this,e,t,Fe(Ft,r)));v(this,"json",(e,t,r)=>b(this,q,se).call(this,JSON.stringify(e),t,Fe("application/json",r)));v(this,"html",(e,t,r)=>{const a=s=>b(this,q,se).call(this,s,t,Fe("text/html; charset=UTF-8",r));return typeof e=="object"?nt(e,Lt.Stringify,!1,{}).then(a):a(e)});v(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});v(this,"notFound",()=>(i(this,ce)??f(this,ce,()=>new Response),i(this,ce).call(this,this)));f(this,me,e),t&&(f(this,P,t.executionCtx),this.env=t.env,f(this,ce,t.notFoundHandler),f(this,_e,t.path),f(this,ye,t.matchResult))}get req(){return i(this,be)??f(this,be,new at(i(this,me),i(this,_e),i(this,ye))),i(this,be)}get event(){if(i(this,P)&&"respondWith"in i(this,P))return i(this,P);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,P))return i(this,P);throw Error("This context has no ExecutionContext")}get res(){return i(this,S)||f(this,S,new Response(null,{headers:i(this,J)??f(this,J,new Headers)}))}set res(e){if(i(this,S)&&e){e=new Response(e.body,e);for(const[t,r]of i(this,S).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=i(this,S).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of a)e.headers.append("set-cookie",s)}else e.headers.set(t,r)}f(this,S,e),this.finalized=!0}get var(){return i(this,F)?Object.fromEntries(i(this,F)):{}}},me=new WeakMap,be=new WeakMap,F=new WeakMap,ie=new WeakMap,P=new WeakMap,S=new WeakMap,xe=new WeakMap,le=new WeakMap,ce=new WeakMap,J=new WeakMap,ye=new WeakMap,_e=new WeakMap,q=new WeakSet,se=function(e,t,r){const a=i(this,S)?new Headers(i(this,S).headers):i(this,J)??new Headers;if(typeof t=="object"&&"headers"in t){const o=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,d]of o)n.toLowerCase()==="set-cookie"?a.append(n,d):a.set(n,d)}if(r)for(const[o,n]of Object.entries(r))if(typeof n=="string")a.set(o,n);else{a.delete(o);for(const d of n)a.append(o,d)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ie);return new Response(e,{status:s,headers:a})},ze),_="ALL",kt="all",Mt=["get","post","put","delete","options","patch"],it="Can not add a route since the matcher is already built.",lt=class extends Error{},Ht="__COMPOSED_HANDLER",Ut=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,w,ct,N,K,Te,Se,de,$t=(de=class{constructor(t={}){m(this,w);v(this,"get");v(this,"post");v(this,"put");v(this,"delete");v(this,"options");v(this,"patch");v(this,"all");v(this,"on");v(this,"use");v(this,"router");v(this,"getPath");v(this,"_basePath","/");m(this,C,"/");v(this,"routes",[]);m(this,N,Ut);v(this,"errorHandler",qe);v(this,"onError",t=>(this.errorHandler=t,this));v(this,"notFound",t=>(f(this,N,t),this));v(this,"fetch",(t,...r)=>b(this,w,Se).call(this,t,r[1],r[0],t.method));v(this,"request",(t,r,a,s)=>t instanceof Request?this.fetch(r?new Request(t,r):t,a,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ae("/",t)}`,r),a,s)));v(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,w,Se).call(this,t.request,t,void 0,t.request.method))})});[...Mt,kt].forEach(o=>{this[o]=(n,...d)=>(typeof n=="string"?f(this,C,n):b(this,w,K).call(this,o,i(this,C),n),d.forEach(c=>{b(this,w,K).call(this,o,i(this,C),c)}),this)}),this.on=(o,n,...d)=>{for(const c of[n].flat()){f(this,C,c);for(const l of[o].flat())d.map(p=>{b(this,w,K).call(this,l.toUpperCase(),i(this,C),p)})}return this},this.use=(o,...n)=>(typeof o=="string"?f(this,C,o):(f(this,C,"*"),n.unshift(o)),n.forEach(d=>{b(this,w,K).call(this,_,i(this,C),d)}),this);const{strict:a,...s}=t;Object.assign(this,s),this.getPath=a??!0?t.getPath??Ze:At}route(t,r){const a=this.basePath(t);return r.routes.map(s=>{var n;let o;r.errorHandler===qe?o=s.handler:(o=async(d,c)=>(await $e([],r.errorHandler)(d,()=>s.handler(d,c))).res,o[Ht]=s.handler),b(n=a,w,K).call(n,s.method,s.path,o)}),this}basePath(t){const r=b(this,w,ct).call(this);return r._basePath=ae(this._basePath,t),r}mount(t,r,a){let s,o;a&&(typeof a=="function"?o=a:(o=a.optionHandler,a.replaceRequest===!1?s=c=>c:s=a.replaceRequest));const n=o?c=>{const l=o(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};s||(s=(()=>{const c=ae(this._basePath,t),l=c==="/"?0:c.length;return p=>{const h=new URL(p.url);return h.pathname=h.pathname.slice(l)||"/",new Request(h,p)}})());const d=async(c,l)=>{const p=await r(s(c.req.raw),...n(c));if(p)return p;await l()};return b(this,w,K).call(this,_,ae(t,"*"),d),this}},C=new WeakMap,w=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,N,i(this,N)),t.routes=this.routes,t},N=new WeakMap,K=function(t,r,a){t=t.toUpperCase(),r=ae(this._basePath,r);const s={basePath:this._basePath,path:r,method:t,handler:a};this.router.add(t,r,[a,s]),this.routes.push(s)},Te=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Se=function(t,r,a,s){if(s==="HEAD")return(async()=>new Response(null,await b(this,w,Se).call(this,t,r,a,"GET")))();const o=this.getPath(t,{env:a}),n=this.router.match(s,o),d=new Pt(t,{path:o,matchResult:n,env:a,executionCtx:r,notFoundHandler:i(this,N)});if(n[0].length===1){let l;try{l=n[0][0][0][0](d,async()=>{d.res=await i(this,N).call(this,d)})}catch(p){return b(this,w,Te).call(this,p,d)}return l instanceof Promise?l.then(p=>p||(d.finalized?d.res:i(this,N).call(this,d))).catch(p=>b(this,w,Te).call(this,p,d)):l??i(this,N).call(this,d)}const c=$e(n[0],this.errorHandler,i(this,N));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return b(this,w,Te).call(this,l,d)}})()},de),dt=[];function Bt(e,t){const r=this.buildAllMatchers(),a=((s,o)=>{const n=r[s]||r[_],d=n[2][o];if(d)return d;const c=o.match(n[0]);if(!c)return[[],dt];const l=c.indexOf("",1);return[n[1][l],c]});return this.match=a,a(e,t)}var Ce="[^/]+",ve=".*",ge="(?:|/.*)",oe=Symbol(),qt=new Set(".\\+*[^]$()");function Wt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ve||e===ge?1:t===ve||t===ge?-1:e===Ce?1:t===Ce?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var X,Q,A,te,Vt=(te=class{constructor(){m(this,X);m(this,Q);m(this,A,Object.create(null))}insert(t,r,a,s,o){if(t.length===0){if(i(this,X)!==void 0)throw oe;if(o)return;f(this,X,r);return}const[n,...d]=t,c=n==="*"?d.length===0?["","",ve]:["","",Ce]:n==="/*"?["","",ge]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const p=c[1];let h=c[2]||Ce;if(p&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw oe;if(l=i(this,A)[h],!l){if(Object.keys(i(this,A)).some(g=>g!==ve&&g!==ge))throw oe;if(o)return;l=i(this,A)[h]=new te,p!==""&&f(l,Q,s.varIndex++)}!o&&p!==""&&a.push([p,i(l,Q)])}else if(l=i(this,A)[n],!l){if(Object.keys(i(this,A)).some(p=>p.length>1&&p!==ve&&p!==ge))throw oe;if(o)return;l=i(this,A)[n]=new te}l.insert(d,r,a,s,o)}buildRegExpStr(){const r=Object.keys(i(this,A)).sort(Wt).map(a=>{const s=i(this,A)[a];return(typeof i(s,Q)=="number"?`(${a})@${i(s,Q)}`:qt.has(a)?`\\${a}`:a)+s.buildRegExpStr()});return typeof i(this,X)=="number"&&r.unshift(`#${i(this,X)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},X=new WeakMap,Q=new WeakMap,A=new WeakMap,te),Ne,we,Ke,Yt=(Ke=class{constructor(){m(this,Ne,{varIndex:0});m(this,we,new Vt)}insert(e,t,r){const a=[],s=[];for(let n=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${n}`;return s[n]=[l,c],n++,d=!0,l}),!d)break}const o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=s.length-1;n>=0;n--){const[d]=s[n];for(let c=o.length-1;c>=0;c--)if(o[c].indexOf(d)!==-1){o[c]=o[c].replace(d,s[n][1]);break}}return i(this,we).insert(o,t,a,i(this,Ne),r),a}buildRegExp(){let e=i(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,o,n)=>o!==void 0?(r[++t]=Number(o),"$()"):(n!==void 0&&(a[Number(n)]=++t),"")),[new RegExp(`^${e}`),r,a]}},Ne=new WeakMap,we=new WeakMap,Ke),zt=[/^$/,[],Object.create(null)],je=Object.create(null);function pt(e){return je[e]??(je[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Kt(){je=Object.create(null)}function Gt(e){var l;const t=new Yt,r=[];if(e.length===0)return zt;const a=e.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,h],[g,u])=>p?1:g?-1:h.length-u.length),s=Object.create(null);for(let p=0,h=-1,g=a.length;p<g;p++){const[u,y,D]=a[p];u?s[y]=[D.map(([E])=>[E,Object.create(null)]),dt]:h++;let x;try{x=t.insert(y,h,u)}catch(E){throw E===oe?new lt(y):E}u||(r[h]=D.map(([E,U])=>{const Ee=Object.create(null);for(U-=1;U>=0;U--){const[Re,I]=x[U];Ee[Re]=I}return[E,Ee]}))}const[o,n,d]=t.buildRegExp();for(let p=0,h=r.length;p<h;p++)for(let g=0,u=r[p].length;g<u;g++){const y=(l=r[p][g])==null?void 0:l[1];if(!y)continue;const D=Object.keys(y);for(let x=0,E=D.length;x<E;x++)y[D[x]]=d[y[D[x]]]}const c=[];for(const p in n)c[p]=r[n[p]];return[o,c,s]}function re(e,t){if(e){for(const r of Object.keys(e).sort((a,s)=>s.length-a.length))if(pt(r).test(t))return[...e[r]]}}var W,V,Ae,ut,Ge,Jt=(Ge=class{constructor(){m(this,Ae);v(this,"name","RegExpRouter");m(this,W);m(this,V);v(this,"match",Bt);f(this,W,{[_]:Object.create(null)}),f(this,V,{[_]:Object.create(null)})}add(e,t,r){var d;const a=i(this,W),s=i(this,V);if(!a||!s)throw new Error(it);a[e]||[a,s].forEach(c=>{c[e]=Object.create(null),Object.keys(c[_]).forEach(l=>{c[e][l]=[...c[_][l]]})}),t==="/*"&&(t="*");const o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=pt(t);e===_?Object.keys(a).forEach(l=>{var p;(p=a[l])[t]||(p[t]=re(a[l],t)||re(a[_],t)||[])}):(d=a[e])[t]||(d[t]=re(a[e],t)||re(a[_],t)||[]),Object.keys(a).forEach(l=>{(e===_||e===l)&&Object.keys(a[l]).forEach(p=>{c.test(p)&&a[l][p].push([r,o])})}),Object.keys(s).forEach(l=>{(e===_||e===l)&&Object.keys(s[l]).forEach(p=>c.test(p)&&s[l][p].push([r,o]))});return}const n=et(t)||[t];for(let c=0,l=n.length;c<l;c++){const p=n[c];Object.keys(s).forEach(h=>{var g;(e===_||e===h)&&((g=s[h])[p]||(g[p]=[...re(a[h],p)||re(a[_],p)||[]]),s[h][p].push([r,o-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,V)).concat(Object.keys(i(this,W))).forEach(t=>{e[t]||(e[t]=b(this,Ae,ut).call(this,t))}),f(this,W,f(this,V,void 0)),Kt(),e}},W=new WeakMap,V=new WeakMap,Ae=new WeakSet,ut=function(e){const t=[];let r=e===_;return[i(this,W),i(this,V)].forEach(a=>{const s=a[e]?Object.keys(a[e]).map(o=>[o,a[e][o]]):[];s.length!==0?(r||(r=!0),t.push(...s)):e!==_&&t.push(...Object.keys(a[_]).map(o=>[o,a[_][o]]))}),r?Gt(t):null},Ge),Y,k,Je,Xt=(Je=class{constructor(e){v(this,"name","SmartRouter");m(this,Y,[]);m(this,k,[]);f(this,Y,e.routers)}add(e,t,r){if(!i(this,k))throw new Error(it);i(this,k).push([e,t,r])}match(e,t){if(!i(this,k))throw new Error("Fatal error");const r=i(this,Y),a=i(this,k),s=r.length;let o=0,n;for(;o<s;o++){const d=r[o];try{for(let c=0,l=a.length;c<l;c++)d.add(...a[c]);n=d.match(e,t)}catch(c){if(c instanceof lt)continue;throw c}this.match=d.match.bind(d),f(this,Y,[d]),f(this,k,void 0);break}if(o===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(i(this,k)||i(this,Y).length!==1)throw new Error("No active router has been determined yet.");return i(this,Y)[0]}},Y=new WeakMap,k=new WeakMap,Je),fe=Object.create(null),z,T,Z,pe,O,M,G,ue,Qt=(ue=class{constructor(t,r,a){m(this,M);m(this,z);m(this,T);m(this,Z);m(this,pe,0);m(this,O,fe);if(f(this,T,a||Object.create(null)),f(this,z,[]),t&&r){const s=Object.create(null);s[t]={handler:r,possibleKeys:[],score:0},f(this,z,[s])}f(this,Z,[])}insert(t,r,a){f(this,pe,++Ue(this,pe)._);let s=this;const o=Tt(r),n=[];for(let d=0,c=o.length;d<c;d++){const l=o[d],p=o[d+1],h=Ct(l,p),g=Array.isArray(h)?h[0]:l;if(g in i(s,T)){s=i(s,T)[g],h&&n.push(h[1]);continue}i(s,T)[g]=new ue,h&&(i(s,Z).push(h),n.push(h[1])),s=i(s,T)[g]}return i(s,z).push({[t]:{handler:a,possibleKeys:n.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,pe)}}),s}search(t,r){var c;const a=[];f(this,O,fe);let o=[this];const n=Qe(r),d=[];for(let l=0,p=n.length;l<p;l++){const h=n[l],g=l===p-1,u=[];for(let y=0,D=o.length;y<D;y++){const x=o[y],E=i(x,T)[h];E&&(f(E,O,i(x,O)),g?(i(E,T)["*"]&&a.push(...b(this,M,G).call(this,i(E,T)["*"],t,i(x,O))),a.push(...b(this,M,G).call(this,E,t,i(x,O)))):u.push(E));for(let U=0,Ee=i(x,Z).length;U<Ee;U++){const Re=i(x,Z)[U],I=i(x,O)===fe?{}:{...i(x,O)};if(Re==="*"){const $=i(x,T)["*"];$&&(a.push(...b(this,M,G).call(this,$,t,i(x,O))),f($,O,I),u.push($));continue}const[gt,Me,he]=Re;if(!h&&!(he instanceof RegExp))continue;const L=i(x,T)[gt],mt=n.slice(l).join("/");if(he instanceof RegExp){const $=he.exec(mt);if($){if(I[Me]=$[0],a.push(...b(this,M,G).call(this,L,t,i(x,O),I)),Object.keys(i(L,T)).length){f(L,O,I);const De=((c=$[0].match(/\//))==null?void 0:c.length)??0;(d[De]||(d[De]=[])).push(L)}continue}}(he===!0||he.test(h))&&(I[Me]=h,g?(a.push(...b(this,M,G).call(this,L,t,I,i(x,O))),i(L,T)["*"]&&a.push(...b(this,M,G).call(this,i(L,T)["*"],t,I,i(x,O)))):(f(L,O,I),u.push(L)))}}o=u.concat(d.shift()??[])}return a.length>1&&a.sort((l,p)=>l.score-p.score),[a.map(({handler:l,params:p})=>[l,p])]}},z=new WeakMap,T=new WeakMap,Z=new WeakMap,pe=new WeakMap,O=new WeakMap,M=new WeakSet,G=function(t,r,a,s){const o=[];for(let n=0,d=i(t,z).length;n<d;n++){const c=i(t,z)[n],l=c[r]||c[_],p={};if(l!==void 0&&(l.params=Object.create(null),o.push(l),a!==fe||s&&s!==fe))for(let h=0,g=l.possibleKeys.length;h<g;h++){const u=l.possibleKeys[h],y=p[l.score];l.params[u]=s!=null&&s[u]&&!y?s[u]:a[u]??(s==null?void 0:s[u]),p[l.score]=!0}}return o},ue),ee,Xe,Zt=(Xe=class{constructor(){v(this,"name","TrieRouter");m(this,ee);f(this,ee,new Qt)}add(e,t,r){const a=et(t);if(a){for(let s=0,o=a.length;s<o;s++)i(this,ee).insert(e,a[s],r);return}i(this,ee).insert(e,t,r)}match(e,t){return i(this,ee).search(e,t)}},ee=new WeakMap,Xe),ht=class extends $t{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Jt,new Zt]})}},er=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},a=(o=>typeof o=="string"?o==="*"?()=>o:n=>o===n?n:null:typeof o=="function"?o:n=>o.includes(n)?n:null)(r.origin),s=(o=>typeof o=="function"?o:Array.isArray(o)?()=>o:()=>[])(r.allowMethods);return async function(n,d){var p;function c(h,g){n.res.headers.set(h,g)}const l=await a(n.req.header("origin")||"",n);if(l&&c("Access-Control-Allow-Origin",l),r.credentials&&c("Access-Control-Allow-Credentials","true"),(p=r.exposeHeaders)!=null&&p.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),n.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const h=await s(n.req.header("origin")||"",n);h.length&&c("Access-Control-Allow-Methods",h.join(","));let g=r.allowHeaders;if(!(g!=null&&g.length)){const u=n.req.header("Access-Control-Request-Headers");u&&(g=u.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await d(),r.origin!=="*"&&n.header("Vary","Origin",{append:!0})}},tr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=ar)=>{const r=/\.([a-zA-Z0-9]+?)$/,a=e.match(r);if(!a)return;let s=t[a[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},rr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ar=rr,sr=(...e)=>{let t=e.filter(s=>s!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),a=[];for(const s of r)s===".."&&a.length>0&&a.at(-1)!==".."?a.pop():s!=="."&&a.push(s);return a.join("/")||"."},ft={br:".br",zstd:".zst",gzip:".gz"},or=Object.keys(ft),nr="index.html",ir=e=>{const t=e.root??"./",r=e.path,a=e.join??sr;return async(s,o)=>{var p,h,g,u;if(s.finalized)return o();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((p=e.onNotFound)==null?void 0:p.call(e,s.req.path,s)),o()}let d=a(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(d)&&(d=a(d,nr));const c=e.getContent;let l=await c(d,s);if(l instanceof Response)return s.newResponse(l.body,l);if(l){const y=e.mimes&&We(d,e.mimes)||We(d);if(s.header("Content-Type",y||"application/octet-stream"),e.precompressed&&(!y||tr.test(y))){const D=new Set((h=s.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(x=>x.trim()));for(const x of or){if(!D.has(x))continue;const E=await c(d+ft[x],s);if(E){l=E,s.header("Content-Encoding",x),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((g=e.onFound)==null?void 0:g.call(e,d,s)),s.body(l)}await((u=e.onNotFound)==null?void 0:u.call(e,d,s)),await o()}},lr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let a;t&&t.namespace?a=t.namespace:a=__STATIC_CONTENT;const s=r[e]||e;if(!s)return null;const o=await a.get(s,{type:"stream"});return o||null},cr=e=>async function(r,a){return ir({...e,getContent:async o=>lr(o,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,a)},dr=e=>cr(e);const R=new ht;R.use("/api/*",er());R.use("/static/*",dr({root:"./public"}));R.get("/api/dashboard/summary",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),a=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_oncology = 'Y'
    `).first(),s=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_novel = 'Y'
    `).first(),o=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_biosimilar = 'Y'
    `).first(),n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_orphan = 'Y'
    `).first();return e.json({total:(r==null?void 0:r.count)||0,oncology:(a==null?void 0:a.count)||0,novel:(s==null?void 0:s.count)||0,biosimilar:(o==null?void 0:o.count)||0,orphan:(n==null?void 0:n.count)||0})}catch(r){return console.error("Summary error:",r),e.json({error:"Failed to fetch summary"},500)}});R.get("/api/dashboard/therapeutic-area",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT 
        therapeutic_area,
        COUNT(*) as count
      FROM fda_approvals
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != ''
      GROUP BY therapeutic_area
      ORDER BY count DESC
      LIMIT 10
    `).all();return e.json(r.results||[])}catch(r){return console.error("Therapeutic area error:",r),e.json({error:"Failed to fetch therapeutic areas"},500)}});R.get("/api/dashboard/sponsors",async e=>{const{DB:t}=e.env,r=e.req.query("limit")||"10";try{const a=await t.prepare(`
      SELECT 
        sponsor,
        COUNT(*) as count
      FROM fda_approvals
      WHERE sponsor IS NOT NULL AND sponsor != ''
      GROUP BY sponsor
      ORDER BY count DESC
      LIMIT ?
    `).bind(parseInt(r)).all();return e.json(a.results||[])}catch(a){return console.error("Sponsors error:",a),e.json({error:"Failed to fetch sponsors"},500)}});R.get("/api/dashboard/monthly-trend",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
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
    `).all();return e.json(r.results||[])}catch(r){return console.error("Approval types error:",r),e.json({error:"Failed to fetch approval types"},500)}});R.get("/api/approvals",async e=>{const{DB:t}=e.env,r=parseInt(e.req.query("page")||"1"),a=parseInt(e.req.query("limit")||"20"),s=(r-1)*a;try{const o=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),n=await t.prepare(`
      SELECT * FROM fda_approvals
      ORDER BY approval_date DESC
      LIMIT ? OFFSET ?
    `).bind(a,s).all();return e.json({data:n.results||[],pagination:{page:r,limit:a,total:(o==null?void 0:o.count)||0,totalPages:Math.ceil(((o==null?void 0:o.count)||0)/a)}})}catch(o){return console.error("Approvals list error:",o),e.json({error:"Failed to fetch approvals"},500)}});R.get("/api/approvals/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id");try{const a=await t.prepare(`
      SELECT * FROM fda_approvals WHERE id = ?
    `).bind(r).first();return a?e.json(a):e.json({error:"Not found"},404)}catch(a){return console.error("Approval detail error:",a),e.json({error:"Failed to fetch approval detail"},500)}});R.get("/api/approvals/search/:query",async e=>{const{DB:t}=e.env,r=e.req.param("query");if(!r||r.trim()==="")return e.json({error:"Query parameter required"},400);try{const a=`%${r}%`,s=await t.prepare(`
      SELECT * FROM fda_approvals
      WHERE 
        product_name LIKE ? OR
        active_ingredient LIKE ? OR
        sponsor LIKE ? OR
        indication LIKE ?
      ORDER BY approval_date DESC
      LIMIT 50
    `).bind(a,a,a,a).all();return e.json(s.results||[])}catch(a){return console.error("Search error:",a),e.json({error:"Failed to search approvals"},500)}});R.post("/api/approvals/filter",async e=>{const{DB:t}=e.env;try{const r=await e.req.json();let a="SELECT * FROM fda_approvals WHERE 1=1";const s=[];r.approval_month&&(a+=" AND approval_month = ?",s.push(r.approval_month)),r.therapeutic_area&&(a+=" AND therapeutic_area = ?",s.push(r.therapeutic_area)),r.is_oncology&&(a+=" AND is_oncology = ?",s.push(r.is_oncology)),r.is_novel&&(a+=" AND is_novel = ?",s.push(r.is_novel)),r.is_biosimilar&&(a+=" AND is_biosimilar = ?",s.push(r.is_biosimilar)),r.is_orphan&&(a+=" AND is_orphan = ?",s.push(r.is_orphan)),r.sponsor&&(a+=" AND sponsor = ?",s.push(r.sponsor)),r.approval_type&&(a+=" AND approval_type = ?",s.push(r.approval_type)),a+=" ORDER BY approval_date DESC LIMIT 100";const o=await t.prepare(a).bind(...s).all();return e.json(o.results||[])}catch(r){return console.error("Filter error:",r),e.json({error:"Failed to filter approvals"},500)}});R.get("/api/filters/options",async e=>{var r,a,s,o;const{DB:t}=e.env;try{const n=await t.prepare(`
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
    `).all();return e.json({months:((r=n.results)==null?void 0:r.map(p=>p.approval_month))||[],therapeutic_areas:((a=d.results)==null?void 0:a.map(p=>p.therapeutic_area))||[],sponsors:((s=c.results)==null?void 0:s.map(p=>p.sponsor))||[],approval_types:((o=l.results)==null?void 0:o.map(p=>p.approval_type))||[]})}catch(n){return console.error("Filter options error:",n),e.json({error:"Failed to fetch filter options"},500)}});R.get("/api/versions",async e=>{const{DB:t}=e.env;try{const r=await t.prepare(`
      SELECT * FROM data_versions 
      ORDER BY uploaded_at DESC
    `).all();return e.json(r.results||[])}catch(r){return console.error("Versions error:",r),e.json({error:"Failed to fetch versions"},500)}});R.post("/api/versions/backup",async e=>{const{DB:t}=e.env;try{const r=await e.req.json(),{version_name:a,month:s,description:o}=r,n=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),d=(n==null?void 0:n.count)||0,l=(await t.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description)
      VALUES (?, ?, ?, ?)
    `).bind(a,s,d,o||"").run()).meta.last_row_id;return await t.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(l).run(),e.json({success:!0,version_id:l,record_count:d})}catch(r){return console.error("Backup error:",r),e.json({error:"Failed to create backup"},500)}});R.post("/api/versions/restore/:versionId",async e=>{const{DB:t}=e.env,r=e.req.param("versionId");try{const a=await t.prepare(`
      SELECT * FROM data_versions WHERE id = ?
    `).bind(r).first();return a?(await t.prepare("DELETE FROM fda_approvals").run(),await t.prepare(`
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
    `).bind(r).run(),await t.prepare("UPDATE data_versions SET is_active = 0").run(),await t.prepare("UPDATE data_versions SET is_active = 1 WHERE id = ?").bind(r).run(),e.json({success:!0,version_name:a.version_name,record_count:a.record_count})):e.json({error:"Version not found"},404)}catch(a){return console.error("Restore error:",a),e.json({error:"Failed to restore version"},500)}});R.post("/api/data/upload",async e=>{const{DB:t}=e.env;try{const r=await e.req.json(),{data:a,version_name:s,month:o,description:n}=r;if(!a||!Array.isArray(a)||a.length===0)return e.json({error:"Invalid data format"},400);const d=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),c=(d==null?void 0:d.count)||0;if(c>0){const y=(await t.prepare(`
        INSERT INTO data_versions (version_name, month, record_count, description, is_active)
        VALUES (?, ?, ?, ?, ?)
      `).bind(`Backup before ${s}`,o||"unknown",c,"Auto backup before new data upload",0).run()).meta.last_row_id;await t.prepare(`
        INSERT INTO fda_approvals_backup 
        SELECT NULL as id, ? as version_id, 
               approval_month, approval_date, nda_bla_number, application_number,
               application_type, product_name, active_ingredient, sponsor,
               indication, therapeutic_area, is_oncology, is_biosimilar,
               is_novel, is_orphan, approval_type, remarks,
               fda_approval_page, fda_drugs_url, approval_letter,
               source, data_collection_date, created_at
        FROM fda_approvals
      `).bind(y).run()}for(const u of a){const y=await t.prepare(`
        SELECT id FROM fda_approvals 
        WHERE approval_month = ? AND nda_bla_number = ?
      `).bind(u.approval_month,u.nda_bla_number).first();y?await t.prepare(`
          UPDATE fda_approvals SET
            approval_date = ?, application_number = ?, application_type = ?,
            product_name = ?, active_ingredient = ?, sponsor = ?, indication = ?,
            therapeutic_area = ?, is_oncology = ?, is_biosimilar = ?, is_novel = ?,
            is_orphan = ?, approval_type = ?, remarks = ?, fda_approval_page = ?,
            fda_drugs_url = ?, approval_letter = ?, source = ?, data_collection_date = ?
          WHERE id = ?
        `).bind(u.approval_date,u.application_number,u.application_type,u.product_name,u.active_ingredient,u.sponsor,u.indication,u.therapeutic_area,u.is_oncology,u.is_biosimilar,u.is_novel,u.is_orphan,u.approval_type,u.remarks,u.fda_approval_page,u.fda_drugs_url,u.approval_letter,u.source,u.data_collection_date,y.id).run():await t.prepare(`
          INSERT INTO fda_approvals (
            approval_month, approval_date, nda_bla_number, application_number,
            application_type, product_name, active_ingredient, sponsor,
            indication, therapeutic_area, is_oncology, is_biosimilar,
            is_novel, is_orphan, approval_type, remarks,
            fda_approval_page, fda_drugs_url, approval_letter,
            source, data_collection_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(u.approval_month,u.approval_date,u.nda_bla_number,u.application_number,u.application_type,u.product_name,u.active_ingredient,u.sponsor,u.indication,u.therapeutic_area,u.is_oncology,u.is_biosimilar,u.is_novel,u.is_orphan,u.approval_type,u.remarks,u.fda_approval_page,u.fda_drugs_url,u.approval_letter,u.source,u.data_collection_date).run()}const l=await t.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first(),p=(l==null?void 0:l.count)||0,g=(await t.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).bind(s,o,p,n||`${s} (총 ${p}건, 추가 ${a.length}건)`,1).run()).meta.last_row_id;return await t.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(g).run(),e.json({success:!0,version_id:g,record_count:p,added_count:a.length,old_record_count:c})}catch(r){return console.error("Upload error:",r),e.json({error:"Failed to upload data: "+r.message},500)}});R.get("/",e=>e.html(`
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
