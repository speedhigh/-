(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{137:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(138));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},138:function(e,n,t){"use strict";t.r(n);var r=t(139),o=t(141);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);t(143);var i,u=t(14),c=Object(u["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"57280228",null,!1,r["components"],i);c.options.__file="pages/index/index.vue",n["default"]=c.exports},139:function(e,n,t){"use strict";t.r(n);var r=t(140);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},140:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return r}));try{r={uSearch:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-search/u-search")]).then(t.bind(null,211))},"u-Image":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--image/u--image")]).then(t.bind(null,219))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,225))},uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,234))},uGrid:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-grid/u-grid")]).then(t.bind(null,242))},uGridItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-grid-item/u-grid-item")]).then(t.bind(null,250))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.promotionList,(function(n,t){var r=e.__get_orig(n),o=Math.round(n.sproduct.iprice*e.rate*10);return{$orig:r,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},a=!1,i=[];o._withStripped=!0},141:function(e,n,t){"use strict";t.r(n);var r=t(142),o=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},142:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t(9));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n,t,r,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void t(s)}u.done?n(c):Promise.resolve(c).then(r,o)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(r,o){var i=e.apply(n,t);function u(e){a(i,r,o,u,c,"next",e)}function c(e){a(i,r,o,u,c,"throw",e)}u(void 0)}))}}var u=function(){t.e("components/BaseCountDown").then(function(){return resolve(t(258))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/BaseTabs").then(function(){return resolve(t(265))}.bind(null,t)).catch(t.oe)},s=function(){Promise.all([t.e("common/vendor"),t.e("components/BasePagination")]).then(function(){return resolve(t(272))}.bind(null,t)).catch(t.oe)},d=function(){t.e("components/MuziCard").then(function(){return resolve(t(277))}.bind(null,t)).catch(t.oe)},l={components:{BaseCountDown:u,BaseTabs:c,BasePagination:s,MuziCard:d},data:function(){return{rate:e.getStorageSync("rate"),swipers:[],kingkong:[],recommend:{a:{},b:{},c:{},list:[]},promotionList:[],time:0,cartDisabled:!1,tabTitles:[],list:[],currentPage:1,params:{onefunctioncategory:"",countryCode:""}}},onLoad:function(){this.getSwipers(),this.getKingKong(),this.getRecommend(),this.getPromotionProduct(),this.getTabTitleList()},onReachBottom:function(){this.currentPage++},methods:{getSwipers:function(){var e=this;return i(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api({url:"/open/home/get_banner"});case 2:t=n.sent,e.swipers=t.data.data;case 4:case"end":return n.stop()}}),n)})))()},getKingKong:function(){var e=this;return i(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api({url:"/open/home/get_product_class"});case 2:t=n.sent,e.kingkong=t.data.data;case 4:case"end":return n.stop()}}),n)})))()},getRecommend:function(){var e=this;return i(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api({url:"/open/home/wxapp/getrecommend"});case 2:t=n.sent,e.recommend.a=t.data.data[0],e.recommend.b=t.data.data[1],e.recommend.c=t.data.data[2],e.recommend.list=t.data.data.slice(3);case 7:case"end":return n.stop()}}),n)})))()},getPromotionProduct:function(){var e=this;return i(r.default.mark((function n(){var t;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api({url:"/open/home/wxapp/getPromotionProduct"});case 2:t=n.sent,e.time=Date.parse(t.data.data[0].dendtime)-Date.parse(new Date),e.promotionList=t.data.data;case 5:case"end":return n.stop()}}),n)})))()},getTabTitleList:function(){var e=this;return i(r.default.mark((function n(){var t,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api({url:"/open/home/wxapp/get_home_first_class"});case 2:t=n.sent,e.tabTitles=t.data.data,e.currentPage=1,o={countryCode:t.data.data[0].scountry,onefunctioncategory:t.data.data[0].sfuncid},Object.assign(e.params,o);case 7:case"end":return n.stop()}}),n)})))()},changeTabs:function(n,t){this.currentPage=1;var r={countryCode:n,onefunctioncategory:t};Object.assign(this.params,r),e.pageScrollTo({scrollTop:1145,duration:100})},addCart:function(n){var t=this;return i(r.default.mark((function o(){var a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.cartDisabled){r.next=11;break}if(e.getStorageSync("token")){r.next=4;break}return e.navigateTo({url:"/pages/login/login"}),r.abrupt("return");case 4:return t.cartDisabled=!0,e.showLoading({title:"加载中"}),r.next=8,t.$api({method:"POST",contentType:"application/x-www-form-urlencoded",url:"/cart/post",data:{userid:e.getStorageSync("user").id,productid:n}});case 8:a=r.sent,2e4===a.data.code&&setTimeout((function(){e.showToast({title:"成功加入购物车",complete:function(){t.cartDisabled=!1}})}),300),2e4!==a.data.code&&setTimeout((function(){e.showToast({title:"加入购物车失败",complete:function(){t.cartDisabled=!1}})}),300);case 11:case"end":return r.stop()}}),o)})))()}}};n.default=l}).call(this,t(1)["default"])},143:function(e,n,t){"use strict";t.r(n);var r=t(144),o=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=o.a},144:function(e,n,t){}},[[137,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map