(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-4295a437"], {
        7260: function (e, t, a) {
            "use strict";
            var n = a("1da1"),
                r = a("d4ec"),
                i = a("bee2"),
                o = a("262e"),
                c = a("2caf"),
                s = (a("99af"), a("d3b7"), a("96cf"), a("9ab4")),
                u = a("a026"),
                p = a("2fe1"),
                f = a("72bf"),
                l = a.n(f),
                d = a("bc3a"),
                h = a.n(d),
                m = a("264d"),
                b = a("1b40"),
                v = !1,
                y = function (e) {
                    Object(o["a"])(a, e);
                    var t = Object(c["a"])(a);

                    function a() {
                        var e;
                        return Object(r["a"])(this, a), e = t.apply(this, arguments), e.appToken = null, e.productType = null, e.iframeSrc = null, e.startTime = +new Date, e
                    }
                    return Object(i["a"])(a, [{
                        key: "onRouteQueryChanged",
                        value: function (e, t) {
                            e.projectId !== t.projectId && (this.iframeSrc = this.getIframeSrc(Object.assign({}, this.$route, {
                                query: e
                            })))
                        }
                    }, {
                        key: "timeZone",
                        get: function () {
                            return this.$store.state.curTimeType
                        }
                    }, {
                        key: "featchAppToken",
                        value: function () {
                            var e = Object(n["a"])(regeneratorRuntime.mark((function e() {
                                var t, a;
                                return regeneratorRuntime.wrap((function (e) {
                                    while (1) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.$http.get("/api/v2/aa/app-token");
                                        case 2:
                                            t = e.sent, a = t.data, this.appToken = a;
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));

                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t
                        }()
                    }, {
                        key: "getIframeSrc",
                        value: function (e) {
                            var t = Object.assign({}, e.query, {
                                    locale: "en" === this.$i18n.locale ? "en" : "zh",
                                    timezone: "UTC" === this.timeZone ? "UTC" : "Local",
                                    showProjectSelector: !1,
                                    appToken: this.appToken
                                }),
                                a = "".concat(e.path, "?").concat(l.a.stringify(t));
                            return "".concat(this.GlobalConfig.config.analyticsLabUrl).concat(a)
                        }
                    }, {
                        key: "bindIframeEvents",
                        value: function () {
                            window.addEventListener("message", this.getMessage, !1)
                        }
                    }, {
                        key: "unBindIframeEvents",
                        value: function () {
                            window.removeEventListener("message", this.getMessage, !1)
                        }
                    }, {
                        key: "handleLoad",
                        value: function () {
                            var e = {
                                type: "Iframe_".concat(this.productType),
                                time: +new Date - this.startTime
                            };
                            h.a.post(m["a"].page_time, e)
                        }
                    }, {
                        key: "getMessage",
                        value: function (e) {
                            if (v && console.info(e), !(e.data.source && -1 !== e.data.source.indexOf("vue") || e.data.type && -1 !== e.data.type.indexOf("webpack"))) {
                                var t = this.GlobalConfig.validHosts.indexOf(e.origin) >= 0;
                                if (t && e.data && this.$route.fullPath !== e.data) {
                                    if ("/unauthorized" === e.data) return void window.location.reload();
                                    if ("[object Object]" === Object.prototype.toString.call(e.data)) {
                                        if (e.data.cost_time) {
                                            var a = {
                                                type: "Alab_".concat(this.productType),
                                                time: +new Date - this.startTime
                                            };
                                            h.a.post(m["a"].page_time, a)
                                        }
                                    } else this.$router.push(e.data)
                                }
                            }
                        }
                    }, {
                        key: "mounted",
                        value: function () {
                            var e = Object(n["a"])(regeneratorRuntime.mark((function e() {
                                return regeneratorRuntime.wrap((function (e) {
                                    while (1) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.featchAppToken();
                                        case 2:
                                            this.iframeSrc = this.getIframeSrc(this.$route), this.bindIframeEvents();
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));

                            function t() {
                                return e.apply(this, arguments)
                            }
                            return t
                        }()
                    }, {
                        key: "beforeDestory",
                        value: function () {
                            this.unBindIframeEvents()
                        }
                    }]), a
                }(u["default"]);
            Object(s["a"])([Object(b["c"])("$route.query")], y.prototype, "onRouteQueryChanged", null), y = Object(s["a"])([Object(p["b"])({
                template: '\n    <div class="iframe-layout">\n      <iframe\n        :src="iframeSrc"\n        frameborder="0"\n        width="100%"\n        height="100%"\n        importance="high"\n        sandbox="allow-same-origin allow-scripts allow-popups allow-downloads"\n        @load="handleLoad"\n      >\n      </iframe>\n    </div>\n  '
            })], y), t["a"] = y
        },
        "918c": function (e, t, a) {
            "use strict";
            a.r(t);
            var n = a("d4ec"),
                r = a("262e"),
                i = a("2caf"),
                o = a("9ab4"),
                c = a("a026"),
                s = a("2fe1"),
                u = a("7260"),
                p = function (e) {
                    Object(r["a"])(a, e);
                    var t = Object(i["a"])(a);

                    function a() {
                        var e;
                        return Object(n["a"])(this, a), e = t.apply(this, arguments), e.productType = "fpaOverview", e
                    }
                    return a
                }(c["default"]);
            p = Object(o["a"])([Object(s["b"])({
                mixins: [u["a"]]
            })], p), t["default"] = p
        }
    }
]);