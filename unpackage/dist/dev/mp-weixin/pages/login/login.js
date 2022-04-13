(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{193:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(194));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},194:function(e,n,t){"use strict";t.r(n);var o=t(195),r=t(197);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);var i,a=t(14),c=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);c.options.__file="pages/login/login.vue",n["default"]=c.exports},195:function(e,n,t){"use strict";t.r(n);var o=t(196);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},196:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));try{o={uLoadingPage:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(t.bind(null,231))},"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,247))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,318))},uCheckboxGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(t.bind(null,368))},uCheckbox:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-checkbox/u-checkbox")]).then(t.bind(null,376))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,i=[];r._withStripped=!0},197:function(e,n,t){"use strict";t.r(n);var o=t(198),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},198:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=r(t(9));function r(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,o,r,u,i){try{var a=e[u](i),c=a.value}catch(s){return void t(s)}a.done?n(c):Promise.resolve(c).then(o,r)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var i=e.apply(n,t);function a(e){u(i,o,r,a,c,"next",e)}function c(e){u(i,o,r,a,c,"throw",e)}a(void 0)}))}}var a={data:function(){return{showLoading:!0,checked:!1,showDialog:!1}},onLoad:function(){e.getStorageSync("openid")?this.showLoading=!1:this.getCode()},methods:{getOpenId:function(n){var t=this;return i(o.default.mark((function r(){var u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,t.$api({url:"/open/getOpenId",data:{js_code:n}});case 2:u=o.sent,e.setStorageSync("openid",u.data.data.openid),t.showLoading=!1;case 5:case"end":return o.stop()}}),r)})))()},getCode:function(){var n=this;e.getProvider({service:"oauth",success:function(t){~t.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(e){n.getOpenId(e.code)},fail:function(){e.showToast({title:"微信登录授权失败",icon:"none"})}})}})},getPhoneNumber:function(n){if(console.log(e.getStorageSync("openid")),"getPhoneNumber:ok"==n.target.errMsg){if(!this.checked)return void e.showModal({content:"请同意授权木子网隐私协议",showCancel:!1});e.getStorageSync("openid")&&this.login(n.detail.code,e.getStorageSync("openid"))}},checkChange:function(e){this.checked="同意"===e[0]},login:function(n,t){var r=this;return i(o.default.mark((function u(){var i;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,r.$api({method:"POST",url:"/open/wxlogin",data:{openid:t,code:n}});case 2:i=o.sent,2e4===i.data.code&&(e.setStorage({key:"token",data:i.data.data.token}),e.setStorage({key:"user",data:i.data.data.user}),r.getshiming(i.data.data.user.id));case 4:case"end":return o.stop()}}),u)})))()},getshiming:function(n){var t=this;return i(o.default.mark((function r(){var u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,t.$api({url:"/myidcard/get",data:{userid:n}});case 2:u=o.sent,console.log(u),2e4===u.data.code?(e.setStorageSync("shiming",1),e.showModal({content:"登录成功！",showCancel:!1,success:function(){e.navigateBack()}})):20001===u.data.code&&"没有实名"===u.data.msg?(e.setStorageSync("shiming",0),e.showModal({content:"欢迎登录，请先进行实名认证！",showCancel:!1,success:function(){e.navigateTo({url:"/subpages/info/info"})}})):e.setStorageSync("shiming",0);case 5:case"end":return o.stop()}}),r)})))()}}};n.default=a}).call(this,t(1)["default"])}},[[193,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map