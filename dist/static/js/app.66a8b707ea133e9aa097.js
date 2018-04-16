webpackJsonp([1],{105:function(a,t){},113:function(a,t){},114:function(a,t){},118:function(a,t){},120:function(a,t){},123:function(a,t){},129:function(a,t){},131:function(a,t){},134:function(a,t){},137:function(a,t){},143:function(a,t){},147:function(a,t){},155:function(a,t){},160:function(a,t){},168:function(a,t){},173:function(a,t){},176:function(a,t){},179:function(a,t){},186:function(a,t){},195:function(a,t){},198:function(a,t){},199:function(a,t){},21:function(a,t){},23:function(a,t){},28:function(a,t,e){"use strict";t.a={name:"App"}},29:function(a,t,e){"use strict";t.a={name:"Index",mounted:function(){var a=this,t=sessionStorage.getItem("usuariologado");setTimeout(function(){a.$router.push(t?"/Landing":"/Login")},5e3)}}},30:function(a,t,e){"use strict";var o=e(65),n=e.n(o),r=e(68),i=e.n(r),s=e(87);e.n(s);t.a={name:"Cadastro",directives:{money:s.VMoney},data:function(){return{editando:!1,formularioValido:!1,imagemValida:!1,urlImagemModal:"",modalImagem:!1,verSenha:!1,lstEstados:[],lstCidades:[],rendaFormatada:0,regras:{nome:[function(a){return!!a||"Você não pode deixar este campo em branco"},function(a){return a.length<=100||"O nome pode ter no máximo 100 caracteres"}],senha:[function(a){return!!a||"Você não pode deixar este campo em branco"}],email:[function(a){return!!a||"Você não pode deixar este campo em branco"},function(a){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(a)||"Este formato de e-mail não é válido"}],renda:[function(a){return"R$ 0,00"!=a||"Você precisa informar uma renda válida"}]},usuario:{nome:"",email:"",senha:"",renda:0,cidade:"",estado:"",avatar:""},money:{decimal:",",thousands:".",prefix:"R$ ",precision:2,masked:!1}}},watch:{"usuario.estado":function(a){a&&this.carregaCidades(a)},rendaFormatada:function(a){a&&"string"==typeof a&&(this.usuario.renda=this.formataRenda())}},mounted:function(){this.carregaEstados(),this.carregaUsuario()},methods:{formataRenda:function(a){return parseFloat(a.replace("R$ ","").replace(/(\.)/g,"").replace(",","."))},trocaFoto:function(){this.usuario.avatar=this.urlImagemModal,this.urlImagemModal="",this.modalImagem=!1},carregaUsuario:function(){var a=JSON.parse(sessionStorage.getItem("usuariologado"));a&&(this.usuario=a,this.$refs.renda.$el.getElementsByTagName("input")[0].value=100*a.renda,this.rendaFormatada=a.renda,this.editando=!0)},carregaCidades:function(a){var t=this;i.a.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+a+"/municipios").then(function(a){t.lstCidades=a.data.map(function(a){return{id:a.id,texto:a.nome}}).sort(function(a,t){return a.texto.localeCompare(t.texto)})})},carregaEstados:function(){var a=this;i.a.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(t){a.lstEstados=t.data.map(function(a){return{id:a.id,texto:a.sigla+" - "+a.nome}}).sort(function(a,t){return a.texto.localeCompare(t.texto)})})},salvarUsuario:function(){var a=this,t=n()(a.usuario);localStorage.setItem(a.usuario.email,t),sessionStorage.setItem("usuariologado",t),a.$router.push("/Dashboard")}}}},36:function(a,t,e){"use strict";t.a={name:"Landing",computed:{usuariologado:function(){return JSON.parse(sessionStorage.getItem("usuariologado"))}},methods:{efetuarLogout:function(){sessionStorage.removeItem("usuariologado"),this.$router.push("/Login")}}}},37:function(a,t,e){"use strict";t.a={name:"Login",data:function(){return{login:"",senha:""}}}},38:function(a,t,e){"use strict";t.a={name:"Dashboard"}},45:function(a,t){},52:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(26),n=e(55),r=e(59),i=e(97),s=e.n(i),u=e(103),c=e.n(u),l=e(111),d=e.n(l),m=e(116),v=e.n(m),f=e(41),p=e.n(f),g=e(20),h=e.n(g),x=e(7),_=e.n(x),b=e(135),y=e.n(b),C=e(141),V=e.n(C),I=e(9),k=e.n(I),w=e(44),$=e.n(w),E=e(43),F=e.n(E),S=e(150),L=e.n(S),R=e(158),j=e.n(R),M=e(191),D=e.n(M),N=e(193),T=e.n(N),A=e(196),O=e.n(A),U=e(199);e.n(U);o.a.use(s.a,{theme:{primary:"#ff9800",secondary:"#757575"},components:{VApp:c.a,VNavigationDrawer:d.a,VFooter:v.a,VList:p.a,VBtn:h.a,VIcon:_.a,VGrid:y.a,VToolbar:V.a,transitions:k.a,VCard:$.a,VAvatar:F.a,VTextField:L.a,VSelect:j.a,VForm:D.a,VTooltip:T.a,VDialog:O.a}}),o.a.config.productionTip=!1,new o.a({el:"#app",router:r.a,components:{App:n.a},template:"<App/>"})},55:function(a,t,e){"use strict";function o(a){e(56)}var n=e(28),r=e(58),i=e(6),s=o,u=i(n.a,r.a,!1,s,"data-v-cae4a0b0",null);t.a=u.exports},56:function(a,t){},58:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-app",[e("v-container",{attrs:{fluid:"","fill-height":""}},[e("transition",{attrs:{appear:"",mode:"out-in",name:"fade"}},[e("router-view")],1)],1)],1)},n=[],r={render:o,staticRenderFns:n};t.a=r},59:function(a,t,e){"use strict";var o=e(26),n=e(60),r=e(61),i=e(63),s=e(89),u=e(92),c=e(94),l=e(96);o.a.use(n.a);var d=new n.a({routes:[{path:"/",name:"Index",component:r.a},{path:"/Cadastro",name:"Cadastro",component:i.a},{path:"/Landing",name:"Landing",component:s.a},{path:"/Login",name:"Login",component:u.a},{path:"/Dashboard",name:"Dashboard",component:c.a}],mode:"history"});d.beforeEach(function(a,t,e){Object(l.a)(a,t,e)}),t.a=d},61:function(a,t,e){"use strict";var o=e(29),n=e(62),r=e(6),i=r(o.a,n.a,!1,null,null,null);t.a=i.exports},62:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{flex:"","align-center":"","justify-center":""}},[e("img",{attrs:{src:"/static/img/icons/android-chrome-192x192.png",alt:"logo"}})])},n=[],r={render:o,staticRenderFns:n};t.a=r},63:function(a,t,e){"use strict";function o(a){e(64)}var n=e(30),r=e(88),i=e(6),s=o,u=i(n.a,r.a,!1,s,"data-v-8a7817b6",null);t.a=u.exports},64:function(a,t){},88:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-flex",{attrs:{xs12:"",md5:""}},[e("h1",{staticClass:"titulo"},[a._v("Cadastro")]),a._v(" "),e("v-form",{ref:"form",model:{value:a.formularioValido,callback:function(t){a.formularioValido=t},expression:"formularioValido"}},[e("v-spacer",{staticClass:"mb-2"}),a._v(" "),e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-flex",{attrs:{xs12:"","text-xs-center":""}},[e("v-tooltip",{attrs:{bottom:""}},[e("v-avatar",{staticClass:"pointer",attrs:{slot:"activator",size:"120px",color:"secondary"},on:{click:function(){return a.modalImagem=!a.modalImagem}},slot:"activator"},[a.usuario.avatar?e("img",{staticClass:"avatarusuario",attrs:{src:a.usuario.avatar,alt:"avatar"}}):a._e(),a._v(" "),e("v-icon",{staticClass:"iconefoto",attrs:{color:"white"}},[a._v("add_a_photo")])],1),a._v(" "),e("span",[a._v("Escolher foto")])],1),a._v(" "),e("v-dialog",{attrs:{"max-width":"500px"},model:{value:a.modalImagem,callback:function(t){a.modalImagem=t},expression:"modalImagem"}},[e("v-card",[e("v-card-title",[a._v("Escolher foto")]),a._v(" "),e("v-card-text",[e("v-text-field",{attrs:{clearable:"",label:"Url da imagem"},model:{value:a.urlImagemModal,callback:function(t){a.urlImagemModal=t},expression:"urlImagemModal"}}),a._v(" "),e("v-layout",{attrs:{row:"","justify-center":""}},[e("v-flex",{attrs:{xs12:"","text-xs-center":""}},[e("v-avatar",{attrs:{size:"120px"}},[e("img",{class:a.imagemValida?"":"visible_off",attrs:{src:a.urlImagemModal,alt:"avatar"},on:{error:function(t){a.imagemValida=!1},load:function(t){a.imagemValida=!0}}})])],1)],1)],1),a._v(" "),e("v-card-actions",[e("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(t){t.stopPropagation(),a.modalImagem=!1}}},[a._v("Cancelar")]),a._v(" "),e("v-spacer"),a._v(" "),e("v-btn",{attrs:{color:"primary",disabled:!a.imagemValida},on:{click:a.trocaFoto}},[a._v("Finalizar")])],1)],1)],1)],1)],1),a._v(" "),e("v-spacer",{staticClass:"mt-2"}),a._v(" "),e("v-text-field",{attrs:{dark:"",label:"E-mail",rules:a.regras.email,disabled:a.editando,required:""},model:{value:a.usuario.email,callback:function(t){a.$set(a.usuario,"email",t)},expression:"usuario.email"}}),a._v(" "),e("v-text-field",{attrs:{dark:"",label:"Senha",type:a.verSenha?"text":"password","append-icon":a.verSenha?"visibility_off":"visibility","append-icon-cb":function(){return a.verSenha=!a.verSenha},rules:a.regras.senha,required:""},model:{value:a.usuario.senha,callback:function(t){a.$set(a.usuario,"senha",t)},expression:"usuario.senha"}}),a._v(" "),e("v-text-field",{attrs:{dark:"",label:"Nome",counter:100,rules:a.regras.nome,required:""},model:{value:a.usuario.nome,callback:function(t){a.$set(a.usuario,"nome",t)},expression:"usuario.nome"}}),a._v(" "),e("v-text-field",{directives:[{name:"money",rawName:"v-money",value:a.money,expression:"money"}],ref:"renda",attrs:{dark:"",label:"Renda",rules:a.regras.renda,"validate-on-blur":"",required:""},model:{value:a.rendaFormatada,callback:function(t){a.rendaFormatada=t},expression:"rendaFormatada"}}),a._v(" "),e("v-select",{attrs:{dark:"",items:a.lstEstados,loading:0==a.lstEstados.length,label:"Estado","item-value":"id","item-text":"texto"},model:{value:a.usuario.estado,callback:function(t){a.$set(a.usuario,"estado",t)},expression:"usuario.estado"}}),a._v(" "),a.usuario.estado>0?e("v-select",{attrs:{dark:"",items:a.lstCidades,disabled:0==a.lstCidades.length,loading:0==a.lstCidades.length,label:"Cidade",autocomplete:"","item-value":"id","item-text":"texto"},model:{value:a.usuario.cidade,callback:function(t){a.$set(a.usuario,"cidade",t)},expression:"usuario.cidade"}}):a._e(),a._v(" "),e("v-spacer",{staticClass:"mt-2"}),a._v(" "),e("v-btn",{attrs:{flat:"",color:"primary"}},[a._v("Cancelar")]),a._v(" "),e("v-btn",{staticClass:"right",attrs:{disabled:!a.formularioValido,color:"primary"},on:{click:a.salvarUsuario}},[a._v("Salvar")])],1)],1)],1)},n=[],r={render:o,staticRenderFns:n};t.a=r},89:function(a,t,e){"use strict";function o(a){e(90)}var n=e(36),r=e(91),i=e(6),s=o,u=i(n.a,r.a,!1,s,null,null);t.a=u.exports},90:function(a,t){},91:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{flex:"","align-center":"","justify-center":""}},[e("v-flex",{attrs:{xs12:"",sm4:""}},[e("v-card",{staticClass:"white"},[e("v-card-text",{staticClass:"white--text text-xs-center"},[e("v-avatar",{attrs:{size:"120px"}},[e("img",{attrs:{src:a.usuariologado.avatar,alt:"avatar"}})]),a._v(" "),e("h3",{staticClass:"nome-usuario mt-3"},[a._v(a._s(a.usuariologado.nome))])],1),a._v(" "),e("v-card-actions",[e("v-btn",{attrs:{flat:"",color:"primary"},on:{click:a.efetuarLogout}},[a._v("Logout")]),a._v(" "),e("v-spacer"),a._v(" "),e("v-btn",{attrs:{to:"/Dashboard",color:"primary"}},[a._v("Continuar")])],1)],1)],1)],1)},n=[],r={render:o,staticRenderFns:n};t.a=r},92:function(a,t,e){"use strict";var o=e(37),n=e(93),r=e(6),i=r(o.a,n.a,!1,null,null,null);t.a=i.exports},93:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{flex:"","align-center":"","justify-center":""}},[e("v-flex",{attrs:{xs12:"",sm4:""}},[e("v-card",{staticClass:"white"},[e("v-card-text"),a._v(" "),e("v-card-actions",[e("v-btn",{attrs:{flat:"",color:"primary"}},[a._v("Criar conta")]),a._v(" "),e("v-spacer"),a._v(" "),e("v-btn",{attrs:{color:"primary"}},[a._v("Próxima")])],1)],1)],1)],1)},n=[],r={render:o,staticRenderFns:n};t.a=r},94:function(a,t,e){"use strict";var o=e(38),n=e(95),r=e(6),i=r(o.a,n.a,!1,null,null,null);t.a=i.exports},95:function(a,t,e){"use strict";var o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-layout",{attrs:{flex:"","align-center":"","justify-center":""}},[e("h1",[a._v("Dashboard")])])},n=[],r={render:o,staticRenderFns:n};t.a=r},96:function(a,t,e){"use strict";var o=function(a,t,e){sessionStorage.getItem("usuariologado"),a.fullPath;e()};t.a=o}},[52]);
//# sourceMappingURL=app.66a8b707ea133e9aa097.js.map