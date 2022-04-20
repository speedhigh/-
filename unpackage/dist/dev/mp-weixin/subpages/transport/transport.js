(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpages/transport/transport"],{281:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(282));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},282:function(e,n,t){"use strict";t.r(n);var r=t(283),a=t(285);for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);var u,i=t(14),s=Object(i["default"])(a["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],u);s.options.__file="subpages/transport/transport.vue",n["default"]=s.exports},283:function(e,n,t){"use strict";t.r(n);var r=t(284);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},284:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return a})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return o})),t.d(n,"components",(function(){return r}));try{r={uLoadingPage:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(t.bind(null,295))},"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,311))},uSteps:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-steps/u-steps")]).then(t.bind(null,547))},uStepsItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-steps-item/u-steps-item")]).then(t.bind(null,555))},uEmpty:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-empty/u-empty")]).then(t.bind(null,374))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var e=this,n=e.$createElement;e._self._c},o=!1,u=[];a._withStripped=!0},285:function(e,n,t){"use strict";t.r(n);var r=t(286),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=a.a},286:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t(9));function a(e){return e&&e.__esModule?e:{default:e}}function o(e,n,t,r,a,o,u){try{var i=e[o](u),s=i.value}catch(d){return void t(d)}i.done?n(s):Promise.resolve(s).then(r,a)}function u(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var u=e.apply(n,t);function i(e){o(u,r,a,i,s,"next",e)}function s(e){o(u,r,a,i,s,"throw",e)}i(void 0)}))}}var i={data:function(){return{showEmpty:!1,loadingNum:0,info:{productImg:"",count:"",status:"",sname:"",swaybillnum:"",orderid:""},list:[],address:{saddressname:"",scardno:"",sdetail:"",slinkman:"",smobile:""}}},onLoad:function(e){this.info.orderid=e.id,this.getData(e.id),this.getAddress(e.id),this.getList(e.id)},methods:{getData:function(e){var n=this;return u(r.default.mark((function t(){var a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$api({url:"/ship/getProductInfo",data:{orderid:e}});case 2:a=t.sent,n.info.productImg=a.data.data.productImg,n.info.count=a.data.data.totalCount,n.loadingNum+=1;case 6:case"end":return t.stop()}}),t)})))()},getList:function(e){var n=this;return u(r.default.mark((function t(){var a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$api({url:"/ship/getList",data:{orderid:e}});case 2:a=t.sent,n.list=a.data.data,a.data.data.length>0?(n.info.status=a.data.data[0].iwaybillstatus,n.info.swaybillnum=a.data.data[0].swaybillnum,n.info.sname=a.data.data[0].sname):n.showEmpty=!0,n.loadingNum+=1;case 6:case"end":return t.stop()}}),t)})))()},getAddress:function(e){var n=this;return u(r.default.mark((function t(){var a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$api({url:"/useraddress/getorderaddress",data:{orderid:e}});case 2:a=t.sent,Object.assign(n.address,a.data.data),n.loadingNum+=1;case 5:case"end":return t.stop()}}),t)})))()}}};n.default=i}},[[281,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpages/transport/transport.js.map