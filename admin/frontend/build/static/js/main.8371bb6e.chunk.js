(this["webpackJsonpraningu-developer"]=this["webpackJsonpraningu-developer"]||[]).push([[0],{189:function(e,t,n){},192:function(e,t){},226:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(33),i=n.n(r),s=(n(189),n(44)),o=n.n(s),l=n(61),j=n(15),d=n(57),b=(n(191),n(132)),x=(d.a.initializeApp({apiKey:"AIzaSyCzPc5yTwV7kwRWrQUqyGJjldP-AB-K9-Y",authDomain:"websitename-csc361.firebaseapp.com",projectId:"websitename-csc361",storageBucket:"websitename-csc361.appspot.com",messagingSenderId:"263414724563",appId:"1:263414724563:web:d74750a3c5ab43f2e46126",measurementId:"G-2MBXH53V8D"}),d.a.auth()),h=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:d.a.auth().onAuthStateChanged(function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://raningu-api.glitch.me/data/auth/admin_login",{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){return"success"===e.result?(console.log("admin"),sessionStorage.setItem("token",b.AES.encrypt(JSON.stringify({user:t,level:"admin"}),"raningu@7712219").toString()),window.location.reload()):"access"===e.detail?(console.log("normal"),sessionStorage.setItem("token",b.AES.encrypt(JSON.stringify({user:t,level:"normal"}),"raningu@7712219").toString()),window.location.reload()):(sessionStorage.removeItem("token"),window.location.reload())}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=new d.a.auth.GoogleAuthProvider;u.setCustomParameters({prompt:"select_account"});var O=new d.a.auth.FacebookAuthProvider;O.setCustomParameters({prompt:"select_account"});var m=new d.a.auth.GithubAuthProvider;m.setCustomParameters({prompt:"select_account"});var p=function(){return x.signInWithPopup(u)},g=function(){return x.signInWithPopup(O)},f=function(){return x.signInWithPopup(m)},y=n(18),v=n(290),w=n(327),S=n(292),C=n(298),k=n(317),D=n(300),I=n(301),P=n(150),A=n.n(P),E=n(151),R=n.n(E),U=n(148),N=n.n(U),T=n(302),W=n(118),B=n.n(W),F=n(38),L=n(297),_=n(323),z=n(154),G=n(322),J=n(299),M=n(117),q=n.n(M),V=n(2),H=Object(v.a)((function(e){return{title:{flexGrow:1}}})),K=function(e){var t=e.session,n=a.a.useState(null),c=Object(j.a)(n,2),r=c[0],i=c[1],s=Boolean(r),o=function(){i(null)},l=H();return Object(V.jsx)(w.a,{position:"static",children:Object(V.jsxs)(S.a,{children:[Object(V.jsxs)(z.a,{id:"basic-menu",anchorEl:r,open:s,onClose:o,MenuListProps:{"aria-labelledby":"basic-button"},children:[t.user&&Object(V.jsxs)(L.a,{sx:{px:2,py:1},children:[Object(V.jsx)(C.a,{children:t.user.displayName}),Object(V.jsx)(C.a,{style:{color:"gray"},children:"admin"===t.level?"Administrator":"User"})]}),"admin"===t.level&&Object(V.jsx)(F.b,{to:"/edit_profile",style:{textDecoration:"none",color:"black"},children:Object(V.jsxs)(G.a,{onClick:function(){o()},children:[Object(V.jsx)(J.a,{children:Object(V.jsx)(q.a,{fontSize:"small"})}),"Edit Profile"]})}),Object(V.jsxs)(G.a,{onClick:function(){o(),sessionStorage.removeItem("token"),d.a.auth().signOut().then((function(){return window.alert("Sign out successfully"),console.log("signOut"),window.location.reload()})).catch((function(e){console.log(e)}))},children:[Object(V.jsx)(J.a,{children:Object(V.jsx)(N.a,{fontSize:"small"})}),"Logout"]})]}),Object(V.jsx)(C.a,{variant:"h6",className:l.title,children:Object(V.jsx)(F.b,{to:"/",style:{textDecoration:"none",color:"white"},children:"R\u0101ningu Developer"})}),Object(V.jsx)(L.a,{children:t.user?Object(V.jsxs)(L.a,{children:["admin"===t.level?Object(V.jsx)(k.a,{title:"Documentation",style:{textDecoration:"none",color:"white"},children:Object(V.jsx)(F.b,{to:"/docs",children:Object(V.jsx)(D.a,{children:Object(V.jsx)(B.a,{style:{fill:"white"}})})})}):Object(V.jsx)(F.b,{to:"/docs",style:{textDecoration:"none",color:"white"},children:Object(V.jsx)(I.a,{variant:"outlined",style:{textDecoration:"none",borderColor:"white",color:"white"},startIcon:Object(V.jsx)(B.a,{}),children:"Docs"})}),"normal"===t.level&&Object(V.jsx)(T.a,{orientation:"vertical",flexItem:!0,style:{display:"inline"},sx:{px:1}}),"admin"===t.level?Object(V.jsx)(k.a,{title:"Admin Console",style:{textDecoration:"none",color:"white"},children:Object(V.jsx)(F.b,{to:"/admin",children:Object(V.jsx)(D.a,{children:Object(V.jsx)(A.a,{style:{fill:"white"}})})})}):Object(V.jsx)(F.b,{to:"/edit_profile",style:{textDecoration:"none"},children:Object(V.jsx)(I.a,{variant:"contained",style:{color:"#3f51b5",backgroundColor:"white"},startIcon:Object(V.jsx)(q.a,{}),children:"Edit Profile"})}),Object(V.jsx)(k.a,{title:"User Control",children:Object(V.jsx)(D.a,{onClick:function(e){i(e.currentTarget)},children:Object(V.jsx)(_.a,{src:t.user.photoURL})})})]}):Object(V.jsxs)(L.a,{position:"flex",children:[Object(V.jsx)(F.b,{to:"/docs",style:{textDecoration:"none",color:"white"},children:Object(V.jsx)(I.a,{variant:"text",color:"inherit",children:"Documentation"})}),"|",Object(V.jsx)(k.a,{title:"Sign In (Administrator)",children:Object(V.jsx)(F.b,{to:"/signin",children:Object(V.jsx)(D.a,{children:Object(V.jsx)(R.a,{style:{fill:"white"}})})})})]})})]})})},Y=n(324),Q=n(303),X=n(305),Z=n(304),$=n(329),ee=n(331),te=n(330),ne=n(332),ce=n(333),ae=n(120),re=n(326);function ie(){return Object(V.jsxs)($.a,{variant:"body2",color:"text.secondary",align:"center",children:["Copyright \xa9 ",Object(V.jsx)(te.a,{color:"inherit",href:"https://websitename-csc361.web.app/",children:"R\u0101ningu"})," ",(new Date).getFullYear(),"."]})}var se=Object(ae.a)();function oe(){return Object(V.jsxs)(re.a,{theme:se,children:[Object(V.jsx)(Q.a,{}),Object(V.jsx)("main",{children:Object(V.jsx)(Z.a,{sx:{bgcolor:"background.paper",pt:8,pb:0},children:Object(V.jsxs)(ee.a,{maxWidth:"sm",children:[Object(V.jsx)($.a,{component:"h1",variant:"h2",align:"center",color:"text.primary",gutterBottom:!0,children:"\u30e9\u30fc\u30cb\u30f3\u30b0"}),Object(V.jsx)($.a,{variant:"h5",align:"center",color:"text.secondary",paragraph:!0,children:"R\u0101ningu Developer for documentation - Developer."}),Object(V.jsx)(ne.a,{sx:{maxWidth:700},justifyContent:"center",children:Object(V.jsx)(ce.a,{component:"img",height:"285",image:"img/image-thumb.png",alt:"raningu thumbnail"})}),Object(V.jsxs)(X.a,{sx:{pt:4},direction:"row",spacing:2,justifyContent:"center",children:[Object(V.jsx)("a",{href:"https://websitename-csc361.web.app",target:"__blank",style:{textDecoration:"none"},children:Object(V.jsx)(Y.a,{variant:"contained",children:"Go to R\u0101ningu"})}),Object(V.jsx)(F.b,{to:"/docs",style:{textDecoration:"none"},children:Object(V.jsx)(Y.a,{variant:"outlined",children:"Documentation"})})]})]})})}),Object(V.jsxs)(Z.a,{sx:{bgcolor:"background.paper",p:6},component:"footer",children:[Object(V.jsx)($.a,{variant:"subtitle1",align:"center",color:"text.secondary",component:"p",children:"\u0e41\u0e2d\u0e1b\u0e1e\u0e25\u0e34\u0e40\u0e04\u0e0a\u0e31\u0e19\u0e08\u0e31\u0e14\u0e01\u0e32\u0e23\u0e43\u0e19\u0e2a\u0e48\u0e27\u0e19\u0e01\u0e32\u0e23\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e02\u0e2d\u0e07\u0e40\u0e27\u0e47\u0e1a\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49\u0e20\u0e32\u0e29\u0e32\u0e0d\u0e35\u0e48\u0e1b\u0e38\u0e48\u0e19 R\u0101ningu"}),Object(V.jsx)(ie,{})]})]})}var le=n(334),je=n(328),de=n(315),be=n(314),xe=n(335),he=n(336),ue=n(337),Oe=n(338),me=n(339),pe=n(340),ge=n(341),fe=n(316),ye=n(320),ve=n(306),we=n(307),Se=n(308),Ce=n(309),ke=n(310),De=n(311),Ie=n(312),Pe=n(313),Ae=n(64),Ee=n.n(Ae),Re={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4,borderRadius:5},Ue=Object(v.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},container:{marginTop:e.spacing(2)},paper:{padding:e.spacing(2),color:e.palette.text.secondary}}})),Ne=function(e){switch(e){case"google.com":return Object(V.jsx)(ve.a,{style:{fill:"rgb(46, 46, 46)"}});case"facebook.com":return Object(V.jsx)(we.a,{style:{fill:"rgb(46, 46, 46)"}});case"github.com":return Object(V.jsx)(Se.a,{style:{fill:"rgb(46, 46, 46)"}});case"password":return Object(V.jsx)(Ce.a,{style:{fill:"rgb(46, 46, 46)"}});default:return e}};function Te(e){e.session;var t=a.a.useState(null),n=Object(j.a)(t,2),r=n[0],i=n[1],s=a.a.useState(!1),o=Object(j.a)(s,2),l=o[0],d=o[1],b=a.a.useState(!0),x=Object(j.a)(b,2),h=x[0],u=x[1],O=a.a.useState(!1),m=Object(j.a)(O,2),p=m[0],g=m[1],f=a.a.useState(!1),y=Object(j.a)(f,2),v=y[0],w=y[1],S=Boolean(r),C=function(e){return i(e.currentTarget)},k=function(){return i(null)},D=function(e,t){"clickaway"!==t&&d(!1)};Ee()(document).ready((function(){Ee()("#searchId").on("keyup",(function(){var e=Ee()(this).val().toLowerCase();Ee()("#tableUser tr").filter((function(){Ee()(this).toggle(Ee()(this).text().toLowerCase().indexOf(e)>-1)}))}))}));var I=Object(V.jsx)(a.a.Fragment,{children:Object(V.jsx)(le.a,{size:"small","aria-label":"close",color:"inherit",onClick:D,children:Object(V.jsx)(ke.a,{fontSize:"small"})})}),P=Ue(),A=Object(c.useState)([]),E=Object(j.a)(A,2),R=E[0],U=E[1];Object(c.useEffect)((function(){N()}),[]);var N=function(){u(!0),g(!1),fetch("https://raningu-api.glitch.me/data/auth/get_user",{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){U(e)})).then((function(){u(!1),g(!0)}))};return Object(V.jsxs)("div",{className:P.root,children:[Object(V.jsx)(ee.a,{className:P.container,maxWidth:"lg",children:Object(V.jsxs)(je.a,{className:P.paper,children:[Object(V.jsxs)(Z.a,{display:"flex",children:[Object(V.jsx)(Z.a,{flexGrow:1,children:Object(V.jsx)($.a,{component:"h2",variant:"h6",color:"primary",gutterBottom:!0,children:"Users in application (Raningu)"})}),Object(V.jsx)(Z.a,{children:Object(V.jsx)("a",{target:"_blank",href:"https://console.firebase.google.com/u/2/project/websitename-csc361/authentication/users",rel:"noreferrer",style:{textDecoration:"none"},children:Object(V.jsx)(Y.a,{variant:"contained",color:"primary",children:"FIREBASE CONSOLE"})})})]}),Object(V.jsxs)(Z.a,{sx:{display:"flex",margin:2},children:[Object(V.jsx)(de.a,{sx:{width:"50%"},id:"searchId",label:"Search",variant:"standard"}),Object(V.jsx)(be.a,{title:"Refresh",onClick:N,children:Object(V.jsx)(le.a,{children:Object(V.jsx)(De.a,{style:{fill:"rgb(46, 46, 46)"}})})})]}),p&&Object(V.jsx)(xe.a,{component:je.a,children:Object(V.jsxs)(he.a,{id:"tableUser",className:P.table,"aria-label":"simple table",children:[Object(V.jsx)(ue.a,{children:Object(V.jsxs)(Oe.a,{children:[Object(V.jsx)(me.a,{align:"center",children:"Avatar"}),Object(V.jsx)(me.a,{align:"left",children:"Display Name"}),Object(V.jsx)(me.a,{align:"left",children:"E-mail"}),Object(V.jsx)(me.a,{align:"center",children:"Provider ID"}),Object(V.jsx)(me.a,{align:"center",children:"UID"}),Object(V.jsx)(me.a,{align:"center"})]})}),Object(V.jsxs)(pe.a,{children:[R.map((function(e){return Object(V.jsxs)(Oe.a,{children:[Object(V.jsx)(me.a,{align:"center",children:Object(V.jsx)(Z.a,{display:"flex",justifyContent:"center",children:Object(V.jsx)(_.a,{src:e.photoURL})})}),Object(V.jsx)(me.a,{align:"left",children:e.displayName}),Object(V.jsx)(me.a,{align:"left",children:e.email}),Object(V.jsx)(me.a,{align:"center",children:Ne(e.providerData[0].providerId)}),Object(V.jsx)(me.a,{align:"center",children:e.uid}),Object(V.jsxs)(me.a,{align:"center",children:[Object(V.jsx)(be.a,{title:"Copy UID",children:Object(V.jsx)(le.a,{children:Object(V.jsx)(Ie.a,{style:{fill:"rgb(46, 46, 46)"},onClick:function(){return t=e.uid,navigator.clipboard.writeText(t),void d(!0);var t}})})}),Object(V.jsx)(be.a,{title:"View more options",onClick:C,children:Object(V.jsx)(le.a,{children:Object(V.jsx)(Pe.a,{style:{fill:"rgb(46, 46, 46)"}})})})]})]},e.uid)})),Object(V.jsxs)(z.a,{id:"basic-menu",anchorEl:r,open:S,onClose:k,MenuListProps:{"aria-labelledby":"basic-button"},children:[Object(V.jsx)(G.a,{onClick:k,children:"Reset Password"}),Object(V.jsx)(G.a,{onClick:k,children:"Disable Account"}),Object(V.jsx)(G.a,{onClick:function(){return w(!0)},children:"Delete Account"})]})]})]})}),h&&Object(V.jsx)(Z.a,{sx:{display:"flex",justifyContent:"center"},children:Object(V.jsx)(ge.a,{})})]})}),Object(V.jsx)(fe.a,{open:v,onClose:function(){return w(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:Object(V.jsxs)(Z.a,{sx:Re,children:[Object(V.jsx)($.a,{id:"modal-modal-title",variant:"h6",component:"h2",children:"Delete account"}),Object(V.jsx)(le.a,{children:Object(V.jsx)(ke.a,{})}),Object(V.jsx)($.a,{id:"modal-modal-description",sx:{mt:2},children:"Duis mollis, est non commodo luctus, nisi erat porttitor ligula."})]})}),Object(V.jsx)(ye.a,{open:l,autoHideDuration:3e3,onClose:D,message:"Copy UID Successfully!",action:I})]})}var We=n(318),Be=n(325),Fe=n(152),Le=n.n(Fe),_e=Object(ae.a)();function ze(e){e.session;var t=c.useState(!1),n=Object(j.a)(t,2),a=n[0],r=n[1],i=c.useState(""),s=Object(j.a)(i,2),o=s[0],l=s[1];return Object(V.jsx)(re.a,{theme:_e,children:Object(V.jsxs)(ee.a,{component:"main",maxWidth:"xs",children:[Object(V.jsx)(Q.a,{}),Object(V.jsxs)(Z.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(V.jsx)(_.a,{sx:{m:1,bgcolor:"secondary.main"},children:Object(V.jsx)(Le.a,{})}),Object(V.jsx)($.a,{component:"h1",variant:"h5",children:"Sign in (Administrator Only)"}),Object(V.jsxs)(Z.a,{component:"form",onSubmit:function(e){e.preventDefault();var t=new FormData(e.currentTarget);if(""===t.get("email")||""===t.get("password"))return r(!0),void l("Email/Password required!");console.log({email:t.get("email"),password:t.get("password")}),r(!1)},noValidate:!0,sx:{mt:1},children:[Object(V.jsx)(de.a,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),Object(V.jsx)(de.a,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),a&&Object(V.jsx)(We.a,{severity:"error",children:o}),Object(V.jsx)(Y.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),Object(V.jsxs)(Be.a,{container:!0,children:[Object(V.jsx)(Be.a,{item:!0,xs:!0,children:Object(V.jsx)(te.a,{href:"#",variant:"body2",children:"Forgot password?"})}),Object(V.jsx)(Be.a,{item:!0,children:Object(V.jsx)(te.a,{href:"#",variant:"body2",children:"Don't have an account? Sign Up"})})]}),Object(V.jsx)(T.a,{style:{margin:"20px"},children:"Sign-In Method"}),Object(V.jsxs)(Be.a,{container:!0,justifyContent:"center",spacing:5,children:[Object(V.jsx)(Be.a,{item:!0,children:Object(V.jsx)(le.a,{size:"large",onClick:p,children:Object(V.jsx)(ve.a,{})})}),Object(V.jsx)(Be.a,{item:!0,children:Object(V.jsx)(le.a,{size:"large",onClick:g,children:Object(V.jsx)(we.a,{})})}),Object(V.jsx)(Be.a,{item:!0,children:Object(V.jsx)(le.a,{size:"large",onClick:f,children:Object(V.jsx)(Se.a,{})})})]})]})]})]})})}var Ge=n(119),Je=n(6),Me=n(153),qe=Object(Je.a)(je.a)((function(e){var t=e.theme;return Object(Ge.a)(Object(Ge.a)({},t.typography.body2),{},{padding:t.spacing(1),textAlign:"center",color:t.palette.text.secondary})})),Ve=Object(ae.a)();function He(e){var t=e.session,n=(Me.a.auth().currentUser,t.user);return c.useEffect((function(){}),[]),console.log(n),Object(V.jsx)(re.a,{theme:Ve,children:Object(V.jsx)(ee.a,{component:"main",maxWidth:"md",children:Object(V.jsx)(Z.a,{sx:{mt:3},children:Object(V.jsxs)(Be.a,{container:!0,spacing:2,children:[Object(V.jsx)(Be.a,{item:!0,xs:6,md:2,children:Object(V.jsx)(qe,{alignItems:"center",justifyContent:"center",children:Object(V.jsx)(_.a,{src:t.user.photoURL,sx:{width:100,height:100}})})}),Object(V.jsx)(Be.a,{item:!0,xs:6,md:2,children:Object(V.jsx)(qe,{})}),Object(V.jsx)(Be.a,{item:!0,xs:6,md:8,children:Object(V.jsx)(qe,{children:"xs=6 md=8"})}),Object(V.jsx)(Be.a,{item:!0,xs:6,md:4,children:Object(V.jsx)(qe,{children:"xs=6 md=4"})}),Object(V.jsx)(Be.a,{item:!0,xs:6,md:8,children:Object(V.jsx)(qe,{children:"xs=6 md=8"})})]})})})})}var Ke=n(132);var Ye=function(){var e={user:null,level:"guest"},t=Object(c.useState)(e),n=Object(j.a)(t,2),a=n[0],r=n[1];return Object(c.useEffect)(Object(l.a)(o.a.mark((function t(){var n,c,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=sessionStorage.getItem("token"))){t.next=9;break}if(a===e){t.next=4;break}return t.abrupt("return");case 4:c=Ke.AES.decrypt(n,"raningu@7712219"),i=JSON.parse(c.toString(Ke.enc.Utf8)),r(i),t.next=12;break;case 9:return sessionStorage.removeItem("token"),t.next=12,h();case 12:case"end":return t.stop()}}),t)}))),[]),Object(V.jsxs)("div",{className:"app-container",children:[Object(V.jsx)(K,{session:a}),Object(V.jsxs)(y.d,{children:[Object(V.jsx)(y.b,{exact:!0,path:"/",element:Object(V.jsx)(oe,{})}),Object(V.jsx)(y.b,{exact:!0,path:"/docs"}),Object(V.jsx)(y.b,{exact:!0,path:"/signin",element:a.user?Object(V.jsx)(oe,{}):Object(V.jsx)(ze,{session:a})}),Object(V.jsx)(y.b,{exact:!0,path:"/edit_profile",element:a.user?Object(V.jsx)(He,{session:a}):Object(V.jsx)(y.a,{to:"/"})}),Object(V.jsx)(y.b,{exact:!0,path:"/admin",element:a.user?Object(V.jsx)(Te,{session:a}):Object(V.jsx)(y.a,{to:"/"})})]})]})},Qe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,343)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))};i.a.render(Object(V.jsx)(a.a.StrictMode,{children:Object(V.jsx)(F.a,{children:Object(V.jsx)(Ye,{})})}),document.getElementById("root")),Qe()}},[[226,1,2]]]);
//# sourceMappingURL=main.8371bb6e.chunk.js.map