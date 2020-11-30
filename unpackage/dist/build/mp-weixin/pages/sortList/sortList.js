(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/sortList/sortList"], {
		"4a0c": function(t, n, e) {
			"use strict";
			var a;
			e.d(n, "b", (function() {
				return i
			})), e.d(n, "c", (function() {
				return o
			})), e.d(n, "a", (function() {
				return a
			}));
			var i = function() {
					var t = this,
						n = t.$createElement;
					t._self._c
				},
				o = []
		},
		8370: function(t, n, e) {
			"use strict";
			(function(t) {
				Object.defineProperty(n, "__esModule", {
					value: !0
				}), n.default = void 0;
				var a = o(e("3f2b")),
					i = o(e("db4f"));

				function o(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var u = null,
					r = {
						data: function() {
							return {
								mid: "99999999",
								name: "",
								articleList: []
							}
						},
						onLoad: function(t) {
							this.mid = t.mid, this.name = t.name, this.getCategoriesList(), this.adLoad()
						},
						onShow: function() {
							u && u.show().catch((function(t) {
								console.error(t)
							}))
						},
						methods: {
							adLoad: function() {
								wx.createInterstitialAd && (u = wx.createInterstitialAd({
									adUnitId: i.default.adId.interstitialAd
								}), u.onLoad((function() {})), u.onError((function(t) {})), u.onClose((function() {})))
							},
							getCategoriesList: function() {
								var n = this,
									e = this.mid;
								t.request({
									url: a.default.GetPostsbyMID(e),
									success: function(t) {
										console.log(t), n.articleList = t.data.data
									}
								})
							},
							goDetails: function(n) {
								t.navigateTo({
									url: "/pages/details/details?cid=" + n
								})
							}
						}
					};
				n.default = r
			}).call(this, e("543d")["default"])
		},
		"84f0": function(t, n, e) {
			"use strict";
			e.r(n);
			var a = e("4a0c"),
				i = e("99bf");
			for (var o in i) "default" !== o && function(t) {
				e.d(n, t, (function() {
					return i[t]
				}))
			}(o);
			e("cf33");
			var u, r = e("f0c5"),
				c = Object(r["a"])(i["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], u);
			n["default"] = c.exports
		},
		"99bf": function(t, n, e) {
			"use strict";
			e.r(n);
			var a = e("8370"),
				i = e.n(a);
			for (var o in a) "default" !== o && function(t) {
				e.d(n, t, (function() {
					return a[t]
				}))
			}(o);
			n["default"] = i.a
		},
		"9ba3": function(t, n, e) {},
		cf33: function(t, n, e) {
			"use strict";
			var a = e("9ba3"),
				i = e.n(a);
			i.a
		},
		d266: function(t, n, e) {
			"use strict";
			(function(t) {
				e("60a3");
				a(e("66fd"));
				var n = a(e("84f0"));

				function a(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				t(n.default)
			}).call(this, e("543d")["createPage"])
		}
	},
	[
		["d266", "common/runtime", "common/vendor"]
	]
]);
