// 该程序为阳光艺创站小创果独立开发 
// 小程序使用教程请访问www.i4qq.com进行查看 
// 官方唯一指定交流群：927510477 
// 删除上述文字将不会获得维护 
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/index/index"], {
		"0e04": function(t, e, a) {
			"use strict";
			(function(t) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = void 0;
				var n = o(a("3f2b")),
					i = o(a("db4f"));

				function o(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var u = 2,
					s = {
						data: function() {
							return {
								haiBao: [],
								articleList: [],
								sortList: [],
								recommend: []
							}
						},
						onLoad: function() {
							this.sortList = i.default.hotList, this.getHaibao(), this.getArticleList(), this.getRecommend()
						},
						onShareAppMessage: function() {
							return {
								title: "快来看看这个小程序，真心不错噢！",
								imageUrl: "",
								path: "/pages/index/index"
							}
						},
						onShareTimeline: function() {
							return {
								title: "快来看看这个小程序，真心不错噢！",
								imageUrl: "",
								path: "/pages/index/index"
							}
						},
						onReachBottom: function() {
							this.getNewArticleList()
						},
						methods: {
							getHaibao: function() {
								var e = this;
								t.request({
									url: n.default.GetSwiperPost(),
									success: function(t) {
										e.haiBao = t.data.data, console.log(t.data.data)
									}
								})
							},
							getArticleList: function() {
								var e = this;
								t.request({
									url: n.default.GetPosts(),
									success: function(t) {
										console.log(t.data.data), e.articleList = t.data.data
									}
								})
							},
							getNewArticleList: function() {
								var e = this;
								t.request({
									url: n.default.GetPosts(),
									data: {
										page: u
									},
									success: function(t) {
										"403" != t.data.status && (u++, e.articleList = e.articleList.concat(t.data.data))
									}
								})
							},
							goSortList: function(e, a) {
								t.navigateTo({
									url: "/pages/sortList/sortList?mid=" + e + "&name=" + a
								})
							},
							goDetails: function(e) {
								t.navigateTo({
									url: "/pages/details/details?cid=" + e
								})
							},
							getRecommend: function() {
								var e = this;
								t.request({
									url: n.default.GetRecommend(),
									success: function(t) {
										e.recommend = t.data.data, console.log(t.data.data)
									}
								})
							}
						}
					};
				e.default = s
			}).call(this, a("543d")["default"])
		},
		"120d": function(t, e, a) {},
		2120: function(t, e, a) {
			"use strict";
			var n;
			a.d(e, "b", (function() {
				return i
			})), a.d(e, "c", (function() {
				return o
			})), a.d(e, "a", (function() {
				return n
			}));
			var i = function() {
					var t = this,
						e = t.$createElement;
					t._self._c
				},
				o = []
		},
		3158: function(t, e, a) {
			"use strict";
			(function(t) {
				a("60a3");
				n(a("66fd"));
				var e = n(a("a801"));

				function n(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				t(e.default)
			}).call(this, a("543d")["createPage"])
		},
		5701: function(t, e, a) {
			"use strict";
			var n = a("120d"),
				i = a.n(n);
			i.a
		},
		a801: function(t, e, a) {
			"use strict";
			a.r(e);
			var n = a("2120"),
				i = a("dabd");
			for (var o in i) "default" !== o && function(t) {
				a.d(e, t, (function() {
					return i[t]
				}))
			}(o);
			a("5701");
			var u, s = a("f0c5"),
				r = Object(s["a"])(i["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], u);
			e["default"] = r.exports
		},
		dabd: function(t, e, a) {
			"use strict";
			a.r(e);
			var n = a("0e04"),
				i = a.n(n);
			for (var o in n) "default" !== o && function(t) {
				a.d(e, t, (function() {
					return n[t]
				}))
			}(o);
			e["default"] = i.a
		}
	},
	[
		["3158", "common/runtime", "common/vendor"]
	]
]);