
function s(t) {
    var n = {
        i: t,
        l: !1,
        exports: {}
    };
    return e[t].call(n.exports, n, n.exports, s),
        n.l = !0,
        n.exports
}

let e = {
    "41d0": function (t, e) {
        function r(t, e) {
            const r = []
                , n = ~~(e / 8)
                , i = e % 8;
            for (let e = 0, o = t.length; e < o; e++)
                r[e] = (t[(e + n) % o] << i & 255) + (t[(e + n + 1) % o] >>> 8 - i & 255);
            return r
        }
        function n(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = 255 & (t[n] ^ e[n]);
            return r
        }
        function i(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = t[n] & e[n] & 255;
            return r
        }
        function o(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = 255 & (t[n] | e[n]);
            return r
        }
        function s(t, e) {
            const r = [];
            let n = 0;
            for (let i = t.length - 1; i >= 0; i--) {
                const o = t[i] + e[i] + n;
                o > 255 ? (n = 1,
                    r[i] = 255 & o) : (n = 0,
                        r[i] = 255 & o)
            }
            return r
        }
        function a(t) {
            return n(n(t, r(t, 9)), r(t, 17))
        }
        function c(t, e, r, s) {
            return s >= 0 && s <= 15 ? n(n(t, e), r) : o(o(i(t, e), i(t, r)), i(e, r))
        }
        function u(t, e, r, s) {
            return s >= 0 && s <= 15 ? n(n(t, e), r) : o(i(t, e), i(function (t) {
                const e = [];
                for (let r = t.length - 1; r >= 0; r--)
                    e[r] = 255 & ~t[r];
                return e
            }(t), r))
        }
        function l(t, e) {
            const i = []
                , o = [];
            for (let t = 0; t < 16; t++) {
                const r = 4 * t;
                i.push(e.slice(r, r + 4))
            }
            for (let t = 16; t < 68; t++)
                i.push(n(n((l = n(n(i[t - 16], i[t - 9]), r(i[t - 3], 15)),
                    n(n(l, r(l, 15)), r(l, 23))), r(i[t - 13], 7)), i[t - 6]));
            var l;
            for (let t = 0; t < 64; t++)
                o.push(n(i[t], i[t + 4]));
            const f = [121, 204, 69, 25]
                , h = [122, 135, 157, 138];
            let p, d, y, g, m = t.slice(0, 4), v = t.slice(4, 8), b = t.slice(8, 12), w = t.slice(12, 16), A = t.slice(16, 20), S = t.slice(20, 24), x = t.slice(24, 28), B = t.slice(28, 32);
            for (let t = 0; t < 64; t++) {
                const e = t >= 0 && t <= 15 ? f : h;
                p = r(s(s(r(m, 12), A), r(e, t)), 7),
                    d = n(p, r(m, 12)),
                    y = s(s(s(c(m, v, b, t), w), d), o[t]),
                    g = s(s(s(u(A, S, x, t), B), p), i[t]),
                    w = b,
                    b = r(v, 9),
                    v = m,
                    m = y,
                    B = x,
                    x = r(S, 19),
                    S = A,
                    A = a(g)
            }
            return n([].concat(m, v, b, w, A, S, x, B), t)
        }
        function f(t) {
            let e = 8 * t.length
                , r = e % 512;
            r = r >= 448 ? 512 - r % 448 - 1 : 448 - r - 1;
            const n = new Array((r - 7) / 8);
            for (let t = 0, e = n.length; t < e; t++)
                n[t] = 0;
            const i = [];
            e = e.toString(2);
            for (let t = 7; t >= 0; t--)
                if (e.length > 8) {
                    const r = e.length - 8;
                    i[t] = parseInt(e.substr(r), 2),
                        e = e.substr(0, r)
                } else
                    e.length > 0 ? (i[t] = parseInt(e, 2),
                        e = "") : i[t] = 0;
            const o = [].concat(t, [128], n, i)
                , s = o.length / 64;
            let a = [115, 128, 22, 111, 73, 20, 178, 185, 23, 36, 66, 215, 218, 138, 6, 0, 169, 111, 48, 188, 22, 49, 56, 170, 227, 141, 238, 77, 176, 251, 14, 78];
            for (let t = 0; t < s; t++) {
                const e = 64 * t;
                a = l(a, o.slice(e, e + 64))
            }
            return a
        }
        const h = new Array(64)
            , p = new Array(64);
        for (let t = 0; t < 64; t++)
            h[t] = 54,
                p[t] = 92;
        t.exports = {
            sm3: f,
            hmac: function (t, e) {
                for (e.length > 64 && (e = f(e)); e.length < 64;)
                    e.push(0);
                let r = n(e, h).concat(t);
                return r = f(r),
                    r = n(e, p).concat(r),
                    r = f(r),
                    r
            }
        }
    },
    "526b": function (t, e, r) {
        const { BigInteger: n } = r("f33e")
            , { encodeDer: i, decodeDer: o } = r("f9dd")
            , s = r("dffd")
            , a = r("41d0").sm3
            , { G: c, curve: u, n: l } = s.generateEcparam();
        function f(t, e, r = "1234567812345678") {
            r = s.utf8ToHex(r);
            const n = s.leftPad(c.curve.a.toBigInteger().toRadix(16), 64)
                , i = s.leftPad(c.curve.b.toBigInteger().toRadix(16), 64)
                , o = s.leftPad(c.getX().toBigInteger().toRadix(16), 64)
                , u = s.leftPad(c.getY().toBigInteger().toRadix(16), 64);
            let l, f;
            if (128 === e.length)
                l = e.substr(0, 64),
                    f = e.substr(64, 64);
            else {
                const t = c.curve.decodePointHex(e);
                l = s.leftPad(t.getX().toBigInteger().toRadix(16), 64),
                    f = s.leftPad(t.getY().toBigInteger().toRadix(16), 64)
            }
            const h = s.hexToArray(r + n + i + o + u + l + f)
                , p = 4 * r.length;
            h.unshift(255 & p),
                h.unshift(p >> 8 & 255);
            const d = a(h);
            return s.arrayToHex(a(d.concat(s.hexToArray(t))))
        }
        function h() {
            const t = s.generateKeyPairHex()
                , e = u.decodePointHex(t.publicKey);
            return t.k = new n(t.privateKey, 16),
                t.x1 = e.getX().toBigInteger(),
                t
        }
        t.exports = {
            generateKeyPairHex: s.generateKeyPairHex,
            compressPublicKeyHex: s.compressPublicKeyHex,
            comparePublicKeyHex: s.comparePublicKeyHex,
            doEncrypt: function (t, e, r = 1) {
                t = "string" == typeof t ? s.hexToArray(s.utf8ToHex(t)) : Array.prototype.slice.call(t),
                    e = s.getGlobalCurve().decodePointHex(e);
                const i = s.generateKeyPairHex()
                    , o = new n(i.privateKey, 16);
                let c = i.publicKey;
                c.length > 128 && (c = c.substr(c.length - 128));
                const u = e.multiply(o)
                    , l = s.hexToArray(s.leftPad(u.getX().toBigInteger().toRadix(16), 64))
                    , f = s.hexToArray(s.leftPad(u.getY().toBigInteger().toRadix(16), 64))
                    , h = s.arrayToHex(a([].concat(l, t, f)));
                let p = 1
                    , d = 0
                    , y = [];
                const g = [].concat(l, f)
                    , m = () => {
                        y = a([...g, p >> 24 & 255, p >> 16 & 255, p >> 8 & 255, 255 & p]),
                            p++,
                            d = 0
                    }
                    ;
                m();
                for (let e = 0, r = t.length; e < r; e++)
                    d === y.length && m(),
                        t[e] ^= 255 & y[d++];
                const v = s.arrayToHex(t);
                return 0 === r ? c + v + h : c + h + v
            },
            doDecrypt: function (t, e, r = 1, { output: i = "string" } = {}) {
                e = new n(e, 16);
                let o = t.substr(128, 64)
                    , c = t.substr(192);
                0 === r && (o = t.substr(t.length - 64),
                    c = t.substr(128, t.length - 128 - 64));
                const u = s.hexToArray(c)
                    , l = s.getGlobalCurve().decodePointHex("04" + t.substr(0, 128)).multiply(e)
                    , f = s.hexToArray(s.leftPad(l.getX().toBigInteger().toRadix(16), 64))
                    , h = s.hexToArray(s.leftPad(l.getY().toBigInteger().toRadix(16), 64));
                let p = 1
                    , d = 0
                    , y = [];
                const g = [].concat(f, h)
                    , m = () => {
                        y = a([...g, p >> 24 & 255, p >> 16 & 255, p >> 8 & 255, 255 & p]),
                            p++,
                            d = 0
                    }
                    ;
                m();
                for (let t = 0, e = u.length; t < e; t++)
                    d === y.length && m(),
                        u[t] ^= 255 & y[d++];
                return s.arrayToHex(a([].concat(f, u, h))) === o.toLowerCase() ? "array" === i ? u : s.arrayToUtf8(u) : "array" === i ? [] : ""
            },
            doSignature: function (t, e, { pointPool: r, der: o, hash: a, publicKey: u, userId: p } = {}) {
                let d = "string" == typeof t ? s.utf8ToHex(t) : s.arrayToHex(t);
                a && (d = f(d, u = u || function (t) {
                    const e = c.multiply(new n(t, 16))
                        , r = s.leftPad(e.getX().toBigInteger().toString(16), 64)
                        , i = s.leftPad(e.getY().toBigInteger().toString(16), 64);
                    return "04" + r + i
                }(e), p));
                const y = new n(e, 16)
                    , g = new n(d, 16);
                let m = null
                    , v = null
                    , b = null;
                do {
                    do {
                        let t;
                        t = r && r.length ? r.pop() : h(),
                            m = t.k,
                            v = g.add(t.x1).mod(l)
                    } while (v.equals(n.ZERO) || v.add(m).equals(l));
                    b = y.add(n.ONE).modInverse(l).multiply(m.subtract(v.multiply(y))).mod(l)
                } while (b.equals(n.ZERO));
                return o ? i(v, b) : s.leftPad(v.toString(16), 64) + s.leftPad(b.toString(16), 64)
            },
            doVerifySignature: function (t, e, r, { der: i, hash: a, userId: h } = {}) {
                let p, d, y = "string" == typeof t ? s.utf8ToHex(t) : s.arrayToHex(t);
                if (a && (y = f(y, r, h)),
                    i) {
                    const t = o(e);
                    p = t.r,
                        d = t.s
                } else
                    p = new n(e.substring(0, 64), 16),
                        d = new n(e.substring(64), 16);
                const g = u.decodePointHex(r)
                    , m = new n(y, 16)
                    , v = p.add(d).mod(l);
                if (v.equals(n.ZERO))
                    return !1;
                const b = c.multiply(d).add(g.multiply(v))
                    , w = m.add(b.getX().toBigInteger()).mod(l);
                return p.equals(w)
            },
            getPoint: h,
            verifyPublicKey: s.verifyPublicKey
        }
    }, f9dd: function (t, e, r) {
        const { BigInteger: n } = r("f33e");
        class i {
            constructor() {
                this.tlv = null,
                    this.t = "00",
                    this.l = "00",
                    this.v = ""
            }
            getEncodedHex() {
                return this.tlv || (this.v = this.getValue(),
                    this.l = this.getLength(),
                    this.tlv = this.t + this.l + this.v),
                    this.tlv
            }
            getLength() {
                const t = this.v.length / 2;
                let e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                    t < 128)
                    return e;
                return (128 + e.length / 2).toString(16) + e
            }
            getValue() {
                return ""
            }
        }
        class o extends i {
            constructor(t) {
                super(),
                    this.t = "02",
                    t && (this.v = function (t) {
                        let e = t.toString(16);
                        if ("-" !== e[0])
                            e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                        else {
                            e = e.substr(1);
                            let r = e.length;
                            r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                            let i = "";
                            for (let t = 0; t < r; t++)
                                i += "f";
                            i = new n(i, 16),
                                e = i.xor(t).add(n.ONE),
                                e = e.toString(16).replace(/^-/, "")
                        }
                        return e
                    }(t))
            }
            getValue() {
                return this.v
            }
        }
        class s extends i {
            constructor(t) {
                super(),
                    this.t = "30",
                    this.asn1Array = t
            }
            getValue() {
                return this.v = this.asn1Array.map(t => t.getEncodedHex()).join(""),
                    this.v
            }
        }
        function a(t, e) {
            return +t[e + 2] < 8 ? 1 : 128 & +t.substr(e + 2, 2)
        }
        function c(t, e) {
            const r = a(t, e)
                , i = t.substr(e + 2, 2 * r);
            if (!i)
                return -1;
            return (+i[0] < 8 ? new n(i, 16) : new n(i.substr(2), 16)).intValue()
        }
        function u(t, e) {
            return e + 2 * (a(t, e) + 1)
        }
        t.exports = {
            encodeDer(t, e) {
                const r = new o(t)
                    , n = new o(e);
                return new s([r, n]).getEncodedHex()
            },
            decodeDer(t) {
                const e = u(t, 0)
                    , r = u(t, e)
                    , i = c(t, e)
                    , o = t.substr(r, 2 * i)
                    , s = r + o.length
                    , a = u(t, s)
                    , l = c(t, s)
                    , f = t.substr(a, 2 * l);
                return {
                    r: new n(o, 16),
                    s: new n(f, 16)
                }
            }
        }
    }, function(t, e, r) {
        (function () {
            var e;
            function r(t, e, r) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            function n() {
                return new r(null)
            }
            var i = "undefined" != typeof navigator;
            i && "Microsoft Internet Explorer" == navigator.appName ? (r.prototype.am = function (t, e, r, n, i, o) {
                for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
                    var c = 32767 & this[t]
                        , u = this[t++] >> 15
                        , l = a * c + u * s;
                    i = ((c = s * c + ((32767 & l) << 15) + r[n] + (1073741823 & i)) >>> 30) + (l >>> 15) + a * u + (i >>> 30),
                        r[n++] = 1073741823 & c
                }
                return i
            }
                ,
                e = 30) : i && "Netscape" != navigator.appName ? (r.prototype.am = function (t, e, r, n, i, o) {
                    for (; --o >= 0;) {
                        var s = e * this[t++] + r[n] + i;
                        i = Math.floor(s / 67108864),
                            r[n++] = 67108863 & s
                    }
                    return i
                }
                    ,
                    e = 26) : (r.prototype.am = function (t, e, r, n, i, o) {
                        for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
                            var c = 16383 & this[t]
                                , u = this[t++] >> 14
                                , l = a * c + u * s;
                            i = ((c = s * c + ((16383 & l) << 14) + r[n] + i) >> 28) + (l >> 14) + a * u,
                                r[n++] = 268435455 & c
                        }
                        return i
                    }
                        ,
                        e = 28),
                r.prototype.DB = e,
                r.prototype.DM = (1 << e) - 1,
                r.prototype.DV = 1 << e;
            r.prototype.FV = Math.pow(2, 52),
                r.prototype.F1 = 52 - e,
                r.prototype.F2 = 2 * e - 52;
            var o, s, a = new Array;
            for (o = "0".charCodeAt(0),
                s = 0; s <= 9; ++s)
                a[o++] = s;
            for (o = "a".charCodeAt(0),
                s = 10; s < 36; ++s)
                a[o++] = s;
            for (o = "A".charCodeAt(0),
                s = 10; s < 36; ++s)
                a[o++] = s;
            function c(t) {
                return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
            }
            function u(t, e) {
                var r = a[t.charCodeAt(e)];
                return null == r ? -1 : r
            }
            function l(t) {
                var e = n();
                return e.fromInt(t),
                    e
            }
            function f(t) {
                var e, r = 1;
                return 0 != (e = t >>> 16) && (t = e,
                    r += 16),
                    0 != (e = t >> 8) && (t = e,
                        r += 8),
                    0 != (e = t >> 4) && (t = e,
                        r += 4),
                    0 != (e = t >> 2) && (t = e,
                        r += 2),
                    0 != (e = t >> 1) && (t = e,
                        r += 1),
                    r
            }
            function h(t) {
                this.m = t
            }
            function p(t) {
                this.m = t,
                    this.mp = t.invDigit(),
                    this.mpl = 32767 & this.mp,
                    this.mph = this.mp >> 15,
                    this.um = (1 << t.DB - 15) - 1,
                    this.mt2 = 2 * t.t
            }
            function d(t, e) {
                return t & e
            }
            function y(t, e) {
                return t | e
            }
            function g(t, e) {
                return t ^ e
            }
            function m(t, e) {
                return t & ~e
            }
            function v(t) {
                if (0 == t)
                    return -1;
                var e = 0;
                return 0 == (65535 & t) && (t >>= 16,
                    e += 16),
                    0 == (255 & t) && (t >>= 8,
                        e += 8),
                    0 == (15 & t) && (t >>= 4,
                        e += 4),
                    0 == (3 & t) && (t >>= 2,
                        e += 2),
                    0 == (1 & t) && ++e,
                    e
            }
            function b(t) {
                for (var e = 0; 0 != t;)
                    t &= t - 1,
                        ++e;
                return e
            }
            function w() { }
            function A(t) {
                return t
            }
            function S(t) {
                this.r2 = n(),
                    this.q3 = n(),
                    r.ONE.dlShiftTo(2 * t.t, this.r2),
                    this.mu = this.r2.divide(t),
                    this.m = t
            }
            h.prototype.convert = function (t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
                ,
                h.prototype.revert = function (t) {
                    return t
                }
                ,
                h.prototype.reduce = function (t) {
                    t.divRemTo(this.m, null, t)
                }
                ,
                h.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                h.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                p.prototype.convert = function (t) {
                    var e = n();
                    return t.abs().dlShiftTo(this.m.t, e),
                        e.divRemTo(this.m, null, e),
                        t.s < 0 && e.compareTo(r.ZERO) > 0 && this.m.subTo(e, e),
                        e
                }
                ,
                p.prototype.revert = function (t) {
                    var e = n();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                p.prototype.reduce = function (t) {
                    for (; t.t <= this.mt2;)
                        t[t.t++] = 0;
                    for (var e = 0; e < this.m.t; ++e) {
                        var r = 32767 & t[e]
                            , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                        for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;)
                            t[r] -= t.DV,
                                t[++r]++
                    }
                    t.clamp(),
                        t.drShiftTo(this.m.t, t),
                        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
                }
                ,
                p.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                p.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                r.prototype.copyTo = function (t) {
                    for (var e = this.t - 1; e >= 0; --e)
                        t[e] = this[e];
                    t.t = this.t,
                        t.s = this.s
                }
                ,
                r.prototype.fromInt = function (t) {
                    this.t = 1,
                        this.s = t < 0 ? -1 : 0,
                        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                }
                ,
                r.prototype.fromString = function (t, e) {
                    var n;
                    if (16 == e)
                        n = 4;
                    else if (8 == e)
                        n = 3;
                    else if (256 == e)
                        n = 8;
                    else if (2 == e)
                        n = 1;
                    else if (32 == e)
                        n = 5;
                    else {
                        if (4 != e)
                            return void this.fromRadix(t, e);
                        n = 2
                    }
                    this.t = 0,
                        this.s = 0;
                    for (var i = t.length, o = !1, s = 0; --i >= 0;) {
                        var a = 8 == n ? 255 & t[i] : u(t, i);
                        a < 0 ? "-" == t.charAt(i) && (o = !0) : (o = !1,
                            0 == s ? this[this.t++] = a : s + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s,
                                this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s,
                            (s += n) >= this.DB && (s -= this.DB))
                    }
                    8 == n && 0 != (128 & t[0]) && (this.s = -1,
                        s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
                        this.clamp(),
                        o && r.ZERO.subTo(this, this)
                }
                ,
                r.prototype.clamp = function () {
                    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                        --this.t
                }
                ,
                r.prototype.dlShiftTo = function (t, e) {
                    var r;
                    for (r = this.t - 1; r >= 0; --r)
                        e[r + t] = this[r];
                    for (r = t - 1; r >= 0; --r)
                        e[r] = 0;
                    e.t = this.t + t,
                        e.s = this.s
                }
                ,
                r.prototype.drShiftTo = function (t, e) {
                    for (var r = t; r < this.t; ++r)
                        e[r - t] = this[r];
                    e.t = Math.max(this.t - t, 0),
                        e.s = this.s
                }
                ,
                r.prototype.lShiftTo = function (t, e) {
                    var r, n = t % this.DB, i = this.DB - n, o = (1 << i) - 1, s = Math.floor(t / this.DB), a = this.s << n & this.DM;
                    for (r = this.t - 1; r >= 0; --r)
                        e[r + s + 1] = this[r] >> i | a,
                            a = (this[r] & o) << n;
                    for (r = s - 1; r >= 0; --r)
                        e[r] = 0;
                    e[s] = a,
                        e.t = this.t + s + 1,
                        e.s = this.s,
                        e.clamp()
                }
                ,
                r.prototype.rShiftTo = function (t, e) {
                    e.s = this.s;
                    var r = Math.floor(t / this.DB);
                    if (r >= this.t)
                        e.t = 0;
                    else {
                        var n = t % this.DB
                            , i = this.DB - n
                            , o = (1 << n) - 1;
                        e[0] = this[r] >> n;
                        for (var s = r + 1; s < this.t; ++s)
                            e[s - r - 1] |= (this[s] & o) << i,
                                e[s - r] = this[s] >> n;
                        n > 0 && (e[this.t - r - 1] |= (this.s & o) << i),
                            e.t = this.t - r,
                            e.clamp()
                    }
                }
                ,
                r.prototype.subTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] - t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n -= t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n -= t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n -= t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
                        e.t = r,
                        e.clamp()
                }
                ,
                r.prototype.multiplyTo = function (t, e) {
                    var n = this.abs()
                        , i = t.abs()
                        , o = n.t;
                    for (e.t = o + i.t; --o >= 0;)
                        e[o] = 0;
                    for (o = 0; o < i.t; ++o)
                        e[o + n.t] = n.am(0, i[o], e, o, 0, n.t);
                    e.s = 0,
                        e.clamp(),
                        this.s != t.s && r.ZERO.subTo(e, e)
                }
                ,
                r.prototype.squareTo = function (t) {
                    for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;)
                        t[r] = 0;
                    for (r = 0; r < e.t - 1; ++r) {
                        var n = e.am(r, e[r], t, 2 * r, 0, 1);
                        (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                            t[r + e.t + 1] = 1)
                    }
                    t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                        t.s = 0,
                        t.clamp()
                }
                ,
                r.prototype.divRemTo = function (t, e, i) {
                    var o = t.abs();
                    if (!(o.t <= 0)) {
                        var s = this.abs();
                        if (s.t < o.t)
                            return null != e && e.fromInt(0),
                                void (null != i && this.copyTo(i));
                        null == i && (i = n());
                        var a = n()
                            , c = this.s
                            , u = t.s
                            , l = this.DB - f(o[o.t - 1]);
                        l > 0 ? (o.lShiftTo(l, a),
                            s.lShiftTo(l, i)) : (o.copyTo(a),
                                s.copyTo(i));
                        var h = a.t
                            , p = a[h - 1];
                        if (0 != p) {
                            var d = p * (1 << this.F1) + (h > 1 ? a[h - 2] >> this.F2 : 0)
                                , y = this.FV / d
                                , g = (1 << this.F1) / d
                                , m = 1 << this.F2
                                , v = i.t
                                , b = v - h
                                , w = null == e ? n() : e;
                            for (a.dlShiftTo(b, w),
                                i.compareTo(w) >= 0 && (i[i.t++] = 1,
                                    i.subTo(w, i)),
                                r.ONE.dlShiftTo(h, w),
                                w.subTo(a, a); a.t < h;)
                                a[a.t++] = 0;
                            for (; --b >= 0;) {
                                var A = i[--v] == p ? this.DM : Math.floor(i[v] * y + (i[v - 1] + m) * g);
                                if ((i[v] += a.am(0, A, i, b, 0, h)) < A)
                                    for (a.dlShiftTo(b, w),
                                        i.subTo(w, i); i[v] < --A;)
                                        i.subTo(w, i)
                            }
                            null != e && (i.drShiftTo(h, e),
                                c != u && r.ZERO.subTo(e, e)),
                                i.t = h,
                                i.clamp(),
                                l > 0 && i.rShiftTo(l, i),
                                c < 0 && r.ZERO.subTo(i, i)
                        }
                    }
                }
                ,
                r.prototype.invDigit = function () {
                    if (this.t < 1)
                        return 0;
                    var t = this[0];
                    if (0 == (1 & t))
                        return 0;
                    var e = 3 & t;
                    return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
                }
                ,
                r.prototype.isEven = function () {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                ,
                r.prototype.exp = function (t, e) {
                    if (t > 4294967295 || t < 1)
                        return r.ONE;
                    var i = n()
                        , o = n()
                        , s = e.convert(this)
                        , a = f(t) - 1;
                    for (s.copyTo(i); --a >= 0;)
                        if (e.sqrTo(i, o),
                            (t & 1 << a) > 0)
                            e.mulTo(o, s, i);
                        else {
                            var c = i;
                            i = o,
                                o = c
                        }
                    return e.revert(i)
                }
                ,
                r.prototype.toString = function (t) {
                    if (this.s < 0)
                        return "-" + this.negate().toString(t);
                    var e;
                    if (16 == t)
                        e = 4;
                    else if (8 == t)
                        e = 3;
                    else if (2 == t)
                        e = 1;
                    else if (32 == t)
                        e = 5;
                    else {
                        if (4 != t)
                            return this.toRadix(t);
                        e = 2
                    }
                    var r, n = (1 << e) - 1, i = !1, o = "", s = this.t, a = this.DB - s * this.DB % e;
                    if (s-- > 0)
                        for (a < this.DB && (r = this[s] >> a) > 0 && (i = !0,
                            o = c(r)); s >= 0;)
                            a < e ? (r = (this[s] & (1 << a) - 1) << e - a,
                                r |= this[--s] >> (a += this.DB - e)) : (r = this[s] >> (a -= e) & n,
                                    a <= 0 && (a += this.DB,
                                        --s)),
                                r > 0 && (i = !0),
                                i && (o += c(r));
                    return i ? o : "0"
                }
                ,
                r.prototype.negate = function () {
                    var t = n();
                    return r.ZERO.subTo(this, t),
                        t
                }
                ,
                r.prototype.abs = function () {
                    return this.s < 0 ? this.negate() : this
                }
                ,
                r.prototype.compareTo = function (t) {
                    var e = this.s - t.s;
                    if (0 != e)
                        return e;
                    var r = this.t;
                    if (0 != (e = r - t.t))
                        return this.s < 0 ? -e : e;
                    for (; --r >= 0;)
                        if (0 != (e = this[r] - t[r]))
                            return e;
                    return 0
                }
                ,
                r.prototype.bitLength = function () {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + f(this[this.t - 1] ^ this.s & this.DM)
                }
                ,
                r.prototype.mod = function (t) {
                    var e = n();
                    return this.abs().divRemTo(t, null, e),
                        this.s < 0 && e.compareTo(r.ZERO) > 0 && t.subTo(e, e),
                        e
                }
                ,
                r.prototype.modPowInt = function (t, e) {
                    var r;
                    return r = t < 256 || e.isEven() ? new h(e) : new p(e),
                        this.exp(t, r)
                }
                ,
                r.ZERO = l(0),
                r.ONE = l(1),
                w.prototype.convert = A,
                w.prototype.revert = A,
                w.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r)
                }
                ,
                w.prototype.sqrTo = function (t, e) {
                    t.squareTo(e)
                }
                ,
                S.prototype.convert = function (t) {
                    if (t.s < 0 || t.t > 2 * this.m.t)
                        return t.mod(this.m);
                    if (t.compareTo(this.m) < 0)
                        return t;
                    var e = n();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                S.prototype.revert = function (t) {
                    return t
                }
                ,
                S.prototype.reduce = function (t) {
                    for (t.drShiftTo(this.m.t - 1, this.r2),
                        t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                            t.clamp()),
                        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                        t.dAddOffset(1, this.m.t + 1);
                    for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                        t.subTo(this.m, t)
                }
                ,
                S.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                S.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ;
            var x, B, k, C = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], _ = (1 << 26) / C[C.length - 1];
            function F() {
                var t;
                t = (new Date).getTime(),
                    B[k++] ^= 255 & t,
                    B[k++] ^= t >> 8 & 255,
                    B[k++] ^= t >> 16 & 255,
                    B[k++] ^= t >> 24 & 255,
                    k >= j && (k -= j)
            }
            if (r.prototype.chunkSize = function (t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
                ,
                r.prototype.toRadix = function (t) {
                    if (null == t && (t = 10),
                        0 == this.signum() || t < 2 || t > 36)
                        return "0";
                    var e = this.chunkSize(t)
                        , r = Math.pow(t, e)
                        , i = l(r)
                        , o = n()
                        , s = n()
                        , a = "";
                    for (this.divRemTo(i, o, s); o.signum() > 0;)
                        a = (r + s.intValue()).toString(t).substr(1) + a,
                            o.divRemTo(i, o, s);
                    return s.intValue().toString(t) + a
                }
                ,
                r.prototype.fromRadix = function (t, e) {
                    this.fromInt(0),
                        null == e && (e = 10);
                    for (var n = this.chunkSize(e), i = Math.pow(e, n), o = !1, s = 0, a = 0, c = 0; c < t.length; ++c) {
                        var l = u(t, c);
                        l < 0 ? "-" == t.charAt(c) && 0 == this.signum() && (o = !0) : (a = e * a + l,
                            ++s >= n && (this.dMultiply(i),
                                this.dAddOffset(a, 0),
                                s = 0,
                                a = 0))
                    }
                    s > 0 && (this.dMultiply(Math.pow(e, s)),
                        this.dAddOffset(a, 0)),
                        o && r.ZERO.subTo(this, this)
                }
                ,
                r.prototype.fromNumber = function (t, e, n) {
                    if ("number" == typeof e)
                        if (t < 2)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(t, n),
                                this.testBit(t - 1) || this.bitwiseTo(r.ONE.shiftLeft(t - 1), y, this),
                                this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);)
                                this.dAddOffset(2, 0),
                                    this.bitLength() > t && this.subTo(r.ONE.shiftLeft(t - 1), this);
                    else {
                        var i = new Array
                            , o = 7 & t;
                        i.length = 1 + (t >> 3),
                            e.nextBytes(i),
                            o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0,
                            this.fromString(i, 256)
                    }
                }
                ,
                r.prototype.bitwiseTo = function (t, e, r) {
                    var n, i, o = Math.min(t.t, this.t);
                    for (n = 0; n < o; ++n)
                        r[n] = e(this[n], t[n]);
                    if (t.t < this.t) {
                        for (i = t.s & this.DM,
                            n = o; n < this.t; ++n)
                            r[n] = e(this[n], i);
                        r.t = this.t
                    } else {
                        for (i = this.s & this.DM,
                            n = o; n < t.t; ++n)
                            r[n] = e(i, t[n]);
                        r.t = t.t
                    }
                    r.s = e(this.s, t.s),
                        r.clamp()
                }
                ,
                r.prototype.changeBit = function (t, e) {
                    var n = r.ONE.shiftLeft(t);
                    return this.bitwiseTo(n, e, n),
                        n
                }
                ,
                r.prototype.addTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] + t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n += t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n += t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
                        e.t = r,
                        e.clamp()
                }
                ,
                r.prototype.dMultiply = function (t) {
                    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                        ++this.t,
                        this.clamp()
                }
                ,
                r.prototype.dAddOffset = function (t, e) {
                    if (0 != t) {
                        for (; this.t <= e;)
                            this[this.t++] = 0;
                        for (this[e] += t; this[e] >= this.DV;)
                            this[e] -= this.DV,
                                ++e >= this.t && (this[this.t++] = 0),
                                ++this[e]
                    }
                }
                ,
                r.prototype.multiplyLowerTo = function (t, e, r) {
                    var n, i = Math.min(this.t + t.t, e);
                    for (r.s = 0,
                        r.t = i; i > 0;)
                        r[--i] = 0;
                    for (n = r.t - this.t; i < n; ++i)
                        r[i + this.t] = this.am(0, t[i], r, i, 0, this.t);
                    for (n = Math.min(t.t, e); i < n; ++i)
                        this.am(0, t[i], r, i, 0, e - i);
                    r.clamp()
                }
                ,
                r.prototype.multiplyUpperTo = function (t, e, r) {
                    --e;
                    var n = r.t = this.t + t.t - e;
                    for (r.s = 0; --n >= 0;)
                        r[n] = 0;
                    for (n = Math.max(e - this.t, 0); n < t.t; ++n)
                        r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
                    r.clamp(),
                        r.drShiftTo(1, r)
                }
                ,
                r.prototype.modInt = function (t) {
                    if (t <= 0)
                        return 0;
                    var e = this.DV % t
                        , r = this.s < 0 ? t - 1 : 0;
                    if (this.t > 0)
                        if (0 == e)
                            r = this[0] % t;
                        else
                            for (var n = this.t - 1; n >= 0; --n)
                                r = (e * r + this[n]) % t;
                    return r
                }
                ,
                r.prototype.millerRabin = function (t) {
                    var e = this.subtract(r.ONE)
                        , i = e.getLowestSetBit();
                    if (i <= 0)
                        return !1;
                    var o = e.shiftRight(i);
                    (t = t + 1 >> 1) > C.length && (t = C.length);
                    for (var s = n(), a = 0; a < t; ++a) {
                        s.fromInt(C[Math.floor(Math.random() * C.length)]);
                        var c = s.modPow(o, this);
                        if (0 != c.compareTo(r.ONE) && 0 != c.compareTo(e)) {
                            for (var u = 1; u++ < i && 0 != c.compareTo(e);)
                                if (0 == (c = c.modPowInt(2, this)).compareTo(r.ONE))
                                    return !1;
                            if (0 != c.compareTo(e))
                                return !1
                        }
                    }
                    return !0
                }
                ,
                r.prototype.clone = function () {
                    var t = n();
                    return this.copyTo(t),
                        t
                }
                ,
                r.prototype.intValue = function () {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                ,
                r.prototype.byteValue = function () {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                ,
                r.prototype.shortValue = function () {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                ,
                r.prototype.signum = function () {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                ,
                r.prototype.toByteArray = function () {
                    var t = this.t
                        , e = new Array;
                    e[0] = this.s;
                    var r, n = this.DB - t * this.DB % 8, i = 0;
                    if (t-- > 0)
                        for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n); t >= 0;)
                            n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                                r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                                    n <= 0 && (n += this.DB,
                                        --t)),
                                0 != (128 & r) && (r |= -256),
                                0 == i && (128 & this.s) != (128 & r) && ++i,
                                (i > 0 || r != this.s) && (e[i++] = r);
                    return e
                }
                ,
                r.prototype.equals = function (t) {
                    return 0 == this.compareTo(t)
                }
                ,
                r.prototype.min = function (t) {
                    return this.compareTo(t) < 0 ? this : t
                }
                ,
                r.prototype.max = function (t) {
                    return this.compareTo(t) > 0 ? this : t
                }
                ,
                r.prototype.and = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, d, e),
                        e
                }
                ,
                r.prototype.or = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, y, e),
                        e
                }
                ,
                r.prototype.xor = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, g, e),
                        e
                }
                ,
                r.prototype.andNot = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, m, e),
                        e
                }
                ,
                r.prototype.not = function () {
                    for (var t = n(), e = 0; e < this.t; ++e)
                        t[e] = this.DM & ~this[e];
                    return t.t = this.t,
                        t.s = ~this.s,
                        t
                }
                ,
                r.prototype.shiftLeft = function (t) {
                    var e = n();
                    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                        e
                }
                ,
                r.prototype.shiftRight = function (t) {
                    var e = n();
                    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                        e
                }
                ,
                r.prototype.getLowestSetBit = function () {
                    for (var t = 0; t < this.t; ++t)
                        if (0 != this[t])
                            return t * this.DB + v(this[t]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                ,
                r.prototype.bitCount = function () {
                    for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                        t += b(this[r] ^ e);
                    return t
                }
                ,
                r.prototype.testBit = function (t) {
                    var e = Math.floor(t / this.DB);
                    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                }
                ,
                r.prototype.setBit = function (t) {
                    return this.changeBit(t, y)
                }
                ,
                r.prototype.clearBit = function (t) {
                    return this.changeBit(t, m)
                }
                ,
                r.prototype.flipBit = function (t) {
                    return this.changeBit(t, g)
                }
                ,
                r.prototype.add = function (t) {
                    var e = n();
                    return this.addTo(t, e),
                        e
                }
                ,
                r.prototype.subtract = function (t) {
                    var e = n();
                    return this.subTo(t, e),
                        e
                }
                ,
                r.prototype.multiply = function (t) {
                    var e = n();
                    return this.multiplyTo(t, e),
                        e
                }
                ,
                r.prototype.divide = function (t) {
                    var e = n();
                    return this.divRemTo(t, e, null),
                        e
                }
                ,
                r.prototype.remainder = function (t) {
                    var e = n();
                    return this.divRemTo(t, null, e),
                        e
                }
                ,
                r.prototype.divideAndRemainder = function (t) {
                    var e = n()
                        , r = n();
                    return this.divRemTo(t, e, r),
                        new Array(e, r)
                }
                ,
                r.prototype.modPow = function (t, e) {
                    var r, i, o = t.bitLength(), s = l(1);
                    if (o <= 0)
                        return s;
                    r = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                        i = o < 8 ? new h(e) : e.isEven() ? new S(e) : new p(e);
                    var a = new Array
                        , c = 3
                        , u = r - 1
                        , d = (1 << r) - 1;
                    if (a[1] = i.convert(this),
                        r > 1) {
                        var y = n();
                        for (i.sqrTo(a[1], y); c <= d;)
                            a[c] = n(),
                                i.mulTo(y, a[c - 2], a[c]),
                                c += 2
                    }
                    var g, m, v = t.t - 1, b = !0, w = n();
                    for (o = f(t[v]) - 1; v >= 0;) {
                        for (o >= u ? g = t[v] >> o - u & d : (g = (t[v] & (1 << o + 1) - 1) << u - o,
                            v > 0 && (g |= t[v - 1] >> this.DB + o - u)),
                            c = r; 0 == (1 & g);)
                            g >>= 1,
                                --c;
                        if ((o -= c) < 0 && (o += this.DB,
                            --v),
                            b)
                            a[g].copyTo(s),
                                b = !1;
                        else {
                            for (; c > 1;)
                                i.sqrTo(s, w),
                                    i.sqrTo(w, s),
                                    c -= 2;
                            c > 0 ? i.sqrTo(s, w) : (m = s,
                                s = w,
                                w = m),
                                i.mulTo(w, a[g], s)
                        }
                        for (; v >= 0 && 0 == (t[v] & 1 << o);)
                            i.sqrTo(s, w),
                                m = s,
                                s = w,
                                w = m,
                                --o < 0 && (o = this.DB - 1,
                                    --v)
                    }
                    return i.revert(s)
                }
                ,
                r.prototype.modInverse = function (t) {
                    var e = t.isEven();
                    if (this.isEven() && e || 0 == t.signum())
                        return r.ZERO;
                    for (var n = t.clone(), i = this.clone(), o = l(1), s = l(0), a = l(0), c = l(1); 0 != n.signum();) {
                        for (; n.isEven();)
                            n.rShiftTo(1, n),
                                e ? (o.isEven() && s.isEven() || (o.addTo(this, o),
                                    s.subTo(t, s)),
                                    o.rShiftTo(1, o)) : s.isEven() || s.subTo(t, s),
                                s.rShiftTo(1, s);
                        for (; i.isEven();)
                            i.rShiftTo(1, i),
                                e ? (a.isEven() && c.isEven() || (a.addTo(this, a),
                                    c.subTo(t, c)),
                                    a.rShiftTo(1, a)) : c.isEven() || c.subTo(t, c),
                                c.rShiftTo(1, c);
                        n.compareTo(i) >= 0 ? (n.subTo(i, n),
                            e && o.subTo(a, o),
                            s.subTo(c, s)) : (i.subTo(n, i),
                                e && a.subTo(o, a),
                                c.subTo(s, c))
                    }
                    return 0 != i.compareTo(r.ONE) ? r.ZERO : c.compareTo(t) >= 0 ? c.subtract(t) : c.signum() < 0 ? (c.addTo(t, c),
                        c.signum() < 0 ? c.add(t) : c) : c
                }
                ,
                r.prototype.pow = function (t) {
                    return this.exp(t, new w)
                }
                ,
                r.prototype.gcd = function (t) {
                    var e = this.s < 0 ? this.negate() : this.clone()
                        , r = t.s < 0 ? t.negate() : t.clone();
                    if (e.compareTo(r) < 0) {
                        var n = e;
                        e = r,
                            r = n
                    }
                    var i = e.getLowestSetBit()
                        , o = r.getLowestSetBit();
                    if (o < 0)
                        return e;
                    for (i < o && (o = i),
                        o > 0 && (e.rShiftTo(o, e),
                            r.rShiftTo(o, r)); e.signum() > 0;)
                        (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                            (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                            e.compareTo(r) >= 0 ? (e.subTo(r, e),
                                e.rShiftTo(1, e)) : (r.subTo(e, r),
                                    r.rShiftTo(1, r));
                    return o > 0 && r.lShiftTo(o, r),
                        r
                }
                ,
                r.prototype.isProbablePrime = function (t) {
                    var e, r = this.abs();
                    if (1 == r.t && r[0] <= C[C.length - 1]) {
                        for (e = 0; e < C.length; ++e)
                            if (r[0] == C[e])
                                return !0;
                        return !1
                    }
                    if (r.isEven())
                        return !1;
                    for (e = 1; e < C.length;) {
                        for (var n = C[e], i = e + 1; i < C.length && n < _;)
                            n *= C[i++];
                        for (n = r.modInt(n); e < i;)
                            if (n % C[e++] == 0)
                                return !1
                    }
                    return r.millerRabin(t)
                }
                ,
                r.prototype.square = function () {
                    var t = n();
                    return this.squareTo(t),
                        t
                }
                ,
                r.prototype.Barrett = S,
                null == B) {
                var T;
                if (B = new Array,
                    k = 0,
                    "undefined" != typeof window && window.crypto)
                    if (window.crypto.getRandomValues) {
                        var E = new Uint8Array(32);
                        for (window.crypto.getRandomValues(E),
                            T = 0; T < 32; ++T)
                            B[k++] = E[T]
                    } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
                        var P = window.crypto.random(32);
                        for (T = 0; T < P.length; ++T)
                            B[k++] = 255 & P.charCodeAt(T)
                    }
                for (; k < j;)
                    T = Math.floor(65536 * Math.random()),
                        B[k++] = T >>> 8,
                        B[k++] = 255 & T;
                k = 0,
                    F()
            }
            function I() {
                if (null == x) {
                    for (F(),
                        (x = new R).init(B),
                        k = 0; k < B.length; ++k)
                        B[k] = 0;
                    k = 0
                }
                return x.next()
            }
            function O() { }
            function R() {
                this.i = 0,
                    this.j = 0,
                    this.S = new Array
            }
            O.prototype.nextBytes = function (t) {
                var e;
                for (e = 0; e < t.length; ++e)
                    t[e] = I()
            }
                ,
                R.prototype.init = function (t) {
                    var e, r, n;
                    for (e = 0; e < 256; ++e)
                        this.S[e] = e;
                    for (r = 0,
                        e = 0; e < 256; ++e)
                        r = r + this.S[e] + t[e % t.length] & 255,
                            n = this.S[e],
                            this.S[e] = this.S[r],
                            this.S[r] = n;
                    this.i = 0,
                        this.j = 0
                }
                ,
                R.prototype.next = function () {
                    var t;
                    return this.i = this.i + 1 & 255,
                        this.j = this.j + this.S[this.i] & 255,
                        t = this.S[this.i],
                        this.S[this.i] = this.S[this.j],
                        this.S[this.j] = t,
                        this.S[t + this.S[this.i] & 255]
                }
                ;
            var j = 256;
            t.exports = {
                default: r,
                BigInteger: r,
                SecureRandom: O
            }
        }
        ).call(this)
    }, function(t, e, r) {
        const { BigInteger: n, SecureRandom: i } = r("f33e")
            , { ECCurveFp: o } = r("4701")
            , s = new i
            , { curve: a, G: c, n: u } = l();
        function l() {
            const t = new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16)
                , e = new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16)
                , r = new n("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16)
                , i = new o(t, e, r)
                , s = i.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0");
            return {
                curve: i,
                G: s,
                n: new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
            }
        }
        function f(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }
        t.exports = {
            getGlobalCurve: function () {
                return a
            },
            generateEcparam: l,
            generateKeyPairHex: function (t, e, r) {
                const i = (t ? new n(t, e, r) : new n(u.bitLength(), s)).mod(u.subtract(n.ONE)).add(n.ONE)
                    , o = f(i.toString(16), 64)
                    , a = c.multiply(i);
                return {
                    privateKey: o,
                    publicKey: "04" + f(a.getX().toBigInteger().toString(16), 64) + f(a.getY().toBigInteger().toString(16), 64)
                }
            },
            compressPublicKeyHex: function (t) {
                if (130 !== t.length)
                    throw new Error("Invalid public key to compress");
                const e = (t.length - 2) / 2
                    , r = t.substr(2, e);
                let i = "03";
                return new n(t.substr(e + 2, e), 16).mod(new n("2")).equals(n.ZERO) && (i = "02"),
                    i + r
            },
            utf8ToHex: function (t) {
                const e = (t = unescape(encodeURIComponent(t))).length
                    , r = [];
                for (let n = 0; n < e; n++)
                    r[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8;
                const n = [];
                for (let t = 0; t < e; t++) {
                    const e = r[t >>> 2] >>> 24 - t % 4 * 8 & 255;
                    n.push((e >>> 4).toString(16)),
                        n.push((15 & e).toString(16))
                }
                return n.join("")
            },
            leftPad: f,
            arrayToHex: function (t) {
                return t.map(t => 1 === (t = t.toString(16)).length ? "0" + t : t).join("")
            },
            arrayToUtf8: function (t) {
                const e = [];
                let r = 0;
                for (let n = 0; n < 2 * t.length; n += 2)
                    e[n >>> 3] |= parseInt(t[r], 10) << 24 - n % 8 * 4,
                        r++;
                try {
                    const r = [];
                    for (let n = 0; n < t.length; n++) {
                        const t = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        r.push(String.fromCharCode(t))
                    }
                    return decodeURIComponent(escape(r.join("")))
                } catch (t) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            hexToArray: function (t) {
                const e = [];
                let r = t.length;
                r % 2 != 0 && (t = f(t, r + 1)),
                    r = t.length;
                for (let n = 0; n < r; n += 2)
                    e.push(parseInt(t.substr(n, 2), 16));
                return e
            },
            verifyPublicKey: function (t) {
                const e = a.decodePointHex(t);
                if (!e)
                    return !1;
                const r = e.getX();
                return e.getY().square().equals(r.multiply(r.square()).add(r.multiply(a.a)).add(a.b))
            },
            comparePublicKeyHex: function (t, e) {
                const r = a.decodePointHex(t);
                if (!r)
                    return !1;
                const n = a.decodePointHex(e);
                return !!n && r.equals(n)
            }
        }
    }, function(t, e) {
        function r(t, e) {
            const r = []
                , n = ~~(e / 8)
                , i = e % 8;
            for (let e = 0, o = t.length; e < o; e++)
                r[e] = (t[(e + n) % o] << i & 255) + (t[(e + n + 1) % o] >>> 8 - i & 255);
            return r
        }
        function n(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = 255 & (t[n] ^ e[n]);
            return r
        }
        function i(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = t[n] & e[n] & 255;
            return r
        }
        function o(t, e) {
            const r = [];
            for (let n = t.length - 1; n >= 0; n--)
                r[n] = 255 & (t[n] | e[n]);
            return r
        }
        function s(t, e) {
            const r = [];
            let n = 0;
            for (let i = t.length - 1; i >= 0; i--) {
                const o = t[i] + e[i] + n;
                o > 255 ? (n = 1,
                    r[i] = 255 & o) : (n = 0,
                        r[i] = 255 & o)
            }
            return r
        }
        function a(t) {
            return n(n(t, r(t, 9)), r(t, 17))
        }
        function c(t, e, r, s) {
            return s >= 0 && s <= 15 ? n(n(t, e), r) : o(o(i(t, e), i(t, r)), i(e, r))
        }
        function u(t, e, r, s) {
            return s >= 0 && s <= 15 ? n(n(t, e), r) : o(i(t, e), i(function (t) {
                const e = [];
                for (let r = t.length - 1; r >= 0; r--)
                    e[r] = 255 & ~t[r];
                return e
            }(t), r))
        }
        function l(t, e) {
            const i = []
                , o = [];
            for (let t = 0; t < 16; t++) {
                const r = 4 * t;
                i.push(e.slice(r, r + 4))
            }
            for (let t = 16; t < 68; t++)
                i.push(n(n((l = n(n(i[t - 16], i[t - 9]), r(i[t - 3], 15)),
                    n(n(l, r(l, 15)), r(l, 23))), r(i[t - 13], 7)), i[t - 6]));
            var l;
            for (let t = 0; t < 64; t++)
                o.push(n(i[t], i[t + 4]));
            const f = [121, 204, 69, 25]
                , h = [122, 135, 157, 138];
            let p, d, y, g, m = t.slice(0, 4), v = t.slice(4, 8), b = t.slice(8, 12), w = t.slice(12, 16), A = t.slice(16, 20), S = t.slice(20, 24), x = t.slice(24, 28), B = t.slice(28, 32);
            for (let t = 0; t < 64; t++) {
                const e = t >= 0 && t <= 15 ? f : h;
                p = r(s(s(r(m, 12), A), r(e, t)), 7),
                    d = n(p, r(m, 12)),
                    y = s(s(s(c(m, v, b, t), w), d), o[t]),
                    g = s(s(s(u(A, S, x, t), B), p), i[t]),
                    w = b,
                    b = r(v, 9),
                    v = m,
                    m = y,
                    B = x,
                    x = r(S, 19),
                    S = A,
                    A = a(g)
            }
            return n([].concat(m, v, b, w, A, S, x, B), t)
        }
        function f(t) {
            let e = 8 * t.length
                , r = e % 512;
            r = r >= 448 ? 512 - r % 448 - 1 : 448 - r - 1;
            const n = new Array((r - 7) / 8);
            for (let t = 0, e = n.length; t < e; t++)
                n[t] = 0;
            const i = [];
            e = e.toString(2);
            for (let t = 7; t >= 0; t--)
                if (e.length > 8) {
                    const r = e.length - 8;
                    i[t] = parseInt(e.substr(r), 2),
                        e = e.substr(0, r)
                } else
                    e.length > 0 ? (i[t] = parseInt(e, 2),
                        e = "") : i[t] = 0;
            const o = [].concat(t, [128], n, i)
                , s = o.length / 64;
            let a = [115, 128, 22, 111, 73, 20, 178, 185, 23, 36, 66, 215, 218, 138, 6, 0, 169, 111, 48, 188, 22, 49, 56, 170, 227, 141, 238, 77, 176, 251, 14, 78];
            for (let t = 0; t < s; t++) {
                const e = 64 * t;
                a = l(a, o.slice(e, e + 64))
            }
            return a
        }
        const h = new Array(64)
            , p = new Array(64);
        for (let t = 0; t < 64; t++)
            h[t] = 54,
                p[t] = 92;
        t.exports = {
            sm3: f,
            hmac: function (t, e) {
                for (e.length > 64 && (e = f(e)); e.length < 64;)
                    e.push(0);
                let r = n(e, h).concat(t);
                return r = f(r),
                    r = n(e, p).concat(r),
                    r = f(r),
                    r
            }
        }
    }, 8060: function (t, e, r) {
        t.exports = {
            sm2: r("526b"),
            sm3: r("72fa"),
            sm4: r("10d1")
        }
    }, "72fa": function (t, e, r) {
        const { sm3: n, hmac: i } = r("41d0");
        function o(t) {
            return t.map(t => 1 === (t = t.toString(16)).length ? "0" + t : t).join("")
        }
        function s(t) {
            const e = [];
            let r = t.length;
            var n, i;
            r % 2 != 0 && (i = r + 1,
                t = (n = t).length >= i ? n : new Array(i - n.length + 1).join("0") + n),
                r = t.length;
            for (let n = 0; n < r; n += 2)
                e.push(parseInt(t.substr(n, 2), 16));
            return e
        }
        t.exports = function (t, e) {
            if (t = "string" == typeof t ? function (t) {
                const e = [];
                for (let r = 0, n = t.length; r < n; r++) {
                    const n = t.codePointAt(r);
                    if (n <= 127)
                        e.push(n);
                    else if (n <= 2047)
                        e.push(192 | n >>> 6),
                            e.push(128 | 63 & n);
                    else if (n <= 55295 || n >= 57344 && n <= 65535)
                        e.push(224 | n >>> 12),
                            e.push(128 | n >>> 6 & 63),
                            e.push(128 | 63 & n);
                    else {
                        if (!(n >= 65536 && n <= 1114111))
                            throw e.push(n),
                            new Error("input is not supported");
                        r++,
                            e.push(240 | n >>> 18 & 28),
                            e.push(128 | n >>> 12 & 63),
                            e.push(128 | n >>> 6 & 63),
                            e.push(128 | 63 & n)
                    }
                }
                return e
            }(t) : Array.prototype.slice.call(t),
                e) {
                if ("hmac" !== (e.mode || "hmac"))
                    throw new Error("invalid mode");
                let r = e.key;
                if (!r)
                    throw new Error("invalid key");
                return r = "string" == typeof r ? s(r) : Array.prototype.slice.call(r),
                    o(i(t, r))
            }
            return o(n(t))
        }
    }, "10d1": function (t, e) {
        const r = [214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72]
            , n = [462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257];
        function i(t) {
            const e = [];
            for (let r = 0, n = t.length; r < n; r += 2)
                e.push(parseInt(t.substr(r, 2), 16));
            return e
        }
        function o(t, e) {
            return t << e | t >>> 32 - e
        }
        function s(t) {
            return (255 & r[t >>> 24 & 255]) << 24 | (255 & r[t >>> 16 & 255]) << 16 | (255 & r[t >>> 8 & 255]) << 8 | 255 & r[255 & t]
        }
        function a(t) {
            return t ^ o(t, 2) ^ o(t, 10) ^ o(t, 18) ^ o(t, 24)
        }
        function c(t) {
            return t ^ o(t, 13) ^ o(t, 23)
        }
        function u(t, e, r) {
            const n = new Array(4)
                , i = new Array(4);
            for (let e = 0; e < 4; e++)
                i[0] = 255 & t[4 * e],
                    i[1] = 255 & t[4 * e + 1],
                    i[2] = 255 & t[4 * e + 2],
                    i[3] = 255 & t[4 * e + 3],
                    n[e] = i[0] << 24 | i[1] << 16 | i[2] << 8 | i[3];
            for (let t, e = 0; e < 32; e += 4)
                t = n[1] ^ n[2] ^ n[3] ^ r[e + 0],
                    n[0] ^= a(s(t)),
                    t = n[2] ^ n[3] ^ n[0] ^ r[e + 1],
                    n[1] ^= a(s(t)),
                    t = n[3] ^ n[0] ^ n[1] ^ r[e + 2],
                    n[2] ^= a(s(t)),
                    t = n[0] ^ n[1] ^ n[2] ^ r[e + 3],
                    n[3] ^= a(s(t));
            for (let t = 0; t < 16; t += 4)
                e[t] = n[3 - t / 4] >>> 24 & 255,
                    e[t + 1] = n[3 - t / 4] >>> 16 & 255,
                    e[t + 2] = n[3 - t / 4] >>> 8 & 255,
                    e[t + 3] = 255 & n[3 - t / 4]
        }
        function l(t, e, r, { padding: o = "pkcs#7", mode: a, iv: l = [], output: f = "string" } = {}) {
            if ("cbc" === a && ("string" == typeof l && (l = i(l)),
                16 !== l.length))
                throw new Error("iv is invalid");
            if ("string" == typeof e && (e = i(e)),
                16 !== e.length)
                throw new Error("key is invalid");
            if (t = "string" == typeof t ? 0 !== r ? function (t) {
                const e = [];
                for (let r = 0, n = t.length; r < n; r++) {
                    const n = t.codePointAt(r);
                    if (n <= 127)
                        e.push(n);
                    else if (n <= 2047)
                        e.push(192 | n >>> 6),
                            e.push(128 | 63 & n);
                    else if (n <= 55295 || n >= 57344 && n <= 65535)
                        e.push(224 | n >>> 12),
                            e.push(128 | n >>> 6 & 63),
                            e.push(128 | 63 & n);
                    else {
                        if (!(n >= 65536 && n <= 1114111))
                            throw e.push(n),
                            new Error("input is not supported");
                        r++,
                            e.push(240 | n >>> 18 & 28),
                            e.push(128 | n >>> 12 & 63),
                            e.push(128 | n >>> 6 & 63),
                            e.push(128 | 63 & n)
                    }
                }
                return e
            }(t) : i(t) : [...t],
                ("pkcs#5" === o || "pkcs#7" === o) && 0 !== r) {
                const e = 16 - t.length % 16;
                for (let r = 0; r < e; r++)
                    t.push(e)
            }
            const h = new Array(32);
            !function (t, e, r) {
                const i = new Array(4)
                    , o = new Array(4);
                for (let e = 0; e < 4; e++)
                    o[0] = 255 & t[0 + 4 * e],
                        o[1] = 255 & t[1 + 4 * e],
                        o[2] = 255 & t[2 + 4 * e],
                        o[3] = 255 & t[3 + 4 * e],
                        i[e] = o[0] << 24 | o[1] << 16 | o[2] << 8 | o[3];
                i[0] ^= 2746333894,
                    i[1] ^= 1453994832,
                    i[2] ^= 1736282519,
                    i[3] ^= 2993693404;
                for (let t, r = 0; r < 32; r += 4)
                    t = i[1] ^ i[2] ^ i[3] ^ n[r + 0],
                        e[r + 0] = i[0] ^= c(s(t)),
                        t = i[2] ^ i[3] ^ i[0] ^ n[r + 1],
                        e[r + 1] = i[1] ^= c(s(t)),
                        t = i[3] ^ i[0] ^ i[1] ^ n[r + 2],
                        e[r + 2] = i[2] ^= c(s(t)),
                        t = i[0] ^ i[1] ^ i[2] ^ n[r + 3],
                        e[r + 3] = i[3] ^= c(s(t));
                if (0 === r)
                    for (let t, r = 0; r < 16; r++)
                        t = e[r],
                            e[r] = e[31 - r],
                            e[31 - r] = t
            }(e, h, r);
            const p = [];
            let d = l
                , y = t.length
                , g = 0;
            for (; y >= 16;) {
                const e = t.slice(g, g + 16)
                    , n = new Array(16);
                if ("cbc" === a)
                    for (let t = 0; t < 16; t++)
                        0 !== r && (e[t] ^= d[t]);
                u(e, n, h);
                for (let t = 0; t < 16; t++)
                    "cbc" === a && 0 === r && (n[t] ^= d[t]),
                        p[g + t] = n[t];
                "cbc" === a && (d = 0 !== r ? n : e),
                    y -= 16,
                    g += 16
            }
            if (("pkcs#5" === o || "pkcs#7" === o) && 0 === r) {
                const t = p.length
                    , e = p[t - 1];
                for (let r = 1; r <= e; r++)
                    if (p[t - r] !== e)
                        throw new Error("padding is invalid");
                p.splice(t - e, e)
            }
            return "array" !== f ? 0 !== r ? p.map(t => 1 === (t = t.toString(16)).length ? "0" + t : t).join("") : function (t) {
                const e = [];
                for (let r = 0, n = t.length; r < n; r++)
                    t[r] >= 240 && t[r] <= 247 ? (e.push(String.fromCodePoint(((7 & t[r]) << 18) + ((63 & t[r + 1]) << 12) + ((63 & t[r + 2]) << 6) + (63 & t[r + 3]))),
                        r += 3) : t[r] >= 224 && t[r] <= 239 ? (e.push(String.fromCodePoint(((15 & t[r]) << 12) + ((63 & t[r + 1]) << 6) + (63 & t[r + 2]))),
                            r += 2) : t[r] >= 192 && t[r] <= 223 ? (e.push(String.fromCodePoint(((31 & t[r]) << 6) + (63 & t[r + 1]))),
                                r++) : e.push(String.fromCodePoint(t[r]));
                return e.join("")
            }(p) : p
        }
        t.exports = {
            encrypt: (t, e, r) => l(t, e, 1, r),
            decrypt: (t, e, r) => l(t, e, 0, r)
        }
    },
    "f33e": function (t, e, r) {
        (function () {
            var e;
            function r(t, e, r) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            function n() {
                return new r(null)
            }
            var i = "undefined" != typeof navigator;
            i && "Microsoft Internet Explorer" == navigator.appName ? (r.prototype.am = function (t, e, r, n, i, o) {
                for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
                    var c = 32767 & this[t]
                        , u = this[t++] >> 15
                        , l = a * c + u * s;
                    i = ((c = s * c + ((32767 & l) << 15) + r[n] + (1073741823 & i)) >>> 30) + (l >>> 15) + a * u + (i >>> 30),
                        r[n++] = 1073741823 & c
                }
                return i
            }
                ,
                e = 30) : i && "Netscape" != navigator.appName ? (r.prototype.am = function (t, e, r, n, i, o) {
                    for (; --o >= 0;) {
                        var s = e * this[t++] + r[n] + i;
                        i = Math.floor(s / 67108864),
                            r[n++] = 67108863 & s
                    }
                    return i
                }
                    ,
                    e = 26) : (r.prototype.am = function (t, e, r, n, i, o) {
                        for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
                            var c = 16383 & this[t]
                                , u = this[t++] >> 14
                                , l = a * c + u * s;
                            i = ((c = s * c + ((16383 & l) << 14) + r[n] + i) >> 28) + (l >> 14) + a * u,
                                r[n++] = 268435455 & c
                        }
                        return i
                    }
                        ,
                        e = 28),
                r.prototype.DB = e,
                r.prototype.DM = (1 << e) - 1,
                r.prototype.DV = 1 << e;
            r.prototype.FV = Math.pow(2, 52),
                r.prototype.F1 = 52 - e,
                r.prototype.F2 = 2 * e - 52;
            var o, s, a = new Array;
            for (o = "0".charCodeAt(0),
                s = 0; s <= 9; ++s)
                a[o++] = s;
            for (o = "a".charCodeAt(0),
                s = 10; s < 36; ++s)
                a[o++] = s;
            for (o = "A".charCodeAt(0),
                s = 10; s < 36; ++s)
                a[o++] = s;
            function c(t) {
                return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
            }
            function u(t, e) {
                var r = a[t.charCodeAt(e)];
                return null == r ? -1 : r
            }
            function l(t) {
                var e = n();
                return e.fromInt(t),
                    e
            }
            function f(t) {
                var e, r = 1;
                return 0 != (e = t >>> 16) && (t = e,
                    r += 16),
                    0 != (e = t >> 8) && (t = e,
                        r += 8),
                    0 != (e = t >> 4) && (t = e,
                        r += 4),
                    0 != (e = t >> 2) && (t = e,
                        r += 2),
                    0 != (e = t >> 1) && (t = e,
                        r += 1),
                    r
            }
            function h(t) {
                this.m = t
            }
            function p(t) {
                this.m = t,
                    this.mp = t.invDigit(),
                    this.mpl = 32767 & this.mp,
                    this.mph = this.mp >> 15,
                    this.um = (1 << t.DB - 15) - 1,
                    this.mt2 = 2 * t.t
            }
            function d(t, e) {
                return t & e
            }
            function y(t, e) {
                return t | e
            }
            function g(t, e) {
                return t ^ e
            }
            function m(t, e) {
                return t & ~e
            }
            function v(t) {
                if (0 == t)
                    return -1;
                var e = 0;
                return 0 == (65535 & t) && (t >>= 16,
                    e += 16),
                    0 == (255 & t) && (t >>= 8,
                        e += 8),
                    0 == (15 & t) && (t >>= 4,
                        e += 4),
                    0 == (3 & t) && (t >>= 2,
                        e += 2),
                    0 == (1 & t) && ++e,
                    e
            }
            function b(t) {
                for (var e = 0; 0 != t;)
                    t &= t - 1,
                        ++e;
                return e
            }
            function w() { }
            function A(t) {
                return t
            }
            function S(t) {
                this.r2 = n(),
                    this.q3 = n(),
                    r.ONE.dlShiftTo(2 * t.t, this.r2),
                    this.mu = this.r2.divide(t),
                    this.m = t
            }
            h.prototype.convert = function (t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
                ,
                h.prototype.revert = function (t) {
                    return t
                }
                ,
                h.prototype.reduce = function (t) {
                    t.divRemTo(this.m, null, t)
                }
                ,
                h.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                h.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                p.prototype.convert = function (t) {
                    var e = n();
                    return t.abs().dlShiftTo(this.m.t, e),
                        e.divRemTo(this.m, null, e),
                        t.s < 0 && e.compareTo(r.ZERO) > 0 && this.m.subTo(e, e),
                        e
                }
                ,
                p.prototype.revert = function (t) {
                    var e = n();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                p.prototype.reduce = function (t) {
                    for (; t.t <= this.mt2;)
                        t[t.t++] = 0;
                    for (var e = 0; e < this.m.t; ++e) {
                        var r = 32767 & t[e]
                            , n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                        for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;)
                            t[r] -= t.DV,
                                t[++r]++
                    }
                    t.clamp(),
                        t.drShiftTo(this.m.t, t),
                        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
                }
                ,
                p.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                p.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                r.prototype.copyTo = function (t) {
                    for (var e = this.t - 1; e >= 0; --e)
                        t[e] = this[e];
                    t.t = this.t,
                        t.s = this.s
                }
                ,
                r.prototype.fromInt = function (t) {
                    this.t = 1,
                        this.s = t < 0 ? -1 : 0,
                        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                }
                ,
                r.prototype.fromString = function (t, e) {
                    var n;
                    if (16 == e)
                        n = 4;
                    else if (8 == e)
                        n = 3;
                    else if (256 == e)
                        n = 8;
                    else if (2 == e)
                        n = 1;
                    else if (32 == e)
                        n = 5;
                    else {
                        if (4 != e)
                            return void this.fromRadix(t, e);
                        n = 2
                    }
                    this.t = 0,
                        this.s = 0;
                    for (var i = t.length, o = !1, s = 0; --i >= 0;) {
                        var a = 8 == n ? 255 & t[i] : u(t, i);
                        a < 0 ? "-" == t.charAt(i) && (o = !0) : (o = !1,
                            0 == s ? this[this.t++] = a : s + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s,
                                this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s,
                            (s += n) >= this.DB && (s -= this.DB))
                    }
                    8 == n && 0 != (128 & t[0]) && (this.s = -1,
                        s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
                        this.clamp(),
                        o && r.ZERO.subTo(this, this)
                }
                ,
                r.prototype.clamp = function () {
                    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                        --this.t
                }
                ,
                r.prototype.dlShiftTo = function (t, e) {
                    var r;
                    for (r = this.t - 1; r >= 0; --r)
                        e[r + t] = this[r];
                    for (r = t - 1; r >= 0; --r)
                        e[r] = 0;
                    e.t = this.t + t,
                        e.s = this.s
                }
                ,
                r.prototype.drShiftTo = function (t, e) {
                    for (var r = t; r < this.t; ++r)
                        e[r - t] = this[r];
                    e.t = Math.max(this.t - t, 0),
                        e.s = this.s
                }
                ,
                r.prototype.lShiftTo = function (t, e) {
                    var r, n = t % this.DB, i = this.DB - n, o = (1 << i) - 1, s = Math.floor(t / this.DB), a = this.s << n & this.DM;
                    for (r = this.t - 1; r >= 0; --r)
                        e[r + s + 1] = this[r] >> i | a,
                            a = (this[r] & o) << n;
                    for (r = s - 1; r >= 0; --r)
                        e[r] = 0;
                    e[s] = a,
                        e.t = this.t + s + 1,
                        e.s = this.s,
                        e.clamp()
                }
                ,
                r.prototype.rShiftTo = function (t, e) {
                    e.s = this.s;
                    var r = Math.floor(t / this.DB);
                    if (r >= this.t)
                        e.t = 0;
                    else {
                        var n = t % this.DB
                            , i = this.DB - n
                            , o = (1 << n) - 1;
                        e[0] = this[r] >> n;
                        for (var s = r + 1; s < this.t; ++s)
                            e[s - r - 1] |= (this[s] & o) << i,
                                e[s - r] = this[s] >> n;
                        n > 0 && (e[this.t - r - 1] |= (this.s & o) << i),
                            e.t = this.t - r,
                            e.clamp()
                    }
                }
                ,
                r.prototype.subTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] - t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n -= t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n -= t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n -= t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n),
                        e.t = r,
                        e.clamp()
                }
                ,
                r.prototype.multiplyTo = function (t, e) {
                    var n = this.abs()
                        , i = t.abs()
                        , o = n.t;
                    for (e.t = o + i.t; --o >= 0;)
                        e[o] = 0;
                    for (o = 0; o < i.t; ++o)
                        e[o + n.t] = n.am(0, i[o], e, o, 0, n.t);
                    e.s = 0,
                        e.clamp(),
                        this.s != t.s && r.ZERO.subTo(e, e)
                }
                ,
                r.prototype.squareTo = function (t) {
                    for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;)
                        t[r] = 0;
                    for (r = 0; r < e.t - 1; ++r) {
                        var n = e.am(r, e[r], t, 2 * r, 0, 1);
                        (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV,
                            t[r + e.t + 1] = 1)
                    }
                    t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)),
                        t.s = 0,
                        t.clamp()
                }
                ,
                r.prototype.divRemTo = function (t, e, i) {
                    var o = t.abs();
                    if (!(o.t <= 0)) {
                        var s = this.abs();
                        if (s.t < o.t)
                            return null != e && e.fromInt(0),
                                void (null != i && this.copyTo(i));
                        null == i && (i = n());
                        var a = n()
                            , c = this.s
                            , u = t.s
                            , l = this.DB - f(o[o.t - 1]);
                        l > 0 ? (o.lShiftTo(l, a),
                            s.lShiftTo(l, i)) : (o.copyTo(a),
                                s.copyTo(i));
                        var h = a.t
                            , p = a[h - 1];
                        if (0 != p) {
                            var d = p * (1 << this.F1) + (h > 1 ? a[h - 2] >> this.F2 : 0)
                                , y = this.FV / d
                                , g = (1 << this.F1) / d
                                , m = 1 << this.F2
                                , v = i.t
                                , b = v - h
                                , w = null == e ? n() : e;
                            for (a.dlShiftTo(b, w),
                                i.compareTo(w) >= 0 && (i[i.t++] = 1,
                                    i.subTo(w, i)),
                                r.ONE.dlShiftTo(h, w),
                                w.subTo(a, a); a.t < h;)
                                a[a.t++] = 0;
                            for (; --b >= 0;) {
                                var A = i[--v] == p ? this.DM : Math.floor(i[v] * y + (i[v - 1] + m) * g);
                                if ((i[v] += a.am(0, A, i, b, 0, h)) < A)
                                    for (a.dlShiftTo(b, w),
                                        i.subTo(w, i); i[v] < --A;)
                                        i.subTo(w, i)
                            }
                            null != e && (i.drShiftTo(h, e),
                                c != u && r.ZERO.subTo(e, e)),
                                i.t = h,
                                i.clamp(),
                                l > 0 && i.rShiftTo(l, i),
                                c < 0 && r.ZERO.subTo(i, i)
                        }
                    }
                }
                ,
                r.prototype.invDigit = function () {
                    if (this.t < 1)
                        return 0;
                    var t = this[0];
                    if (0 == (1 & t))
                        return 0;
                    var e = 3 & t;
                    return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
                }
                ,
                r.prototype.isEven = function () {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                ,
                r.prototype.exp = function (t, e) {
                    if (t > 4294967295 || t < 1)
                        return r.ONE;
                    var i = n()
                        , o = n()
                        , s = e.convert(this)
                        , a = f(t) - 1;
                    for (s.copyTo(i); --a >= 0;)
                        if (e.sqrTo(i, o),
                            (t & 1 << a) > 0)
                            e.mulTo(o, s, i);
                        else {
                            var c = i;
                            i = o,
                                o = c
                        }
                    return e.revert(i)
                }
                ,
                r.prototype.toString = function (t) {
                    if (this.s < 0)
                        return "-" + this.negate().toString(t);
                    var e;
                    if (16 == t)
                        e = 4;
                    else if (8 == t)
                        e = 3;
                    else if (2 == t)
                        e = 1;
                    else if (32 == t)
                        e = 5;
                    else {
                        if (4 != t)
                            return this.toRadix(t);
                        e = 2
                    }
                    var r, n = (1 << e) - 1, i = !1, o = "", s = this.t, a = this.DB - s * this.DB % e;
                    if (s-- > 0)
                        for (a < this.DB && (r = this[s] >> a) > 0 && (i = !0,
                            o = c(r)); s >= 0;)
                            a < e ? (r = (this[s] & (1 << a) - 1) << e - a,
                                r |= this[--s] >> (a += this.DB - e)) : (r = this[s] >> (a -= e) & n,
                                    a <= 0 && (a += this.DB,
                                        --s)),
                                r > 0 && (i = !0),
                                i && (o += c(r));
                    return i ? o : "0"
                }
                ,
                r.prototype.negate = function () {
                    var t = n();
                    return r.ZERO.subTo(this, t),
                        t
                }
                ,
                r.prototype.abs = function () {
                    return this.s < 0 ? this.negate() : this
                }
                ,
                r.prototype.compareTo = function (t) {
                    var e = this.s - t.s;
                    if (0 != e)
                        return e;
                    var r = this.t;
                    if (0 != (e = r - t.t))
                        return this.s < 0 ? -e : e;
                    for (; --r >= 0;)
                        if (0 != (e = this[r] - t[r]))
                            return e;
                    return 0
                }
                ,
                r.prototype.bitLength = function () {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + f(this[this.t - 1] ^ this.s & this.DM)
                }
                ,
                r.prototype.mod = function (t) {
                    var e = n();
                    return this.abs().divRemTo(t, null, e),
                        this.s < 0 && e.compareTo(r.ZERO) > 0 && t.subTo(e, e),
                        e
                }
                ,
                r.prototype.modPowInt = function (t, e) {
                    var r;
                    return r = t < 256 || e.isEven() ? new h(e) : new p(e),
                        this.exp(t, r)
                }
                ,
                r.ZERO = l(0),
                r.ONE = l(1),
                w.prototype.convert = A,
                w.prototype.revert = A,
                w.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r)
                }
                ,
                w.prototype.sqrTo = function (t, e) {
                    t.squareTo(e)
                }
                ,
                S.prototype.convert = function (t) {
                    if (t.s < 0 || t.t > 2 * this.m.t)
                        return t.mod(this.m);
                    if (t.compareTo(this.m) < 0)
                        return t;
                    var e = n();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                S.prototype.revert = function (t) {
                    return t
                }
                ,
                S.prototype.reduce = function (t) {
                    for (t.drShiftTo(this.m.t - 1, this.r2),
                        t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                            t.clamp()),
                        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                        t.dAddOffset(1, this.m.t + 1);
                    for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                        t.subTo(this.m, t)
                }
                ,
                S.prototype.mulTo = function (t, e, r) {
                    t.multiplyTo(e, r),
                        this.reduce(r)
                }
                ,
                S.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ;
            var x, B, k, C = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], _ = (1 << 26) / C[C.length - 1];
            function F() {
                var t;
                t = (new Date).getTime(),
                    B[k++] ^= 255 & t,
                    B[k++] ^= t >> 8 & 255,
                    B[k++] ^= t >> 16 & 255,
                    B[k++] ^= t >> 24 & 255,
                    k >= j && (k -= j)
            }
            if (r.prototype.chunkSize = function (t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
                ,
                r.prototype.toRadix = function (t) {
                    if (null == t && (t = 10),
                        0 == this.signum() || t < 2 || t > 36)
                        return "0";
                    var e = this.chunkSize(t)
                        , r = Math.pow(t, e)
                        , i = l(r)
                        , o = n()
                        , s = n()
                        , a = "";
                    for (this.divRemTo(i, o, s); o.signum() > 0;)
                        a = (r + s.intValue()).toString(t).substr(1) + a,
                            o.divRemTo(i, o, s);
                    return s.intValue().toString(t) + a
                }
                ,
                r.prototype.fromRadix = function (t, e) {
                    this.fromInt(0),
                        null == e && (e = 10);
                    for (var n = this.chunkSize(e), i = Math.pow(e, n), o = !1, s = 0, a = 0, c = 0; c < t.length; ++c) {
                        var l = u(t, c);
                        l < 0 ? "-" == t.charAt(c) && 0 == this.signum() && (o = !0) : (a = e * a + l,
                            ++s >= n && (this.dMultiply(i),
                                this.dAddOffset(a, 0),
                                s = 0,
                                a = 0))
                    }
                    s > 0 && (this.dMultiply(Math.pow(e, s)),
                        this.dAddOffset(a, 0)),
                        o && r.ZERO.subTo(this, this)
                }
                ,
                r.prototype.fromNumber = function (t, e, n) {
                    if ("number" == typeof e)
                        if (t < 2)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(t, n),
                                this.testBit(t - 1) || this.bitwiseTo(r.ONE.shiftLeft(t - 1), y, this),
                                this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);)
                                this.dAddOffset(2, 0),
                                    this.bitLength() > t && this.subTo(r.ONE.shiftLeft(t - 1), this);
                    else {
                        var i = new Array
                            , o = 7 & t;
                        i.length = 1 + (t >> 3),
                            e.nextBytes(i),
                            o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0,
                            this.fromString(i, 256)
                    }
                }
                ,
                r.prototype.bitwiseTo = function (t, e, r) {
                    var n, i, o = Math.min(t.t, this.t);
                    for (n = 0; n < o; ++n)
                        r[n] = e(this[n], t[n]);
                    if (t.t < this.t) {
                        for (i = t.s & this.DM,
                            n = o; n < this.t; ++n)
                            r[n] = e(this[n], i);
                        r.t = this.t
                    } else {
                        for (i = this.s & this.DM,
                            n = o; n < t.t; ++n)
                            r[n] = e(i, t[n]);
                        r.t = t.t
                    }
                    r.s = e(this.s, t.s),
                        r.clamp()
                }
                ,
                r.prototype.changeBit = function (t, e) {
                    var n = r.ONE.shiftLeft(t);
                    return this.bitwiseTo(n, e, n),
                        n
                }
                ,
                r.prototype.addTo = function (t, e) {
                    for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;)
                        n += this[r] + t[r],
                            e[r++] = n & this.DM,
                            n >>= this.DB;
                    if (t.t < this.t) {
                        for (n += t.s; r < this.t;)
                            n += this[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += this.s
                    } else {
                        for (n += this.s; r < t.t;)
                            n += t[r],
                                e[r++] = n & this.DM,
                                n >>= this.DB;
                        n += t.s
                    }
                    e.s = n < 0 ? -1 : 0,
                        n > 0 ? e[r++] = n : n < -1 && (e[r++] = this.DV + n),
                        e.t = r,
                        e.clamp()
                }
                ,
                r.prototype.dMultiply = function (t) {
                    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                        ++this.t,
                        this.clamp()
                }
                ,
                r.prototype.dAddOffset = function (t, e) {
                    if (0 != t) {
                        for (; this.t <= e;)
                            this[this.t++] = 0;
                        for (this[e] += t; this[e] >= this.DV;)
                            this[e] -= this.DV,
                                ++e >= this.t && (this[this.t++] = 0),
                                ++this[e]
                    }
                }
                ,
                r.prototype.multiplyLowerTo = function (t, e, r) {
                    var n, i = Math.min(this.t + t.t, e);
                    for (r.s = 0,
                        r.t = i; i > 0;)
                        r[--i] = 0;
                    for (n = r.t - this.t; i < n; ++i)
                        r[i + this.t] = this.am(0, t[i], r, i, 0, this.t);
                    for (n = Math.min(t.t, e); i < n; ++i)
                        this.am(0, t[i], r, i, 0, e - i);
                    r.clamp()
                }
                ,
                r.prototype.multiplyUpperTo = function (t, e, r) {
                    --e;
                    var n = r.t = this.t + t.t - e;
                    for (r.s = 0; --n >= 0;)
                        r[n] = 0;
                    for (n = Math.max(e - this.t, 0); n < t.t; ++n)
                        r[this.t + n - e] = this.am(e - n, t[n], r, 0, 0, this.t + n - e);
                    r.clamp(),
                        r.drShiftTo(1, r)
                }
                ,
                r.prototype.modInt = function (t) {
                    if (t <= 0)
                        return 0;
                    var e = this.DV % t
                        , r = this.s < 0 ? t - 1 : 0;
                    if (this.t > 0)
                        if (0 == e)
                            r = this[0] % t;
                        else
                            for (var n = this.t - 1; n >= 0; --n)
                                r = (e * r + this[n]) % t;
                    return r
                }
                ,
                r.prototype.millerRabin = function (t) {
                    var e = this.subtract(r.ONE)
                        , i = e.getLowestSetBit();
                    if (i <= 0)
                        return !1;
                    var o = e.shiftRight(i);
                    (t = t + 1 >> 1) > C.length && (t = C.length);
                    for (var s = n(), a = 0; a < t; ++a) {
                        s.fromInt(C[Math.floor(Math.random() * C.length)]);
                        var c = s.modPow(o, this);
                        if (0 != c.compareTo(r.ONE) && 0 != c.compareTo(e)) {
                            for (var u = 1; u++ < i && 0 != c.compareTo(e);)
                                if (0 == (c = c.modPowInt(2, this)).compareTo(r.ONE))
                                    return !1;
                            if (0 != c.compareTo(e))
                                return !1
                        }
                    }
                    return !0
                }
                ,
                r.prototype.clone = function () {
                    var t = n();
                    return this.copyTo(t),
                        t
                }
                ,
                r.prototype.intValue = function () {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                ,
                r.prototype.byteValue = function () {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                ,
                r.prototype.shortValue = function () {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                ,
                r.prototype.signum = function () {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                ,
                r.prototype.toByteArray = function () {
                    var t = this.t
                        , e = new Array;
                    e[0] = this.s;
                    var r, n = this.DB - t * this.DB % 8, i = 0;
                    if (t-- > 0)
                        for (n < this.DB && (r = this[t] >> n) != (this.s & this.DM) >> n && (e[i++] = r | this.s << this.DB - n); t >= 0;)
                            n < 8 ? (r = (this[t] & (1 << n) - 1) << 8 - n,
                                r |= this[--t] >> (n += this.DB - 8)) : (r = this[t] >> (n -= 8) & 255,
                                    n <= 0 && (n += this.DB,
                                        --t)),
                                0 != (128 & r) && (r |= -256),
                                0 == i && (128 & this.s) != (128 & r) && ++i,
                                (i > 0 || r != this.s) && (e[i++] = r);
                    return e
                }
                ,
                r.prototype.equals = function (t) {
                    return 0 == this.compareTo(t)
                }
                ,
                r.prototype.min = function (t) {
                    return this.compareTo(t) < 0 ? this : t
                }
                ,
                r.prototype.max = function (t) {
                    return this.compareTo(t) > 0 ? this : t
                }
                ,
                r.prototype.and = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, d, e),
                        e
                }
                ,
                r.prototype.or = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, y, e),
                        e
                }
                ,
                r.prototype.xor = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, g, e),
                        e
                }
                ,
                r.prototype.andNot = function (t) {
                    var e = n();
                    return this.bitwiseTo(t, m, e),
                        e
                }
                ,
                r.prototype.not = function () {
                    for (var t = n(), e = 0; e < this.t; ++e)
                        t[e] = this.DM & ~this[e];
                    return t.t = this.t,
                        t.s = ~this.s,
                        t
                }
                ,
                r.prototype.shiftLeft = function (t) {
                    var e = n();
                    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                        e
                }
                ,
                r.prototype.shiftRight = function (t) {
                    var e = n();
                    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                        e
                }
                ,
                r.prototype.getLowestSetBit = function () {
                    for (var t = 0; t < this.t; ++t)
                        if (0 != this[t])
                            return t * this.DB + v(this[t]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                ,
                r.prototype.bitCount = function () {
                    for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r)
                        t += b(this[r] ^ e);
                    return t
                }
                ,
                r.prototype.testBit = function (t) {
                    var e = Math.floor(t / this.DB);
                    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                }
                ,
                r.prototype.setBit = function (t) {
                    return this.changeBit(t, y)
                }
                ,
                r.prototype.clearBit = function (t) {
                    return this.changeBit(t, m)
                }
                ,
                r.prototype.flipBit = function (t) {
                    return this.changeBit(t, g)
                }
                ,
                r.prototype.add = function (t) {
                    var e = n();
                    return this.addTo(t, e),
                        e
                }
                ,
                r.prototype.subtract = function (t) {
                    var e = n();
                    return this.subTo(t, e),
                        e
                }
                ,
                r.prototype.multiply = function (t) {
                    var e = n();
                    return this.multiplyTo(t, e),
                        e
                }
                ,
                r.prototype.divide = function (t) {
                    var e = n();
                    return this.divRemTo(t, e, null),
                        e
                }
                ,
                r.prototype.remainder = function (t) {
                    var e = n();
                    return this.divRemTo(t, null, e),
                        e
                }
                ,
                r.prototype.divideAndRemainder = function (t) {
                    var e = n()
                        , r = n();
                    return this.divRemTo(t, e, r),
                        new Array(e, r)
                }
                ,
                r.prototype.modPow = function (t, e) {
                    var r, i, o = t.bitLength(), s = l(1);
                    if (o <= 0)
                        return s;
                    r = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                        i = o < 8 ? new h(e) : e.isEven() ? new S(e) : new p(e);
                    var a = new Array
                        , c = 3
                        , u = r - 1
                        , d = (1 << r) - 1;
                    if (a[1] = i.convert(this),
                        r > 1) {
                        var y = n();
                        for (i.sqrTo(a[1], y); c <= d;)
                            a[c] = n(),
                                i.mulTo(y, a[c - 2], a[c]),
                                c += 2
                    }
                    var g, m, v = t.t - 1, b = !0, w = n();
                    for (o = f(t[v]) - 1; v >= 0;) {
                        for (o >= u ? g = t[v] >> o - u & d : (g = (t[v] & (1 << o + 1) - 1) << u - o,
                            v > 0 && (g |= t[v - 1] >> this.DB + o - u)),
                            c = r; 0 == (1 & g);)
                            g >>= 1,
                                --c;
                        if ((o -= c) < 0 && (o += this.DB,
                            --v),
                            b)
                            a[g].copyTo(s),
                                b = !1;
                        else {
                            for (; c > 1;)
                                i.sqrTo(s, w),
                                    i.sqrTo(w, s),
                                    c -= 2;
                            c > 0 ? i.sqrTo(s, w) : (m = s,
                                s = w,
                                w = m),
                                i.mulTo(w, a[g], s)
                        }
                        for (; v >= 0 && 0 == (t[v] & 1 << o);)
                            i.sqrTo(s, w),
                                m = s,
                                s = w,
                                w = m,
                                --o < 0 && (o = this.DB - 1,
                                    --v)
                    }
                    return i.revert(s)
                }
                ,
                r.prototype.modInverse = function (t) {
                    var e = t.isEven();
                    if (this.isEven() && e || 0 == t.signum())
                        return r.ZERO;
                    for (var n = t.clone(), i = this.clone(), o = l(1), s = l(0), a = l(0), c = l(1); 0 != n.signum();) {
                        for (; n.isEven();)
                            n.rShiftTo(1, n),
                                e ? (o.isEven() && s.isEven() || (o.addTo(this, o),
                                    s.subTo(t, s)),
                                    o.rShiftTo(1, o)) : s.isEven() || s.subTo(t, s),
                                s.rShiftTo(1, s);
                        for (; i.isEven();)
                            i.rShiftTo(1, i),
                                e ? (a.isEven() && c.isEven() || (a.addTo(this, a),
                                    c.subTo(t, c)),
                                    a.rShiftTo(1, a)) : c.isEven() || c.subTo(t, c),
                                c.rShiftTo(1, c);
                        n.compareTo(i) >= 0 ? (n.subTo(i, n),
                            e && o.subTo(a, o),
                            s.subTo(c, s)) : (i.subTo(n, i),
                                e && a.subTo(o, a),
                                c.subTo(s, c))
                    }
                    return 0 != i.compareTo(r.ONE) ? r.ZERO : c.compareTo(t) >= 0 ? c.subtract(t) : c.signum() < 0 ? (c.addTo(t, c),
                        c.signum() < 0 ? c.add(t) : c) : c
                }
                ,
                r.prototype.pow = function (t) {
                    return this.exp(t, new w)
                }
                ,
                r.prototype.gcd = function (t) {
                    var e = this.s < 0 ? this.negate() : this.clone()
                        , r = t.s < 0 ? t.negate() : t.clone();
                    if (e.compareTo(r) < 0) {
                        var n = e;
                        e = r,
                            r = n
                    }
                    var i = e.getLowestSetBit()
                        , o = r.getLowestSetBit();
                    if (o < 0)
                        return e;
                    for (i < o && (o = i),
                        o > 0 && (e.rShiftTo(o, e),
                            r.rShiftTo(o, r)); e.signum() > 0;)
                        (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                            (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                            e.compareTo(r) >= 0 ? (e.subTo(r, e),
                                e.rShiftTo(1, e)) : (r.subTo(e, r),
                                    r.rShiftTo(1, r));
                    return o > 0 && r.lShiftTo(o, r),
                        r
                }
                ,
                r.prototype.isProbablePrime = function (t) {
                    var e, r = this.abs();
                    if (1 == r.t && r[0] <= C[C.length - 1]) {
                        for (e = 0; e < C.length; ++e)
                            if (r[0] == C[e])
                                return !0;
                        return !1
                    }
                    if (r.isEven())
                        return !1;
                    for (e = 1; e < C.length;) {
                        for (var n = C[e], i = e + 1; i < C.length && n < _;)
                            n *= C[i++];
                        for (n = r.modInt(n); e < i;)
                            if (n % C[e++] == 0)
                                return !1
                    }
                    return r.millerRabin(t)
                }
                ,
                r.prototype.square = function () {
                    var t = n();
                    return this.squareTo(t),
                        t
                }
                ,
                r.prototype.Barrett = S,
                null == B) {
                var T;
                if (B = new Array,
                    k = 0,
                    "undefined" != typeof window && window.crypto)
                    if (window.crypto.getRandomValues) {
                        var E = new Uint8Array(32);
                        for (window.crypto.getRandomValues(E),
                            T = 0; T < 32; ++T)
                            B[k++] = E[T]
                    } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
                        var P = window.crypto.random(32);
                        for (T = 0; T < P.length; ++T)
                            B[k++] = 255 & P.charCodeAt(T)
                    }
                for (; k < j;)
                    T = Math.floor(65536 * Math.random()),
                        B[k++] = T >>> 8,
                        B[k++] = 255 & T;
                k = 0,
                    F()
            }
            function I() {
                if (null == x) {
                    for (F(),
                        (x = new R).init(B),
                        k = 0; k < B.length; ++k)
                        B[k] = 0;
                    k = 0
                }
                return x.next()
            }
            function O() { }
            function R() {
                this.i = 0,
                    this.j = 0,
                    this.S = new Array
            }
            O.prototype.nextBytes = function (t) {
                var e;
                for (e = 0; e < t.length; ++e)
                    t[e] = I()
            }
                ,
                R.prototype.init = function (t) {
                    var e, r, n;
                    for (e = 0; e < 256; ++e)
                        this.S[e] = e;
                    for (r = 0,
                        e = 0; e < 256; ++e)
                        r = r + this.S[e] + t[e % t.length] & 255,
                            n = this.S[e],
                            this.S[e] = this.S[r],
                            this.S[r] = n;
                    this.i = 0,
                        this.j = 0
                }
                ,
                R.prototype.next = function () {
                    var t;
                    return this.i = this.i + 1 & 255,
                        this.j = this.j + this.S[this.i] & 255,
                        t = this.S[this.i],
                        this.S[this.i] = this.S[this.j],
                        this.S[this.j] = t,
                        this.S[t + this.S[this.i] & 255]
                }
                ;
            var j = 256;
            t.exports = {
                default: r,
                BigInteger: r,
                SecureRandom: O
            }
        }
        ).call(this)
    },
    "dffd": function (t, e, r) {
        const { BigInteger: n, SecureRandom: i } = r("f33e")
            , { ECCurveFp: o } = r("4701")
            , s = new i
            , { curve: a, G: c, n: u } = l();
        function l() {
            const t = new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF", 16)
                , e = new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC", 16)
                , r = new n("28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93", 16)
                , i = new o(t, e, r)
                , s = i.decodePointHex("0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0");
            return {
                curve: i,
                G: s,
                n: new n("FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123", 16)
            }
        }
        function f(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }
        t.exports = {
            getGlobalCurve: function () {
                return a
            },
            generateEcparam: l,
            generateKeyPairHex: function (t, e, r) {
                const i = (t ? new n(t, e, r) : new n(u.bitLength(), s)).mod(u.subtract(n.ONE)).add(n.ONE)
                    , o = f(i.toString(16), 64)
                    , a = c.multiply(i);
                return {
                    privateKey: o,
                    publicKey: "04" + f(a.getX().toBigInteger().toString(16), 64) + f(a.getY().toBigInteger().toString(16), 64)
                }
            },
            compressPublicKeyHex: function (t) {
                if (130 !== t.length)
                    throw new Error("Invalid public key to compress");
                const e = (t.length - 2) / 2
                    , r = t.substr(2, e);
                let i = "03";
                return new n(t.substr(e + 2, e), 16).mod(new n("2")).equals(n.ZERO) && (i = "02"),
                    i + r
            },
            utf8ToHex: function (t) {
                const e = (t = unescape(encodeURIComponent(t))).length
                    , r = [];
                for (let n = 0; n < e; n++)
                    r[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8;
                const n = [];
                for (let t = 0; t < e; t++) {
                    const e = r[t >>> 2] >>> 24 - t % 4 * 8 & 255;
                    n.push((e >>> 4).toString(16)),
                        n.push((15 & e).toString(16))
                }
                return n.join("")
            },
            leftPad: f,
            arrayToHex: function (t) {
                return t.map(t => 1 === (t = t.toString(16)).length ? "0" + t : t).join("")
            },
            arrayToUtf8: function (t) {
                const e = [];
                let r = 0;
                for (let n = 0; n < 2 * t.length; n += 2)
                    e[n >>> 3] |= parseInt(t[r], 10) << 24 - n % 8 * 4,
                        r++;
                try {
                    const r = [];
                    for (let n = 0; n < t.length; n++) {
                        const t = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        r.push(String.fromCharCode(t))
                    }
                    return decodeURIComponent(escape(r.join("")))
                } catch (t) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            hexToArray: function (t) {
                const e = [];
                let r = t.length;
                r % 2 != 0 && (t = f(t, r + 1)),
                    r = t.length;
                for (let n = 0; n < r; n += 2)
                    e.push(parseInt(t.substr(n, 2), 16));
                return e
            },
            verifyPublicKey: function (t) {
                const e = a.decodePointHex(t);
                if (!e)
                    return !1;
                const r = e.getX();
                return e.getY().square().equals(r.multiply(r.square()).add(r.multiply(a.a)).add(a.b))
            },
            comparePublicKeyHex: function (t, e) {
                const r = a.decodePointHex(t);
                if (!r)
                    return !1;
                const n = a.decodePointHex(e);
                return !!n && r.equals(n)
            }
        }
    },
    "4701": function (t, e, r) {
        const { BigInteger: n } = r("f33e")
            , i = new n("2")
            , o = new n("3");
        class s {
            constructor(t, e) {
                this.x = e,
                    this.q = t
            }
            equals(t) {
                return t === this || this.q.equals(t.q) && this.x.equals(t.x)
            }
            toBigInteger() {
                return this.x
            }
            negate() {
                return new s(this.q, this.x.negate().mod(this.q))
            }
            add(t) {
                return new s(this.q, this.x.add(t.toBigInteger()).mod(this.q))
            }
            subtract(t) {
                return new s(this.q, this.x.subtract(t.toBigInteger()).mod(this.q))
            }
            multiply(t) {
                return new s(this.q, this.x.multiply(t.toBigInteger()).mod(this.q))
            }
            divide(t) {
                return new s(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))
            }
            square() {
                return new s(this.q, this.x.square().mod(this.q))
            }
        }
        class a {
            constructor(t, e, r, i) {
                this.curve = t,
                    this.x = e,
                    this.y = r,
                    this.z = null == i ? n.ONE : i,
                    this.zinv = null
            }
            getX() {
                return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
                    this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
            }
            getY() {
                return null === this.zinv && (this.zinv = this.z.modInverse(this.curve.q)),
                    this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
            }
            equals(t) {
                if (t === this)
                    return !0;
                if (this.isInfinity())
                    return t.isInfinity();
                if (t.isInfinity())
                    return this.isInfinity();
                if (!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(n.ZERO))
                    return !1;
                return t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(n.ZERO)
            }
            isInfinity() {
                return null === this.x && null === this.y || this.z.equals(n.ZERO) && !this.y.toBigInteger().equals(n.ZERO)
            }
            negate() {
                return new a(this.curve, this.x, this.y.negate(), this.z)
            }
            add(t) {
                if (this.isInfinity())
                    return t;
                if (t.isInfinity())
                    return this;
                const e = this.x.toBigInteger()
                    , r = this.y.toBigInteger()
                    , i = this.z
                    , o = t.x.toBigInteger()
                    , s = t.y.toBigInteger()
                    , c = t.z
                    , u = this.curve.q
                    , l = e.multiply(c).mod(u)
                    , f = o.multiply(i).mod(u)
                    , h = l.subtract(f)
                    , p = r.multiply(c).mod(u)
                    , d = s.multiply(i).mod(u)
                    , y = p.subtract(d);
                if (n.ZERO.equals(h))
                    return n.ZERO.equals(y) ? this.twice() : this.curve.infinity;
                const g = l.add(f)
                    , m = i.multiply(c).mod(u)
                    , v = h.square().mod(u)
                    , b = h.multiply(v).mod(u)
                    , w = m.multiply(y.square()).subtract(g.multiply(v)).mod(u)
                    , A = h.multiply(w).mod(u)
                    , S = y.multiply(v.multiply(l).subtract(w)).subtract(p.multiply(b)).mod(u)
                    , x = b.multiply(m).mod(u);
                return new a(this.curve, this.curve.fromBigInteger(A), this.curve.fromBigInteger(S), x)
            }
            twice() {
                if (this.isInfinity())
                    return this;
                if (!this.y.toBigInteger().signum())
                    return this.curve.infinity;
                const t = this.x.toBigInteger()
                    , e = this.y.toBigInteger()
                    , r = this.z
                    , n = this.curve.q
                    , i = this.curve.a.toBigInteger()
                    , s = t.square().multiply(o).add(i.multiply(r.square())).mod(n)
                    , c = e.shiftLeft(1).multiply(r).mod(n)
                    , u = e.square().mod(n)
                    , l = u.multiply(t).multiply(r).mod(n)
                    , f = c.square().mod(n)
                    , h = s.square().subtract(l.shiftLeft(3)).mod(n)
                    , p = c.multiply(h).mod(n)
                    , d = s.multiply(l.shiftLeft(2).subtract(h)).subtract(f.shiftLeft(1).multiply(u)).mod(n)
                    , y = c.multiply(f).mod(n);
                return new a(this.curve, this.curve.fromBigInteger(p), this.curve.fromBigInteger(d), y)
            }
            multiply(t) {
                if (this.isInfinity())
                    return this;
                if (!t.signum())
                    return this.curve.infinity;
                const e = t.multiply(o)
                    , r = this.negate();
                let n = this;
                for (let i = e.bitLength() - 2; i > 0; i--) {
                    n = n.twice();
                    const o = e.testBit(i);
                    o !== t.testBit(i) && (n = n.add(o ? this : r))
                }
                return n
            }
        }
        t.exports = {
            ECPointFp: a,
            ECCurveFp: class {
                constructor(t, e, r) {
                    this.q = t,
                        this.a = this.fromBigInteger(e),
                        this.b = this.fromBigInteger(r),
                        this.infinity = new a(this, null, null)
                }
                equals(t) {
                    return t === this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b)
                }
                fromBigInteger(t) {
                    return new s(this.q, t)
                }
                decodePointHex(t) {
                    switch (parseInt(t.substr(0, 2), 16)) {
                        case 0:
                            return this.infinity;
                        case 2:
                        case 3:
                            const e = this.fromBigInteger(new n(t.substr(2), 16));
                            let r = this.fromBigInteger(e.multiply(e.square()).add(e.multiply(this.a)).add(this.b).toBigInteger().modPow(this.q.divide(new n("4")).add(n.ONE), this.q));
                            return r.toBigInteger().mod(i).equals(new n(t.substr(0, 2), 16).subtract(i)) || (r = r.negate()),
                                new a(this, e, r);
                        case 4:
                        case 6:
                        case 7:
                            const o = (t.length - 2) / 2
                                , s = t.substr(2, o)
                                , c = t.substr(o + 2, o);
                            return new a(this, this.fromBigInteger(new n(s, 16)), this.fromBigInteger(new n(c, 16)));
                        default:
                            return null
                    }
                }
            }
        }
    }
}


const back = (str) => "04" + s("8060").sm2.doEncrypt(`{"x":${str},"y":5}`, "04182b39fcaa3d111981de100d3742cceae4b94b662352591f2cc33a52d4fce716be9594c60c9c5221fe40751c51cf546ddd406e49c2d259e194f1bcfdf75e8d7a", 1)

