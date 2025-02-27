import{s as V,c as g,a as ie,o as te,w as R,b as ae,C as re,u as Y,d as se,e as ce,g as ve,p as de,f as me,h as fe,i as he,j as q,t as Z,k as ge,l as ye,m as we,n as be,q as pe,r as ke,v as Se,x as Ee,y as xe,z as Te,A as _e,B as Me,D as Pe,E as Ve,F as Be,G as Ce,H as De,I as Re,J as Le,K as He,L as Ie,M as y,N as j,O as Ye,V as Ne,P as We,T as Oe,Q as O,R as Xe,S as G,U as I,W as ze,X as N,Y as W,Z as $e,_ as Ae}from"./index-DCTA5BSV.js";import{u as Fe}from"./ssrBoot-CmcddJss.js";import{V as Ue}from"./VMain-CkDWmQbP.js";import{V as J,a as K}from"./VList-I4hasx3r.js";import{V as qe}from"./VDivider-Bz54YqAU.js";function Ze(e){let{rootEl:s,isSticky:u,layoutItemStyles:x}=e;const t=V(!1),i=V(0),a=g(()=>{const p=typeof t.value=="boolean"?"top":t.value;return[u.value?{top:"auto",bottom:"auto",height:void 0}:void 0,t.value?{[p]:ie(i.value)}:{top:x.value.top}]});te(()=>{R(u,p=>{p?window.addEventListener("scroll",E,{passive:!0}):window.removeEventListener("scroll",E)},{immediate:!0})}),ae(()=>{window.removeEventListener("scroll",E)});let w=0;function E(){const p=w>window.scrollY?"up":"down",v=s.value.getBoundingClientRect(),d=parseFloat(x.value.top??0),c=window.scrollY-Math.max(0,i.value-d),f=v.height+Math.max(i.value,d)-window.scrollY-window.innerHeight,b=parseFloat(getComputedStyle(s.value).getPropertyValue("--v-body-scroll-y"))||0;v.height<window.innerHeight-d?(t.value="top",i.value=d):p==="up"&&t.value==="bottom"||p==="down"&&t.value==="top"?(i.value=window.scrollY+v.top-b,t.value=!0):p==="down"&&f<=0?(i.value=0,t.value="bottom"):p==="up"&&c<=0&&(b?t.value!=="top"&&(i.value=-c+b+d,t.value="top"):(i.value=v.top+c,t.value="top")),w=window.scrollY}return{isStuck:t,stickyStyles:a}}const je=100,Ge=20;function Q(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function ee(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let s=0;for(let u=e.length-1;u>0;u--){if(e[u].t===e[u-1].t)continue;const x=Q(s),t=(e[u].d-e[u-1].d)/(e[u].t-e[u-1].t);s+=(t-x)*Math.abs(t),u===e.length-1&&(s*=.5)}return Q(s)*1e3}function Je(){const e={};function s(t){Array.from(t.changedTouches).forEach(i=>{(e[i.identifier]??(e[i.identifier]=new re(Ge))).push([t.timeStamp,i])})}function u(t){Array.from(t.changedTouches).forEach(i=>{delete e[i.identifier]})}function x(t){var p;const i=(p=e[t])==null?void 0:p.values().reverse();if(!i)throw new Error(`No samples for touch id ${t}`);const a=i[0],w=[],E=[];for(const v of i){if(a[0]-v[0]>je)break;w.push({t:v[0],d:v[1].clientX}),E.push({t:v[0],d:v[1].clientY})}return{x:ee(w),y:ee(E),get direction(){const{x:v,y:d}=this,[c,f]=[Math.abs(v),Math.abs(d)];return c>f&&v>=0?"right":c>f&&v<=0?"left":f>c&&d>=0?"down":f>c&&d<=0?"up":Ke()}}}return{addMovement:s,endTouch:u,getVelocity:x}}function Ke(){throw new Error}function Qe(e){let{el:s,isActive:u,isTemporary:x,width:t,touchless:i,position:a}=e;te(()=>{window.addEventListener("touchstart",_,{passive:!0}),window.addEventListener("touchmove",T,{passive:!1}),window.addEventListener("touchend",L,{passive:!0})}),ae(()=>{window.removeEventListener("touchstart",_),window.removeEventListener("touchmove",T),window.removeEventListener("touchend",L)});const w=g(()=>["left","right"].includes(a.value)),{addMovement:E,endTouch:p,getVelocity:v}=Je();let d=!1;const c=V(!1),f=V(0),b=V(0);let S;function B(n,o){return(a.value==="left"?n:a.value==="right"?document.documentElement.clientWidth-n:a.value==="top"?n:a.value==="bottom"?document.documentElement.clientHeight-n:P())-(o?t.value:0)}function C(n){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const l=a.value==="left"?(n-b.value)/t.value:a.value==="right"?(document.documentElement.clientWidth-n-b.value)/t.value:a.value==="top"?(n-b.value)/t.value:a.value==="bottom"?(document.documentElement.clientHeight-n-b.value)/t.value:P();return o?Math.max(0,Math.min(1,l)):l}function _(n){if(i.value)return;const o=n.changedTouches[0].clientX,l=n.changedTouches[0].clientY,r=25,h=a.value==="left"?o<r:a.value==="right"?o>document.documentElement.clientWidth-r:a.value==="top"?l<r:a.value==="bottom"?l>document.documentElement.clientHeight-r:P(),m=u.value&&(a.value==="left"?o<t.value:a.value==="right"?o>document.documentElement.clientWidth-t.value:a.value==="top"?l<t.value:a.value==="bottom"?l>document.documentElement.clientHeight-t.value:P());(h||m||u.value&&x.value)&&(S=[o,l],b.value=B(w.value?o:l,u.value),f.value=C(w.value?o:l),d=b.value>-20&&b.value<80,p(n),E(n))}function T(n){const o=n.changedTouches[0].clientX,l=n.changedTouches[0].clientY;if(d){if(!n.cancelable){d=!1;return}const h=Math.abs(o-S[0]),m=Math.abs(l-S[1]);(w.value?h>m&&h>3:m>h&&m>3)?(c.value=!0,d=!1):(w.value?m:h)>3&&(d=!1)}if(!c.value)return;n.preventDefault(),E(n);const r=C(w.value?o:l,!1);f.value=Math.max(0,Math.min(1,r)),r>1?b.value=B(w.value?o:l,!0):r<0&&(b.value=B(w.value?o:l,!1))}function L(n){if(d=!1,!c.value)return;E(n),c.value=!1;const o=v(n.changedTouches[0].identifier),l=Math.abs(o.x),r=Math.abs(o.y);(w.value?l>r&&l>400:r>l&&r>3)?u.value=o.direction===({left:"right",right:"left",top:"down",bottom:"up"}[a.value]||P()):u.value=f.value>.5}const D=g(()=>c.value?{transform:a.value==="left"?`translateX(calc(-100% + ${f.value*t.value}px))`:a.value==="right"?`translateX(calc(100% - ${f.value*t.value}px))`:a.value==="top"?`translateY(calc(-100% + ${f.value*t.value}px))`:a.value==="bottom"?`translateY(calc(100% - ${f.value*t.value}px))`:P(),transition:"none"}:void 0);return Y(c,()=>{var l,r;const n=((l=s.value)==null?void 0:l.style.transform)??null,o=((r=s.value)==null?void 0:r.style.transition)??null;se(()=>{var h,m,M,H;(m=s.value)==null||m.style.setProperty("transform",((h=D.value)==null?void 0:h.transform)||"none"),(H=s.value)==null||H.style.setProperty("transition",((M=D.value)==null?void 0:M.transition)||null)}),ce(()=>{var h,m;(h=s.value)==null||h.style.setProperty("transform",n),(m=s.value)==null||m.style.setProperty("transition",o)})}),{isDragging:c,dragProgress:f,dragStyles:D}}function P(){throw new Error}const et=["start","end","left","right","top","bottom"],tt=de({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,persistent:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>et.includes(e)},sticky:Boolean,...Ie(),...He(),...Le(),...Re({mobile:null}),...De(),...Ce(),...Be(),...Ve({tag:"nav"}),...Pe()},"VNavigationDrawer"),at=ve()({name:"VNavigationDrawer",props:tt(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,s){let{attrs:u,emit:x,slots:t}=s;const{isRtl:i}=me(),{themeClasses:a}=fe(e),{borderClasses:w}=he(e),{backgroundColorClasses:E,backgroundColorStyles:p}=q(Z(e,"color")),{elevationClasses:v}=ge(e),{displayClasses:d,mobile:c}=ye(e),{roundedClasses:f}=we(e),b=be(),S=pe(e,"modelValue",null,k=>!!k),{ssrBootStyles:B}=Fe(),{scopeId:C}=ke(),_=Se(),T=V(!1),{runOpenDelay:L,runCloseDelay:D}=Ye(e,k=>{T.value=k}),n=g(()=>e.rail&&e.expandOnHover&&T.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),o=g(()=>Ee(e.location,i.value)),l=g(()=>e.persistent),r=g(()=>!e.permanent&&(c.value||e.temporary)),h=g(()=>e.sticky&&!r.value&&o.value!=="bottom");Y(()=>e.expandOnHover&&e.rail!=null,()=>{R(T,k=>x("update:rail",!k))}),Y(()=>!e.disableResizeWatcher,()=>{R(r,k=>!e.permanent&&xe(()=>S.value=!k))}),Y(()=>!e.disableRouteWatcher&&!!b,()=>{R(b.currentRoute,()=>r.value&&(S.value=!1))}),R(()=>e.permanent,k=>{k&&(S.value=!0)}),e.modelValue==null&&!r.value&&(S.value=e.permanent||!c.value);const{isDragging:m,dragProgress:M}=Qe({el:_,isActive:S,isTemporary:r,width:n,touchless:Z(e,"touchless"),position:o}),H=g(()=>{const k=r.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):n.value;return m.value?k*M.value:k}),ne=g(()=>["top","bottom"].includes(e.location)?0:n.value),{layoutItemStyles:X,layoutItemScrimStyles:oe}=Te({id:e.name,order:g(()=>parseInt(e.order,10)),position:o,layoutSize:H,elementSize:ne,active:g(()=>S.value||m.value),disableTransitions:g(()=>m.value),absolute:g(()=>e.absolute||h.value&&typeof z.value!="string")}),{isStuck:z,stickyStyles:le}=Ze({rootEl:_,isSticky:h,layoutItemStyles:X}),$=q(g(()=>typeof e.scrim=="string"?e.scrim:null)),ue=g(()=>({...m.value?{opacity:M.value*.2,transition:"none"}:void 0,...oe.value}));return _e({VList:{bgColor:"transparent"}}),Me(()=>{const k=t.image||e.image;return y(O,null,[y(e.tag,j({ref:_,onMouseenter:L,onMouseleave:D,class:["v-navigation-drawer",`v-navigation-drawer--${o.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":T.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":r.value,"v-navigation-drawer--persistent":l.value,"v-navigation-drawer--active":S.value,"v-navigation-drawer--sticky":h.value},a.value,E.value,w.value,d.value,v.value,f.value,e.class],style:[p.value,X.value,B.value,le.value,e.style,["top","bottom"].includes(o.value)?{height:"auto"}:{}]},C,u),{default:()=>{var A,F,U;return[k&&y("div",{key:"image",class:"v-navigation-drawer__img"},[t.image?y(We,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{alt:"",cover:!0,height:"inherit",src:e.image}}},t.image):y(Ne,{key:"image-img",alt:"",cover:!0,height:"inherit",src:e.image},null)]),t.prepend&&y("div",{class:"v-navigation-drawer__prepend"},[(A=t.prepend)==null?void 0:A.call(t)]),y("div",{class:"v-navigation-drawer__content"},[(F=t.default)==null?void 0:F.call(t)]),t.append&&y("div",{class:"v-navigation-drawer__append"},[(U=t.append)==null?void 0:U.call(t)])]}}),y(Oe,{name:"fade-transition"},{default:()=>[r.value&&(m.value||S.value)&&!!e.scrim&&y("div",j({class:["v-navigation-drawer__scrim",$.backgroundColorClasses.value],style:[ue.value,$.backgroundColorStyles.value],onClick:()=>{l.value||(S.value=!1)}},C),null)]})])}),{isStuck:z}}}),nt=""+new URL("computer_programming_man-C4hPBDaP.png",import.meta.url).href,st={__name:"admin",setup(e){const s=Xe(),u=g(()=>[{to:"/admin/Foods",text:"食物管理",icon:"mdi-food-drumstick"},{to:"/",text:"首頁",icon:"mdi-home"}]);return(x,t)=>{const i=ze("router-view");return N(),G(O,null,[y(at,{permanent:""},{default:I(()=>[y(J,null,{default:I(()=>[y(K,{"prepend-avatar":W(s).avatar||W(nt),title:W(s).account},null,8,["prepend-avatar","title"])]),_:1}),y(qe),y(J,null,{default:I(()=>[(N(!0),G(O,null,$e(u.value,a=>(N(),Ae(K,{key:a.to,"prepend-icon":a.icon,title:a.text,to:a.to},null,8,["prepend-icon","title","to"]))),128))]),_:1})]),_:1}),y(Ue,null,{default:I(()=>[y(i)]),_:1})],64)}}};export{st as default};
