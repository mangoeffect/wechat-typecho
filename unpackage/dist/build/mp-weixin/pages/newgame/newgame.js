(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/newgame/newgame"], {
		"1be0": function(n, t, e) {
			"use strict";
			(function(n) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = void 0;
				var a = u(e("db4f"));

				function u(n) {
					return n && n.__esModule ? n : {
						default: n
					}
				}
				var i = {
					data: function() {
						return {
							list: [],
							title: "本程序由小创果开发"
						}
					},
					onLoad: function() {
						this.list = a.default.miniprogramlist, console.log(this.list)
					},
					methods: {
						navigateToMiniProgram: function(t) {
							n.navigateToMiniProgram({
								appId: t,
								path: "pages/index/index",
								success: function(n) {}
							})
						}
					}
				};
				t.default = i
			}).call(this, e("543d")["default"])
		},
		"2bdb": function(n, t, e) {
			"use strict";
			e.r(t);
			var a = e("a8f6"),
				u = e("d8f0");
			for (var i in u) "default" !== i && function(n) {
				e.d(t, n, (function() {
					return u[n]
				}))
			}(i);
			e("91e4");
			var o, r = e("f0c5"),
				c = Object(r["a"])(u["default"], a["b"], a["c"], !1, null, null, null, !1, a["a"], o);
			t["default"] = c.exports
		},
		"91e4": function(n, t, e) {
			"use strict";
			var a = e("af71"),
				u = e.n(a);
			u.a
		},
		a8f6: function(n, t, e) {
			"use strict";
			var a;
			e.d(t, "b", (function() {
				return u
			})), e.d(t, "c", (function() {
				return i
			})), e.d(t, "a", (function() {
				return a
			}));
			var u = function() {
					var n = this,
						t = n.$createElement;
					n._self._c
				},
				i = []
		},
		af71: function(n, t, e) {},
		c9da: function(n, t, e) {
			"use strict";
			(function(n) {
				e("60a3");
				a(e("66fd"));
				var t = a(e("2bdb"));

				function a(n) {
					return n && n.__esModule ? n : {
						default: n
					}
				}
				n(t.default)
			}).call(this, e("543d")["createPage"])
		},
		d8f0: function(n, t, e) {
			"use strict";
			e.r(t);
			var a = e("1be0"),
				u = e.n(a);
			for (var i in a) "default" !== i && function(n) {
				e.d(t, n, (function() {
					return a[n]
				}))
			}(i);
			t["default"] = u.a
		}
	},
	[
		["c9da", "common/runtime", "common/vendor"]
	]
]);
