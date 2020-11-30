(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/mine/mine"], {
		"0b73": function(n, t, e) {
			"use strict";
			(function(n) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = void 0;
				var o = u(e("db4f"));

				function u(n) {
					return n && n.__esModule ? n : {
						default: n
					}
				}
				var c = {
					data: function() {
						return {
							miniprogramlist: []
						}
					},
					onLoad: function() {
						this.miniprogramlist = o.default.miniprogramlist, console.log(this.miniprogramlist)
					},
					methods: {
						openSetting: function() {
							n.openSetting({
								success: function(n) {
									console.log(n.authSetting)
								}
							})
						},
						clearStorageSync: function() {
							n.clearStorageSync(), n.showToast({
								icon: "none",
								title: "缓存已清除"
							})
						},
						surprise: function() {
							n.showToast({
								icon: "none",
								title: "敬请期待..."
							})
						},
						goAccount: function() {
							n.navigateTo({
								url: "/pages/account/account"
							})
						},
						goMore: function() {
							n.navigateTo({
								url: "/pages/newgame/newgame"
							})
						}
					}
				};
				t.default = c
			}).call(this, e("543d")["default"])
		},
		"14b0": function(n, t, e) {
			"use strict";
			e.r(t);
			var o = e("55dd"),
				u = e("4c7b");
			for (var c in u) "default" !== c && function(n) {
				e.d(t, n, (function() {
					return u[n]
				}))
			}(c);
			e("e46a");
			var a, i = e("f0c5"),
				r = Object(i["a"])(u["default"], o["b"], o["c"], !1, null, null, null, !1, o["a"], a);
			t["default"] = r.exports
		},
		"4c7b": function(n, t, e) {
			"use strict";
			e.r(t);
			var o = e("0b73"),
				u = e.n(o);
			for (var c in o) "default" !== c && function(n) {
				e.d(t, n, (function() {
					return o[n]
				}))
			}(c);
			t["default"] = u.a
		},
		"55dd": function(n, t, e) {
			"use strict";
			var o;
			e.d(t, "b", (function() {
				return u
			})), e.d(t, "c", (function() {
				return c
			})), e.d(t, "a", (function() {
				return o
			}));
			var u = function() {
					var n = this,
						t = n.$createElement;
					n._self._c
				},
				c = []
		},
		cd2c: function(n, t, e) {},
		d116: function(n, t, e) {
			"use strict";
			(function(n) {
				e("60a3");
				o(e("66fd"));
				var t = o(e("14b0"));

				function o(n) {
					return n && n.__esModule ? n : {
						default: n
					}
				}
				n(t.default)
			}).call(this, e("543d")["createPage"])
		},
		e46a: function(n, t, e) {
			"use strict";
			var o = e("cd2c"),
				u = e.n(o);
			u.a
		}
	},
	[
		["d116", "common/runtime", "common/vendor"]
	]
]);
