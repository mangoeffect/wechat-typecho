(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
	["pages/details/details"], {
		1070: function(e, t, o) {
			"use strict";
			(function(e) {
				o("60a3");
				n(o("66fd"));
				var t = n(o("b7eb"));

				function n(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}
				e(t.default)
			}).call(this, o("543d")["createPage"])
		},
		"10fc": function(e, t, o) {
			"use strict";
			o.d(t, "b", (function() {
				return s
			})), o.d(t, "c", (function() {
				return i
			})), o.d(t, "a", (function() {
				return n
			}));
			var n = {
					jyfParser: function() {
						return Promise.all([o.e("common/vendor"), o.e("components/jyf-parser/jyf-parser")]).then(o.bind(null, "02cb"))
					}
				},
				s = function() {
					var e = this,
						t = e.$createElement,
						o = (e._self._c, "1" == e.showshare && "0" != e.commentsNum ? e.__map(e.comments, (function(t, o) {
							var n = e.__get_orig(t),
								s = e.formatDate(t.created);
							return {
								$orig: n,
								m0: s
							}
						})) : null);
					e.$mp.data = Object.assign({}, {
						$root: {
							l0: o
						}
					})
				},
				i = []
		},
		"2e77": function(e, t, o) {
			"use strict";
			o.r(t);
			var n = o("cd6d"),
				s = o.n(n);
			for (var i in n) "default" !== i && function(e) {
				o.d(t, e, (function() {
					return n[e]
				}))
			}(i);
			t["default"] = s.a
		},
		"6e91": function(e, t, o) {},
		"7a4f": function(e, t, o) {
			"use strict";
			var n = o("6e91"),
				s = o.n(n);
			s.a
		},
		b7eb: function(e, t, o) {
			"use strict";
			o.r(t);
			var n = o("10fc"),
				s = o("2e77");
			for (var i in s) "default" !== i && function(e) {
				o.d(t, e, (function() {
					return s[e]
				}))
			}(i);
			o("7a4f");
			var a, c = o("f0c5"),
				r = Object(c["a"])(s["default"], n["b"], n["c"], !1, null, null, null, !1, n["a"], a);
			t["default"] = r.exports
		},
		cd6d: function(e, t, o) {
			"use strict";
			(function(e) {
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = void 0;
				var n = a(o("eb00")),
					s = a(o("3f2b")),
					i = a(o("db4f"));

				function a(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}
				var c = null,
					r = function() {
						Promise.all([o.e("common/vendor"), o.e("components/jyf-parser/jyf-parser")]).then(function() {
							return resolve(o("02cb"))
						}.bind(null, o)).catch(o.oe)
					},
					u = {
						data: function() {
							return {
								cid: "124",
								title: "",
								content: "",
								thumb: "",
								time: "",
								likes: "",
								views: "",
								mid: "",
								author: "",
								website: "",
								account: "",
								keyword: "",
								isPay: "",
								code: "",
								encrypted: "",
								showshare: "",
								commentsNum: "0",
								comments: [],
								commentText: "",
								vcode: "",
								decrypt: !1,
								showLogin: !1,
								userInfo: [],
								isLike: "false",
								showCmt: !1,
								showPoster: !1,
								poster: "",
								description: ""
							}
						},
						components: {
							jyfParser: r
						},
						onLoad: function(t) {
							this.cid = t.cid, console.log(this.cid), this.getArticle(), this.getComments(), this.getUserLike(), this.userInfo =
								e.getStorageSync("userInfo"), this.adLoad(), console.log(this.userInfo)
						},
						onShareAppMessage: function() {
							return {
								title: this.title,
								path: "/pages/details/details?cid=" + this.cid
							}
						},
						onShareTimeline: function() {
							return {
								title: this.title
							}
						},
						methods: {
							getArticle: function() {
								var t = this,
									o = this.cid;
								e.request({
									url: s.default.GetPostsbyCID(o),
									success: function(e) {
										var s = e.data.data[0];
										console.log(s), t.content = (0, n.default)(s.text).replace(/!!!/g, ""), t.title = s.title, t.showshare =
											s.showshare, t.thumb = s.thumb[0].str_value, t.time = s.year + "年" + s.month + "月" + s.day + "日", t.likes =
											s.likes[0].likes, t.views = s.views[0].views, t.commentsNum = s.commentsNum, t.mid = s.categories[0]
											.mid, t.author = s.author, t.website = s.website, t.account = s.account, t.keyword = s.keyword[0].str_value,
											t.isPay = s.isPay[0].str_value, t.code = s.code[0].str_value, t.encrypted = s.encrypted[0].str_value,
											t.description = s.description[0].str_value, t.getPostsbyMIDLimit(t.mid), t.getComments(o), console.log(
												t.description)
									}
								})
							},
							showInp: function() {
								this.showCmt = !this.showCmt
							},
							closePoster: function() {
								this.showPoster = !1
							},
							savePoster: function() {
								var t = this;
								e.saveImageToPhotosAlbum({
									filePath: this.poster,
									success: function(o) {
										e.showToast({
											title: "保存成功",
											icon: "none"
										}), t.showPoster = !1
									},
									fail: function(t) {
										e.showToast({
											title: "保存失败",
											icon: "none"
										})
									}
								})
							},
							getuserinfo: function() {
								var t = this;
								wx.login({
									success: function(o) {
										if (o.code) {
											var n = o.code;
											wx.getUserInfo({
												success: function(o) {
													o.userInfo.code = n, t.userInfo = o.userInfo, e.request({
														url: s.default.WXLogin(t.userInfo),
														success: function(o) {
															console.log(o), t.userInfo.openid = o.data.data, e.setStorageSync("userInfo", t.userInfo),
																e.setStorageSync("openid", t.userInfo.openid), t.showLogin = !1, console.log(t.userInfo)
														}
													})
												},
												fail: function(e) {}
											})
										}
									}
								})
							},
							getPoster: function() {
								e.showLoading({
									title: "海报生成中"
								});
								var t = this;
								e.downloadFile({
									url: t.thumb,
									success: function(o) {
										var n = o.tempFilePath,
											s = e.createCanvasContext("canvas");
										s.setFillStyle("white"), s.fillRect(0, 0, 350, 600), s.drawImage(n, 0, 0, 350, 200), s.setFontSize(16),
											s.setFillStyle("#1e1e1e");
										var i = t.title;
										s.fillText(i, 10, 230);
										var a = t.description,
											c = "",
											r = [];
										s.setFontSize(14), s.setFillStyle("#2f2f2f");
										for (var u = 0; u < a.length; u++) s.measureText(c).width < 292 ? c += a[u] : (u--, r.push(c), c = "");
										r.push(c);
										for (var l = 0; l < r.length; l++) s.fillText(r[l], 30, 270 + 35 * l, 300);
										var d = "../../static/wxcxm.png";
										s.drawImage(d, 130, 460, 100, 100), s.draw(!1, (function(o) {
											e.canvasToTempFilePath({
												canvasId: "canvas",
												width: 350,
												height: 600,
												success: function(o) {
													e.hideLoading(), t.showPoster = !0, t.poster = o.tempFilePath, console.log(t.poster)
												}
											})
										}))
									}
								})
							},
							adLoad: function() {
								var e = this;
								wx.createRewardedVideoAd && (c = wx.createRewardedVideoAd({
									adUnitId: i.default.adId.createRewardedVideoAd
								}), c.onLoad((function() {})), c.onError((function(e) {})), c.onClose((function(t) {
									(t && t.isEnded || void 0 === t) && (e.decrypt = !0)
								})))
							},
							adGet: function() {
								c && c.show().catch((function() {
									c.load().then((function() {
										return c.show()
									})).catch((function(e) {
										console.log("激励视频 广告显示失败")
									}))
								}))
							},
							addComment: function() {
								var t = this,
									o = e.getStorageSync("openid"),
									n = t.userInfo,
									i = t.commentText;
								o ? "" == i ? e.showToast({
									icon: "none",
									title: "总得写些什么吧"
								}) : e.request({
									url: s.default.Postcomment(t.cid, n.nickName, i, t.replaycoid, n.avatarUrl),
									success: function(o) {
										t.getComments(t.cid), t.commentText = "", e.showToast({
											title: "评论需要审核才可以显示",
											icon: "none"
										})
									}
								}) : this.showLogin = !0
							},
							colseLogin: function() {
								this.showLogin = !1
							},
							getUserLike: function() {
								var t = this,
									o = this.cid,
									n = e.getStorageSync("openid");
								e.request({
									url: s.default.Getuserlikedinfo(o, n),
									success: function(e) {
										t.isLike = e.data.data
									}
								})
							},
							fabulous: function() {
								var t = this,
									o = this.cid,
									n = e.getStorageSync("openid");
								n ? e.request({
									url: s.default.PostLike(o, n),
									success: function(e) {
										var o = e.data.data.status;
										"like" == o ? (t.isLike = "true", t.likes = t.likes + 1) : (t.isLike = "false", t.likes = t.likes - 1)
									}
								}) : this.showLogin = !0
							},
							getPostsbyMIDLimit: function(t) {
								var o = this;
								e.request({
									url: s.default.GetPostsbyMIDLimit(t, 3, o.cid),
									success: function(e) {
										0 == e.data.data.length || (o.relatedShow = !0, o.related = e.data.data)
									}
								})
							},
							copy: function(t) {
								e.setClipboardData({
									data: t,
									success: function() {
										e.showToast({
											icon: "none",
											title: "复制成功"
										})
									}
								})
							},
							getEncrypted: function() {
								this.vcode == this.code ? this.decrypt = !0 : e.showToast({
									icon: "none",
									title: "口令错误"
								})
							},
							formatDate: function(e) {
								e = new Date(parseInt(1e3 * e));
								var t = e.getFullYear(),
									o = ("0" + (e.getMonth() + 1)).slice(-2),
									n = ("0" + e.getDate()).slice(-2),
									s = (("0" + e.getHours()).slice(-2), ("0" + e.getMinutes()).slice(-2), t + "-" + o + "-" + n);
								return s
							},
							getComments: function() {
								var t = this;
								e.request({
									url: s.default.GetPostsCommentbyCID(t.cid),
									success: function(e) {
										t.comments = e.data.data, console.log(t.comments)
									}
								})
							}
						}
					};
				t.default = u
			}).call(this, o("543d")["default"])
		}
	},
	[
		["1070", "common/runtime", "common/vendor"]
	]
]);
