import{a1 as F,aF as M,a9 as S,_ as B,X as U,U as l,M as o,a8 as f,aB as _,Y as a,au as t,a3 as q,a4 as A}from"./index-DCTA5BSV.js";import{c as N,a as u,e as $,u as E,d as n}from"./index.esm-DFDxVlUm.js";import{v}from"./index-DB8TQmCC.js";import{b}from"./route-block-B_A1xBdJ.js";import{V as P,a as x}from"./VRow-5eXdQqNh.js";import{V as R}from"./VDivider-Bz54YqAU.js";import{V as T}from"./VForm-CtHOijN8.js";import{V as D}from"./VContainer-DCYKGdi1.js";const O={class:"text-center"},X={__name:"register",setup(Y){const{api:w}=S(),c=F(),h=M(),k=N({account:u().required("使用者帳號必填").min(4,"使用者帳號太短").max(20,"使用者帳號太長").test("isAlphanumeric","帳號格式不符",r=>v.isAlphanumeric(r)),email:u().required("使用者信箱必填").test("isEmail","使用者信箱格式不符",r=>v.isEmail(r)),password:u().required("使用者密碼必填").min(4,"使用者密碼太短").max(20,"使用者密碼太長"),passwordConfirm:u().oneOf([$("password")],"密碼不符")}),{handleSubmit:y,isSubmitting:g}=E({validationSchema:k}),m=n("account"),i=n("email"),d=n("password"),p=n("passwordConfirm"),C=y(async r=>{var e,s;try{await w.post("/user",{account:r.account,email:r.email,password:r.password}),c({text:"註冊成功",snackbarProps:{color:"green"}}),h.push("/login")}catch(V){console.log(V),c({text:((s=(e=V.response)==null?void 0:e.data)==null?void 0:s.message)||"未知錯誤",snackbarProps:{color:"red"}})}});return(r,e)=>(U(),B(D,{"max-width":"1600"},{default:l(()=>[o(P,null,{default:l(()=>[o(x,{cols:"12"},{default:l(()=>e[4]||(e[4]=[f("h1",{class:"text-center"},"註冊",-1)])),_:1}),o(R),o(x,{cols:"6",class:"mx-auto"},{default:l(()=>[o(T,{disabled:a(g),onSubmit:_(a(C),["prevent"])},{default:l(()=>[o(t,{modelValue:a(m).value.value,"onUpdate:modelValue":e[0]||(e[0]=s=>a(m).value.value=s),"error-messages":a(m).errorMessage.value,label:"帳號",minlength:"4",maxlength:"20",counter:""},null,8,["modelValue","error-messages"]),o(t,{modelValue:a(i).value.value,"onUpdate:modelValue":e[1]||(e[1]=s=>a(i).value.value=s),"error-messages":a(i).errorMessage.value,label:"信箱"},null,8,["modelValue","error-messages"]),o(t,{modelValue:a(d).value.value,"onUpdate:modelValue":e[2]||(e[2]=s=>a(d).value.value=s),type:"password","error-messages":a(d).errorMessage.value,label:"密碼",minlength:"4",maxlength:"20",counter:""},null,8,["modelValue","error-messages"]),o(t,{modelValue:a(p).value.value,"onUpdate:modelValue":e[3]||(e[3]=s=>a(p).value.value=s),type:"password","error-messages":a(p).errorMessage.value,label:"確認密碼",minlength:"4",maxlength:"20",counter:""},null,8,["modelValue","error-messages"]),f("div",O,[o(q,{loading:a(g),type:"submit",color:"#495F41"},{default:l(()=>e[5]||(e[5]=[A("建立帳號")])),_:1},8,["loading"])])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};typeof b=="function"&&b(X);export{X as default};
