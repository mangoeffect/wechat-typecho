(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{1516:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,u="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(a,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};n.default=a}).call(this,a("543d")["default"])},"69d0":function(t,n,a){"use strict";a.r(n);var u=a("1516"),e=a.n(u);for(var r in u)"default"!==r&&function(t){a.d(n,t,(function(){return u[t]}))}(r);n["default"]=e.a},b5d2:function(t,n,a){"use strict";a.r(n);var u=a("d54b"),e=a("69d0");for(var r in e)"default"!==r&&function(t){a.d(n,t,(function(){return e[t]}))}(r);var c,o=a("f0c5"),i=Object(o["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=i.exports},d54b:function(t,n,a){"use strict";var u;a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return u}));var e=function(){var t=this,n=t.$createElement;t._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b5d2"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);