"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8802],{8802:(y,d,n)=>{n.r(d),n.d(d,{LoginPageModule:()=>b});var p=n(6895),r=n(433),e=n(8779),u=n(2435),o=n(4650),v=n(5956),f=n(4120),h=n(3786);const P=[{path:"",component:(()=>{class t{constructor(i,s,l,g,c){this.router=i,this.vibration=s,this.loginService=l,this.fb=g,this.toastr=c}ngOnInit(){this.createForm()}createForm(){this.loginForm=this.fb.group({email:[""],password:[""]})}login(){this.loginService.getAllUsers().subscribe(i=>{var s,l;console.log(JSON.stringify(i));const g=i.filter(c=>{var m;return c.email===(null===(m=this.loginForm.get("email"))||void 0===m?void 0:m.value)})[0];g&&g.password===(null===(s=this.loginForm.get("password"))||void 0===s?void 0:s.value)?(localStorage.setItem("email",null===(l=this.loginForm.get("email"))||void 0===l?void 0:l.value),this.router.navigate("true"==g.isRecruiter?["recruiter-home"]:["applicant-home"]),"true"==g.isRecruiter?localStorage.setItem("isRecruiter","true"):localStorage.setItem("isRecruiter","false"),this.loginService.setUser(),this.vibration.vibrate(1e3),this.toastr.presentToast("User logged in successfully","success")):this.toastr.presentToast("Invalid email or password","danger")})}ngOnDestroy(){this.loginForm.reset(),localStorage.clear()}}return t.\u0275fac=function(i){return new(i||t)(o.Y36(u.F0),o.Y36(v.w),o.Y36(f.r),o.Y36(r.qu),o.Y36(h.M))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-login"]],decls:20,vars:1,consts:[["slot","start"],[3,"formGroup"],["lines","full"],["position","floating"],["type","text","formControlName","email","required",""],["type","password","formControlName","password","required",""],["type","submit","color","dark","expand","block",3,"click"]],template:function(i,s){1&i&&(o.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),o._UZ(3,"ion-back-button"),o.qZA(),o.TgZ(4,"ion-title"),o._uU(5,"Sign In"),o.qZA()()(),o.TgZ(6,"ion-content")(7,"form",1)(8,"ion-item",2)(9,"ion-label",3),o._uU(10,"Email"),o.qZA(),o._UZ(11,"ion-input",4),o.qZA(),o.TgZ(12,"ion-item",2)(13,"ion-label",3),o._uU(14,"Password"),o.qZA(),o._UZ(15,"ion-input",5),o.qZA(),o.TgZ(16,"ion-row")(17,"ion-col")(18,"ion-button",6),o.NdJ("click",function(){return s.login()}),o._uU(19,"Sign In"),o.qZA()()()()()),2&i&&(o.xp6(7),o.Q6J("formGroup",s.loginForm))},dependencies:[r._Y,r.JJ,r.JL,r.Q7,e.oU,e.YG,e.Sm,e.wI,e.W2,e.Gu,e.pK,e.Ie,e.Q$,e.Nd,e.wd,e.sr,e.j9,e.cs,r.sg,r.u],styles:[".ion-page[_ngcontent-%COMP%]{border:double}"]}),t})()}];let Z=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[u.Bz.forChild(P),u.Bz]}),t})();var L=n(1205);let b=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[p.ez,r.u5,e.Pc,r.UX,L.ww,Z]}),t})()}}]);