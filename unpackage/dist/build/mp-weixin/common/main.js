(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["common/main"], {
		6897: function(t, e, o) {},
		9358: function(t, e, o) {
			"use strict";
			(function(t) {
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = void 0;
				var n = r(o("66fd"));

				function r(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var c = {
					onLaunch: function() {
						t.getSystemInfo({
							success: function(t) {
								n.default.prototype.StatusBar = t.statusBarHeight;
								var e = wx.getMenuButtonBoundingClientRect();
								n.default.prototype.Custom = e, n.default.prototype.CustomBar = e.bottom + e.top - t.statusBarHeight
							}
						}), n.default.prototype.ColorList = [{
							title: "嫣红",
							name: "red",
							color: "#e54d42"
						}, {
							title: "桔橙",
							name: "orange",
							color: "#f37b1d"
						}, {
							title: "明黄",
							name: "yellow",
							color: "#fbbd08"
						}, {
							title: "橄榄",
							name: "olive",
							color: "#8dc63f"
						}, {
							title: "森绿",
							name: "green",
							color: "#39b54a"
						}, {
							title: "天青",
							name: "cyan",
							color: "#1cbbb4"
						}, {
							title: "海蓝",
							name: "blue",
							color: "#0081ff"
						}, {
							title: "姹紫",
							name: "purple",
							color: "#6739b6"
						}, {
							title: "木槿",
							name: "mauve",
							color: "#9c26b0"
						}, {
							title: "桃粉",
							name: "pink",
							color: "#e03997"
						}, {
							title: "棕褐",
							name: "brown",
							color: "#a5673f"
						}, {
							title: "玄灰",
							name: "grey",
							color: "#8799a3"
						}, {
							title: "草灰",
							name: "gray",
							color: "#aaaaaa"
						}, {
							title: "墨黑",
							name: "black",
							color: "#333333"
						}, {
							title: "雅白",
							name: "white",
							color: "#ffffff"
						}]
					},
					onShow: function() {
						console.log("App Show")
					},
					onHide: function() {
						console.log("App Hide")
					}
				};
				e.default = c
			}).call(this, o("543d")["default"])
		},
		b55a: function(t, e, o) {
			"use strict";
			o.r(e);
			var n = o("9358"),
				r = o.n(n);
			for (var c in n) "default" !== c && function(t) {
				o.d(e, t, (function() {
					return n[t]
				}))
			}(c);
			e["default"] = r.a
		},
		c147: function(t, e, o) {
			"use strict";
			o.r(e);
			var n = o("b55a");
			for (var r in n) "default" !== r && function(t) {
				o.d(e, t, (function() {
					return n[t]
				}))
			}(r);
			o("dfdc");
			var c, a, l, u, i = o("f0c5"),
				f = Object(i["a"])(n["default"], c, a, !1, null, null, null, !1, l, u);
			e["default"] = f.exports
		},
		c679: function(t, e, o) {
			"use strict";
			(function(t) {
				o("60a3");
				var e = r(o("66fd")),
					n = r(o("c147"));

				function r(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}

				function c(t, e) {
					var o = Object.keys(t);
					if (Object.getOwnPropertySymbols) {
						var n = Object.getOwnPropertySymbols(t);
						e && (n = n.filter((function(e) {
							return Object.getOwnPropertyDescriptor(t, e).enumerable
						}))), o.push.apply(o, n)
					}
					return o
				}

				function a(t) {
					for (var e = 1; e < arguments.length; e++) {
						var o = null != arguments[e] ? arguments[e] : {};
						e % 2 ? c(Object(o), !0).forEach((function(e) {
							l(t, e, o[e])
						})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : c(
							Object(o)).forEach((function(e) {
							Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
						}))
					}
					return t
				}

				function l(t, e, o) {
					return e in t ? Object.defineProperty(t, e, {
						value: o,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : t[e] = o, t
				}
				var u = function() {
					o.e("colorui/components/cu-custom").then(function() {
						return resolve(o("b5d2"))
					}.bind(null, o)).catch(o.oe)
				};
				e.default.component("cu-custom", u), e.default.config.productionTip = !1, n.default.mpType = "app";
				var i = new e.default(a({}, n.default));
				t(i).$mount()
			}).call(this, o("543d")["createApp"])
		},
		dfdc: function(t, e, o) {
			"use strict";
			var n = o("6897"),
				r = o.n(n);
			r.a
		}
	},
	[
		["c679", "common/runtime", "common/vendor"]
	]
]);
