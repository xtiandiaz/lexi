const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AboutView-D9YhIWyE.js","assets/AboutView-CSIvawM9.css"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function sr(e){const n=Object.create(null);for(const t of e.split(","))n[t]=1;return t=>t in n}const X={},xn=[],He=()=>{},Wi=()=>!1,vt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ar=e=>e.startsWith("onUpdate:"),oe=Object.assign,lr=(e,n)=>{const t=e.indexOf(n);t>-1&&e.splice(t,1)},Gi=Object.prototype.hasOwnProperty,K=(e,n)=>Gi.call(e,n),H=Array.isArray,En=e=>_t(e)==="[object Map]",Ro=e=>_t(e)==="[object Set]",$=e=>typeof e=="function",te=e=>typeof e=="string",on=e=>typeof e=="symbol",Z=e=>e!==null&&typeof e=="object",Po=e=>(Z(e)||$(e))&&$(e.then)&&$(e.catch),Co=Object.prototype.toString,_t=e=>Co.call(e),Yi=e=>_t(e).slice(8,-1),zo=e=>_t(e)==="[object Object]",cr=e=>te(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Ln=sr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),yt=e=>{const n=Object.create(null);return t=>n[t]||(n[t]=e(t))},Qi=/-(\w)/g,rn=yt(e=>e.replace(Qi,(n,t)=>t?t.toUpperCase():"")),Ji=/\B([A-Z])/g,hn=yt(e=>e.replace(Ji,"-$1").toLowerCase()),jo=yt(e=>e.charAt(0).toUpperCase()+e.slice(1)),jt=yt(e=>e?`on${jo(e)}`:""),tn=(e,n)=>!Object.is(e,n),At=(e,...n)=>{for(let t=0;t<e.length;t++)e[t](...n)},Ao=(e,n,t,r=!1)=>{Object.defineProperty(e,n,{configurable:!0,enumerable:!1,writable:r,value:t})},Xi=e=>{const n=parseFloat(e);return isNaN(n)?e:n};let Tr;const xt=()=>Tr||(Tr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ur(e){if(H(e)){const n={};for(let t=0;t<e.length;t++){const r=e[t],o=te(r)?ts(r):ur(r);if(o)for(const i in o)n[i]=o[i]}return n}else if(te(e)||Z(e))return e}const Zi=/;(?![^(]*\))/g,es=/:([^]+)/,ns=/\/\*[^]*?\*\//g;function ts(e){const n={};return e.replace(ns,"").split(Zi).forEach(t=>{if(t){const r=t.split(es);r.length>1&&(n[r[0].trim()]=r[1].trim())}}),n}function fr(e){let n="";if(te(e))n=e;else if(H(e))for(let t=0;t<e.length;t++){const r=fr(e[t]);r&&(n+=r+" ")}else if(Z(e))for(const t in e)e[t]&&(n+=t+" ");return n.trim()}const rs="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",os=sr(rs);function Oo(e){return!!e||e===""}const To=e=>!!(e&&e.__v_isRef===!0),dr=e=>te(e)?e:e==null?"":H(e)||Z(e)&&(e.toString===Co||!$(e.toString))?To(e)?dr(e.value):JSON.stringify(e,Io,2):String(e),Io=(e,n)=>To(n)?Io(e,n.value):En(n)?{[`Map(${n.size})`]:[...n.entries()].reduce((t,[r,o],i)=>(t[Ot(r,i)+" =>"]=o,t),{})}:Ro(n)?{[`Set(${n.size})`]:[...n.values()].map(t=>Ot(t))}:on(n)?Ot(n):Z(n)&&!H(n)&&!zo(n)?String(n):n,Ot=(e,n="")=>{var t;return on(e)?`Symbol(${(t=e.description)!=null?t:n})`:e};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _e;class Mo{constructor(n=!1){this.detached=n,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=_e,!n&&_e&&(this.index=(_e.scopes||(_e.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].pause();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].resume();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].resume()}}run(n){if(this._active){const t=_e;try{return _e=this,n()}finally{_e=t}}}on(){_e=this}off(){_e=this.parent}stop(n){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!n){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function is(e){return new Mo(e)}function ss(){return _e}let J;const Tt=new WeakSet;class qo{constructor(n){this.fn=n,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_e&&_e.active&&_e.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Tt.has(this)&&(Tt.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Fo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ir(this),Ho(this);const n=J,t=Ce;J=this,Ce=!0;try{return this.fn()}finally{$o(this),J=n,Ce=t,this.flags&=-3}}stop(){if(this.flags&1){for(let n=this.deps;n;n=n.nextDep)mr(n);this.deps=this.depsTail=void 0,Ir(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Tt.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ut(this)&&this.run()}get dirty(){return Ut(this)}}let Lo=0,Fn,Hn;function Fo(e,n=!1){if(e.flags|=8,n){e.next=Hn,Hn=e;return}e.next=Fn,Fn=e}function pr(){Lo++}function hr(){if(--Lo>0)return;if(Hn){let n=Hn;for(Hn=void 0;n;){const t=n.next;n.next=void 0,n.flags&=-9,n=t}}let e;for(;Fn;){let n=Fn;for(Fn=void 0;n;){const t=n.next;if(n.next=void 0,n.flags&=-9,n.flags&1)try{n.trigger()}catch(r){e||(e=r)}n=t}}if(e)throw e}function Ho(e){for(let n=e.deps;n;n=n.nextDep)n.version=-1,n.prevActiveLink=n.dep.activeLink,n.dep.activeLink=n}function $o(e){let n,t=e.depsTail,r=t;for(;r;){const o=r.prevDep;r.version===-1?(r===t&&(t=o),mr(r),as(r)):n=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=o}e.deps=n,e.depsTail=t}function Ut(e){for(let n=e.deps;n;n=n.nextDep)if(n.dep.version!==n.version||n.dep.computed&&(No(n.dep.computed)||n.dep.version!==n.version))return!0;return!!e._dirty}function No(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===kn))return;e.globalVersion=kn;const n=e.dep;if(e.flags|=2,n.version>0&&!e.isSSR&&e.deps&&!Ut(e)){e.flags&=-3;return}const t=J,r=Ce;J=e,Ce=!0;try{Ho(e);const o=e.fn(e._value);(n.version===0||tn(o,e._value))&&(e._value=o,n.version++)}catch(o){throw n.version++,o}finally{J=t,Ce=r,$o(e),e.flags&=-3}}function mr(e,n=!1){const{dep:t,prevSub:r,nextSub:o}=e;if(r&&(r.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=r,e.nextSub=void 0),t.subs===e&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)mr(i,!0)}!n&&!--t.sc&&t.map&&t.map.delete(t.key)}function as(e){const{prevDep:n,nextDep:t}=e;n&&(n.nextDep=t,e.prevDep=void 0),t&&(t.prevDep=n,e.nextDep=void 0)}let Ce=!0;const Do=[];function sn(){Do.push(Ce),Ce=!1}function an(){const e=Do.pop();Ce=e===void 0?!0:e}function Ir(e){const{cleanup:n}=e;if(e.cleanup=void 0,n){const t=J;J=void 0;try{n()}finally{J=t}}}let kn=0;class ls{constructor(n,t){this.sub=n,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class gr{constructor(n){this.computed=n,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(n){if(!J||!Ce||J===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==J)t=this.activeLink=new ls(J,this),J.deps?(t.prevDep=J.depsTail,J.depsTail.nextDep=t,J.depsTail=t):J.deps=J.depsTail=t,Bo(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=J.depsTail,t.nextDep=void 0,J.depsTail.nextDep=t,J.depsTail=t,J.deps===t&&(J.deps=r)}return t}trigger(n){this.version++,kn++,this.notify(n)}notify(n){pr();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{hr()}}}function Bo(e){if(e.dep.sc++,e.sub.flags&4){const n=e.dep.computed;if(n&&!e.dep.subs){n.flags|=20;for(let r=n.deps;r;r=r.nextDep)Bo(r)}const t=e.dep.subs;t!==e&&(e.prevSub=t,t&&(t.nextSub=e)),e.dep.subs=e}}const Kt=new WeakMap,dn=Symbol(""),kt=Symbol(""),Wn=Symbol("");function ae(e,n,t){if(Ce&&J){let r=Kt.get(e);r||Kt.set(e,r=new Map);let o=r.get(t);o||(r.set(t,o=new gr),o.map=r,o.key=t),o.track()}}function Ue(e,n,t,r,o,i){const s=Kt.get(e);if(!s){kn++;return}const l=a=>{a&&a.trigger()};if(pr(),n==="clear")s.forEach(l);else{const a=H(e),p=a&&cr(t);if(a&&t==="length"){const f=Number(r);s.forEach((d,h)=>{(h==="length"||h===Wn||!on(h)&&h>=f)&&l(d)})}else switch((t!==void 0||s.has(void 0))&&l(s.get(t)),p&&l(s.get(Wn)),n){case"add":a?p&&l(s.get("length")):(l(s.get(dn)),En(e)&&l(s.get(kt)));break;case"delete":a||(l(s.get(dn)),En(e)&&l(s.get(kt)));break;case"set":En(e)&&l(s.get(dn));break}}hr()}function vn(e){const n=U(e);return n===e?n:(ae(n,"iterate",Wn),Ee(e)?n:n.map(le))}function Et(e){return ae(e=U(e),"iterate",Wn),e}const cs={__proto__:null,[Symbol.iterator](){return It(this,Symbol.iterator,le)},concat(...e){return vn(this).concat(...e.map(n=>H(n)?vn(n):n))},entries(){return It(this,"entries",e=>(e[1]=le(e[1]),e))},every(e,n){return De(this,"every",e,n,void 0,arguments)},filter(e,n){return De(this,"filter",e,n,t=>t.map(le),arguments)},find(e,n){return De(this,"find",e,n,le,arguments)},findIndex(e,n){return De(this,"findIndex",e,n,void 0,arguments)},findLast(e,n){return De(this,"findLast",e,n,le,arguments)},findLastIndex(e,n){return De(this,"findLastIndex",e,n,void 0,arguments)},forEach(e,n){return De(this,"forEach",e,n,void 0,arguments)},includes(...e){return Mt(this,"includes",e)},indexOf(...e){return Mt(this,"indexOf",e)},join(e){return vn(this).join(e)},lastIndexOf(...e){return Mt(this,"lastIndexOf",e)},map(e,n){return De(this,"map",e,n,void 0,arguments)},pop(){return Tn(this,"pop")},push(...e){return Tn(this,"push",e)},reduce(e,...n){return Mr(this,"reduce",e,n)},reduceRight(e,...n){return Mr(this,"reduceRight",e,n)},shift(){return Tn(this,"shift")},some(e,n){return De(this,"some",e,n,void 0,arguments)},splice(...e){return Tn(this,"splice",e)},toReversed(){return vn(this).toReversed()},toSorted(e){return vn(this).toSorted(e)},toSpliced(...e){return vn(this).toSpliced(...e)},unshift(...e){return Tn(this,"unshift",e)},values(){return It(this,"values",le)}};function It(e,n,t){const r=Et(e),o=r[n]();return r!==e&&!Ee(e)&&(o._next=o.next,o.next=()=>{const i=o._next();return i.value&&(i.value=t(i.value)),i}),o}const us=Array.prototype;function De(e,n,t,r,o,i){const s=Et(e),l=s!==e&&!Ee(e),a=s[n];if(a!==us[n]){const d=a.apply(e,i);return l?le(d):d}let p=t;s!==e&&(l?p=function(d,h){return t.call(this,le(d),h,e)}:t.length>2&&(p=function(d,h){return t.call(this,d,h,e)}));const f=a.call(s,p,r);return l&&o?o(f):f}function Mr(e,n,t,r){const o=Et(e);let i=t;return o!==e&&(Ee(e)?t.length>3&&(i=function(s,l,a){return t.call(this,s,l,a,e)}):i=function(s,l,a){return t.call(this,s,le(l),a,e)}),o[n](i,...r)}function Mt(e,n,t){const r=U(e);ae(r,"iterate",Wn);const o=r[n](...t);return(o===-1||o===!1)&&_r(t[0])?(t[0]=U(t[0]),r[n](...t)):o}function Tn(e,n,t=[]){sn(),pr();const r=U(e)[n].apply(e,t);return hr(),an(),r}const fs=sr("__proto__,__v_isRef,__isVue"),Vo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(on));function ds(e){on(e)||(e=String(e));const n=U(this);return ae(n,"has",e),n.hasOwnProperty(e)}class Uo{constructor(n=!1,t=!1){this._isReadonly=n,this._isShallow=t}get(n,t,r){if(t==="__v_skip")return n.__v_skip;const o=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!o;if(t==="__v_isReadonly")return o;if(t==="__v_isShallow")return i;if(t==="__v_raw")return r===(o?i?Es:Go:i?Wo:ko).get(n)||Object.getPrototypeOf(n)===Object.getPrototypeOf(r)?n:void 0;const s=H(n);if(!o){let a;if(s&&(a=cs[t]))return a;if(t==="hasOwnProperty")return ds}const l=Reflect.get(n,t,ce(n)?n:r);return(on(t)?Vo.has(t):fs(t))||(o||ae(n,"get",t),i)?l:ce(l)?s&&cr(t)?l:l.value:Z(l)?o?Qo(l):wt(l):l}}class Ko extends Uo{constructor(n=!1){super(!1,n)}set(n,t,r,o){let i=n[t];if(!this._isShallow){const a=pn(i);if(!Ee(r)&&!pn(r)&&(i=U(i),r=U(r)),!H(n)&&ce(i)&&!ce(r))return a?!1:(i.value=r,!0)}const s=H(n)&&cr(t)?Number(t)<n.length:K(n,t),l=Reflect.set(n,t,r,ce(n)?n:o);return n===U(o)&&(s?tn(r,i)&&Ue(n,"set",t,r):Ue(n,"add",t,r)),l}deleteProperty(n,t){const r=K(n,t);n[t];const o=Reflect.deleteProperty(n,t);return o&&r&&Ue(n,"delete",t,void 0),o}has(n,t){const r=Reflect.has(n,t);return(!on(t)||!Vo.has(t))&&ae(n,"has",t),r}ownKeys(n){return ae(n,"iterate",H(n)?"length":dn),Reflect.ownKeys(n)}}class ps extends Uo{constructor(n=!1){super(!0,n)}set(n,t){return!0}deleteProperty(n,t){return!0}}const hs=new Ko,ms=new ps,gs=new Ko(!0);const Wt=e=>e,ot=e=>Reflect.getPrototypeOf(e);function bs(e,n,t){return function(...r){const o=this.__v_raw,i=U(o),s=En(i),l=e==="entries"||e===Symbol.iterator&&s,a=e==="keys"&&s,p=o[e](...r),f=t?Wt:n?Gt:le;return!n&&ae(i,"iterate",a?kt:dn),{next(){const{value:d,done:h}=p.next();return h?{value:d,done:h}:{value:l?[f(d[0]),f(d[1])]:f(d),done:h}},[Symbol.iterator](){return this}}}}function it(e){return function(...n){return e==="delete"?!1:e==="clear"?void 0:this}}function vs(e,n){const t={get(o){const i=this.__v_raw,s=U(i),l=U(o);e||(tn(o,l)&&ae(s,"get",o),ae(s,"get",l));const{has:a}=ot(s),p=n?Wt:e?Gt:le;if(a.call(s,o))return p(i.get(o));if(a.call(s,l))return p(i.get(l));i!==s&&i.get(o)},get size(){const o=this.__v_raw;return!e&&ae(U(o),"iterate",dn),Reflect.get(o,"size",o)},has(o){const i=this.__v_raw,s=U(i),l=U(o);return e||(tn(o,l)&&ae(s,"has",o),ae(s,"has",l)),o===l?i.has(o):i.has(o)||i.has(l)},forEach(o,i){const s=this,l=s.__v_raw,a=U(l),p=n?Wt:e?Gt:le;return!e&&ae(a,"iterate",dn),l.forEach((f,d)=>o.call(i,p(f),p(d),s))}};return oe(t,e?{add:it("add"),set:it("set"),delete:it("delete"),clear:it("clear")}:{add(o){!n&&!Ee(o)&&!pn(o)&&(o=U(o));const i=U(this);return ot(i).has.call(i,o)||(i.add(o),Ue(i,"add",o,o)),this},set(o,i){!n&&!Ee(i)&&!pn(i)&&(i=U(i));const s=U(this),{has:l,get:a}=ot(s);let p=l.call(s,o);p||(o=U(o),p=l.call(s,o));const f=a.call(s,o);return s.set(o,i),p?tn(i,f)&&Ue(s,"set",o,i):Ue(s,"add",o,i),this},delete(o){const i=U(this),{has:s,get:l}=ot(i);let a=s.call(i,o);a||(o=U(o),a=s.call(i,o)),l&&l.call(i,o);const p=i.delete(o);return a&&Ue(i,"delete",o,void 0),p},clear(){const o=U(this),i=o.size!==0,s=o.clear();return i&&Ue(o,"clear",void 0,void 0),s}}),["keys","values","entries",Symbol.iterator].forEach(o=>{t[o]=bs(o,e,n)}),t}function br(e,n){const t=vs(e,n);return(r,o,i)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(K(t,o)&&o in r?t:r,o,i)}const _s={get:br(!1,!1)},ys={get:br(!1,!0)},xs={get:br(!0,!1)};const ko=new WeakMap,Wo=new WeakMap,Go=new WeakMap,Es=new WeakMap;function ws(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ss(e){return e.__v_skip||!Object.isExtensible(e)?0:ws(Yi(e))}function wt(e){return pn(e)?e:vr(e,!1,hs,_s,ko)}function Yo(e){return vr(e,!1,gs,ys,Wo)}function Qo(e){return vr(e,!0,ms,xs,Go)}function vr(e,n,t,r,o){if(!Z(e)||e.__v_raw&&!(n&&e.__v_isReactive))return e;const i=o.get(e);if(i)return i;const s=Ss(e);if(s===0)return e;const l=new Proxy(e,s===2?r:t);return o.set(e,l),l}function wn(e){return pn(e)?wn(e.__v_raw):!!(e&&e.__v_isReactive)}function pn(e){return!!(e&&e.__v_isReadonly)}function Ee(e){return!!(e&&e.__v_isShallow)}function _r(e){return e?!!e.__v_raw:!1}function U(e){const n=e&&e.__v_raw;return n?U(n):e}function Jo(e){return!K(e,"__v_skip")&&Object.isExtensible(e)&&Ao(e,"__v_skip",!0),e}const le=e=>Z(e)?wt(e):e,Gt=e=>Z(e)?Qo(e):e;function ce(e){return e?e.__v_isRef===!0:!1}function yr(e){return Xo(e,!1)}function Rs(e){return Xo(e,!0)}function Xo(e,n){return ce(e)?e:new Ps(e,n)}class Ps{constructor(n,t){this.dep=new gr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?n:U(n),this._value=t?n:le(n),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(n){const t=this._rawValue,r=this.__v_isShallow||Ee(n)||pn(n);n=r?n:U(n),tn(n,t)&&(this._rawValue=n,this._value=r?n:le(n),this.dep.trigger())}}function Ke(e){return ce(e)?e.value:e}const Cs={get:(e,n,t)=>n==="__v_raw"?e:Ke(Reflect.get(e,n,t)),set:(e,n,t,r)=>{const o=e[n];return ce(o)&&!ce(t)?(o.value=t,!0):Reflect.set(e,n,t,r)}};function Zo(e){return wn(e)?e:new Proxy(e,Cs)}class zs{constructor(n,t,r){this.fn=n,this.setter=t,this._value=void 0,this.dep=new gr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=kn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&J!==this)return Fo(this,!0),!0}get value(){const n=this.dep.track();return No(this),n&&(n.version=this.dep.version),this._value}set value(n){this.setter&&this.setter(n)}}function js(e,n,t=!1){let r,o;return $(e)?r=e:(r=e.get,o=e.set),new zs(r,o,t)}const st={},ft=new WeakMap;let fn;function As(e,n=!1,t=fn){if(t){let r=ft.get(t);r||ft.set(t,r=[]),r.push(e)}}function Os(e,n,t=X){const{immediate:r,deep:o,once:i,scheduler:s,augmentJob:l,call:a}=t,p=A=>o?A:Ee(A)||o===!1||o===0?nn(A,1):nn(A);let f,d,h,g,z=!1,j=!1;if(ce(e)?(d=()=>e.value,z=Ee(e)):wn(e)?(d=()=>p(e),z=!0):H(e)?(j=!0,z=e.some(A=>wn(A)||Ee(A)),d=()=>e.map(A=>{if(ce(A))return A.value;if(wn(A))return p(A);if($(A))return a?a(A,2):A()})):$(e)?n?d=a?()=>a(e,2):e:d=()=>{if(h){sn();try{h()}finally{an()}}const A=fn;fn=f;try{return a?a(e,3,[g]):e(g)}finally{fn=A}}:d=He,n&&o){const A=d,Y=o===!0?1/0:o;d=()=>nn(A(),Y)}const N=ss(),M=()=>{f.stop(),N&&N.active&&lr(N.effects,f)};if(i&&n){const A=n;n=(...Y)=>{A(...Y),M()}}let T=j?new Array(e.length).fill(st):st;const q=A=>{if(!(!(f.flags&1)||!f.dirty&&!A))if(n){const Y=f.run();if(o||z||(j?Y.some((ie,ee)=>tn(ie,T[ee])):tn(Y,T))){h&&h();const ie=fn;fn=f;try{const ee=[Y,T===st?void 0:j&&T[0]===st?[]:T,g];a?a(n,3,ee):n(...ee),T=Y}finally{fn=ie}}}else f.run()};return l&&l(q),f=new qo(d),f.scheduler=s?()=>s(q,!1):q,g=A=>As(A,!1,f),h=f.onStop=()=>{const A=ft.get(f);if(A){if(a)a(A,4);else for(const Y of A)Y();ft.delete(f)}},n?r?q(!0):T=f.run():s?s(q.bind(null,!0),!0):f.run(),M.pause=f.pause.bind(f),M.resume=f.resume.bind(f),M.stop=M,M}function nn(e,n=1/0,t){if(n<=0||!Z(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),n--,ce(e))nn(e.value,n,t);else if(H(e))for(let r=0;r<e.length;r++)nn(e[r],n,t);else if(Ro(e)||En(e))e.forEach(r=>{nn(r,n,t)});else if(zo(e)){for(const r in e)nn(e[r],n,t);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&nn(e[r],n,t)}return e}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function et(e,n,t,r){try{return r?e(...r):e()}catch(o){St(o,n,t)}}function $e(e,n,t,r){if($(e)){const o=et(e,n,t,r);return o&&Po(o)&&o.catch(i=>{St(i,n,t)}),o}if(H(e)){const o=[];for(let i=0;i<e.length;i++)o.push($e(e[i],n,t,r));return o}}function St(e,n,t,r=!0){const o=n?n.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||X;if(n){let l=n.parent;const a=n.proxy,p=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const f=l.ec;if(f){for(let d=0;d<f.length;d++)if(f[d](e,a,p)===!1)return}l=l.parent}if(i){sn(),et(i,null,10,[e,a,p]),an();return}}Ts(e,t,o,r,s)}function Ts(e,n,t,r=!0,o=!1){if(o)throw e;console.error(e)}const fe=[];let qe=-1;const Sn=[];let Xe=null,_n=0;const ei=Promise.resolve();let dt=null;function ni(e){const n=dt||ei;return e?n.then(this?e.bind(this):e):n}function Is(e){let n=qe+1,t=fe.length;for(;n<t;){const r=n+t>>>1,o=fe[r],i=Gn(o);i<e||i===e&&o.flags&2?n=r+1:t=r}return n}function xr(e){if(!(e.flags&1)){const n=Gn(e),t=fe[fe.length-1];!t||!(e.flags&2)&&n>=Gn(t)?fe.push(e):fe.splice(Is(n),0,e),e.flags|=1,ti()}}function ti(){dt||(dt=ei.then(oi))}function Ms(e){H(e)?Sn.push(...e):Xe&&e.id===-1?Xe.splice(_n+1,0,e):e.flags&1||(Sn.push(e),e.flags|=1),ti()}function qr(e,n,t=qe+1){for(;t<fe.length;t++){const r=fe[t];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;fe.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function ri(e){if(Sn.length){const n=[...new Set(Sn)].sort((t,r)=>Gn(t)-Gn(r));if(Sn.length=0,Xe){Xe.push(...n);return}for(Xe=n,_n=0;_n<Xe.length;_n++){const t=Xe[_n];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Xe=null,_n=0}}const Gn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function oi(e){try{for(qe=0;qe<fe.length;qe++){const n=fe[qe];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),et(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;qe<fe.length;qe++){const n=fe[qe];n&&(n.flags&=-2)}qe=-1,fe.length=0,ri(),dt=null,(fe.length||Sn.length)&&oi()}}let Fe=null,ii=null;function pt(e){const n=Fe;return Fe=e,ii=e&&e.type.__scopeId||null,n}function Yt(e,n=Fe,t){if(!n||e._n)return e;const r=(...o)=>{r._d&&Vr(-1);const i=pt(n);let s;try{s=e(...o)}finally{pt(i),r._d&&Vr(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function cn(e,n,t,r){const o=e.dirs,i=n&&n.dirs;for(let s=0;s<o.length;s++){const l=o[s];i&&(l.oldValue=i[s].value);let a=l.dir[r];a&&(sn(),$e(a,t,8,[e.el,l,e,n]),an())}}const qs=Symbol("_vte"),Ls=e=>e.__isTeleport;function Er(e,n){e.shapeFlag&6&&e.component?(e.transition=n,Er(e.component.subTree,n)):e.shapeFlag&128?(e.ssContent.transition=n.clone(e.ssContent),e.ssFallback.transition=n.clone(e.ssFallback)):e.transition=n}/*! #__NO_SIDE_EFFECTS__ */function nt(e,n){return $(e)?oe({name:e.name},n,{setup:e}):e}function si(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function ht(e,n,t,r,o=!1){if(H(e)){e.forEach((z,j)=>ht(z,n&&(H(n)?n[j]:n),t,r,o));return}if($n(r)&&!o){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ht(e,n,t,r.component.subTree);return}const i=r.shapeFlag&4?Pr(r.component):r.el,s=o?null:i,{i:l,r:a}=e,p=n&&n.r,f=l.refs===X?l.refs={}:l.refs,d=l.setupState,h=U(d),g=d===X?()=>!1:z=>K(h,z);if(p!=null&&p!==a&&(te(p)?(f[p]=null,g(p)&&(d[p]=null)):ce(p)&&(p.value=null)),$(a))et(a,l,12,[s,f]);else{const z=te(a),j=ce(a);if(z||j){const N=()=>{if(e.f){const M=z?g(a)?d[a]:f[a]:a.value;o?H(M)&&lr(M,i):H(M)?M.includes(i)||M.push(i):z?(f[a]=[i],g(a)&&(d[a]=f[a])):(a.value=[i],e.k&&(f[e.k]=a.value))}else z?(f[a]=s,g(a)&&(d[a]=s)):j&&(a.value=s,e.k&&(f[e.k]=s))};s?(N.id=-1,ve(N,t)):N()}}}xt().requestIdleCallback;xt().cancelIdleCallback;const $n=e=>!!e.type.__asyncLoader,ai=e=>e.type.__isKeepAlive;function Fs(e,n){li(e,"a",n)}function Hs(e,n){li(e,"da",n)}function li(e,n,t=de){const r=e.__wdc||(e.__wdc=()=>{let o=t;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Rt(n,r,t),t){let o=t.parent;for(;o&&o.parent;)ai(o.parent.vnode)&&$s(r,n,t,o),o=o.parent}}function $s(e,n,t,r){const o=Rt(n,e,r,!0);ci(()=>{lr(r[n],o)},t)}function Rt(e,n,t=de,r=!1){if(t){const o=t[e]||(t[e]=[]),i=n.__weh||(n.__weh=(...s)=>{sn();const l=tt(t),a=$e(n,t,e,s);return l(),an(),a});return r?o.unshift(i):o.push(i),i}}const We=e=>(n,t=de)=>{(!Jn||e==="sp")&&Rt(e,(...r)=>n(...r),t)},Ns=We("bm"),Ds=We("m"),Bs=We("bu"),Vs=We("u"),Us=We("bum"),ci=We("um"),Ks=We("sp"),ks=We("rtg"),Ws=We("rtc");function Gs(e,n=de){Rt("ec",e,n)}const Ys=Symbol.for("v-ndc");function Qs(e,n,t,r){let o;const i=t,s=H(e);if(s||te(e)){const l=s&&wn(e);let a=!1;l&&(a=!Ee(e),e=Et(e)),o=new Array(e.length);for(let p=0,f=e.length;p<f;p++)o[p]=n(a?le(e[p]):e[p],p,void 0,i)}else if(typeof e=="number"){o=new Array(e);for(let l=0;l<e;l++)o[l]=n(l+1,l,void 0,i)}else if(Z(e))if(e[Symbol.iterator])o=Array.from(e,(l,a)=>n(l,a,void 0,i));else{const l=Object.keys(e);o=new Array(l.length);for(let a=0,p=l.length;a<p;a++){const f=l[a];o[a]=n(e[f],f,a,i)}}else o=[];return o}const Qt=e=>e?zi(e)?Pr(e):Qt(e.parent):null,Nn=oe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Qt(e.parent),$root:e=>Qt(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>wr(e),$forceUpdate:e=>e.f||(e.f=()=>{xr(e.update)}),$nextTick:e=>e.n||(e.n=ni.bind(e.proxy)),$watch:e=>ba.bind(e)}),qt=(e,n)=>e!==X&&!e.__isScriptSetup&&K(e,n),Js={get({_:e},n){if(n==="__v_skip")return!0;const{ctx:t,setupState:r,data:o,props:i,accessCache:s,type:l,appContext:a}=e;let p;if(n[0]!=="$"){const g=s[n];if(g!==void 0)switch(g){case 1:return r[n];case 2:return o[n];case 4:return t[n];case 3:return i[n]}else{if(qt(r,n))return s[n]=1,r[n];if(o!==X&&K(o,n))return s[n]=2,o[n];if((p=e.propsOptions[0])&&K(p,n))return s[n]=3,i[n];if(t!==X&&K(t,n))return s[n]=4,t[n];Jt&&(s[n]=0)}}const f=Nn[n];let d,h;if(f)return n==="$attrs"&&ae(e.attrs,"get",""),f(e);if((d=l.__cssModules)&&(d=d[n]))return d;if(t!==X&&K(t,n))return s[n]=4,t[n];if(h=a.config.globalProperties,K(h,n))return h[n]},set({_:e},n,t){const{data:r,setupState:o,ctx:i}=e;return qt(o,n)?(o[n]=t,!0):r!==X&&K(r,n)?(r[n]=t,!0):K(e.props,n)||n[0]==="$"&&n.slice(1)in e?!1:(i[n]=t,!0)},has({_:{data:e,setupState:n,accessCache:t,ctx:r,appContext:o,propsOptions:i}},s){let l;return!!t[s]||e!==X&&K(e,s)||qt(n,s)||(l=i[0])&&K(l,s)||K(r,s)||K(Nn,s)||K(o.config.globalProperties,s)},defineProperty(e,n,t){return t.get!=null?e._.accessCache[n]=0:K(t,"value")&&this.set(e,n,t.value,null),Reflect.defineProperty(e,n,t)}};function Lr(e){return H(e)?e.reduce((n,t)=>(n[t]=null,n),{}):e}let Jt=!0;function Xs(e){const n=wr(e),t=e.proxy,r=e.ctx;Jt=!1,n.beforeCreate&&Fr(n.beforeCreate,e,"bc");const{data:o,computed:i,methods:s,watch:l,provide:a,inject:p,created:f,beforeMount:d,mounted:h,beforeUpdate:g,updated:z,activated:j,deactivated:N,beforeDestroy:M,beforeUnmount:T,destroyed:q,unmounted:A,render:Y,renderTracked:ie,renderTriggered:ee,errorCaptured:je,serverPrefetch:Ge,expose:Ae,inheritAttrs:Ye,components:ln,directives:Oe,filters:An}=n;if(p&&Zs(p,r,null),s)for(const G in s){const B=s[G];$(B)&&(r[G]=B.bind(t))}if(o){const G=o.call(t,t);Z(G)&&(e.data=wt(G))}if(Jt=!0,i)for(const G in i){const B=i[G],Ne=$(B)?B.bind(t,t):$(B.get)?B.get.bind(t,t):He,Qe=!$(B)&&$(B.set)?B.set.bind(t):He,Te=Re({get:Ne,set:Qe});Object.defineProperty(r,G,{enumerable:!0,configurable:!0,get:()=>Te.value,set:he=>Te.value=he})}if(l)for(const G in l)ui(l[G],r,t,G);if(a){const G=$(a)?a.call(t):a;Reflect.ownKeys(G).forEach(B=>{at(B,G[B])})}f&&Fr(f,e,"c");function re(G,B){H(B)?B.forEach(Ne=>G(Ne.bind(t))):B&&G(B.bind(t))}if(re(Ns,d),re(Ds,h),re(Bs,g),re(Vs,z),re(Fs,j),re(Hs,N),re(Gs,je),re(Ws,ie),re(ks,ee),re(Us,T),re(ci,A),re(Ks,Ge),H(Ae))if(Ae.length){const G=e.exposed||(e.exposed={});Ae.forEach(B=>{Object.defineProperty(G,B,{get:()=>t[B],set:Ne=>t[B]=Ne})})}else e.exposed||(e.exposed={});Y&&e.render===He&&(e.render=Y),Ye!=null&&(e.inheritAttrs=Ye),ln&&(e.components=ln),Oe&&(e.directives=Oe),Ge&&si(e)}function Zs(e,n,t=He){H(e)&&(e=Xt(e));for(const r in e){const o=e[r];let i;Z(o)?"default"in o?i=ke(o.from||r,o.default,!0):i=ke(o.from||r):i=ke(o),ce(i)?Object.defineProperty(n,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:s=>i.value=s}):n[r]=i}}function Fr(e,n,t){$e(H(e)?e.map(r=>r.bind(n.proxy)):e.bind(n.proxy),n,t)}function ui(e,n,t,r){let o=r.includes(".")?Si(t,r):()=>t[r];if(te(e)){const i=n[e];$(i)&&lt(o,i)}else if($(e))lt(o,e.bind(t));else if(Z(e))if(H(e))e.forEach(i=>ui(i,n,t,r));else{const i=$(e.handler)?e.handler.bind(t):n[e.handler];$(i)&&lt(o,i,e)}}function wr(e){const n=e.type,{mixins:t,extends:r}=n,{mixins:o,optionsCache:i,config:{optionMergeStrategies:s}}=e.appContext,l=i.get(n);let a;return l?a=l:!o.length&&!t&&!r?a=n:(a={},o.length&&o.forEach(p=>mt(a,p,s,!0)),mt(a,n,s)),Z(n)&&i.set(n,a),a}function mt(e,n,t,r=!1){const{mixins:o,extends:i}=n;i&&mt(e,i,t,!0),o&&o.forEach(s=>mt(e,s,t,!0));for(const s in n)if(!(r&&s==="expose")){const l=ea[s]||t&&t[s];e[s]=l?l(e[s],n[s]):n[s]}return e}const ea={data:Hr,props:$r,emits:$r,methods:qn,computed:qn,beforeCreate:ue,created:ue,beforeMount:ue,mounted:ue,beforeUpdate:ue,updated:ue,beforeDestroy:ue,beforeUnmount:ue,destroyed:ue,unmounted:ue,activated:ue,deactivated:ue,errorCaptured:ue,serverPrefetch:ue,components:qn,directives:qn,watch:ta,provide:Hr,inject:na};function Hr(e,n){return n?e?function(){return oe($(e)?e.call(this,this):e,$(n)?n.call(this,this):n)}:n:e}function na(e,n){return qn(Xt(e),Xt(n))}function Xt(e){if(H(e)){const n={};for(let t=0;t<e.length;t++)n[e[t]]=e[t];return n}return e}function ue(e,n){return e?[...new Set([].concat(e,n))]:n}function qn(e,n){return e?oe(Object.create(null),e,n):n}function $r(e,n){return e?H(e)&&H(n)?[...new Set([...e,...n])]:oe(Object.create(null),Lr(e),Lr(n??{})):n}function ta(e,n){if(!e)return n;if(!n)return e;const t=oe(Object.create(null),e);for(const r in n)t[r]=ue(e[r],n[r]);return t}function fi(){return{app:null,config:{isNativeTag:Wi,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ra=0;function oa(e,n){return function(r,o=null){$(r)||(r=oe({},r)),o!=null&&!Z(o)&&(o=null);const i=fi(),s=new WeakSet,l=[];let a=!1;const p=i.app={_uid:ra++,_component:r,_props:o,_container:null,_context:i,_instance:null,version:Ha,get config(){return i.config},set config(f){},use(f,...d){return s.has(f)||(f&&$(f.install)?(s.add(f),f.install(p,...d)):$(f)&&(s.add(f),f(p,...d))),p},mixin(f){return i.mixins.includes(f)||i.mixins.push(f),p},component(f,d){return d?(i.components[f]=d,p):i.components[f]},directive(f,d){return d?(i.directives[f]=d,p):i.directives[f]},mount(f,d,h){if(!a){const g=p._ceVNode||pe(r,o);return g.appContext=i,h===!0?h="svg":h===!1&&(h=void 0),d&&n?n(g,f):e(g,f,h),a=!0,p._container=f,f.__vue_app__=p,Pr(g.component)}},onUnmount(f){l.push(f)},unmount(){a&&($e(l,p._instance,16),e(null,p._container),delete p._container.__vue_app__)},provide(f,d){return i.provides[f]=d,p},runWithContext(f){const d=Rn;Rn=p;try{return f()}finally{Rn=d}}};return p}}let Rn=null;function at(e,n){if(de){let t=de.provides;const r=de.parent&&de.parent.provides;r===t&&(t=de.provides=Object.create(r)),t[e]=n}}function ke(e,n,t=!1){const r=de||Fe;if(r||Rn){const o=Rn?Rn._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(o&&e in o)return o[e];if(arguments.length>1)return t&&$(n)?n.call(r&&r.proxy):n}}const di={},pi=()=>Object.create(di),hi=e=>Object.getPrototypeOf(e)===di;function ia(e,n,t,r=!1){const o={},i=pi();e.propsDefaults=Object.create(null),mi(e,n,o,i);for(const s in e.propsOptions[0])s in o||(o[s]=void 0);t?e.props=r?o:Yo(o):e.type.props?e.props=o:e.props=i,e.attrs=i}function sa(e,n,t,r){const{props:o,attrs:i,vnode:{patchFlag:s}}=e,l=U(o),[a]=e.propsOptions;let p=!1;if((r||s>0)&&!(s&16)){if(s&8){const f=e.vnode.dynamicProps;for(let d=0;d<f.length;d++){let h=f[d];if(Pt(e.emitsOptions,h))continue;const g=n[h];if(a)if(K(i,h))g!==i[h]&&(i[h]=g,p=!0);else{const z=rn(h);o[z]=Zt(a,l,z,g,e,!1)}else g!==i[h]&&(i[h]=g,p=!0)}}}else{mi(e,n,o,i)&&(p=!0);let f;for(const d in l)(!n||!K(n,d)&&((f=hn(d))===d||!K(n,f)))&&(a?t&&(t[d]!==void 0||t[f]!==void 0)&&(o[d]=Zt(a,l,d,void 0,e,!0)):delete o[d]);if(i!==l)for(const d in i)(!n||!K(n,d))&&(delete i[d],p=!0)}p&&Ue(e.attrs,"set","")}function mi(e,n,t,r){const[o,i]=e.propsOptions;let s=!1,l;if(n)for(let a in n){if(Ln(a))continue;const p=n[a];let f;o&&K(o,f=rn(a))?!i||!i.includes(f)?t[f]=p:(l||(l={}))[f]=p:Pt(e.emitsOptions,a)||(!(a in r)||p!==r[a])&&(r[a]=p,s=!0)}if(i){const a=U(t),p=l||X;for(let f=0;f<i.length;f++){const d=i[f];t[d]=Zt(o,a,d,p[d],e,!K(p,d))}}return s}function Zt(e,n,t,r,o,i){const s=e[t];if(s!=null){const l=K(s,"default");if(l&&r===void 0){const a=s.default;if(s.type!==Function&&!s.skipFactory&&$(a)){const{propsDefaults:p}=o;if(t in p)r=p[t];else{const f=tt(o);r=p[t]=a.call(null,n),f()}}else r=a;o.ce&&o.ce._setProp(t,r)}s[0]&&(i&&!l?r=!1:s[1]&&(r===""||r===hn(t))&&(r=!0))}return r}const aa=new WeakMap;function gi(e,n,t=!1){const r=t?aa:n.propsCache,o=r.get(e);if(o)return o;const i=e.props,s={},l=[];let a=!1;if(!$(e)){const f=d=>{a=!0;const[h,g]=gi(d,n,!0);oe(s,h),g&&l.push(...g)};!t&&n.mixins.length&&n.mixins.forEach(f),e.extends&&f(e.extends),e.mixins&&e.mixins.forEach(f)}if(!i&&!a)return Z(e)&&r.set(e,xn),xn;if(H(i))for(let f=0;f<i.length;f++){const d=rn(i[f]);Nr(d)&&(s[d]=X)}else if(i)for(const f in i){const d=rn(f);if(Nr(d)){const h=i[f],g=s[d]=H(h)||$(h)?{type:h}:oe({},h),z=g.type;let j=!1,N=!0;if(H(z))for(let M=0;M<z.length;++M){const T=z[M],q=$(T)&&T.name;if(q==="Boolean"){j=!0;break}else q==="String"&&(N=!1)}else j=$(z)&&z.name==="Boolean";g[0]=j,g[1]=N,(j||K(g,"default"))&&l.push(d)}}const p=[s,l];return Z(e)&&r.set(e,p),p}function Nr(e){return e[0]!=="$"&&!Ln(e)}const bi=e=>e[0]==="_"||e==="$stable",Sr=e=>H(e)?e.map(Le):[Le(e)],la=(e,n,t)=>{if(n._n)return n;const r=Yt((...o)=>Sr(n(...o)),t);return r._c=!1,r},vi=(e,n,t)=>{const r=e._ctx;for(const o in e){if(bi(o))continue;const i=e[o];if($(i))n[o]=la(o,i,r);else if(i!=null){const s=Sr(i);n[o]=()=>s}}},_i=(e,n)=>{const t=Sr(n);e.slots.default=()=>t},yi=(e,n,t)=>{for(const r in n)(t||r!=="_")&&(e[r]=n[r])},ca=(e,n,t)=>{const r=e.slots=pi();if(e.vnode.shapeFlag&32){const o=n._;o?(yi(r,n,t),t&&Ao(r,"_",o,!0)):vi(n,r)}else n&&_i(e,n)},ua=(e,n,t)=>{const{vnode:r,slots:o}=e;let i=!0,s=X;if(r.shapeFlag&32){const l=n._;l?t&&l===1?i=!1:yi(o,n,t):(i=!n.$stable,vi(n,o)),s=n}else n&&(_i(e,n),s={default:1});if(i)for(const l in o)!bi(l)&&s[l]==null&&delete o[l]},ve=Sa;function fa(e){return da(e)}function da(e,n){const t=xt();t.__VUE__=!0;const{insert:r,remove:o,patchProp:i,createElement:s,createText:l,createComment:a,setText:p,setElementText:f,parentNode:d,nextSibling:h,setScopeId:g=He,insertStaticContent:z}=e,j=(c,u,m,_=null,b=null,y=null,S=void 0,w=null,E=!!u.dynamicChildren)=>{if(c===u)return;c&&!In(c,u)&&(_=v(c),he(c,b,y,!0),c=null),u.patchFlag===-2&&(E=!1,u.dynamicChildren=null);const{type:x,ref:L,shapeFlag:P}=u;switch(x){case Ct:N(c,u,m,_);break;case Yn:M(c,u,m,_);break;case Ht:c==null&&T(u,m,_,S);break;case Se:ln(c,u,m,_,b,y,S,w,E);break;default:P&1?Y(c,u,m,_,b,y,S,w,E):P&6?Oe(c,u,m,_,b,y,S,w,E):(P&64||P&128)&&x.process(c,u,m,_,b,y,S,w,E,O)}L!=null&&b&&ht(L,c&&c.ref,y,u||c,!u)},N=(c,u,m,_)=>{if(c==null)r(u.el=l(u.children),m,_);else{const b=u.el=c.el;u.children!==c.children&&p(b,u.children)}},M=(c,u,m,_)=>{c==null?r(u.el=a(u.children||""),m,_):u.el=c.el},T=(c,u,m,_)=>{[c.el,c.anchor]=z(c.children,u,m,_,c.el,c.anchor)},q=({el:c,anchor:u},m,_)=>{let b;for(;c&&c!==u;)b=h(c),r(c,m,_),c=b;r(u,m,_)},A=({el:c,anchor:u})=>{let m;for(;c&&c!==u;)m=h(c),o(c),c=m;o(u)},Y=(c,u,m,_,b,y,S,w,E)=>{u.type==="svg"?S="svg":u.type==="math"&&(S="mathml"),c==null?ie(u,m,_,b,y,S,w,E):Ge(c,u,b,y,S,w,E)},ie=(c,u,m,_,b,y,S,w)=>{let E,x;const{props:L,shapeFlag:P,transition:I,dirs:F}=c;if(E=c.el=s(c.type,y,L&&L.is,L),P&8?f(E,c.children):P&16&&je(c.children,E,null,_,b,Lt(c,y),S,w),F&&cn(c,null,_,"created"),ee(E,c,c.scopeId,S,_),L){for(const Q in L)Q!=="value"&&!Ln(Q)&&i(E,Q,null,L[Q],y,_);"value"in L&&i(E,"value",null,L.value,y),(x=L.onVnodeBeforeMount)&&Me(x,_,c)}F&&cn(c,null,_,"beforeMount");const D=pa(b,I);D&&I.beforeEnter(E),r(E,u,m),((x=L&&L.onVnodeMounted)||D||F)&&ve(()=>{x&&Me(x,_,c),D&&I.enter(E),F&&cn(c,null,_,"mounted")},b)},ee=(c,u,m,_,b)=>{if(m&&g(c,m),_)for(let y=0;y<_.length;y++)g(c,_[y]);if(b){let y=b.subTree;if(u===y||Pi(y.type)&&(y.ssContent===u||y.ssFallback===u)){const S=b.vnode;ee(c,S,S.scopeId,S.slotScopeIds,b.parent)}}},je=(c,u,m,_,b,y,S,w,E=0)=>{for(let x=E;x<c.length;x++){const L=c[x]=w?Ze(c[x]):Le(c[x]);j(null,L,u,m,_,b,y,S,w)}},Ge=(c,u,m,_,b,y,S)=>{const w=u.el=c.el;let{patchFlag:E,dynamicChildren:x,dirs:L}=u;E|=c.patchFlag&16;const P=c.props||X,I=u.props||X;let F;if(m&&un(m,!1),(F=I.onVnodeBeforeUpdate)&&Me(F,m,u,c),L&&cn(u,c,m,"beforeUpdate"),m&&un(m,!0),(P.innerHTML&&I.innerHTML==null||P.textContent&&I.textContent==null)&&f(w,""),x?Ae(c.dynamicChildren,x,w,m,_,Lt(u,b),y):S||B(c,u,w,null,m,_,Lt(u,b),y,!1),E>0){if(E&16)Ye(w,P,I,m,b);else if(E&2&&P.class!==I.class&&i(w,"class",null,I.class,b),E&4&&i(w,"style",P.style,I.style,b),E&8){const D=u.dynamicProps;for(let Q=0;Q<D.length;Q++){const W=D[Q],me=P[W],se=I[W];(se!==me||W==="value")&&i(w,W,me,se,b,m)}}E&1&&c.children!==u.children&&f(w,u.children)}else!S&&x==null&&Ye(w,P,I,m,b);((F=I.onVnodeUpdated)||L)&&ve(()=>{F&&Me(F,m,u,c),L&&cn(u,c,m,"updated")},_)},Ae=(c,u,m,_,b,y,S)=>{for(let w=0;w<u.length;w++){const E=c[w],x=u[w],L=E.el&&(E.type===Se||!In(E,x)||E.shapeFlag&70)?d(E.el):m;j(E,x,L,null,_,b,y,S,!0)}},Ye=(c,u,m,_,b)=>{if(u!==m){if(u!==X)for(const y in u)!Ln(y)&&!(y in m)&&i(c,y,u[y],null,b,_);for(const y in m){if(Ln(y))continue;const S=m[y],w=u[y];S!==w&&y!=="value"&&i(c,y,w,S,b,_)}"value"in m&&i(c,"value",u.value,m.value,b)}},ln=(c,u,m,_,b,y,S,w,E)=>{const x=u.el=c?c.el:l(""),L=u.anchor=c?c.anchor:l("");let{patchFlag:P,dynamicChildren:I,slotScopeIds:F}=u;F&&(w=w?w.concat(F):F),c==null?(r(x,m,_),r(L,m,_),je(u.children||[],m,L,b,y,S,w,E)):P>0&&P&64&&I&&c.dynamicChildren?(Ae(c.dynamicChildren,I,m,b,y,S,w),(u.key!=null||b&&u===b.subTree)&&xi(c,u,!0)):B(c,u,m,L,b,y,S,w,E)},Oe=(c,u,m,_,b,y,S,w,E)=>{u.slotScopeIds=w,c==null?u.shapeFlag&512?b.ctx.activate(u,m,_,S,E):An(u,m,_,b,y,S,E):mn(c,u,E)},An=(c,u,m,_,b,y,S)=>{const w=c.component=Ta(c,_,b);if(ai(c)&&(w.ctx.renderer=O),Ia(w,!1,S),w.asyncDep){if(b&&b.registerDep(w,re,S),!c.el){const E=w.subTree=pe(Yn);M(null,E,u,m)}}else re(w,c,u,m,b,y,S)},mn=(c,u,m)=>{const _=u.component=c.component;if(Ea(c,u,m))if(_.asyncDep&&!_.asyncResolved){G(_,u,m);return}else _.next=u,_.update();else u.el=c.el,_.vnode=u},re=(c,u,m,_,b,y,S)=>{const w=()=>{if(c.isMounted){let{next:P,bu:I,u:F,parent:D,vnode:Q}=c;{const ge=Ei(c);if(ge){P&&(P.el=Q.el,G(c,P,S)),ge.asyncDep.then(()=>{c.isUnmounted||w()});return}}let W=P,me;un(c,!1),P?(P.el=Q.el,G(c,P,S)):P=Q,I&&At(I),(me=P.props&&P.props.onVnodeBeforeUpdate)&&Me(me,D,P,Q),un(c,!0);const se=Ft(c),we=c.subTree;c.subTree=se,j(we,se,d(we.el),v(we),c,b,y),P.el=se.el,W===null&&wa(c,se.el),F&&ve(F,b),(me=P.props&&P.props.onVnodeUpdated)&&ve(()=>Me(me,D,P,Q),b)}else{let P;const{el:I,props:F}=u,{bm:D,m:Q,parent:W,root:me,type:se}=c,we=$n(u);if(un(c,!1),D&&At(D),!we&&(P=F&&F.onVnodeBeforeMount)&&Me(P,W,u),un(c,!0),I&&ne){const ge=()=>{c.subTree=Ft(c),ne(I,c.subTree,c,b,null)};we&&se.__asyncHydrate?se.__asyncHydrate(I,c,ge):ge()}else{me.ce&&me.ce._injectChildStyle(se);const ge=c.subTree=Ft(c);j(null,ge,m,_,c,b,y),u.el=ge.el}if(Q&&ve(Q,b),!we&&(P=F&&F.onVnodeMounted)){const ge=u;ve(()=>Me(P,W,ge),b)}(u.shapeFlag&256||W&&$n(W.vnode)&&W.vnode.shapeFlag&256)&&c.a&&ve(c.a,b),c.isMounted=!0,u=m=_=null}};c.scope.on();const E=c.effect=new qo(w);c.scope.off();const x=c.update=E.run.bind(E),L=c.job=E.runIfDirty.bind(E);L.i=c,L.id=c.uid,E.scheduler=()=>xr(L),un(c,!0),x()},G=(c,u,m)=>{u.component=c;const _=c.vnode.props;c.vnode=u,c.next=null,sa(c,u.props,_,m),ua(c,u.children,m),sn(),qr(c),an()},B=(c,u,m,_,b,y,S,w,E=!1)=>{const x=c&&c.children,L=c?c.shapeFlag:0,P=u.children,{patchFlag:I,shapeFlag:F}=u;if(I>0){if(I&128){Qe(x,P,m,_,b,y,S,w,E);return}else if(I&256){Ne(x,P,m,_,b,y,S,w,E);return}}F&8?(L&16&&xe(x,b,y),P!==x&&f(m,P)):L&16?F&16?Qe(x,P,m,_,b,y,S,w,E):xe(x,b,y,!0):(L&8&&f(m,""),F&16&&je(P,m,_,b,y,S,w,E))},Ne=(c,u,m,_,b,y,S,w,E)=>{c=c||xn,u=u||xn;const x=c.length,L=u.length,P=Math.min(x,L);let I;for(I=0;I<P;I++){const F=u[I]=E?Ze(u[I]):Le(u[I]);j(c[I],F,m,null,b,y,S,w,E)}x>L?xe(c,b,y,!0,!1,P):je(u,m,_,b,y,S,w,E,P)},Qe=(c,u,m,_,b,y,S,w,E)=>{let x=0;const L=u.length;let P=c.length-1,I=L-1;for(;x<=P&&x<=I;){const F=c[x],D=u[x]=E?Ze(u[x]):Le(u[x]);if(In(F,D))j(F,D,m,null,b,y,S,w,E);else break;x++}for(;x<=P&&x<=I;){const F=c[P],D=u[I]=E?Ze(u[I]):Le(u[I]);if(In(F,D))j(F,D,m,null,b,y,S,w,E);else break;P--,I--}if(x>P){if(x<=I){const F=I+1,D=F<L?u[F].el:_;for(;x<=I;)j(null,u[x]=E?Ze(u[x]):Le(u[x]),m,D,b,y,S,w,E),x++}}else if(x>I)for(;x<=P;)he(c[x],b,y,!0),x++;else{const F=x,D=x,Q=new Map;for(x=D;x<=I;x++){const be=u[x]=E?Ze(u[x]):Le(u[x]);be.key!=null&&Q.set(be.key,x)}let W,me=0;const se=I-D+1;let we=!1,ge=0;const On=new Array(se);for(x=0;x<se;x++)On[x]=0;for(x=F;x<=P;x++){const be=c[x];if(me>=se){he(be,b,y,!0);continue}let Ie;if(be.key!=null)Ie=Q.get(be.key);else for(W=D;W<=I;W++)if(On[W-D]===0&&In(be,u[W])){Ie=W;break}Ie===void 0?he(be,b,y,!0):(On[Ie-D]=x+1,Ie>=ge?ge=Ie:we=!0,j(be,u[Ie],m,null,b,y,S,w,E),me++)}const Ar=we?ha(On):xn;for(W=Ar.length-1,x=se-1;x>=0;x--){const be=D+x,Ie=u[be],Or=be+1<L?u[be+1].el:_;On[x]===0?j(null,Ie,m,Or,b,y,S,w,E):we&&(W<0||x!==Ar[W]?Te(Ie,m,Or,2):W--)}}},Te=(c,u,m,_,b=null)=>{const{el:y,type:S,transition:w,children:E,shapeFlag:x}=c;if(x&6){Te(c.component.subTree,u,m,_);return}if(x&128){c.suspense.move(u,m,_);return}if(x&64){S.move(c,u,m,O);return}if(S===Se){r(y,u,m);for(let P=0;P<E.length;P++)Te(E[P],u,m,_);r(c.anchor,u,m);return}if(S===Ht){q(c,u,m);return}if(_!==2&&x&1&&w)if(_===0)w.beforeEnter(y),r(y,u,m),ve(()=>w.enter(y),b);else{const{leave:P,delayLeave:I,afterLeave:F}=w,D=()=>r(y,u,m),Q=()=>{P(y,()=>{D(),F&&F()})};I?I(y,D,Q):Q()}else r(y,u,m)},he=(c,u,m,_=!1,b=!1)=>{const{type:y,props:S,ref:w,children:E,dynamicChildren:x,shapeFlag:L,patchFlag:P,dirs:I,cacheIndex:F}=c;if(P===-2&&(b=!1),w!=null&&ht(w,null,m,c,!0),F!=null&&(u.renderCache[F]=void 0),L&256){u.ctx.deactivate(c);return}const D=L&1&&I,Q=!$n(c);let W;if(Q&&(W=S&&S.onVnodeBeforeUnmount)&&Me(W,u,c),L&6)rt(c.component,m,_);else{if(L&128){c.suspense.unmount(m,_);return}D&&cn(c,null,u,"beforeUnmount"),L&64?c.type.remove(c,u,m,O,_):x&&!x.hasOnce&&(y!==Se||P>0&&P&64)?xe(x,u,m,!1,!0):(y===Se&&P&384||!b&&L&16)&&xe(E,u,m),_&&gn(c)}(Q&&(W=S&&S.onVnodeUnmounted)||D)&&ve(()=>{W&&Me(W,u,c),D&&cn(c,null,u,"unmounted")},m)},gn=c=>{const{type:u,el:m,anchor:_,transition:b}=c;if(u===Se){bn(m,_);return}if(u===Ht){A(c);return}const y=()=>{o(m),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(c.shapeFlag&1&&b&&!b.persisted){const{leave:S,delayLeave:w}=b,E=()=>S(m,y);w?w(c.el,y,E):E()}else y()},bn=(c,u)=>{let m;for(;c!==u;)m=h(c),o(c),c=m;o(u)},rt=(c,u,m)=>{const{bum:_,scope:b,job:y,subTree:S,um:w,m:E,a:x}=c;Dr(E),Dr(x),_&&At(_),b.stop(),y&&(y.flags|=8,he(S,c,u,m)),w&&ve(w,u),ve(()=>{c.isUnmounted=!0},u),u&&u.pendingBranch&&!u.isUnmounted&&c.asyncDep&&!c.asyncResolved&&c.suspenseId===u.pendingId&&(u.deps--,u.deps===0&&u.resolve())},xe=(c,u,m,_=!1,b=!1,y=0)=>{for(let S=y;S<c.length;S++)he(c[S],u,m,_,b)},v=c=>{if(c.shapeFlag&6)return v(c.component.subTree);if(c.shapeFlag&128)return c.suspense.next();const u=h(c.anchor||c.el),m=u&&u[qs];return m?h(m):u};let C=!1;const R=(c,u,m)=>{c==null?u._vnode&&he(u._vnode,null,null,!0):j(u._vnode||null,c,u,null,null,null,m),u._vnode=c,C||(C=!0,qr(),ri(),C=!1)},O={p:j,um:he,m:Te,r:gn,mt:An,mc:je,pc:B,pbc:Ae,n:v,o:e};let k,ne;return{render:R,hydrate:k,createApp:oa(R,k)}}function Lt({type:e,props:n},t){return t==="svg"&&e==="foreignObject"||t==="mathml"&&e==="annotation-xml"&&n&&n.encoding&&n.encoding.includes("html")?void 0:t}function un({effect:e,job:n},t){t?(e.flags|=32,n.flags|=4):(e.flags&=-33,n.flags&=-5)}function pa(e,n){return(!e||e&&!e.pendingBranch)&&n&&!n.persisted}function xi(e,n,t=!1){const r=e.children,o=n.children;if(H(r)&&H(o))for(let i=0;i<r.length;i++){const s=r[i];let l=o[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=o[i]=Ze(o[i]),l.el=s.el),!t&&l.patchFlag!==-2&&xi(s,l)),l.type===Ct&&(l.el=s.el)}}function ha(e){const n=e.slice(),t=[0];let r,o,i,s,l;const a=e.length;for(r=0;r<a;r++){const p=e[r];if(p!==0){if(o=t[t.length-1],e[o]<p){n[r]=o,t.push(r);continue}for(i=0,s=t.length-1;i<s;)l=i+s>>1,e[t[l]]<p?i=l+1:s=l;p<e[t[i]]&&(i>0&&(n[r]=t[i-1]),t[i]=r)}}for(i=t.length,s=t[i-1];i-- >0;)t[i]=s,s=n[s];return t}function Ei(e){const n=e.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:Ei(n)}function Dr(e){if(e)for(let n=0;n<e.length;n++)e[n].flags|=8}const ma=Symbol.for("v-scx"),ga=()=>ke(ma);function lt(e,n,t){return wi(e,n,t)}function wi(e,n,t=X){const{immediate:r,deep:o,flush:i,once:s}=t,l=oe({},t),a=n&&r||!n&&i!=="post";let p;if(Jn){if(i==="sync"){const g=ga();p=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=He,g.resume=He,g.pause=He,g}}const f=de;l.call=(g,z,j)=>$e(g,f,z,j);let d=!1;i==="post"?l.scheduler=g=>{ve(g,f&&f.suspense)}:i!=="sync"&&(d=!0,l.scheduler=(g,z)=>{z?g():xr(g)}),l.augmentJob=g=>{n&&(g.flags|=4),d&&(g.flags|=2,f&&(g.id=f.uid,g.i=f))};const h=Os(e,n,l);return Jn&&(p?p.push(h):a&&h()),h}function ba(e,n,t){const r=this.proxy,o=te(e)?e.includes(".")?Si(r,e):()=>r[e]:e.bind(r,r);let i;$(n)?i=n:(i=n.handler,t=n);const s=tt(this),l=wi(o,i.bind(r),t);return s(),l}function Si(e,n){const t=n.split(".");return()=>{let r=e;for(let o=0;o<t.length&&r;o++)r=r[t[o]];return r}}const va=(e,n)=>n==="modelValue"||n==="model-value"?e.modelModifiers:e[`${n}Modifiers`]||e[`${rn(n)}Modifiers`]||e[`${hn(n)}Modifiers`];function _a(e,n,...t){if(e.isUnmounted)return;const r=e.vnode.props||X;let o=t;const i=n.startsWith("update:"),s=i&&va(r,n.slice(7));s&&(s.trim&&(o=t.map(f=>te(f)?f.trim():f)),s.number&&(o=t.map(Xi)));let l,a=r[l=jt(n)]||r[l=jt(rn(n))];!a&&i&&(a=r[l=jt(hn(n))]),a&&$e(a,e,6,o);const p=r[l+"Once"];if(p){if(!e.emitted)e.emitted={};else if(e.emitted[l])return;e.emitted[l]=!0,$e(p,e,6,o)}}function Ri(e,n,t=!1){const r=n.emitsCache,o=r.get(e);if(o!==void 0)return o;const i=e.emits;let s={},l=!1;if(!$(e)){const a=p=>{const f=Ri(p,n,!0);f&&(l=!0,oe(s,f))};!t&&n.mixins.length&&n.mixins.forEach(a),e.extends&&a(e.extends),e.mixins&&e.mixins.forEach(a)}return!i&&!l?(Z(e)&&r.set(e,null),null):(H(i)?i.forEach(a=>s[a]=null):oe(s,i),Z(e)&&r.set(e,s),s)}function Pt(e,n){return!e||!vt(n)?!1:(n=n.slice(2).replace(/Once$/,""),K(e,n[0].toLowerCase()+n.slice(1))||K(e,hn(n))||K(e,n))}function Ft(e){const{type:n,vnode:t,proxy:r,withProxy:o,propsOptions:[i],slots:s,attrs:l,emit:a,render:p,renderCache:f,props:d,data:h,setupState:g,ctx:z,inheritAttrs:j}=e,N=pt(e);let M,T;try{if(t.shapeFlag&4){const A=o||r,Y=A;M=Le(p.call(Y,A,f,d,g,h,z)),T=l}else{const A=n;M=Le(A.length>1?A(d,{attrs:l,slots:s,emit:a}):A(d,null)),T=n.props?l:ya(l)}}catch(A){Dn.length=0,St(A,e,1),M=pe(Yn)}let q=M;if(T&&j!==!1){const A=Object.keys(T),{shapeFlag:Y}=q;A.length&&Y&7&&(i&&A.some(ar)&&(T=xa(T,i)),q=Cn(q,T,!1,!0))}return t.dirs&&(q=Cn(q,null,!1,!0),q.dirs=q.dirs?q.dirs.concat(t.dirs):t.dirs),t.transition&&Er(q,t.transition),M=q,pt(N),M}const ya=e=>{let n;for(const t in e)(t==="class"||t==="style"||vt(t))&&((n||(n={}))[t]=e[t]);return n},xa=(e,n)=>{const t={};for(const r in e)(!ar(r)||!(r.slice(9)in n))&&(t[r]=e[r]);return t};function Ea(e,n,t){const{props:r,children:o,component:i}=e,{props:s,children:l,patchFlag:a}=n,p=i.emitsOptions;if(n.dirs||n.transition)return!0;if(t&&a>=0){if(a&1024)return!0;if(a&16)return r?Br(r,s,p):!!s;if(a&8){const f=n.dynamicProps;for(let d=0;d<f.length;d++){const h=f[d];if(s[h]!==r[h]&&!Pt(p,h))return!0}}}else return(o||l)&&(!l||!l.$stable)?!0:r===s?!1:r?s?Br(r,s,p):!0:!!s;return!1}function Br(e,n,t){const r=Object.keys(n);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const i=r[o];if(n[i]!==e[i]&&!Pt(t,i))return!0}return!1}function wa({vnode:e,parent:n},t){for(;n;){const r=n.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=n.vnode).el=t,n=n.parent;else break}}const Pi=e=>e.__isSuspense;function Sa(e,n){n&&n.pendingBranch?H(e)?n.effects.push(...e):n.effects.push(e):Ms(e)}const Se=Symbol.for("v-fgt"),Ct=Symbol.for("v-txt"),Yn=Symbol.for("v-cmt"),Ht=Symbol.for("v-stc"),Dn=[];let ye=null;function Bn(e=!1){Dn.push(ye=e?null:[])}function Ra(){Dn.pop(),ye=Dn[Dn.length-1]||null}let Qn=1;function Vr(e,n=!1){Qn+=e,e<0&&ye&&n&&(ye.hasOnce=!0)}function Pa(e){return e.dynamicChildren=Qn>0?ye||xn:null,Ra(),Qn>0&&ye&&ye.push(e),e}function Vn(e,n,t,r,o,i){return Pa(Pe(e,n,t,r,o,i,!0))}function gt(e){return e?e.__v_isVNode===!0:!1}function In(e,n){return e.type===n.type&&e.key===n.key}const Ci=({key:e})=>e??null,ct=({ref:e,ref_key:n,ref_for:t})=>(typeof e=="number"&&(e=""+e),e!=null?te(e)||ce(e)||$(e)?{i:Fe,r:e,k:n,f:!!t}:e:null);function Pe(e,n=null,t=null,r=0,o=null,i=e===Se?0:1,s=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:e,props:n,key:n&&Ci(n),ref:n&&ct(n),scopeId:ii,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:Fe};return l?(Rr(a,t),i&128&&e.normalize(a)):t&&(a.shapeFlag|=te(t)?8:16),Qn>0&&!s&&ye&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&ye.push(a),a}const pe=Ca;function Ca(e,n=null,t=null,r=0,o=null,i=!1){if((!e||e===Ys)&&(e=Yn),gt(e)){const l=Cn(e,n,!0);return t&&Rr(l,t),Qn>0&&!i&&ye&&(l.shapeFlag&6?ye[ye.indexOf(e)]=l:ye.push(l)),l.patchFlag=-2,l}if(Fa(e)&&(e=e.__vccOpts),n){n=za(n);let{class:l,style:a}=n;l&&!te(l)&&(n.class=fr(l)),Z(a)&&(_r(a)&&!H(a)&&(a=oe({},a)),n.style=ur(a))}const s=te(e)?1:Pi(e)?128:Ls(e)?64:Z(e)?4:$(e)?2:0;return Pe(e,n,t,r,o,s,i,!0)}function za(e){return e?_r(e)||hi(e)?oe({},e):e:null}function Cn(e,n,t=!1,r=!1){const{props:o,ref:i,patchFlag:s,children:l,transition:a}=e,p=n?ja(o||{},n):o,f={__v_isVNode:!0,__v_skip:!0,type:e.type,props:p,key:p&&Ci(p),ref:n&&n.ref?t&&i?H(i)?i.concat(ct(n)):[i,ct(n)]:ct(n):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:l,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:n&&e.type!==Se?s===-1?16:s|16:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Cn(e.ssContent),ssFallback:e.ssFallback&&Cn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&Er(f,a.clone(f)),f}function Pn(e=" ",n=0){return pe(Ct,null,e,n)}function Le(e){return e==null||typeof e=="boolean"?pe(Yn):H(e)?pe(Se,null,e.slice()):gt(e)?Ze(e):pe(Ct,null,String(e))}function Ze(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Cn(e)}function Rr(e,n){let t=0;const{shapeFlag:r}=e;if(n==null)n=null;else if(H(n))t=16;else if(typeof n=="object")if(r&65){const o=n.default;o&&(o._c&&(o._d=!1),Rr(e,o()),o._c&&(o._d=!0));return}else{t=32;const o=n._;!o&&!hi(n)?n._ctx=Fe:o===3&&Fe&&(Fe.slots._===1?n._=1:(n._=2,e.patchFlag|=1024))}else $(n)?(n={default:n,_ctx:Fe},t=32):(n=String(n),r&64?(t=16,n=[Pn(n)]):t=8);e.children=n,e.shapeFlag|=t}function ja(...e){const n={};for(let t=0;t<e.length;t++){const r=e[t];for(const o in r)if(o==="class")n.class!==r.class&&(n.class=fr([n.class,r.class]));else if(o==="style")n.style=ur([n.style,r.style]);else if(vt(o)){const i=n[o],s=r[o];s&&i!==s&&!(H(i)&&i.includes(s))&&(n[o]=i?[].concat(i,s):s)}else o!==""&&(n[o]=r[o])}return n}function Me(e,n,t,r=null){$e(e,n,7,[t,r])}const Aa=fi();let Oa=0;function Ta(e,n,t){const r=e.type,o=(n?n.appContext:e.appContext)||Aa,i={uid:Oa++,vnode:e,type:r,parent:n,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Mo(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(o.provides),ids:n?n.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:gi(r,o),emitsOptions:Ri(r,o),emit:null,emitted:null,propsDefaults:X,inheritAttrs:r.inheritAttrs,ctx:X,data:X,props:X,attrs:X,slots:X,refs:X,setupState:X,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=n?n.root:i,i.emit=_a.bind(null,i),e.ce&&e.ce(i),i}let de=null,bt,er;{const e=xt(),n=(t,r)=>{let o;return(o=e[t])||(o=e[t]=[]),o.push(r),i=>{o.length>1?o.forEach(s=>s(i)):o[0](i)}};bt=n("__VUE_INSTANCE_SETTERS__",t=>de=t),er=n("__VUE_SSR_SETTERS__",t=>Jn=t)}const tt=e=>{const n=de;return bt(e),e.scope.on(),()=>{e.scope.off(),bt(n)}},Ur=()=>{de&&de.scope.off(),bt(null)};function zi(e){return e.vnode.shapeFlag&4}let Jn=!1;function Ia(e,n=!1,t=!1){n&&er(n);const{props:r,children:o}=e.vnode,i=zi(e);ia(e,r,i,n),ca(e,o,t);const s=i?Ma(e,n):void 0;return n&&er(!1),s}function Ma(e,n){const t=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Js);const{setup:r}=t;if(r){sn();const o=e.setupContext=r.length>1?La(e):null,i=tt(e),s=et(r,e,0,[e.props,o]),l=Po(s);if(an(),i(),(l||e.sp)&&!$n(e)&&si(e),l){if(s.then(Ur,Ur),n)return s.then(a=>{Kr(e,a,n)}).catch(a=>{St(a,e,0)});e.asyncDep=s}else Kr(e,s,n)}else ji(e,n)}function Kr(e,n,t){$(n)?e.type.__ssrInlineRender?e.ssrRender=n:e.render=n:Z(n)&&(e.setupState=Zo(n)),ji(e,t)}let kr;function ji(e,n,t){const r=e.type;if(!e.render){if(!n&&kr&&!r.render){const o=r.template||wr(e).template;if(o){const{isCustomElement:i,compilerOptions:s}=e.appContext.config,{delimiters:l,compilerOptions:a}=r,p=oe(oe({isCustomElement:i,delimiters:l},s),a);r.render=kr(o,p)}}e.render=r.render||He}{const o=tt(e);sn();try{Xs(e)}finally{an(),o()}}}const qa={get(e,n){return ae(e,"get",""),e[n]}};function La(e){const n=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,qa),slots:e.slots,emit:e.emit,expose:n}}function Pr(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Zo(Jo(e.exposed)),{get(n,t){if(t in n)return n[t];if(t in Nn)return Nn[t](e)},has(n,t){return t in n||t in Nn}})):e.proxy}function Fa(e){return $(e)&&"__vccOpts"in e}const Re=(e,n)=>js(e,n,Jn);function Ai(e,n,t){const r=arguments.length;return r===2?Z(n)&&!H(n)?gt(n)?pe(e,null,[n]):pe(e,n):pe(e,null,n):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&gt(t)&&(t=[t]),pe(e,n,t))}const Ha="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let nr;const Wr=typeof window<"u"&&window.trustedTypes;if(Wr)try{nr=Wr.createPolicy("vue",{createHTML:e=>e})}catch{}const Oi=nr?e=>nr.createHTML(e):e=>e,$a="http://www.w3.org/2000/svg",Na="http://www.w3.org/1998/Math/MathML",Ve=typeof document<"u"?document:null,Gr=Ve&&Ve.createElement("template"),Da={insert:(e,n,t)=>{n.insertBefore(e,t||null)},remove:e=>{const n=e.parentNode;n&&n.removeChild(e)},createElement:(e,n,t,r)=>{const o=n==="svg"?Ve.createElementNS($a,e):n==="mathml"?Ve.createElementNS(Na,e):t?Ve.createElement(e,{is:t}):Ve.createElement(e);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>Ve.createTextNode(e),createComment:e=>Ve.createComment(e),setText:(e,n)=>{e.nodeValue=n},setElementText:(e,n)=>{e.textContent=n},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ve.querySelector(e),setScopeId(e,n){e.setAttribute(n,"")},insertStaticContent(e,n,t,r,o,i){const s=t?t.previousSibling:n.lastChild;if(o&&(o===i||o.nextSibling))for(;n.insertBefore(o.cloneNode(!0),t),!(o===i||!(o=o.nextSibling)););else{Gr.innerHTML=Oi(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const l=Gr.content;if(r==="svg"||r==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}n.insertBefore(l,t)}return[s?s.nextSibling:n.firstChild,t?t.previousSibling:n.lastChild]}},Ba=Symbol("_vtc");function Va(e,n,t){const r=e[Ba];r&&(n=(n?[n,...r]:[...r]).join(" ")),n==null?e.removeAttribute("class"):t?e.setAttribute("class",n):e.className=n}const Yr=Symbol("_vod"),Ua=Symbol("_vsh"),Ka=Symbol(""),ka=/(^|;)\s*display\s*:/;function Wa(e,n,t){const r=e.style,o=te(t);let i=!1;if(t&&!o){if(n)if(te(n))for(const s of n.split(";")){const l=s.slice(0,s.indexOf(":")).trim();t[l]==null&&ut(r,l,"")}else for(const s in n)t[s]==null&&ut(r,s,"");for(const s in t)s==="display"&&(i=!0),ut(r,s,t[s])}else if(o){if(n!==t){const s=r[Ka];s&&(t+=";"+s),r.cssText=t,i=ka.test(t)}}else n&&e.removeAttribute("style");Yr in e&&(e[Yr]=i?r.display:"",e[Ua]&&(r.display="none"))}const Qr=/\s*!important$/;function ut(e,n,t){if(H(t))t.forEach(r=>ut(e,n,r));else if(t==null&&(t=""),n.startsWith("--"))e.setProperty(n,t);else{const r=Ga(e,n);Qr.test(t)?e.setProperty(hn(r),t.replace(Qr,""),"important"):e[r]=t}}const Jr=["Webkit","Moz","ms"],$t={};function Ga(e,n){const t=$t[n];if(t)return t;let r=rn(n);if(r!=="filter"&&r in e)return $t[n]=r;r=jo(r);for(let o=0;o<Jr.length;o++){const i=Jr[o]+r;if(i in e)return $t[n]=i}return n}const Xr="http://www.w3.org/1999/xlink";function Zr(e,n,t,r,o,i=os(n)){r&&n.startsWith("xlink:")?t==null?e.removeAttributeNS(Xr,n.slice(6,n.length)):e.setAttributeNS(Xr,n,t):t==null||i&&!Oo(t)?e.removeAttribute(n):e.setAttribute(n,i?"":on(t)?String(t):t)}function eo(e,n,t,r,o){if(n==="innerHTML"||n==="textContent"){t!=null&&(e[n]=n==="innerHTML"?Oi(t):t);return}const i=e.tagName;if(n==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?e.getAttribute("value")||"":e.value,a=t==null?e.type==="checkbox"?"on":"":String(t);(l!==a||!("_value"in e))&&(e.value=a),t==null&&e.removeAttribute(n),e._value=t;return}let s=!1;if(t===""||t==null){const l=typeof e[n];l==="boolean"?t=Oo(t):t==null&&l==="string"?(t="",s=!0):l==="number"&&(t=0,s=!0)}try{e[n]=t}catch{}s&&e.removeAttribute(o||n)}function Ya(e,n,t,r){e.addEventListener(n,t,r)}function Qa(e,n,t,r){e.removeEventListener(n,t,r)}const no=Symbol("_vei");function Ja(e,n,t,r,o=null){const i=e[no]||(e[no]={}),s=i[n];if(r&&s)s.value=r;else{const[l,a]=Xa(n);if(r){const p=i[n]=nl(r,o);Ya(e,l,p,a)}else s&&(Qa(e,l,s,a),i[n]=void 0)}}const to=/(?:Once|Passive|Capture)$/;function Xa(e){let n;if(to.test(e)){n={};let r;for(;r=e.match(to);)e=e.slice(0,e.length-r[0].length),n[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):hn(e.slice(2)),n]}let Nt=0;const Za=Promise.resolve(),el=()=>Nt||(Za.then(()=>Nt=0),Nt=Date.now());function nl(e,n){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;$e(tl(r,t.value),n,5,[r])};return t.value=e,t.attached=el(),t}function tl(e,n){if(H(n)){const t=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{t.call(e),e._stopped=!0},n.map(r=>o=>!o._stopped&&r&&r(o))}else return n}const ro=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,rl=(e,n,t,r,o,i)=>{const s=o==="svg";n==="class"?Va(e,r,s):n==="style"?Wa(e,t,r):vt(n)?ar(n)||Ja(e,n,t,r,i):(n[0]==="."?(n=n.slice(1),!0):n[0]==="^"?(n=n.slice(1),!1):ol(e,n,r,s))?(eo(e,n,r),!e.tagName.includes("-")&&(n==="value"||n==="checked"||n==="selected")&&Zr(e,n,r,s,i,n!=="value")):e._isVueCE&&(/[A-Z]/.test(n)||!te(r))?eo(e,rn(n),r,i,n):(n==="true-value"?e._trueValue=r:n==="false-value"&&(e._falseValue=r),Zr(e,n,r,s))};function ol(e,n,t,r){if(r)return!!(n==="innerHTML"||n==="textContent"||n in e&&ro(n)&&$(t));if(n==="spellcheck"||n==="draggable"||n==="translate"||n==="form"||n==="list"&&e.tagName==="INPUT"||n==="type"&&e.tagName==="TEXTAREA")return!1;if(n==="width"||n==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return ro(n)&&te(t)?!1:n in e}const il=oe({patchProp:rl},Da);let oo;function sl(){return oo||(oo=fa(il))}const al=(...e)=>{const n=sl().createApp(...e),{mount:t}=n;return n.mount=r=>{const o=cl(r);if(!o)return;const i=n._component;!$(i)&&!i.render&&!i.template&&(i.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const s=t(o,!1,ll(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},n};function ll(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function cl(e){return te(e)?document.querySelector(e):e}var ul=!1;/*!
 * pinia v2.2.6
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */const fl=Symbol();var io;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(io||(io={}));function dl(){const e=is(!0),n=e.run(()=>yr({}));let t=[],r=[];const o=Jo({install(i){o._a=i,i.provide(fl,o),i.config.globalProperties.$pinia=o,r.forEach(s=>t.push(s)),r=[]},use(i){return!this._a&&!ul?r.push(i):t.push(i),this},_p:t,_a:null,_e:e,_s:new Map,state:n});return o}const pl="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20261.76%20226.69'%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H-.005l130.877%20226.688L261.749.001z'%20fill='%2341b883'/%3e%3cpath%20d='M161.096.001l-30.225%2052.351L100.647.001H52.346l78.526%20136.01L209.398.001z'%20fill='%2334495e'/%3e%3c/svg%3e";/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const yn=typeof document<"u";function Ti(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function hl(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Ti(e.default)}const V=Object.assign;function Dt(e,n){const t={};for(const r in n){const o=n[r];t[r]=ze(o)?o.map(e):e(o)}return t}const Un=()=>{},ze=Array.isArray,Ii=/#/g,ml=/&/g,gl=/\//g,bl=/=/g,vl=/\?/g,Mi=/\+/g,_l=/%5B/g,yl=/%5D/g,qi=/%5E/g,xl=/%60/g,Li=/%7B/g,El=/%7C/g,Fi=/%7D/g,wl=/%20/g;function Cr(e){return encodeURI(""+e).replace(El,"|").replace(_l,"[").replace(yl,"]")}function Sl(e){return Cr(e).replace(Li,"{").replace(Fi,"}").replace(qi,"^")}function tr(e){return Cr(e).replace(Mi,"%2B").replace(wl,"+").replace(Ii,"%23").replace(ml,"%26").replace(xl,"`").replace(Li,"{").replace(Fi,"}").replace(qi,"^")}function Rl(e){return tr(e).replace(bl,"%3D")}function Pl(e){return Cr(e).replace(Ii,"%23").replace(vl,"%3F")}function Cl(e){return e==null?"":Pl(e).replace(gl,"%2F")}function Xn(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const zl=/\/$/,jl=e=>e.replace(zl,"");function Bt(e,n,t="/"){let r,o={},i="",s="";const l=n.indexOf("#");let a=n.indexOf("?");return l<a&&l>=0&&(a=-1),a>-1&&(r=n.slice(0,a),i=n.slice(a+1,l>-1?l:n.length),o=e(i)),l>-1&&(r=r||n.slice(0,l),s=n.slice(l,n.length)),r=Il(r??n,t),{fullPath:r+(i&&"?")+i+s,path:r,query:o,hash:Xn(s)}}function Al(e,n){const t=n.query?e(n.query):"";return n.path+(t&&"?")+t+(n.hash||"")}function so(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function Ol(e,n,t){const r=n.matched.length-1,o=t.matched.length-1;return r>-1&&r===o&&zn(n.matched[r],t.matched[o])&&Hi(n.params,t.params)&&e(n.query)===e(t.query)&&n.hash===t.hash}function zn(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function Hi(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(const t in e)if(!Tl(e[t],n[t]))return!1;return!0}function Tl(e,n){return ze(e)?ao(e,n):ze(n)?ao(n,e):e===n}function ao(e,n){return ze(n)?e.length===n.length&&e.every((t,r)=>t===n[r]):e.length===1&&e[0]===n}function Il(e,n){if(e.startsWith("/"))return e;if(!e)return n;const t=n.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let i=t.length-1,s,l;for(s=0;s<r.length;s++)if(l=r[s],l!==".")if(l==="..")i>1&&i--;else break;return t.slice(0,i).join("/")+"/"+r.slice(s).join("/")}const Je={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Zn;(function(e){e.pop="pop",e.push="push"})(Zn||(Zn={}));var Kn;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Kn||(Kn={}));function Ml(e){if(!e)if(yn){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),jl(e)}const ql=/^[^#]+#/;function Ll(e,n){return e.replace(ql,"#")+n}function Fl(e,n){const t=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:n.behavior,left:r.left-t.left-(n.left||0),top:r.top-t.top-(n.top||0)}}const zt=()=>({left:window.scrollX,top:window.scrollY});function Hl(e){let n;if("el"in e){const t=e.el,r=typeof t=="string"&&t.startsWith("#"),o=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!o)return;n=Fl(o,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.scrollX,n.top!=null?n.top:window.scrollY)}function lo(e,n){return(history.state?history.state.position-n:-1)+e}const rr=new Map;function $l(e,n){rr.set(e,n)}function Nl(e){const n=rr.get(e);return rr.delete(e),n}let Dl=()=>location.protocol+"//"+location.host;function $i(e,n){const{pathname:t,search:r,hash:o}=n,i=e.indexOf("#");if(i>-1){let l=o.includes(e.slice(i))?e.slice(i).length:1,a=o.slice(l);return a[0]!=="/"&&(a="/"+a),so(a,"")}return so(t,e)+r+o}function Bl(e,n,t,r){let o=[],i=[],s=null;const l=({state:h})=>{const g=$i(e,location),z=t.value,j=n.value;let N=0;if(h){if(t.value=g,n.value=h,s&&s===z){s=null;return}N=j?h.position-j.position:0}else r(g);o.forEach(M=>{M(t.value,z,{delta:N,type:Zn.pop,direction:N?N>0?Kn.forward:Kn.back:Kn.unknown})})};function a(){s=t.value}function p(h){o.push(h);const g=()=>{const z=o.indexOf(h);z>-1&&o.splice(z,1)};return i.push(g),g}function f(){const{history:h}=window;h.state&&h.replaceState(V({},h.state,{scroll:zt()}),"")}function d(){for(const h of i)h();i=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",f)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",f,{passive:!0}),{pauseListeners:a,listen:p,destroy:d}}function co(e,n,t,r=!1,o=!1){return{back:e,current:n,forward:t,replaced:r,position:window.history.length,scroll:o?zt():null}}function Vl(e){const{history:n,location:t}=window,r={value:$i(e,t)},o={value:n.state};o.value||i(r.value,{back:null,current:r.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function i(a,p,f){const d=e.indexOf("#"),h=d>-1?(t.host&&document.querySelector("base")?e:e.slice(d))+a:Dl()+e+a;try{n[f?"replaceState":"pushState"](p,"",h),o.value=p}catch(g){console.error(g),t[f?"replace":"assign"](h)}}function s(a,p){const f=V({},n.state,co(o.value.back,a,o.value.forward,!0),p,{position:o.value.position});i(a,f,!0),r.value=a}function l(a,p){const f=V({},o.value,n.state,{forward:a,scroll:zt()});i(f.current,f,!0);const d=V({},co(r.value,a,null),{position:f.position+1},p);i(a,d,!1),r.value=a}return{location:r,state:o,push:l,replace:s}}function Ul(e){e=Ml(e);const n=Vl(e),t=Bl(e,n.state,n.location,n.replace);function r(i,s=!0){s||t.pauseListeners(),history.go(i)}const o=V({location:"",base:e,go:r,createHref:Ll.bind(null,e)},n,t);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>n.state.value}),o}function Kl(e){return typeof e=="string"||e&&typeof e=="object"}function Ni(e){return typeof e=="string"||typeof e=="symbol"}const Di=Symbol("");var uo;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(uo||(uo={}));function jn(e,n){return V(new Error,{type:e,[Di]:!0},n)}function Be(e,n){return e instanceof Error&&Di in e&&(n==null||!!(e.type&n))}const fo="[^/]+?",kl={sensitive:!1,strict:!1,start:!0,end:!0},Wl=/[.+*?^${}()[\]/\\]/g;function Gl(e,n){const t=V({},kl,n),r=[];let o=t.start?"^":"";const i=[];for(const p of e){const f=p.length?[]:[90];t.strict&&!p.length&&(o+="/");for(let d=0;d<p.length;d++){const h=p[d];let g=40+(t.sensitive?.25:0);if(h.type===0)d||(o+="/"),o+=h.value.replace(Wl,"\\$&"),g+=40;else if(h.type===1){const{value:z,repeatable:j,optional:N,regexp:M}=h;i.push({name:z,repeatable:j,optional:N});const T=M||fo;if(T!==fo){g+=10;try{new RegExp(`(${T})`)}catch(A){throw new Error(`Invalid custom RegExp for param "${z}" (${T}): `+A.message)}}let q=j?`((?:${T})(?:/(?:${T}))*)`:`(${T})`;d||(q=N&&p.length<2?`(?:/${q})`:"/"+q),N&&(q+="?"),o+=q,g+=20,N&&(g+=-8),j&&(g+=-20),T===".*"&&(g+=-50)}f.push(g)}r.push(f)}if(t.strict&&t.end){const p=r.length-1;r[p][r[p].length-1]+=.7000000000000001}t.strict||(o+="/?"),t.end?o+="$":t.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const s=new RegExp(o,t.sensitive?"":"i");function l(p){const f=p.match(s),d={};if(!f)return null;for(let h=1;h<f.length;h++){const g=f[h]||"",z=i[h-1];d[z.name]=g&&z.repeatable?g.split("/"):g}return d}function a(p){let f="",d=!1;for(const h of e){(!d||!f.endsWith("/"))&&(f+="/"),d=!1;for(const g of h)if(g.type===0)f+=g.value;else if(g.type===1){const{value:z,repeatable:j,optional:N}=g,M=z in p?p[z]:"";if(ze(M)&&!j)throw new Error(`Provided param "${z}" is an array but it is not repeatable (* or + modifiers)`);const T=ze(M)?M.join("/"):M;if(!T)if(N)h.length<2&&(f.endsWith("/")?f=f.slice(0,-1):d=!0);else throw new Error(`Missing required param "${z}"`);f+=T}}return f||"/"}return{re:s,score:r,keys:i,parse:l,stringify:a}}function Yl(e,n){let t=0;for(;t<e.length&&t<n.length;){const r=n[t]-e[t];if(r)return r;t++}return e.length<n.length?e.length===1&&e[0]===80?-1:1:e.length>n.length?n.length===1&&n[0]===80?1:-1:0}function Bi(e,n){let t=0;const r=e.score,o=n.score;for(;t<r.length&&t<o.length;){const i=Yl(r[t],o[t]);if(i)return i;t++}if(Math.abs(o.length-r.length)===1){if(po(r))return 1;if(po(o))return-1}return o.length-r.length}function po(e){const n=e[e.length-1];return e.length>0&&n[n.length-1]<0}const Ql={type:0,value:""},Jl=/[a-zA-Z0-9_]/;function Xl(e){if(!e)return[[]];if(e==="/")return[[Ql]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(g){throw new Error(`ERR (${t})/"${p}": ${g}`)}let t=0,r=t;const o=[];let i;function s(){i&&o.push(i),i=[]}let l=0,a,p="",f="";function d(){p&&(t===0?i.push({type:0,value:p}):t===1||t===2||t===3?(i.length>1&&(a==="*"||a==="+")&&n(`A repeatable param (${p}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:p,regexp:f,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):n("Invalid state to consume buffer"),p="")}function h(){p+=a}for(;l<e.length;){if(a=e[l++],a==="\\"&&t!==2){r=t,t=4;continue}switch(t){case 0:a==="/"?(p&&d(),s()):a===":"?(d(),t=1):h();break;case 4:h(),t=r;break;case 1:a==="("?t=2:Jl.test(a)?h():(d(),t=0,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case 2:a===")"?f[f.length-1]=="\\"?f=f.slice(0,-1)+a:t=3:f+=a;break;case 3:d(),t=0,a!=="*"&&a!=="?"&&a!=="+"&&l--,f="";break;default:n("Unknown state");break}}return t===2&&n(`Unfinished custom RegExp for param "${p}"`),d(),s(),o}function Zl(e,n,t){const r=Gl(Xl(e.path),t),o=V(r,{record:e,parent:n,children:[],alias:[]});return n&&!o.record.aliasOf==!n.record.aliasOf&&n.children.push(o),o}function ec(e,n){const t=[],r=new Map;n=bo({strict:!1,end:!0,sensitive:!1},n);function o(d){return r.get(d)}function i(d,h,g){const z=!g,j=mo(d);j.aliasOf=g&&g.record;const N=bo(n,d),M=[j];if("alias"in d){const A=typeof d.alias=="string"?[d.alias]:d.alias;for(const Y of A)M.push(mo(V({},j,{components:g?g.record.components:j.components,path:Y,aliasOf:g?g.record:j})))}let T,q;for(const A of M){const{path:Y}=A;if(h&&Y[0]!=="/"){const ie=h.record.path,ee=ie[ie.length-1]==="/"?"":"/";A.path=h.record.path+(Y&&ee+Y)}if(T=Zl(A,h,N),g?g.alias.push(T):(q=q||T,q!==T&&q.alias.push(T),z&&d.name&&!go(T)&&s(d.name)),Vi(T)&&a(T),j.children){const ie=j.children;for(let ee=0;ee<ie.length;ee++)i(ie[ee],T,g&&g.children[ee])}g=g||T}return q?()=>{s(q)}:Un}function s(d){if(Ni(d)){const h=r.get(d);h&&(r.delete(d),t.splice(t.indexOf(h),1),h.children.forEach(s),h.alias.forEach(s))}else{const h=t.indexOf(d);h>-1&&(t.splice(h,1),d.record.name&&r.delete(d.record.name),d.children.forEach(s),d.alias.forEach(s))}}function l(){return t}function a(d){const h=rc(d,t);t.splice(h,0,d),d.record.name&&!go(d)&&r.set(d.record.name,d)}function p(d,h){let g,z={},j,N;if("name"in d&&d.name){if(g=r.get(d.name),!g)throw jn(1,{location:d});N=g.record.name,z=V(ho(h.params,g.keys.filter(q=>!q.optional).concat(g.parent?g.parent.keys.filter(q=>q.optional):[]).map(q=>q.name)),d.params&&ho(d.params,g.keys.map(q=>q.name))),j=g.stringify(z)}else if(d.path!=null)j=d.path,g=t.find(q=>q.re.test(j)),g&&(z=g.parse(j),N=g.record.name);else{if(g=h.name?r.get(h.name):t.find(q=>q.re.test(h.path)),!g)throw jn(1,{location:d,currentLocation:h});N=g.record.name,z=V({},h.params,d.params),j=g.stringify(z)}const M=[];let T=g;for(;T;)M.unshift(T.record),T=T.parent;return{name:N,path:j,params:z,matched:M,meta:tc(M)}}e.forEach(d=>i(d));function f(){t.length=0,r.clear()}return{addRoute:i,resolve:p,removeRoute:s,clearRoutes:f,getRoutes:l,getRecordMatcher:o}}function ho(e,n){const t={};for(const r of n)r in e&&(t[r]=e[r]);return t}function mo(e){const n={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:nc(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(n,"mods",{value:{}}),n}function nc(e){const n={},t=e.props||!1;if("component"in e)n.default=t;else for(const r in e.components)n[r]=typeof t=="object"?t[r]:t;return n}function go(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function tc(e){return e.reduce((n,t)=>V(n,t.meta),{})}function bo(e,n){const t={};for(const r in e)t[r]=r in n?n[r]:e[r];return t}function rc(e,n){let t=0,r=n.length;for(;t!==r;){const i=t+r>>1;Bi(e,n[i])<0?r=i:t=i+1}const o=oc(e);return o&&(r=n.lastIndexOf(o,r-1)),r}function oc(e){let n=e;for(;n=n.parent;)if(Vi(n)&&Bi(e,n)===0)return n}function Vi({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function ic(e){const n={};if(e===""||e==="?")return n;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const i=r[o].replace(Mi," "),s=i.indexOf("="),l=Xn(s<0?i:i.slice(0,s)),a=s<0?null:Xn(i.slice(s+1));if(l in n){let p=n[l];ze(p)||(p=n[l]=[p]),p.push(a)}else n[l]=a}return n}function vo(e){let n="";for(let t in e){const r=e[t];if(t=Rl(t),r==null){r!==void 0&&(n+=(n.length?"&":"")+t);continue}(ze(r)?r.map(i=>i&&tr(i)):[r&&tr(r)]).forEach(i=>{i!==void 0&&(n+=(n.length?"&":"")+t,i!=null&&(n+="="+i))})}return n}function sc(e){const n={};for(const t in e){const r=e[t];r!==void 0&&(n[t]=ze(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return n}const ac=Symbol(""),_o=Symbol(""),zr=Symbol(""),Ui=Symbol(""),or=Symbol("");function Mn(){let e=[];function n(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function t(){e=[]}return{add:n,list:()=>e.slice(),reset:t}}function en(e,n,t,r,o,i=s=>s()){const s=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((l,a)=>{const p=h=>{h===!1?a(jn(4,{from:t,to:n})):h instanceof Error?a(h):Kl(h)?a(jn(2,{from:n,to:h})):(s&&r.enterCallbacks[o]===s&&typeof h=="function"&&s.push(h),l())},f=i(()=>e.call(r&&r.instances[o],n,t,p));let d=Promise.resolve(f);e.length<3&&(d=d.then(p)),d.catch(h=>a(h))})}function Vt(e,n,t,r,o=i=>i()){const i=[];for(const s of e)for(const l in s.components){let a=s.components[l];if(!(n!=="beforeRouteEnter"&&!s.instances[l]))if(Ti(a)){const f=(a.__vccOpts||a)[n];f&&i.push(en(f,t,r,s,l,o))}else{let p=a();i.push(()=>p.then(f=>{if(!f)throw new Error(`Couldn't resolve component "${l}" at "${s.path}"`);const d=hl(f)?f.default:f;s.mods[l]=f,s.components[l]=d;const g=(d.__vccOpts||d)[n];return g&&en(g,t,r,s,l,o)()}))}}return i}function yo(e){const n=ke(zr),t=ke(Ui),r=Re(()=>{const a=Ke(e.to);return n.resolve(a)}),o=Re(()=>{const{matched:a}=r.value,{length:p}=a,f=a[p-1],d=t.matched;if(!f||!d.length)return-1;const h=d.findIndex(zn.bind(null,f));if(h>-1)return h;const g=xo(a[p-2]);return p>1&&xo(f)===g&&d[d.length-1].path!==g?d.findIndex(zn.bind(null,a[p-2])):h}),i=Re(()=>o.value>-1&&fc(t.params,r.value.params)),s=Re(()=>o.value>-1&&o.value===t.matched.length-1&&Hi(t.params,r.value.params));function l(a={}){if(uc(a)){const p=n[Ke(e.replace)?"replace":"push"](Ke(e.to)).catch(Un);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>p),p}return Promise.resolve()}return{route:r,href:Re(()=>r.value.href),isActive:i,isExactActive:s,navigate:l}}function lc(e){return e.length===1?e[0]:e}const cc=nt({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:yo,setup(e,{slots:n}){const t=wt(yo(e)),{options:r}=ke(zr),o=Re(()=>({[Eo(e.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[Eo(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const i=n.default&&lc(n.default(t));return e.custom?i:Ai("a",{"aria-current":t.isExactActive?e.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:o.value},i)}}}),ir=cc;function uc(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function fc(e,n){for(const t in n){const r=n[t],o=e[t];if(typeof r=="string"){if(r!==o)return!1}else if(!ze(o)||o.length!==r.length||r.some((i,s)=>i!==o[s]))return!1}return!0}function xo(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Eo=(e,n,t)=>e??n??t,dc=nt({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:t}){const r=ke(or),o=Re(()=>e.route||r.value),i=ke(_o,0),s=Re(()=>{let p=Ke(i);const{matched:f}=o.value;let d;for(;(d=f[p])&&!d.components;)p++;return p}),l=Re(()=>o.value.matched[s.value]);at(_o,Re(()=>s.value+1)),at(ac,l),at(or,o);const a=yr();return lt(()=>[a.value,l.value,e.name],([p,f,d],[h,g,z])=>{f&&(f.instances[d]=p,g&&g!==f&&p&&p===h&&(f.leaveGuards.size||(f.leaveGuards=g.leaveGuards),f.updateGuards.size||(f.updateGuards=g.updateGuards))),p&&f&&(!g||!zn(f,g)||!h)&&(f.enterCallbacks[d]||[]).forEach(j=>j(p))},{flush:"post"}),()=>{const p=o.value,f=e.name,d=l.value,h=d&&d.components[f];if(!h)return wo(t.default,{Component:h,route:p});const g=d.props[f],z=g?g===!0?p.params:typeof g=="function"?g(p):g:null,N=Ai(h,V({},z,n,{onVnodeUnmounted:M=>{M.component.isUnmounted&&(d.instances[f]=null)},ref:a}));return wo(t.default,{Component:N,route:p})||N}}});function wo(e,n){if(!e)return null;const t=e(n);return t.length===1?t[0]:t}const Ki=dc;function pc(e){const n=ec(e.routes,e),t=e.parseQuery||ic,r=e.stringifyQuery||vo,o=e.history,i=Mn(),s=Mn(),l=Mn(),a=Rs(Je);let p=Je;yn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const f=Dt.bind(null,v=>""+v),d=Dt.bind(null,Cl),h=Dt.bind(null,Xn);function g(v,C){let R,O;return Ni(v)?(R=n.getRecordMatcher(v),O=C):O=v,n.addRoute(O,R)}function z(v){const C=n.getRecordMatcher(v);C&&n.removeRoute(C)}function j(){return n.getRoutes().map(v=>v.record)}function N(v){return!!n.getRecordMatcher(v)}function M(v,C){if(C=V({},C||a.value),typeof v=="string"){const u=Bt(t,v,C.path),m=n.resolve({path:u.path},C),_=o.createHref(u.fullPath);return V(u,m,{params:h(m.params),hash:Xn(u.hash),redirectedFrom:void 0,href:_})}let R;if(v.path!=null)R=V({},v,{path:Bt(t,v.path,C.path).path});else{const u=V({},v.params);for(const m in u)u[m]==null&&delete u[m];R=V({},v,{params:d(u)}),C.params=d(C.params)}const O=n.resolve(R,C),k=v.hash||"";O.params=f(h(O.params));const ne=Al(r,V({},v,{hash:Sl(k),path:O.path})),c=o.createHref(ne);return V({fullPath:ne,hash:k,query:r===vo?sc(v.query):v.query||{}},O,{redirectedFrom:void 0,href:c})}function T(v){return typeof v=="string"?Bt(t,v,a.value.path):V({},v)}function q(v,C){if(p!==v)return jn(8,{from:C,to:v})}function A(v){return ee(v)}function Y(v){return A(V(T(v),{replace:!0}))}function ie(v){const C=v.matched[v.matched.length-1];if(C&&C.redirect){const{redirect:R}=C;let O=typeof R=="function"?R(v):R;return typeof O=="string"&&(O=O.includes("?")||O.includes("#")?O=T(O):{path:O},O.params={}),V({query:v.query,hash:v.hash,params:O.path!=null?{}:v.params},O)}}function ee(v,C){const R=p=M(v),O=a.value,k=v.state,ne=v.force,c=v.replace===!0,u=ie(R);if(u)return ee(V(T(u),{state:typeof u=="object"?V({},k,u.state):k,force:ne,replace:c}),C||R);const m=R;m.redirectedFrom=C;let _;return!ne&&Ol(r,O,R)&&(_=jn(16,{to:m,from:O}),Te(O,O,!0,!1)),(_?Promise.resolve(_):Ae(m,O)).catch(b=>Be(b)?Be(b,2)?b:Qe(b):B(b,m,O)).then(b=>{if(b){if(Be(b,2))return ee(V({replace:c},T(b.to),{state:typeof b.to=="object"?V({},k,b.to.state):k,force:ne}),C||m)}else b=ln(m,O,!0,c,k);return Ye(m,O,b),b})}function je(v,C){const R=q(v,C);return R?Promise.reject(R):Promise.resolve()}function Ge(v){const C=bn.values().next().value;return C&&typeof C.runWithContext=="function"?C.runWithContext(v):v()}function Ae(v,C){let R;const[O,k,ne]=hc(v,C);R=Vt(O.reverse(),"beforeRouteLeave",v,C);for(const u of O)u.leaveGuards.forEach(m=>{R.push(en(m,v,C))});const c=je.bind(null,v,C);return R.push(c),xe(R).then(()=>{R=[];for(const u of i.list())R.push(en(u,v,C));return R.push(c),xe(R)}).then(()=>{R=Vt(k,"beforeRouteUpdate",v,C);for(const u of k)u.updateGuards.forEach(m=>{R.push(en(m,v,C))});return R.push(c),xe(R)}).then(()=>{R=[];for(const u of ne)if(u.beforeEnter)if(ze(u.beforeEnter))for(const m of u.beforeEnter)R.push(en(m,v,C));else R.push(en(u.beforeEnter,v,C));return R.push(c),xe(R)}).then(()=>(v.matched.forEach(u=>u.enterCallbacks={}),R=Vt(ne,"beforeRouteEnter",v,C,Ge),R.push(c),xe(R))).then(()=>{R=[];for(const u of s.list())R.push(en(u,v,C));return R.push(c),xe(R)}).catch(u=>Be(u,8)?u:Promise.reject(u))}function Ye(v,C,R){l.list().forEach(O=>Ge(()=>O(v,C,R)))}function ln(v,C,R,O,k){const ne=q(v,C);if(ne)return ne;const c=C===Je,u=yn?history.state:{};R&&(O||c?o.replace(v.fullPath,V({scroll:c&&u&&u.scroll},k)):o.push(v.fullPath,k)),a.value=v,Te(v,C,R,c),Qe()}let Oe;function An(){Oe||(Oe=o.listen((v,C,R)=>{if(!rt.listening)return;const O=M(v),k=ie(O);if(k){ee(V(k,{replace:!0,force:!0}),O).catch(Un);return}p=O;const ne=a.value;yn&&$l(lo(ne.fullPath,R.delta),zt()),Ae(O,ne).catch(c=>Be(c,12)?c:Be(c,2)?(ee(V(T(c.to),{force:!0}),O).then(u=>{Be(u,20)&&!R.delta&&R.type===Zn.pop&&o.go(-1,!1)}).catch(Un),Promise.reject()):(R.delta&&o.go(-R.delta,!1),B(c,O,ne))).then(c=>{c=c||ln(O,ne,!1),c&&(R.delta&&!Be(c,8)?o.go(-R.delta,!1):R.type===Zn.pop&&Be(c,20)&&o.go(-1,!1)),Ye(O,ne,c)}).catch(Un)}))}let mn=Mn(),re=Mn(),G;function B(v,C,R){Qe(v);const O=re.list();return O.length?O.forEach(k=>k(v,C,R)):console.error(v),Promise.reject(v)}function Ne(){return G&&a.value!==Je?Promise.resolve():new Promise((v,C)=>{mn.add([v,C])})}function Qe(v){return G||(G=!v,An(),mn.list().forEach(([C,R])=>v?R(v):C()),mn.reset()),v}function Te(v,C,R,O){const{scrollBehavior:k}=e;if(!yn||!k)return Promise.resolve();const ne=!R&&Nl(lo(v.fullPath,0))||(O||!R)&&history.state&&history.state.scroll||null;return ni().then(()=>k(v,C,ne)).then(c=>c&&Hl(c)).catch(c=>B(c,v,C))}const he=v=>o.go(v);let gn;const bn=new Set,rt={currentRoute:a,listening:!0,addRoute:g,removeRoute:z,clearRoutes:n.clearRoutes,hasRoute:N,getRoutes:j,resolve:M,options:e,push:A,replace:Y,go:he,back:()=>he(-1),forward:()=>he(1),beforeEach:i.add,beforeResolve:s.add,afterEach:l.add,onError:re.add,isReady:Ne,install(v){const C=this;v.component("RouterLink",ir),v.component("RouterView",Ki),v.config.globalProperties.$router=C,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>Ke(a)}),yn&&!gn&&a.value===Je&&(gn=!0,A(o.location).catch(k=>{}));const R={};for(const k in Je)Object.defineProperty(R,k,{get:()=>a.value[k],enumerable:!0});v.provide(zr,C),v.provide(Ui,Yo(R)),v.provide(or,a);const O=v.unmount;bn.add(v),v.unmount=function(){bn.delete(v),bn.size<1&&(p=Je,Oe&&Oe(),Oe=null,a.value=Je,gn=!1,G=!1),O()}}};function xe(v){return v.reduce((C,R)=>C.then(()=>Ge(R)),Promise.resolve())}return rt}function hc(e,n){const t=[],r=[],o=[],i=Math.max(n.matched.length,e.matched.length);for(let s=0;s<i;s++){const l=n.matched[s];l&&(e.matched.find(p=>zn(p,l))?r.push(l):t.push(l));const a=e.matched[s];a&&(n.matched.find(p=>zn(p,a))||o.push(a))}return[t,r,o]}const mc={class:"greetings"},gc={class:"green"},bc=nt({__name:"HelloWorld",props:{msg:{}},setup(e){return(n,t)=>(Bn(),Vn("div",mc,[Pe("h1",gc,dr(n.msg),1),t[0]||(t[0]=Pe("h3",null,[Pn(" You’ve successfully created a project with "),Pe("a",{href:"https://vite.dev/",target:"_blank",rel:"noopener"},"Vite"),Pn(" + "),Pe("a",{href:"https://vuejs.org/",target:"_blank",rel:"noopener"},"Vue 3"),Pn(". What's next? ")],-1))]))}}),ki=(e,n)=>{const t=e.__vccOpts||e;for(const[r,o]of n)t[r]=o;return t},vc=ki(bc,[["__scopeId","data-v-d1bb330e"]]),_c={class:"wrapper"},yc=nt({__name:"App",setup(e){return(n,t)=>(Bn(),Vn(Se,null,[Pe("header",null,[t[2]||(t[2]=Pe("img",{alt:"Vue logo",class:"logo",src:pl,width:"125",height:"125"},null,-1)),Pe("div",_c,[pe(vc,{msg:"You did it!"}),Pe("nav",null,[pe(Ke(ir),{to:"/"},{default:Yt(()=>t[0]||(t[0]=[Pn("Home")])),_:1}),pe(Ke(ir),{to:"/about"},{default:Yt(()=>t[1]||(t[1]=[Pn("About")])),_:1})])])]),pe(Ke(Ki))],64))}}),xc=ki(yc,[["__scopeId","data-v-85852c48"]]),Ec="modulepreload",wc=function(e){return"/lexicon/vue/dist/"+e},So={},Sc=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=Promise.allSettled(t.map(a=>{if(a=wc(a),a in So)return;So[a]=!0;const p=a.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${f}`))return;const d=document.createElement("link");if(d.rel=p?"stylesheet":Ec,p||(d.as="script"),d.crossOrigin="",d.href=a,l&&d.setAttribute("nonce",l),document.head.appendChild(d),p)return new Promise((h,g)=>{d.addEventListener("load",h),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return n().catch(i)})},Rc=`abalorio
abanicar
abarrotar
abasto
abatido
abatir
abdicar
abigarrado
abismo, precipicio
abnegación
abnegado
abocar
abolir
abrasar
abrasión
abrasivo
abrazadera
abrigar
abrumar
abrupto
absorto, abstraído
abstener
abstraído, ensimismado, absorto
abstruso
abuchear
abucheo, bronca
abulia
abúlico
abyecto
acaballado
acaballar
acaecer, acontecer
acaparar
acarrear
acechar
acequia
acerado
acezar, jadear, resoplar, resollar
achaparrado
achaque
achicharrante
achicharrar
achicoria, chicoria
achinado
aciago
acopio
acoplado, remolque
acoplar
acople, acoplamiento, acopladura
acorde
acotado
acotar
acrofobia
acucioso
acuclillarse, encuclillarse, apucuyarse
acunar
acuñar
acurrucarse
adecentar
adefesio
ademán
adepto
aditamento
adobe
adoctrinar, aleccionar, doctrinar
adormecerse, adormitarse, amodorrarse
adormidera
adosado
adosar
aeródromo
afable
afamado
afasia
afectaón
afelpado
afelpado
afianzar
áfido, afídido
afiebrado
aflicción
aforar
aforo, afuero
afrancesado
afrecho, salvado
afrenta
afrodisíaco
agasajar
ágata
aglomeración
agobiar
agobio
agorafobia
agraciado
agriar
agutí, ñeque
aguzar
ahínco
alambicar, destilar
alambique, alcatara, alquitara, destilador, destiladera
alarde
alarido
albedrío
albergar
albergue, cobijo
albornoz
alcornoque
aldaba, aldabón, picaporte
aleatorio
alebosía
alebrije
alero
alerón
aletargado
aletargamiento, letargo
aletargar
alfajor
alforja
algarabía, algazara
alginato
alienado
alimaña
alistonado
aljibe
alondra
altanería
altercado
altivez
altivo
alucinación
aludir
alusión
aluvión
alveolo, alvéolo
amainar
ambiguo
ambivalente
amilanar, amedrentar
aminorar
amnistía
ampolla
ampolleta
amuleto
analgésico
anatema
anatematizar
anca
andrajo
anémona, anemone
anestésico
animosidad
anodino
anómalo
anquilosar
antesala
antisemita
antología
antorcha
anturio
añublo, anublo
apaciguar, amansar, aplacar, aquietar, sosegar
apañar
aparador
aparejar
apatía
apercibir
ápice
aplastante
aplomo
apogeo
aprensión
aprensivo, receloso, desconfiado
aquiescencia
aquilino
arbitrario
arcada
arcaico
arcén
ardid
ardid
arduo
arenque
argamasa
argucia
armatoste, mamotreto
armiño
armisticio, tregua, pacto
árnica
arracimado, racimado, apiñado
arrebato, arranque
arrebol
arrecife
arrellanarase, repantigarse, repanchicharse, apoltronarse
arremangar
arriate
arribismo
arribista
arrobar, embelesar, extasiar
arrollar
arroyuelo
arrullo
arrumar, amontonar, apilar, aglomerar
artefacto
artesa
artilugio
artimaña
asa
ascetismo
asediar, cercar, sitiar
aserrar, serrar
asir
asordar
astil
astracán, astrakán
astringente
astucia
atalaya
atañer, concernir
atarván, atarbán
atenazar
atestar, abarrotar
atípico
atisbar
atontamiento
atosigar
atril, facistol
atronador
atronar
atusar
audacia
auscultar
austeridad
austero
autarquía, autarcía, autosuficiencia
autárquico
autodominio
autógeno
autogiro
aval
avante
avasallar
avefría
avejentado
avejentar, aviejar, envejecer
averno
aviario
avidez
ávido
avistar
axioma
axón
ayuntamiento, cabildo, concejo
azabache
azaleia
azaroso
azogado
azogue
azuzado
azuzar
bache
bacilo
bagatela, baratija, nimiedad
baladí
balbucear, balbucir
balido
ballesta
bamboleante, oscilante, basculante, tambaleante
baquelita
baratear
bárbaro
barbecho
barbitúrico
barniz
barrabás
barraca
barreño, balde, cubo
barricada
barrote
barullo, barahúnda
basilisco
bastidor
batea
bazo
bazofia
beatífico
bélico
beligerante
bellaco
bergantín
bermejo
besugo
bicéfalo
bidón
bienal
bienestar
bies
birlar
birlar
bisutería
bizcocho
bluf, bluff
bobalicón
bobina
bodrio
bodrio
bofe
bofia
boina
bolsón
bonanza
bondiola
borbotón, borbollón
borrasca
botín
bramante
brida
brío
brizna, brinza
bruma
bruñido, reluciente
buche
buche, buchada
buhardilla, boardilla, buharda, mansarda
bujía
bullicio
burlón
buró
butifarra
caballete
cabestrillo
cabestro
cabezada
cabriola
cacerola
cachivache
cal
calamidad
calar
calar
calavera
caldear
caleidoscopio, calidoscopio
calibrador
caliche
calima, calina
calizo, calcáreo, calar
callejuela
camastro
cambiazo
campanario
campanilla
camuflaje
canalla
canon
canto
canturrear, canturriar
canturreo, tarareo
cánula
caoba
capcioso
capitular
carámbano
carambola
carcamal
carcasa
carda
cardamomo
carillón, carrillón
carmesí
carmín
caroteno
carrete
carroña
carroñero
cartesiano
casco
casquete
casta
castañetear, castañear, dentellar
catatónico
catecismo
catre
cáustico
cautela
cauterio
cauterizar
cazo
cazuela
cebar
cecina
celada
celo
cencerro
cenefa
ceñir
cénit, cenit, zenit
centropunto
cepa
cerner, cernir
cerro
cetrino
chabola, chavola, cabaña, barraca, choza
chafarrinada, chafarrinón
chanchullo
chantaje
chaparro, achaparrado, rechoncho
chapulín
chasquido
chaveta, pasador, clavija
chelín
chinchar
chinche
chingar
chirriante
chirriar
chirrido
chisporroteo
chollo, ganga
chorlito
chubasco
ciática
ciático
ciclotimia
ciénaga
cifrar
cimarrón
cimbra
cimbrar, cimbrear
cimbreante
cimiento, cimentación, fundamento
cincel
cinismo
circadiano
circunspección
circunspecto
civeta
cizalla
cizaña
cizañar, encizañar
clamor
clandestino
claqué
claraboya
claveteado
clavija
clérigo, eclesiástico
clero, clerecía
coacción, constreñimiento
coartada
coartar
cobertizo
cochambroso
codicia
coercer
coerción
coetáneo, contemporáneo
cofia
cohesión
colación
colectivismo
colectivizar
coleto
colgante
colicero
colindante
coloide
coloso
colza
comedido
comedimiento
cómoda
compinche
compostura
compungido
conato
concebir
conciliable
conciliar
concordia
concreción
concupiscencia
confite
confrontar
congoja
congruente
conjurar
conmensurable
conminar
conmoción
connotar
consanguinidad, cosanguinidad, consanguineidad
consigna
conspicuo
constipación
continencia
contorsión
contorsionar
contorsionista
contraataque, contraofensiva, contragolpe
contrapunto
controversia
convenir
convoy
convulsión
coracero
coraza
cordel
cordura
corégono
cornucopia
corpulencia
corpulento, corpudo
correlimos
corrillo
corro
corroer
corroído
cotorreo
coyuntura
craso
crédulo
crencha
crescendo
cripta
crisol
cristaloide
cuajar
cubata
cubilete
cuclillas
cucurucho
cuita
cuncuna
cundir
curubito
dádiva
damasco
decimonónico
decoro
decrépito
decrepitud
deductivo
defunción
degüello, degollamiento
dejo
delator
delictivo
delocalización
denegar
dentellar, castañetear
denuedo
derogar
derroche, despilfarro, dispendio
derrotero
desafuero
desamparo
desasir
desazón
desbandada
desbandarse
descansillo, descanso, rellano
descarriar
descifrar
desconcertante
desconcierto
descoyuntar
desdén
desdichado
desenmarañar, desmarañar
desgarbado
desgarbado
desgarrón, rasgón, desgarradura
desidia
desidioso
designio
desliar
deslocalizar
desmañado
desmenuzar
desmesura
desolado
desorbitado
despampanante
despelotar
despelote
desperdigado
despilfarro, dispendio, derroche
desplantar, desarraigar
déspota, tirano
despotismo, tiranía
desquiciar
destello
desuncir
desuso
desvaído
desván
desvencijado
detentar
detrimento
devanar
devengar
diafragma
diametral, diamétrico
diana
diapasón
diástole
diatriba
dictadura, autocracia
dictamen
didáctico
difamar
difundir
digresión
dilapidar
diletante
dingo
dintel
dipsomanía
díscolo
discordia
disensión, disenso
disenso, disentimiento
disentir
disgregar
disipar
dislocación, dislocadura
dislocar
disociar
disparatado
disparatar
disparate
dispendio, derroche, despilfarro
displicencia
disturbio
disuadir
diván
doliente
domiciliación
dornajo, batea
dorsal
dorso
dosier
dubitativo
dulzor
ebonita, vulcanita
eclosionar
ecuánime
ecuanimidad
edema
efigie
efusión, efusividad
elocución
elocuencia
elogio, alabanza
elucubrar, lucubrar, cavilar
emancipar
emanciparse
embastecer
embelesado
embelesar
embelesarse, arrobarse, extasiarse
embellecer
embotar
embrollo
emotivo
empalmar
empalme
empecinarse
empírico
enajenar
enaltecer, ensalzar
encabritar
encabritarse
encarnizamiento
encarnizar
encomendar
encomiable
encomiar
encomio
encrucijada
enema
engatillar
engendrar
enjambre
enmarañar
enmelar, endulzar
enormidad
ensalzar
enseres
ensordecedor
ensueño, ensoñación
entereza
enternecedor
enternecer
entorpecer
entrever
entropía
enzarzar
equívoco
erguir
erial, baldío
erigir
errante
erudición
erudito
esbozar
escabroso
escabullirse
escalinata
escamotear
escandalizar
escaparate
escaramuza
escarcela
escarnio
escarpado
escéptico
escindir
esclerosis
escocer
escogencia, escogimiento
escollo
escolta
escondrijo
escoria
escorzar
escorzo, escorzado
escozor, escocimiento
escrúpulo
escrutinio
esgrima
esguince
eslabonado
eslogan
esnifar
espabilado
espasmo, convulsión
espectro
especulación
especular
especulativo
espetar
espiga
espigado
espionaje
espirar
esplendor
espolear
espray, spray
espuela
espurio, espúreo
esquilmar
esquirla
estaca
estalactita
estalagmita
estancia
estandarte
estatuario
estepa
estera
estertor
estetoscopio
estigma
estigmatizar
estío, verano
estival
estoico
estomatología
estornino
estrafalario
estragón
estrambótico
estratagema
estrato
estrépito
estribillo
estribo
estridente
estropicio
estruendo
estuario
estupefacto, atónito
estupor
etimología
evanescente
evasiva
evocador, evocativo
exaltación
excentricidad
exiguo
expiar
explayar
explayarse
exprimir
expropiar
extirpar
extrañeza
extravagante
extrínseco
facticio
facultad
fajo, haz, atado
falible
fango
fastuoso
feble
fécula
felpa
fermento
fermento
férula
ferviente, fervoroso
fervor, devoción
fetiche, talismán
fetichismo
feúcho
fianza
fiarse
figuración
figurar
figurarse
figurín
filiación
filiar
filigrana
flagrante
flanquear
flojedad, flojera
floreo
fluctuación
focalizar
fofo, bofo
fogonazo
fogosidad
follaje
folletín, folletón
fonógrafo
forajido
forraje
forúnculo, furúnculo
forzudo
fraguar
frailecillo
fraternal
fraternidad
frenesí
frigidez
frígido
friso
fritura
frivolidad
frívolo
fructificar
frugal
fruslería
fugacidad
fugaz
fulgor
furcia
furtivo
galimatías
galopante
gamuza
gánster
garrapatear, garabatear
garrapato, garabato
gavilán
gélido
gerontofília
gesticular
gimotear
giroscopio, giróscopo
glaciar
gladiolo
glaucoma
golondrina
gorgotear, borbotear
gorgoteo
gorjear
gorjear
gorjeo
gorrión
gozada
gozne, charnela, pernio
gradación
gragea, confite
grajo
gramófono
grandilocuencia
grandilocuente
granulado, granuloso, granular
graznido
greña
gres
grillete
guacal, huacal
guadaña, dalla, dalle
guama
guarnecer, guarnecerse
guasca
guatila
guijarro
guineo
hacha
halagüeño, lisonjero
hálito
harapiento
hartazgo, hartazón, hartura
hastial
haz, fajo
hedonismo
hendidura, hendedura
hendir, hender
herejía
hermandad, confraternidad
herrumbre
hervor
heterodoxia
hez
hibernación
hibisco
híbrido
hilaridad
hincar
hipocondría
hipocondriaco
hipodérmico
hiriente
histeria, histerismo
hogaza
hojalata, lata
holgado
hollín, tizne
homeóstasis, homeostasis, homeostasia
homilía
homogeneizar
horda
horma
horquilla
huidizo
huraño
hurtadillas
iconoclasta
idoneidad
idóneo
ignominia
ilación
imbatible
imparcialidad, ecuanimidad
impasible, insensible, indiferente, imperturbable
impavidez, impasibilidad, serenidad, denuedo
imperioso
impersonal
impertérrito, impávido, inconmovible
ímpetu
impostura
imprecar, maldecir, blasfemar, anatematizar
impronta
impudor
impugnar
impunidad
inalienable
inalterable
inanición
inapreciable, inestimable
inaudito
incauto
inconciliable
inconexo
inconmensurable
incontinencia
increpar
íncubo
indemnización
indemnizar
indescifrable
índice
individualizar, individuar
indolente
inductivo
ineflable
inerme
inescrutable
inexorable
inexpugnable
infalible
infame
infamia
inflexión
infligir
infortunio
ingente
inhóspito
ininteligible
iniquidad
inmolar
innato
inocular
inocuo
inquirir
inquisidor
insensato
insidia, asechanza
insignia
insólito
insoslayable
insurgencia, alzamiento, insurrección
inteligible
intempestivo
interpelación
interponer
interventoría
intrínseco
inusitado
iracundia
irisar
irremisible
irresoluto
irrisorio
irrumpir
jactancia, presunción, presuntuosidad
jactancioso
jaleo
jamba
jerarquía
jersey
jirón
juanete
junquillo
labrar
lacayo
lacre
lacrimoso, lacrimógeno, lagrimoso
lama
lamprea
larguirucho
lavabo
laxitud
lecho
leonino
lesivo
letargo, aletargamiento
leudado
leudante, levadura
leudar
leudar
leva
liar
libelo
licitación
licitar
ligamento
lignificar
linde, confín, lindero
linotipia
líquene
lisonja, adulación, zalamería
lisonjear, adular
lisonjero, adulador, zalamero
lisura
litera
lívido
lobotomía
lóbrego
locuaz
lodazal, lodazar
lona
longevidad
longevo
lozanía
lozano
lucio
lugareño
lujuria
lupanar
luxación
mácula
macular
madeja
magnetofónico
magnetófono, magnetofón
magullado
magulladura, contusión, magullamiento
majadero
malabar
maleable
maltrecho
malva
mameluco, mono
mamerto
mamotreto
mancillado
mandrágora
mangostino
manida
maniobra
maniqueísmo
manopla
mansarda
maquinaria
maquinismo
marañón
marfil
marisma
marmota
marquesina
marroquinería
mástil
mastodonte
matarratas, raticida
matiz
mausoleo
máxime
megalito
melao
melaza
mella
mellar
menaje
mendrugo
menoscabar
ménsula, repisa, estante
menudo
mercader
merced
merengue
meretriz
meridión
meridional
metafísica
metalurgia
metedura
mezquindad
mezquino
mielina
mies
mimetizarse
minuta
misoginia
misticismo
mitin, mitín
mitomanía
mitón
mohín
mondadura, monda, peladura
mondar
monigote
monocorde
monserga
montículo
morfina
moribundo
mortecino
mortífero, letal
mosaico
moteado
motín
mugir
mujerona
mujeruca
muñón
muselina
mustio
mutabilidad
mutilar
navaja
negentropía
negligencia
negligente
negrura
neolítico
nepotismo
nexo
nigromancia
nimiedad
nimio
ninfomanía
nívea
obcecación
oblicuo
oblongo
obnubilar
ocaso
ocre
oligarquía
olisquear
olleta
olmo
omiso
onírico
opio
opioide, opiáceo
oprobio
órbita
orellana
orfebre
orfebrería
orgiástico
orondo
ortiga
ortodoxia
orzuelo
osamenta, osatura
otear
otomana, otomano
ovación
ovacionar
ovillo
pajarilla
palimpsesto
palmario,	palpable
palmo
palpable
pampa
pamplina
pancarta
panegírico
panocha
panteón
papanatas, papamoscas, paparote
parapetar
parapetearse
parapeto
pardusco
parecer
parentela
paria
paripé
parlar
parloteo, charloteo
paroxismo
parsimonia
particularizar
partida
pasadizo
pasante
pasantía
pasible
pasmado
paspartú
pastoso
patalear
patente
pateta
pátina
patógeno
paulatino
pavonear
pavoroso
pecíolo, rabillo, cabillo, pezón
pelandusca, pelandrusca
pelele
penacho
penuria
percance
percha, colgador
percutor, percusor
perecer
pérfido
periférico
periplo
perito
perlado, perlino
perlita
perno
perorata
perpetuar
pertinaz
pestillo
petimetre
petirrojo
pétreo
petulancia
petulante
piar
piastra
pigmento
pigmento
pilote
pira
pitón
pizarra
pizarrín
plañidera
plasmar
platija
plausible
plebeyo
plomo
plumín
polémica, controversia
polemista
polemizar
policroma
pompa
popa
porfiado
porquería
porra
porrazo, porrada, garrotazo
portillo
postigo
postizo
postular
póstumo
preámbulo
precepto
preliminar
preludio
premonitorio
prensa
preponderancia
presbicia
prescindir
presidiario, convicto, recluso
prestigio
presumible
presuntuoso
presuponer
pretensión
pretérito
pretina
prieto
primitivo
primordial
prismático
proa
proclive, propenso
procrear
pródigamente
pródigo
proeza
profilaxis
proletario
promiscuidad
prontuario
propaganda
prorratear, distribuir, repartir, cuotear
prosaico
proscrito, proscripto
proseguir
prostituir
proverbio, adagio, refrán
provincia
provisorio, provisional
psicosis
psique, psiquis
psíquico
pudor
pueril
pugna
puja
pulimentar
pulular
punible
purga
puritanismo
purulento
quejumbroso
quemarropa
querubín
quicio
quilla
quinina, quina
quiste
quiste
quórum, cuórum
rabillo
ralentizar, enlentecer, lentificar
ramequín
ramillete
rape
rapé
rapto
raquídeo
raquis
rastra
rastrojera
rastrojo, rastrojal
ratificar
ratificar
ratonil
reaccionario
reacio
reata
rebajar
rebasar
rebatir
reblandecer
recatado
recaudo
recesión
rechinar
redoble
refunfuñar, gruñir, rezongar
regata
regatear, recatear, baratear
regateo
regimentar
regimiento
rehuir
reivindicar
relegar
remilgo
remisible
remisión
remitir
remolcar
remolque
rémora
renegar
renquear, renguear, cojear
renuevo, vástago, brote, yema, retoño
repertorio
represalia
resabiado
resabio
resalto, resalte
resolana
resollar
respingar
respingo
resquebrajar, agrietar, cuartear
retaguardia
reticencia
retintín, tintineo
retráctil
reverberación
reverberar
revolotear
rezumar
rictus, gesto, mueca
rigidez
risco
rivalidad
roedor
roer
rompiente
roñoso
rufián, granuja
rufianesco
ruinoso
rumiante
sabotaje
sacarina
sacro
saeta
salva
salvaguardar
sándalo
sanguíneo
sardónice, sardónica
sarmentoso
sarmiento
sarta
saturar
secundar
secundar
sedición, sublevación
sedicioso
segar
semblante
semblanza
senil
senilidad
sepelio
septentrión
septentrional
serafín
serendipia
serendípico
serigrafía
serrín, aserrín, serraduras
sesgar
sesgo
sesudo
seudónimo, pseudónimo
siamés
sien
sigilo
sílex, pedernal
simiesco
símil
sindical
sindicato
síndico
sisear
sistemático
sístole
sobaquina
soberbia
sobrecoger
sobredimensionar
sobresalto
socavar
socavón
sodomía
sofisma
solapado
solapar
solaz
solazar
solemne
soliloquio, monólogo
solipsismo
sollozar
sollozo
somier
sonambulismo
sonsonete, soniquete, retintín
sórdido
sosiego
soslayar
subasta
subastar
súbdito
súbito, repentino
sublevación, alzamiento, insurgencia, insurreción
sublimación
sublimado
sublime
sublunar
subsanar
subsidiario
suburbio
subyacente
subyacer
súcubo
sucumbir
sujeción
supeditar
superfluo
superlativo
superponer, sobreponer
supurar
suscitar
suspicaz
sutil
sutileza
tabique
tablón
taburete
taimado
talismán, amuleto, fetiche
tampografía
tapadera
tapia
tapiz
tararear, tatarear, canturrear
tasación
tasar
tebeo
tejar
tejemaneje
tejón
telar
tenue
tergiversar
termistor
terraplén
terrera
terrina, tarrina
tétrico
tibieza
timar
timo
timorato, pacato
tímpano
tiña
tintín
tintinar, tintinear, chingar
tintineo, tintín
tirachinas, tiragomas, tirador
tiro
tiznar
toca
tocado
toldado
toldo
tontina
tornasolado
tórrido
tortuoso, sinuoso
torva
tosco
tozudez
tozudo
trabar
trabazón
tragaluz
tralla
trallazo, latigazo
tramoya
trance
transigir
transmutar
transponer, trasponer
transversal
trasegar
traslúcido
traspasar
traspié, traspiés
trastienda
trasvasar, transvasar
través
travesaño
trémulo
trienal
trinar
trinquete
triza
trocar
troncho
troquel
trova
truhan
tumbo
tumulto
tungsteno, wolframio, volframio
tupido
tupido
turba
turbar
úlcera
ultranza
ulular, aullar
umbral
umbrío, umbroso
uncir
urbanita
vacilante
vacilar
vago
vaguedad
vaho
vaivén
valkiria
vanguardia
variegado
vasallo
vasija
vástago
váter, inodoro, retrete, urinario
vedar
vehemencia
vehemente
veintena
veleidoso
veleta
vendimia
ventisca
ventral
verbena
verborrea, verborragia, verbosidad
verdín
verja, rejado
versado
vestíbulo
vestigio
veta
vetar
veteado
veteado, vetado
veto
vicario
vicisitud
vientre, barriga
vigilia
vilipendiar, vilificar
vilo
viñeta
violáceo
viscoso
visera
visillo
vítor
vitorear
vitriolo
vituperable
vituperar
vituperio
vociferar
volátil
voltaico
yacer
yelmo, celada
yema
yermo
yerno
yesca
yugo
yunta
yute
yuxtaponer
zafio
zalamería, lisonja
zalamero
zancadilla
zanja
zape
zarpa, garra
zarpazo
zarzo
zócalo
zueco
zumbido
`,Pc=nt({__name:"HomeView",setup(e){const n=yr(Rc.split(`
`));return(t,r)=>(Bn(),Vn("main",null,[Pe("ul",null,[(Bn(!0),Vn(Se,null,Qs(n.value,(o,i)=>(Bn(),Vn("li",{key:i},dr(o),1))),128))])]))}}),Cc=pc({history:Ul("/lexicon/vue/dist/"),routes:[{path:"/",name:"home",component:Pc},{path:"/about",name:"about",component:()=>Sc(()=>import("./AboutView-D9YhIWyE.js"),__vite__mapDeps([0,1]))}]}),jr=al(xc);jr.use(dl());jr.use(Cc);jr.mount("#app");export{ki as _,Pe as a,Vn as c,Bn as o};
