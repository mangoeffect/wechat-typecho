(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/account/account"], {
		1491: function(t, n, u) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			var e = c(u("db4f"));

			function c(t) {
				return t && t.__esModule ? t : {
					default: t
				}
			}
			var r = {
				data: function() {
					return {
						url: "https://i4qq.com"
					}
				},
				onLoad: function() {
					console.log(e.default.accountUrl), this.url = e.default.accountUrl
				},
				methods: {}
			};
			n.default = r
		},
		"201c": function(t, n, u) {
			"use strict";
			(function(t) {
				u("60a3");
				e(u("66fd"));
				var n = e(u("9618"));

				function e(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				t(n.default)
			}).call(this, u("543d")["createPage"])
		},
		"3dc8": function(t, n, u) {
			"use strict";
			u.r(n);
			var e = u("1491"),
				c = u.n(e);
			for (var r in e) "default" !== r && function(t) {
				u.d(n, t, (function() {
					return e[t]
				}))
			}(r);
			n["default"] = c.a
		},
		9618: function(t, n, u) {
			"use strict";
			u.r(n);
			var e = u("df5d"),
				c = u("3dc8");
			for (var r in c) "default" !== r && function(t) {
				u.d(n, t, (function() {
					return c[t]
				}))
			}(r);
			var o, a = u("f0c5"),
				f = Object(a["a"])(c["default"], e["b"], e["c"], !1, null, null, null, !1, e["a"], o);
			n["default"] = f.exports
		},
		df5d: function(t, n, u) {
			"use strict";
			var e;
			u.d(n, "b", (function() {
				return c
			})), u.d(n, "c", (function() {
				return r
			})), u.d(n, "a", (function() {
				return e
			}));
			var c = function() {
					var t = this,
						n = t.$createElement;
					t._self._c
				},
				r = []
		}
	},
	[
		["201c", "common/runtime", "common/vendor"]
	]
]);
