(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-count-down/u-count-down"],{399:function(t,n,e){"use strict";e.r(n);var i=e(400),r=e(402);for(var u in r)"default"!==u&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e(406);var o,a=e(14),c=Object(a["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"463368ae",null,!1,i["components"],o);c.options.__file="uni_modules/uview-ui/components/u-count-down/u-count-down.vue",n["default"]=c.exports},400:function(t,n,e){"use strict";e.r(n);var i=e(401);e.d(n,"render",(function(){return i["render"]})),e.d(n,"staticRenderFns",(function(){return i["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return i["recyclableRender"]})),e.d(n,"components",(function(){return i["components"]}))},401:function(t,n,e){"use strict";var i;e.r(n),e.d(n,"render",(function(){return r})),e.d(n,"staticRenderFns",(function(){return o})),e.d(n,"recyclableRender",(function(){return u})),e.d(n,"components",(function(){return i}));var r=function(){var t=this,n=t.$createElement;t._self._c},u=!1,o=[];r._withStripped=!0},402:function(t,n,e){"use strict";e.r(n);var i=e(403),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},403:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=u(e(404)),r=e(405);function u(t){return t&&t.__esModule?t:{default:t}}var o={name:"u-count-down",mixins:[t.$u.mpMixin,t.$u.mixin,i.default],data:function(){return{timer:null,timeData:(0,r.parseTimeData)(0),formattedTime:"0",runing:!1,endTime:0,remainTime:0}},watch:{time:function(t){this.reset()}},mounted:function(){this.init()},methods:{init:function(){this.reset()},start:function(){this.runing||(this.runing=!0,this.endTime=Date.now()+this.remainTime,this.toTick())},toTick:function(){this.millisecond?this.microTick():this.macroTick()},macroTick:function(){var t=this;this.clearTimeout(),this.timer=setTimeout((function(){var n=t.getRemainTime();(0,r.isSameSecond)(n,t.remainTime)&&0!==n||t.setRemainTime(n),0!==t.remainTime&&t.macroTick()}),30)},microTick:function(){var t=this;this.clearTimeout(),this.timer=setTimeout((function(){t.setRemainTime(t.getRemainTime()),0!==t.remainTime&&t.microTick()}),50)},getRemainTime:function(){return Math.max(this.endTime-Date.now(),0)},setRemainTime:function(t){this.remainTime=t;var n=(0,r.parseTimeData)(t);this.$emit("change",n),this.formattedTime=(0,r.parseFormat)(this.format,n),t<=0&&(this.pause(),this.$emit("finish"))},reset:function(){this.pause(),this.remainTime=this.time,this.setRemainTime(this.remainTime),this.autoStart&&this.start()},pause:function(){this.runing=!1,this.clearTimeout()},clearTimeout:function(t){function n(){return t.apply(this,arguments)}return n.toString=function(){return t.toString()},n}((function(){clearTimeout(this.timer),this.timer=null}))},beforeDestroy:function(){this.clearTimeout()}};n.default=o}).call(this,e(1)["default"])},406:function(t,n,e){"use strict";e.r(n);var i=e(407),r=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},407:function(t,n,e){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-ui/components/u-count-down/u-count-down.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-count-down/u-count-down-create-component',
    {
        'uni_modules/uview-ui/components/u-count-down/u-count-down-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(399))
        })
    },
    [['uni_modules/uview-ui/components/u-count-down/u-count-down-create-component']]
]);
