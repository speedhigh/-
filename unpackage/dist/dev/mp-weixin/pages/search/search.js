(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{171:function(e,n,t){"use strict";(function(e){t(5);r(t(3));var n=r(t(172));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},172:function(e,n,t){"use strict";t.r(n);var r=t(173),o=t(175);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);var s,c=t(14),u=Object(c["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],s);u.options.__file="pages/search/search.vue",n["default"]=u.exports},173:function(e,n,t){"use strict";t.r(n);var r=t(174);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},174:function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return o})),t.d(n,"staticRenderFns",(function(){return s})),t.d(n,"recyclableRender",(function(){return i})),t.d(n,"components",(function(){return r}));try{r={uSearch:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-search/u-search")]).then(t.bind(null,303))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,317))},uTag:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-tag/u-tag")]).then(t.bind(null,424))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var e=this,n=e.$createElement;e._self._c},i=!1,s=[];o._withStripped=!0},175:function(e,n,t){"use strict";t.r(n);var r=t(176),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);n["default"]=o.a},176:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(177),o={data:function(){return{searchValue:"",historyList:[],hotList:["第一三共新露露","感冒药","更年期保健药","胃药","咽喉消炎","眼药水","大幸药品","小林制药","乐敦制药"]}},methods:{clearHistory:function(){var n=this;e.showModal({content:"确定要清空历史记录吗？",confirmColor:"#F03E38",success:function(t){t.confirm&&(n.historyList=[],e.removeStorageSync("history"),e.showToast({title:"成功",icon:"success",duration:2e3}))}})},onSearch:function(n){(0,r.trim)(n)&&(this.historyList.unshift(n),this.historyList=(0,r.uniq)(this.historyList),e.setStorageSync("history",this.historyList)),this.searchValue="",e.redirectTo({url:"/pages/search/list?drug="+n})}},onLoad:function(){e.getStorageSync("history")&&(this.historyList=e.getStorageSync("history"))}};n.default=o}).call(this,t(1)["default"])}},[[171,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map