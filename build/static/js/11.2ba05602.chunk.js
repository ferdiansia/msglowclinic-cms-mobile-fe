(this["webpackJsonpmsclinic-mobile-cms-fe"]=this["webpackJsonpmsclinic-mobile-cms-fe"]||[]).push([[11],{448:function(e,t,n){"use strict";var c=n(553),r=n(11),a=n(359),i=n(2),o=Object(r.a)(a.a)((function(e){var t=e.theme;return"\n        padding: ".concat(t.spacing(4,0),";\n")}));t.a=function(e){var t=e.children;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(o,{children:Object(i.jsx)(c.a,{maxWidth:"lg",children:t})})})}},704:function(e,t,n){},725:function(e,t,n){"use strict";n.r(t);var c=n(16),r=n(23),a=n(553),i=n(730),o=n(142),l=n(448),s=n(54),u=n(706),j=n(432),b=n(0),d=n.n(b),m=n(2);function O(e){return Object(m.jsx)(u.a,{container:!0,justifyContent:"space-between",alignItems:"center",children:Object(m.jsx)(u.a,{item:!0,children:Object(m.jsx)(j.a,{variant:"h3",component:"h3",gutterBottom:!0,children:"About Us Form"})})})}var f=d.a.memo(O),h=n(68),p=n(164),x=n(22),v=n(480),g=n(438),w=n(721),y=n(705),C=n(452),S=n(14),k=n(513),T=n(701),F=n(702),N=n.n(F),V=(n(703),n(704),n(149)),A=n(11),U=["className","color","children"],E=Object(A.a)("span")((function(e){var t=e.theme;return"\n      \n      &.MuiText {\n\n        &-black {\n          color: ".concat(t.palette.common.black,"\n        }\n\n        &-primary {\n          color: ").concat(t.palette.primary.main,"\n        }\n        \n        &-secondary {\n          color: ").concat(t.palette.secondary.main,"\n        }\n        \n        &-success {\n          color: ").concat(t.palette.success.main,"\n        }\n        \n        &-warning {\n          color: ").concat(t.palette.warning.main,"\n        }\n              \n        &-error {\n          color: ").concat(t.palette.error.main,"\n        }\n        \n        &-info {\n          color: ").concat(t.palette.info.main,"\n        }\n      }\n")})),W=function(e){e.className;var t=e.color,n=void 0===t?"secondary":t,c=e.children,r=Object(V.a)(e,U);return Object(m.jsx)(E,Object(x.a)(Object(x.a)({className:"MuiText-"+n},r),{},{children:c}))},q=function(e){var t=Object(b.useState)(k.EditorState.createWithContent(k.ContentState.createFromBlockArray(Object(k.convertFromHTML)(e.defaultValue)))),n=Object(S.a)(t,2),c=n[0],r=n[1];return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(W,{children:e.label}),Object(m.jsx)(C.a,{name:e.name,control:e.control,defaultValue:e.defaultValue||"",render:function(e){var t=e.field;return Object(m.jsx)("div",{className:"editor",children:Object(m.jsx)(T.Editor,{editorState:c,wrapperClassName:"wrapper-class",editorClassName:"editor-class",onEditorStateChange:function(e){return function(e,t){return r(e),t(N()(Object(k.convertToRaw)(e.getCurrentContent())))}(e,t.onChange)}})})}})]})},M=d.a.memo(q),B=n(479),J=Object(B.b)({title:Object(B.c)().required("Title wajib diisi"),content:Object(B.c)().required("About Us wajib diisi")}).required(),D=function(e){var t=Object(s.c)((function(e){return e.aboutUs})).loading,n=Object(x.a)({id:null,title:"",content:""},e.data),c=Object(C.e)({resolver:Object(v.a)(J),defaultValues:n}),r=c.control,a=c.handleSubmit,i=c.formState.errors;return Object(m.jsxs)("form",{id:"about-us-form",onSubmit:a((function(t){return e.onSubmit(t)})),autoComplete:"off",children:[Object(m.jsx)(y.a,{mt:3,children:Object(m.jsx)(C.a,{name:"title",control:r,defaultValue:"",render:function(e){var t,n=e.field;return Object(m.jsx)(w.a,Object(x.a)(Object(x.a)({},n),{},{type:"text",placeholder:"Title",label:"Title",fullWidth:!0,error:!(null===i||void 0===i||!i.title),helperText:null===(t=i.title)||void 0===t?void 0:t.message}))}})}),Object(m.jsx)(y.a,{mt:3,children:Object(m.jsx)(M,{label:"Content",defaultValue:e.data.content,name:"content",control:r})}),Object(m.jsx)(y.a,{sx:{pt:3,textAlign:"right"},children:Object(m.jsx)(g.a,{disabled:!!t,loading:!!t,type:"submit",variant:"contained",sx:{width:100},children:"Simpan"})})]})},H=Object(b.memo)(D),I=n(21);t.default=function(e){var t=Object(s.b)(),n=Object(s.c)((function(e){return e.aboutUs})).data,u=Object(h.d)(),j=function(){var e=Object(r.a)(Object(c.a)().mark((function e(){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(Object(p.b)({type:"collection"}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(b.useEffect)((function(){j()}),[]);var d=Object(b.useCallback)(function(){var e=Object(r.a)(Object(c.a)().mark((function e(n){var r;return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.render_type="html",e.prev=1,e.next=4,t(Object(p.c)(n));case 4:r=e.sent,Object(I.e)(r)&&u.show("Data berhasil tersimpan"),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),u.show(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(o.a,{children:Object(m.jsx)("title",{children:"About Us"})}),Object(m.jsx)(l.a,{children:Object(m.jsx)(f,{})}),Object(m.jsx)(a.a,{maxWidth:"lg",children:Object(m.jsx)(i.a,{sx:{py:3,px:2},children:n&&Object(m.jsx)(H,{onSubmit:d,data:n})})})]})}}}]);
//# sourceMappingURL=11.2ba05602.chunk.js.map