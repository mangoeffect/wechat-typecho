(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/sort/sort"], {
		"17a1": function(t, n, a) {
			"use strict";
			a.r(n);
			var e = a("ca03"),
				u = a("2508");
			for (var o in u) "default" !== o && function(t) {
				a.d(n, t, (function() {
					return u[t]
				}))
			}(o);
			a("bdbb");
			var r, c = a("f0c5"),
				i = Object(c["a"])(u["default"], e["b"], e["c"], !1, null, null, null, !1, e["a"], r);
			n["default"] = i.exports
		},
		2508: function(t, n, a) {
			"use strict";
			a.r(n);
			var e = a("28a7"),
				u = a.n(e);
			for (var o in e) "default" !== o && function(t) {
				a.d(n, t, (function() {
					return e[t]
				}))
			}(o);
			n["default"] = u.a
		},
		"28a7": function(t, n, a) {
			"use strict";
			(function(t) {
				Object.defineProperty(n, "__esModule", {
					value: !0
				}), n.default = void 0;
				var e = u(a("3f2b"));

				function u(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var o = {
					data: function() {
						return {
							catList: []
						}
					},
					onLoad: function() {
						this.getCat()
					},
					methods: {
						getCat: function() {
							var n = this;
							t.request({
								url: e.default.GetCat()
							}).then((function(t) {
								console.log(t), n.catList = t[1].data.data
							}))
						},
						goSortList: function(n, a) {
							t.navigateTo({
								url: "/pages/sortList/sortList?mid=" + n + "&name=" + a
							})
						}
					}
				};
				n.default = o
			}).call(this, a("543d")["default"])
		},
		"86b7": function(t, n, a) {},
		bdbb: function(t, n, a) {
			"use strict";
			var e = a("86b7"),
				u = a.n(e);
			u.a
		},
		ca03: function(t, n, a) {
			"use strict";
			var e;
			a.d(n, "b", (function() {
				return u
			})), a.d(n, "c", (function() {
				return o
			})), a.d(n, "a", (function() {
				return e
			}));
			var u = function() {
					var t = this,
						n = t.$createElement;
					t._self._c
				},
				o = []
		},
		f911: function(t, n, a) {
			"use strict";
			(function(t) {
				a("60a3");
				e(a("66fd"));
				var n = e(a("17a1"));

				function e(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				t(n.default)
			}).call(this, a("543d")["createPage"])
		}
	},
	[
		["f911", "common/runtime", "common/vendor"]
	]
]);
