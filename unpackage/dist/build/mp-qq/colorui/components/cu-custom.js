(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{1516:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,u="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(n,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("a821")["default"])},"69d0":function(t,a,n){"use strict";n.r(a);var u=n("1516"),e=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(a,t,(function(){return u[t]}))}(r);a["default"]=e.a},b5d2:function(t,a,n){"use strict";n.r(a);var u=n("d54b"),e=n("69d0");for(var r in e)"default"!==r&&function(t){n.d(a,t,(function(){return e[t]}))}(r);var c,o=n("f0c5"),i=Object(o["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);a["default"]=i.exports},d54b:function(t,a,n){"use strict";var u;n.d(a,"b",(function(){return e})),n.d(a,"c",(function(){return r})),n.d(a,"a",(function(){return u}));var e=function(){var t=this,a=t.$createElement;t._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('a821')['createComponent'](__webpack_require__("b5d2"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
