import{g as p,p as V,h as v,af as _,M as s,D as g,E as k,aV as C,K as h,ar as x,am as y,at as G,_ as I,X as i,U as a,S,Q as P,Z as b,av as B,bV as T,a8 as w,a6 as D}from"./index-DCTA5BSV.js";import{V as E}from"./VContainer-DCYKGdi1.js";import{V as F,a as M}from"./VRow-5eXdQqNh.js";const f=Symbol.for("vuetify:v-item-group"),N=V({...h(),...C({selectedClass:"v-item--selected"}),...k(),...g()},"VItemGroup"),K=p()({name:"VItemGroup",props:N(),emits:{"update:modelValue":e=>!0},setup(e,u){let{slots:t}=u;const{themeClasses:l}=v(e),{isSelected:o,select:c,next:n,prev:m,selected:d}=_(e,f);return()=>s(e.tag,{class:["v-item-group",l.value,e.class],style:e.style},{default:()=>{var r;return[(r=t.default)==null?void 0:r.call(t,{isSelected:o,select:c,next:n,prev:m,selected:d.value})]}})}}),L=p()({name:"VItem",props:x(),emits:{"group:selected":e=>!0},setup(e,u){let{slots:t}=u;const{isSelected:l,select:o,toggle:c,selectedClass:n,value:m,disabled:d}=y(e,f);return()=>{var r;return(r=t.default)==null?void 0:r.call(t,{isSelected:l.value,selectedClass:n.value,select:o,toggle:c,value:m.value,disabled:d.value})}}}),Q={},R={class:"text-h3 flex-grow-1 text-center"};function U(e,u){return i(),I(K,{multiple:""},{default:a(()=>[s(E,null,{default:a(()=>[s(F,null,{default:a(()=>[(i(),S(P,null,b(3,t=>s(M,{key:t,cols:"12",md:"4"},{default:a(()=>[s(L,null,{default:a(({isSelected:l,toggle:o})=>[s(B,{color:l?"primary":"",class:"d-flex align-center",height:"200",dark:"",onClick:o},{default:a(()=>[s(T,null,{default:a(()=>[w("div",R,D(l?"Selected":"Click Me!"),1)]),_:2},1024)]),_:2},1032,["color","onClick"])]),_:1})]),_:2},1024)),64))]),_:1})]),_:1})]),_:1})}const j=G(Q,[["render",U]]);export{j as default};
