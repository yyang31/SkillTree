import {
    _registerComponent as t,
    registerVersion as e,
    _getProvider as n,
    getApp as s,
    _removeServiceInstance as r,
    SDK_VERSION as i,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
const o = function (t) {
        const e = [];
        let n = 0;
        for (let s = 0; s < t.length; s++) {
            let r = t.charCodeAt(s);
            r < 128
                ? (e[n++] = r)
                : r < 2048
                ? ((e[n++] = (r >> 6) | 192), (e[n++] = (63 & r) | 128))
                : 55296 == (64512 & r) &&
                  s + 1 < t.length &&
                  56320 == (64512 & t.charCodeAt(s + 1))
                ? ((r =
                      65536 + ((1023 & r) << 10) + (1023 & t.charCodeAt(++s))),
                  (e[n++] = (r >> 18) | 240),
                  (e[n++] = ((r >> 12) & 63) | 128),
                  (e[n++] = ((r >> 6) & 63) | 128),
                  (e[n++] = (63 & r) | 128))
                : ((e[n++] = (r >> 12) | 224),
                  (e[n++] = ((r >> 6) & 63) | 128),
                  (e[n++] = (63 & r) | 128));
        }
        return e;
    },
    a = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: "function" == typeof atob,
        encodeByteArray(t, e) {
            if (!Array.isArray(t))
                throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                s = [];
            for (let e = 0; e < t.length; e += 3) {
                const r = t[e],
                    i = e + 1 < t.length,
                    o = i ? t[e + 1] : 0,
                    a = e + 2 < t.length,
                    u = a ? t[e + 2] : 0,
                    c = r >> 2,
                    h = ((3 & r) << 4) | (o >> 4);
                let l = ((15 & o) << 2) | (u >> 6),
                    d = 63 & u;
                a || ((d = 64), i || (l = 64)), s.push(n[c], n[h], n[l], n[d]);
            }
            return s.join("");
        },
        encodeString(t, e) {
            return this.HAS_NATIVE_SUPPORT && !e
                ? btoa(t)
                : this.encodeByteArray(o(t), e);
        },
        decodeString(t, e) {
            return this.HAS_NATIVE_SUPPORT && !e
                ? atob(t)
                : (function (t) {
                      const e = [];
                      let n = 0,
                          s = 0;
                      for (; n < t.length; ) {
                          const r = t[n++];
                          if (r < 128) e[s++] = String.fromCharCode(r);
                          else if (r > 191 && r < 224) {
                              const i = t[n++];
                              e[s++] = String.fromCharCode(
                                  ((31 & r) << 6) | (63 & i)
                              );
                          } else if (r > 239 && r < 365) {
                              const i =
                                  (((7 & r) << 18) |
                                      ((63 & t[n++]) << 12) |
                                      ((63 & t[n++]) << 6) |
                                      (63 & t[n++])) -
                                  65536;
                              (e[s++] = String.fromCharCode(55296 + (i >> 10))),
                                  (e[s++] = String.fromCharCode(
                                      56320 + (1023 & i)
                                  ));
                          } else {
                              const i = t[n++],
                                  o = t[n++];
                              e[s++] = String.fromCharCode(
                                  ((15 & r) << 12) | ((63 & i) << 6) | (63 & o)
                              );
                          }
                      }
                      return e.join("");
                  })(this.decodeStringToByteArray(t, e));
        },
        decodeStringToByteArray(t, e) {
            this.init_();
            const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                s = [];
            for (let e = 0; e < t.length; ) {
                const r = n[t.charAt(e++)],
                    i = e < t.length ? n[t.charAt(e)] : 0;
                ++e;
                const o = e < t.length ? n[t.charAt(e)] : 64;
                ++e;
                const a = e < t.length ? n[t.charAt(e)] : 64;
                if ((++e, null == r || null == i || null == o || null == a))
                    throw Error();
                const u = (r << 2) | (i >> 4);
                if ((s.push(u), 64 !== o)) {
                    const t = ((i << 4) & 240) | (o >> 2);
                    if ((s.push(t), 64 !== a)) {
                        const t = ((o << 6) & 192) | a;
                        s.push(t);
                    }
                }
            }
            return s;
        },
        init_() {
            if (!this.byteToCharMap_) {
                (this.byteToCharMap_ = {}),
                    (this.charToByteMap_ = {}),
                    (this.byteToCharMapWebSafe_ = {}),
                    (this.charToByteMapWebSafe_ = {});
                for (let t = 0; t < this.ENCODED_VALS.length; t++)
                    (this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t)),
                        (this.charToByteMap_[this.byteToCharMap_[t]] = t),
                        (this.byteToCharMapWebSafe_[t] =
                            this.ENCODED_VALS_WEBSAFE.charAt(t)),
                        (this.charToByteMapWebSafe_[
                            this.byteToCharMapWebSafe_[t]
                        ] = t),
                        t >= this.ENCODED_VALS_BASE.length &&
                            ((this.charToByteMap_[
                                this.ENCODED_VALS_WEBSAFE.charAt(t)
                            ] = t),
                            (this.charToByteMapWebSafe_[
                                this.ENCODED_VALS.charAt(t)
                            ] = t));
            }
        },
    },
    u = function (t) {
        return (function (t) {
            const e = o(t);
            return a.encodeByteArray(e, !0);
        })(t).replace(/\./g, "");
    };
const c = () =>
        (function () {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if ("undefined" != typeof global) return global;
            throw new Error("Unable to locate global object.");
        })().__FIREBASE_DEFAULTS__,
    h = () => {
        if ("undefined" == typeof document) return;
        let t;
        try {
            t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
        } catch (t) {
            return;
        }
        const e =
            t &&
            (function (t) {
                try {
                    return a.decodeString(t, !0);
                } catch (t) {
                    console.error("base64Decode failed: ", t);
                }
                return null;
            })(t[1]);
        return e && JSON.parse(e);
    },
    l = () => {
        try {
            return (
                c() ||
                (() => {
                    if ("undefined" == typeof process || void 0 === process.env)
                        return;
                    const t = process.env.__FIREBASE_DEFAULTS__;
                    return t ? JSON.parse(t) : void 0;
                })() ||
                h()
            );
        } catch (t) {
            return void console.info(
                `Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`
            );
        }
    },
    d = (t) => {
        const e = ((t) => {
            var e, n;
            return null ===
                (n =
                    null === (e = l()) || void 0 === e
                        ? void 0
                        : e.emulatorHosts) || void 0 === n
                ? void 0
                : n[t];
        })(t);
        if (!e) return;
        const n = e.lastIndexOf(":");
        if (n <= 0 || n + 1 === e.length)
            throw new Error(
                `Invalid host ${e} with no separate hostname and port!`
            );
        const s = parseInt(e.substring(n + 1), 10);
        return "[" === e[0]
            ? [e.substring(1, n - 1), s]
            : [e.substring(0, n), s];
    };
function f() {
    return "undefined" != typeof navigator &&
        "string" == typeof navigator.userAgent
        ? navigator.userAgent
        : "";
}
function m() {
    return (
        !(function () {
            var t;
            const e =
                null === (t = l()) || void 0 === t
                    ? void 0
                    : t.forceEnvironment;
            if ("node" === e) return !0;
            if ("browser" === e) return !1;
            try {
                return (
                    "[object process]" ===
                    Object.prototype.toString.call(global.process)
                );
            } catch (t) {
                return !1;
            }
        })() &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
}
class g extends Error {
    constructor(t, e, n) {
        super(e),
            (this.code = t),
            (this.customData = n),
            (this.name = "FirebaseError"),
            Object.setPrototypeOf(this, g.prototype),
            Error.captureStackTrace &&
                Error.captureStackTrace(this, p.prototype.create);
    }
}
class p {
    constructor(t, e, n) {
        (this.service = t), (this.serviceName = e), (this.errors = n);
    }
    create(t, ...e) {
        const n = e[0] || {},
            s = `${this.service}/${t}`,
            r = this.errors[t],
            i = r
                ? (function (t, e) {
                      return t.replace(y, (t, n) => {
                          const s = e[n];
                          return null != s ? String(s) : `<${n}?>`;
                      });
                  })(r, n)
                : "Error",
            o = `${this.serviceName}: ${i} (${s}).`;
        return new g(s, o, n);
    }
}
const y = /\{\$([^}]+)}/g;
function w(t, e) {
    if (t === e) return !0;
    const n = Object.keys(t),
        s = Object.keys(e);
    for (const r of n) {
        if (!s.includes(r)) return !1;
        const n = t[r],
            i = e[r];
        if (v(n) && v(i)) {
            if (!w(n, i)) return !1;
        } else if (n !== i) return !1;
    }
    for (const t of s) if (!n.includes(t)) return !1;
    return !0;
}
function v(t) {
    return null !== t && "object" == typeof t;
}
function I(t) {
    return t && t._delegate ? t._delegate : t;
}
class b {
    constructor(t, e, n) {
        (this.name = t),
            (this.instanceFactory = e),
            (this.type = n),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
    }
    setInstantiationMode(t) {
        return (this.instantiationMode = t), this;
    }
    setMultipleInstances(t) {
        return (this.multipleInstances = t), this;
    }
    setServiceProps(t) {
        return (this.serviceProps = t), this;
    }
    setInstanceCreatedCallback(t) {
        return (this.onInstanceCreated = t), this;
    }
}
var E;
!(function (t) {
    (t[(t.DEBUG = 0)] = "DEBUG"),
        (t[(t.VERBOSE = 1)] = "VERBOSE"),
        (t[(t.INFO = 2)] = "INFO"),
        (t[(t.WARN = 3)] = "WARN"),
        (t[(t.ERROR = 4)] = "ERROR"),
        (t[(t.SILENT = 5)] = "SILENT");
})(E || (E = {}));
const T = {
        debug: E.DEBUG,
        verbose: E.VERBOSE,
        info: E.INFO,
        warn: E.WARN,
        error: E.ERROR,
        silent: E.SILENT,
    },
    S = E.INFO,
    _ = {
        [E.DEBUG]: "log",
        [E.VERBOSE]: "log",
        [E.INFO]: "info",
        [E.WARN]: "warn",
        [E.ERROR]: "error",
    },
    x = (t, e, ...n) => {
        if (e < t.logLevel) return;
        const s = new Date().toISOString(),
            r = _[e];
        if (!r)
            throw new Error(
                `Attempted to log a message with an invalid logType (value: ${e})`
            );
        console[r](`[${s}]  ${t.name}:`, ...n);
    };
var D,
    A =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
    C = C || {},
    N = A || self;
function k() {}
function R(t) {
    var e = typeof t;
    return (
        "array" ==
            (e =
                "object" != e
                    ? e
                    : t
                    ? Array.isArray(t)
                        ? "array"
                        : e
                    : "null") ||
        ("object" == e && "number" == typeof t.length)
    );
}
function L(t) {
    var e = typeof t;
    return ("object" == e && null != t) || "function" == e;
}
var M = "closure_uid_" + ((1e9 * Math.random()) >>> 0),
    F = 0;
function O(t, e, n) {
    return t.call.apply(t.bind, arguments);
}
function V(t, e, n) {
    if (!t) throw Error();
    if (2 < arguments.length) {
        var s = Array.prototype.slice.call(arguments, 2);
        return function () {
            var n = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(n, s), t.apply(e, n);
        };
    }
    return function () {
        return t.apply(e, arguments);
    };
}
function P(t, e, n) {
    return (P =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
            ? O
            : V).apply(null, arguments);
}
function q(t, e) {
    var n = Array.prototype.slice.call(arguments, 1);
    return function () {
        var e = n.slice();
        return e.push.apply(e, arguments), t.apply(this, e);
    };
}
function B(t, e) {
    function n() {}
    (n.prototype = e.prototype),
        (t.X = e.prototype),
        (t.prototype = new n()),
        (t.prototype.constructor = t),
        (t.Wb = function (t, n, s) {
            for (
                var r = Array(arguments.length - 2), i = 2;
                i < arguments.length;
                i++
            )
                r[i - 2] = arguments[i];
            return e.prototype[n].apply(t, r);
        });
}
function U() {
    (this.s = this.s), (this.o = this.o);
}
(U.prototype.s = !1),
    (U.prototype.na = function () {
        var t;
        !this.s &&
            ((this.s = !0), this.M(), 0) &&
            ((t = this),
            (Object.prototype.hasOwnProperty.call(t, M) && t[M]) ||
                (t[M] = ++F));
    }),
    (U.prototype.M = function () {
        if (this.o) for (; this.o.length; ) this.o.shift()();
    });
const G = Array.prototype.indexOf
    ? function (t, e) {
          return Array.prototype.indexOf.call(t, e, void 0);
      }
    : function (t, e) {
          if ("string" == typeof t)
              return "string" != typeof e || 1 != e.length
                  ? -1
                  : t.indexOf(e, 0);
          for (let n = 0; n < t.length; n++) if (n in t && t[n] === e) return n;
          return -1;
      };
function K(t) {
    const e = t.length;
    if (0 < e) {
        const n = Array(e);
        for (let s = 0; s < e; s++) n[s] = t[s];
        return n;
    }
    return [];
}
function j(t, e) {
    for (let e = 1; e < arguments.length; e++) {
        const n = arguments[e];
        if (R(n)) {
            const e = t.length || 0,
                s = n.length || 0;
            t.length = e + s;
            for (let r = 0; r < s; r++) t[e + r] = n[r];
        } else t.push(n);
    }
}
function $(t, e) {
    (this.type = t), (this.g = this.target = e), (this.defaultPrevented = !1);
}
$.prototype.h = function () {
    this.defaultPrevented = !0;
};
var Q = (function () {
    if (!N.addEventListener || !Object.defineProperty) return !1;
    var t = !1,
        e = Object.defineProperty({}, "passive", {
            get: function () {
                t = !0;
            },
        });
    try {
        N.addEventListener("test", k, e), N.removeEventListener("test", k, e);
    } catch (t) {}
    return t;
})();
function z(t) {
    return /^[\s\xa0]*$/.test(t);
}
var H = String.prototype.trim
    ? function (t) {
          return t.trim();
      }
    : function (t) {
          return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1];
      };
function W(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}
function Y() {
    var t = N.navigator;
    return t && (t = t.userAgent) ? t : "";
}
function X(t) {
    return -1 != Y().indexOf(t);
}
function J(t) {
    return J[" "](t), t;
}
J[" "] = k;
var Z,
    tt,
    et = X("Opera"),
    nt = X("Trident") || X("MSIE"),
    st = X("Edge"),
    rt = st || nt,
    it =
        X("Gecko") &&
        !(-1 != Y().toLowerCase().indexOf("webkit") && !X("Edge")) &&
        !(X("Trident") || X("MSIE")) &&
        !X("Edge"),
    ot = -1 != Y().toLowerCase().indexOf("webkit") && !X("Edge");
function at() {
    var t = N.document;
    return t ? t.documentMode : void 0;
}
t: {
    var ut = "",
        ct =
            ((tt = Y()),
            it
                ? /rv:([^\);]+)(\)|;)/.exec(tt)
                : st
                ? /Edge\/([\d\.]+)/.exec(tt)
                : nt
                ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(tt)
                : ot
                ? /WebKit\/(\S+)/.exec(tt)
                : et
                ? /(?:Version)[ \/]?(\S+)/.exec(tt)
                : void 0);
    if ((ct && (ut = ct ? ct[1] : ""), nt)) {
        var ht = at();
        if (null != ht && ht > parseFloat(ut)) {
            Z = String(ht);
            break t;
        }
    }
    Z = ut;
}
var lt,
    dt = {};
function ft() {
    return (function (t) {
        var e = dt;
        return Object.prototype.hasOwnProperty.call(e, 9)
            ? e[9]
            : (e[9] = t(9));
    })(function () {
        let t = 0;
        const e = H(String(Z)).split("."),
            n = H("9").split("."),
            s = Math.max(e.length, n.length);
        for (let o = 0; 0 == t && o < s; o++) {
            var r = e[o] || "",
                i = n[o] || "";
            do {
                if (
                    ((r = /(\d*)(\D*)(.*)/.exec(r) || ["", "", "", ""]),
                    (i = /(\d*)(\D*)(.*)/.exec(i) || ["", "", "", ""]),
                    0 == r[0].length && 0 == i[0].length)
                )
                    break;
                (t =
                    W(
                        0 == r[1].length ? 0 : parseInt(r[1], 10),
                        0 == i[1].length ? 0 : parseInt(i[1], 10)
                    ) ||
                    W(0 == r[2].length, 0 == i[2].length) ||
                    W(r[2], i[2])),
                    (r = r[3]),
                    (i = i[3]);
            } while (0 == t);
        }
        return 0 <= t;
    });
}
if (N.document && nt) {
    var mt = at();
    lt = mt || parseInt(Z, 10) || void 0;
} else lt = void 0;
var gt = lt;
function pt(t, e) {
    if (
        ($.call(this, t ? t.type : ""),
        (this.relatedTarget = this.g = this.target = null),
        (this.button =
            this.screenY =
            this.screenX =
            this.clientY =
            this.clientX =
                0),
        (this.key = ""),
        (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
        (this.state = null),
        (this.pointerId = 0),
        (this.pointerType = ""),
        (this.i = null),
        t)
    ) {
        var n = (this.type = t.type),
            s =
                t.changedTouches && t.changedTouches.length
                    ? t.changedTouches[0]
                    : null;
        if (
            ((this.target = t.target || t.srcElement),
            (this.g = e),
            (e = t.relatedTarget))
        ) {
            if (it) {
                t: {
                    try {
                        J(e.nodeName);
                        var r = !0;
                        break t;
                    } catch (t) {}
                    r = !1;
                }
                r || (e = null);
            }
        } else
            "mouseover" == n
                ? (e = t.fromElement)
                : "mouseout" == n && (e = t.toElement);
        (this.relatedTarget = e),
            s
                ? ((this.clientX = void 0 !== s.clientX ? s.clientX : s.pageX),
                  (this.clientY = void 0 !== s.clientY ? s.clientY : s.pageY),
                  (this.screenX = s.screenX || 0),
                  (this.screenY = s.screenY || 0))
                : ((this.clientX = void 0 !== t.clientX ? t.clientX : t.pageX),
                  (this.clientY = void 0 !== t.clientY ? t.clientY : t.pageY),
                  (this.screenX = t.screenX || 0),
                  (this.screenY = t.screenY || 0)),
            (this.button = t.button),
            (this.key = t.key || ""),
            (this.ctrlKey = t.ctrlKey),
            (this.altKey = t.altKey),
            (this.shiftKey = t.shiftKey),
            (this.metaKey = t.metaKey),
            (this.pointerId = t.pointerId || 0),
            (this.pointerType =
                "string" == typeof t.pointerType
                    ? t.pointerType
                    : yt[t.pointerType] || ""),
            (this.state = t.state),
            (this.i = t),
            t.defaultPrevented && pt.X.h.call(this);
    }
}
B(pt, $);
var yt = { 2: "touch", 3: "pen", 4: "mouse" };
pt.prototype.h = function () {
    pt.X.h.call(this);
    var t = this.i;
    t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
};
var wt = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    vt = 0;
function It(t, e, n, s, r) {
    (this.listener = t),
        (this.proxy = null),
        (this.src = e),
        (this.type = n),
        (this.capture = !!s),
        (this.ha = r),
        (this.key = ++vt),
        (this.ba = this.ea = !1);
}
function bt(t) {
    (t.ba = !0),
        (t.listener = null),
        (t.proxy = null),
        (t.src = null),
        (t.ha = null);
}
function Et(t, e, n) {
    for (const s in t) e.call(n, t[s], s, t);
}
function Tt(t) {
    const e = {};
    for (const n in t) e[n] = t[n];
    return e;
}
const St =
    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
        " "
    );
function _t(t, e) {
    let n, s;
    for (let e = 1; e < arguments.length; e++) {
        for (n in ((s = arguments[e]), s)) t[n] = s[n];
        for (let e = 0; e < St.length; e++)
            (n = St[e]),
                Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
    }
}
function xt(t) {
    (this.src = t), (this.g = {}), (this.h = 0);
}
function Dt(t, e) {
    var n = e.type;
    if (n in t.g) {
        var s,
            r = t.g[n],
            i = G(r, e);
        (s = 0 <= i) && Array.prototype.splice.call(r, i, 1),
            s && (bt(e), 0 == t.g[n].length && (delete t.g[n], t.h--));
    }
}
function At(t, e, n, s) {
    for (var r = 0; r < t.length; ++r) {
        var i = t[r];
        if (!i.ba && i.listener == e && i.capture == !!n && i.ha == s) return r;
    }
    return -1;
}
xt.prototype.add = function (t, e, n, s, r) {
    var i = t.toString();
    (t = this.g[i]) || ((t = this.g[i] = []), this.h++);
    var o = At(t, e, s, r);
    return (
        -1 < o
            ? ((e = t[o]), n || (e.ea = !1))
            : (((e = new It(e, this.src, i, !!s, r)).ea = n), t.push(e)),
        e
    );
};
var Ct = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Nt = {};
function kt(t, e, n, s, r) {
    if (s && s.once) return Lt(t, e, n, s, r);
    if (Array.isArray(e)) {
        for (var i = 0; i < e.length; i++) kt(t, e[i], n, s, r);
        return null;
    }
    return (
        (n = Bt(n)),
        t && t[wt]
            ? t.N(e, n, L(s) ? !!s.capture : !!s, r)
            : Rt(t, e, n, !1, s, r)
    );
}
function Rt(t, e, n, s, r, i) {
    if (!e) throw Error("Invalid event type");
    var o = L(r) ? !!r.capture : !!r,
        a = Pt(t);
    if ((a || (t[Ct] = a = new xt(t)), (n = a.add(e, n, s, o, i)).proxy))
        return n;
    if (
        ((s = (function () {
            function t(n) {
                return e.call(t.src, t.listener, n);
            }
            const e = Vt;
            return t;
        })()),
        (n.proxy = s),
        (s.src = t),
        (s.listener = n),
        t.addEventListener)
    )
        Q || (r = o),
            void 0 === r && (r = !1),
            t.addEventListener(e.toString(), s, r);
    else if (t.attachEvent) t.attachEvent(Ot(e.toString()), s);
    else {
        if (!t.addListener || !t.removeListener)
            throw Error("addEventListener and attachEvent are unavailable.");
        t.addListener(s);
    }
    return n;
}
function Lt(t, e, n, s, r) {
    if (Array.isArray(e)) {
        for (var i = 0; i < e.length; i++) Lt(t, e[i], n, s, r);
        return null;
    }
    return (
        (n = Bt(n)),
        t && t[wt]
            ? t.O(e, n, L(s) ? !!s.capture : !!s, r)
            : Rt(t, e, n, !0, s, r)
    );
}
function Mt(t, e, n, s, r) {
    if (Array.isArray(e))
        for (var i = 0; i < e.length; i++) Mt(t, e[i], n, s, r);
    else
        (s = L(s) ? !!s.capture : !!s),
            (n = Bt(n)),
            t && t[wt]
                ? ((t = t.i),
                  (e = String(e).toString()) in t.g &&
                      -1 < (n = At((i = t.g[e]), n, s, r)) &&
                      (bt(i[n]),
                      Array.prototype.splice.call(i, n, 1),
                      0 == i.length && (delete t.g[e], t.h--)))
                : t &&
                  (t = Pt(t)) &&
                  ((e = t.g[e.toString()]),
                  (t = -1),
                  e && (t = At(e, n, s, r)),
                  (n = -1 < t ? e[t] : null) && Ft(n));
}
function Ft(t) {
    if ("number" != typeof t && t && !t.ba) {
        var e = t.src;
        if (e && e[wt]) Dt(e.i, t);
        else {
            var n = t.type,
                s = t.proxy;
            e.removeEventListener
                ? e.removeEventListener(n, s, t.capture)
                : e.detachEvent
                ? e.detachEvent(Ot(n), s)
                : e.addListener && e.removeListener && e.removeListener(s),
                (n = Pt(e))
                    ? (Dt(n, t), 0 == n.h && ((n.src = null), (e[Ct] = null)))
                    : bt(t);
        }
    }
}
function Ot(t) {
    return t in Nt ? Nt[t] : (Nt[t] = "on" + t);
}
function Vt(t, e) {
    if (t.ba) t = !0;
    else {
        e = new pt(e, this);
        var n = t.listener,
            s = t.ha || t.src;
        t.ea && Ft(t), (t = n.call(s, e));
    }
    return t;
}
function Pt(t) {
    return (t = t[Ct]) instanceof xt ? t : null;
}
var qt = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
function Bt(t) {
    return "function" == typeof t
        ? t
        : (t[qt] ||
              (t[qt] = function (e) {
                  return t.handleEvent(e);
              }),
          t[qt]);
}
function Ut() {
    U.call(this), (this.i = new xt(this)), (this.P = this), (this.I = null);
}
function Gt(t, e) {
    var n,
        s = t.I;
    if (s) for (n = []; s; s = s.I) n.push(s);
    if (((t = t.P), (s = e.type || e), "string" == typeof e)) e = new $(e, t);
    else if (e instanceof $) e.target = e.target || t;
    else {
        var r = e;
        _t((e = new $(s, t)), r);
    }
    if (((r = !0), n))
        for (var i = n.length - 1; 0 <= i; i--) {
            var o = (e.g = n[i]);
            r = Kt(o, s, !0, e) && r;
        }
    if (((r = Kt((o = e.g = t), s, !0, e) && r), (r = Kt(o, s, !1, e) && r), n))
        for (i = 0; i < n.length; i++) r = Kt((o = e.g = n[i]), s, !1, e) && r;
}
function Kt(t, e, n, s) {
    if (!(e = t.i.g[String(e)])) return !0;
    e = e.concat();
    for (var r = !0, i = 0; i < e.length; ++i) {
        var o = e[i];
        if (o && !o.ba && o.capture == n) {
            var a = o.listener,
                u = o.ha || o.src;
            o.ea && Dt(t.i, o), (r = !1 !== a.call(u, s) && r);
        }
    }
    return r && !s.defaultPrevented;
}
B(Ut, U),
    (Ut.prototype[wt] = !0),
    (Ut.prototype.removeEventListener = function (t, e, n, s) {
        Mt(this, t, e, n, s);
    }),
    (Ut.prototype.M = function () {
        if ((Ut.X.M.call(this), this.i)) {
            var t,
                e = this.i;
            for (t in e.g) {
                for (var n = e.g[t], s = 0; s < n.length; s++) bt(n[s]);
                delete e.g[t], e.h--;
            }
        }
        this.I = null;
    }),
    (Ut.prototype.N = function (t, e, n, s) {
        return this.i.add(String(t), e, !1, n, s);
    }),
    (Ut.prototype.O = function (t, e, n, s) {
        return this.i.add(String(t), e, !0, n, s);
    });
var jt = N.JSON.stringify;
function $t() {
    var t = Jt;
    let e = null;
    return (
        t.g &&
            ((e = t.g), (t.g = t.g.next), t.g || (t.h = null), (e.next = null)),
        e
    );
}
var Qt,
    zt = new (class {
        constructor(t, e) {
            (this.i = t), (this.j = e), (this.h = 0), (this.g = null);
        }
        get() {
            let t;
            return (
                0 < this.h
                    ? (this.h--,
                      (t = this.g),
                      (this.g = t.next),
                      (t.next = null))
                    : (t = this.i()),
                t
            );
        }
    })(
        () => new Ht(),
        (t) => t.reset()
    );
class Ht {
    constructor() {
        this.next = this.g = this.h = null;
    }
    set(t, e) {
        (this.h = t), (this.g = e), (this.next = null);
    }
    reset() {
        this.next = this.g = this.h = null;
    }
}
function Wt(t) {
    N.setTimeout(() => {
        throw t;
    }, 0);
}
function Yt(t, e) {
    Qt ||
        (function () {
            var t = N.Promise.resolve(void 0);
            Qt = function () {
                t.then(Zt);
            };
        })(),
        Xt || (Qt(), (Xt = !0)),
        Jt.add(t, e);
}
var Xt = !1,
    Jt = new (class {
        constructor() {
            this.h = this.g = null;
        }
        add(t, e) {
            const n = zt.get();
            n.set(t, e),
                this.h ? (this.h.next = n) : (this.g = n),
                (this.h = n);
        }
    })();
function Zt() {
    for (var t; (t = $t()); ) {
        try {
            t.h.call(t.g);
        } catch (t) {
            Wt(t);
        }
        var e = zt;
        e.j(t), 100 > e.h && (e.h++, (t.next = e.g), (e.g = t));
    }
    Xt = !1;
}
function te(t, e) {
    Ut.call(this),
        (this.h = t || 1),
        (this.g = e || N),
        (this.j = P(this.lb, this)),
        (this.l = Date.now());
}
function ee(t) {
    (t.ca = !1), t.R && (t.g.clearTimeout(t.R), (t.R = null));
}
function ne(t, e, n) {
    if ("function" == typeof t) n && (t = P(t, n));
    else {
        if (!t || "function" != typeof t.handleEvent)
            throw Error("Invalid listener argument");
        t = P(t.handleEvent, t);
    }
    return 2147483647 < Number(e) ? -1 : N.setTimeout(t, e || 0);
}
function se(t) {
    t.g = ne(() => {
        (t.g = null), t.i && ((t.i = !1), se(t));
    }, t.j);
    const e = t.h;
    (t.h = null), t.m.apply(null, e);
}
B(te, Ut),
    ((D = te.prototype).ca = !1),
    (D.R = null),
    (D.lb = function () {
        if (this.ca) {
            var t = Date.now() - this.l;
            0 < t && t < 0.8 * this.h
                ? (this.R = this.g.setTimeout(this.j, this.h - t))
                : (this.R && (this.g.clearTimeout(this.R), (this.R = null)),
                  Gt(this, "tick"),
                  this.ca && (ee(this), this.start()));
        }
    }),
    (D.start = function () {
        (this.ca = !0),
            this.R ||
                ((this.R = this.g.setTimeout(this.j, this.h)),
                (this.l = Date.now()));
    }),
    (D.M = function () {
        te.X.M.call(this), ee(this), delete this.g;
    });
class re extends U {
    constructor(t, e) {
        super(),
            (this.m = t),
            (this.j = e),
            (this.h = null),
            (this.i = !1),
            (this.g = null);
    }
    l(t) {
        (this.h = arguments), this.g ? (this.i = !0) : se(this);
    }
    M() {
        super.M(),
            this.g &&
                (N.clearTimeout(this.g),
                (this.g = null),
                (this.i = !1),
                (this.h = null));
    }
}
function ie(t) {
    U.call(this), (this.h = t), (this.g = {});
}
B(ie, U);
var oe = [];
function ae(t, e, n, s) {
    Array.isArray(n) || (n && (oe[0] = n.toString()), (n = oe));
    for (var r = 0; r < n.length; r++) {
        var i = kt(e, n[r], s || t.handleEvent, !1, t.h || t);
        if (!i) break;
        t.g[i.key] = i;
    }
}
function ue(t) {
    Et(
        t.g,
        function (t, e) {
            this.g.hasOwnProperty(e) && Ft(t);
        },
        t
    ),
        (t.g = {});
}
function ce() {
    this.g = !0;
}
function he(t, e, n, s) {
    t.info(function () {
        return (
            "XMLHTTP TEXT (" +
            e +
            "): " +
            (function (t, e) {
                if (!t.g) return e;
                if (!e) return null;
                try {
                    var n = JSON.parse(e);
                    if (n)
                        for (t = 0; t < n.length; t++)
                            if (Array.isArray(n[t])) {
                                var s = n[t];
                                if (!(2 > s.length)) {
                                    var r = s[1];
                                    if (Array.isArray(r) && !(1 > r.length)) {
                                        var i = r[0];
                                        if (
                                            "noop" != i &&
                                            "stop" != i &&
                                            "close" != i
                                        )
                                            for (var o = 1; o < r.length; o++)
                                                r[o] = "";
                                    }
                                }
                            }
                    return jt(n);
                } catch (t) {
                    return e;
                }
            })(t, n) +
            (s ? " " + s : "")
        );
    });
}
(ie.prototype.M = function () {
    ie.X.M.call(this), ue(this);
}),
    (ie.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    }),
    (ce.prototype.Aa = function () {
        this.g = !1;
    }),
    (ce.prototype.info = function () {});
var le = {},
    de = null;
function fe() {
    return (de = de || new Ut());
}
function me(t) {
    $.call(this, le.Pa, t);
}
function ge(t) {
    const e = fe();
    Gt(e, new me(e));
}
function pe(t, e) {
    $.call(this, le.STAT_EVENT, t), (this.stat = e);
}
function ye(t) {
    const e = fe();
    Gt(e, new pe(e, t));
}
function we(t, e) {
    $.call(this, le.Qa, t), (this.size = e);
}
function ve(t, e) {
    if ("function" != typeof t)
        throw Error("Fn must not be null and must be a function");
    return N.setTimeout(function () {
        t();
    }, e);
}
(le.Pa = "serverreachability"),
    B(me, $),
    (le.STAT_EVENT = "statevent"),
    B(pe, $),
    (le.Qa = "timingevent"),
    B(we, $);
var Ie = {
        NO_ERROR: 0,
        mb: 1,
        zb: 2,
        yb: 3,
        tb: 4,
        xb: 5,
        Ab: 6,
        Ma: 7,
        TIMEOUT: 8,
        Db: 9,
    },
    be = {
        rb: "complete",
        Nb: "success",
        Na: "error",
        Ma: "abort",
        Fb: "ready",
        Gb: "readystatechange",
        TIMEOUT: "timeout",
        Bb: "incrementaldata",
        Eb: "progress",
        ub: "downloadprogress",
        Vb: "uploadprogress",
    };
function Ee() {}
function Te(t) {
    return t.h || (t.h = t.i());
}
function Se() {}
Ee.prototype.h = null;
var _e,
    xe = { OPEN: "a", qb: "b", Na: "c", Cb: "d" };
function De() {
    $.call(this, "d");
}
function Ae() {
    $.call(this, "c");
}
function Ce() {}
function Ne(t, e, n, s) {
    (this.l = t),
        (this.j = e),
        (this.m = n),
        (this.U = s || 1),
        (this.S = new ie(this)),
        (this.O = Re),
        (t = rt ? 125 : void 0),
        (this.T = new te(t)),
        (this.H = null),
        (this.i = !1),
        (this.s = this.A = this.v = this.K = this.F = this.V = this.B = null),
        (this.D = []),
        (this.g = null),
        (this.C = 0),
        (this.o = this.u = null),
        (this.Y = -1),
        (this.I = !1),
        (this.N = 0),
        (this.L = null),
        (this.$ = this.J = this.Z = this.P = !1),
        (this.h = new ke());
}
function ke() {
    (this.i = null), (this.g = ""), (this.h = !1);
}
B(De, $),
    B(Ae, $),
    B(Ce, Ee),
    (Ce.prototype.g = function () {
        return new XMLHttpRequest();
    }),
    (Ce.prototype.i = function () {
        return {};
    }),
    (_e = new Ce());
var Re = 45e3,
    Le = {},
    Me = {};
function Fe(t, e, n) {
    (t.K = 1), (t.v = tn(We(e))), (t.s = n), (t.P = !0), Oe(t, null);
}
function Oe(t, e) {
    (t.F = Date.now()), Be(t), (t.A = We(t.v));
    var n = t.A,
        s = t.U;
    Array.isArray(s) || (s = [String(s)]),
        mn(n.i, "t", s),
        (t.C = 0),
        (n = t.l.H),
        (t.h = new ke()),
        (t.g = fs(t.l, n ? e : null, !t.s)),
        0 < t.N && (t.L = new re(P(t.La, t, t.g), t.N)),
        ae(t.S, t.g, "readystatechange", t.ib),
        (e = t.H ? Tt(t.H) : {}),
        t.s
            ? (t.u || (t.u = "POST"),
              (e["Content-Type"] = "application/x-www-form-urlencoded"),
              t.g.da(t.A, t.u, t.s, e))
            : ((t.u = "GET"), t.g.da(t.A, t.u, null, e)),
        ge(),
        (function (t, e, n, s, r, i) {
            t.info(function () {
                if (t.g)
                    if (i)
                        for (
                            var o = "", a = i.split("&"), u = 0;
                            u < a.length;
                            u++
                        ) {
                            var c = a[u].split("=");
                            if (1 < c.length) {
                                var h = c[0];
                                c = c[1];
                                var l = h.split("_");
                                o =
                                    2 <= l.length && "type" == l[1]
                                        ? o + (h + "=") + c + "&"
                                        : o + (h + "=redacted&");
                            }
                        }
                    else o = null;
                else o = i;
                return (
                    "XMLHTTP REQ (" +
                    s +
                    ") [attempt " +
                    r +
                    "]: " +
                    e +
                    "\n" +
                    n +
                    "\n" +
                    o
                );
            });
        })(t.j, t.u, t.A, t.m, t.U, t.s);
}
function Ve(t) {
    return !!t.g && "GET" == t.u && 2 != t.K && t.l.Da;
}
function Pe(t, e, n) {
    let s,
        r = !0;
    for (; !t.I && t.C < n.length; ) {
        if (((s = qe(t, n)), s == Me)) {
            4 == e && ((t.o = 4), ye(14), (r = !1)),
                he(t.j, t.m, null, "[Incomplete Response]");
            break;
        }
        if (s == Le) {
            (t.o = 4), ye(15), he(t.j, t.m, n, "[Invalid Chunk]"), (r = !1);
            break;
        }
        he(t.j, t.m, s, null), $e(t, s);
    }
    Ve(t) && s != Me && s != Le && ((t.h.g = ""), (t.C = 0)),
        4 != e || 0 != n.length || t.h.h || ((t.o = 1), ye(16), (r = !1)),
        (t.i = t.i && r),
        r
            ? 0 < n.length &&
              !t.$ &&
              ((t.$ = !0),
              (e = t.l).g == t &&
                  e.$ &&
                  !e.K &&
                  (e.j.info(
                      "Great, no buffering proxy detected. Bytes received: " +
                          n.length
                  ),
                  is(e),
                  (e.K = !0),
                  ye(11)))
            : (he(t.j, t.m, n, "[Invalid Chunked Response]"), je(t), Ke(t));
}
function qe(t, e) {
    var n = t.C,
        s = e.indexOf("\n", n);
    return -1 == s
        ? Me
        : ((n = Number(e.substring(n, s))),
          isNaN(n)
              ? Le
              : (s += 1) + n > e.length
              ? Me
              : ((e = e.substr(s, n)), (t.C = s + n), e));
}
function Be(t) {
    (t.V = Date.now() + t.O), Ue(t, t.O);
}
function Ue(t, e) {
    if (null != t.B) throw Error("WatchDog timer not null");
    t.B = ve(P(t.gb, t), e);
}
function Ge(t) {
    t.B && (N.clearTimeout(t.B), (t.B = null));
}
function Ke(t) {
    0 == t.l.G || t.I || us(t.l, t);
}
function je(t) {
    Ge(t);
    var e = t.L;
    e && "function" == typeof e.na && e.na(),
        (t.L = null),
        ee(t.T),
        ue(t.S),
        t.g && ((e = t.g), (t.g = null), e.abort(), e.na());
}
function $e(t, e) {
    try {
        var n = t.l;
        if (0 != n.G && (n.g == t || In(n.h, t)))
            if (!t.J && In(n.h, t) && 3 == n.G) {
                try {
                    var s = n.Fa.g.parse(e);
                } catch (t) {
                    s = null;
                }
                if (Array.isArray(s) && 3 == s.length) {
                    var r = s;
                    if (0 == r[0]) {
                        t: if (!n.u) {
                            if (n.g) {
                                if (!(n.g.F + 3e3 < t.F)) break t;
                                as(n), Xn(n);
                            }
                            rs(n), ye(18);
                        }
                    } else
                        (n.Ba = r[1]),
                            0 < n.Ba - n.T &&
                                37500 > r[2] &&
                                n.L &&
                                0 == n.A &&
                                !n.v &&
                                (n.v = ve(P(n.cb, n), 6e3));
                    if (1 >= vn(n.h) && n.ja) {
                        try {
                            n.ja();
                        } catch (t) {}
                        n.ja = void 0;
                    }
                } else hs(n, 11);
            } else if (((t.J || n.g == t) && as(n), !z(e)))
                for (r = n.Fa.g.parse(e), e = 0; e < r.length; e++) {
                    let c = r[e];
                    if (((n.T = c[0]), (c = c[1]), 2 == n.G))
                        if ("c" == c[0]) {
                            (n.I = c[1]), (n.ka = c[2]);
                            const e = c[3];
                            null != e && ((n.ma = e), n.j.info("VER=" + n.ma));
                            const r = c[4];
                            null != r && ((n.Ca = r), n.j.info("SVER=" + n.Ca));
                            const h = c[5];
                            null != h &&
                                "number" == typeof h &&
                                0 < h &&
                                ((s = 1.5 * h),
                                (n.J = s),
                                n.j.info("backChannelRequestTimeoutMs_=" + s)),
                                (s = n);
                            const l = t.g;
                            if (l) {
                                const t = l.g
                                    ? l.g.getResponseHeader(
                                          "X-Client-Wire-Protocol"
                                      )
                                    : null;
                                if (t) {
                                    var i = s.h;
                                    i.g ||
                                        (-1 == t.indexOf("spdy") &&
                                            -1 == t.indexOf("quic") &&
                                            -1 == t.indexOf("h2")) ||
                                        ((i.j = i.l),
                                        (i.g = new Set()),
                                        i.h && (bn(i, i.h), (i.h = null)));
                                }
                                if (s.D) {
                                    const t = l.g
                                        ? l.g.getResponseHeader(
                                              "X-HTTP-Session-Id"
                                          )
                                        : null;
                                    t && ((s.za = t), Ze(s.F, s.D, t));
                                }
                            }
                            (n.G = 3),
                                n.l && n.l.xa(),
                                n.$ &&
                                    ((n.P = Date.now() - t.F),
                                    n.j.info("Handshake RTT: " + n.P + "ms"));
                            var o = t;
                            if (
                                (((s = n).sa = ds(s, s.H ? s.ka : null, s.V)),
                                o.J)
                            ) {
                                En(s.h, o);
                                var a = o,
                                    u = s.J;
                                u && a.setTimeout(u),
                                    a.B && (Ge(a), Be(a)),
                                    (s.g = o);
                            } else ss(s);
                            0 < n.i.length && Zn(n);
                        } else ("stop" != c[0] && "close" != c[0]) || hs(n, 7);
                    else
                        3 == n.G &&
                            ("stop" == c[0] || "close" == c[0]
                                ? "stop" == c[0]
                                    ? hs(n, 7)
                                    : Yn(n)
                                : "noop" != c[0] && n.l && n.l.wa(c),
                            (n.A = 0));
                }
        ge();
    } catch (t) {}
}
function Qe(t, e) {
    if (t.forEach && "function" == typeof t.forEach) t.forEach(e, void 0);
    else if (R(t) || "string" == typeof t)
        Array.prototype.forEach.call(t, e, void 0);
    else
        for (
            var n = (function (t) {
                    if (t.oa && "function" == typeof t.oa) return t.oa();
                    if (!t.W || "function" != typeof t.W) {
                        if ("undefined" != typeof Map && t instanceof Map)
                            return Array.from(t.keys());
                        if (!("undefined" != typeof Set && t instanceof Set)) {
                            if (R(t) || "string" == typeof t) {
                                var e = [];
                                t = t.length;
                                for (var n = 0; n < t; n++) e.push(n);
                                return e;
                            }
                            (e = []), (n = 0);
                            for (const s in t) e[n++] = s;
                            return e;
                        }
                    }
                })(t),
                s = (function (t) {
                    if (t.W && "function" == typeof t.W) return t.W();
                    if (
                        ("undefined" != typeof Map && t instanceof Map) ||
                        ("undefined" != typeof Set && t instanceof Set)
                    )
                        return Array.from(t.values());
                    if ("string" == typeof t) return t.split("");
                    if (R(t)) {
                        for (var e = [], n = t.length, s = 0; s < n; s++)
                            e.push(t[s]);
                        return e;
                    }
                    for (s in ((e = []), (n = 0), t)) e[n++] = t[s];
                    return e;
                })(t),
                r = s.length,
                i = 0;
            i < r;
            i++
        )
            e.call(void 0, s[i], n && n[i], t);
}
((D = Ne.prototype).setTimeout = function (t) {
    this.O = t;
}),
    (D.ib = function (t) {
        t = t.target;
        const e = this.L;
        e && 3 == jn(t) ? e.l() : this.La(t);
    }),
    (D.La = function (t) {
        try {
            if (t == this.g)
                t: {
                    const h = jn(this.g);
                    var e = this.g.Ea();
                    this.g.aa();
                    if (
                        !(3 > h) &&
                        (3 != h ||
                            rt ||
                            (this.g && (this.h.h || this.g.fa() || $n(this.g))))
                    ) {
                        this.I || 4 != h || 7 == e || ge(), Ge(this);
                        var n = this.g.aa();
                        this.Y = n;
                        e: if (Ve(this)) {
                            var s = $n(this.g);
                            t = "";
                            var r = s.length,
                                i = 4 == jn(this.g);
                            if (!this.h.i) {
                                if ("undefined" == typeof TextDecoder) {
                                    je(this), Ke(this);
                                    var o = "";
                                    break e;
                                }
                                this.h.i = new N.TextDecoder();
                            }
                            for (e = 0; e < r; e++)
                                (this.h.h = !0),
                                    (t += this.h.i.decode(s[e], {
                                        stream: i && e == r - 1,
                                    }));
                            s.splice(0, r),
                                (this.h.g += t),
                                (this.C = 0),
                                (o = this.h.g);
                        } else o = this.g.fa();
                        if (
                            ((this.i = 200 == n),
                            (function (t, e, n, s, r, i, o) {
                                t.info(function () {
                                    return (
                                        "XMLHTTP RESP (" +
                                        s +
                                        ") [ attempt " +
                                        r +
                                        "]: " +
                                        e +
                                        "\n" +
                                        n +
                                        "\n" +
                                        i +
                                        " " +
                                        o
                                    );
                                });
                            })(this.j, this.u, this.A, this.m, this.U, h, n),
                            this.i)
                        ) {
                            if (this.Z && !this.J) {
                                e: {
                                    if (this.g) {
                                        var a,
                                            u = this.g;
                                        if (
                                            (a = u.g
                                                ? u.g.getResponseHeader(
                                                      "X-HTTP-Initial-Response"
                                                  )
                                                : null) &&
                                            !z(a)
                                        ) {
                                            var c = a;
                                            break e;
                                        }
                                    }
                                    c = null;
                                }
                                if (!(n = c)) {
                                    (this.i = !1),
                                        (this.o = 3),
                                        ye(12),
                                        je(this),
                                        Ke(this);
                                    break t;
                                }
                                he(
                                    this.j,
                                    this.m,
                                    n,
                                    "Initial handshake response via X-HTTP-Initial-Response"
                                ),
                                    (this.J = !0),
                                    $e(this, n);
                            }
                            this.P
                                ? (Pe(this, h, o),
                                  rt &&
                                      this.i &&
                                      3 == h &&
                                      (ae(this.S, this.T, "tick", this.hb),
                                      this.T.start()))
                                : (he(this.j, this.m, o, null), $e(this, o)),
                                4 == h && je(this),
                                this.i &&
                                    !this.I &&
                                    (4 == h
                                        ? us(this.l, this)
                                        : ((this.i = !1), Be(this)));
                        } else
                            400 == n && 0 < o.indexOf("Unknown SID")
                                ? ((this.o = 3), ye(12))
                                : ((this.o = 0), ye(13)),
                                je(this),
                                Ke(this);
                    }
                }
        } catch (t) {}
    }),
    (D.hb = function () {
        if (this.g) {
            var t = jn(this.g),
                e = this.g.fa();
            this.C < e.length &&
                (Ge(this), Pe(this, t, e), this.i && 4 != t && Be(this));
        }
    }),
    (D.cancel = function () {
        (this.I = !0), je(this);
    }),
    (D.gb = function () {
        this.B = null;
        const t = Date.now();
        0 <= t - this.V
            ? ((function (t, e) {
                  t.info(function () {
                      return "TIMEOUT: " + e;
                  });
              })(this.j, this.A),
              2 != this.K && (ge(), ye(17)),
              je(this),
              (this.o = 2),
              Ke(this))
            : Ue(this, this.V - t);
    });
var ze = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"
);
function He(t, e) {
    if (
        ((this.g = this.s = this.j = ""),
        (this.m = null),
        (this.o = this.l = ""),
        (this.h = !1),
        t instanceof He)
    ) {
        (this.h = void 0 !== e ? e : t.h),
            Ye(this, t.j),
            (this.s = t.s),
            (this.g = t.g),
            Xe(this, t.m),
            (this.l = t.l),
            (e = t.i);
        var n = new hn();
        (n.i = e.i),
            e.g && ((n.g = new Map(e.g)), (n.h = e.h)),
            Je(this, n),
            (this.o = t.o);
    } else
        t && (n = String(t).match(ze))
            ? ((this.h = !!e),
              Ye(this, n[1] || "", !0),
              (this.s = en(n[2] || "")),
              (this.g = en(n[3] || "", !0)),
              Xe(this, n[4]),
              (this.l = en(n[5] || "", !0)),
              Je(this, n[6] || "", !0),
              (this.o = en(n[7] || "")))
            : ((this.h = !!e), (this.i = new hn(null, this.h)));
}
function We(t) {
    return new He(t);
}
function Ye(t, e, n) {
    (t.j = n ? en(e, !0) : e), t.j && (t.j = t.j.replace(/:$/, ""));
}
function Xe(t, e) {
    if (e) {
        if (((e = Number(e)), isNaN(e) || 0 > e))
            throw Error("Bad port number " + e);
        t.m = e;
    } else t.m = null;
}
function Je(t, e, n) {
    e instanceof hn
        ? ((t.i = e),
          (function (t, e) {
              e &&
                  !t.j &&
                  (ln(t),
                  (t.i = null),
                  t.g.forEach(function (t, e) {
                      var n = e.toLowerCase();
                      e != n && (dn(this, e), mn(this, n, t));
                  }, t)),
                  (t.j = e);
          })(t.i, t.h))
        : (n || (e = nn(e, un)), (t.i = new hn(e, t.h)));
}
function Ze(t, e, n) {
    t.i.set(e, n);
}
function tn(t) {
    return (
        Ze(
            t,
            "zx",
            Math.floor(2147483648 * Math.random()).toString(36) +
                Math.abs(
                    Math.floor(2147483648 * Math.random()) ^ Date.now()
                ).toString(36)
        ),
        t
    );
}
function en(t, e) {
    return t
        ? e
            ? decodeURI(t.replace(/%25/g, "%2525"))
            : decodeURIComponent(t)
        : "";
}
function nn(t, e, n) {
    return "string" == typeof t
        ? ((t = encodeURI(t).replace(e, sn)),
          n && (t = t.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
          t)
        : null;
}
function sn(t) {
    return (
        "%" +
        (((t = t.charCodeAt(0)) >> 4) & 15).toString(16) +
        (15 & t).toString(16)
    );
}
He.prototype.toString = function () {
    var t = [],
        e = this.j;
    e && t.push(nn(e, rn, !0), ":");
    var n = this.g;
    return (
        (n || "file" == e) &&
            (t.push("//"),
            (e = this.s) && t.push(nn(e, rn, !0), "@"),
            t.push(
                encodeURIComponent(String(n)).replace(
                    /%25([0-9a-fA-F]{2})/g,
                    "%$1"
                )
            ),
            null != (n = this.m) && t.push(":", String(n))),
        (n = this.l) &&
            (this.g && "/" != n.charAt(0) && t.push("/"),
            t.push(nn(n, "/" == n.charAt(0) ? an : on, !0))),
        (n = this.i.toString()) && t.push("?", n),
        (n = this.o) && t.push("#", nn(n, cn)),
        t.join("")
    );
};
var rn = /[#\/\?@]/g,
    on = /[#\?:]/g,
    an = /[#\?]/g,
    un = /[#\?@]/g,
    cn = /#/g;
function hn(t, e) {
    (this.h = this.g = null), (this.i = t || null), (this.j = !!e);
}
function ln(t) {
    t.g ||
        ((t.g = new Map()),
        (t.h = 0),
        t.i &&
            (function (t, e) {
                if (t) {
                    t = t.split("&");
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n].indexOf("="),
                            r = null;
                        if (0 <= s) {
                            var i = t[n].substring(0, s);
                            r = t[n].substring(s + 1);
                        } else i = t[n];
                        e(
                            i,
                            r ? decodeURIComponent(r.replace(/\+/g, " ")) : ""
                        );
                    }
                }
            })(t.i, function (e, n) {
                t.add(decodeURIComponent(e.replace(/\+/g, " ")), n);
            }));
}
function dn(t, e) {
    ln(t),
        (e = gn(t, e)),
        t.g.has(e) && ((t.i = null), (t.h -= t.g.get(e).length), t.g.delete(e));
}
function fn(t, e) {
    return ln(t), (e = gn(t, e)), t.g.has(e);
}
function mn(t, e, n) {
    dn(t, e),
        0 < n.length &&
            ((t.i = null), t.g.set(gn(t, e), K(n)), (t.h += n.length));
}
function gn(t, e) {
    return (e = String(e)), t.j && (e = e.toLowerCase()), e;
}
((D = hn.prototype).add = function (t, e) {
    ln(this), (this.i = null), (t = gn(this, t));
    var n = this.g.get(t);
    return n || this.g.set(t, (n = [])), n.push(e), (this.h += 1), this;
}),
    (D.forEach = function (t, e) {
        ln(this),
            this.g.forEach(function (n, s) {
                n.forEach(function (n) {
                    t.call(e, n, s, this);
                }, this);
            }, this);
    }),
    (D.oa = function () {
        ln(this);
        const t = Array.from(this.g.values()),
            e = Array.from(this.g.keys()),
            n = [];
        for (let s = 0; s < e.length; s++) {
            const r = t[s];
            for (let t = 0; t < r.length; t++) n.push(e[s]);
        }
        return n;
    }),
    (D.W = function (t) {
        ln(this);
        let e = [];
        if ("string" == typeof t)
            fn(this, t) && (e = e.concat(this.g.get(gn(this, t))));
        else {
            t = Array.from(this.g.values());
            for (let n = 0; n < t.length; n++) e = e.concat(t[n]);
        }
        return e;
    }),
    (D.set = function (t, e) {
        return (
            ln(this),
            (this.i = null),
            fn(this, (t = gn(this, t))) && (this.h -= this.g.get(t).length),
            this.g.set(t, [e]),
            (this.h += 1),
            this
        );
    }),
    (D.get = function (t, e) {
        return t && 0 < (t = this.W(t)).length ? String(t[0]) : e;
    }),
    (D.toString = function () {
        if (this.i) return this.i;
        if (!this.g) return "";
        const t = [],
            e = Array.from(this.g.keys());
        for (var n = 0; n < e.length; n++) {
            var s = e[n];
            const i = encodeURIComponent(String(s)),
                o = this.W(s);
            for (s = 0; s < o.length; s++) {
                var r = i;
                "" !== o[s] && (r += "=" + encodeURIComponent(String(o[s]))),
                    t.push(r);
            }
        }
        return (this.i = t.join("&"));
    });
function pn(t) {
    (this.l = t || yn),
        N.PerformanceNavigationTiming
            ? (t =
                  0 <
                      (t = N.performance.getEntriesByType("navigation"))
                          .length &&
                  ("hq" == t[0].nextHopProtocol ||
                      "h2" == t[0].nextHopProtocol))
            : (t = !!(N.g && N.g.Ga && N.g.Ga() && N.g.Ga().$b)),
        (this.j = t ? this.l : 1),
        (this.g = null),
        1 < this.j && (this.g = new Set()),
        (this.h = null),
        (this.i = []);
}
var yn = 10;
function wn(t) {
    return !!t.h || (!!t.g && t.g.size >= t.j);
}
function vn(t) {
    return t.h ? 1 : t.g ? t.g.size : 0;
}
function In(t, e) {
    return t.h ? t.h == e : !!t.g && t.g.has(e);
}
function bn(t, e) {
    t.g ? t.g.add(e) : (t.h = e);
}
function En(t, e) {
    t.h && t.h == e ? (t.h = null) : t.g && t.g.has(e) && t.g.delete(e);
}
function Tn(t) {
    if (null != t.h) return t.i.concat(t.h.D);
    if (null != t.g && 0 !== t.g.size) {
        let e = t.i;
        for (const n of t.g.values()) e = e.concat(n.D);
        return e;
    }
    return K(t.i);
}
function Sn() {}
function _n() {
    this.g = new Sn();
}
function xn(t, e, n) {
    const s = n || "";
    try {
        Qe(t, function (t, n) {
            let r = t;
            L(t) && (r = jt(t)), e.push(s + n + "=" + encodeURIComponent(r));
        });
    } catch (t) {
        throw (e.push(s + "type=" + encodeURIComponent("_badmap")), t);
    }
}
function Dn(t, e, n, s, r) {
    try {
        (e.onload = null),
            (e.onerror = null),
            (e.onabort = null),
            (e.ontimeout = null),
            r(s);
    } catch (t) {}
}
function An(t) {
    (this.l = t.ac || null), (this.j = t.jb || !1);
}
function Cn(t, e) {
    Ut.call(this),
        (this.D = t),
        (this.u = e),
        (this.m = void 0),
        (this.readyState = Nn),
        (this.status = 0),
        (this.responseType =
            this.responseText =
            this.response =
            this.statusText =
                ""),
        (this.onreadystatechange = null),
        (this.v = new Headers()),
        (this.h = null),
        (this.C = "GET"),
        (this.B = ""),
        (this.g = !1),
        (this.A = this.j = this.l = null);
}
(pn.prototype.cancel = function () {
    if (((this.i = Tn(this)), this.h)) this.h.cancel(), (this.h = null);
    else if (this.g && 0 !== this.g.size) {
        for (const t of this.g.values()) t.cancel();
        this.g.clear();
    }
}),
    (Sn.prototype.stringify = function (t) {
        return N.JSON.stringify(t, void 0);
    }),
    (Sn.prototype.parse = function (t) {
        return N.JSON.parse(t, void 0);
    }),
    B(An, Ee),
    (An.prototype.g = function () {
        return new Cn(this.l, this.j);
    }),
    (An.prototype.i = (function (t) {
        return function () {
            return t;
        };
    })({})),
    B(Cn, Ut);
var Nn = 0;
function kn(t) {
    t.j.read().then(t.Ta.bind(t)).catch(t.ga.bind(t));
}
function Rn(t) {
    (t.readyState = 4), (t.l = null), (t.j = null), (t.A = null), Ln(t);
}
function Ln(t) {
    t.onreadystatechange && t.onreadystatechange.call(t);
}
((D = Cn.prototype).open = function (t, e) {
    if (this.readyState != Nn)
        throw (this.abort(), Error("Error reopening a connection"));
    (this.C = t), (this.B = e), (this.readyState = 1), Ln(this);
}),
    (D.send = function (t) {
        if (1 != this.readyState)
            throw (this.abort(), Error("need to call open() first. "));
        this.g = !0;
        const e = {
            headers: this.v,
            method: this.C,
            credentials: this.m,
            cache: void 0,
        };
        t && (e.body = t),
            (this.D || N)
                .fetch(new Request(this.B, e))
                .then(this.Wa.bind(this), this.ga.bind(this));
    }),
    (D.abort = function () {
        (this.response = this.responseText = ""),
            (this.v = new Headers()),
            (this.status = 0),
            this.j && this.j.cancel("Request was aborted.").catch(() => {}),
            1 <= this.readyState &&
                this.g &&
                4 != this.readyState &&
                ((this.g = !1), Rn(this)),
            (this.readyState = Nn);
    }),
    (D.Wa = function (t) {
        if (
            this.g &&
            ((this.l = t),
            this.h ||
                ((this.status = this.l.status),
                (this.statusText = this.l.statusText),
                (this.h = t.headers),
                (this.readyState = 2),
                Ln(this)),
            this.g && ((this.readyState = 3), Ln(this), this.g))
        )
            if ("arraybuffer" === this.responseType)
                t.arrayBuffer().then(this.Ua.bind(this), this.ga.bind(this));
            else if (void 0 !== N.ReadableStream && "body" in t) {
                if (((this.j = t.body.getReader()), this.u)) {
                    if (this.responseType)
                        throw Error(
                            'responseType must be empty for "streamBinaryChunks" mode responses.'
                        );
                    this.response = [];
                } else
                    (this.response = this.responseText = ""),
                        (this.A = new TextDecoder());
                kn(this);
            } else t.text().then(this.Va.bind(this), this.ga.bind(this));
    }),
    (D.Ta = function (t) {
        if (this.g) {
            if (this.u && t.value) this.response.push(t.value);
            else if (!this.u) {
                var e = t.value ? t.value : new Uint8Array(0);
                (e = this.A.decode(e, { stream: !t.done })) &&
                    (this.response = this.responseText += e);
            }
            t.done ? Rn(this) : Ln(this), 3 == this.readyState && kn(this);
        }
    }),
    (D.Va = function (t) {
        this.g && ((this.response = this.responseText = t), Rn(this));
    }),
    (D.Ua = function (t) {
        this.g && ((this.response = t), Rn(this));
    }),
    (D.ga = function () {
        this.g && Rn(this);
    }),
    (D.setRequestHeader = function (t, e) {
        this.v.append(t, e);
    }),
    (D.getResponseHeader = function (t) {
        return (this.h && this.h.get(t.toLowerCase())) || "";
    }),
    (D.getAllResponseHeaders = function () {
        if (!this.h) return "";
        const t = [],
            e = this.h.entries();
        for (var n = e.next(); !n.done; )
            (n = n.value), t.push(n[0] + ": " + n[1]), (n = e.next());
        return t.join("\r\n");
    }),
    Object.defineProperty(Cn.prototype, "withCredentials", {
        get: function () {
            return "include" === this.m;
        },
        set: function (t) {
            this.m = t ? "include" : "same-origin";
        },
    });
var Mn = N.JSON.parse;
function Fn(t) {
    Ut.call(this),
        (this.headers = new Map()),
        (this.u = t || null),
        (this.h = !1),
        (this.C = this.g = null),
        (this.H = ""),
        (this.m = 0),
        (this.j = ""),
        (this.l = this.F = this.v = this.D = !1),
        (this.B = 0),
        (this.A = null),
        (this.J = On),
        (this.K = this.L = !1);
}
B(Fn, Ut);
var On = "",
    Vn = /^https?$/i,
    Pn = ["POST", "PUT"];
function qn(t, e) {
    (t.h = !1),
        t.g && ((t.l = !0), t.g.abort(), (t.l = !1)),
        (t.j = e),
        (t.m = 5),
        Bn(t),
        Gn(t);
}
function Bn(t) {
    t.D || ((t.D = !0), Gt(t, "complete"), Gt(t, "error"));
}
function Un(t) {
    if (t.h && void 0 !== C && (!t.C[1] || 4 != jn(t) || 2 != t.aa()))
        if (t.v && 4 == jn(t)) ne(t.Ha, 0, t);
        else if ((Gt(t, "readystatechange"), 4 == jn(t))) {
            t.h = !1;
            try {
                const a = t.aa();
                t: switch (a) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var e = !0;
                        break t;
                    default:
                        e = !1;
                }
                var n;
                if (!(n = e)) {
                    var s;
                    if ((s = 0 === a)) {
                        var r = String(t.H).match(ze)[1] || null;
                        if (!r && N.self && N.self.location) {
                            var i = N.self.location.protocol;
                            r = i.substr(0, i.length - 1);
                        }
                        s = !Vn.test(r ? r.toLowerCase() : "");
                    }
                    n = s;
                }
                if (n) Gt(t, "complete"), Gt(t, "success");
                else {
                    t.m = 6;
                    try {
                        var o = 2 < jn(t) ? t.g.statusText : "";
                    } catch (t) {
                        o = "";
                    }
                    (t.j = o + " [" + t.aa() + "]"), Bn(t);
                }
            } finally {
                Gn(t);
            }
        }
}
function Gn(t, e) {
    if (t.g) {
        Kn(t);
        const n = t.g,
            s = t.C[0] ? k : null;
        (t.g = null), (t.C = null), e || Gt(t, "ready");
        try {
            n.onreadystatechange = s;
        } catch (t) {}
    }
}
function Kn(t) {
    t.g && t.K && (t.g.ontimeout = null),
        t.A && (N.clearTimeout(t.A), (t.A = null));
}
function jn(t) {
    return t.g ? t.g.readyState : 0;
}
function $n(t) {
    try {
        if (!t.g) return null;
        if ("response" in t.g) return t.g.response;
        switch (t.J) {
            case On:
            case "text":
                return t.g.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer" in t.g)
                    return t.g.mozResponseArrayBuffer;
        }
        return null;
    } catch (t) {
        return null;
    }
}
function Qn(t) {
    let e = "";
    return (
        Et(t, function (t, n) {
            (e += n), (e += ":"), (e += t), (e += "\r\n");
        }),
        e
    );
}
function zn(t, e, n) {
    t: {
        for (s in n) {
            var s = !1;
            break t;
        }
        s = !0;
    }
    s ||
        ((n = Qn(n)),
        "string" == typeof t
            ? null != n && encodeURIComponent(String(n))
            : Ze(t, e, n));
}
function Hn(t, e, n) {
    return (n && n.internalChannelParams && n.internalChannelParams[t]) || e;
}
function Wn(t) {
    (this.Ca = 0),
        (this.i = []),
        (this.j = new ce()),
        (this.ka =
            this.sa =
            this.F =
            this.V =
            this.g =
            this.za =
            this.D =
            this.ia =
            this.o =
            this.S =
            this.s =
                null),
        (this.ab = this.U = 0),
        (this.Za = Hn("failFast", !1, t)),
        (this.L = this.v = this.u = this.m = this.l = null),
        (this.Y = !0),
        (this.pa = this.Ba = this.T = -1),
        (this.Z = this.A = this.C = 0),
        (this.Xa = Hn("baseRetryDelayMs", 5e3, t)),
        (this.bb = Hn("retryDelaySeedMs", 1e4, t)),
        (this.$a = Hn("forwardChannelMaxRetries", 2, t)),
        (this.ta = Hn("forwardChannelRequestTimeoutMs", 2e4, t)),
        (this.ra = (t && t.xmlHttpFactory) || void 0),
        (this.Da = (t && t.Zb) || !1),
        (this.J = void 0),
        (this.H = (t && t.supportsCrossDomainXhr) || !1),
        (this.I = ""),
        (this.h = new pn(t && t.concurrentRequestLimit)),
        (this.Fa = new _n()),
        (this.O = (t && t.fastHandshake) || !1),
        (this.N = (t && t.encodeInitMessageHeaders) || !1),
        this.O && this.N && (this.N = !1),
        (this.Ya = (t && t.Xb) || !1),
        t && t.Aa && this.j.Aa(),
        t && t.forceLongPolling && (this.Y = !1),
        (this.$ = (!this.O && this.Y && t && t.detectBufferingProxy) || !1),
        (this.ja = void 0),
        (this.P = 0),
        (this.K = !1),
        (this.la = this.B = null);
}
function Yn(t) {
    if ((Jn(t), 3 == t.G)) {
        var e = t.U++,
            n = We(t.F);
        Ze(n, "SID", t.I),
            Ze(n, "RID", e),
            Ze(n, "TYPE", "terminate"),
            es(t, n),
            ((e = new Ne(t, t.j, e, void 0)).K = 2),
            (e.v = tn(We(n))),
            (n = !1),
            N.navigator &&
                N.navigator.sendBeacon &&
                (n = N.navigator.sendBeacon(e.v.toString(), "")),
            !n && N.Image && ((new Image().src = e.v), (n = !0)),
            n || ((e.g = fs(e.l, null)), e.g.da(e.v)),
            (e.F = Date.now()),
            Be(e);
    }
    ls(t);
}
function Xn(t) {
    t.g && (is(t), t.g.cancel(), (t.g = null));
}
function Jn(t) {
    Xn(t),
        t.u && (N.clearTimeout(t.u), (t.u = null)),
        as(t),
        t.h.cancel(),
        t.m && ("number" == typeof t.m && N.clearTimeout(t.m), (t.m = null));
}
function Zn(t) {
    wn(t.h) || t.m || ((t.m = !0), Yt(t.Ja, t), (t.C = 0));
}
function ts(t, e) {
    var n;
    n = e ? e.m : t.U++;
    const s = We(t.F);
    Ze(s, "SID", t.I),
        Ze(s, "RID", n),
        Ze(s, "AID", t.T),
        es(t, s),
        t.o && t.s && zn(s, t.o, t.s),
        (n = new Ne(t, t.j, n, t.C + 1)),
        null === t.o && (n.H = t.s),
        e && (t.i = e.D.concat(t.i)),
        (e = ns(t, n, 1e3)),
        n.setTimeout(
            Math.round(0.5 * t.ta) + Math.round(0.5 * t.ta * Math.random())
        ),
        bn(t.h, n),
        Fe(n, s, e);
}
function es(t, e) {
    t.ia &&
        Et(t.ia, function (t, n) {
            Ze(e, n, t);
        }),
        t.l &&
            Qe({}, function (t, n) {
                Ze(e, n, t);
            });
}
function ns(t, e, n) {
    n = Math.min(t.i.length, n);
    var s = t.l ? P(t.l.Ra, t.l, t) : null;
    t: {
        var r = t.i;
        let e = -1;
        for (;;) {
            const t = ["count=" + n];
            -1 == e
                ? 0 < n
                    ? ((e = r[0].h), t.push("ofs=" + e))
                    : (e = 0)
                : t.push("ofs=" + e);
            let i = !0;
            for (let o = 0; o < n; o++) {
                let n = r[o].h;
                const a = r[o].g;
                if (((n -= e), 0 > n))
                    (e = Math.max(0, r[o].h - 100)), (i = !1);
                else
                    try {
                        xn(a, t, "req" + n + "_");
                    } catch (t) {
                        s && s(a);
                    }
            }
            if (i) {
                s = t.join("&");
                break t;
            }
        }
    }
    return (t = t.i.splice(0, n)), (e.D = t), s;
}
function ss(t) {
    t.g || t.u || ((t.Z = 1), Yt(t.Ia, t), (t.A = 0));
}
function rs(t) {
    return (
        !(t.g || t.u || 3 <= t.A) &&
        (t.Z++, (t.u = ve(P(t.Ia, t), cs(t, t.A))), t.A++, !0)
    );
}
function is(t) {
    null != t.B && (N.clearTimeout(t.B), (t.B = null));
}
function os(t) {
    (t.g = new Ne(t, t.j, "rpc", t.Z)),
        null === t.o && (t.g.H = t.s),
        (t.g.N = 0);
    var e = We(t.sa);
    Ze(e, "RID", "rpc"),
        Ze(e, "SID", t.I),
        Ze(e, "CI", t.L ? "0" : "1"),
        Ze(e, "AID", t.T),
        Ze(e, "TYPE", "xmlhttp"),
        es(t, e),
        t.o && t.s && zn(e, t.o, t.s),
        t.J && t.g.setTimeout(t.J);
    var n = t.g;
    (t = t.ka),
        (n.K = 1),
        (n.v = tn(We(e))),
        (n.s = null),
        (n.P = !0),
        Oe(n, t);
}
function as(t) {
    null != t.v && (N.clearTimeout(t.v), (t.v = null));
}
function us(t, e) {
    var n = null;
    if (t.g == e) {
        as(t), is(t), (t.g = null);
        var s = 2;
    } else {
        if (!In(t.h, e)) return;
        (n = e.D), En(t.h, e), (s = 1);
    }
    if (0 != t.G)
        if (((t.pa = e.Y), e.i))
            if (1 == s) {
                (n = e.s ? e.s.length : 0), (e = Date.now() - e.F);
                var r = t.C;
                Gt((s = fe()), new we(s, n)), Zn(t);
            } else ss(t);
        else if (
            3 == (r = e.o) ||
            (0 == r && 0 < t.pa) ||
            !(
                (1 == s &&
                    (function (t, e) {
                        return !(
                            vn(t.h) >= t.h.j - (t.m ? 1 : 0) ||
                            (t.m
                                ? ((t.i = e.D.concat(t.i)), 0)
                                : 1 == t.G ||
                                  2 == t.G ||
                                  t.C >= (t.Za ? 0 : t.$a) ||
                                  ((t.m = ve(P(t.Ja, t, e), cs(t, t.C))),
                                  t.C++,
                                  0))
                        );
                    })(t, e)) ||
                (2 == s && rs(t))
            )
        )
            switch (
                (n && 0 < n.length && ((e = t.h), (e.i = e.i.concat(n))), r)
            ) {
                case 1:
                    hs(t, 5);
                    break;
                case 4:
                    hs(t, 10);
                    break;
                case 3:
                    hs(t, 6);
                    break;
                default:
                    hs(t, 2);
            }
}
function cs(t, e) {
    let n = t.Xa + Math.floor(Math.random() * t.bb);
    return t.l || (n *= 2), n * e;
}
function hs(t, e) {
    if ((t.j.info("Error code " + e), 2 == e)) {
        var n = null;
        t.l && (n = null);
        var s = P(t.kb, t);
        n ||
            ((n = new He("//www.google.com/images/cleardot.gif")),
            (N.location && "http" == N.location.protocol) || Ye(n, "https"),
            tn(n)),
            (function (t, e) {
                const n = new ce();
                if (N.Image) {
                    const s = new Image();
                    (s.onload = q(Dn, n, s, "TestLoadImage: loaded", !0, e)),
                        (s.onerror = q(
                            Dn,
                            n,
                            s,
                            "TestLoadImage: error",
                            !1,
                            e
                        )),
                        (s.onabort = q(
                            Dn,
                            n,
                            s,
                            "TestLoadImage: abort",
                            !1,
                            e
                        )),
                        (s.ontimeout = q(
                            Dn,
                            n,
                            s,
                            "TestLoadImage: timeout",
                            !1,
                            e
                        )),
                        N.setTimeout(function () {
                            s.ontimeout && s.ontimeout();
                        }, 1e4),
                        (s.src = t);
                } else e(!1);
            })(n.toString(), s);
    } else ye(2);
    (t.G = 0), t.l && t.l.va(e), ls(t), Jn(t);
}
function ls(t) {
    if (((t.G = 0), (t.la = []), t.l)) {
        const e = Tn(t.h);
        (0 == e.length && 0 == t.i.length) ||
            (j(t.la, e),
            j(t.la, t.i),
            (t.h.i.length = 0),
            K(t.i),
            (t.i.length = 0)),
            t.l.ua();
    }
}
function ds(t, e, n) {
    var s = n instanceof He ? We(n) : new He(n, void 0);
    if ("" != s.g) e && (s.g = e + "." + s.g), Xe(s, s.m);
    else {
        var r = N.location;
        (s = r.protocol),
            (e = e ? e + "." + r.hostname : r.hostname),
            (r = +r.port);
        var i = new He(null, void 0);
        s && Ye(i, s), e && (i.g = e), r && Xe(i, r), n && (i.l = n), (s = i);
    }
    return (
        (n = t.D),
        (e = t.za),
        n && e && Ze(s, n, e),
        Ze(s, "VER", t.ma),
        es(t, s),
        s
    );
}
function fs(t, e, n) {
    if (e && !t.H)
        throw Error("Can't create secondary domain capable XhrIo object.");
    return (
        (e = n && t.Da && !t.ra ? new Fn(new An({ jb: !0 })) : new Fn(t.ra)).Ka(
            t.H
        ),
        e
    );
}
function ms() {}
function gs() {
    if (nt && !(10 <= Number(gt)))
        throw Error("Environmental error: no available transport.");
}
function ps(t, e) {
    Ut.call(this),
        (this.g = new Wn(e)),
        (this.l = t),
        (this.h = (e && e.messageUrlParams) || null),
        (t = (e && e.messageHeaders) || null),
        e &&
            e.clientProtocolHeaderRequired &&
            (t
                ? (t["X-Client-Protocol"] = "webchannel")
                : (t = { "X-Client-Protocol": "webchannel" })),
        (this.g.s = t),
        (t = (e && e.initMessageHeaders) || null),
        e &&
            e.messageContentType &&
            (t
                ? (t["X-WebChannel-Content-Type"] = e.messageContentType)
                : (t = { "X-WebChannel-Content-Type": e.messageContentType })),
        e &&
            e.ya &&
            (t
                ? (t["X-WebChannel-Client-Profile"] = e.ya)
                : (t = { "X-WebChannel-Client-Profile": e.ya })),
        (this.g.S = t),
        (t = e && e.Yb) && !z(t) && (this.g.o = t),
        (this.A = (e && e.supportsCrossDomainXhr) || !1),
        (this.v = (e && e.sendRawJson) || !1),
        (e = e && e.httpSessionIdParam) &&
            !z(e) &&
            ((this.g.D = e),
            null !== (t = this.h) &&
                e in t &&
                e in (t = this.h) &&
                delete t[e]),
        (this.j = new vs(this));
}
function ys(t) {
    De.call(this);
    var e = t.__sm__;
    if (e) {
        t: {
            for (const n in e) {
                t = n;
                break t;
            }
            t = void 0;
        }
        (this.i = t) &&
            ((t = this.i), (e = null !== e && t in e ? e[t] : void 0)),
            (this.data = e);
    } else this.data = t;
}
function ws() {
    Ae.call(this), (this.status = 1);
}
function vs(t) {
    this.g = t;
}
((D = Fn.prototype).Ka = function (t) {
    this.L = t;
}),
    (D.da = function (t, e, n, s) {
        if (this.g)
            throw Error(
                "[goog.net.XhrIo] Object is active with another request=" +
                    this.H +
                    "; newUri=" +
                    t
            );
        (e = e ? e.toUpperCase() : "GET"),
            (this.H = t),
            (this.j = ""),
            (this.m = 0),
            (this.D = !1),
            (this.h = !0),
            (this.g = this.u ? this.u.g() : _e.g()),
            (this.C = this.u ? Te(this.u) : Te(_e)),
            (this.g.onreadystatechange = P(this.Ha, this));
        try {
            (this.F = !0), this.g.open(e, String(t), !0), (this.F = !1);
        } catch (t) {
            return void qn(this, t);
        }
        if (((t = n || ""), (n = new Map(this.headers)), s))
            if (Object.getPrototypeOf(s) === Object.prototype)
                for (var r in s) n.set(r, s[r]);
            else {
                if ("function" != typeof s.keys || "function" != typeof s.get)
                    throw Error(
                        "Unknown input type for opt_headers: " + String(s)
                    );
                for (const t of s.keys()) n.set(t, s.get(t));
            }
        (s = Array.from(n.keys()).find(
            (t) => "content-type" == t.toLowerCase()
        )),
            (r = N.FormData && t instanceof N.FormData),
            !(0 <= G(Pn, e)) ||
                s ||
                r ||
                n.set(
                    "Content-Type",
                    "application/x-www-form-urlencoded;charset=utf-8"
                );
        for (const [t, e] of n) this.g.setRequestHeader(t, e);
        this.J && (this.g.responseType = this.J),
            "withCredentials" in this.g &&
                this.g.withCredentials !== this.L &&
                (this.g.withCredentials = this.L);
        try {
            Kn(this),
                0 < this.B &&
                    ((this.K = (function (t) {
                        return (
                            nt &&
                            ft() &&
                            "number" == typeof t.timeout &&
                            void 0 !== t.ontimeout
                        );
                    })(this.g))
                        ? ((this.g.timeout = this.B),
                          (this.g.ontimeout = P(this.qa, this)))
                        : (this.A = ne(this.qa, this.B, this))),
                (this.v = !0),
                this.g.send(t),
                (this.v = !1);
        } catch (t) {
            qn(this, t);
        }
    }),
    (D.qa = function () {
        void 0 !== C &&
            this.g &&
            ((this.j = "Timed out after " + this.B + "ms, aborting"),
            (this.m = 8),
            Gt(this, "timeout"),
            this.abort(8));
    }),
    (D.abort = function (t) {
        this.g &&
            this.h &&
            ((this.h = !1),
            (this.l = !0),
            this.g.abort(),
            (this.l = !1),
            (this.m = t || 7),
            Gt(this, "complete"),
            Gt(this, "abort"),
            Gn(this));
    }),
    (D.M = function () {
        this.g &&
            (this.h &&
                ((this.h = !1), (this.l = !0), this.g.abort(), (this.l = !1)),
            Gn(this, !0)),
            Fn.X.M.call(this);
    }),
    (D.Ha = function () {
        this.s || (this.F || this.v || this.l ? Un(this) : this.fb());
    }),
    (D.fb = function () {
        Un(this);
    }),
    (D.aa = function () {
        try {
            return 2 < jn(this) ? this.g.status : -1;
        } catch (t) {
            return -1;
        }
    }),
    (D.fa = function () {
        try {
            return this.g ? this.g.responseText : "";
        } catch (t) {
            return "";
        }
    }),
    (D.Sa = function (t) {
        if (this.g) {
            var e = this.g.responseText;
            return t && 0 == e.indexOf(t) && (e = e.substring(t.length)), Mn(e);
        }
    }),
    (D.Ea = function () {
        return this.m;
    }),
    (D.Oa = function () {
        return "string" == typeof this.j ? this.j : String(this.j);
    }),
    ((D = Wn.prototype).ma = 8),
    (D.G = 1),
    (D.Ja = function (t) {
        if (this.m)
            if (((this.m = null), 1 == this.G)) {
                if (!t) {
                    (this.U = Math.floor(1e5 * Math.random())), (t = this.U++);
                    const r = new Ne(this, this.j, t, void 0);
                    let i = this.s;
                    if (
                        (this.S &&
                            (i ? ((i = Tt(i)), _t(i, this.S)) : (i = this.S)),
                        null !== this.o || this.N || ((r.H = i), (i = null)),
                        this.O)
                    )
                        t: {
                            for (var e = 0, n = 0; n < this.i.length; n++) {
                                var s = this.i[n];
                                if (
                                    void 0 ===
                                    (s =
                                        "__data__" in s.g &&
                                        "string" == typeof (s = s.g.__data__)
                                            ? s.length
                                            : void 0)
                                )
                                    break;
                                if (4096 < (e += s)) {
                                    e = n;
                                    break t;
                                }
                                if (4096 === e || n === this.i.length - 1) {
                                    e = n + 1;
                                    break t;
                                }
                            }
                            e = 1e3;
                        }
                    else e = 1e3;
                    (e = ns(this, r, e)),
                        Ze((n = We(this.F)), "RID", t),
                        Ze(n, "CVER", 22),
                        this.D && Ze(n, "X-HTTP-Session-Id", this.D),
                        es(this, n),
                        i &&
                            (this.N
                                ? (e =
                                      "headers=" +
                                      encodeURIComponent(String(Qn(i))) +
                                      "&" +
                                      e)
                                : this.o && zn(n, this.o, i)),
                        bn(this.h, r),
                        this.Ya && Ze(n, "TYPE", "init"),
                        this.O
                            ? (Ze(n, "$req", e),
                              Ze(n, "SID", "null"),
                              (r.Z = !0),
                              Fe(r, n, null))
                            : Fe(r, n, e),
                        (this.G = 2);
                }
            } else
                3 == this.G &&
                    (t
                        ? ts(this, t)
                        : 0 == this.i.length || wn(this.h) || ts(this));
    }),
    (D.Ia = function () {
        if (
            ((this.u = null),
            os(this),
            this.$ && !(this.K || null == this.g || 0 >= this.P))
        ) {
            var t = 2 * this.P;
            this.j.info("BP detection timer enabled: " + t),
                (this.B = ve(P(this.eb, this), t));
        }
    }),
    (D.eb = function () {
        this.B &&
            ((this.B = null),
            this.j.info("BP detection timeout reached."),
            this.j.info("Buffering proxy detected and switch to long-polling!"),
            (this.L = !1),
            (this.K = !0),
            ye(10),
            Xn(this),
            os(this));
    }),
    (D.cb = function () {
        null != this.v && ((this.v = null), Xn(this), rs(this), ye(19));
    }),
    (D.kb = function (t) {
        t
            ? (this.j.info("Successfully pinged google.com"), ye(2))
            : (this.j.info("Failed to ping google.com"), ye(1));
    }),
    ((D = ms.prototype).xa = function () {}),
    (D.wa = function () {}),
    (D.va = function () {}),
    (D.ua = function () {}),
    (D.Ra = function () {}),
    (gs.prototype.g = function (t, e) {
        return new ps(t, e);
    }),
    B(ps, Ut),
    (ps.prototype.m = function () {
        (this.g.l = this.j), this.A && (this.g.H = !0);
        var t = this.g,
            e = this.l,
            n = this.h || void 0;
        ye(0),
            (t.V = e),
            (t.ia = n || {}),
            (t.L = t.Y),
            (t.F = ds(t, null, t.V)),
            Zn(t);
    }),
    (ps.prototype.close = function () {
        Yn(this.g);
    }),
    (ps.prototype.u = function (t) {
        var e = this.g;
        if ("string" == typeof t) {
            var n = {};
            (n.__data__ = t), (t = n);
        } else this.v && (((n = {}).__data__ = jt(t)), (t = n));
        e.i.push(
            new (class {
                constructor(t, e) {
                    (this.h = t), (this.g = e);
                }
            })(e.ab++, t)
        ),
            3 == e.G && Zn(e);
    }),
    (ps.prototype.M = function () {
        (this.g.l = null),
            delete this.j,
            Yn(this.g),
            delete this.g,
            ps.X.M.call(this);
    }),
    B(ys, De),
    B(ws, Ae),
    B(vs, ms),
    (vs.prototype.xa = function () {
        Gt(this.g, "a");
    }),
    (vs.prototype.wa = function (t) {
        Gt(this.g, new ys(t));
    }),
    (vs.prototype.va = function (t) {
        Gt(this.g, new ws());
    }),
    (vs.prototype.ua = function () {
        Gt(this.g, "b");
    }),
    (gs.prototype.createWebChannel = gs.prototype.g),
    (ps.prototype.send = ps.prototype.u),
    (ps.prototype.open = ps.prototype.m),
    (ps.prototype.close = ps.prototype.close),
    (Ie.NO_ERROR = 0),
    (Ie.TIMEOUT = 8),
    (Ie.HTTP_ERROR = 6),
    (be.COMPLETE = "complete"),
    (Se.EventType = xe),
    (xe.OPEN = "a"),
    (xe.CLOSE = "b"),
    (xe.ERROR = "c"),
    (xe.MESSAGE = "d"),
    (Ut.prototype.listen = Ut.prototype.N),
    (Fn.prototype.listenOnce = Fn.prototype.O),
    (Fn.prototype.getLastError = Fn.prototype.Oa),
    (Fn.prototype.getLastErrorCode = Fn.prototype.Ea),
    (Fn.prototype.getStatus = Fn.prototype.aa),
    (Fn.prototype.getResponseJson = Fn.prototype.Sa),
    (Fn.prototype.getResponseText = Fn.prototype.fa),
    (Fn.prototype.send = Fn.prototype.da),
    (Fn.prototype.setWithCredentials = Fn.prototype.Ka);
var Is = Ie,
    bs = be,
    Es = le,
    Ts = 10,
    Ss = 11,
    _s = An,
    xs = Se,
    Ds = Fn;
const As = "@firebase/firestore";
class Cs {
    constructor(t) {
        this.uid = t;
    }
    isAuthenticated() {
        return null != this.uid;
    }
    toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(t) {
        return t.uid === this.uid;
    }
}
(Cs.UNAUTHENTICATED = new Cs(null)),
    (Cs.GOOGLE_CREDENTIALS = new Cs("google-credentials-uid")),
    (Cs.FIRST_PARTY = new Cs("first-party-uid")),
    (Cs.MOCK_USER = new Cs("mock-user"));
let Ns = "9.17.1";
const ks = new (class {
    constructor(t) {
        (this.name = t),
            (this._logLevel = S),
            (this._logHandler = x),
            (this._userLogHandler = null);
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(t) {
        if (!(t in E))
            throw new TypeError(
                `Invalid value "${t}" assigned to \`logLevel\``
            );
        this._logLevel = t;
    }
    setLogLevel(t) {
        this._logLevel = "string" == typeof t ? T[t] : t;
    }
    get logHandler() {
        return this._logHandler;
    }
    set logHandler(t) {
        if ("function" != typeof t)
            throw new TypeError(
                "Value assigned to `logHandler` must be a function"
            );
        this._logHandler = t;
    }
    get userLogHandler() {
        return this._userLogHandler;
    }
    set userLogHandler(t) {
        this._userLogHandler = t;
    }
    debug(...t) {
        this._userLogHandler && this._userLogHandler(this, E.DEBUG, ...t),
            this._logHandler(this, E.DEBUG, ...t);
    }
    log(...t) {
        this._userLogHandler && this._userLogHandler(this, E.VERBOSE, ...t),
            this._logHandler(this, E.VERBOSE, ...t);
    }
    info(...t) {
        this._userLogHandler && this._userLogHandler(this, E.INFO, ...t),
            this._logHandler(this, E.INFO, ...t);
    }
    warn(...t) {
        this._userLogHandler && this._userLogHandler(this, E.WARN, ...t),
            this._logHandler(this, E.WARN, ...t);
    }
    error(...t) {
        this._userLogHandler && this._userLogHandler(this, E.ERROR, ...t),
            this._logHandler(this, E.ERROR, ...t);
    }
})("@firebase/firestore");
function Rs() {
    return ks.logLevel;
}
function Ls(t) {
    ks.setLogLevel(t);
}
function Ms(t, ...e) {
    if (ks.logLevel <= E.DEBUG) {
        const n = e.map(Vs);
        ks.debug(`Firestore (${Ns}): ${t}`, ...n);
    }
}
function Fs(t, ...e) {
    if (ks.logLevel <= E.ERROR) {
        const n = e.map(Vs);
        ks.error(`Firestore (${Ns}): ${t}`, ...n);
    }
}
function Os(t, ...e) {
    if (ks.logLevel <= E.WARN) {
        const n = e.map(Vs);
        ks.warn(`Firestore (${Ns}): ${t}`, ...n);
    }
}
function Vs(t) {
    if ("string" == typeof t) return t;
    try {
        return (e = t), JSON.stringify(e);
    } catch (e) {
        return t;
    }
    var e;
}
function Ps(t = "Unexpected state") {
    const e = `FIRESTORE (${Ns}) INTERNAL ASSERTION FAILED: ` + t;
    throw (Fs(e), new Error(e));
}
function qs(t, e) {
    t || Ps();
}
function Bs(t, e) {
    t || Ps();
}
function Us(t, e) {
    return t;
}
const Gs = {
    OK: "ok",
    CANCELLED: "cancelled",
    UNKNOWN: "unknown",
    INVALID_ARGUMENT: "invalid-argument",
    DEADLINE_EXCEEDED: "deadline-exceeded",
    NOT_FOUND: "not-found",
    ALREADY_EXISTS: "already-exists",
    PERMISSION_DENIED: "permission-denied",
    UNAUTHENTICATED: "unauthenticated",
    RESOURCE_EXHAUSTED: "resource-exhausted",
    FAILED_PRECONDITION: "failed-precondition",
    ABORTED: "aborted",
    OUT_OF_RANGE: "out-of-range",
    UNIMPLEMENTED: "unimplemented",
    INTERNAL: "internal",
    UNAVAILABLE: "unavailable",
    DATA_LOSS: "data-loss",
};
class Ks extends g {
    constructor(t, e) {
        super(t, e),
            (this.code = t),
            (this.message = e),
            (this.toString = () =>
                `${this.name}: [code=${this.code}]: ${this.message}`);
    }
}
class js {
    constructor() {
        this.promise = new Promise((t, e) => {
            (this.resolve = t), (this.reject = e);
        });
    }
}
class $s {
    constructor(t, e) {
        (this.user = e),
            (this.type = "OAuth"),
            (this.headers = new Map()),
            this.headers.set("Authorization", `Bearer ${t}`);
    }
}
class Qs {
    getToken() {
        return Promise.resolve(null);
    }
    invalidateToken() {}
    start(t, e) {
        t.enqueueRetryable(() => e(Cs.UNAUTHENTICATED));
    }
    shutdown() {}
}
class zs {
    constructor(t) {
        (this.token = t), (this.changeListener = null);
    }
    getToken() {
        return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(t, e) {
        (this.changeListener = e), t.enqueueRetryable(() => e(this.token.user));
    }
    shutdown() {
        this.changeListener = null;
    }
}
class Hs {
    constructor(t) {
        (this.t = t),
            (this.currentUser = Cs.UNAUTHENTICATED),
            (this.i = 0),
            (this.forceRefresh = !1),
            (this.auth = null);
    }
    start(t, e) {
        let n = this.i;
        const s = (t) =>
            this.i !== n ? ((n = this.i), e(t)) : Promise.resolve();
        let r = new js();
        this.o = () => {
            this.i++,
                (this.currentUser = this.u()),
                r.resolve(),
                (r = new js()),
                t.enqueueRetryable(() => s(this.currentUser));
        };
        const i = () => {
                const e = r;
                t.enqueueRetryable(async () => {
                    await e.promise, await s(this.currentUser);
                });
            },
            o = (t) => {
                Ms("FirebaseAuthCredentialsProvider", "Auth detected"),
                    (this.auth = t),
                    this.auth.addAuthTokenListener(this.o),
                    i();
            };
        this.t.onInit((t) => o(t)),
            setTimeout(() => {
                if (!this.auth) {
                    const t = this.t.getImmediate({ optional: !0 });
                    t
                        ? o(t)
                        : (Ms(
                              "FirebaseAuthCredentialsProvider",
                              "Auth not yet detected"
                          ),
                          r.resolve(),
                          (r = new js()));
                }
            }, 0),
            i();
    }
    getToken() {
        const t = this.i,
            e = this.forceRefresh;
        return (
            (this.forceRefresh = !1),
            this.auth
                ? this.auth
                      .getToken(e)
                      .then((e) =>
                          this.i !== t
                              ? (Ms(
                                    "FirebaseAuthCredentialsProvider",
                                    "getToken aborted due to token change."
                                ),
                                this.getToken())
                              : e
                              ? (qs("string" == typeof e.accessToken),
                                new $s(e.accessToken, this.currentUser))
                              : null
                      )
                : Promise.resolve(null)
        );
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }
    u() {
        const t = this.auth && this.auth.getUid();
        return qs(null === t || "string" == typeof t), new Cs(t);
    }
}
class Ws {
    constructor(t, e, n, s) {
        (this.h = t),
            (this.l = e),
            (this.m = n),
            (this.g = s),
            (this.type = "FirstParty"),
            (this.user = Cs.FIRST_PARTY),
            (this.p = new Map());
    }
    I() {
        return this.g
            ? this.g()
            : (qs(
                  !(
                      "object" != typeof this.h ||
                      null === this.h ||
                      !this.h.auth ||
                      !this.h.auth.getAuthHeaderValueForFirstParty
                  )
              ),
              this.h.auth.getAuthHeaderValueForFirstParty([]));
    }
    get headers() {
        this.p.set("X-Goog-AuthUser", this.l);
        const t = this.I();
        return (
            t && this.p.set("Authorization", t),
            this.m && this.p.set("X-Goog-Iam-Authorization-Token", this.m),
            this.p
        );
    }
}
class Ys {
    constructor(t, e, n, s) {
        (this.h = t), (this.l = e), (this.m = n), (this.g = s);
    }
    getToken() {
        return Promise.resolve(new Ws(this.h, this.l, this.m, this.g));
    }
    start(t, e) {
        t.enqueueRetryable(() => e(Cs.FIRST_PARTY));
    }
    shutdown() {}
    invalidateToken() {}
}
class Xs {
    constructor(t) {
        (this.value = t),
            (this.type = "AppCheck"),
            (this.headers = new Map()),
            t &&
                t.length > 0 &&
                this.headers.set("x-firebase-appcheck", this.value);
    }
}
class Js {
    constructor(t) {
        (this.T = t),
            (this.forceRefresh = !1),
            (this.appCheck = null),
            (this.A = null);
    }
    start(t, e) {
        const n = (t) => {
            null != t.error &&
                Ms(
                    "FirebaseAppCheckTokenProvider",
                    `Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`
                );
            const n = t.token !== this.A;
            return (
                (this.A = t.token),
                Ms(
                    "FirebaseAppCheckTokenProvider",
                    `Received ${n ? "new" : "existing"} token.`
                ),
                n ? e(t.token) : Promise.resolve()
            );
        };
        this.o = (e) => {
            t.enqueueRetryable(() => n(e));
        };
        const s = (t) => {
            Ms("FirebaseAppCheckTokenProvider", "AppCheck detected"),
                (this.appCheck = t),
                this.appCheck.addTokenListener(this.o);
        };
        this.T.onInit((t) => s(t)),
            setTimeout(() => {
                if (!this.appCheck) {
                    const t = this.T.getImmediate({ optional: !0 });
                    t
                        ? s(t)
                        : Ms(
                              "FirebaseAppCheckTokenProvider",
                              "AppCheck not yet detected"
                          );
                }
            }, 0);
    }
    getToken() {
        const t = this.forceRefresh;
        return (
            (this.forceRefresh = !1),
            this.appCheck
                ? this.appCheck
                      .getToken(t)
                      .then((t) =>
                          t
                              ? (qs("string" == typeof t.token),
                                (this.A = t.token),
                                new Xs(t.token))
                              : null
                      )
                : Promise.resolve(null)
        );
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }
}
class Zs {
    getToken() {
        return Promise.resolve(new Xs(""));
    }
    invalidateToken() {}
    start(t, e) {}
    shutdown() {}
}
function tr(t) {
    const e = "undefined" != typeof self && (self.crypto || self.msCrypto),
        n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n);
    else for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
    return n;
}
class er {
    static R() {
        const t =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            e = Math.floor(256 / t.length) * t.length;
        let n = "";
        for (; n.length < 20; ) {
            const s = tr(40);
            for (let r = 0; r < s.length; ++r)
                n.length < 20 && s[r] < e && (n += t.charAt(s[r] % t.length));
        }
        return n;
    }
}
function nr(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}
function sr(t, e, n) {
    return t.length === e.length && t.every((t, s) => n(t, e[s]));
}
function rr(t) {
    return t + "\0";
}
class ir {
    constructor(t, e) {
        if (((this.seconds = t), (this.nanoseconds = e), e < 0))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Timestamp nanoseconds out of range: " + e
            );
        if (e >= 1e9)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Timestamp nanoseconds out of range: " + e
            );
        if (t < -62135596800)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Timestamp seconds out of range: " + t
            );
        if (t >= 253402300800)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Timestamp seconds out of range: " + t
            );
    }
    static now() {
        return ir.fromMillis(Date.now());
    }
    static fromDate(t) {
        return ir.fromMillis(t.getTime());
    }
    static fromMillis(t) {
        const e = Math.floor(t / 1e3),
            n = Math.floor(1e6 * (t - 1e3 * e));
        return new ir(e, n);
    }
    toDate() {
        return new Date(this.toMillis());
    }
    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
    _compareTo(t) {
        return this.seconds === t.seconds
            ? nr(this.nanoseconds, t.nanoseconds)
            : nr(this.seconds, t.seconds);
    }
    isEqual(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }
    toString() {
        return (
            "Timestamp(seconds=" +
            this.seconds +
            ", nanoseconds=" +
            this.nanoseconds +
            ")"
        );
    }
    toJSON() {
        return { seconds: this.seconds, nanoseconds: this.nanoseconds };
    }
    valueOf() {
        const t = this.seconds - -62135596800;
        return (
            String(t).padStart(12, "0") +
            "." +
            String(this.nanoseconds).padStart(9, "0")
        );
    }
}
class or {
    constructor(t) {
        this.timestamp = t;
    }
    static fromTimestamp(t) {
        return new or(t);
    }
    static min() {
        return new or(new ir(0, 0));
    }
    static max() {
        return new or(new ir(253402300799, 999999999));
    }
    compareTo(t) {
        return this.timestamp._compareTo(t.timestamp);
    }
    isEqual(t) {
        return this.timestamp.isEqual(t.timestamp);
    }
    toMicroseconds() {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    toTimestamp() {
        return this.timestamp;
    }
}
class ar {
    constructor(t, e, n) {
        void 0 === e ? (e = 0) : e > t.length && Ps(),
            void 0 === n ? (n = t.length - e) : n > t.length - e && Ps(),
            (this.segments = t),
            (this.offset = e),
            (this.len = n);
    }
    get length() {
        return this.len;
    }
    isEqual(t) {
        return 0 === ar.comparator(this, t);
    }
    child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return (
            t instanceof ar
                ? t.forEach((t) => {
                      e.push(t);
                  })
                : e.push(t),
            this.construct(e)
        );
    }
    limit() {
        return this.offset + this.length;
    }
    popFirst(t) {
        return (
            (t = void 0 === t ? 1 : t),
            this.construct(this.segments, this.offset + t, this.length - t)
        );
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
        return this.segments[this.offset];
    }
    lastSegment() {
        return this.get(this.length - 1);
    }
    get(t) {
        return this.segments[this.offset + t];
    }
    isEmpty() {
        return 0 === this.length;
    }
    isPrefixOf(t) {
        if (t.length < this.length) return !1;
        for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    isImmediateParentOf(t) {
        if (this.length + 1 !== t.length) return !1;
        for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    forEach(t) {
        for (let e = this.offset, n = this.limit(); e < n; e++)
            t(this.segments[e]);
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit());
    }
    static comparator(t, e) {
        const n = Math.min(t.length, e.length);
        for (let s = 0; s < n; s++) {
            const n = t.get(s),
                r = e.get(s);
            if (n < r) return -1;
            if (n > r) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }
}
class ur extends ar {
    construct(t, e, n) {
        return new ur(t, e, n);
    }
    canonicalString() {
        return this.toArray().join("/");
    }
    toString() {
        return this.canonicalString();
    }
    static fromString(...t) {
        const e = [];
        for (const n of t) {
            if (n.indexOf("//") >= 0)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    `Invalid segment (${n}). Paths must not contain // in them.`
                );
            e.push(...n.split("/").filter((t) => t.length > 0));
        }
        return new ur(e);
    }
    static emptyPath() {
        return new ur([]);
    }
}
const cr = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class hr extends ar {
    construct(t, e, n) {
        return new hr(t, e, n);
    }
    static isValidIdentifier(t) {
        return cr.test(t);
    }
    canonicalString() {
        return this.toArray()
            .map(
                (t) => (
                    (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
                    hr.isValidIdentifier(t) || (t = "`" + t + "`"),
                    t
                )
            )
            .join(".");
    }
    toString() {
        return this.canonicalString();
    }
    isKeyField() {
        return 1 === this.length && "__name__" === this.get(0);
    }
    static keyField() {
        return new hr(["__name__"]);
    }
    static fromServerFormat(t) {
        const e = [];
        let n = "",
            s = 0;
        const r = () => {
            if (0 === n.length)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`
                );
            e.push(n), (n = "");
        };
        let i = !1;
        for (; s < t.length; ) {
            const e = t[s];
            if ("\\" === e) {
                if (s + 1 === t.length)
                    throw new Ks(
                        Gs.INVALID_ARGUMENT,
                        "Path has trailing escape character: " + t
                    );
                const e = t[s + 1];
                if ("\\" !== e && "." !== e && "`" !== e)
                    throw new Ks(
                        Gs.INVALID_ARGUMENT,
                        "Path has invalid escape sequence: " + t
                    );
                (n += e), (s += 2);
            } else
                "`" === e
                    ? ((i = !i), s++)
                    : "." !== e || i
                    ? ((n += e), s++)
                    : (r(), s++);
        }
        if ((r(), i))
            throw new Ks(Gs.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new hr(e);
    }
    static emptyPath() {
        return new hr([]);
    }
}
class lr {
    constructor(t) {
        this.path = t;
    }
    static fromPath(t) {
        return new lr(ur.fromString(t));
    }
    static fromName(t) {
        return new lr(ur.fromString(t).popFirst(5));
    }
    static empty() {
        return new lr(ur.emptyPath());
    }
    get collectionGroup() {
        return this.path.popLast().lastSegment();
    }
    hasCollectionId(t) {
        return (
            this.path.length >= 2 && this.path.get(this.path.length - 2) === t
        );
    }
    getCollectionGroup() {
        return this.path.get(this.path.length - 2);
    }
    getCollectionPath() {
        return this.path.popLast();
    }
    isEqual(t) {
        return null !== t && 0 === ur.comparator(this.path, t.path);
    }
    toString() {
        return this.path.toString();
    }
    static comparator(t, e) {
        return ur.comparator(t.path, e.path);
    }
    static isDocumentKey(t) {
        return t.length % 2 == 0;
    }
    static fromSegments(t) {
        return new lr(new ur(t.slice()));
    }
}
class dr {
    constructor(t, e, n, s) {
        (this.indexId = t),
            (this.collectionGroup = e),
            (this.fields = n),
            (this.indexState = s);
    }
}
function fr(t) {
    return t.fields.find((t) => 2 === t.kind);
}
function mr(t) {
    return t.fields.filter((t) => 2 !== t.kind);
}
function gr(t, e) {
    let n = nr(t.collectionGroup, e.collectionGroup);
    if (0 !== n) return n;
    for (let s = 0; s < Math.min(t.fields.length, e.fields.length); ++s)
        if (((n = yr(t.fields[s], e.fields[s])), 0 !== n)) return n;
    return nr(t.fields.length, e.fields.length);
}
dr.UNKNOWN_ID = -1;
class pr {
    constructor(t, e) {
        (this.fieldPath = t), (this.kind = e);
    }
}
function yr(t, e) {
    const n = hr.comparator(t.fieldPath, e.fieldPath);
    return 0 !== n ? n : nr(t.kind, e.kind);
}
class wr {
    constructor(t, e) {
        (this.sequenceNumber = t), (this.offset = e);
    }
    static empty() {
        return new wr(0, br.min());
    }
}
function vr(t, e) {
    const n = t.toTimestamp().seconds,
        s = t.toTimestamp().nanoseconds + 1,
        r = or.fromTimestamp(1e9 === s ? new ir(n + 1, 0) : new ir(n, s));
    return new br(r, lr.empty(), e);
}
function Ir(t) {
    return new br(t.readTime, t.key, -1);
}
class br {
    constructor(t, e, n) {
        (this.readTime = t), (this.documentKey = e), (this.largestBatchId = n);
    }
    static min() {
        return new br(or.min(), lr.empty(), -1);
    }
    static max() {
        return new br(or.max(), lr.empty(), -1);
    }
}
function Er(t, e) {
    let n = t.readTime.compareTo(e.readTime);
    return 0 !== n
        ? n
        : ((n = lr.comparator(t.documentKey, e.documentKey)),
          0 !== n ? n : nr(t.largestBatchId, e.largestBatchId));
}
const Tr =
    "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class Sr {
    constructor() {
        this.onCommittedListeners = [];
    }
    addOnCommittedListener(t) {
        this.onCommittedListeners.push(t);
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((t) => t());
    }
}
async function _r(t) {
    if (t.code !== Gs.FAILED_PRECONDITION || t.message !== Tr) throw t;
    Ms("LocalStore", "Unexpectedly lost primary lease");
}
class xr {
    constructor(t) {
        (this.nextCallback = null),
            (this.catchCallback = null),
            (this.result = void 0),
            (this.error = void 0),
            (this.isDone = !1),
            (this.callbackAttached = !1),
            t(
                (t) => {
                    (this.isDone = !0),
                        (this.result = t),
                        this.nextCallback && this.nextCallback(t);
                },
                (t) => {
                    (this.isDone = !0),
                        (this.error = t),
                        this.catchCallback && this.catchCallback(t);
                }
            );
    }
    catch(t) {
        return this.next(void 0, t);
    }
    next(t, e) {
        return (
            this.callbackAttached && Ps(),
            (this.callbackAttached = !0),
            this.isDone
                ? this.error
                    ? this.wrapFailure(e, this.error)
                    : this.wrapSuccess(t, this.result)
                : new xr((n, s) => {
                      (this.nextCallback = (e) => {
                          this.wrapSuccess(t, e).next(n, s);
                      }),
                          (this.catchCallback = (t) => {
                              this.wrapFailure(e, t).next(n, s);
                          });
                  })
        );
    }
    toPromise() {
        return new Promise((t, e) => {
            this.next(t, e);
        });
    }
    wrapUserFunction(t) {
        try {
            const e = t();
            return e instanceof xr ? e : xr.resolve(e);
        } catch (t) {
            return xr.reject(t);
        }
    }
    wrapSuccess(t, e) {
        return t ? this.wrapUserFunction(() => t(e)) : xr.resolve(e);
    }
    wrapFailure(t, e) {
        return t ? this.wrapUserFunction(() => t(e)) : xr.reject(e);
    }
    static resolve(t) {
        return new xr((e, n) => {
            e(t);
        });
    }
    static reject(t) {
        return new xr((e, n) => {
            n(t);
        });
    }
    static waitFor(t) {
        return new xr((e, n) => {
            let s = 0,
                r = 0,
                i = !1;
            t.forEach((t) => {
                ++s,
                    t.next(
                        () => {
                            ++r, i && r === s && e();
                        },
                        (t) => n(t)
                    );
            }),
                (i = !0),
                r === s && e();
        });
    }
    static or(t) {
        let e = xr.resolve(!1);
        for (const n of t) e = e.next((t) => (t ? xr.resolve(t) : n()));
        return e;
    }
    static forEach(t, e) {
        const n = [];
        return (
            t.forEach((t, s) => {
                n.push(e.call(this, t, s));
            }),
            this.waitFor(n)
        );
    }
    static mapArray(t, e) {
        return new xr((n, s) => {
            const r = t.length,
                i = new Array(r);
            let o = 0;
            for (let a = 0; a < r; a++) {
                const u = a;
                e(t[u]).next(
                    (t) => {
                        (i[u] = t), ++o, o === r && n(i);
                    },
                    (t) => s(t)
                );
            }
        });
    }
    static doWhile(t, e) {
        return new xr((n, s) => {
            const r = () => {
                !0 === t()
                    ? e().next(() => {
                          r();
                      }, s)
                    : n();
            };
            r();
        });
    }
}
class Dr {
    constructor(t, e) {
        (this.action = t),
            (this.transaction = e),
            (this.aborted = !1),
            (this.P = new js()),
            (this.transaction.oncomplete = () => {
                this.P.resolve();
            }),
            (this.transaction.onabort = () => {
                e.error ? this.P.reject(new Nr(t, e.error)) : this.P.resolve();
            }),
            (this.transaction.onerror = (e) => {
                const n = Fr(e.target.error);
                this.P.reject(new Nr(t, n));
            });
    }
    static open(t, e, n, s) {
        try {
            return new Dr(e, t.transaction(s, n));
        } catch (t) {
            throw new Nr(e, t);
        }
    }
    get v() {
        return this.P.promise;
    }
    abort(t) {
        t && this.P.reject(t),
            this.aborted ||
                (Ms(
                    "SimpleDb",
                    "Aborting transaction:",
                    t ? t.message : "Client-initiated abort"
                ),
                (this.aborted = !0),
                this.transaction.abort());
    }
    V() {
        const t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit();
    }
    store(t) {
        const e = this.transaction.objectStore(t);
        return new Rr(e);
    }
}
class Ar {
    constructor(t, e, n) {
        (this.name = t),
            (this.version = e),
            (this.S = n),
            12.2 === Ar.D(f()) &&
                Fs(
                    "Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround."
                );
    }
    static delete(t) {
        return (
            Ms("SimpleDb", "Removing database:", t),
            Lr(window.indexedDB.deleteDatabase(t)).toPromise()
        );
    }
    static C() {
        if (
            !(function () {
                try {
                    return "object" == typeof indexedDB;
                } catch (t) {
                    return !1;
                }
            })()
        )
            return !1;
        if (Ar.N()) return !0;
        const t = f(),
            e = Ar.D(t),
            n = 0 < e && e < 10,
            s = Ar.k(t),
            r = 0 < s && s < 4.5;
        return !(
            t.indexOf("MSIE ") > 0 ||
            t.indexOf("Trident/") > 0 ||
            t.indexOf("Edge/") > 0 ||
            n ||
            r
        );
    }
    static N() {
        var t;
        return (
            "undefined" != typeof process &&
            "YES" ===
                (null === (t = process.env) || void 0 === t ? void 0 : t.O)
        );
    }
    static M(t, e) {
        return t.store(e);
    }
    static D(t) {
        const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),
            n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    static k(t) {
        const e = t.match(/Android ([\d.]+)/i),
            n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    async F(t) {
        return (
            this.db ||
                (Ms("SimpleDb", "Opening database:", this.name),
                (this.db = await new Promise((e, n) => {
                    const s = indexedDB.open(this.name, this.version);
                    (s.onsuccess = (t) => {
                        const n = t.target.result;
                        e(n);
                    }),
                        (s.onblocked = () => {
                            n(
                                new Nr(
                                    t,
                                    "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."
                                )
                            );
                        }),
                        (s.onerror = (e) => {
                            const s = e.target.error;
                            "VersionError" === s.name
                                ? n(
                                      new Ks(
                                          Gs.FAILED_PRECONDITION,
                                          "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh."
                                      )
                                  )
                                : "InvalidStateError" === s.name
                                ? n(
                                      new Ks(
                                          Gs.FAILED_PRECONDITION,
                                          "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " +
                                              s
                                      )
                                  )
                                : n(new Nr(t, s));
                        }),
                        (s.onupgradeneeded = (t) => {
                            Ms(
                                "SimpleDb",
                                'Database "' +
                                    this.name +
                                    '" requires upgrade from version:',
                                t.oldVersion
                            );
                            const e = t.target.result;
                            this.S.$(
                                e,
                                s.transaction,
                                t.oldVersion,
                                this.version
                            ).next(() => {
                                Ms(
                                    "SimpleDb",
                                    "Database upgrade to version " +
                                        this.version +
                                        " complete"
                                );
                            });
                        });
                }))),
            this.B && (this.db.onversionchange = (t) => this.B(t)),
            this.db
        );
    }
    L(t) {
        (this.B = t), this.db && (this.db.onversionchange = (e) => t(e));
    }
    async runTransaction(t, e, n, s) {
        const r = "readonly" === e;
        let i = 0;
        for (;;) {
            ++i;
            try {
                this.db = await this.F(t);
                const e = Dr.open(this.db, t, r ? "readonly" : "readwrite", n),
                    i = s(e)
                        .next((t) => (e.V(), t))
                        .catch((t) => (e.abort(t), xr.reject(t)))
                        .toPromise();
                return i.catch(() => {}), await e.v, i;
            } catch (t) {
                const e = t,
                    n = "FirebaseError" !== e.name && i < 3;
                if (
                    (Ms(
                        "SimpleDb",
                        "Transaction failed with error:",
                        e.message,
                        "Retrying:",
                        n
                    ),
                    this.close(),
                    !n)
                )
                    return Promise.reject(e);
            }
        }
    }
    close() {
        this.db && this.db.close(), (this.db = void 0);
    }
}
class Cr {
    constructor(t) {
        (this.q = t), (this.U = !1), (this.K = null);
    }
    get isDone() {
        return this.U;
    }
    get G() {
        return this.K;
    }
    set cursor(t) {
        this.q = t;
    }
    done() {
        this.U = !0;
    }
    j(t) {
        this.K = t;
    }
    delete() {
        return Lr(this.q.delete());
    }
}
class Nr extends Ks {
    constructor(t, e) {
        super(Gs.UNAVAILABLE, `IndexedDB transaction '${t}' failed: ${e}`),
            (this.name = "IndexedDbTransactionError");
    }
}
function kr(t) {
    return "IndexedDbTransactionError" === t.name;
}
class Rr {
    constructor(t) {
        this.store = t;
    }
    put(t, e) {
        let n;
        return (
            void 0 !== e
                ? (Ms("SimpleDb", "PUT", this.store.name, t, e),
                  (n = this.store.put(e, t)))
                : (Ms("SimpleDb", "PUT", this.store.name, "<auto-key>", t),
                  (n = this.store.put(t))),
            Lr(n)
        );
    }
    add(t) {
        return (
            Ms("SimpleDb", "ADD", this.store.name, t, t), Lr(this.store.add(t))
        );
    }
    get(t) {
        return Lr(this.store.get(t)).next(
            (e) => (
                void 0 === e && (e = null),
                Ms("SimpleDb", "GET", this.store.name, t, e),
                e
            )
        );
    }
    delete(t) {
        return (
            Ms("SimpleDb", "DELETE", this.store.name, t),
            Lr(this.store.delete(t))
        );
    }
    count() {
        return Ms("SimpleDb", "COUNT", this.store.name), Lr(this.store.count());
    }
    W(t, e) {
        const n = this.options(t, e);
        if (n.index || "function" != typeof this.store.getAll) {
            const t = this.cursor(n),
                e = [];
            return this.H(t, (t, n) => {
                e.push(n);
            }).next(() => e);
        }
        {
            const t = this.store.getAll(n.range);
            return new xr((e, n) => {
                (t.onerror = (t) => {
                    n(t.target.error);
                }),
                    (t.onsuccess = (t) => {
                        e(t.target.result);
                    });
            });
        }
    }
    J(t, e) {
        const n = this.store.getAll(t, null === e ? void 0 : e);
        return new xr((t, e) => {
            (n.onerror = (t) => {
                e(t.target.error);
            }),
                (n.onsuccess = (e) => {
                    t(e.target.result);
                });
        });
    }
    Y(t, e) {
        Ms("SimpleDb", "DELETE ALL", this.store.name);
        const n = this.options(t, e);
        n.X = !1;
        const s = this.cursor(n);
        return this.H(s, (t, e, n) => n.delete());
    }
    Z(t, e) {
        let n;
        e ? (n = t) : ((n = {}), (e = t));
        const s = this.cursor(n);
        return this.H(s, e);
    }
    tt(t) {
        const e = this.cursor({});
        return new xr((n, s) => {
            (e.onerror = (t) => {
                const e = Fr(t.target.error);
                s(e);
            }),
                (e.onsuccess = (e) => {
                    const s = e.target.result;
                    s
                        ? t(s.primaryKey, s.value).next((t) => {
                              t ? s.continue() : n();
                          })
                        : n();
                });
        });
    }
    H(t, e) {
        const n = [];
        return new xr((s, r) => {
            (t.onerror = (t) => {
                r(t.target.error);
            }),
                (t.onsuccess = (t) => {
                    const r = t.target.result;
                    if (!r) return void s();
                    const i = new Cr(r),
                        o = e(r.primaryKey, r.value, i);
                    if (o instanceof xr) {
                        const t = o.catch((t) => (i.done(), xr.reject(t)));
                        n.push(t);
                    }
                    i.isDone
                        ? s()
                        : null === i.G
                        ? r.continue()
                        : r.continue(i.G);
                });
        }).next(() => xr.waitFor(n));
    }
    options(t, e) {
        let n;
        return (
            void 0 !== t && ("string" == typeof t ? (n = t) : (e = t)),
            { index: n, range: e }
        );
    }
    cursor(t) {
        let e = "next";
        if ((t.reverse && (e = "prev"), t.index)) {
            const n = this.store.index(t.index);
            return t.X ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }
}
function Lr(t) {
    return new xr((e, n) => {
        (t.onsuccess = (t) => {
            const n = t.target.result;
            e(n);
        }),
            (t.onerror = (t) => {
                const e = Fr(t.target.error);
                n(e);
            });
    });
}
let Mr = !1;
function Fr(t) {
    const e = Ar.D(f());
    if (e >= 12.2 && e < 13) {
        const e =
            "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(e) >= 0) {
            const t = new Ks(
                "internal",
                `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`
            );
            return (
                Mr ||
                    ((Mr = !0),
                    setTimeout(() => {
                        throw t;
                    }, 0)),
                t
            );
        }
    }
    return t;
}
class Or {
    constructor(t, e) {
        (this.asyncQueue = t), (this.et = e), (this.task = null);
    }
    start() {
        this.nt(15e3);
    }
    stop() {
        this.task && (this.task.cancel(), (this.task = null));
    }
    get started() {
        return null !== this.task;
    }
    nt(t) {
        Ms("IndexBackiller", `Scheduled in ${t}ms`),
            (this.task = this.asyncQueue.enqueueAfterDelay(
                "index_backfill",
                t,
                async () => {
                    this.task = null;
                    try {
                        Ms(
                            "IndexBackiller",
                            `Documents written: ${await this.et.st()}`
                        );
                    } catch (t) {
                        kr(t)
                            ? Ms(
                                  "IndexBackiller",
                                  "Ignoring IndexedDB error during index backfill: ",
                                  t
                              )
                            : await _r(t);
                    }
                    await this.nt(6e4);
                }
            ));
    }
}
class Vr {
    constructor(t, e) {
        (this.localStore = t), (this.persistence = e);
    }
    async st(t = 50) {
        return this.persistence.runTransaction(
            "Backfill Indexes",
            "readwrite-primary",
            (e) => this.it(e, t)
        );
    }
    it(t, e) {
        const n = new Set();
        let s = e,
            r = !0;
        return xr
            .doWhile(
                () => !0 === r && s > 0,
                () =>
                    this.localStore.indexManager
                        .getNextCollectionGroupToUpdate(t)
                        .next((e) => {
                            if (null !== e && !n.has(e))
                                return (
                                    Ms(
                                        "IndexBackiller",
                                        `Processing collection: ${e}`
                                    ),
                                    this.rt(t, e, s).next((t) => {
                                        (s -= t), n.add(e);
                                    })
                                );
                            r = !1;
                        })
            )
            .next(() => e - s);
    }
    rt(t, e, n) {
        return this.localStore.indexManager
            .getMinOffsetFromCollectionGroup(t, e)
            .next((s) =>
                this.localStore.localDocuments
                    .getNextDocuments(t, e, s, n)
                    .next((n) => {
                        const r = n.changes;
                        return this.localStore.indexManager
                            .updateIndexEntries(t, r)
                            .next(() => this.ot(s, n))
                            .next(
                                (n) => (
                                    Ms(
                                        "IndexBackiller",
                                        `Updating offset: ${n}`
                                    ),
                                    this.localStore.indexManager.updateCollectionGroup(
                                        t,
                                        e,
                                        n
                                    )
                                )
                            )
                            .next(() => r.size);
                    })
            );
    }
    ot(t, e) {
        let n = t;
        return (
            e.changes.forEach((t, e) => {
                const s = Ir(e);
                Er(s, n) > 0 && (n = s);
            }),
            new br(
                n.readTime,
                n.documentKey,
                Math.max(e.batchId, t.largestBatchId)
            )
        );
    }
}
class Pr {
    constructor(t, e) {
        (this.previousValue = t),
            e &&
                ((e.sequenceNumberHandler = (t) => this.ut(t)),
                (this.ct = (t) => e.writeSequenceNumber(t)));
    }
    ut(t) {
        return (
            (this.previousValue = Math.max(t, this.previousValue)),
            this.previousValue
        );
    }
    next() {
        const t = ++this.previousValue;
        return this.ct && this.ct(t), t;
    }
}
Pr.at = -1;
class qr {
    constructor(t, e, n, s, r, i, o, a) {
        (this.databaseId = t),
            (this.appId = e),
            (this.persistenceKey = n),
            (this.host = s),
            (this.ssl = r),
            (this.forceLongPolling = i),
            (this.autoDetectLongPolling = o),
            (this.useFetchStreams = a);
    }
}
class Br {
    constructor(t, e) {
        (this.projectId = t), (this.database = e || "(default)");
    }
    static empty() {
        return new Br("", "");
    }
    get isDefaultDatabase() {
        return "(default)" === this.database;
    }
    isEqual(t) {
        return (
            t instanceof Br &&
            t.projectId === this.projectId &&
            t.database === this.database
        );
    }
}
function Ur(t) {
    let e = 0;
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}
function Gr(t, e) {
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}
function Kr(t) {
    for (const e in t)
        if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}
function jr(t) {
    return null == t;
}
function $r(t) {
    return 0 === t && 1 / t == -1 / 0;
}
function Qr(t) {
    return (
        "number" == typeof t &&
        Number.isInteger(t) &&
        !$r(t) &&
        t <= Number.MAX_SAFE_INTEGER &&
        t >= Number.MIN_SAFE_INTEGER
    );
}
function zr() {
    return "undefined" != typeof atob;
}
class Hr {
    constructor(t) {
        this.binaryString = t;
    }
    static fromBase64String(t) {
        const e = atob(t);
        return new Hr(e);
    }
    static fromUint8Array(t) {
        const e = (function (t) {
            let e = "";
            for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        })(t);
        return new Hr(e);
    }
    [Symbol.iterator]() {
        let t = 0;
        return {
            next: () =>
                t < this.binaryString.length
                    ? { value: this.binaryString.charCodeAt(t++), done: !1 }
                    : { value: void 0, done: !0 },
        };
    }
    toBase64() {
        return (t = this.binaryString), btoa(t);
        var t;
    }
    toUint8Array() {
        return (function (t) {
            const e = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        })(this.binaryString);
    }
    approximateByteSize() {
        return 2 * this.binaryString.length;
    }
    compareTo(t) {
        return nr(this.binaryString, t.binaryString);
    }
    isEqual(t) {
        return this.binaryString === t.binaryString;
    }
}
Hr.EMPTY_BYTE_STRING = new Hr("");
const Wr = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Yr(t) {
    if ((qs(!!t), "string" == typeof t)) {
        let e = 0;
        const n = Wr.exec(t);
        if ((qs(!!n), n[1])) {
            let t = n[1];
            (t = (t + "000000000").substr(0, 9)), (e = Number(t));
        }
        const s = new Date(t);
        return { seconds: Math.floor(s.getTime() / 1e3), nanos: e };
    }
    return { seconds: Xr(t.seconds), nanos: Xr(t.nanos) };
}
function Xr(t) {
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}
function Jr(t) {
    return "string" == typeof t ? Hr.fromBase64String(t) : Hr.fromUint8Array(t);
}
function Zr(t) {
    var e, n;
    return (
        "server_timestamp" ===
        (null ===
            (n = (
                (null === (e = null == t ? void 0 : t.mapValue) || void 0 === e
                    ? void 0
                    : e.fields) || {}
            ).__type__) || void 0 === n
            ? void 0
            : n.stringValue)
    );
}
function ti(t) {
    const e = t.mapValue.fields.__previous_value__;
    return Zr(e) ? ti(e) : e;
}
function ei(t) {
    const e = Yr(t.mapValue.fields.__local_write_time__.timestampValue);
    return new ir(e.seconds, e.nanos);
}
const ni = { mapValue: { fields: { __type__: { stringValue: "__max__" } } } },
    si = { nullValue: "NULL_VALUE" };
function ri(t) {
    return "nullValue" in t
        ? 0
        : "booleanValue" in t
        ? 1
        : "integerValue" in t || "doubleValue" in t
        ? 2
        : "timestampValue" in t
        ? 3
        : "stringValue" in t
        ? 5
        : "bytesValue" in t
        ? 6
        : "referenceValue" in t
        ? 7
        : "geoPointValue" in t
        ? 8
        : "arrayValue" in t
        ? 9
        : "mapValue" in t
        ? Zr(t)
            ? 4
            : wi(t)
            ? 9007199254740991
            : 10
        : Ps();
}
function ii(t, e) {
    if (t === e) return !0;
    const n = ri(t);
    if (n !== ri(e)) return !1;
    switch (n) {
        case 0:
        case 9007199254740991:
            return !0;
        case 1:
            return t.booleanValue === e.booleanValue;
        case 4:
            return ei(t).isEqual(ei(e));
        case 3:
            return (function (t, e) {
                if (
                    "string" == typeof t.timestampValue &&
                    "string" == typeof e.timestampValue &&
                    t.timestampValue.length === e.timestampValue.length
                )
                    return t.timestampValue === e.timestampValue;
                const n = Yr(t.timestampValue),
                    s = Yr(e.timestampValue);
                return n.seconds === s.seconds && n.nanos === s.nanos;
            })(t, e);
        case 5:
            return t.stringValue === e.stringValue;
        case 6:
            return (function (t, e) {
                return Jr(t.bytesValue).isEqual(Jr(e.bytesValue));
            })(t, e);
        case 7:
            return t.referenceValue === e.referenceValue;
        case 8:
            return (function (t, e) {
                return (
                    Xr(t.geoPointValue.latitude) ===
                        Xr(e.geoPointValue.latitude) &&
                    Xr(t.geoPointValue.longitude) ===
                        Xr(e.geoPointValue.longitude)
                );
            })(t, e);
        case 2:
            return (function (t, e) {
                if ("integerValue" in t && "integerValue" in e)
                    return Xr(t.integerValue) === Xr(e.integerValue);
                if ("doubleValue" in t && "doubleValue" in e) {
                    const n = Xr(t.doubleValue),
                        s = Xr(e.doubleValue);
                    return n === s ? $r(n) === $r(s) : isNaN(n) && isNaN(s);
                }
                return !1;
            })(t, e);
        case 9:
            return sr(t.arrayValue.values || [], e.arrayValue.values || [], ii);
        case 10:
            return (function (t, e) {
                const n = t.mapValue.fields || {},
                    s = e.mapValue.fields || {};
                if (Ur(n) !== Ur(s)) return !1;
                for (const t in n)
                    if (
                        n.hasOwnProperty(t) &&
                        (void 0 === s[t] || !ii(n[t], s[t]))
                    )
                        return !1;
                return !0;
            })(t, e);
        default:
            return Ps();
    }
}
function oi(t, e) {
    return void 0 !== (t.values || []).find((t) => ii(t, e));
}
function ai(t, e) {
    if (t === e) return 0;
    const n = ri(t),
        s = ri(e);
    if (n !== s) return nr(n, s);
    switch (n) {
        case 0:
        case 9007199254740991:
            return 0;
        case 1:
            return nr(t.booleanValue, e.booleanValue);
        case 2:
            return (function (t, e) {
                const n = Xr(t.integerValue || t.doubleValue),
                    s = Xr(e.integerValue || e.doubleValue);
                return n < s
                    ? -1
                    : n > s
                    ? 1
                    : n === s
                    ? 0
                    : isNaN(n)
                    ? isNaN(s)
                        ? 0
                        : -1
                    : 1;
            })(t, e);
        case 3:
            return ui(t.timestampValue, e.timestampValue);
        case 4:
            return ui(ei(t), ei(e));
        case 5:
            return nr(t.stringValue, e.stringValue);
        case 6:
            return (function (t, e) {
                const n = Jr(t),
                    s = Jr(e);
                return n.compareTo(s);
            })(t.bytesValue, e.bytesValue);
        case 7:
            return (function (t, e) {
                const n = t.split("/"),
                    s = e.split("/");
                for (let t = 0; t < n.length && t < s.length; t++) {
                    const e = nr(n[t], s[t]);
                    if (0 !== e) return e;
                }
                return nr(n.length, s.length);
            })(t.referenceValue, e.referenceValue);
        case 8:
            return (function (t, e) {
                const n = nr(Xr(t.latitude), Xr(e.latitude));
                return 0 !== n ? n : nr(Xr(t.longitude), Xr(e.longitude));
            })(t.geoPointValue, e.geoPointValue);
        case 9:
            return (function (t, e) {
                const n = t.values || [],
                    s = e.values || [];
                for (let t = 0; t < n.length && t < s.length; ++t) {
                    const e = ai(n[t], s[t]);
                    if (e) return e;
                }
                return nr(n.length, s.length);
            })(t.arrayValue, e.arrayValue);
        case 10:
            return (function (t, e) {
                if (t === ni.mapValue && e === ni.mapValue) return 0;
                if (t === ni.mapValue) return 1;
                if (e === ni.mapValue) return -1;
                const n = t.fields || {},
                    s = Object.keys(n),
                    r = e.fields || {},
                    i = Object.keys(r);
                s.sort(), i.sort();
                for (let t = 0; t < s.length && t < i.length; ++t) {
                    const e = nr(s[t], i[t]);
                    if (0 !== e) return e;
                    const o = ai(n[s[t]], r[i[t]]);
                    if (0 !== o) return o;
                }
                return nr(s.length, i.length);
            })(t.mapValue, e.mapValue);
        default:
            throw Ps();
    }
}
function ui(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length)
        return nr(t, e);
    const n = Yr(t),
        s = Yr(e),
        r = nr(n.seconds, s.seconds);
    return 0 !== r ? r : nr(n.nanos, s.nanos);
}
function ci(t) {
    return hi(t);
}
function hi(t) {
    return "nullValue" in t
        ? "null"
        : "booleanValue" in t
        ? "" + t.booleanValue
        : "integerValue" in t
        ? "" + t.integerValue
        : "doubleValue" in t
        ? "" + t.doubleValue
        : "timestampValue" in t
        ? (function (t) {
              const e = Yr(t);
              return `time(${e.seconds},${e.nanos})`;
          })(t.timestampValue)
        : "stringValue" in t
        ? t.stringValue
        : "bytesValue" in t
        ? Jr(t.bytesValue).toBase64()
        : "referenceValue" in t
        ? ((n = t.referenceValue), lr.fromName(n).toString())
        : "geoPointValue" in t
        ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})`
        : "arrayValue" in t
        ? (function (t) {
              let e = "[",
                  n = !0;
              for (const s of t.values || [])
                  n ? (n = !1) : (e += ","), (e += hi(s));
              return e + "]";
          })(t.arrayValue)
        : "mapValue" in t
        ? (function (t) {
              const e = Object.keys(t.fields || {}).sort();
              let n = "{",
                  s = !0;
              for (const r of e)
                  s ? (s = !1) : (n += ","), (n += `${r}:${hi(t.fields[r])}`);
              return n + "}";
          })(t.mapValue)
        : Ps();
    var e, n;
}
function li(t, e) {
    return {
        referenceValue: `projects/${t.projectId}/databases/${
            t.database
        }/documents/${e.path.canonicalString()}`,
    };
}
function di(t) {
    return !!t && "integerValue" in t;
}
function fi(t) {
    return !!t && "arrayValue" in t;
}
function mi(t) {
    return !!t && "nullValue" in t;
}
function gi(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}
function pi(t) {
    return !!t && "mapValue" in t;
}
function yi(t) {
    if (t.geoPointValue)
        return { geoPointValue: Object.assign({}, t.geoPointValue) };
    if (t.timestampValue && "object" == typeof t.timestampValue)
        return { timestampValue: Object.assign({}, t.timestampValue) };
    if (t.mapValue) {
        const e = { mapValue: { fields: {} } };
        return (
            Gr(t.mapValue.fields, (t, n) => (e.mapValue.fields[t] = yi(n))), e
        );
    }
    if (t.arrayValue) {
        const e = { arrayValue: { values: [] } };
        for (let n = 0; n < (t.arrayValue.values || []).length; ++n)
            e.arrayValue.values[n] = yi(t.arrayValue.values[n]);
        return e;
    }
    return Object.assign({}, t);
}
function wi(t) {
    return (
        "__max__" ===
        (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue
    );
}
function vi(t) {
    return "nullValue" in t
        ? si
        : "booleanValue" in t
        ? { booleanValue: !1 }
        : "integerValue" in t || "doubleValue" in t
        ? { doubleValue: NaN }
        : "timestampValue" in t
        ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
        : "stringValue" in t
        ? { stringValue: "" }
        : "bytesValue" in t
        ? { bytesValue: "" }
        : "referenceValue" in t
        ? li(Br.empty(), lr.empty())
        : "geoPointValue" in t
        ? { geoPointValue: { latitude: -90, longitude: -180 } }
        : "arrayValue" in t
        ? { arrayValue: {} }
        : "mapValue" in t
        ? { mapValue: {} }
        : Ps();
}
function Ii(t) {
    return "nullValue" in t
        ? { booleanValue: !1 }
        : "booleanValue" in t
        ? { doubleValue: NaN }
        : "integerValue" in t || "doubleValue" in t
        ? { timestampValue: { seconds: Number.MIN_SAFE_INTEGER } }
        : "timestampValue" in t
        ? { stringValue: "" }
        : "stringValue" in t
        ? { bytesValue: "" }
        : "bytesValue" in t
        ? li(Br.empty(), lr.empty())
        : "referenceValue" in t
        ? { geoPointValue: { latitude: -90, longitude: -180 } }
        : "geoPointValue" in t
        ? { arrayValue: {} }
        : "arrayValue" in t
        ? { mapValue: {} }
        : "mapValue" in t
        ? ni
        : Ps();
}
function bi(t, e) {
    const n = ai(t.value, e.value);
    return 0 !== n
        ? n
        : t.inclusive && !e.inclusive
        ? -1
        : !t.inclusive && e.inclusive
        ? 1
        : 0;
}
function Ei(t, e) {
    const n = ai(t.value, e.value);
    return 0 !== n
        ? n
        : t.inclusive && !e.inclusive
        ? 1
        : !t.inclusive && e.inclusive
        ? -1
        : 0;
}
class Ti {
    constructor(t, e) {
        (this.position = t), (this.inclusive = e);
    }
}
function Si(t, e, n) {
    let s = 0;
    for (let r = 0; r < t.position.length; r++) {
        const i = e[r],
            o = t.position[r];
        if (
            ((s = i.field.isKeyField()
                ? lr.comparator(lr.fromName(o.referenceValue), n.key)
                : ai(o, n.data.field(i.field))),
            "desc" === i.dir && (s *= -1),
            0 !== s)
        )
            break;
    }
    return s;
}
function _i(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length)
        return !1;
    for (let n = 0; n < t.position.length; n++)
        if (!ii(t.position[n], e.position[n])) return !1;
    return !0;
}
class xi {}
class Di extends xi {
    constructor(t, e, n) {
        super(), (this.field = t), (this.op = e), (this.value = n);
    }
    static create(t, e, n) {
        return t.isKeyField()
            ? "in" === e || "not-in" === e
                ? this.createKeyFieldInFilter(t, e, n)
                : new Vi(t, e, n)
            : "array-contains" === e
            ? new Ui(t, n)
            : "in" === e
            ? new Gi(t, n)
            : "not-in" === e
            ? new Ki(t, n)
            : "array-contains-any" === e
            ? new ji(t, n)
            : new Di(t, e, n);
    }
    static createKeyFieldInFilter(t, e, n) {
        return "in" === e ? new Pi(t, n) : new qi(t, n);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return "!=" === this.op
            ? null !== e && this.matchesComparison(ai(e, this.value))
            : null !== e &&
                  ri(this.value) === ri(e) &&
                  this.matchesComparison(ai(e, this.value));
    }
    matchesComparison(t) {
        switch (this.op) {
            case "<":
                return t < 0;
            case "<=":
                return t <= 0;
            case "==":
                return 0 === t;
            case "!=":
                return 0 !== t;
            case ">":
                return t > 0;
            case ">=":
                return t >= 0;
            default:
                return Ps();
        }
    }
    isInequality() {
        return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
    }
    getFlattenedFilters() {
        return [this];
    }
    getFilters() {
        return [this];
    }
    getFirstInequalityField() {
        return this.isInequality() ? this.field : null;
    }
}
class Ai extends xi {
    constructor(t, e) {
        super(), (this.filters = t), (this.op = e), (this.ht = null);
    }
    static create(t, e) {
        return new Ai(t, e);
    }
    matches(t) {
        return Ci(this)
            ? void 0 === this.filters.find((e) => !e.matches(t))
            : void 0 !== this.filters.find((e) => e.matches(t));
    }
    getFlattenedFilters() {
        return (
            null !== this.ht ||
                (this.ht = this.filters.reduce(
                    (t, e) => t.concat(e.getFlattenedFilters()),
                    []
                )),
            this.ht
        );
    }
    getFilters() {
        return Object.assign([], this.filters);
    }
    getFirstInequalityField() {
        const t = this.lt((t) => t.isInequality());
        return null !== t ? t.field : null;
    }
    lt(t) {
        for (const e of this.getFlattenedFilters()) if (t(e)) return e;
        return null;
    }
}
function Ci(t) {
    return "and" === t.op;
}
function Ni(t) {
    return "or" === t.op;
}
function ki(t) {
    return Ri(t) && Ci(t);
}
function Ri(t) {
    for (const e of t.filters) if (e instanceof Ai) return !1;
    return !0;
}
function Li(t) {
    if (t instanceof Di)
        return t.field.canonicalString() + t.op.toString() + ci(t.value);
    if (ki(t)) return t.filters.map((t) => Li(t)).join(",");
    {
        const e = t.filters.map((t) => Li(t)).join(",");
        return `${t.op}(${e})`;
    }
}
function Mi(t, e) {
    return t instanceof Di
        ? (function (t, e) {
              return (
                  e instanceof Di &&
                  t.op === e.op &&
                  t.field.isEqual(e.field) &&
                  ii(t.value, e.value)
              );
          })(t, e)
        : t instanceof Ai
        ? (function (t, e) {
              return (
                  e instanceof Ai &&
                  t.op === e.op &&
                  t.filters.length === e.filters.length &&
                  t.filters.reduce((t, n, s) => t && Mi(n, e.filters[s]), !0)
              );
          })(t, e)
        : void Ps();
}
function Fi(t, e) {
    const n = t.filters.concat(e);
    return Ai.create(n, t.op);
}
function Oi(t) {
    return t instanceof Di
        ? (function (t) {
              return `${t.field.canonicalString()} ${t.op} ${ci(t.value)}`;
          })(t)
        : t instanceof Ai
        ? (function (t) {
              return (
                  t.op.toString() +
                  " {" +
                  t.getFilters().map(Oi).join(" ,") +
                  "}"
              );
          })(t)
        : "Filter";
}
class Vi extends Di {
    constructor(t, e, n) {
        super(t, e, n), (this.key = lr.fromName(n.referenceValue));
    }
    matches(t) {
        const e = lr.comparator(t.key, this.key);
        return this.matchesComparison(e);
    }
}
class Pi extends Di {
    constructor(t, e) {
        super(t, "in", e), (this.keys = Bi("in", e));
    }
    matches(t) {
        return this.keys.some((e) => e.isEqual(t.key));
    }
}
class qi extends Di {
    constructor(t, e) {
        super(t, "not-in", e), (this.keys = Bi("not-in", e));
    }
    matches(t) {
        return !this.keys.some((e) => e.isEqual(t.key));
    }
}
function Bi(t, e) {
    var n;
    return (
        (null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []
    ).map((t) => lr.fromName(t.referenceValue));
}
class Ui extends Di {
    constructor(t, e) {
        super(t, "array-contains", e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return fi(e) && oi(e.arrayValue, this.value);
    }
}
class Gi extends Di {
    constructor(t, e) {
        super(t, "in", e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return null !== e && oi(this.value.arrayValue, e);
    }
}
class Ki extends Di {
    constructor(t, e) {
        super(t, "not-in", e);
    }
    matches(t) {
        if (oi(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
        const e = t.data.field(this.field);
        return null !== e && !oi(this.value.arrayValue, e);
    }
}
class ji extends Di {
    constructor(t, e) {
        super(t, "array-contains-any", e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return (
            !(!fi(e) || !e.arrayValue.values) &&
            e.arrayValue.values.some((t) => oi(this.value.arrayValue, t))
        );
    }
}
class $i {
    constructor(t, e = "asc") {
        (this.field = t), (this.dir = e);
    }
}
function Qi(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}
class zi {
    constructor(t, e) {
        (this.comparator = t), (this.root = e || Wi.EMPTY);
    }
    insert(t, e) {
        return new zi(
            this.comparator,
            this.root
                .insert(t, e, this.comparator)
                .copy(null, null, Wi.BLACK, null, null)
        );
    }
    remove(t) {
        return new zi(
            this.comparator,
            this.root
                .remove(t, this.comparator)
                .copy(null, null, Wi.BLACK, null, null)
        );
    }
    get(t) {
        let e = this.root;
        for (; !e.isEmpty(); ) {
            const n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? (e = e.left) : n > 0 && (e = e.right);
        }
        return null;
    }
    indexOf(t) {
        let e = 0,
            n = this.root;
        for (; !n.isEmpty(); ) {
            const s = this.comparator(t, n.key);
            if (0 === s) return e + n.left.size;
            s < 0 ? (n = n.left) : ((e += n.left.size + 1), (n = n.right));
        }
        return -1;
    }
    isEmpty() {
        return this.root.isEmpty();
    }
    get size() {
        return this.root.size;
    }
    minKey() {
        return this.root.minKey();
    }
    maxKey() {
        return this.root.maxKey();
    }
    inorderTraversal(t) {
        return this.root.inorderTraversal(t);
    }
    forEach(t) {
        this.inorderTraversal((e, n) => (t(e, n), !1));
    }
    toString() {
        const t = [];
        return (
            this.inorderTraversal((e, n) => (t.push(`${e}:${n}`), !1)),
            `{${t.join(", ")}}`
        );
    }
    reverseTraversal(t) {
        return this.root.reverseTraversal(t);
    }
    getIterator() {
        return new Hi(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(t) {
        return new Hi(this.root, t, this.comparator, !1);
    }
    getReverseIterator() {
        return new Hi(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(t) {
        return new Hi(this.root, t, this.comparator, !0);
    }
}
class Hi {
    constructor(t, e, n, s) {
        (this.isReverse = s), (this.nodeStack = []);
        let r = 1;
        for (; !t.isEmpty(); )
            if (((r = e ? n(t.key, e) : 1), e && s && (r *= -1), r < 0))
                t = this.isReverse ? t.left : t.right;
            else {
                if (0 === r) {
                    this.nodeStack.push(t);
                    break;
                }
                this.nodeStack.push(t), (t = this.isReverse ? t.right : t.left);
            }
    }
    getNext() {
        let t = this.nodeStack.pop();
        const e = { key: t.key, value: t.value };
        if (this.isReverse)
            for (t = t.left; !t.isEmpty(); )
                this.nodeStack.push(t), (t = t.right);
        else
            for (t = t.right; !t.isEmpty(); )
                this.nodeStack.push(t), (t = t.left);
        return e;
    }
    hasNext() {
        return this.nodeStack.length > 0;
    }
    peek() {
        if (0 === this.nodeStack.length) return null;
        const t = this.nodeStack[this.nodeStack.length - 1];
        return { key: t.key, value: t.value };
    }
}
class Wi {
    constructor(t, e, n, s, r) {
        (this.key = t),
            (this.value = e),
            (this.color = null != n ? n : Wi.RED),
            (this.left = null != s ? s : Wi.EMPTY),
            (this.right = null != r ? r : Wi.EMPTY),
            (this.size = this.left.size + 1 + this.right.size);
    }
    copy(t, e, n, s, r) {
        return new Wi(
            null != t ? t : this.key,
            null != e ? e : this.value,
            null != n ? n : this.color,
            null != s ? s : this.left,
            null != r ? r : this.right
        );
    }
    isEmpty() {
        return !1;
    }
    inorderTraversal(t) {
        return (
            this.left.inorderTraversal(t) ||
            t(this.key, this.value) ||
            this.right.inorderTraversal(t)
        );
    }
    reverseTraversal(t) {
        return (
            this.right.reverseTraversal(t) ||
            t(this.key, this.value) ||
            this.left.reverseTraversal(t)
        );
    }
    min() {
        return this.left.isEmpty() ? this : this.left.min();
    }
    minKey() {
        return this.min().key;
    }
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    insert(t, e, n) {
        let s = this;
        const r = n(t, s.key);
        return (
            (s =
                r < 0
                    ? s.copy(null, null, null, s.left.insert(t, e, n), null)
                    : 0 === r
                    ? s.copy(null, e, null, null, null)
                    : s.copy(null, null, null, null, s.right.insert(t, e, n))),
            s.fixUp()
        );
    }
    removeMin() {
        if (this.left.isEmpty()) return Wi.EMPTY;
        let t = this;
        return (
            t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()),
            (t = t.copy(null, null, null, t.left.removeMin(), null)),
            t.fixUp()
        );
    }
    remove(t, e) {
        let n,
            s = this;
        if (e(t, s.key) < 0)
            s.left.isEmpty() ||
                s.left.isRed() ||
                s.left.left.isRed() ||
                (s = s.moveRedLeft()),
                (s = s.copy(null, null, null, s.left.remove(t, e), null));
        else {
            if (
                (s.left.isRed() && (s = s.rotateRight()),
                s.right.isEmpty() ||
                    s.right.isRed() ||
                    s.right.left.isRed() ||
                    (s = s.moveRedRight()),
                0 === e(t, s.key))
            ) {
                if (s.right.isEmpty()) return Wi.EMPTY;
                (n = s.right.min()),
                    (s = s.copy(
                        n.key,
                        n.value,
                        null,
                        null,
                        s.right.removeMin()
                    ));
            }
            s = s.copy(null, null, null, null, s.right.remove(t, e));
        }
        return s.fixUp();
    }
    isRed() {
        return this.color;
    }
    fixUp() {
        let t = this;
        return (
            t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()),
            t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()),
            t.left.isRed() && t.right.isRed() && (t = t.colorFlip()),
            t
        );
    }
    moveRedLeft() {
        let t = this.colorFlip();
        return (
            t.right.left.isRed() &&
                ((t = t.copy(null, null, null, null, t.right.rotateRight())),
                (t = t.rotateLeft()),
                (t = t.colorFlip())),
            t
        );
    }
    moveRedRight() {
        let t = this.colorFlip();
        return (
            t.left.left.isRed() && ((t = t.rotateRight()), (t = t.colorFlip())),
            t
        );
    }
    rotateLeft() {
        const t = this.copy(null, null, Wi.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null);
    }
    rotateRight() {
        const t = this.copy(null, null, Wi.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t);
    }
    colorFlip() {
        const t = this.left.copy(null, null, !this.left.color, null, null),
            e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }
    checkMaxDepth() {
        const t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }
    check() {
        if (this.isRed() && this.left.isRed()) throw Ps();
        if (this.right.isRed()) throw Ps();
        const t = this.left.check();
        if (t !== this.right.check()) throw Ps();
        return t + (this.isRed() ? 0 : 1);
    }
}
(Wi.EMPTY = null),
    (Wi.RED = !0),
    (Wi.BLACK = !1),
    (Wi.EMPTY = new (class {
        constructor() {
            this.size = 0;
        }
        get key() {
            throw Ps();
        }
        get value() {
            throw Ps();
        }
        get color() {
            throw Ps();
        }
        get left() {
            throw Ps();
        }
        get right() {
            throw Ps();
        }
        copy(t, e, n, s, r) {
            return this;
        }
        insert(t, e, n) {
            return new Wi(t, e);
        }
        remove(t, e) {
            return this;
        }
        isEmpty() {
            return !0;
        }
        inorderTraversal(t) {
            return !1;
        }
        reverseTraversal(t) {
            return !1;
        }
        minKey() {
            return null;
        }
        maxKey() {
            return null;
        }
        isRed() {
            return !1;
        }
        checkMaxDepth() {
            return !0;
        }
        check() {
            return 0;
        }
    })());
class Yi {
    constructor(t) {
        (this.comparator = t), (this.data = new zi(this.comparator));
    }
    has(t) {
        return null !== this.data.get(t);
    }
    first() {
        return this.data.minKey();
    }
    last() {
        return this.data.maxKey();
    }
    get size() {
        return this.data.size;
    }
    indexOf(t) {
        return this.data.indexOf(t);
    }
    forEach(t) {
        this.data.inorderTraversal((e, n) => (t(e), !1));
    }
    forEachInRange(t, e) {
        const n = this.data.getIteratorFrom(t[0]);
        for (; n.hasNext(); ) {
            const s = n.getNext();
            if (this.comparator(s.key, t[1]) >= 0) return;
            e(s.key);
        }
    }
    forEachWhile(t, e) {
        let n;
        for (
            n =
                void 0 !== e
                    ? this.data.getIteratorFrom(e)
                    : this.data.getIterator();
            n.hasNext();

        )
            if (!t(n.getNext().key)) return;
    }
    firstAfterOrEqual(t) {
        const e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }
    getIterator() {
        return new Xi(this.data.getIterator());
    }
    getIteratorFrom(t) {
        return new Xi(this.data.getIteratorFrom(t));
    }
    add(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }
    delete(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }
    isEmpty() {
        return this.data.isEmpty();
    }
    unionWith(t) {
        let e = this;
        return (
            e.size < t.size && ((e = t), (t = this)),
            t.forEach((t) => {
                e = e.add(t);
            }),
            e
        );
    }
    isEqual(t) {
        if (!(t instanceof Yi)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.data.getIterator(),
            n = t.data.getIterator();
        for (; e.hasNext(); ) {
            const t = e.getNext().key,
                s = n.getNext().key;
            if (0 !== this.comparator(t, s)) return !1;
        }
        return !0;
    }
    toArray() {
        const t = [];
        return (
            this.forEach((e) => {
                t.push(e);
            }),
            t
        );
    }
    toString() {
        const t = [];
        return (
            this.forEach((e) => t.push(e)), "SortedSet(" + t.toString() + ")"
        );
    }
    copy(t) {
        const e = new Yi(this.comparator);
        return (e.data = t), e;
    }
}
class Xi {
    constructor(t) {
        this.iter = t;
    }
    getNext() {
        return this.iter.getNext().key;
    }
    hasNext() {
        return this.iter.hasNext();
    }
}
function Ji(t) {
    return t.hasNext() ? t.getNext() : void 0;
}
class Zi {
    constructor(t) {
        (this.fields = t), t.sort(hr.comparator);
    }
    static empty() {
        return new Zi([]);
    }
    unionWith(t) {
        let e = new Yi(hr.comparator);
        for (const t of this.fields) e = e.add(t);
        for (const n of t) e = e.add(n);
        return new Zi(e.toArray());
    }
    covers(t) {
        for (const e of this.fields) if (e.isPrefixOf(t)) return !0;
        return !1;
    }
    isEqual(t) {
        return sr(this.fields, t.fields, (t, e) => t.isEqual(e));
    }
}
class to {
    constructor(t) {
        this.value = t;
    }
    static empty() {
        return new to({ mapValue: {} });
    }
    field(t) {
        if (t.isEmpty()) return this.value;
        {
            let e = this.value;
            for (let n = 0; n < t.length - 1; ++n)
                if (((e = (e.mapValue.fields || {})[t.get(n)]), !pi(e)))
                    return null;
            return (e = (e.mapValue.fields || {})[t.lastSegment()]), e || null;
        }
    }
    set(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = yi(e);
    }
    setAll(t) {
        let e = hr.emptyPath(),
            n = {},
            s = [];
        t.forEach((t, r) => {
            if (!e.isImmediateParentOf(r)) {
                const t = this.getFieldsMap(e);
                this.applyChanges(t, n, s),
                    (n = {}),
                    (s = []),
                    (e = r.popLast());
            }
            t ? (n[r.lastSegment()] = yi(t)) : s.push(r.lastSegment());
        });
        const r = this.getFieldsMap(e);
        this.applyChanges(r, n, s);
    }
    delete(t) {
        const e = this.field(t.popLast());
        pi(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }
    isEqual(t) {
        return ii(this.value, t.value);
    }
    getFieldsMap(t) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = { fields: {} });
        for (let n = 0; n < t.length; ++n) {
            let s = e.mapValue.fields[t.get(n)];
            (pi(s) && s.mapValue.fields) ||
                ((s = { mapValue: { fields: {} } }),
                (e.mapValue.fields[t.get(n)] = s)),
                (e = s);
        }
        return e.mapValue.fields;
    }
    applyChanges(t, e, n) {
        Gr(e, (e, n) => (t[e] = n));
        for (const e of n) delete t[e];
    }
    clone() {
        return new to(yi(this.value));
    }
}
function eo(t) {
    const e = [];
    return (
        Gr(t.fields, (t, n) => {
            const s = new hr([t]);
            if (pi(n)) {
                const t = eo(n.mapValue).fields;
                if (0 === t.length) e.push(s);
                else for (const n of t) e.push(s.child(n));
            } else e.push(s);
        }),
        new Zi(e)
    );
}
class no {
    constructor(t, e, n, s, r, i, o) {
        (this.key = t),
            (this.documentType = e),
            (this.version = n),
            (this.readTime = s),
            (this.createTime = r),
            (this.data = i),
            (this.documentState = o);
    }
    static newInvalidDocument(t) {
        return new no(t, 0, or.min(), or.min(), or.min(), to.empty(), 0);
    }
    static newFoundDocument(t, e, n, s) {
        return new no(t, 1, e, or.min(), n, s, 0);
    }
    static newNoDocument(t, e) {
        return new no(t, 2, e, or.min(), or.min(), to.empty(), 0);
    }
    static newUnknownDocument(t, e) {
        return new no(t, 3, e, or.min(), or.min(), to.empty(), 2);
    }
    convertToFoundDocument(t, e) {
        return (
            !this.createTime.isEqual(or.min()) ||
                (2 !== this.documentType && 0 !== this.documentType) ||
                (this.createTime = t),
            (this.version = t),
            (this.documentType = 1),
            (this.data = e),
            (this.documentState = 0),
            this
        );
    }
    convertToNoDocument(t) {
        return (
            (this.version = t),
            (this.documentType = 2),
            (this.data = to.empty()),
            (this.documentState = 0),
            this
        );
    }
    convertToUnknownDocument(t) {
        return (
            (this.version = t),
            (this.documentType = 3),
            (this.data = to.empty()),
            (this.documentState = 2),
            this
        );
    }
    setHasCommittedMutations() {
        return (this.documentState = 2), this;
    }
    setHasLocalMutations() {
        return (this.documentState = 1), (this.version = or.min()), this;
    }
    setReadTime(t) {
        return (this.readTime = t), this;
    }
    get hasLocalMutations() {
        return 1 === this.documentState;
    }
    get hasCommittedMutations() {
        return 2 === this.documentState;
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
        return 0 !== this.documentType;
    }
    isFoundDocument() {
        return 1 === this.documentType;
    }
    isNoDocument() {
        return 2 === this.documentType;
    }
    isUnknownDocument() {
        return 3 === this.documentType;
    }
    isEqual(t) {
        return (
            t instanceof no &&
            this.key.isEqual(t.key) &&
            this.version.isEqual(t.version) &&
            this.documentType === t.documentType &&
            this.documentState === t.documentState &&
            this.data.isEqual(t.data)
        );
    }
    mutableCopy() {
        return new no(
            this.key,
            this.documentType,
            this.version,
            this.readTime,
            this.createTime,
            this.data.clone(),
            this.documentState
        );
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(
            this.data.value
        )}, {createTime: ${this.createTime}}), {documentType: ${
            this.documentType
        }}), {documentState: ${this.documentState}})`;
    }
}
class so {
    constructor(t, e = null, n = [], s = [], r = null, i = null, o = null) {
        (this.path = t),
            (this.collectionGroup = e),
            (this.orderBy = n),
            (this.filters = s),
            (this.limit = r),
            (this.startAt = i),
            (this.endAt = o),
            (this.ft = null);
    }
}
function ro(t, e = null, n = [], s = [], r = null, i = null, o = null) {
    return new so(t, e, n, s, r, i, o);
}
function io(t) {
    const e = Us(t);
    if (null === e.ft) {
        let t = e.path.canonicalString();
        null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup),
            (t += "|f:"),
            (t += e.filters.map((t) => Li(t)).join(",")),
            (t += "|ob:"),
            (t += e.orderBy
                .map((t) =>
                    (function (t) {
                        return t.field.canonicalString() + t.dir;
                    })(t)
                )
                .join(",")),
            jr(e.limit) || ((t += "|l:"), (t += e.limit)),
            e.startAt &&
                ((t += "|lb:"),
                (t += e.startAt.inclusive ? "b:" : "a:"),
                (t += e.startAt.position.map((t) => ci(t)).join(","))),
            e.endAt &&
                ((t += "|ub:"),
                (t += e.endAt.inclusive ? "a:" : "b:"),
                (t += e.endAt.position.map((t) => ci(t)).join(","))),
            (e.ft = t);
    }
    return e.ft;
}
function oo(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (let n = 0; n < t.orderBy.length; n++)
        if (!Qi(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (let n = 0; n < t.filters.length; n++)
        if (!Mi(t.filters[n], e.filters[n])) return !1;
    return (
        t.collectionGroup === e.collectionGroup &&
        !!t.path.isEqual(e.path) &&
        !!_i(t.startAt, e.startAt) &&
        _i(t.endAt, e.endAt)
    );
}
function ao(t) {
    return (
        lr.isDocumentKey(t.path) &&
        null === t.collectionGroup &&
        0 === t.filters.length
    );
}
function uo(t, e) {
    return t.filters.filter((t) => t instanceof Di && t.field.isEqual(e));
}
function co(t, e, n) {
    let s = si,
        r = !0;
    for (const n of uo(t, e)) {
        let t = si,
            e = !0;
        switch (n.op) {
            case "<":
            case "<=":
                t = vi(n.value);
                break;
            case "==":
            case "in":
            case ">=":
                t = n.value;
                break;
            case ">":
                (t = n.value), (e = !1);
                break;
            case "!=":
            case "not-in":
                t = si;
        }
        bi({ value: s, inclusive: r }, { value: t, inclusive: e }) < 0 &&
            ((s = t), (r = e));
    }
    if (null !== n)
        for (let i = 0; i < t.orderBy.length; ++i)
            if (t.orderBy[i].field.isEqual(e)) {
                const t = n.position[i];
                bi(
                    { value: s, inclusive: r },
                    { value: t, inclusive: n.inclusive }
                ) < 0 && ((s = t), (r = n.inclusive));
                break;
            }
    return { value: s, inclusive: r };
}
function ho(t, e, n) {
    let s = ni,
        r = !0;
    for (const n of uo(t, e)) {
        let t = ni,
            e = !0;
        switch (n.op) {
            case ">=":
            case ">":
                (t = Ii(n.value)), (e = !1);
                break;
            case "==":
            case "in":
            case "<=":
                t = n.value;
                break;
            case "<":
                (t = n.value), (e = !1);
                break;
            case "!=":
            case "not-in":
                t = ni;
        }
        Ei({ value: s, inclusive: r }, { value: t, inclusive: e }) > 0 &&
            ((s = t), (r = e));
    }
    if (null !== n)
        for (let i = 0; i < t.orderBy.length; ++i)
            if (t.orderBy[i].field.isEqual(e)) {
                const t = n.position[i];
                Ei(
                    { value: s, inclusive: r },
                    { value: t, inclusive: n.inclusive }
                ) > 0 && ((s = t), (r = n.inclusive));
                break;
            }
    return { value: s, inclusive: r };
}
class lo {
    constructor(
        t,
        e = null,
        n = [],
        s = [],
        r = null,
        i = "F",
        o = null,
        a = null
    ) {
        (this.path = t),
            (this.collectionGroup = e),
            (this.explicitOrderBy = n),
            (this.filters = s),
            (this.limit = r),
            (this.limitType = i),
            (this.startAt = o),
            (this.endAt = a),
            (this.dt = null),
            (this._t = null),
            this.startAt,
            this.endAt;
    }
}
function fo(t, e, n, s, r, i, o, a) {
    return new lo(t, e, n, s, r, i, o, a);
}
function mo(t) {
    return new lo(t);
}
function go(t) {
    return (
        0 === t.filters.length &&
        null === t.limit &&
        null == t.startAt &&
        null == t.endAt &&
        (0 === t.explicitOrderBy.length ||
            (1 === t.explicitOrderBy.length &&
                t.explicitOrderBy[0].field.isKeyField()))
    );
}
function po(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}
function yo(t) {
    for (const e of t.filters) {
        const t = e.getFirstInequalityField();
        if (null !== t) return t;
    }
    return null;
}
function wo(t) {
    return null !== t.collectionGroup;
}
function vo(t) {
    const e = Us(t);
    if (null === e.dt) {
        e.dt = [];
        const t = yo(e),
            n = po(e);
        if (null !== t && null === n)
            t.isKeyField() || e.dt.push(new $i(t)),
                e.dt.push(new $i(hr.keyField(), "asc"));
        else {
            let t = !1;
            for (const n of e.explicitOrderBy)
                e.dt.push(n), n.field.isKeyField() && (t = !0);
            if (!t) {
                const t =
                    e.explicitOrderBy.length > 0
                        ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir
                        : "asc";
                e.dt.push(new $i(hr.keyField(), t));
            }
        }
    }
    return e.dt;
}
function Io(t) {
    const e = Us(t);
    if (!e._t)
        if ("F" === e.limitType)
            e._t = ro(
                e.path,
                e.collectionGroup,
                vo(e),
                e.filters,
                e.limit,
                e.startAt,
                e.endAt
            );
        else {
            const t = [];
            for (const n of vo(e)) {
                const e = "desc" === n.dir ? "asc" : "desc";
                t.push(new $i(n.field, e));
            }
            const n = e.endAt
                    ? new Ti(e.endAt.position, e.endAt.inclusive)
                    : null,
                s = e.startAt
                    ? new Ti(e.startAt.position, e.startAt.inclusive)
                    : null;
            e._t = ro(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
        }
    return e._t;
}
function bo(t, e) {
    e.getFirstInequalityField(), yo(t);
    const n = t.filters.concat([e]);
    return new lo(
        t.path,
        t.collectionGroup,
        t.explicitOrderBy.slice(),
        n,
        t.limit,
        t.limitType,
        t.startAt,
        t.endAt
    );
}
function Eo(t, e, n) {
    return new lo(
        t.path,
        t.collectionGroup,
        t.explicitOrderBy.slice(),
        t.filters.slice(),
        e,
        n,
        t.startAt,
        t.endAt
    );
}
function To(t, e) {
    return oo(Io(t), Io(e)) && t.limitType === e.limitType;
}
function So(t) {
    return `${io(Io(t))}|lt:${t.limitType}`;
}
function _o(t) {
    return `Query(target=${(function (t) {
        let e = t.path.canonicalString();
        return (
            null !== t.collectionGroup &&
                (e += " collectionGroup=" + t.collectionGroup),
            t.filters.length > 0 &&
                (e += `, filters: [${t.filters.map((t) => Oi(t)).join(", ")}]`),
            jr(t.limit) || (e += ", limit: " + t.limit),
            t.orderBy.length > 0 &&
                (e += `, orderBy: [${t.orderBy
                    .map((t) =>
                        (function (t) {
                            return `${t.field.canonicalString()} (${t.dir})`;
                        })(t)
                    )
                    .join(", ")}]`),
            t.startAt &&
                ((e += ", startAt: "),
                (e += t.startAt.inclusive ? "b:" : "a:"),
                (e += t.startAt.position.map((t) => ci(t)).join(","))),
            t.endAt &&
                ((e += ", endAt: "),
                (e += t.endAt.inclusive ? "a:" : "b:"),
                (e += t.endAt.position.map((t) => ci(t)).join(","))),
            `Target(${e})`
        );
    })(Io(t))}; limitType=${t.limitType})`;
}
function xo(t, e) {
    return (
        e.isFoundDocument() &&
        (function (t, e) {
            const n = e.key.path;
            return null !== t.collectionGroup
                ? e.key.hasCollectionId(t.collectionGroup) &&
                      t.path.isPrefixOf(n)
                : lr.isDocumentKey(t.path)
                ? t.path.isEqual(n)
                : t.path.isImmediateParentOf(n);
        })(t, e) &&
        (function (t, e) {
            for (const n of vo(t))
                if (!n.field.isKeyField() && null === e.data.field(n.field))
                    return !1;
            return !0;
        })(t, e) &&
        (function (t, e) {
            for (const n of t.filters) if (!n.matches(e)) return !1;
            return !0;
        })(t, e) &&
        (function (t, e) {
            return (
                !(
                    t.startAt &&
                    !(function (t, e, n) {
                        const s = Si(t, e, n);
                        return t.inclusive ? s <= 0 : s < 0;
                    })(t.startAt, vo(t), e)
                ) &&
                !(
                    t.endAt &&
                    !(function (t, e, n) {
                        const s = Si(t, e, n);
                        return t.inclusive ? s >= 0 : s > 0;
                    })(t.endAt, vo(t), e)
                )
            );
        })(t, e)
    );
}
function Do(t) {
    return (
        t.collectionGroup ||
        (t.path.length % 2 == 1
            ? t.path.lastSegment()
            : t.path.get(t.path.length - 2))
    );
}
function Ao(t) {
    return (e, n) => {
        let s = !1;
        for (const r of vo(t)) {
            const t = Co(r, e, n);
            if (0 !== t) return t;
            s = s || r.field.isKeyField();
        }
        return 0;
    };
}
function Co(t, e, n) {
    const s = t.field.isKeyField()
        ? lr.comparator(e.key, n.key)
        : (function (t, e, n) {
              const s = e.data.field(t),
                  r = n.data.field(t);
              return null !== s && null !== r ? ai(s, r) : Ps();
          })(t.field, e, n);
    switch (t.dir) {
        case "asc":
            return s;
        case "desc":
            return -1 * s;
        default:
            return Ps();
    }
}
function No(t, e) {
    if (t.wt) {
        if (isNaN(e)) return { doubleValue: "NaN" };
        if (e === 1 / 0) return { doubleValue: "Infinity" };
        if (e === -1 / 0) return { doubleValue: "-Infinity" };
    }
    return { doubleValue: $r(e) ? "-0" : e };
}
function ko(t) {
    return { integerValue: "" + t };
}
function Ro(t, e) {
    return Qr(e) ? ko(e) : No(t, e);
}
class Lo {
    constructor() {
        this._ = void 0;
    }
}
function Mo(t, e, n) {
    return t instanceof Vo
        ? (function (t, e) {
              const n = {
                  fields: {
                      __type__: { stringValue: "server_timestamp" },
                      __local_write_time__: {
                          timestampValue: {
                              seconds: t.seconds,
                              nanos: t.nanoseconds,
                          },
                      },
                  },
              };
              return e && (n.fields.__previous_value__ = e), { mapValue: n };
          })(n, e)
        : t instanceof Po
        ? qo(t, e)
        : t instanceof Bo
        ? Uo(t, e)
        : (function (t, e) {
              const n = Oo(t, e),
                  s = Ko(n) + Ko(t.gt);
              return di(n) && di(t.gt) ? ko(s) : No(t.yt, s);
          })(t, e);
}
function Fo(t, e, n) {
    return t instanceof Po ? qo(t, e) : t instanceof Bo ? Uo(t, e) : n;
}
function Oo(t, e) {
    return t instanceof Go
        ? di((n = e)) ||
          (function (t) {
              return !!t && "doubleValue" in t;
          })(n)
            ? e
            : { integerValue: 0 }
        : null;
    var n;
}
class Vo extends Lo {}
class Po extends Lo {
    constructor(t) {
        super(), (this.elements = t);
    }
}
function qo(t, e) {
    const n = jo(e);
    for (const e of t.elements) n.some((t) => ii(t, e)) || n.push(e);
    return { arrayValue: { values: n } };
}
class Bo extends Lo {
    constructor(t) {
        super(), (this.elements = t);
    }
}
function Uo(t, e) {
    let n = jo(e);
    for (const e of t.elements) n = n.filter((t) => !ii(t, e));
    return { arrayValue: { values: n } };
}
class Go extends Lo {
    constructor(t, e) {
        super(), (this.yt = t), (this.gt = e);
    }
}
function Ko(t) {
    return Xr(t.integerValue || t.doubleValue);
}
function jo(t) {
    return fi(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}
class $o {
    constructor(t, e) {
        (this.field = t), (this.transform = e);
    }
}
class Qo {
    constructor(t, e) {
        (this.version = t), (this.transformResults = e);
    }
}
class zo {
    constructor(t, e) {
        (this.updateTime = t), (this.exists = e);
    }
    static none() {
        return new zo();
    }
    static exists(t) {
        return new zo(void 0, t);
    }
    static updateTime(t) {
        return new zo(t);
    }
    get isNone() {
        return void 0 === this.updateTime && void 0 === this.exists;
    }
    isEqual(t) {
        return (
            this.exists === t.exists &&
            (this.updateTime
                ? !!t.updateTime && this.updateTime.isEqual(t.updateTime)
                : !t.updateTime)
        );
    }
}
function Ho(t, e) {
    return void 0 !== t.updateTime
        ? e.isFoundDocument() && e.version.isEqual(t.updateTime)
        : void 0 === t.exists || t.exists === e.isFoundDocument();
}
class Wo {}
function Yo(t, e) {
    if (!t.hasLocalMutations || (e && 0 === e.fields.length)) return null;
    if (null === e)
        return t.isNoDocument()
            ? new oa(t.key, zo.none())
            : new ea(t.key, t.data, zo.none());
    {
        const n = t.data,
            s = to.empty();
        let r = new Yi(hr.comparator);
        for (let t of e.fields)
            if (!r.has(t)) {
                let e = n.field(t);
                null === e &&
                    t.length > 1 &&
                    ((t = t.popLast()), (e = n.field(t))),
                    null === e ? s.delete(t) : s.set(t, e),
                    (r = r.add(t));
            }
        return new na(t.key, s, new Zi(r.toArray()), zo.none());
    }
}
function Xo(t, e, n) {
    t instanceof ea
        ? (function (t, e, n) {
              const s = t.value.clone(),
                  r = ra(t.fieldTransforms, e, n.transformResults);
              s.setAll(r),
                  e
                      .convertToFoundDocument(n.version, s)
                      .setHasCommittedMutations();
          })(t, e, n)
        : t instanceof na
        ? (function (t, e, n) {
              if (!Ho(t.precondition, e))
                  return void e.convertToUnknownDocument(n.version);
              const s = ra(t.fieldTransforms, e, n.transformResults),
                  r = e.data;
              r.setAll(sa(t)),
                  r.setAll(s),
                  e
                      .convertToFoundDocument(n.version, r)
                      .setHasCommittedMutations();
          })(t, e, n)
        : (function (t, e, n) {
              e.convertToNoDocument(n.version).setHasCommittedMutations();
          })(0, e, n);
}
function Jo(t, e, n, s) {
    return t instanceof ea
        ? (function (t, e, n, s) {
              if (!Ho(t.precondition, e)) return n;
              const r = t.value.clone(),
                  i = ia(t.fieldTransforms, s, e);
              return (
                  r.setAll(i),
                  e.convertToFoundDocument(e.version, r).setHasLocalMutations(),
                  null
              );
          })(t, e, n, s)
        : t instanceof na
        ? (function (t, e, n, s) {
              if (!Ho(t.precondition, e)) return n;
              const r = ia(t.fieldTransforms, s, e),
                  i = e.data;
              return (
                  i.setAll(sa(t)),
                  i.setAll(r),
                  e.convertToFoundDocument(e.version, i).setHasLocalMutations(),
                  null === n
                      ? null
                      : n
                            .unionWith(t.fieldMask.fields)
                            .unionWith(t.fieldTransforms.map((t) => t.field))
              );
          })(t, e, n, s)
        : (function (t, e, n) {
              return Ho(t.precondition, e)
                  ? (e.convertToNoDocument(e.version).setHasLocalMutations(),
                    null)
                  : n;
          })(t, e, n);
}
function Zo(t, e) {
    let n = null;
    for (const s of t.fieldTransforms) {
        const t = e.data.field(s.field),
            r = Oo(s.transform, t || null);
        null != r && (null === n && (n = to.empty()), n.set(s.field, r));
    }
    return n || null;
}
function ta(t, e) {
    return (
        t.type === e.type &&
        !!t.key.isEqual(e.key) &&
        !!t.precondition.isEqual(e.precondition) &&
        !!(function (t, e) {
            return (
                (void 0 === t && void 0 === e) ||
                (!(!t || !e) &&
                    sr(t, e, (t, e) =>
                        (function (t, e) {
                            return (
                                t.field.isEqual(e.field) &&
                                (function (t, e) {
                                    return (t instanceof Po &&
                                        e instanceof Po) ||
                                        (t instanceof Bo && e instanceof Bo)
                                        ? sr(t.elements, e.elements, ii)
                                        : t instanceof Go && e instanceof Go
                                        ? ii(t.gt, e.gt)
                                        : t instanceof Vo && e instanceof Vo;
                                })(t.transform, e.transform)
                            );
                        })(t, e)
                    ))
            );
        })(t.fieldTransforms, e.fieldTransforms) &&
        (0 === t.type
            ? t.value.isEqual(e.value)
            : 1 !== t.type ||
              (t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))
    );
}
class ea extends Wo {
    constructor(t, e, n, s = []) {
        super(),
            (this.key = t),
            (this.value = e),
            (this.precondition = n),
            (this.fieldTransforms = s),
            (this.type = 0);
    }
    getFieldMask() {
        return null;
    }
}
class na extends Wo {
    constructor(t, e, n, s, r = []) {
        super(),
            (this.key = t),
            (this.data = e),
            (this.fieldMask = n),
            (this.precondition = s),
            (this.fieldTransforms = r),
            (this.type = 1);
    }
    getFieldMask() {
        return this.fieldMask;
    }
}
function sa(t) {
    const e = new Map();
    return (
        t.fieldMask.fields.forEach((n) => {
            if (!n.isEmpty()) {
                const s = t.data.field(n);
                e.set(n, s);
            }
        }),
        e
    );
}
function ra(t, e, n) {
    const s = new Map();
    qs(t.length === n.length);
    for (let r = 0; r < n.length; r++) {
        const i = t[r],
            o = i.transform,
            a = e.data.field(i.field);
        s.set(i.field, Fo(o, a, n[r]));
    }
    return s;
}
function ia(t, e, n) {
    const s = new Map();
    for (const r of t) {
        const t = r.transform,
            i = n.data.field(r.field);
        s.set(r.field, Mo(t, i, e));
    }
    return s;
}
class oa extends Wo {
    constructor(t, e) {
        super(),
            (this.key = t),
            (this.precondition = e),
            (this.type = 2),
            (this.fieldTransforms = []);
    }
    getFieldMask() {
        return null;
    }
}
class aa extends Wo {
    constructor(t, e) {
        super(),
            (this.key = t),
            (this.precondition = e),
            (this.type = 3),
            (this.fieldTransforms = []);
    }
    getFieldMask() {
        return null;
    }
}
class ua {
    constructor(t) {
        this.count = t;
    }
}
var ca, ha;
function la(t) {
    switch (t) {
        default:
            return Ps();
        case Gs.CANCELLED:
        case Gs.UNKNOWN:
        case Gs.DEADLINE_EXCEEDED:
        case Gs.RESOURCE_EXHAUSTED:
        case Gs.INTERNAL:
        case Gs.UNAVAILABLE:
        case Gs.UNAUTHENTICATED:
            return !1;
        case Gs.INVALID_ARGUMENT:
        case Gs.NOT_FOUND:
        case Gs.ALREADY_EXISTS:
        case Gs.PERMISSION_DENIED:
        case Gs.FAILED_PRECONDITION:
        case Gs.ABORTED:
        case Gs.OUT_OF_RANGE:
        case Gs.UNIMPLEMENTED:
        case Gs.DATA_LOSS:
            return !0;
    }
}
function da(t) {
    if (void 0 === t) return Fs("GRPC error has no .code"), Gs.UNKNOWN;
    switch (t) {
        case ca.OK:
            return Gs.OK;
        case ca.CANCELLED:
            return Gs.CANCELLED;
        case ca.UNKNOWN:
            return Gs.UNKNOWN;
        case ca.DEADLINE_EXCEEDED:
            return Gs.DEADLINE_EXCEEDED;
        case ca.RESOURCE_EXHAUSTED:
            return Gs.RESOURCE_EXHAUSTED;
        case ca.INTERNAL:
            return Gs.INTERNAL;
        case ca.UNAVAILABLE:
            return Gs.UNAVAILABLE;
        case ca.UNAUTHENTICATED:
            return Gs.UNAUTHENTICATED;
        case ca.INVALID_ARGUMENT:
            return Gs.INVALID_ARGUMENT;
        case ca.NOT_FOUND:
            return Gs.NOT_FOUND;
        case ca.ALREADY_EXISTS:
            return Gs.ALREADY_EXISTS;
        case ca.PERMISSION_DENIED:
            return Gs.PERMISSION_DENIED;
        case ca.FAILED_PRECONDITION:
            return Gs.FAILED_PRECONDITION;
        case ca.ABORTED:
            return Gs.ABORTED;
        case ca.OUT_OF_RANGE:
            return Gs.OUT_OF_RANGE;
        case ca.UNIMPLEMENTED:
            return Gs.UNIMPLEMENTED;
        case ca.DATA_LOSS:
            return Gs.DATA_LOSS;
        default:
            return Ps();
    }
}
((ha = ca || (ca = {}))[(ha.OK = 0)] = "OK"),
    (ha[(ha.CANCELLED = 1)] = "CANCELLED"),
    (ha[(ha.UNKNOWN = 2)] = "UNKNOWN"),
    (ha[(ha.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
    (ha[(ha.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
    (ha[(ha.NOT_FOUND = 5)] = "NOT_FOUND"),
    (ha[(ha.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
    (ha[(ha.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
    (ha[(ha.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
    (ha[(ha.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
    (ha[(ha.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
    (ha[(ha.ABORTED = 10)] = "ABORTED"),
    (ha[(ha.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
    (ha[(ha.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
    (ha[(ha.INTERNAL = 13)] = "INTERNAL"),
    (ha[(ha.UNAVAILABLE = 14)] = "UNAVAILABLE"),
    (ha[(ha.DATA_LOSS = 15)] = "DATA_LOSS");
class fa {
    constructor(t, e) {
        (this.mapKeyFn = t),
            (this.equalsFn = e),
            (this.inner = {}),
            (this.innerSize = 0);
    }
    get(t) {
        const e = this.mapKeyFn(t),
            n = this.inner[e];
        if (void 0 !== n)
            for (const [e, s] of n) if (this.equalsFn(e, t)) return s;
    }
    has(t) {
        return void 0 !== this.get(t);
    }
    set(t, e) {
        const n = this.mapKeyFn(t),
            s = this.inner[n];
        if (void 0 === s)
            return (this.inner[n] = [[t, e]]), void this.innerSize++;
        for (let n = 0; n < s.length; n++)
            if (this.equalsFn(s[n][0], t)) return void (s[n] = [t, e]);
        s.push([t, e]), this.innerSize++;
    }
    delete(t) {
        const e = this.mapKeyFn(t),
            n = this.inner[e];
        if (void 0 === n) return !1;
        for (let s = 0; s < n.length; s++)
            if (this.equalsFn(n[s][0], t))
                return (
                    1 === n.length ? delete this.inner[e] : n.splice(s, 1),
                    this.innerSize--,
                    !0
                );
        return !1;
    }
    forEach(t) {
        Gr(this.inner, (e, n) => {
            for (const [e, s] of n) t(e, s);
        });
    }
    isEmpty() {
        return Kr(this.inner);
    }
    size() {
        return this.innerSize;
    }
}
const ma = new zi(lr.comparator);
function ga() {
    return ma;
}
const pa = new zi(lr.comparator);
function ya(...t) {
    let e = pa;
    for (const n of t) e = e.insert(n.key, n);
    return e;
}
function wa(t) {
    let e = pa;
    return t.forEach((t, n) => (e = e.insert(t, n.overlayedDocument))), e;
}
function va() {
    return ba();
}
function Ia() {
    return ba();
}
function ba() {
    return new fa(
        (t) => t.toString(),
        (t, e) => t.isEqual(e)
    );
}
const Ea = new zi(lr.comparator),
    Ta = new Yi(lr.comparator);
function Sa(...t) {
    let e = Ta;
    for (const n of t) e = e.add(n);
    return e;
}
const _a = new Yi(nr);
function xa() {
    return _a;
}
class Da {
    constructor(t, e, n, s, r) {
        (this.snapshotVersion = t),
            (this.targetChanges = e),
            (this.targetMismatches = n),
            (this.documentUpdates = s),
            (this.resolvedLimboDocuments = r);
    }
    static createSynthesizedRemoteEventForCurrentChange(t, e, n) {
        const s = new Map();
        return (
            s.set(t, Aa.createSynthesizedTargetChangeForCurrentChange(t, e, n)),
            new Da(or.min(), s, xa(), ga(), Sa())
        );
    }
}
class Aa {
    constructor(t, e, n, s, r) {
        (this.resumeToken = t),
            (this.current = e),
            (this.addedDocuments = n),
            (this.modifiedDocuments = s),
            (this.removedDocuments = r);
    }
    static createSynthesizedTargetChangeForCurrentChange(t, e, n) {
        return new Aa(n, e, Sa(), Sa(), Sa());
    }
}
class Ca {
    constructor(t, e, n, s) {
        (this.It = t),
            (this.removedTargetIds = e),
            (this.key = n),
            (this.Tt = s);
    }
}
class Na {
    constructor(t, e) {
        (this.targetId = t), (this.Et = e);
    }
}
class ka {
    constructor(t, e, n = Hr.EMPTY_BYTE_STRING, s = null) {
        (this.state = t),
            (this.targetIds = e),
            (this.resumeToken = n),
            (this.cause = s);
    }
}
class Ra {
    constructor() {
        (this.At = 0),
            (this.Rt = Fa()),
            (this.bt = Hr.EMPTY_BYTE_STRING),
            (this.Pt = !1),
            (this.vt = !0);
    }
    get current() {
        return this.Pt;
    }
    get resumeToken() {
        return this.bt;
    }
    get Vt() {
        return 0 !== this.At;
    }
    get St() {
        return this.vt;
    }
    Dt(t) {
        t.approximateByteSize() > 0 && ((this.vt = !0), (this.bt = t));
    }
    Ct() {
        let t = Sa(),
            e = Sa(),
            n = Sa();
        return (
            this.Rt.forEach((s, r) => {
                switch (r) {
                    case 0:
                        t = t.add(s);
                        break;
                    case 2:
                        e = e.add(s);
                        break;
                    case 1:
                        n = n.add(s);
                        break;
                    default:
                        Ps();
                }
            }),
            new Aa(this.bt, this.Pt, t, e, n)
        );
    }
    xt() {
        (this.vt = !1), (this.Rt = Fa());
    }
    Nt(t, e) {
        (this.vt = !0), (this.Rt = this.Rt.insert(t, e));
    }
    kt(t) {
        (this.vt = !0), (this.Rt = this.Rt.remove(t));
    }
    Ot() {
        this.At += 1;
    }
    Mt() {
        this.At -= 1;
    }
    Ft() {
        (this.vt = !0), (this.Pt = !0);
    }
}
class La {
    constructor(t) {
        (this.$t = t),
            (this.Bt = new Map()),
            (this.Lt = ga()),
            (this.qt = Ma()),
            (this.Ut = new Yi(nr));
    }
    Kt(t) {
        for (const e of t.It)
            t.Tt && t.Tt.isFoundDocument()
                ? this.Gt(e, t.Tt)
                : this.Qt(e, t.key, t.Tt);
        for (const e of t.removedTargetIds) this.Qt(e, t.key, t.Tt);
    }
    jt(t) {
        this.forEachTarget(t, (e) => {
            const n = this.Wt(e);
            switch (t.state) {
                case 0:
                    this.zt(e) && n.Dt(t.resumeToken);
                    break;
                case 1:
                    n.Mt(), n.Vt || n.xt(), n.Dt(t.resumeToken);
                    break;
                case 2:
                    n.Mt(), n.Vt || this.removeTarget(e);
                    break;
                case 3:
                    this.zt(e) && (n.Ft(), n.Dt(t.resumeToken));
                    break;
                case 4:
                    this.zt(e) && (this.Ht(e), n.Dt(t.resumeToken));
                    break;
                default:
                    Ps();
            }
        });
    }
    forEachTarget(t, e) {
        t.targetIds.length > 0
            ? t.targetIds.forEach(e)
            : this.Bt.forEach((t, n) => {
                  this.zt(n) && e(n);
              });
    }
    Jt(t) {
        const e = t.targetId,
            n = t.Et.count,
            s = this.Yt(e);
        if (s) {
            const t = s.target;
            if (ao(t))
                if (0 === n) {
                    const n = new lr(t.path);
                    this.Qt(e, n, no.newNoDocument(n, or.min()));
                } else qs(1 === n);
            else this.Xt(e) !== n && (this.Ht(e), (this.Ut = this.Ut.add(e)));
        }
    }
    Zt(t) {
        const e = new Map();
        this.Bt.forEach((n, s) => {
            const r = this.Yt(s);
            if (r) {
                if (n.current && ao(r.target)) {
                    const e = new lr(r.target.path);
                    null !== this.Lt.get(e) ||
                        this.te(s, e) ||
                        this.Qt(s, e, no.newNoDocument(e, t));
                }
                n.St && (e.set(s, n.Ct()), n.xt());
            }
        });
        let n = Sa();
        this.qt.forEach((t, e) => {
            let s = !0;
            e.forEachWhile((t) => {
                const e = this.Yt(t);
                return !e || 2 === e.purpose || ((s = !1), !1);
            }),
                s && (n = n.add(t));
        }),
            this.Lt.forEach((e, n) => n.setReadTime(t));
        const s = new Da(t, e, this.Ut, this.Lt, n);
        return (this.Lt = ga()), (this.qt = Ma()), (this.Ut = new Yi(nr)), s;
    }
    Gt(t, e) {
        if (!this.zt(t)) return;
        const n = this.te(t, e.key) ? 2 : 0;
        this.Wt(t).Nt(e.key, n),
            (this.Lt = this.Lt.insert(e.key, e)),
            (this.qt = this.qt.insert(e.key, this.ee(e.key).add(t)));
    }
    Qt(t, e, n) {
        if (!this.zt(t)) return;
        const s = this.Wt(t);
        this.te(t, e) ? s.Nt(e, 1) : s.kt(e),
            (this.qt = this.qt.insert(e, this.ee(e).delete(t))),
            n && (this.Lt = this.Lt.insert(e, n));
    }
    removeTarget(t) {
        this.Bt.delete(t);
    }
    Xt(t) {
        const e = this.Wt(t).Ct();
        return (
            this.$t.getRemoteKeysForTarget(t).size +
            e.addedDocuments.size -
            e.removedDocuments.size
        );
    }
    Ot(t) {
        this.Wt(t).Ot();
    }
    Wt(t) {
        let e = this.Bt.get(t);
        return e || ((e = new Ra()), this.Bt.set(t, e)), e;
    }
    ee(t) {
        let e = this.qt.get(t);
        return e || ((e = new Yi(nr)), (this.qt = this.qt.insert(t, e))), e;
    }
    zt(t) {
        const e = null !== this.Yt(t);
        return (
            e || Ms("WatchChangeAggregator", "Detected inactive target", t), e
        );
    }
    Yt(t) {
        const e = this.Bt.get(t);
        return e && e.Vt ? null : this.$t.ne(t);
    }
    Ht(t) {
        this.Bt.set(t, new Ra()),
            this.$t.getRemoteKeysForTarget(t).forEach((e) => {
                this.Qt(t, e, null);
            });
    }
    te(t, e) {
        return this.$t.getRemoteKeysForTarget(t).has(e);
    }
}
function Ma() {
    return new zi(lr.comparator);
}
function Fa() {
    return new zi(lr.comparator);
}
const Oa = { asc: "ASCENDING", desc: "DESCENDING" },
    Va = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY",
    },
    Pa = { and: "AND", or: "OR" };
class qa {
    constructor(t, e) {
        (this.databaseId = t), (this.wt = e);
    }
}
function Ba(t, e) {
    return t.wt
        ? `${new Date(1e3 * e.seconds)
              .toISOString()
              .replace(/\.\d*/, "")
              .replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`
        : { seconds: "" + e.seconds, nanos: e.nanoseconds };
}
function Ua(t, e) {
    return t.wt ? e.toBase64() : e.toUint8Array();
}
function Ga(t, e) {
    return Ba(t, e.toTimestamp());
}
function Ka(t) {
    return (
        qs(!!t),
        or.fromTimestamp(
            (function (t) {
                const e = Yr(t);
                return new ir(e.seconds, e.nanos);
            })(t)
        )
    );
}
function ja(t, e) {
    return (function (t) {
        return new ur(["projects", t.projectId, "databases", t.database]);
    })(t)
        .child("documents")
        .child(e)
        .canonicalString();
}
function $a(t) {
    const e = ur.fromString(t);
    return qs(fu(e)), e;
}
function Qa(t, e) {
    return ja(t.databaseId, e.path);
}
function za(t, e) {
    const n = $a(e);
    if (n.get(1) !== t.databaseId.projectId)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            "Tried to deserialize key from different project: " +
                n.get(1) +
                " vs " +
                t.databaseId.projectId
        );
    if (n.get(3) !== t.databaseId.database)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            "Tried to deserialize key from different database: " +
                n.get(3) +
                " vs " +
                t.databaseId.database
        );
    return new lr(Xa(n));
}
function Ha(t, e) {
    return ja(t.databaseId, e);
}
function Wa(t) {
    const e = $a(t);
    return 4 === e.length ? ur.emptyPath() : Xa(e);
}
function Ya(t) {
    return new ur([
        "projects",
        t.databaseId.projectId,
        "databases",
        t.databaseId.database,
    ]).canonicalString();
}
function Xa(t) {
    return qs(t.length > 4 && "documents" === t.get(4)), t.popFirst(5);
}
function Ja(t, e, n) {
    return { name: Qa(t, e), fields: n.value.mapValue.fields };
}
function Za(t, e, n) {
    const s = za(t, e.name),
        r = Ka(e.updateTime),
        i = e.createTime ? Ka(e.createTime) : or.min(),
        o = new to({ mapValue: { fields: e.fields } }),
        a = no.newFoundDocument(s, r, i, o);
    return (
        n && a.setHasCommittedMutations(), n ? a.setHasCommittedMutations() : a
    );
}
function tu(t, e) {
    let n;
    if (e instanceof ea) n = { update: Ja(t, e.key, e.value) };
    else if (e instanceof oa) n = { delete: Qa(t, e.key) };
    else if (e instanceof na)
        n = { update: Ja(t, e.key, e.data), updateMask: du(e.fieldMask) };
    else {
        if (!(e instanceof aa)) return Ps();
        n = { verify: Qa(t, e.key) };
    }
    return (
        e.fieldTransforms.length > 0 &&
            (n.updateTransforms = e.fieldTransforms.map((t) =>
                (function (t, e) {
                    const n = e.transform;
                    if (n instanceof Vo)
                        return {
                            fieldPath: e.field.canonicalString(),
                            setToServerValue: "REQUEST_TIME",
                        };
                    if (n instanceof Po)
                        return {
                            fieldPath: e.field.canonicalString(),
                            appendMissingElements: { values: n.elements },
                        };
                    if (n instanceof Bo)
                        return {
                            fieldPath: e.field.canonicalString(),
                            removeAllFromArray: { values: n.elements },
                        };
                    if (n instanceof Go)
                        return {
                            fieldPath: e.field.canonicalString(),
                            increment: n.gt,
                        };
                    throw Ps();
                })(0, t)
            )),
        e.precondition.isNone ||
            (n.currentDocument = (function (t, e) {
                return void 0 !== e.updateTime
                    ? { updateTime: Ga(t, e.updateTime) }
                    : void 0 !== e.exists
                    ? { exists: e.exists }
                    : Ps();
            })(t, e.precondition)),
        n
    );
}
function eu(t, e) {
    const n = e.currentDocument
            ? (function (t) {
                  return void 0 !== t.updateTime
                      ? zo.updateTime(Ka(t.updateTime))
                      : void 0 !== t.exists
                      ? zo.exists(t.exists)
                      : zo.none();
              })(e.currentDocument)
            : zo.none(),
        s = e.updateTransforms
            ? e.updateTransforms.map((e) =>
                  (function (t, e) {
                      let n = null;
                      if ("setToServerValue" in e)
                          qs("REQUEST_TIME" === e.setToServerValue),
                              (n = new Vo());
                      else if ("appendMissingElements" in e) {
                          const t = e.appendMissingElements.values || [];
                          n = new Po(t);
                      } else if ("removeAllFromArray" in e) {
                          const t = e.removeAllFromArray.values || [];
                          n = new Bo(t);
                      } else
                          "increment" in e
                              ? (n = new Go(t, e.increment))
                              : Ps();
                      const s = hr.fromServerFormat(e.fieldPath);
                      return new $o(s, n);
                  })(t, e)
              )
            : [];
    if (e.update) {
        e.update.name;
        const r = za(t, e.update.name),
            i = new to({ mapValue: { fields: e.update.fields } });
        if (e.updateMask) {
            const t = (function (t) {
                const e = t.fieldPaths || [];
                return new Zi(e.map((t) => hr.fromServerFormat(t)));
            })(e.updateMask);
            return new na(r, i, t, n, s);
        }
        return new ea(r, i, n, s);
    }
    if (e.delete) {
        const s = za(t, e.delete);
        return new oa(s, n);
    }
    if (e.verify) {
        const s = za(t, e.verify);
        return new aa(s, n);
    }
    return Ps();
}
function nu(t, e) {
    return { documents: [Ha(t, e.path)] };
}
function su(t, e) {
    const n = { structuredQuery: {} },
        s = e.path;
    null !== e.collectionGroup
        ? ((n.parent = Ha(t, s)),
          (n.structuredQuery.from = [
              { collectionId: e.collectionGroup, allDescendants: !0 },
          ]))
        : ((n.parent = Ha(t, s.popLast())),
          (n.structuredQuery.from = [{ collectionId: s.lastSegment() }]));
    const r = (function (t) {
        if (0 !== t.length) return lu(Ai.create(t, "and"));
    })(e.filters);
    r && (n.structuredQuery.where = r);
    const i = (function (t) {
        if (0 !== t.length)
            return t.map((t) =>
                (function (t) {
                    return { field: cu(t.field), direction: ou(t.dir) };
                })(t)
            );
    })(e.orderBy);
    i && (n.structuredQuery.orderBy = i);
    const o = (function (t, e) {
        return t.wt || jr(e) ? e : { value: e };
    })(t, e.limit);
    var a;
    return (
        null !== o && (n.structuredQuery.limit = o),
        e.startAt &&
            (n.structuredQuery.startAt = {
                before: (a = e.startAt).inclusive,
                values: a.position,
            }),
        e.endAt &&
            (n.structuredQuery.endAt = (function (t) {
                return { before: !t.inclusive, values: t.position };
            })(e.endAt)),
        n
    );
}
function ru(t) {
    let e = Wa(t.parent);
    const n = t.structuredQuery,
        s = n.from ? n.from.length : 0;
    let r = null;
    if (s > 0) {
        qs(1 === s);
        const t = n.from[0];
        t.allDescendants ? (r = t.collectionId) : (e = e.child(t.collectionId));
    }
    let i = [];
    n.where &&
        (i = (function (t) {
            const e = iu(t);
            return e instanceof Ai && ki(e) ? e.getFilters() : [e];
        })(n.where));
    let o = [];
    n.orderBy &&
        (o = n.orderBy.map((t) =>
            (function (t) {
                return new $i(
                    hu(t.field),
                    (function (t) {
                        switch (t) {
                            case "ASCENDING":
                                return "asc";
                            case "DESCENDING":
                                return "desc";
                            default:
                                return;
                        }
                    })(t.direction)
                );
            })(t)
        ));
    let a = null;
    n.limit &&
        (a = (function (t) {
            let e;
            return (e = "object" == typeof t ? t.value : t), jr(e) ? null : e;
        })(n.limit));
    let u = null;
    n.startAt &&
        (u = (function (t) {
            const e = !!t.before,
                n = t.values || [];
            return new Ti(n, e);
        })(n.startAt));
    let c = null;
    return (
        n.endAt &&
            (c = (function (t) {
                const e = !t.before,
                    n = t.values || [];
                return new Ti(n, e);
            })(n.endAt)),
        fo(e, r, o, i, a, "F", u, c)
    );
}
function iu(t) {
    return void 0 !== t.unaryFilter
        ? (function (t) {
              switch (t.unaryFilter.op) {
                  case "IS_NAN":
                      const e = hu(t.unaryFilter.field);
                      return Di.create(e, "==", { doubleValue: NaN });
                  case "IS_NULL":
                      const n = hu(t.unaryFilter.field);
                      return Di.create(n, "==", { nullValue: "NULL_VALUE" });
                  case "IS_NOT_NAN":
                      const s = hu(t.unaryFilter.field);
                      return Di.create(s, "!=", { doubleValue: NaN });
                  case "IS_NOT_NULL":
                      const r = hu(t.unaryFilter.field);
                      return Di.create(r, "!=", { nullValue: "NULL_VALUE" });
                  default:
                      return Ps();
              }
          })(t)
        : void 0 !== t.fieldFilter
        ? (function (t) {
              return Di.create(
                  hu(t.fieldFilter.field),
                  (function (t) {
                      switch (t) {
                          case "EQUAL":
                              return "==";
                          case "NOT_EQUAL":
                              return "!=";
                          case "GREATER_THAN":
                              return ">";
                          case "GREATER_THAN_OR_EQUAL":
                              return ">=";
                          case "LESS_THAN":
                              return "<";
                          case "LESS_THAN_OR_EQUAL":
                              return "<=";
                          case "ARRAY_CONTAINS":
                              return "array-contains";
                          case "IN":
                              return "in";
                          case "NOT_IN":
                              return "not-in";
                          case "ARRAY_CONTAINS_ANY":
                              return "array-contains-any";
                          default:
                              return Ps();
                      }
                  })(t.fieldFilter.op),
                  t.fieldFilter.value
              );
          })(t)
        : void 0 !== t.compositeFilter
        ? (function (t) {
              return Ai.create(
                  t.compositeFilter.filters.map((t) => iu(t)),
                  (function (t) {
                      switch (t) {
                          case "AND":
                              return "and";
                          case "OR":
                              return "or";
                          default:
                              return Ps();
                      }
                  })(t.compositeFilter.op)
              );
          })(t)
        : Ps();
}
function ou(t) {
    return Oa[t];
}
function au(t) {
    return Va[t];
}
function uu(t) {
    return Pa[t];
}
function cu(t) {
    return { fieldPath: t.canonicalString() };
}
function hu(t) {
    return hr.fromServerFormat(t.fieldPath);
}
function lu(t) {
    return t instanceof Di
        ? (function (t) {
              if ("==" === t.op) {
                  if (gi(t.value))
                      return {
                          unaryFilter: { field: cu(t.field), op: "IS_NAN" },
                      };
                  if (mi(t.value))
                      return {
                          unaryFilter: { field: cu(t.field), op: "IS_NULL" },
                      };
              } else if ("!=" === t.op) {
                  if (gi(t.value))
                      return {
                          unaryFilter: { field: cu(t.field), op: "IS_NOT_NAN" },
                      };
                  if (mi(t.value))
                      return {
                          unaryFilter: {
                              field: cu(t.field),
                              op: "IS_NOT_NULL",
                          },
                      };
              }
              return {
                  fieldFilter: {
                      field: cu(t.field),
                      op: au(t.op),
                      value: t.value,
                  },
              };
          })(t)
        : t instanceof Ai
        ? (function (t) {
              const e = t.getFilters().map((t) => lu(t));
              return 1 === e.length
                  ? e[0]
                  : { compositeFilter: { op: uu(t.op), filters: e } };
          })(t)
        : Ps();
}
function du(t) {
    const e = [];
    return (
        t.fields.forEach((t) => e.push(t.canonicalString())), { fieldPaths: e }
    );
}
function fu(t) {
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}
function mu(t) {
    let e = "";
    for (let n = 0; n < t.length; n++)
        e.length > 0 && (e = pu(e)), (e = gu(t.get(n), e));
    return pu(e);
}
function gu(t, e) {
    let n = e;
    const s = t.length;
    for (let e = 0; e < s; e++) {
        const s = t.charAt(e);
        switch (s) {
            case "\0":
                n += "";
                break;
            case "":
                n += "";
                break;
            default:
                n += s;
        }
    }
    return n;
}
function pu(t) {
    return t + "";
}
function yu(t) {
    const e = t.length;
    if ((qs(e >= 2), 2 === e))
        return qs("" === t.charAt(0) && "" === t.charAt(1)), ur.emptyPath();
    const n = e - 2,
        s = [];
    let r = "";
    for (let i = 0; i < e; ) {
        const e = t.indexOf("", i);
        switch (((e < 0 || e > n) && Ps(), t.charAt(e + 1))) {
            case "":
                const n = t.substring(i, e);
                let o;
                0 === r.length ? (o = n) : ((r += n), (o = r), (r = "")),
                    s.push(o);
                break;
            case "":
                (r += t.substring(i, e)), (r += "\0");
                break;
            case "":
                r += t.substring(i, e + 1);
                break;
            default:
                Ps();
        }
        i = e + 2;
    }
    return new ur(s);
}
const wu = ["userId", "batchId"];
function vu(t, e) {
    return [t, mu(e)];
}
function Iu(t, e, n) {
    return [t, mu(e), n];
}
const bu = {},
    Eu = ["prefixPath", "collectionGroup", "readTime", "documentId"],
    Tu = ["prefixPath", "collectionGroup", "documentId"],
    Su = ["collectionGroup", "readTime", "prefixPath", "documentId"],
    _u = ["canonicalId", "targetId"],
    xu = ["targetId", "path"],
    Du = ["path", "targetId"],
    Au = ["collectionId", "parent"],
    Cu = ["indexId", "uid"],
    Nu = ["uid", "sequenceNumber"],
    ku = [
        "indexId",
        "uid",
        "arrayValue",
        "directionalValue",
        "orderedDocumentKey",
        "documentKey",
    ],
    Ru = ["indexId", "uid", "orderedDocumentKey"],
    Lu = ["userId", "collectionPath", "documentId"],
    Mu = ["userId", "collectionPath", "largestBatchId"],
    Fu = ["userId", "collectionGroup", "largestBatchId"],
    Ou = [
        "mutationQueues",
        "mutations",
        "documentMutations",
        "remoteDocuments",
        "targets",
        "owner",
        "targetGlobal",
        "targetDocuments",
        "clientMetadata",
        "remoteDocumentGlobal",
        "collectionParents",
        "bundles",
        "namedQueries",
    ],
    Vu = [...Ou, "documentOverlays"],
    Pu = [
        "mutationQueues",
        "mutations",
        "documentMutations",
        "remoteDocumentsV14",
        "targets",
        "owner",
        "targetGlobal",
        "targetDocuments",
        "clientMetadata",
        "remoteDocumentGlobal",
        "collectionParents",
        "bundles",
        "namedQueries",
        "documentOverlays",
    ],
    qu = Pu,
    Bu = [...qu, "indexConfiguration", "indexState", "indexEntries"];
class Uu extends Sr {
    constructor(t, e) {
        super(), (this.se = t), (this.currentSequenceNumber = e);
    }
}
function Gu(t, e) {
    const n = Us(t);
    return Ar.M(n.se, e);
}
class Ku {
    constructor(t, e, n, s) {
        (this.batchId = t),
            (this.localWriteTime = e),
            (this.baseMutations = n),
            (this.mutations = s);
    }
    applyToRemoteDocument(t, e) {
        const n = e.mutationResults;
        for (let e = 0; e < this.mutations.length; e++) {
            const s = this.mutations[e];
            s.key.isEqual(t.key) && Xo(s, t, n[e]);
        }
    }
    applyToLocalView(t, e) {
        for (const n of this.baseMutations)
            n.key.isEqual(t.key) && (e = Jo(n, t, e, this.localWriteTime));
        for (const n of this.mutations)
            n.key.isEqual(t.key) && (e = Jo(n, t, e, this.localWriteTime));
        return e;
    }
    applyToLocalDocumentSet(t, e) {
        const n = Ia();
        return (
            this.mutations.forEach((s) => {
                const r = t.get(s.key),
                    i = r.overlayedDocument;
                let o = this.applyToLocalView(i, r.mutatedFields);
                o = e.has(s.key) ? null : o;
                const a = Yo(i, o);
                null !== a && n.set(s.key, a),
                    i.isValidDocument() || i.convertToNoDocument(or.min());
            }),
            n
        );
    }
    keys() {
        return this.mutations.reduce((t, e) => t.add(e.key), Sa());
    }
    isEqual(t) {
        return (
            this.batchId === t.batchId &&
            sr(this.mutations, t.mutations, (t, e) => ta(t, e)) &&
            sr(this.baseMutations, t.baseMutations, (t, e) => ta(t, e))
        );
    }
}
class ju {
    constructor(t, e, n, s) {
        (this.batch = t),
            (this.commitVersion = e),
            (this.mutationResults = n),
            (this.docVersions = s);
    }
    static from(t, e, n) {
        qs(t.mutations.length === n.length);
        let s = Ea;
        const r = t.mutations;
        for (let t = 0; t < r.length; t++) s = s.insert(r[t].key, n[t].version);
        return new ju(t, e, n, s);
    }
}
class $u {
    constructor(t, e) {
        (this.largestBatchId = t), (this.mutation = e);
    }
    getKey() {
        return this.mutation.key;
    }
    isEqual(t) {
        return null !== t && this.mutation === t.mutation;
    }
    toString() {
        return `Overlay{\n      largestBatchId: ${
            this.largestBatchId
        },\n      mutation: ${this.mutation.toString()}\n    }`;
    }
}
class Qu {
    constructor(
        t,
        e,
        n,
        s,
        r = or.min(),
        i = or.min(),
        o = Hr.EMPTY_BYTE_STRING
    ) {
        (this.target = t),
            (this.targetId = e),
            (this.purpose = n),
            (this.sequenceNumber = s),
            (this.snapshotVersion = r),
            (this.lastLimboFreeSnapshotVersion = i),
            (this.resumeToken = o);
    }
    withSequenceNumber(t) {
        return new Qu(
            this.target,
            this.targetId,
            this.purpose,
            t,
            this.snapshotVersion,
            this.lastLimboFreeSnapshotVersion,
            this.resumeToken
        );
    }
    withResumeToken(t, e) {
        return new Qu(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            e,
            this.lastLimboFreeSnapshotVersion,
            t
        );
    }
    withLastLimboFreeSnapshotVersion(t) {
        return new Qu(
            this.target,
            this.targetId,
            this.purpose,
            this.sequenceNumber,
            this.snapshotVersion,
            t,
            this.resumeToken
        );
    }
}
class zu {
    constructor(t) {
        this.ie = t;
    }
}
function Hu(t, e) {
    const n = e.key,
        s = {
            prefixPath: n.getCollectionPath().popLast().toArray(),
            collectionGroup: n.collectionGroup,
            documentId: n.path.lastSegment(),
            readTime: Wu(e.readTime),
            hasCommittedMutations: e.hasCommittedMutations,
        };
    if (e.isFoundDocument())
        s.document = (function (t, e) {
            return {
                name: Qa(t, e.key),
                fields: e.data.value.mapValue.fields,
                updateTime: Ba(t, e.version.toTimestamp()),
                createTime: Ba(t, e.createTime.toTimestamp()),
            };
        })(t.ie, e);
    else if (e.isNoDocument())
        s.noDocument = { path: n.path.toArray(), readTime: Yu(e.version) };
    else {
        if (!e.isUnknownDocument()) return Ps();
        s.unknownDocument = { path: n.path.toArray(), version: Yu(e.version) };
    }
    return s;
}
function Wu(t) {
    const e = t.toTimestamp();
    return [e.seconds, e.nanoseconds];
}
function Yu(t) {
    const e = t.toTimestamp();
    return { seconds: e.seconds, nanoseconds: e.nanoseconds };
}
function Xu(t) {
    const e = new ir(t.seconds, t.nanoseconds);
    return or.fromTimestamp(e);
}
function Ju(t, e) {
    const n = (e.baseMutations || []).map((e) => eu(t.ie, e));
    for (let t = 0; t < e.mutations.length - 1; ++t) {
        const n = e.mutations[t];
        if (
            t + 1 < e.mutations.length &&
            void 0 !== e.mutations[t + 1].transform
        ) {
            const s = e.mutations[t + 1];
            (n.updateTransforms = s.transform.fieldTransforms),
                e.mutations.splice(t + 1, 1),
                ++t;
        }
    }
    const s = e.mutations.map((e) => eu(t.ie, e)),
        r = ir.fromMillis(e.localWriteTimeMs);
    return new Ku(e.batchId, r, n, s);
}
function Zu(t) {
    const e = Xu(t.readTime),
        n =
            void 0 !== t.lastLimboFreeSnapshotVersion
                ? Xu(t.lastLimboFreeSnapshotVersion)
                : or.min();
    let s;
    var r;
    return (
        void 0 !== t.query.documents
            ? (qs(1 === (r = t.query).documents.length),
              (s = Io(mo(Wa(r.documents[0])))))
            : (s = (function (t) {
                  return Io(ru(t));
              })(t.query)),
        new Qu(
            s,
            t.targetId,
            0,
            t.lastListenSequenceNumber,
            e,
            n,
            Hr.fromBase64String(t.resumeToken)
        )
    );
}
function tc(t, e) {
    const n = Yu(e.snapshotVersion),
        s = Yu(e.lastLimboFreeSnapshotVersion);
    let r;
    r = ao(e.target) ? nu(t.ie, e.target) : su(t.ie, e.target);
    const i = e.resumeToken.toBase64();
    return {
        targetId: e.targetId,
        canonicalId: io(e.target),
        readTime: n,
        resumeToken: i,
        lastListenSequenceNumber: e.sequenceNumber,
        lastLimboFreeSnapshotVersion: s,
        query: r,
    };
}
function ec(t) {
    const e = ru({ parent: t.parent, structuredQuery: t.structuredQuery });
    return "LAST" === t.limitType ? Eo(e, e.limit, "L") : e;
}
function nc(t, e) {
    return new $u(e.largestBatchId, eu(t.ie, e.overlayMutation));
}
function sc(t, e) {
    const n = e.path.lastSegment();
    return [t, mu(e.path.popLast()), n];
}
function rc(t, e, n, s) {
    return {
        indexId: t,
        uid: e.uid || "",
        sequenceNumber: n,
        readTime: Yu(s.readTime),
        documentKey: mu(s.documentKey.path),
        largestBatchId: s.largestBatchId,
    };
}
class ic {
    getBundleMetadata(t, e) {
        return oc(t)
            .get(e)
            .next((t) => {
                if (t)
                    return {
                        id: (e = t).bundleId,
                        createTime: Xu(e.createTime),
                        version: e.version,
                    };
                var e;
            });
    }
    saveBundleMetadata(t, e) {
        return oc(t).put({
            bundleId: (n = e).id,
            createTime: Yu(Ka(n.createTime)),
            version: n.version,
        });
        var n;
    }
    getNamedQuery(t, e) {
        return ac(t)
            .get(e)
            .next((t) => {
                if (t)
                    return {
                        name: (e = t).name,
                        query: ec(e.bundledQuery),
                        readTime: Xu(e.readTime),
                    };
                var e;
            });
    }
    saveNamedQuery(t, e) {
        return ac(t).put(
            (function (t) {
                return {
                    name: t.name,
                    readTime: Yu(Ka(t.readTime)),
                    bundledQuery: t.bundledQuery,
                };
            })(e)
        );
    }
}
function oc(t) {
    return Gu(t, "bundles");
}
function ac(t) {
    return Gu(t, "namedQueries");
}
class uc {
    constructor(t, e) {
        (this.yt = t), (this.userId = e);
    }
    static re(t, e) {
        const n = e.uid || "";
        return new uc(t, n);
    }
    getOverlay(t, e) {
        return cc(t)
            .get(sc(this.userId, e))
            .next((t) => (t ? nc(this.yt, t) : null));
    }
    getOverlays(t, e) {
        const n = va();
        return xr
            .forEach(e, (e) =>
                this.getOverlay(t, e).next((t) => {
                    null !== t && n.set(e, t);
                })
            )
            .next(() => n);
    }
    saveOverlays(t, e, n) {
        const s = [];
        return (
            n.forEach((n, r) => {
                const i = new $u(e, r);
                s.push(this.oe(t, i));
            }),
            xr.waitFor(s)
        );
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = new Set();
        e.forEach((t) => s.add(mu(t.getCollectionPath())));
        const r = [];
        return (
            s.forEach((e) => {
                const s = IDBKeyRange.bound(
                    [this.userId, e, n],
                    [this.userId, e, n + 1],
                    !1,
                    !0
                );
                r.push(cc(t).Y("collectionPathOverlayIndex", s));
            }),
            xr.waitFor(r)
        );
    }
    getOverlaysForCollection(t, e, n) {
        const s = va(),
            r = mu(e),
            i = IDBKeyRange.bound(
                [this.userId, r, n],
                [this.userId, r, Number.POSITIVE_INFINITY],
                !0
            );
        return cc(t)
            .W("collectionPathOverlayIndex", i)
            .next((t) => {
                for (const e of t) {
                    const t = nc(this.yt, e);
                    s.set(t.getKey(), t);
                }
                return s;
            });
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        const r = va();
        let i;
        const o = IDBKeyRange.bound(
            [this.userId, e, n],
            [this.userId, e, Number.POSITIVE_INFINITY],
            !0
        );
        return cc(t)
            .Z(
                { index: "collectionGroupOverlayIndex", range: o },
                (t, e, n) => {
                    const o = nc(this.yt, e);
                    r.size() < s || o.largestBatchId === i
                        ? (r.set(o.getKey(), o), (i = o.largestBatchId))
                        : n.done();
                }
            )
            .next(() => r);
    }
    oe(t, e) {
        return cc(t).put(
            (function (t, e, n) {
                const [s, r, i] = sc(e, n.mutation.key);
                return {
                    userId: e,
                    collectionPath: r,
                    documentId: i,
                    collectionGroup: n.mutation.key.getCollectionGroup(),
                    largestBatchId: n.largestBatchId,
                    overlayMutation: tu(t.ie, n.mutation),
                };
            })(this.yt, this.userId, e)
        );
    }
}
function cc(t) {
    return Gu(t, "documentOverlays");
}
class hc {
    constructor() {}
    ue(t, e) {
        this.ce(t, e), e.ae();
    }
    ce(t, e) {
        if ("nullValue" in t) this.he(e, 5);
        else if ("booleanValue" in t)
            this.he(e, 10), e.le(t.booleanValue ? 1 : 0);
        else if ("integerValue" in t) this.he(e, 15), e.le(Xr(t.integerValue));
        else if ("doubleValue" in t) {
            const n = Xr(t.doubleValue);
            isNaN(n)
                ? this.he(e, 13)
                : (this.he(e, 15), $r(n) ? e.le(0) : e.le(n));
        } else if ("timestampValue" in t) {
            const n = t.timestampValue;
            this.he(e, 20),
                "string" == typeof n
                    ? e.fe(n)
                    : (e.fe(`${n.seconds || ""}`), e.le(n.nanos || 0));
        } else if ("stringValue" in t) this.de(t.stringValue, e), this._e(e);
        else if ("bytesValue" in t)
            this.he(e, 30), e.we(Jr(t.bytesValue)), this._e(e);
        else if ("referenceValue" in t) this.me(t.referenceValue, e);
        else if ("geoPointValue" in t) {
            const n = t.geoPointValue;
            this.he(e, 45), e.le(n.latitude || 0), e.le(n.longitude || 0);
        } else
            "mapValue" in t
                ? wi(t)
                    ? this.he(e, Number.MAX_SAFE_INTEGER)
                    : (this.ge(t.mapValue, e), this._e(e))
                : "arrayValue" in t
                ? (this.ye(t.arrayValue, e), this._e(e))
                : Ps();
    }
    de(t, e) {
        this.he(e, 25), this.pe(t, e);
    }
    pe(t, e) {
        e.fe(t);
    }
    ge(t, e) {
        const n = t.fields || {};
        this.he(e, 55);
        for (const t of Object.keys(n)) this.de(t, e), this.ce(n[t], e);
    }
    ye(t, e) {
        const n = t.values || [];
        this.he(e, 50);
        for (const t of n) this.ce(t, e);
    }
    me(t, e) {
        this.he(e, 37),
            lr.fromName(t).path.forEach((t) => {
                this.he(e, 60), this.pe(t, e);
            });
    }
    he(t, e) {
        t.le(e);
    }
    _e(t) {
        t.le(2);
    }
}
function lc(t) {
    if (0 === t) return 8;
    let e = 0;
    return (
        t >> 4 == 0 && ((e += 4), (t <<= 4)),
        t >> 6 == 0 && ((e += 2), (t <<= 2)),
        t >> 7 == 0 && (e += 1),
        e
    );
}
function dc(t) {
    const e =
        64 -
        (function (t) {
            let e = 0;
            for (let n = 0; n < 8; ++n) {
                const s = lc(255 & t[n]);
                if (((e += s), 8 !== s)) break;
            }
            return e;
        })(t);
    return Math.ceil(e / 8);
}
hc.Ie = new hc();
class fc {
    constructor() {
        (this.buffer = new Uint8Array(1024)), (this.position = 0);
    }
    Te(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (; !n.done; ) this.Ee(n.value), (n = e.next());
        this.Ae();
    }
    Re(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (; !n.done; ) this.be(n.value), (n = e.next());
        this.Pe();
    }
    ve(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.Ee(t);
            else if (t < 2048)
                this.Ee(960 | (t >>> 6)), this.Ee(128 | (63 & t));
            else if (e < "\ud800" || "\udbff" < e)
                this.Ee(480 | (t >>> 12)),
                    this.Ee(128 | (63 & (t >>> 6))),
                    this.Ee(128 | (63 & t));
            else {
                const t = e.codePointAt(0);
                this.Ee(240 | (t >>> 18)),
                    this.Ee(128 | (63 & (t >>> 12))),
                    this.Ee(128 | (63 & (t >>> 6))),
                    this.Ee(128 | (63 & t));
            }
        }
        this.Ae();
    }
    Ve(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.be(t);
            else if (t < 2048)
                this.be(960 | (t >>> 6)), this.be(128 | (63 & t));
            else if (e < "\ud800" || "\udbff" < e)
                this.be(480 | (t >>> 12)),
                    this.be(128 | (63 & (t >>> 6))),
                    this.be(128 | (63 & t));
            else {
                const t = e.codePointAt(0);
                this.be(240 | (t >>> 18)),
                    this.be(128 | (63 & (t >>> 12))),
                    this.be(128 | (63 & (t >>> 6))),
                    this.be(128 | (63 & t));
            }
        }
        this.Pe();
    }
    Se(t) {
        const e = this.De(t),
            n = dc(e);
        this.Ce(1 + n), (this.buffer[this.position++] = 255 & n);
        for (let t = e.length - n; t < e.length; ++t)
            this.buffer[this.position++] = 255 & e[t];
    }
    xe(t) {
        const e = this.De(t),
            n = dc(e);
        this.Ce(1 + n), (this.buffer[this.position++] = ~(255 & n));
        for (let t = e.length - n; t < e.length; ++t)
            this.buffer[this.position++] = ~(255 & e[t]);
    }
    Ne() {
        this.ke(255), this.ke(255);
    }
    Oe() {
        this.Me(255), this.Me(255);
    }
    reset() {
        this.position = 0;
    }
    seed(t) {
        this.Ce(t.length),
            this.buffer.set(t, this.position),
            (this.position += t.length);
    }
    Fe() {
        return this.buffer.slice(0, this.position);
    }
    De(t) {
        const e = (function (t) {
                const e = new DataView(new ArrayBuffer(8));
                return e.setFloat64(0, t, !1), new Uint8Array(e.buffer);
            })(t),
            n = 0 != (128 & e[0]);
        e[0] ^= n ? 255 : 128;
        for (let t = 1; t < e.length; ++t) e[t] ^= n ? 255 : 0;
        return e;
    }
    Ee(t) {
        const e = 255 & t;
        0 === e
            ? (this.ke(0), this.ke(255))
            : 255 === e
            ? (this.ke(255), this.ke(0))
            : this.ke(e);
    }
    be(t) {
        const e = 255 & t;
        0 === e
            ? (this.Me(0), this.Me(255))
            : 255 === e
            ? (this.Me(255), this.Me(0))
            : this.Me(t);
    }
    Ae() {
        this.ke(0), this.ke(1);
    }
    Pe() {
        this.Me(0), this.Me(1);
    }
    ke(t) {
        this.Ce(1), (this.buffer[this.position++] = t);
    }
    Me(t) {
        this.Ce(1), (this.buffer[this.position++] = ~t);
    }
    Ce(t) {
        const e = t + this.position;
        if (e <= this.buffer.length) return;
        let n = 2 * this.buffer.length;
        n < e && (n = e);
        const s = new Uint8Array(n);
        s.set(this.buffer), (this.buffer = s);
    }
}
class mc {
    constructor(t) {
        this.$e = t;
    }
    we(t) {
        this.$e.Te(t);
    }
    fe(t) {
        this.$e.ve(t);
    }
    le(t) {
        this.$e.Se(t);
    }
    ae() {
        this.$e.Ne();
    }
}
class gc {
    constructor(t) {
        this.$e = t;
    }
    we(t) {
        this.$e.Re(t);
    }
    fe(t) {
        this.$e.Ve(t);
    }
    le(t) {
        this.$e.xe(t);
    }
    ae() {
        this.$e.Oe();
    }
}
class pc {
    constructor() {
        (this.$e = new fc()),
            (this.Be = new mc(this.$e)),
            (this.Le = new gc(this.$e));
    }
    seed(t) {
        this.$e.seed(t);
    }
    qe(t) {
        return 0 === t ? this.Be : this.Le;
    }
    Fe() {
        return this.$e.Fe();
    }
    reset() {
        this.$e.reset();
    }
}
class yc {
    constructor(t, e, n, s) {
        (this.indexId = t),
            (this.documentKey = e),
            (this.arrayValue = n),
            (this.directionalValue = s);
    }
    Ue() {
        const t = this.directionalValue.length,
            e = 0 === t || 255 === this.directionalValue[t - 1] ? t + 1 : t,
            n = new Uint8Array(e);
        return (
            n.set(this.directionalValue, 0),
            e !== t
                ? n.set([0], this.directionalValue.length)
                : ++n[n.length - 1],
            new yc(this.indexId, this.documentKey, this.arrayValue, n)
        );
    }
}
function wc(t, e) {
    let n = t.indexId - e.indexId;
    return 0 !== n
        ? n
        : ((n = vc(t.arrayValue, e.arrayValue)),
          0 !== n
              ? n
              : ((n = vc(t.directionalValue, e.directionalValue)),
                0 !== n ? n : lr.comparator(t.documentKey, e.documentKey)));
}
function vc(t, e) {
    for (let n = 0; n < t.length && n < e.length; ++n) {
        const s = t[n] - e[n];
        if (0 !== s) return s;
    }
    return t.length - e.length;
}
class Ic {
    constructor(t) {
        (this.collectionId =
            null != t.collectionGroup
                ? t.collectionGroup
                : t.path.lastSegment()),
            (this.Ke = t.orderBy),
            (this.Ge = []);
        for (const e of t.filters) {
            const t = e;
            t.isInequality() ? (this.Qe = t) : this.Ge.push(t);
        }
    }
    je(t) {
        qs(t.collectionGroup === this.collectionId);
        const e = fr(t);
        if (void 0 !== e && !this.We(e)) return !1;
        const n = mr(t);
        let s = 0,
            r = 0;
        for (; s < n.length && this.We(n[s]); ++s);
        if (s === n.length) return !0;
        if (void 0 !== this.Qe) {
            const t = n[s];
            if (!this.ze(this.Qe, t) || !this.He(this.Ke[r++], t)) return !1;
            ++s;
        }
        for (; s < n.length; ++s) {
            const t = n[s];
            if (r >= this.Ke.length || !this.He(this.Ke[r++], t)) return !1;
        }
        return !0;
    }
    We(t) {
        for (const e of this.Ge) if (this.ze(e, t)) return !0;
        return !1;
    }
    ze(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        const n = "array-contains" === t.op || "array-contains-any" === t.op;
        return (2 === e.kind) === n;
    }
    He(t, e) {
        return (
            !!t.field.isEqual(e.fieldPath) &&
            ((0 === e.kind && "asc" === t.dir) ||
                (1 === e.kind && "desc" === t.dir))
        );
    }
}
function bc(t) {
    var e, n;
    if ((qs(t instanceof Di || t instanceof Ai), t instanceof Di)) {
        if (t instanceof Gi) {
            const s =
                (null ===
                    (n =
                        null === (e = t.value.arrayValue) || void 0 === e
                            ? void 0
                            : e.values) || void 0 === n
                    ? void 0
                    : n.map((e) => Di.create(t.field, "==", e))) || [];
            return Ai.create(s, "or");
        }
        return t;
    }
    const s = t.filters.map((t) => bc(t));
    return Ai.create(s, t.op);
}
function Ec(t) {
    if (0 === t.getFilters().length) return [];
    const e = xc(bc(t));
    return qs(_c(e)), Tc(e) || Sc(e) ? [e] : e.getFilters();
}
function Tc(t) {
    return t instanceof Di;
}
function Sc(t) {
    return t instanceof Ai && ki(t);
}
function _c(t) {
    return (
        Tc(t) ||
        Sc(t) ||
        (function (t) {
            if (t instanceof Ai && Ni(t)) {
                for (const e of t.getFilters()) if (!Tc(e) && !Sc(e)) return !1;
                return !0;
            }
            return !1;
        })(t)
    );
}
function xc(t) {
    if ((qs(t instanceof Di || t instanceof Ai), t instanceof Di)) return t;
    if (1 === t.filters.length) return xc(t.filters[0]);
    const e = t.filters.map((t) => xc(t));
    let n = Ai.create(e, t.op);
    return (
        (n = Cc(n)),
        _c(n)
            ? n
            : (qs(n instanceof Ai),
              qs(Ci(n)),
              qs(n.filters.length > 1),
              n.filters.reduce((t, e) => Dc(t, e)))
    );
}
function Dc(t, e) {
    let n;
    return (
        qs(t instanceof Di || t instanceof Ai),
        qs(e instanceof Di || e instanceof Ai),
        (n =
            t instanceof Di
                ? e instanceof Di
                    ? (function (t, e) {
                          return Ai.create([t, e], "and");
                      })(t, e)
                    : Ac(t, e)
                : e instanceof Di
                ? Ac(e, t)
                : (function (t, e) {
                      if (
                          (qs(t.filters.length > 0 && e.filters.length > 0),
                          Ci(t) && Ci(e))
                      )
                          return Fi(t, e.getFilters());
                      const n = Ni(t) ? t : e,
                          s = Ni(t) ? e : t,
                          r = n.filters.map((t) => Dc(t, s));
                      return Ai.create(r, "or");
                  })(t, e)),
        Cc(n)
    );
}
function Ac(t, e) {
    if (Ci(e)) return Fi(e, t.getFilters());
    {
        const n = e.filters.map((e) => Dc(t, e));
        return Ai.create(n, "or");
    }
}
function Cc(t) {
    if ((qs(t instanceof Di || t instanceof Ai), t instanceof Di)) return t;
    const e = t.getFilters();
    if (1 === e.length) return Cc(e[0]);
    if (Ri(t)) return t;
    const n = e.map((t) => Cc(t)),
        s = [];
    return (
        n.forEach((e) => {
            e instanceof Di
                ? s.push(e)
                : e instanceof Ai &&
                  (e.op === t.op ? s.push(...e.filters) : s.push(e));
        }),
        1 === s.length ? s[0] : Ai.create(s, t.op)
    );
}
class Nc {
    constructor() {
        this.Je = new kc();
    }
    addToCollectionParentIndex(t, e) {
        return this.Je.add(e), xr.resolve();
    }
    getCollectionParents(t, e) {
        return xr.resolve(this.Je.getEntries(e));
    }
    addFieldIndex(t, e) {
        return xr.resolve();
    }
    deleteFieldIndex(t, e) {
        return xr.resolve();
    }
    getDocumentsMatchingTarget(t, e) {
        return xr.resolve(null);
    }
    getIndexType(t, e) {
        return xr.resolve(0);
    }
    getFieldIndexes(t, e) {
        return xr.resolve([]);
    }
    getNextCollectionGroupToUpdate(t) {
        return xr.resolve(null);
    }
    getMinOffset(t, e) {
        return xr.resolve(br.min());
    }
    getMinOffsetFromCollectionGroup(t, e) {
        return xr.resolve(br.min());
    }
    updateCollectionGroup(t, e, n) {
        return xr.resolve();
    }
    updateIndexEntries(t, e) {
        return xr.resolve();
    }
}
class kc {
    constructor() {
        this.index = {};
    }
    add(t) {
        const e = t.lastSegment(),
            n = t.popLast(),
            s = this.index[e] || new Yi(ur.comparator),
            r = !s.has(n);
        return (this.index[e] = s.add(n)), r;
    }
    has(t) {
        const e = t.lastSegment(),
            n = t.popLast(),
            s = this.index[e];
        return s && s.has(n);
    }
    getEntries(t) {
        return (this.index[t] || new Yi(ur.comparator)).toArray();
    }
}
const Rc = new Uint8Array(0);
class Lc {
    constructor(t, e) {
        (this.user = t),
            (this.databaseId = e),
            (this.Ye = new kc()),
            (this.Xe = new fa(
                (t) => io(t),
                (t, e) => oo(t, e)
            )),
            (this.uid = t.uid || "");
    }
    addToCollectionParentIndex(t, e) {
        if (!this.Ye.has(e)) {
            const n = e.lastSegment(),
                s = e.popLast();
            t.addOnCommittedListener(() => {
                this.Ye.add(e);
            });
            const r = { collectionId: n, parent: mu(s) };
            return Mc(t).put(r);
        }
        return xr.resolve();
    }
    getCollectionParents(t, e) {
        const n = [],
            s = IDBKeyRange.bound([e, ""], [rr(e), ""], !1, !0);
        return Mc(t)
            .W(s)
            .next((t) => {
                for (const s of t) {
                    if (s.collectionId !== e) break;
                    n.push(yu(s.parent));
                }
                return n;
            });
    }
    addFieldIndex(t, e) {
        const n = Oc(t),
            s = (function (t) {
                return {
                    indexId: t.indexId,
                    collectionGroup: t.collectionGroup,
                    fields: t.fields.map((t) => [
                        t.fieldPath.canonicalString(),
                        t.kind,
                    ]),
                };
            })(e);
        delete s.indexId;
        const r = n.add(s);
        if (e.indexState) {
            const n = Vc(t);
            return r.next((t) => {
                n.put(
                    rc(
                        t,
                        this.user,
                        e.indexState.sequenceNumber,
                        e.indexState.offset
                    )
                );
            });
        }
        return r.next();
    }
    deleteFieldIndex(t, e) {
        const n = Oc(t),
            s = Vc(t),
            r = Fc(t);
        return n
            .delete(e.indexId)
            .next(() =>
                s.delete(
                    IDBKeyRange.bound([e.indexId], [e.indexId + 1], !1, !0)
                )
            )
            .next(() =>
                r.delete(
                    IDBKeyRange.bound([e.indexId], [e.indexId + 1], !1, !0)
                )
            );
    }
    getDocumentsMatchingTarget(t, e) {
        const n = Fc(t);
        let s = !0;
        const r = new Map();
        return xr
            .forEach(this.Ze(e), (e) =>
                this.tn(t, e).next((t) => {
                    s && (s = !!t), r.set(e, t);
                })
            )
            .next(() => {
                if (s) {
                    let t = Sa();
                    const s = [];
                    return xr
                        .forEach(r, (r, i) => {
                            var o;
                            Ms(
                                "IndexedDbIndexManager",
                                `Using index ${
                                    ((o = r),
                                    `id=${o.indexId}|cg=${
                                        o.collectionGroup
                                    }|f=${o.fields
                                        .map((t) => `${t.fieldPath}:${t.kind}`)
                                        .join(",")}`)
                                } to execute ${io(e)}`
                            );
                            const a = (function (t, e) {
                                    const n = fr(e);
                                    if (void 0 === n) return null;
                                    for (const e of uo(t, n.fieldPath))
                                        switch (e.op) {
                                            case "array-contains-any":
                                                return (
                                                    e.value.arrayValue.values ||
                                                    []
                                                );
                                            case "array-contains":
                                                return [e.value];
                                        }
                                    return null;
                                })(i, r),
                                u = (function (t, e) {
                                    const n = new Map();
                                    for (const s of mr(e))
                                        for (const e of uo(t, s.fieldPath))
                                            switch (e.op) {
                                                case "==":
                                                case "in":
                                                    n.set(
                                                        s.fieldPath.canonicalString(),
                                                        e.value
                                                    );
                                                    break;
                                                case "not-in":
                                                case "!=":
                                                    return (
                                                        n.set(
                                                            s.fieldPath.canonicalString(),
                                                            e.value
                                                        ),
                                                        Array.from(n.values())
                                                    );
                                            }
                                    return null;
                                })(i, r),
                                c = (function (t, e) {
                                    const n = [];
                                    let s = !0;
                                    for (const r of mr(e)) {
                                        const e =
                                            0 === r.kind
                                                ? co(t, r.fieldPath, t.startAt)
                                                : ho(t, r.fieldPath, t.startAt);
                                        n.push(e.value), s && (s = e.inclusive);
                                    }
                                    return new Ti(n, s);
                                })(i, r),
                                h = (function (t, e) {
                                    const n = [];
                                    let s = !0;
                                    for (const r of mr(e)) {
                                        const e =
                                            0 === r.kind
                                                ? ho(t, r.fieldPath, t.endAt)
                                                : co(t, r.fieldPath, t.endAt);
                                        n.push(e.value), s && (s = e.inclusive);
                                    }
                                    return new Ti(n, s);
                                })(i, r),
                                l = this.en(r, i, c),
                                d = this.en(r, i, h),
                                f = this.nn(r, i, u),
                                m = this.sn(
                                    r.indexId,
                                    a,
                                    l,
                                    c.inclusive,
                                    d,
                                    h.inclusive,
                                    f
                                );
                            return xr.forEach(m, (r) =>
                                n.J(r, e.limit).next((e) => {
                                    e.forEach((e) => {
                                        const n = lr.fromSegments(
                                            e.documentKey
                                        );
                                        t.has(n) || ((t = t.add(n)), s.push(n));
                                    });
                                })
                            );
                        })
                        .next(() => s);
                }
                return xr.resolve(null);
            });
    }
    Ze(t) {
        let e = this.Xe.get(t);
        return (
            e ||
            ((e =
                0 === t.filters.length
                    ? [t]
                    : Ec(Ai.create(t.filters, "and")).map((e) =>
                          ro(
                              t.path,
                              t.collectionGroup,
                              t.orderBy,
                              e.getFilters(),
                              t.limit,
                              t.startAt,
                              t.endAt
                          )
                      )),
            this.Xe.set(t, e),
            e)
        );
    }
    sn(t, e, n, s, r, i, o) {
        const a = (null != e ? e.length : 1) * Math.max(n.length, r.length),
            u = a / (null != e ? e.length : 1),
            c = [];
        for (let h = 0; h < a; ++h) {
            const a = e ? this.rn(e[h / u]) : Rc,
                l = this.on(t, a, n[h % u], s),
                d = this.un(t, a, r[h % u], i),
                f = o.map((e) => this.on(t, a, e, !0));
            c.push(...this.createRange(l, d, f));
        }
        return c;
    }
    on(t, e, n, s) {
        const r = new yc(t, lr.empty(), e, n);
        return s ? r : r.Ue();
    }
    un(t, e, n, s) {
        const r = new yc(t, lr.empty(), e, n);
        return s ? r.Ue() : r;
    }
    tn(t, e) {
        const n = new Ic(e),
            s =
                null != e.collectionGroup
                    ? e.collectionGroup
                    : e.path.lastSegment();
        return this.getFieldIndexes(t, s).next((t) => {
            let e = null;
            for (const s of t)
                n.je(s) && (!e || s.fields.length > e.fields.length) && (e = s);
            return e;
        });
    }
    getIndexType(t, e) {
        let n = 2;
        const s = this.Ze(e);
        return xr
            .forEach(s, (e) =>
                this.tn(t, e).next((t) => {
                    t
                        ? 0 !== n &&
                          t.fields.length <
                              (function (t) {
                                  let e = new Yi(hr.comparator),
                                      n = !1;
                                  for (const s of t.filters)
                                      for (const t of s.getFlattenedFilters())
                                          t.field.isKeyField() ||
                                              ("array-contains" === t.op ||
                                              "array-contains-any" === t.op
                                                  ? (n = !0)
                                                  : (e = e.add(t.field)));
                                  for (const n of t.orderBy)
                                      n.field.isKeyField() ||
                                          (e = e.add(n.field));
                                  return e.size + (n ? 1 : 0);
                              })(e) &&
                          (n = 1)
                        : (n = 0);
                })
            )
            .next(() =>
                (function (t) {
                    return null !== t.limit;
                })(e) &&
                s.length > 1 &&
                2 === n
                    ? 1
                    : n
            );
    }
    cn(t, e) {
        const n = new pc();
        for (const s of mr(t)) {
            const t = e.data.field(s.fieldPath);
            if (null == t) return null;
            const r = n.qe(s.kind);
            hc.Ie.ue(t, r);
        }
        return n.Fe();
    }
    rn(t) {
        const e = new pc();
        return hc.Ie.ue(t, e.qe(0)), e.Fe();
    }
    an(t, e) {
        const n = new pc();
        return (
            hc.Ie.ue(
                li(this.databaseId, e),
                n.qe(
                    (function (t) {
                        const e = mr(t);
                        return 0 === e.length ? 0 : e[e.length - 1].kind;
                    })(t)
                )
            ),
            n.Fe()
        );
    }
    nn(t, e, n) {
        if (null === n) return [];
        let s = [];
        s.push(new pc());
        let r = 0;
        for (const i of mr(t)) {
            const t = n[r++];
            for (const n of s)
                if (this.hn(e, i.fieldPath) && fi(t)) s = this.ln(s, i, t);
                else {
                    const e = n.qe(i.kind);
                    hc.Ie.ue(t, e);
                }
        }
        return this.fn(s);
    }
    en(t, e, n) {
        return this.nn(t, e, n.position);
    }
    fn(t) {
        const e = [];
        for (let n = 0; n < t.length; ++n) e[n] = t[n].Fe();
        return e;
    }
    ln(t, e, n) {
        const s = [...t],
            r = [];
        for (const t of n.arrayValue.values || [])
            for (const n of s) {
                const s = new pc();
                s.seed(n.Fe()), hc.Ie.ue(t, s.qe(e.kind)), r.push(s);
            }
        return r;
    }
    hn(t, e) {
        return !!t.filters.find(
            (t) =>
                t instanceof Di &&
                t.field.isEqual(e) &&
                ("in" === t.op || "not-in" === t.op)
        );
    }
    getFieldIndexes(t, e) {
        const n = Oc(t),
            s = Vc(t);
        return (
            e ? n.W("collectionGroupIndex", IDBKeyRange.bound(e, e)) : n.W()
        ).next((t) => {
            const e = [];
            return xr
                .forEach(t, (t) =>
                    s.get([t.indexId, this.uid]).next((n) => {
                        e.push(
                            (function (t, e) {
                                const n = e
                                        ? new wr(
                                              e.sequenceNumber,
                                              new br(
                                                  Xu(e.readTime),
                                                  new lr(yu(e.documentKey)),
                                                  e.largestBatchId
                                              )
                                          )
                                        : wr.empty(),
                                    s = t.fields.map(
                                        ([t, e]) =>
                                            new pr(hr.fromServerFormat(t), e)
                                    );
                                return new dr(
                                    t.indexId,
                                    t.collectionGroup,
                                    s,
                                    n
                                );
                            })(t, n)
                        );
                    })
                )
                .next(() => e);
        });
    }
    getNextCollectionGroupToUpdate(t) {
        return this.getFieldIndexes(t).next((t) =>
            0 === t.length
                ? null
                : (t.sort((t, e) => {
                      const n =
                          t.indexState.sequenceNumber -
                          e.indexState.sequenceNumber;
                      return 0 !== n
                          ? n
                          : nr(t.collectionGroup, e.collectionGroup);
                  }),
                  t[0].collectionGroup)
        );
    }
    updateCollectionGroup(t, e, n) {
        const s = Oc(t),
            r = Vc(t);
        return this.dn(t).next((t) =>
            s
                .W("collectionGroupIndex", IDBKeyRange.bound(e, e))
                .next((e) =>
                    xr.forEach(e, (e) => r.put(rc(e.indexId, this.user, t, n)))
                )
        );
    }
    updateIndexEntries(t, e) {
        const n = new Map();
        return xr.forEach(e, (e, s) => {
            const r = n.get(e.collectionGroup);
            return (
                r ? xr.resolve(r) : this.getFieldIndexes(t, e.collectionGroup)
            ).next(
                (r) => (
                    n.set(e.collectionGroup, r),
                    xr.forEach(r, (n) =>
                        this._n(t, e, n).next((e) => {
                            const r = this.wn(s, n);
                            return e.isEqual(r)
                                ? xr.resolve()
                                : this.mn(t, s, n, e, r);
                        })
                    )
                )
            );
        });
    }
    gn(t, e, n, s) {
        return Fc(t).put({
            indexId: s.indexId,
            uid: this.uid,
            arrayValue: s.arrayValue,
            directionalValue: s.directionalValue,
            orderedDocumentKey: this.an(n, e.key),
            documentKey: e.key.path.toArray(),
        });
    }
    yn(t, e, n, s) {
        return Fc(t).delete([
            s.indexId,
            this.uid,
            s.arrayValue,
            s.directionalValue,
            this.an(n, e.key),
            e.key.path.toArray(),
        ]);
    }
    _n(t, e, n) {
        const s = Fc(t);
        let r = new Yi(wc);
        return s
            .Z(
                {
                    index: "documentKeyIndex",
                    range: IDBKeyRange.only([
                        n.indexId,
                        this.uid,
                        this.an(n, e),
                    ]),
                },
                (t, s) => {
                    r = r.add(
                        new yc(n.indexId, e, s.arrayValue, s.directionalValue)
                    );
                }
            )
            .next(() => r);
    }
    wn(t, e) {
        let n = new Yi(wc);
        const s = this.cn(e, t);
        if (null == s) return n;
        const r = fr(e);
        if (null != r) {
            const i = t.data.field(r.fieldPath);
            if (fi(i))
                for (const r of i.arrayValue.values || [])
                    n = n.add(new yc(e.indexId, t.key, this.rn(r), s));
        } else n = n.add(new yc(e.indexId, t.key, Rc, s));
        return n;
    }
    mn(t, e, n, s, r) {
        Ms(
            "IndexedDbIndexManager",
            "Updating index entries for document '%s'",
            e.key
        );
        const i = [];
        return (
            (function (t, e, n, s, r) {
                const i = t.getIterator(),
                    o = e.getIterator();
                let a = Ji(i),
                    u = Ji(o);
                for (; a || u; ) {
                    let t = !1,
                        e = !1;
                    if (a && u) {
                        const s = n(a, u);
                        s < 0 ? (e = !0) : s > 0 && (t = !0);
                    } else null != a ? (e = !0) : (t = !0);
                    t
                        ? (s(u), (u = Ji(o)))
                        : e
                        ? (r(a), (a = Ji(i)))
                        : ((a = Ji(i)), (u = Ji(o)));
                }
            })(
                s,
                r,
                wc,
                (s) => {
                    i.push(this.gn(t, e, n, s));
                },
                (s) => {
                    i.push(this.yn(t, e, n, s));
                }
            ),
            xr.waitFor(i)
        );
    }
    dn(t) {
        let e = 1;
        return Vc(t)
            .Z(
                {
                    index: "sequenceNumberIndex",
                    reverse: !0,
                    range: IDBKeyRange.upperBound([
                        this.uid,
                        Number.MAX_SAFE_INTEGER,
                    ]),
                },
                (t, n, s) => {
                    s.done(), (e = n.sequenceNumber + 1);
                }
            )
            .next(() => e);
    }
    createRange(t, e, n) {
        n = n
            .sort((t, e) => wc(t, e))
            .filter((t, e, n) => !e || 0 !== wc(t, n[e - 1]));
        const s = [];
        s.push(t);
        for (const r of n) {
            const n = wc(r, t),
                i = wc(r, e);
            if (0 === n) s[0] = t.Ue();
            else if (n > 0 && i < 0) s.push(r), s.push(r.Ue());
            else if (i > 0) break;
        }
        s.push(e);
        const r = [];
        for (let t = 0; t < s.length; t += 2) {
            if (this.pn(s[t], s[t + 1])) return [];
            const e = [
                    s[t].indexId,
                    this.uid,
                    s[t].arrayValue,
                    s[t].directionalValue,
                    Rc,
                    [],
                ],
                n = [
                    s[t + 1].indexId,
                    this.uid,
                    s[t + 1].arrayValue,
                    s[t + 1].directionalValue,
                    Rc,
                    [],
                ];
            r.push(IDBKeyRange.bound(e, n));
        }
        return r;
    }
    pn(t, e) {
        return wc(t, e) > 0;
    }
    getMinOffsetFromCollectionGroup(t, e) {
        return this.getFieldIndexes(t, e).next(Pc);
    }
    getMinOffset(t, e) {
        return xr
            .mapArray(this.Ze(e), (e) => this.tn(t, e).next((t) => t || Ps()))
            .next(Pc);
    }
}
function Mc(t) {
    return Gu(t, "collectionParents");
}
function Fc(t) {
    return Gu(t, "indexEntries");
}
function Oc(t) {
    return Gu(t, "indexConfiguration");
}
function Vc(t) {
    return Gu(t, "indexState");
}
function Pc(t) {
    qs(0 !== t.length);
    let e = t[0].indexState.offset,
        n = e.largestBatchId;
    for (let s = 1; s < t.length; s++) {
        const r = t[s].indexState.offset;
        Er(r, e) < 0 && (e = r), n < r.largestBatchId && (n = r.largestBatchId);
    }
    return new br(e.readTime, e.documentKey, n);
}
const qc = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0,
};
class Bc {
    constructor(t, e, n) {
        (this.cacheSizeCollectionThreshold = t),
            (this.percentileToCollect = e),
            (this.maximumSequenceNumbersToCollect = n);
    }
    static withCacheSize(t) {
        return new Bc(
            t,
            Bc.DEFAULT_COLLECTION_PERCENTILE,
            Bc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
        );
    }
}
function Uc(t, e, n) {
    const s = t.store("mutations"),
        r = t.store("documentMutations"),
        i = [],
        o = IDBKeyRange.only(n.batchId);
    let a = 0;
    const u = s.Z({ range: o }, (t, e, n) => (a++, n.delete()));
    i.push(
        u.next(() => {
            qs(1 === a);
        })
    );
    const c = [];
    for (const t of n.mutations) {
        const s = Iu(e, t.key.path, n.batchId);
        i.push(r.delete(s)), c.push(t.key);
    }
    return xr.waitFor(i).next(() => c);
}
function Gc(t) {
    if (!t) return 0;
    let e;
    if (t.document) e = t.document;
    else if (t.unknownDocument) e = t.unknownDocument;
    else {
        if (!t.noDocument) throw Ps();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
}
(Bc.DEFAULT_COLLECTION_PERCENTILE = 10),
    (Bc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
    (Bc.DEFAULT = new Bc(
        41943040,
        Bc.DEFAULT_COLLECTION_PERCENTILE,
        Bc.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT
    )),
    (Bc.DISABLED = new Bc(-1, 0, 0));
class Kc {
    constructor(t, e, n, s) {
        (this.userId = t),
            (this.yt = e),
            (this.indexManager = n),
            (this.referenceDelegate = s),
            (this.In = {});
    }
    static re(t, e, n, s) {
        qs("" !== t.uid);
        const r = t.isAuthenticated() ? t.uid : "";
        return new Kc(r, e, n, s);
    }
    checkEmpty(t) {
        let e = !0;
        const n = IDBKeyRange.bound(
            [this.userId, Number.NEGATIVE_INFINITY],
            [this.userId, Number.POSITIVE_INFINITY]
        );
        return $c(t)
            .Z({ index: "userMutationsIndex", range: n }, (t, n, s) => {
                (e = !1), s.done();
            })
            .next(() => e);
    }
    addMutationBatch(t, e, n, s) {
        const r = Qc(t),
            i = $c(t);
        return i.add({}).next((o) => {
            qs("number" == typeof o);
            const a = new Ku(o, e, n, s),
                u = (function (t, e, n) {
                    const s = n.baseMutations.map((e) => tu(t.ie, e)),
                        r = n.mutations.map((e) => tu(t.ie, e));
                    return {
                        userId: e,
                        batchId: n.batchId,
                        localWriteTimeMs: n.localWriteTime.toMillis(),
                        baseMutations: s,
                        mutations: r,
                    };
                })(this.yt, this.userId, a),
                c = [];
            let h = new Yi((t, e) =>
                nr(t.canonicalString(), e.canonicalString())
            );
            for (const t of s) {
                const e = Iu(this.userId, t.key.path, o);
                (h = h.add(t.key.path.popLast())),
                    c.push(i.put(u)),
                    c.push(r.put(e, bu));
            }
            return (
                h.forEach((e) => {
                    c.push(this.indexManager.addToCollectionParentIndex(t, e));
                }),
                t.addOnCommittedListener(() => {
                    this.In[o] = a.keys();
                }),
                xr.waitFor(c).next(() => a)
            );
        });
    }
    lookupMutationBatch(t, e) {
        return $c(t)
            .get(e)
            .next((t) =>
                t ? (qs(t.userId === this.userId), Ju(this.yt, t)) : null
            );
    }
    Tn(t, e) {
        return this.In[e]
            ? xr.resolve(this.In[e])
            : this.lookupMutationBatch(t, e).next((t) => {
                  if (t) {
                      const n = t.keys();
                      return (this.In[e] = n), n;
                  }
                  return null;
              });
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1,
            s = IDBKeyRange.lowerBound([this.userId, n]);
        let r = null;
        return $c(t)
            .Z({ index: "userMutationsIndex", range: s }, (t, e, s) => {
                e.userId === this.userId &&
                    (qs(e.batchId >= n), (r = Ju(this.yt, e))),
                    s.done();
            })
            .next(() => r);
    }
    getHighestUnacknowledgedBatchId(t) {
        const e = IDBKeyRange.upperBound([
            this.userId,
            Number.POSITIVE_INFINITY,
        ]);
        let n = -1;
        return $c(t)
            .Z(
                { index: "userMutationsIndex", range: e, reverse: !0 },
                (t, e, s) => {
                    (n = e.batchId), s.done();
                }
            )
            .next(() => n);
    }
    getAllMutationBatches(t) {
        const e = IDBKeyRange.bound(
            [this.userId, -1],
            [this.userId, Number.POSITIVE_INFINITY]
        );
        return $c(t)
            .W("userMutationsIndex", e)
            .next((t) => t.map((t) => Ju(this.yt, t)));
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        const n = vu(this.userId, e.path),
            s = IDBKeyRange.lowerBound(n),
            r = [];
        return Qc(t)
            .Z({ range: s }, (n, s, i) => {
                const [o, a, u] = n,
                    c = yu(a);
                if (o === this.userId && e.path.isEqual(c))
                    return $c(t)
                        .get(u)
                        .next((t) => {
                            if (!t) throw Ps();
                            qs(t.userId === this.userId),
                                r.push(Ju(this.yt, t));
                        });
                i.done();
            })
            .next(() => r);
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new Yi(nr);
        const s = [];
        return (
            e.forEach((e) => {
                const r = vu(this.userId, e.path),
                    i = IDBKeyRange.lowerBound(r),
                    o = Qc(t).Z({ range: i }, (t, s, r) => {
                        const [i, o, a] = t,
                            u = yu(o);
                        i === this.userId && e.path.isEqual(u)
                            ? (n = n.add(a))
                            : r.done();
                    });
                s.push(o);
            }),
            xr.waitFor(s).next(() => this.En(t, n))
        );
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        const n = e.path,
            s = n.length + 1,
            r = vu(this.userId, n),
            i = IDBKeyRange.lowerBound(r);
        let o = new Yi(nr);
        return Qc(t)
            .Z({ range: i }, (t, e, r) => {
                const [i, a, u] = t,
                    c = yu(a);
                i === this.userId && n.isPrefixOf(c)
                    ? c.length === s && (o = o.add(u))
                    : r.done();
            })
            .next(() => this.En(t, o));
    }
    En(t, e) {
        const n = [],
            s = [];
        return (
            e.forEach((e) => {
                s.push(
                    $c(t)
                        .get(e)
                        .next((t) => {
                            if (null === t) throw Ps();
                            qs(t.userId === this.userId),
                                n.push(Ju(this.yt, t));
                        })
                );
            }),
            xr.waitFor(s).next(() => n)
        );
    }
    removeMutationBatch(t, e) {
        return Uc(t.se, this.userId, e).next(
            (n) => (
                t.addOnCommittedListener(() => {
                    this.An(e.batchId);
                }),
                xr.forEach(n, (e) =>
                    this.referenceDelegate.markPotentiallyOrphaned(t, e)
                )
            )
        );
    }
    An(t) {
        delete this.In[t];
    }
    performConsistencyCheck(t) {
        return this.checkEmpty(t).next((e) => {
            if (!e) return xr.resolve();
            const n = IDBKeyRange.lowerBound([this.userId]),
                s = [];
            return Qc(t)
                .Z({ range: n }, (t, e, n) => {
                    if (t[0] === this.userId) {
                        const e = yu(t[1]);
                        s.push(e);
                    } else n.done();
                })
                .next(() => {
                    qs(0 === s.length);
                });
        });
    }
    containsKey(t, e) {
        return jc(t, this.userId, e);
    }
    Rn(t) {
        return zc(t)
            .get(this.userId)
            .next(
                (t) =>
                    t || {
                        userId: this.userId,
                        lastAcknowledgedBatchId: -1,
                        lastStreamToken: "",
                    }
            );
    }
}
function jc(t, e, n) {
    const s = vu(e, n.path),
        r = s[1],
        i = IDBKeyRange.lowerBound(s);
    let o = !1;
    return Qc(t)
        .Z({ range: i, X: !0 }, (t, n, s) => {
            const [i, a, u] = t;
            i === e && a === r && (o = !0), s.done();
        })
        .next(() => o);
}
function $c(t) {
    return Gu(t, "mutations");
}
function Qc(t) {
    return Gu(t, "documentMutations");
}
function zc(t) {
    return Gu(t, "mutationQueues");
}
class Hc {
    constructor(t) {
        this.bn = t;
    }
    next() {
        return (this.bn += 2), this.bn;
    }
    static Pn() {
        return new Hc(0);
    }
    static vn() {
        return new Hc(-1);
    }
}
class Wc {
    constructor(t, e) {
        (this.referenceDelegate = t), (this.yt = e);
    }
    allocateTargetId(t) {
        return this.Vn(t).next((e) => {
            const n = new Hc(e.highestTargetId);
            return (
                (e.highestTargetId = n.next()),
                this.Sn(t, e).next(() => e.highestTargetId)
            );
        });
    }
    getLastRemoteSnapshotVersion(t) {
        return this.Vn(t).next((t) =>
            or.fromTimestamp(
                new ir(
                    t.lastRemoteSnapshotVersion.seconds,
                    t.lastRemoteSnapshotVersion.nanoseconds
                )
            )
        );
    }
    getHighestSequenceNumber(t) {
        return this.Vn(t).next((t) => t.highestListenSequenceNumber);
    }
    setTargetsMetadata(t, e, n) {
        return this.Vn(t).next(
            (s) => (
                (s.highestListenSequenceNumber = e),
                n && (s.lastRemoteSnapshotVersion = n.toTimestamp()),
                e > s.highestListenSequenceNumber &&
                    (s.highestListenSequenceNumber = e),
                this.Sn(t, s)
            )
        );
    }
    addTargetData(t, e) {
        return this.Dn(t, e).next(() =>
            this.Vn(t).next(
                (n) => ((n.targetCount += 1), this.Cn(e, n), this.Sn(t, n))
            )
        );
    }
    updateTargetData(t, e) {
        return this.Dn(t, e);
    }
    removeTargetData(t, e) {
        return this.removeMatchingKeysForTargetId(t, e.targetId)
            .next(() => Yc(t).delete(e.targetId))
            .next(() => this.Vn(t))
            .next(
                (e) => (
                    qs(e.targetCount > 0), (e.targetCount -= 1), this.Sn(t, e)
                )
            );
    }
    removeTargets(t, e, n) {
        let s = 0;
        const r = [];
        return Yc(t)
            .Z((i, o) => {
                const a = Zu(o);
                a.sequenceNumber <= e &&
                    null === n.get(a.targetId) &&
                    (s++, r.push(this.removeTargetData(t, a)));
            })
            .next(() => xr.waitFor(r))
            .next(() => s);
    }
    forEachTarget(t, e) {
        return Yc(t).Z((t, n) => {
            const s = Zu(n);
            e(s);
        });
    }
    Vn(t) {
        return Xc(t)
            .get("targetGlobalKey")
            .next((t) => (qs(null !== t), t));
    }
    Sn(t, e) {
        return Xc(t).put("targetGlobalKey", e);
    }
    Dn(t, e) {
        return Yc(t).put(tc(this.yt, e));
    }
    Cn(t, e) {
        let n = !1;
        return (
            t.targetId > e.highestTargetId &&
                ((e.highestTargetId = t.targetId), (n = !0)),
            t.sequenceNumber > e.highestListenSequenceNumber &&
                ((e.highestListenSequenceNumber = t.sequenceNumber), (n = !0)),
            n
        );
    }
    getTargetCount(t) {
        return this.Vn(t).next((t) => t.targetCount);
    }
    getTargetData(t, e) {
        const n = io(e),
            s = IDBKeyRange.bound(
                [n, Number.NEGATIVE_INFINITY],
                [n, Number.POSITIVE_INFINITY]
            );
        let r = null;
        return Yc(t)
            .Z({ range: s, index: "queryTargetsIndex" }, (t, n, s) => {
                const i = Zu(n);
                oo(e, i.target) && ((r = i), s.done());
            })
            .next(() => r);
    }
    addMatchingKeys(t, e, n) {
        const s = [],
            r = Jc(t);
        return (
            e.forEach((e) => {
                const i = mu(e.path);
                s.push(r.put({ targetId: n, path: i })),
                    s.push(this.referenceDelegate.addReference(t, n, e));
            }),
            xr.waitFor(s)
        );
    }
    removeMatchingKeys(t, e, n) {
        const s = Jc(t);
        return xr.forEach(e, (e) => {
            const r = mu(e.path);
            return xr.waitFor([
                s.delete([n, r]),
                this.referenceDelegate.removeReference(t, n, e),
            ]);
        });
    }
    removeMatchingKeysForTargetId(t, e) {
        const n = Jc(t),
            s = IDBKeyRange.bound([e], [e + 1], !1, !0);
        return n.delete(s);
    }
    getMatchingKeysForTargetId(t, e) {
        const n = IDBKeyRange.bound([e], [e + 1], !1, !0),
            s = Jc(t);
        let r = Sa();
        return s
            .Z({ range: n, X: !0 }, (t, e, n) => {
                const s = yu(t[1]),
                    i = new lr(s);
                r = r.add(i);
            })
            .next(() => r);
    }
    containsKey(t, e) {
        const n = mu(e.path),
            s = IDBKeyRange.bound([n], [rr(n)], !1, !0);
        let r = 0;
        return Jc(t)
            .Z(
                { index: "documentTargetsIndex", X: !0, range: s },
                ([t, e], n, s) => {
                    0 !== t && (r++, s.done());
                }
            )
            .next(() => r > 0);
    }
    ne(t, e) {
        return Yc(t)
            .get(e)
            .next((t) => (t ? Zu(t) : null));
    }
}
function Yc(t) {
    return Gu(t, "targets");
}
function Xc(t) {
    return Gu(t, "targetGlobal");
}
function Jc(t) {
    return Gu(t, "targetDocuments");
}
function Zc([t, e], [n, s]) {
    const r = nr(t, n);
    return 0 === r ? nr(e, s) : r;
}
class th {
    constructor(t) {
        (this.xn = t), (this.buffer = new Yi(Zc)), (this.Nn = 0);
    }
    kn() {
        return ++this.Nn;
    }
    On(t) {
        const e = [t, this.kn()];
        if (this.buffer.size < this.xn) this.buffer = this.buffer.add(e);
        else {
            const t = this.buffer.last();
            Zc(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e));
        }
    }
    get maxValue() {
        return this.buffer.last()[0];
    }
}
class eh {
    constructor(t, e, n) {
        (this.garbageCollector = t),
            (this.asyncQueue = e),
            (this.localStore = n),
            (this.Mn = null);
    }
    start() {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
            this.Fn(6e4);
    }
    stop() {
        this.Mn && (this.Mn.cancel(), (this.Mn = null));
    }
    get started() {
        return null !== this.Mn;
    }
    Fn(t) {
        Ms("LruGarbageCollector", `Garbage collection scheduled in ${t}ms`),
            (this.Mn = this.asyncQueue.enqueueAfterDelay(
                "lru_garbage_collection",
                t,
                async () => {
                    this.Mn = null;
                    try {
                        await this.localStore.collectGarbage(
                            this.garbageCollector
                        );
                    } catch (t) {
                        kr(t)
                            ? Ms(
                                  "LruGarbageCollector",
                                  "Ignoring IndexedDB error during garbage collection: ",
                                  t
                              )
                            : await _r(t);
                    }
                    await this.Fn(3e5);
                }
            ));
    }
}
class nh {
    constructor(t, e) {
        (this.$n = t), (this.params = e);
    }
    calculateTargetCount(t, e) {
        return this.$n.Bn(t).next((t) => Math.floor((e / 100) * t));
    }
    nthSequenceNumber(t, e) {
        if (0 === e) return xr.resolve(Pr.at);
        const n = new th(e);
        return this.$n
            .forEachTarget(t, (t) => n.On(t.sequenceNumber))
            .next(() => this.$n.Ln(t, (t) => n.On(t)))
            .next(() => n.maxValue);
    }
    removeTargets(t, e, n) {
        return this.$n.removeTargets(t, e, n);
    }
    removeOrphanedDocuments(t, e) {
        return this.$n.removeOrphanedDocuments(t, e);
    }
    collect(t, e) {
        return -1 === this.params.cacheSizeCollectionThreshold
            ? (Ms(
                  "LruGarbageCollector",
                  "Garbage collection skipped; disabled"
              ),
              xr.resolve(qc))
            : this.getCacheSize(t).next((n) =>
                  n < this.params.cacheSizeCollectionThreshold
                      ? (Ms(
                            "LruGarbageCollector",
                            `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`
                        ),
                        qc)
                      : this.qn(t, e)
              );
    }
    getCacheSize(t) {
        return this.$n.getCacheSize(t);
    }
    qn(t, e) {
        let n, s, r, i, o, a, u;
        const c = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect)
            .next(
                (e) => (
                    e > this.params.maximumSequenceNumbersToCollect
                        ? (Ms(
                              "LruGarbageCollector",
                              `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`
                          ),
                          (s = this.params.maximumSequenceNumbersToCollect))
                        : (s = e),
                    (i = Date.now()),
                    this.nthSequenceNumber(t, s)
                )
            )
            .next(
                (s) => ((n = s), (o = Date.now()), this.removeTargets(t, n, e))
            )
            .next(
                (e) => (
                    (r = e),
                    (a = Date.now()),
                    this.removeOrphanedDocuments(t, n)
                )
            )
            .next(
                (t) => (
                    (u = Date.now()),
                    Rs() <= E.DEBUG &&
                        Ms(
                            "LruGarbageCollector",
                            `LRU Garbage Collection\n\tCounted targets in ${
                                i - c
                            }ms\n\tDetermined least recently used ${s} in ` +
                                (o - i) +
                                "ms\n" +
                                `\tRemoved ${r} targets in ` +
                                (a - o) +
                                "ms\n" +
                                `\tRemoved ${t} documents in ` +
                                (u - a) +
                                "ms\n" +
                                `Total Duration: ${u - c}ms`
                        ),
                    xr.resolve({
                        didRun: !0,
                        sequenceNumbersCollected: s,
                        targetsRemoved: r,
                        documentsRemoved: t,
                    })
                )
            );
    }
}
class sh {
    constructor(t, e) {
        (this.db = t),
            (this.garbageCollector = (function (t, e) {
                return new nh(t, e);
            })(this, e));
    }
    Bn(t) {
        const e = this.Un(t);
        return this.db
            .getTargetCache()
            .getTargetCount(t)
            .next((t) => e.next((e) => t + e));
    }
    Un(t) {
        let e = 0;
        return this.Ln(t, (t) => {
            e++;
        }).next(() => e);
    }
    forEachTarget(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }
    Ln(t, e) {
        return this.Kn(t, (t, n) => e(n));
    }
    addReference(t, e, n) {
        return rh(t, n);
    }
    removeReference(t, e, n) {
        return rh(t, n);
    }
    removeTargets(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }
    markPotentiallyOrphaned(t, e) {
        return rh(t, e);
    }
    Gn(t, e) {
        return (function (t, e) {
            let n = !1;
            return zc(t)
                .tt((s) =>
                    jc(t, s, e).next((t) => (t && (n = !0), xr.resolve(!t)))
                )
                .next(() => n);
        })(t, e);
    }
    removeOrphanedDocuments(t, e) {
        const n = this.db.getRemoteDocumentCache().newChangeBuffer(),
            s = [];
        let r = 0;
        return this.Kn(t, (i, o) => {
            if (o <= e) {
                const e = this.Gn(t, i).next((e) => {
                    if (!e)
                        return (
                            r++,
                            n
                                .getEntry(t, i)
                                .next(
                                    () => (
                                        n.removeEntry(i, or.min()),
                                        Jc(t).delete([0, mu(i.path)])
                                    )
                                )
                        );
                });
                s.push(e);
            }
        })
            .next(() => xr.waitFor(s))
            .next(() => n.apply(t))
            .next(() => r);
    }
    removeTarget(t, e) {
        const n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }
    updateLimboDocument(t, e) {
        return rh(t, e);
    }
    Kn(t, e) {
        const n = Jc(t);
        let s,
            r = Pr.at;
        return n
            .Z(
                { index: "documentTargetsIndex" },
                ([t, n], { path: i, sequenceNumber: o }) => {
                    0 === t
                        ? (r !== Pr.at && e(new lr(yu(s)), r), (r = o), (s = i))
                        : (r = Pr.at);
                }
            )
            .next(() => {
                r !== Pr.at && e(new lr(yu(s)), r);
            });
    }
    getCacheSize(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }
}
function rh(t, e) {
    return Jc(t).put(
        (function (t, e) {
            return { targetId: 0, path: mu(t.path), sequenceNumber: e };
        })(e, t.currentSequenceNumber)
    );
}
class ih {
    constructor() {
        (this.changes = new fa(
            (t) => t.toString(),
            (t, e) => t.isEqual(e)
        )),
            (this.changesApplied = !1);
    }
    addEntry(t) {
        this.assertNotApplied(), this.changes.set(t.key, t);
    }
    removeEntry(t, e) {
        this.assertNotApplied(),
            this.changes.set(t, no.newInvalidDocument(t).setReadTime(e));
    }
    getEntry(t, e) {
        this.assertNotApplied();
        const n = this.changes.get(e);
        return void 0 !== n ? xr.resolve(n) : this.getFromCache(t, e);
    }
    getEntries(t, e) {
        return this.getAllFromCache(t, e);
    }
    apply(t) {
        return (
            this.assertNotApplied(),
            (this.changesApplied = !0),
            this.applyChanges(t)
        );
    }
    assertNotApplied() {}
}
class oh {
    constructor(t) {
        this.yt = t;
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    addEntry(t, e, n) {
        return hh(t).put(n);
    }
    removeEntry(t, e, n) {
        return hh(t).delete(
            (function (t, e) {
                const n = t.path.toArray();
                return [
                    n.slice(0, n.length - 2),
                    n[n.length - 2],
                    Wu(e),
                    n[n.length - 1],
                ];
            })(e, n)
        );
    }
    updateMetadata(t, e) {
        return this.getMetadata(t).next(
            (n) => ((n.byteSize += e), this.Qn(t, n))
        );
    }
    getEntry(t, e) {
        let n = no.newInvalidDocument(e);
        return hh(t)
            .Z(
                { index: "documentKeyIndex", range: IDBKeyRange.only(lh(e)) },
                (t, s) => {
                    n = this.jn(e, s);
                }
            )
            .next(() => n);
    }
    Wn(t, e) {
        let n = { size: 0, document: no.newInvalidDocument(e) };
        return hh(t)
            .Z(
                { index: "documentKeyIndex", range: IDBKeyRange.only(lh(e)) },
                (t, s) => {
                    n = { document: this.jn(e, s), size: Gc(s) };
                }
            )
            .next(() => n);
    }
    getEntries(t, e) {
        let n = ga();
        return this.zn(t, e, (t, e) => {
            const s = this.jn(t, e);
            n = n.insert(t, s);
        }).next(() => n);
    }
    Hn(t, e) {
        let n = ga(),
            s = new zi(lr.comparator);
        return this.zn(t, e, (t, e) => {
            const r = this.jn(t, e);
            (n = n.insert(t, r)), (s = s.insert(t, Gc(e)));
        }).next(() => ({ documents: n, Jn: s }));
    }
    zn(t, e, n) {
        if (e.isEmpty()) return xr.resolve();
        let s = new Yi(fh);
        e.forEach((t) => (s = s.add(t)));
        const r = IDBKeyRange.bound(lh(s.first()), lh(s.last())),
            i = s.getIterator();
        let o = i.getNext();
        return hh(t)
            .Z({ index: "documentKeyIndex", range: r }, (t, e, s) => {
                const r = lr.fromSegments([
                    ...e.prefixPath,
                    e.collectionGroup,
                    e.documentId,
                ]);
                for (; o && fh(o, r) < 0; ) n(o, null), (o = i.getNext());
                o &&
                    o.isEqual(r) &&
                    (n(o, e), (o = i.hasNext() ? i.getNext() : null)),
                    o ? s.j(lh(o)) : s.done();
            })
            .next(() => {
                for (; o; ) n(o, null), (o = i.hasNext() ? i.getNext() : null);
            });
    }
    getDocumentsMatchingQuery(t, e, n, s) {
        const r = e.path,
            i = [
                r.popLast().toArray(),
                r.lastSegment(),
                Wu(n.readTime),
                n.documentKey.path.isEmpty()
                    ? ""
                    : n.documentKey.path.lastSegment(),
            ],
            o = [
                r.popLast().toArray(),
                r.lastSegment(),
                [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
                "",
            ];
        return hh(t)
            .W(IDBKeyRange.bound(i, o, !0))
            .next((t) => {
                let n = ga();
                for (const r of t) {
                    const t = this.jn(
                        lr.fromSegments(
                            r.prefixPath.concat(r.collectionGroup, r.documentId)
                        ),
                        r
                    );
                    t.isFoundDocument() &&
                        (xo(e, t) || s.has(t.key)) &&
                        (n = n.insert(t.key, t));
                }
                return n;
            });
    }
    getAllFromCollectionGroup(t, e, n, s) {
        let r = ga();
        const i = dh(e, n),
            o = dh(e, br.max());
        return hh(t)
            .Z(
                {
                    index: "collectionGroupIndex",
                    range: IDBKeyRange.bound(i, o, !0),
                },
                (t, e, n) => {
                    const i = this.jn(
                        lr.fromSegments(
                            e.prefixPath.concat(e.collectionGroup, e.documentId)
                        ),
                        e
                    );
                    (r = r.insert(i.key, i)), r.size === s && n.done();
                }
            )
            .next(() => r);
    }
    newChangeBuffer(t) {
        return new uh(this, !!t && t.trackRemovals);
    }
    getSize(t) {
        return this.getMetadata(t).next((t) => t.byteSize);
    }
    getMetadata(t) {
        return ch(t)
            .get("remoteDocumentGlobalKey")
            .next((t) => (qs(!!t), t));
    }
    Qn(t, e) {
        return ch(t).put("remoteDocumentGlobalKey", e);
    }
    jn(t, e) {
        if (e) {
            const t = (function (t, e) {
                let n;
                if (e.document)
                    n = Za(t.ie, e.document, !!e.hasCommittedMutations);
                else if (e.noDocument) {
                    const t = lr.fromSegments(e.noDocument.path),
                        s = Xu(e.noDocument.readTime);
                    (n = no.newNoDocument(t, s)),
                        e.hasCommittedMutations && n.setHasCommittedMutations();
                } else {
                    if (!e.unknownDocument) return Ps();
                    {
                        const t = lr.fromSegments(e.unknownDocument.path),
                            s = Xu(e.unknownDocument.version);
                        n = no.newUnknownDocument(t, s);
                    }
                }
                return (
                    e.readTime &&
                        n.setReadTime(
                            (function (t) {
                                const e = new ir(t[0], t[1]);
                                return or.fromTimestamp(e);
                            })(e.readTime)
                        ),
                    n
                );
            })(this.yt, e);
            if (!t.isNoDocument() || !t.version.isEqual(or.min())) return t;
        }
        return no.newInvalidDocument(t);
    }
}
function ah(t) {
    return new oh(t);
}
class uh extends ih {
    constructor(t, e) {
        super(),
            (this.Yn = t),
            (this.trackRemovals = e),
            (this.Xn = new fa(
                (t) => t.toString(),
                (t, e) => t.isEqual(e)
            ));
    }
    applyChanges(t) {
        const e = [];
        let n = 0,
            s = new Yi((t, e) => nr(t.canonicalString(), e.canonicalString()));
        return (
            this.changes.forEach((r, i) => {
                const o = this.Xn.get(r);
                if (
                    (e.push(this.Yn.removeEntry(t, r, o.readTime)),
                    i.isValidDocument())
                ) {
                    const a = Hu(this.Yn.yt, i);
                    s = s.add(r.path.popLast());
                    const u = Gc(a);
                    (n += u - o.size), e.push(this.Yn.addEntry(t, r, a));
                } else if (((n -= o.size), this.trackRemovals)) {
                    const n = Hu(this.Yn.yt, i.convertToNoDocument(or.min()));
                    e.push(this.Yn.addEntry(t, r, n));
                }
            }),
            s.forEach((n) => {
                e.push(this.Yn.indexManager.addToCollectionParentIndex(t, n));
            }),
            e.push(this.Yn.updateMetadata(t, n)),
            xr.waitFor(e)
        );
    }
    getFromCache(t, e) {
        return this.Yn.Wn(t, e).next(
            (t) => (
                this.Xn.set(e, { size: t.size, readTime: t.document.readTime }),
                t.document
            )
        );
    }
    getAllFromCache(t, e) {
        return this.Yn.Hn(t, e).next(
            ({ documents: t, Jn: e }) => (
                e.forEach((e, n) => {
                    this.Xn.set(e, { size: n, readTime: t.get(e).readTime });
                }),
                t
            )
        );
    }
}
function ch(t) {
    return Gu(t, "remoteDocumentGlobal");
}
function hh(t) {
    return Gu(t, "remoteDocumentsV14");
}
function lh(t) {
    const e = t.path.toArray();
    return [e.slice(0, e.length - 2), e[e.length - 2], e[e.length - 1]];
}
function dh(t, e) {
    const n = e.documentKey.path.toArray();
    return [
        t,
        Wu(e.readTime),
        n.slice(0, n.length - 2),
        n.length > 0 ? n[n.length - 1] : "",
    ];
}
function fh(t, e) {
    const n = t.path.toArray(),
        s = e.path.toArray();
    let r = 0;
    for (let t = 0; t < n.length - 2 && t < s.length - 2; ++t)
        if (((r = nr(n[t], s[t])), r)) return r;
    return (
        (r = nr(n.length, s.length)),
        r ||
            ((r = nr(n[n.length - 2], s[s.length - 2])),
            r || nr(n[n.length - 1], s[s.length - 1]))
    );
}
class mh {
    constructor(t, e) {
        (this.overlayedDocument = t), (this.mutatedFields = e);
    }
}
class gh {
    constructor(t, e, n, s) {
        (this.remoteDocumentCache = t),
            (this.mutationQueue = e),
            (this.documentOverlayCache = n),
            (this.indexManager = s);
    }
    getDocument(t, e) {
        let n = null;
        return this.documentOverlayCache
            .getOverlay(t, e)
            .next((s) => ((n = s), this.remoteDocumentCache.getEntry(t, e)))
            .next(
                (t) => (
                    null !== n && Jo(n.mutation, t, Zi.empty(), ir.now()), t
                )
            );
    }
    getDocuments(t, e) {
        return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) =>
                this.getLocalViewOfDocuments(t, e, Sa()).next(() => e)
            );
    }
    getLocalViewOfDocuments(t, e, n = Sa()) {
        const s = va();
        return this.populateOverlays(t, s, e).next(() =>
            this.computeViews(t, e, s, n).next((t) => {
                let e = ya();
                return (
                    t.forEach((t, n) => {
                        e = e.insert(t, n.overlayedDocument);
                    }),
                    e
                );
            })
        );
    }
    getOverlayedDocuments(t, e) {
        const n = va();
        return this.populateOverlays(t, n, e).next(() =>
            this.computeViews(t, e, n, Sa())
        );
    }
    populateOverlays(t, e, n) {
        const s = [];
        return (
            n.forEach((t) => {
                e.has(t) || s.push(t);
            }),
            this.documentOverlayCache.getOverlays(t, s).next((t) => {
                t.forEach((t, n) => {
                    e.set(t, n);
                });
            })
        );
    }
    computeViews(t, e, n, s) {
        let r = ga();
        const i = ba(),
            o = ba();
        return (
            e.forEach((t, e) => {
                const o = n.get(e.key);
                s.has(e.key) && (void 0 === o || o.mutation instanceof na)
                    ? (r = r.insert(e.key, e))
                    : void 0 !== o
                    ? (i.set(e.key, o.mutation.getFieldMask()),
                      Jo(o.mutation, e, o.mutation.getFieldMask(), ir.now()))
                    : i.set(e.key, Zi.empty());
            }),
            this.recalculateAndSaveOverlays(t, r).next(
                (t) => (
                    t.forEach((t, e) => i.set(t, e)),
                    e.forEach((t, e) => {
                        var n;
                        return o.set(
                            t,
                            new mh(
                                e,
                                null !== (n = i.get(t)) && void 0 !== n
                                    ? n
                                    : null
                            )
                        );
                    }),
                    o
                )
            )
        );
    }
    recalculateAndSaveOverlays(t, e) {
        const n = ba();
        let s = new zi((t, e) => t - e),
            r = Sa();
        return this.mutationQueue
            .getAllMutationBatchesAffectingDocumentKeys(t, e)
            .next((t) => {
                for (const r of t)
                    r.keys().forEach((t) => {
                        const i = e.get(t);
                        if (null === i) return;
                        let o = n.get(t) || Zi.empty();
                        (o = r.applyToLocalView(i, o)), n.set(t, o);
                        const a = (s.get(r.batchId) || Sa()).add(t);
                        s = s.insert(r.batchId, a);
                    });
            })
            .next(() => {
                const i = [],
                    o = s.getReverseIterator();
                for (; o.hasNext(); ) {
                    const s = o.getNext(),
                        a = s.key,
                        u = s.value,
                        c = Ia();
                    u.forEach((t) => {
                        if (!r.has(t)) {
                            const s = Yo(e.get(t), n.get(t));
                            null !== s && c.set(t, s), (r = r.add(t));
                        }
                    }),
                        i.push(this.documentOverlayCache.saveOverlays(t, a, c));
                }
                return xr.waitFor(i);
            })
            .next(() => n);
    }
    recalculateAndSaveOverlaysForDocumentKeys(t, e) {
        return this.remoteDocumentCache
            .getEntries(t, e)
            .next((e) => this.recalculateAndSaveOverlays(t, e));
    }
    getDocumentsMatchingQuery(t, e, n) {
        return (function (t) {
            return (
                lr.isDocumentKey(t.path) &&
                null === t.collectionGroup &&
                0 === t.filters.length
            );
        })(e)
            ? this.getDocumentsMatchingDocumentQuery(t, e.path)
            : wo(e)
            ? this.getDocumentsMatchingCollectionGroupQuery(t, e, n)
            : this.getDocumentsMatchingCollectionQuery(t, e, n);
    }
    getNextDocuments(t, e, n, s) {
        return this.remoteDocumentCache
            .getAllFromCollectionGroup(t, e, n, s)
            .next((r) => {
                const i =
                    s - r.size > 0
                        ? this.documentOverlayCache.getOverlaysForCollectionGroup(
                              t,
                              e,
                              n.largestBatchId,
                              s - r.size
                          )
                        : xr.resolve(va());
                let o = -1,
                    a = r;
                return i.next((e) =>
                    xr
                        .forEach(
                            e,
                            (e, n) => (
                                o < n.largestBatchId && (o = n.largestBatchId),
                                r.get(e)
                                    ? xr.resolve()
                                    : this.remoteDocumentCache
                                          .getEntry(t, e)
                                          .next((t) => {
                                              a = a.insert(e, t);
                                          })
                            )
                        )
                        .next(() => this.populateOverlays(t, e, r))
                        .next(() => this.computeViews(t, a, e, Sa()))
                        .next((t) => ({ batchId: o, changes: wa(t) }))
                );
            });
    }
    getDocumentsMatchingDocumentQuery(t, e) {
        return this.getDocument(t, new lr(e)).next((t) => {
            let e = ya();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        });
    }
    getDocumentsMatchingCollectionGroupQuery(t, e, n) {
        const s = e.collectionGroup;
        let r = ya();
        return this.indexManager.getCollectionParents(t, s).next((i) =>
            xr
                .forEach(i, (i) => {
                    const o = (function (t, e) {
                        return new lo(
                            e,
                            null,
                            t.explicitOrderBy.slice(),
                            t.filters.slice(),
                            t.limit,
                            t.limitType,
                            t.startAt,
                            t.endAt
                        );
                    })(e, i.child(s));
                    return this.getDocumentsMatchingCollectionQuery(
                        t,
                        o,
                        n
                    ).next((t) => {
                        t.forEach((t, e) => {
                            r = r.insert(t, e);
                        });
                    });
                })
                .next(() => r)
        );
    }
    getDocumentsMatchingCollectionQuery(t, e, n) {
        let s;
        return this.documentOverlayCache
            .getOverlaysForCollection(t, e.path, n.largestBatchId)
            .next(
                (r) => (
                    (s = r),
                    this.remoteDocumentCache.getDocumentsMatchingQuery(
                        t,
                        e,
                        n,
                        s
                    )
                )
            )
            .next((t) => {
                s.forEach((e, n) => {
                    const s = n.getKey();
                    null === t.get(s) &&
                        (t = t.insert(s, no.newInvalidDocument(s)));
                });
                let n = ya();
                return (
                    t.forEach((t, r) => {
                        const i = s.get(t);
                        void 0 !== i && Jo(i.mutation, r, Zi.empty(), ir.now()),
                            xo(e, r) && (n = n.insert(t, r));
                    }),
                    n
                );
            });
    }
}
class ph {
    constructor(t) {
        (this.yt = t), (this.Zn = new Map()), (this.ts = new Map());
    }
    getBundleMetadata(t, e) {
        return xr.resolve(this.Zn.get(e));
    }
    saveBundleMetadata(t, e) {
        var n;
        return (
            this.Zn.set(e.id, {
                id: (n = e).id,
                version: n.version,
                createTime: Ka(n.createTime),
            }),
            xr.resolve()
        );
    }
    getNamedQuery(t, e) {
        return xr.resolve(this.ts.get(e));
    }
    saveNamedQuery(t, e) {
        return (
            this.ts.set(
                e.name,
                (function (t) {
                    return {
                        name: t.name,
                        query: ec(t.bundledQuery),
                        readTime: Ka(t.readTime),
                    };
                })(e)
            ),
            xr.resolve()
        );
    }
}
class yh {
    constructor() {
        (this.overlays = new zi(lr.comparator)), (this.es = new Map());
    }
    getOverlay(t, e) {
        return xr.resolve(this.overlays.get(e));
    }
    getOverlays(t, e) {
        const n = va();
        return xr
            .forEach(e, (e) =>
                this.getOverlay(t, e).next((t) => {
                    null !== t && n.set(e, t);
                })
            )
            .next(() => n);
    }
    saveOverlays(t, e, n) {
        return (
            n.forEach((n, s) => {
                this.oe(t, e, s);
            }),
            xr.resolve()
        );
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = this.es.get(n);
        return (
            void 0 !== s &&
                (s.forEach((t) => (this.overlays = this.overlays.remove(t))),
                this.es.delete(n)),
            xr.resolve()
        );
    }
    getOverlaysForCollection(t, e, n) {
        const s = va(),
            r = e.length + 1,
            i = new lr(e.child("")),
            o = this.overlays.getIteratorFrom(i);
        for (; o.hasNext(); ) {
            const t = o.getNext().value,
                i = t.getKey();
            if (!e.isPrefixOf(i.path)) break;
            i.path.length === r && t.largestBatchId > n && s.set(t.getKey(), t);
        }
        return xr.resolve(s);
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        let r = new zi((t, e) => t - e);
        const i = this.overlays.getIterator();
        for (; i.hasNext(); ) {
            const t = i.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                let e = r.get(t.largestBatchId);
                null === e && ((e = va()), (r = r.insert(t.largestBatchId, e))),
                    e.set(t.getKey(), t);
            }
        }
        const o = va(),
            a = r.getIterator();
        for (
            ;
            a.hasNext() &&
            (a.getNext().value.forEach((t, e) => o.set(t, e)),
            !(o.size() >= s));

        );
        return xr.resolve(o);
    }
    oe(t, e, n) {
        const s = this.overlays.get(n.key);
        if (null !== s) {
            const t = this.es.get(s.largestBatchId).delete(n.key);
            this.es.set(s.largestBatchId, t);
        }
        this.overlays = this.overlays.insert(n.key, new $u(e, n));
        let r = this.es.get(e);
        void 0 === r && ((r = Sa()), this.es.set(e, r)),
            this.es.set(e, r.add(n.key));
    }
}
class wh {
    constructor() {
        (this.ns = new Yi(vh.ss)), (this.rs = new Yi(vh.os));
    }
    isEmpty() {
        return this.ns.isEmpty();
    }
    addReference(t, e) {
        const n = new vh(t, e);
        (this.ns = this.ns.add(n)), (this.rs = this.rs.add(n));
    }
    us(t, e) {
        t.forEach((t) => this.addReference(t, e));
    }
    removeReference(t, e) {
        this.cs(new vh(t, e));
    }
    hs(t, e) {
        t.forEach((t) => this.removeReference(t, e));
    }
    ls(t) {
        const e = new lr(new ur([])),
            n = new vh(e, t),
            s = new vh(e, t + 1),
            r = [];
        return (
            this.rs.forEachInRange([n, s], (t) => {
                this.cs(t), r.push(t.key);
            }),
            r
        );
    }
    fs() {
        this.ns.forEach((t) => this.cs(t));
    }
    cs(t) {
        (this.ns = this.ns.delete(t)), (this.rs = this.rs.delete(t));
    }
    ds(t) {
        const e = new lr(new ur([])),
            n = new vh(e, t),
            s = new vh(e, t + 1);
        let r = Sa();
        return (
            this.rs.forEachInRange([n, s], (t) => {
                r = r.add(t.key);
            }),
            r
        );
    }
    containsKey(t) {
        const e = new vh(t, 0),
            n = this.ns.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }
}
class vh {
    constructor(t, e) {
        (this.key = t), (this._s = e);
    }
    static ss(t, e) {
        return lr.comparator(t.key, e.key) || nr(t._s, e._s);
    }
    static os(t, e) {
        return nr(t._s, e._s) || lr.comparator(t.key, e.key);
    }
}
class Ih {
    constructor(t, e) {
        (this.indexManager = t),
            (this.referenceDelegate = e),
            (this.mutationQueue = []),
            (this.ws = 1),
            (this.gs = new Yi(vh.ss));
    }
    checkEmpty(t) {
        return xr.resolve(0 === this.mutationQueue.length);
    }
    addMutationBatch(t, e, n, s) {
        const r = this.ws;
        this.ws++,
            this.mutationQueue.length > 0 &&
                this.mutationQueue[this.mutationQueue.length - 1];
        const i = new Ku(r, e, n, s);
        this.mutationQueue.push(i);
        for (const e of s)
            (this.gs = this.gs.add(new vh(e.key, r))),
                this.indexManager.addToCollectionParentIndex(
                    t,
                    e.key.path.popLast()
                );
        return xr.resolve(i);
    }
    lookupMutationBatch(t, e) {
        return xr.resolve(this.ys(e));
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1,
            s = this.ps(n),
            r = s < 0 ? 0 : s;
        return xr.resolve(
            this.mutationQueue.length > r ? this.mutationQueue[r] : null
        );
    }
    getHighestUnacknowledgedBatchId() {
        return xr.resolve(0 === this.mutationQueue.length ? -1 : this.ws - 1);
    }
    getAllMutationBatches(t) {
        return xr.resolve(this.mutationQueue.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        const n = new vh(e, 0),
            s = new vh(e, Number.POSITIVE_INFINITY),
            r = [];
        return (
            this.gs.forEachInRange([n, s], (t) => {
                const e = this.ys(t._s);
                r.push(e);
            }),
            xr.resolve(r)
        );
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new Yi(nr);
        return (
            e.forEach((t) => {
                const e = new vh(t, 0),
                    s = new vh(t, Number.POSITIVE_INFINITY);
                this.gs.forEachInRange([e, s], (t) => {
                    n = n.add(t._s);
                });
            }),
            xr.resolve(this.Is(n))
        );
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        const n = e.path,
            s = n.length + 1;
        let r = n;
        lr.isDocumentKey(r) || (r = r.child(""));
        const i = new vh(new lr(r), 0);
        let o = new Yi(nr);
        return (
            this.gs.forEachWhile((t) => {
                const e = t.key.path;
                return (
                    !!n.isPrefixOf(e) &&
                    (e.length === s && (o = o.add(t._s)), !0)
                );
            }, i),
            xr.resolve(this.Is(o))
        );
    }
    Is(t) {
        const e = [];
        return (
            t.forEach((t) => {
                const n = this.ys(t);
                null !== n && e.push(n);
            }),
            e
        );
    }
    removeMutationBatch(t, e) {
        qs(0 === this.Ts(e.batchId, "removed")), this.mutationQueue.shift();
        let n = this.gs;
        return xr
            .forEach(e.mutations, (s) => {
                const r = new vh(s.key, e.batchId);
                return (
                    (n = n.delete(r)),
                    this.referenceDelegate.markPotentiallyOrphaned(t, s.key)
                );
            })
            .next(() => {
                this.gs = n;
            });
    }
    An(t) {}
    containsKey(t, e) {
        const n = new vh(e, 0),
            s = this.gs.firstAfterOrEqual(n);
        return xr.resolve(e.isEqual(s && s.key));
    }
    performConsistencyCheck(t) {
        return this.mutationQueue.length, xr.resolve();
    }
    Ts(t, e) {
        return this.ps(t);
    }
    ps(t) {
        return 0 === this.mutationQueue.length
            ? 0
            : t - this.mutationQueue[0].batchId;
    }
    ys(t) {
        const e = this.ps(t);
        return e < 0 || e >= this.mutationQueue.length
            ? null
            : this.mutationQueue[e];
    }
}
class bh {
    constructor(t) {
        (this.Es = t), (this.docs = new zi(lr.comparator)), (this.size = 0);
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    addEntry(t, e) {
        const n = e.key,
            s = this.docs.get(n),
            r = s ? s.size : 0,
            i = this.Es(e);
        return (
            (this.docs = this.docs.insert(n, {
                document: e.mutableCopy(),
                size: i,
            })),
            (this.size += i - r),
            this.indexManager.addToCollectionParentIndex(t, n.path.popLast())
        );
    }
    removeEntry(t) {
        const e = this.docs.get(t);
        e && ((this.docs = this.docs.remove(t)), (this.size -= e.size));
    }
    getEntry(t, e) {
        const n = this.docs.get(e);
        return xr.resolve(
            n ? n.document.mutableCopy() : no.newInvalidDocument(e)
        );
    }
    getEntries(t, e) {
        let n = ga();
        return (
            e.forEach((t) => {
                const e = this.docs.get(t);
                n = n.insert(
                    t,
                    e ? e.document.mutableCopy() : no.newInvalidDocument(t)
                );
            }),
            xr.resolve(n)
        );
    }
    getDocumentsMatchingQuery(t, e, n, s) {
        let r = ga();
        const i = e.path,
            o = new lr(i.child("")),
            a = this.docs.getIteratorFrom(o);
        for (; a.hasNext(); ) {
            const {
                key: t,
                value: { document: o },
            } = a.getNext();
            if (!i.isPrefixOf(t.path)) break;
            t.path.length > i.length + 1 ||
                Er(Ir(o), n) <= 0 ||
                ((s.has(o.key) || xo(e, o)) &&
                    (r = r.insert(o.key, o.mutableCopy())));
        }
        return xr.resolve(r);
    }
    getAllFromCollectionGroup(t, e, n, s) {
        Ps();
    }
    As(t, e) {
        return xr.forEach(this.docs, (t) => e(t));
    }
    newChangeBuffer(t) {
        return new Eh(this);
    }
    getSize(t) {
        return xr.resolve(this.size);
    }
}
class Eh extends ih {
    constructor(t) {
        super(), (this.Yn = t);
    }
    applyChanges(t) {
        const e = [];
        return (
            this.changes.forEach((n, s) => {
                s.isValidDocument()
                    ? e.push(this.Yn.addEntry(t, s))
                    : this.Yn.removeEntry(n);
            }),
            xr.waitFor(e)
        );
    }
    getFromCache(t, e) {
        return this.Yn.getEntry(t, e);
    }
    getAllFromCache(t, e) {
        return this.Yn.getEntries(t, e);
    }
}
class Th {
    constructor(t) {
        (this.persistence = t),
            (this.Rs = new fa((t) => io(t), oo)),
            (this.lastRemoteSnapshotVersion = or.min()),
            (this.highestTargetId = 0),
            (this.bs = 0),
            (this.Ps = new wh()),
            (this.targetCount = 0),
            (this.vs = Hc.Pn());
    }
    forEachTarget(t, e) {
        return this.Rs.forEach((t, n) => e(n)), xr.resolve();
    }
    getLastRemoteSnapshotVersion(t) {
        return xr.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(t) {
        return xr.resolve(this.bs);
    }
    allocateTargetId(t) {
        return (
            (this.highestTargetId = this.vs.next()),
            xr.resolve(this.highestTargetId)
        );
    }
    setTargetsMetadata(t, e, n) {
        return (
            n && (this.lastRemoteSnapshotVersion = n),
            e > this.bs && (this.bs = e),
            xr.resolve()
        );
    }
    Dn(t) {
        this.Rs.set(t.target, t);
        const e = t.targetId;
        e > this.highestTargetId &&
            ((this.vs = new Hc(e)), (this.highestTargetId = e)),
            t.sequenceNumber > this.bs && (this.bs = t.sequenceNumber);
    }
    addTargetData(t, e) {
        return this.Dn(e), (this.targetCount += 1), xr.resolve();
    }
    updateTargetData(t, e) {
        return this.Dn(e), xr.resolve();
    }
    removeTargetData(t, e) {
        return (
            this.Rs.delete(e.target),
            this.Ps.ls(e.targetId),
            (this.targetCount -= 1),
            xr.resolve()
        );
    }
    removeTargets(t, e, n) {
        let s = 0;
        const r = [];
        return (
            this.Rs.forEach((i, o) => {
                o.sequenceNumber <= e &&
                    null === n.get(o.targetId) &&
                    (this.Rs.delete(i),
                    r.push(this.removeMatchingKeysForTargetId(t, o.targetId)),
                    s++);
            }),
            xr.waitFor(r).next(() => s)
        );
    }
    getTargetCount(t) {
        return xr.resolve(this.targetCount);
    }
    getTargetData(t, e) {
        const n = this.Rs.get(e) || null;
        return xr.resolve(n);
    }
    addMatchingKeys(t, e, n) {
        return this.Ps.us(e, n), xr.resolve();
    }
    removeMatchingKeys(t, e, n) {
        this.Ps.hs(e, n);
        const s = this.persistence.referenceDelegate,
            r = [];
        return (
            s &&
                e.forEach((e) => {
                    r.push(s.markPotentiallyOrphaned(t, e));
                }),
            xr.waitFor(r)
        );
    }
    removeMatchingKeysForTargetId(t, e) {
        return this.Ps.ls(e), xr.resolve();
    }
    getMatchingKeysForTargetId(t, e) {
        const n = this.Ps.ds(e);
        return xr.resolve(n);
    }
    containsKey(t, e) {
        return xr.resolve(this.Ps.containsKey(e));
    }
}
class Sh {
    constructor(t, e) {
        (this.Vs = {}),
            (this.overlays = {}),
            (this.Ss = new Pr(0)),
            (this.Ds = !1),
            (this.Ds = !0),
            (this.referenceDelegate = t(this)),
            (this.Cs = new Th(this)),
            (this.indexManager = new Nc()),
            (this.remoteDocumentCache = (function (t) {
                return new bh(t);
            })((t) => this.referenceDelegate.xs(t))),
            (this.yt = new zu(e)),
            (this.Ns = new ph(this.yt));
    }
    start() {
        return Promise.resolve();
    }
    shutdown() {
        return (this.Ds = !1), Promise.resolve();
    }
    get started() {
        return this.Ds;
    }
    setDatabaseDeletedListener() {}
    setNetworkEnabled() {}
    getIndexManager(t) {
        return this.indexManager;
    }
    getDocumentOverlayCache(t) {
        let e = this.overlays[t.toKey()];
        return e || ((e = new yh()), (this.overlays[t.toKey()] = e)), e;
    }
    getMutationQueue(t, e) {
        let n = this.Vs[t.toKey()];
        return (
            n ||
                ((n = new Ih(e, this.referenceDelegate)),
                (this.Vs[t.toKey()] = n)),
            n
        );
    }
    getTargetCache() {
        return this.Cs;
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache;
    }
    getBundleCache() {
        return this.Ns;
    }
    runTransaction(t, e, n) {
        Ms("MemoryPersistence", "Starting transaction:", t);
        const s = new _h(this.Ss.next());
        return (
            this.referenceDelegate.ks(),
            n(s)
                .next((t) => this.referenceDelegate.Os(s).next(() => t))
                .toPromise()
                .then((t) => (s.raiseOnCommittedEvent(), t))
        );
    }
    Ms(t, e) {
        return xr.or(
            Object.values(this.Vs).map((n) => () => n.containsKey(t, e))
        );
    }
}
class _h extends Sr {
    constructor(t) {
        super(), (this.currentSequenceNumber = t);
    }
}
class xh {
    constructor(t) {
        (this.persistence = t), (this.Fs = new wh()), (this.$s = null);
    }
    static Bs(t) {
        return new xh(t);
    }
    get Ls() {
        if (this.$s) return this.$s;
        throw Ps();
    }
    addReference(t, e, n) {
        return (
            this.Fs.addReference(n, e),
            this.Ls.delete(n.toString()),
            xr.resolve()
        );
    }
    removeReference(t, e, n) {
        return (
            this.Fs.removeReference(n, e),
            this.Ls.add(n.toString()),
            xr.resolve()
        );
    }
    markPotentiallyOrphaned(t, e) {
        return this.Ls.add(e.toString()), xr.resolve();
    }
    removeTarget(t, e) {
        this.Fs.ls(e.targetId).forEach((t) => this.Ls.add(t.toString()));
        const n = this.persistence.getTargetCache();
        return n
            .getMatchingKeysForTargetId(t, e.targetId)
            .next((t) => {
                t.forEach((t) => this.Ls.add(t.toString()));
            })
            .next(() => n.removeTargetData(t, e));
    }
    ks() {
        this.$s = new Set();
    }
    Os(t) {
        const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return xr
            .forEach(this.Ls, (n) => {
                const s = lr.fromPath(n);
                return this.qs(t, s).next((t) => {
                    t || e.removeEntry(s, or.min());
                });
            })
            .next(() => ((this.$s = null), e.apply(t)));
    }
    updateLimboDocument(t, e) {
        return this.qs(t, e).next((t) => {
            t ? this.Ls.delete(e.toString()) : this.Ls.add(e.toString());
        });
    }
    xs(t) {
        return 0;
    }
    qs(t, e) {
        return xr.or([
            () => xr.resolve(this.Fs.containsKey(e)),
            () => this.persistence.getTargetCache().containsKey(t, e),
            () => this.persistence.Ms(t, e),
        ]);
    }
}
class Dh {
    constructor(t) {
        this.yt = t;
    }
    $(t, e, n, s) {
        const r = new Dr("createOrUpgrade", e);
        n < 1 &&
            s >= 1 &&
            ((function (t) {
                t.createObjectStore("owner");
            })(t),
            (function (t) {
                t.createObjectStore("mutationQueues", { keyPath: "userId" }),
                    t
                        .createObjectStore("mutations", {
                            keyPath: "batchId",
                            autoIncrement: !0,
                        })
                        .createIndex("userMutationsIndex", wu, { unique: !0 }),
                    t.createObjectStore("documentMutations");
            })(t),
            Ah(t),
            (function (t) {
                t.createObjectStore("remoteDocuments");
            })(t));
        let i = xr.resolve();
        return (
            n < 3 &&
                s >= 3 &&
                (0 !== n &&
                    ((function (t) {
                        t.deleteObjectStore("targetDocuments"),
                            t.deleteObjectStore("targets"),
                            t.deleteObjectStore("targetGlobal");
                    })(t),
                    Ah(t)),
                (i = i.next(() =>
                    (function (t) {
                        const e = t.store("targetGlobal"),
                            n = {
                                highestTargetId: 0,
                                highestListenSequenceNumber: 0,
                                lastRemoteSnapshotVersion: or
                                    .min()
                                    .toTimestamp(),
                                targetCount: 0,
                            };
                        return e.put("targetGlobalKey", n);
                    })(r)
                ))),
            n < 4 &&
                s >= 4 &&
                (0 !== n &&
                    (i = i.next(() =>
                        (function (t, e) {
                            return e
                                .store("mutations")
                                .W()
                                .next((n) => {
                                    t.deleteObjectStore("mutations"),
                                        t
                                            .createObjectStore("mutations", {
                                                keyPath: "batchId",
                                                autoIncrement: !0,
                                            })
                                            .createIndex(
                                                "userMutationsIndex",
                                                wu,
                                                { unique: !0 }
                                            );
                                    const s = e.store("mutations"),
                                        r = n.map((t) => s.put(t));
                                    return xr.waitFor(r);
                                });
                        })(t, r)
                    )),
                (i = i.next(() => {
                    !(function (t) {
                        t.createObjectStore("clientMetadata", {
                            keyPath: "clientId",
                        });
                    })(t);
                }))),
            n < 5 && s >= 5 && (i = i.next(() => this.Us(r))),
            n < 6 &&
                s >= 6 &&
                (i = i.next(
                    () => (
                        (function (t) {
                            t.createObjectStore("remoteDocumentGlobal");
                        })(t),
                        this.Ks(r)
                    )
                )),
            n < 7 && s >= 7 && (i = i.next(() => this.Gs(r))),
            n < 8 && s >= 8 && (i = i.next(() => this.Qs(t, r))),
            n < 9 &&
                s >= 9 &&
                (i = i.next(() => {
                    !(function (t) {
                        t.objectStoreNames.contains("remoteDocumentChanges") &&
                            t.deleteObjectStore("remoteDocumentChanges");
                    })(t);
                })),
            n < 10 && s >= 10 && (i = i.next(() => this.js(r))),
            n < 11 &&
                s >= 11 &&
                (i = i.next(() => {
                    !(function (t) {
                        t.createObjectStore("bundles", { keyPath: "bundleId" });
                    })(t),
                        (function (t) {
                            t.createObjectStore("namedQueries", {
                                keyPath: "name",
                            });
                        })(t);
                })),
            n < 12 &&
                s >= 12 &&
                (i = i.next(() => {
                    !(function (t) {
                        const e = t.createObjectStore("documentOverlays", {
                            keyPath: Lu,
                        });
                        e.createIndex("collectionPathOverlayIndex", Mu, {
                            unique: !1,
                        }),
                            e.createIndex("collectionGroupOverlayIndex", Fu, {
                                unique: !1,
                            });
                    })(t);
                })),
            n < 13 &&
                s >= 13 &&
                (i = i
                    .next(() =>
                        (function (t) {
                            const e = t.createObjectStore(
                                "remoteDocumentsV14",
                                { keyPath: Eu }
                            );
                            e.createIndex("documentKeyIndex", Tu),
                                e.createIndex("collectionGroupIndex", Su);
                        })(t)
                    )
                    .next(() => this.Ws(t, r))
                    .next(() => t.deleteObjectStore("remoteDocuments"))),
            n < 14 && s >= 14 && (i = i.next(() => this.zs(t, r))),
            n < 15 &&
                s >= 15 &&
                (i = i.next(() =>
                    (function (t) {
                        t
                            .createObjectStore("indexConfiguration", {
                                keyPath: "indexId",
                                autoIncrement: !0,
                            })
                            .createIndex(
                                "collectionGroupIndex",
                                "collectionGroup",
                                { unique: !1 }
                            ),
                            t
                                .createObjectStore("indexState", {
                                    keyPath: Cu,
                                })
                                .createIndex("sequenceNumberIndex", Nu, {
                                    unique: !1,
                                }),
                            t
                                .createObjectStore("indexEntries", {
                                    keyPath: ku,
                                })
                                .createIndex("documentKeyIndex", Ru, {
                                    unique: !1,
                                });
                    })(t)
                )),
            i
        );
    }
    Ks(t) {
        let e = 0;
        return t
            .store("remoteDocuments")
            .Z((t, n) => {
                e += Gc(n);
            })
            .next(() => {
                const n = { byteSize: e };
                return t
                    .store("remoteDocumentGlobal")
                    .put("remoteDocumentGlobalKey", n);
            });
    }
    Us(t) {
        const e = t.store("mutationQueues"),
            n = t.store("mutations");
        return e.W().next((e) =>
            xr.forEach(e, (e) => {
                const s = IDBKeyRange.bound(
                    [e.userId, -1],
                    [e.userId, e.lastAcknowledgedBatchId]
                );
                return n.W("userMutationsIndex", s).next((n) =>
                    xr.forEach(n, (n) => {
                        qs(n.userId === e.userId);
                        const s = Ju(this.yt, n);
                        return Uc(t, e.userId, s).next(() => {});
                    })
                );
            })
        );
    }
    Gs(t) {
        const e = t.store("targetDocuments"),
            n = t.store("remoteDocuments");
        return t
            .store("targetGlobal")
            .get("targetGlobalKey")
            .next((t) => {
                const s = [];
                return n
                    .Z((n, r) => {
                        const i = new ur(n),
                            o = (function (t) {
                                return [0, mu(t)];
                            })(i);
                        s.push(
                            e
                                .get(o)
                                .next((n) =>
                                    n
                                        ? xr.resolve()
                                        : ((n) =>
                                              e.put({
                                                  targetId: 0,
                                                  path: mu(n),
                                                  sequenceNumber:
                                                      t.highestListenSequenceNumber,
                                              }))(i)
                                )
                        );
                    })
                    .next(() => xr.waitFor(s));
            });
    }
    Qs(t, e) {
        t.createObjectStore("collectionParents", { keyPath: Au });
        const n = e.store("collectionParents"),
            s = new kc(),
            r = (t) => {
                if (s.add(t)) {
                    const e = t.lastSegment(),
                        s = t.popLast();
                    return n.put({ collectionId: e, parent: mu(s) });
                }
            };
        return e
            .store("remoteDocuments")
            .Z({ X: !0 }, (t, e) => {
                const n = new ur(t);
                return r(n.popLast());
            })
            .next(() =>
                e.store("documentMutations").Z({ X: !0 }, ([t, e, n], s) => {
                    const i = yu(e);
                    return r(i.popLast());
                })
            );
    }
    js(t) {
        const e = t.store("targets");
        return e.Z((t, n) => {
            const s = Zu(n),
                r = tc(this.yt, s);
            return e.put(r);
        });
    }
    Ws(t, e) {
        const n = e.store("remoteDocuments"),
            s = [];
        return n
            .Z((t, n) => {
                const r = e.store("remoteDocumentsV14"),
                    i = ((o = n),
                    o.document
                        ? new lr(ur.fromString(o.document.name).popFirst(5))
                        : o.noDocument
                        ? lr.fromSegments(o.noDocument.path)
                        : o.unknownDocument
                        ? lr.fromSegments(o.unknownDocument.path)
                        : Ps()).path.toArray();
                var o;
                const a = {
                    prefixPath: i.slice(0, i.length - 2),
                    collectionGroup: i[i.length - 2],
                    documentId: i[i.length - 1],
                    readTime: n.readTime || [0, 0],
                    unknownDocument: n.unknownDocument,
                    noDocument: n.noDocument,
                    document: n.document,
                    hasCommittedMutations: !!n.hasCommittedMutations,
                };
                s.push(r.put(a));
            })
            .next(() => xr.waitFor(s));
    }
    zs(t, e) {
        const n = e.store("mutations"),
            s = ah(this.yt),
            r = new Sh(xh.Bs, this.yt.ie);
        return n.W().next((t) => {
            const n = new Map();
            return (
                t.forEach((t) => {
                    var e;
                    let s =
                        null !== (e = n.get(t.userId)) && void 0 !== e
                            ? e
                            : Sa();
                    Ju(this.yt, t)
                        .keys()
                        .forEach((t) => (s = s.add(t))),
                        n.set(t.userId, s);
                }),
                xr.forEach(n, (t, n) => {
                    const i = new Cs(n),
                        o = uc.re(this.yt, i),
                        a = r.getIndexManager(i),
                        u = Kc.re(i, this.yt, a, r.referenceDelegate);
                    return new gh(s, u, o, a)
                        .recalculateAndSaveOverlaysForDocumentKeys(
                            new Uu(e, Pr.at),
                            t
                        )
                        .next();
                })
            );
        });
    }
}
function Ah(t) {
    t
        .createObjectStore("targetDocuments", { keyPath: xu })
        .createIndex("documentTargetsIndex", Du, { unique: !0 }),
        t
            .createObjectStore("targets", { keyPath: "targetId" })
            .createIndex("queryTargetsIndex", _u, { unique: !0 }),
        t.createObjectStore("targetGlobal");
}
const Ch =
    "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";
class Nh {
    constructor(t, e, n, s, r, i, o, a, u, c, h = 15) {
        if (
            ((this.allowTabSynchronization = t),
            (this.persistenceKey = e),
            (this.clientId = n),
            (this.Hs = r),
            (this.window = i),
            (this.document = o),
            (this.Js = u),
            (this.Ys = c),
            (this.Xs = h),
            (this.Ss = null),
            (this.Ds = !1),
            (this.isPrimary = !1),
            (this.networkEnabled = !0),
            (this.Zs = null),
            (this.inForeground = !1),
            (this.ti = null),
            (this.ei = null),
            (this.ni = Number.NEGATIVE_INFINITY),
            (this.si = (t) => Promise.resolve()),
            !Nh.C())
        )
            throw new Ks(
                Gs.UNIMPLEMENTED,
                "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled."
            );
        (this.referenceDelegate = new sh(this, s)),
            (this.ii = e + "main"),
            (this.yt = new zu(a)),
            (this.ri = new Ar(this.ii, this.Xs, new Dh(this.yt))),
            (this.Cs = new Wc(this.referenceDelegate, this.yt)),
            (this.remoteDocumentCache = ah(this.yt)),
            (this.Ns = new ic()),
            this.window && this.window.localStorage
                ? (this.oi = this.window.localStorage)
                : ((this.oi = null),
                  !1 === c &&
                      Fs(
                          "IndexedDbPersistence",
                          "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."
                      ));
    }
    start() {
        return this.ui()
            .then(() => {
                if (!this.isPrimary && !this.allowTabSynchronization)
                    throw new Ks(Gs.FAILED_PRECONDITION, Ch);
                return (
                    this.ci(),
                    this.ai(),
                    this.hi(),
                    this.runTransaction(
                        "getHighestListenSequenceNumber",
                        "readonly",
                        (t) => this.Cs.getHighestSequenceNumber(t)
                    )
                );
            })
            .then((t) => {
                this.Ss = new Pr(t, this.Js);
            })
            .then(() => {
                this.Ds = !0;
            })
            .catch((t) => (this.ri && this.ri.close(), Promise.reject(t)));
    }
    li(t) {
        return (
            (this.si = async (e) => {
                if (this.started) return t(e);
            }),
            t(this.isPrimary)
        );
    }
    setDatabaseDeletedListener(t) {
        this.ri.L(async (e) => {
            null === e.newVersion && (await t());
        });
    }
    setNetworkEnabled(t) {
        this.networkEnabled !== t &&
            ((this.networkEnabled = t),
            this.Hs.enqueueAndForget(async () => {
                this.started && (await this.ui());
            }));
    }
    ui() {
        return this.runTransaction(
            "updateClientMetadataAndTryBecomePrimary",
            "readwrite",
            (t) =>
                Rh(t)
                    .put({
                        clientId: this.clientId,
                        updateTimeMs: Date.now(),
                        networkEnabled: this.networkEnabled,
                        inForeground: this.inForeground,
                    })
                    .next(() => {
                        if (this.isPrimary)
                            return this.fi(t).next((t) => {
                                t ||
                                    ((this.isPrimary = !1),
                                    this.Hs.enqueueRetryable(() =>
                                        this.si(!1)
                                    ));
                            });
                    })
                    .next(() => this.di(t))
                    .next((e) =>
                        this.isPrimary && !e
                            ? this._i(t).next(() => !1)
                            : !!e && this.wi(t).next(() => !0)
                    )
        )
            .catch((t) => {
                if (kr(t))
                    return (
                        Ms(
                            "IndexedDbPersistence",
                            "Failed to extend owner lease: ",
                            t
                        ),
                        this.isPrimary
                    );
                if (!this.allowTabSynchronization) throw t;
                return (
                    Ms(
                        "IndexedDbPersistence",
                        "Releasing owner lease after error during lease refresh",
                        t
                    ),
                    !1
                );
            })
            .then((t) => {
                this.isPrimary !== t &&
                    this.Hs.enqueueRetryable(() => this.si(t)),
                    (this.isPrimary = t);
            });
    }
    fi(t) {
        return kh(t)
            .get("owner")
            .next((t) => xr.resolve(this.mi(t)));
    }
    gi(t) {
        return Rh(t).delete(this.clientId);
    }
    async yi() {
        if (this.isPrimary && !this.pi(this.ni, 18e5)) {
            this.ni = Date.now();
            const t = await this.runTransaction(
                "maybeGarbageCollectMultiClientState",
                "readwrite-primary",
                (t) => {
                    const e = Gu(t, "clientMetadata");
                    return e.W().next((t) => {
                        const n = this.Ii(t, 18e5),
                            s = t.filter((t) => -1 === n.indexOf(t));
                        return xr
                            .forEach(s, (t) => e.delete(t.clientId))
                            .next(() => s);
                    });
                }
            ).catch(() => []);
            if (this.oi)
                for (const e of t) this.oi.removeItem(this.Ti(e.clientId));
        }
    }
    hi() {
        this.ei = this.Hs.enqueueAfterDelay(
            "client_metadata_refresh",
            4e3,
            () =>
                this.ui()
                    .then(() => this.yi())
                    .then(() => this.hi())
        );
    }
    mi(t) {
        return !!t && t.ownerId === this.clientId;
    }
    di(t) {
        return this.Ys
            ? xr.resolve(!0)
            : kh(t)
                  .get("owner")
                  .next((e) => {
                      if (
                          null !== e &&
                          this.pi(e.leaseTimestampMs, 5e3) &&
                          !this.Ei(e.ownerId)
                      ) {
                          if (this.mi(e) && this.networkEnabled) return !0;
                          if (!this.mi(e)) {
                              if (!e.allowTabSynchronization)
                                  throw new Ks(Gs.FAILED_PRECONDITION, Ch);
                              return !1;
                          }
                      }
                      return (
                          !(!this.networkEnabled || !this.inForeground) ||
                          Rh(t)
                              .W()
                              .next(
                                  (t) =>
                                      void 0 ===
                                      this.Ii(t, 5e3).find((t) => {
                                          if (this.clientId !== t.clientId) {
                                              const e =
                                                      !this.networkEnabled &&
                                                      t.networkEnabled,
                                                  n =
                                                      !this.inForeground &&
                                                      t.inForeground,
                                                  s =
                                                      this.networkEnabled ===
                                                      t.networkEnabled;
                                              if (e || (n && s)) return !0;
                                          }
                                          return !1;
                                      })
                              )
                      );
                  })
                  .next(
                      (t) => (
                          this.isPrimary !== t &&
                              Ms(
                                  "IndexedDbPersistence",
                                  `Client ${
                                      t ? "is" : "is not"
                                  } eligible for a primary lease.`
                              ),
                          t
                      )
                  );
    }
    async shutdown() {
        (this.Ds = !1),
            this.Ai(),
            this.ei && (this.ei.cancel(), (this.ei = null)),
            this.Ri(),
            this.bi(),
            await this.ri.runTransaction(
                "shutdown",
                "readwrite",
                ["owner", "clientMetadata"],
                (t) => {
                    const e = new Uu(t, Pr.at);
                    return this._i(e).next(() => this.gi(e));
                }
            ),
            this.ri.close(),
            this.Pi();
    }
    Ii(t, e) {
        return t.filter(
            (t) => this.pi(t.updateTimeMs, e) && !this.Ei(t.clientId)
        );
    }
    vi() {
        return this.runTransaction("getActiveClients", "readonly", (t) =>
            Rh(t)
                .W()
                .next((t) => this.Ii(t, 18e5).map((t) => t.clientId))
        );
    }
    get started() {
        return this.Ds;
    }
    getMutationQueue(t, e) {
        return Kc.re(t, this.yt, e, this.referenceDelegate);
    }
    getTargetCache() {
        return this.Cs;
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache;
    }
    getIndexManager(t) {
        return new Lc(t, this.yt.ie.databaseId);
    }
    getDocumentOverlayCache(t) {
        return uc.re(this.yt, t);
    }
    getBundleCache() {
        return this.Ns;
    }
    runTransaction(t, e, n) {
        Ms("IndexedDbPersistence", "Starting transaction:", t);
        const s = "readonly" === e ? "readonly" : "readwrite",
            r =
                15 === (i = this.Xs)
                    ? Bu
                    : 14 === i
                    ? qu
                    : 13 === i
                    ? Pu
                    : 12 === i
                    ? Vu
                    : 11 === i
                    ? Ou
                    : void Ps();
        var i;
        let o;
        return this.ri
            .runTransaction(
                t,
                s,
                r,
                (s) => (
                    (o = new Uu(s, this.Ss ? this.Ss.next() : Pr.at)),
                    "readwrite-primary" === e
                        ? this.fi(o)
                              .next((t) => !!t || this.di(o))
                              .next((e) => {
                                  if (!e)
                                      throw (
                                          (Fs(
                                              `Failed to obtain primary lease for action '${t}'.`
                                          ),
                                          (this.isPrimary = !1),
                                          this.Hs.enqueueRetryable(() =>
                                              this.si(!1)
                                          ),
                                          new Ks(Gs.FAILED_PRECONDITION, Tr))
                                      );
                                  return n(o);
                              })
                              .next((t) => this.wi(o).next(() => t))
                        : this.Vi(o).next(() => n(o))
                )
            )
            .then((t) => (o.raiseOnCommittedEvent(), t));
    }
    Vi(t) {
        return kh(t)
            .get("owner")
            .next((t) => {
                if (
                    null !== t &&
                    this.pi(t.leaseTimestampMs, 5e3) &&
                    !this.Ei(t.ownerId) &&
                    !this.mi(t) &&
                    !(
                        this.Ys ||
                        (this.allowTabSynchronization &&
                            t.allowTabSynchronization)
                    )
                )
                    throw new Ks(Gs.FAILED_PRECONDITION, Ch);
            });
    }
    wi(t) {
        const e = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now(),
        };
        return kh(t).put("owner", e);
    }
    static C() {
        return Ar.C();
    }
    _i(t) {
        const e = kh(t);
        return e
            .get("owner")
            .next((t) =>
                this.mi(t)
                    ? (Ms("IndexedDbPersistence", "Releasing primary lease."),
                      e.delete("owner"))
                    : xr.resolve()
            );
    }
    pi(t, e) {
        const n = Date.now();
        return !(
            t < n - e ||
            (t > n &&
                (Fs(
                    `Detected an update time that is in the future: ${t} > ${n}`
                ),
                1))
        );
    }
    ci() {
        null !== this.document &&
            "function" == typeof this.document.addEventListener &&
            ((this.ti = () => {
                this.Hs.enqueueAndForget(
                    () => (
                        (this.inForeground =
                            "visible" === this.document.visibilityState),
                        this.ui()
                    )
                );
            }),
            this.document.addEventListener("visibilitychange", this.ti),
            (this.inForeground = "visible" === this.document.visibilityState));
    }
    Ri() {
        this.ti &&
            (this.document.removeEventListener("visibilitychange", this.ti),
            (this.ti = null));
    }
    ai() {
        var t;
        "function" ==
            typeof (null === (t = this.window) || void 0 === t
                ? void 0
                : t.addEventListener) &&
            ((this.Zs = () => {
                this.Ai(),
                    m() &&
                        navigator.appVersion.match(/Version\/1[45]/) &&
                        this.Hs.enterRestrictedMode(!0),
                    this.Hs.enqueueAndForget(() => this.shutdown());
            }),
            this.window.addEventListener("pagehide", this.Zs));
    }
    bi() {
        this.Zs &&
            (this.window.removeEventListener("pagehide", this.Zs),
            (this.Zs = null));
    }
    Ei(t) {
        var e;
        try {
            const n =
                null !==
                (null === (e = this.oi) || void 0 === e
                    ? void 0
                    : e.getItem(this.Ti(t)));
            return (
                Ms(
                    "IndexedDbPersistence",
                    `Client '${t}' ${
                        n ? "is" : "is not"
                    } zombied in LocalStorage`
                ),
                n
            );
        } catch (t) {
            return (
                Fs(
                    "IndexedDbPersistence",
                    "Failed to get zombied client id.",
                    t
                ),
                !1
            );
        }
    }
    Ai() {
        if (this.oi)
            try {
                this.oi.setItem(this.Ti(this.clientId), String(Date.now()));
            } catch (t) {
                Fs("Failed to set zombie client id.", t);
            }
    }
    Pi() {
        if (this.oi)
            try {
                this.oi.removeItem(this.Ti(this.clientId));
            } catch (t) {}
    }
    Ti(t) {
        return `firestore_zombie_${this.persistenceKey}_${t}`;
    }
}
function kh(t) {
    return Gu(t, "owner");
}
function Rh(t) {
    return Gu(t, "clientMetadata");
}
function Lh(t, e) {
    let n = t.projectId;
    return (
        t.isDefaultDatabase || (n += "." + t.database),
        "firestore/" + e + "/" + n + "/"
    );
}
class Mh {
    constructor(t, e, n, s) {
        (this.targetId = t), (this.fromCache = e), (this.Si = n), (this.Di = s);
    }
    static Ci(t, e) {
        let n = Sa(),
            s = Sa();
        for (const t of e.docChanges)
            switch (t.type) {
                case 0:
                    n = n.add(t.doc.key);
                    break;
                case 1:
                    s = s.add(t.doc.key);
            }
        return new Mh(t, e.fromCache, n, s);
    }
}
class Fh {
    constructor() {
        this.xi = !1;
    }
    initialize(t, e) {
        (this.Ni = t), (this.indexManager = e), (this.xi = !0);
    }
    getDocumentsMatchingQuery(t, e, n, s) {
        return this.ki(t, e)
            .next((r) => r || this.Oi(t, e, s, n))
            .next((n) => n || this.Mi(t, e));
    }
    ki(t, e) {
        if (go(e)) return xr.resolve(null);
        let n = Io(e);
        return this.indexManager.getIndexType(t, n).next((s) =>
            0 === s
                ? null
                : (null !== e.limit &&
                      1 === s &&
                      ((e = Eo(e, null, "F")), (n = Io(e))),
                  this.indexManager
                      .getDocumentsMatchingTarget(t, n)
                      .next((s) => {
                          const r = Sa(...s);
                          return this.Ni.getDocuments(t, r).next((s) =>
                              this.indexManager.getMinOffset(t, n).next((n) => {
                                  const i = this.Fi(e, s);
                                  return this.$i(e, i, r, n.readTime)
                                      ? this.ki(t, Eo(e, null, "F"))
                                      : this.Bi(t, i, e, n);
                              })
                          );
                      }))
        );
    }
    Oi(t, e, n, s) {
        return go(e) || s.isEqual(or.min())
            ? this.Mi(t, e)
            : this.Ni.getDocuments(t, n).next((r) => {
                  const i = this.Fi(e, r);
                  return this.$i(e, i, n, s)
                      ? this.Mi(t, e)
                      : (Rs() <= E.DEBUG &&
                            Ms(
                                "QueryEngine",
                                "Re-using previous result from %s to execute query: %s",
                                s.toString(),
                                _o(e)
                            ),
                        this.Bi(t, i, e, vr(s, -1)));
              });
    }
    Fi(t, e) {
        let n = new Yi(Ao(t));
        return (
            e.forEach((e, s) => {
                xo(t, s) && (n = n.add(s));
            }),
            n
        );
    }
    $i(t, e, n, s) {
        if (null === t.limit) return !1;
        if (n.size !== e.size) return !0;
        const r = "F" === t.limitType ? e.last() : e.first();
        return !!r && (r.hasPendingWrites || r.version.compareTo(s) > 0);
    }
    Mi(t, e) {
        return (
            Rs() <= E.DEBUG &&
                Ms(
                    "QueryEngine",
                    "Using full collection scan to execute query:",
                    _o(e)
                ),
            this.Ni.getDocumentsMatchingQuery(t, e, br.min())
        );
    }
    Bi(t, e, n, s) {
        return this.Ni.getDocumentsMatchingQuery(t, n, s).next(
            (t) => (
                e.forEach((e) => {
                    t = t.insert(e.key, e);
                }),
                t
            )
        );
    }
}
class Oh {
    constructor(t, e, n, s) {
        (this.persistence = t),
            (this.Li = e),
            (this.yt = s),
            (this.qi = new zi(nr)),
            (this.Ui = new fa((t) => io(t), oo)),
            (this.Ki = new Map()),
            (this.Gi = t.getRemoteDocumentCache()),
            (this.Cs = t.getTargetCache()),
            (this.Ns = t.getBundleCache()),
            this.Qi(n);
    }
    Qi(t) {
        (this.documentOverlayCache =
            this.persistence.getDocumentOverlayCache(t)),
            (this.indexManager = this.persistence.getIndexManager(t)),
            (this.mutationQueue = this.persistence.getMutationQueue(
                t,
                this.indexManager
            )),
            (this.localDocuments = new gh(
                this.Gi,
                this.mutationQueue,
                this.documentOverlayCache,
                this.indexManager
            )),
            this.Gi.setIndexManager(this.indexManager),
            this.Li.initialize(this.localDocuments, this.indexManager);
    }
    collectGarbage(t) {
        return this.persistence.runTransaction(
            "Collect garbage",
            "readwrite-primary",
            (e) => t.collect(e, this.qi)
        );
    }
}
function Vh(t, e, n, s) {
    return new Oh(t, e, n, s);
}
async function Ph(t, e) {
    const n = Us(t);
    return await n.persistence.runTransaction(
        "Handle user change",
        "readonly",
        (t) => {
            let s;
            return n.mutationQueue
                .getAllMutationBatches(t)
                .next(
                    (r) => (
                        (s = r),
                        n.Qi(e),
                        n.mutationQueue.getAllMutationBatches(t)
                    )
                )
                .next((e) => {
                    const r = [],
                        i = [];
                    let o = Sa();
                    for (const t of s) {
                        r.push(t.batchId);
                        for (const e of t.mutations) o = o.add(e.key);
                    }
                    for (const t of e) {
                        i.push(t.batchId);
                        for (const e of t.mutations) o = o.add(e.key);
                    }
                    return n.localDocuments
                        .getDocuments(t, o)
                        .next((t) => ({
                            ji: t,
                            removedBatchIds: r,
                            addedBatchIds: i,
                        }));
                });
        }
    );
}
function qh(t) {
    const e = Us(t);
    return e.persistence.runTransaction(
        "Get last remote snapshot version",
        "readonly",
        (t) => e.Cs.getLastRemoteSnapshotVersion(t)
    );
}
function Bh(t, e, n) {
    let s = Sa(),
        r = Sa();
    return (
        n.forEach((t) => (s = s.add(t))),
        e.getEntries(t, s).next((t) => {
            let s = ga();
            return (
                n.forEach((n, i) => {
                    const o = t.get(n);
                    i.isFoundDocument() !== o.isFoundDocument() &&
                        (r = r.add(n)),
                        i.isNoDocument() && i.version.isEqual(or.min())
                            ? (e.removeEntry(n, i.readTime),
                              (s = s.insert(n, i)))
                            : !o.isValidDocument() ||
                              i.version.compareTo(o.version) > 0 ||
                              (0 === i.version.compareTo(o.version) &&
                                  o.hasPendingWrites)
                            ? (e.addEntry(i), (s = s.insert(n, i)))
                            : Ms(
                                  "LocalStore",
                                  "Ignoring outdated watch update for ",
                                  n,
                                  ". Current version:",
                                  o.version,
                                  " Watch version:",
                                  i.version
                              );
                }),
                { Wi: s, zi: r }
            );
        })
    );
}
function Uh(t, e) {
    const n = Us(t);
    return n.persistence.runTransaction(
        "Get next mutation batch",
        "readonly",
        (t) => (
            void 0 === e && (e = -1),
            n.mutationQueue.getNextMutationBatchAfterBatchId(t, e)
        )
    );
}
function Gh(t, e) {
    const n = Us(t);
    return n.persistence
        .runTransaction("Allocate target", "readwrite", (t) => {
            let s;
            return n.Cs.getTargetData(t, e).next((r) =>
                r
                    ? ((s = r), xr.resolve(s))
                    : n.Cs.allocateTargetId(t).next(
                          (r) => (
                              (s = new Qu(e, r, 0, t.currentSequenceNumber)),
                              n.Cs.addTargetData(t, s).next(() => s)
                          )
                      )
            );
        })
        .then((t) => {
            const s = n.qi.get(t.targetId);
            return (
                (null === s ||
                    t.snapshotVersion.compareTo(s.snapshotVersion) > 0) &&
                    ((n.qi = n.qi.insert(t.targetId, t)),
                    n.Ui.set(e, t.targetId)),
                t
            );
        });
}
async function Kh(t, e, n) {
    const s = Us(t),
        r = s.qi.get(e),
        i = n ? "readwrite" : "readwrite-primary";
    try {
        n ||
            (await s.persistence.runTransaction("Release target", i, (t) =>
                s.persistence.referenceDelegate.removeTarget(t, r)
            ));
    } catch (t) {
        if (!kr(t)) throw t;
        Ms(
            "LocalStore",
            `Failed to update sequence numbers for target ${e}: ${t}`
        );
    }
    (s.qi = s.qi.remove(e)), s.Ui.delete(r.target);
}
function jh(t, e, n) {
    const s = Us(t);
    let r = or.min(),
        i = Sa();
    return s.persistence.runTransaction("Execute query", "readonly", (t) =>
        (function (t, e, n) {
            const s = Us(t),
                r = s.Ui.get(n);
            return void 0 !== r
                ? xr.resolve(s.qi.get(r))
                : s.Cs.getTargetData(e, n);
        })(s, t, Io(e))
            .next((e) => {
                if (e)
                    return (
                        (r = e.lastLimboFreeSnapshotVersion),
                        s.Cs.getMatchingKeysForTargetId(t, e.targetId).next(
                            (t) => {
                                i = t;
                            }
                        )
                    );
            })
            .next(() =>
                s.Li.getDocumentsMatchingQuery(
                    t,
                    e,
                    n ? r : or.min(),
                    n ? i : Sa()
                )
            )
            .next((t) => (zh(s, Do(e), t), { documents: t, Hi: i }))
    );
}
function $h(t, e) {
    const n = Us(t),
        s = Us(n.Cs),
        r = n.qi.get(e);
    return r
        ? Promise.resolve(r.target)
        : n.persistence.runTransaction("Get target data", "readonly", (t) =>
              s.ne(t, e).next((t) => (t ? t.target : null))
          );
}
function Qh(t, e) {
    const n = Us(t),
        s = n.Ki.get(e) || or.min();
    return n.persistence
        .runTransaction("Get new document changes", "readonly", (t) =>
            n.Gi.getAllFromCollectionGroup(
                t,
                e,
                vr(s, -1),
                Number.MAX_SAFE_INTEGER
            )
        )
        .then((t) => (zh(n, e, t), t));
}
function zh(t, e, n) {
    let s = t.Ki.get(e) || or.min();
    n.forEach((t, e) => {
        e.readTime.compareTo(s) > 0 && (s = e.readTime);
    }),
        t.Ki.set(e, s);
}
async function Hh(t, e, n = Sa()) {
    const s = await Gh(t, Io(ec(e.bundledQuery))),
        r = Us(t);
    return r.persistence.runTransaction(
        "Save named query",
        "readwrite",
        (t) => {
            const i = Ka(e.readTime);
            if (s.snapshotVersion.compareTo(i) >= 0)
                return r.Ns.saveNamedQuery(t, e);
            const o = s.withResumeToken(Hr.EMPTY_BYTE_STRING, i);
            return (
                (r.qi = r.qi.insert(o.targetId, o)),
                r.Cs.updateTargetData(t, o)
                    .next(() =>
                        r.Cs.removeMatchingKeysForTargetId(t, s.targetId)
                    )
                    .next(() => r.Cs.addMatchingKeys(t, n, s.targetId))
                    .next(() => r.Ns.saveNamedQuery(t, e))
            );
        }
    );
}
function Wh(t, e) {
    return `firestore_clients_${t}_${e}`;
}
function Yh(t, e, n) {
    let s = `firestore_mutations_${t}_${n}`;
    return e.isAuthenticated() && (s += `_${e.uid}`), s;
}
function Xh(t, e) {
    return `firestore_targets_${t}_${e}`;
}
class Jh {
    constructor(t, e, n, s) {
        (this.user = t), (this.batchId = e), (this.state = n), (this.error = s);
    }
    static Zi(t, e, n) {
        const s = JSON.parse(n);
        let r,
            i =
                "object" == typeof s &&
                -1 !==
                    ["pending", "acknowledged", "rejected"].indexOf(s.state) &&
                (void 0 === s.error || "object" == typeof s.error);
        return (
            i &&
                s.error &&
                ((i =
                    "string" == typeof s.error.message &&
                    "string" == typeof s.error.code),
                i && (r = new Ks(s.error.code, s.error.message))),
            i
                ? new Jh(t, e, s.state, r)
                : (Fs(
                      "SharedClientState",
                      `Failed to parse mutation state for ID '${e}': ${n}`
                  ),
                  null)
        );
    }
    tr() {
        const t = { state: this.state, updateTimeMs: Date.now() };
        return (
            this.error &&
                (t.error = {
                    code: this.error.code,
                    message: this.error.message,
                }),
            JSON.stringify(t)
        );
    }
}
class Zh {
    constructor(t, e, n) {
        (this.targetId = t), (this.state = e), (this.error = n);
    }
    static Zi(t, e) {
        const n = JSON.parse(e);
        let s,
            r =
                "object" == typeof n &&
                -1 !==
                    ["not-current", "current", "rejected"].indexOf(n.state) &&
                (void 0 === n.error || "object" == typeof n.error);
        return (
            r &&
                n.error &&
                ((r =
                    "string" == typeof n.error.message &&
                    "string" == typeof n.error.code),
                r && (s = new Ks(n.error.code, n.error.message))),
            r
                ? new Zh(t, n.state, s)
                : (Fs(
                      "SharedClientState",
                      `Failed to parse target state for ID '${t}': ${e}`
                  ),
                  null)
        );
    }
    tr() {
        const t = { state: this.state, updateTimeMs: Date.now() };
        return (
            this.error &&
                (t.error = {
                    code: this.error.code,
                    message: this.error.message,
                }),
            JSON.stringify(t)
        );
    }
}
class tl {
    constructor(t, e) {
        (this.clientId = t), (this.activeTargetIds = e);
    }
    static Zi(t, e) {
        const n = JSON.parse(e);
        let s = "object" == typeof n && n.activeTargetIds instanceof Array,
            r = xa();
        for (let t = 0; s && t < n.activeTargetIds.length; ++t)
            (s = Qr(n.activeTargetIds[t])), (r = r.add(n.activeTargetIds[t]));
        return s
            ? new tl(t, r)
            : (Fs(
                  "SharedClientState",
                  `Failed to parse client data for instance '${t}': ${e}`
              ),
              null);
    }
}
class el {
    constructor(t, e) {
        (this.clientId = t), (this.onlineState = e);
    }
    static Zi(t) {
        const e = JSON.parse(t);
        return "object" == typeof e &&
            -1 !== ["Unknown", "Online", "Offline"].indexOf(e.onlineState) &&
            "string" == typeof e.clientId
            ? new el(e.clientId, e.onlineState)
            : (Fs("SharedClientState", `Failed to parse online state: ${t}`),
              null);
    }
}
class nl {
    constructor() {
        this.activeTargetIds = xa();
    }
    er(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }
    nr(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }
    tr() {
        const t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now(),
        };
        return JSON.stringify(t);
    }
}
class sl {
    constructor(t, e, n, s, r) {
        (this.window = t),
            (this.Hs = e),
            (this.persistenceKey = n),
            (this.sr = s),
            (this.syncEngine = null),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null),
            (this.ir = this.rr.bind(this)),
            (this.ur = new zi(nr)),
            (this.started = !1),
            (this.cr = []);
        const i = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        (this.storage = this.window.localStorage),
            (this.currentUser = r),
            (this.ar = Wh(this.persistenceKey, this.sr)),
            (this.hr = (function (t) {
                return `firestore_sequence_number_${t}`;
            })(this.persistenceKey)),
            (this.ur = this.ur.insert(this.sr, new nl())),
            (this.lr = new RegExp(`^firestore_clients_${i}_([^_]*)$`)),
            (this.dr = new RegExp(
                `^firestore_mutations_${i}_(\\d+)(?:_(.*))?$`
            )),
            (this._r = new RegExp(`^firestore_targets_${i}_(\\d+)$`)),
            (this.wr = (function (t) {
                return `firestore_online_state_${t}`;
            })(this.persistenceKey)),
            (this.mr = (function (t) {
                return `firestore_bundle_loaded_v2_${t}`;
            })(this.persistenceKey)),
            this.window.addEventListener("storage", this.ir);
    }
    static C(t) {
        return !(!t || !t.localStorage);
    }
    async start() {
        const t = await this.syncEngine.vi();
        for (const e of t) {
            if (e === this.sr) continue;
            const t = this.getItem(Wh(this.persistenceKey, e));
            if (t) {
                const n = tl.Zi(e, t);
                n && (this.ur = this.ur.insert(n.clientId, n));
            }
        }
        this.gr();
        const e = this.storage.getItem(this.wr);
        if (e) {
            const t = this.yr(e);
            t && this.pr(t);
        }
        for (const t of this.cr) this.rr(t);
        (this.cr = []),
            this.window.addEventListener("pagehide", () => this.shutdown()),
            (this.started = !0);
    }
    writeSequenceNumber(t) {
        this.setItem(this.hr, JSON.stringify(t));
    }
    getAllActiveQueryTargets() {
        return this.Ir(this.ur);
    }
    isActiveQueryTarget(t) {
        let e = !1;
        return (
            this.ur.forEach((n, s) => {
                s.activeTargetIds.has(t) && (e = !0);
            }),
            e
        );
    }
    addPendingMutation(t) {
        this.Tr(t, "pending");
    }
    updateMutationState(t, e, n) {
        this.Tr(t, e, n), this.Er(t);
    }
    addLocalQueryTarget(t) {
        let e = "not-current";
        if (this.isActiveQueryTarget(t)) {
            const n = this.storage.getItem(Xh(this.persistenceKey, t));
            if (n) {
                const s = Zh.Zi(t, n);
                s && (e = s.state);
            }
        }
        return this.Ar.er(t), this.gr(), e;
    }
    removeLocalQueryTarget(t) {
        this.Ar.nr(t), this.gr();
    }
    isLocalQueryTarget(t) {
        return this.Ar.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        this.removeItem(Xh(this.persistenceKey, t));
    }
    updateQueryState(t, e, n) {
        this.Rr(t, e, n);
    }
    handleUserChange(t, e, n) {
        e.forEach((t) => {
            this.Er(t);
        }),
            (this.currentUser = t),
            n.forEach((t) => {
                this.addPendingMutation(t);
            });
    }
    setOnlineState(t) {
        this.br(t);
    }
    notifyBundleLoaded(t) {
        this.Pr(t);
    }
    shutdown() {
        this.started &&
            (this.window.removeEventListener("storage", this.ir),
            this.removeItem(this.ar),
            (this.started = !1));
    }
    getItem(t) {
        const e = this.storage.getItem(t);
        return Ms("SharedClientState", "READ", t, e), e;
    }
    setItem(t, e) {
        Ms("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }
    removeItem(t) {
        Ms("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }
    rr(t) {
        const e = t;
        if (e.storageArea === this.storage) {
            if (
                (Ms("SharedClientState", "EVENT", e.key, e.newValue),
                e.key === this.ar)
            )
                return void Fs(
                    "Received WebStorage notification for local change. Another client might have garbage-collected our state"
                );
            this.Hs.enqueueRetryable(async () => {
                if (this.started) {
                    if (null !== e.key)
                        if (this.lr.test(e.key)) {
                            if (null == e.newValue) {
                                const t = this.vr(e.key);
                                return this.Vr(t, null);
                            }
                            {
                                const t = this.Sr(e.key, e.newValue);
                                if (t) return this.Vr(t.clientId, t);
                            }
                        } else if (this.dr.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.Dr(e.key, e.newValue);
                                if (t) return this.Cr(t);
                            }
                        } else if (this._r.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.Nr(e.key, e.newValue);
                                if (t) return this.kr(t);
                            }
                        } else if (e.key === this.wr) {
                            if (null !== e.newValue) {
                                const t = this.yr(e.newValue);
                                if (t) return this.pr(t);
                            }
                        } else if (e.key === this.hr) {
                            const t = (function (t) {
                                let e = Pr.at;
                                if (null != t)
                                    try {
                                        const n = JSON.parse(t);
                                        qs("number" == typeof n), (e = n);
                                    } catch (t) {
                                        Fs(
                                            "SharedClientState",
                                            "Failed to read sequence number from WebStorage",
                                            t
                                        );
                                    }
                                return e;
                            })(e.newValue);
                            t !== Pr.at && this.sequenceNumberHandler(t);
                        } else if (e.key === this.mr) {
                            const t = this.Or(e.newValue);
                            await Promise.all(
                                t.map((t) => this.syncEngine.Mr(t))
                            );
                        }
                } else this.cr.push(e);
            });
        }
    }
    get Ar() {
        return this.ur.get(this.sr);
    }
    gr() {
        this.setItem(this.ar, this.Ar.tr());
    }
    Tr(t, e, n) {
        const s = new Jh(this.currentUser, t, e, n),
            r = Yh(this.persistenceKey, this.currentUser, t);
        this.setItem(r, s.tr());
    }
    Er(t) {
        const e = Yh(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }
    br(t) {
        const e = { clientId: this.sr, onlineState: t };
        this.storage.setItem(this.wr, JSON.stringify(e));
    }
    Rr(t, e, n) {
        const s = Xh(this.persistenceKey, t),
            r = new Zh(t, e, n);
        this.setItem(s, r.tr());
    }
    Pr(t) {
        const e = JSON.stringify(Array.from(t));
        this.setItem(this.mr, e);
    }
    vr(t) {
        const e = this.lr.exec(t);
        return e ? e[1] : null;
    }
    Sr(t, e) {
        const n = this.vr(t);
        return tl.Zi(n, e);
    }
    Dr(t, e) {
        const n = this.dr.exec(t),
            s = Number(n[1]),
            r = void 0 !== n[2] ? n[2] : null;
        return Jh.Zi(new Cs(r), s, e);
    }
    Nr(t, e) {
        const n = this._r.exec(t),
            s = Number(n[1]);
        return Zh.Zi(s, e);
    }
    yr(t) {
        return el.Zi(t);
    }
    Or(t) {
        return JSON.parse(t);
    }
    async Cr(t) {
        if (t.user.uid === this.currentUser.uid)
            return this.syncEngine.Fr(t.batchId, t.state, t.error);
        Ms(
            "SharedClientState",
            `Ignoring mutation for non-active user ${t.user.uid}`
        );
    }
    kr(t) {
        return this.syncEngine.$r(t.targetId, t.state, t.error);
    }
    Vr(t, e) {
        const n = e ? this.ur.insert(t, e) : this.ur.remove(t),
            s = this.Ir(this.ur),
            r = this.Ir(n),
            i = [],
            o = [];
        return (
            r.forEach((t) => {
                s.has(t) || i.push(t);
            }),
            s.forEach((t) => {
                r.has(t) || o.push(t);
            }),
            this.syncEngine.Br(i, o).then(() => {
                this.ur = n;
            })
        );
    }
    pr(t) {
        this.ur.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }
    Ir(t) {
        let e = xa();
        return (
            t.forEach((t, n) => {
                e = e.unionWith(n.activeTargetIds);
            }),
            e
        );
    }
}
class rl {
    constructor() {
        (this.Lr = new nl()),
            (this.qr = {}),
            (this.onlineStateHandler = null),
            (this.sequenceNumberHandler = null);
    }
    addPendingMutation(t) {}
    updateMutationState(t, e, n) {}
    addLocalQueryTarget(t) {
        return this.Lr.er(t), this.qr[t] || "not-current";
    }
    updateQueryState(t, e, n) {
        this.qr[t] = e;
    }
    removeLocalQueryTarget(t) {
        this.Lr.nr(t);
    }
    isLocalQueryTarget(t) {
        return this.Lr.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        delete this.qr[t];
    }
    getAllActiveQueryTargets() {
        return this.Lr.activeTargetIds;
    }
    isActiveQueryTarget(t) {
        return this.Lr.activeTargetIds.has(t);
    }
    start() {
        return (this.Lr = new nl()), Promise.resolve();
    }
    handleUserChange(t, e, n) {}
    setOnlineState(t) {}
    shutdown() {}
    writeSequenceNumber(t) {}
    notifyBundleLoaded(t) {}
}
class il {
    Ur(t) {}
    shutdown() {}
}
class ol {
    constructor() {
        (this.Kr = () => this.Gr()),
            (this.Qr = () => this.jr()),
            (this.Wr = []),
            this.zr();
    }
    Ur(t) {
        this.Wr.push(t);
    }
    shutdown() {
        window.removeEventListener("online", this.Kr),
            window.removeEventListener("offline", this.Qr);
    }
    zr() {
        window.addEventListener("online", this.Kr),
            window.addEventListener("offline", this.Qr);
    }
    Gr() {
        Ms("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t of this.Wr) t(0);
    }
    jr() {
        Ms("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t of this.Wr) t(1);
    }
    static C() {
        return (
            "undefined" != typeof window &&
            void 0 !== window.addEventListener &&
            void 0 !== window.removeEventListener
        );
    }
}
const al = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery",
    RunAggregationQuery: "runAggregationQuery",
};
class ul {
    constructor(t) {
        (this.Hr = t.Hr), (this.Jr = t.Jr);
    }
    Yr(t) {
        this.Xr = t;
    }
    Zr(t) {
        this.eo = t;
    }
    onMessage(t) {
        this.no = t;
    }
    close() {
        this.Jr();
    }
    send(t) {
        this.Hr(t);
    }
    so() {
        this.Xr();
    }
    io(t) {
        this.eo(t);
    }
    ro(t) {
        this.no(t);
    }
}
class cl extends class {
    constructor(t) {
        (this.databaseInfo = t), (this.databaseId = t.databaseId);
        const e = t.ssl ? "https" : "http";
        (this.oo = e + "://" + t.host),
            (this.uo =
                "projects/" +
                this.databaseId.projectId +
                "/databases/" +
                this.databaseId.database +
                "/documents");
    }
    get co() {
        return !1;
    }
    ao(t, e, n, s, r) {
        const i = this.ho(t, e);
        Ms("RestConnection", "Sending: ", i, n);
        const o = {};
        return (
            this.lo(o, s, r),
            this.fo(t, i, o, n).then(
                (t) => (Ms("RestConnection", "Received: ", t), t),
                (e) => {
                    throw (
                        (Os(
                            "RestConnection",
                            `${t} failed with error: `,
                            e,
                            "url: ",
                            i,
                            "request:",
                            n
                        ),
                        e)
                    );
                }
            )
        );
    }
    _o(t, e, n, s, r, i) {
        return this.ao(t, e, n, s, r);
    }
    lo(t, e, n) {
        (t["X-Goog-Api-Client"] = "gl-js/ fire/" + Ns),
            (t["Content-Type"] = "text/plain"),
            this.databaseInfo.appId &&
                (t["X-Firebase-GMPID"] = this.databaseInfo.appId),
            e && e.headers.forEach((e, n) => (t[n] = e)),
            n && n.headers.forEach((e, n) => (t[n] = e));
    }
    ho(t, e) {
        const n = al[t];
        return `${this.oo}/v1/${e}:${n}`;
    }
} {
    constructor(t) {
        super(t),
            (this.forceLongPolling = t.forceLongPolling),
            (this.autoDetectLongPolling = t.autoDetectLongPolling),
            (this.useFetchStreams = t.useFetchStreams);
    }
    fo(t, e, n, s) {
        return new Promise((r, i) => {
            const o = new Ds();
            o.setWithCredentials(!0),
                o.listenOnce(bs.COMPLETE, () => {
                    try {
                        switch (o.getLastErrorCode()) {
                            case Is.NO_ERROR:
                                const e = o.getResponseJson();
                                Ms(
                                    "Connection",
                                    "XHR received:",
                                    JSON.stringify(e)
                                ),
                                    r(e);
                                break;
                            case Is.TIMEOUT:
                                Ms("Connection", 'RPC "' + t + '" timed out'),
                                    i(
                                        new Ks(
                                            Gs.DEADLINE_EXCEEDED,
                                            "Request time out"
                                        )
                                    );
                                break;
                            case Is.HTTP_ERROR:
                                const n = o.getStatus();
                                if (
                                    (Ms(
                                        "Connection",
                                        'RPC "' + t + '" failed with status:',
                                        n,
                                        "response text:",
                                        o.getResponseText()
                                    ),
                                    n > 0)
                                ) {
                                    let t = o.getResponseJson();
                                    Array.isArray(t) && (t = t[0]);
                                    const e = null == t ? void 0 : t.error;
                                    if (e && e.status && e.message) {
                                        const t = (function (t) {
                                            const e = t
                                                .toLowerCase()
                                                .replace(/_/g, "-");
                                            return Object.values(Gs).indexOf(
                                                e
                                            ) >= 0
                                                ? e
                                                : Gs.UNKNOWN;
                                        })(e.status);
                                        i(new Ks(t, e.message));
                                    } else
                                        i(
                                            new Ks(
                                                Gs.UNKNOWN,
                                                "Server responded with status " +
                                                    o.getStatus()
                                            )
                                        );
                                } else
                                    i(
                                        new Ks(
                                            Gs.UNAVAILABLE,
                                            "Connection failed."
                                        )
                                    );
                                break;
                            default:
                                Ps();
                        }
                    } finally {
                        Ms("Connection", 'RPC "' + t + '" completed.');
                    }
                });
            const a = JSON.stringify(s);
            o.send(e, "POST", a, n, 15);
        });
    }
    wo(t, e, n) {
        const s = [
                this.oo,
                "/",
                "google.firestore.v1.Firestore",
                "/",
                t,
                "/channel",
            ],
            r = new gs(),
            i = fe(),
            o = {
                httpSessionIdParam: "gsessionid",
                initMessageHeaders: {},
                messageUrlParams: {
                    database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
                },
                sendRawJson: !0,
                supportsCrossDomainXhr: !0,
                internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
                forceLongPolling: this.forceLongPolling,
                detectBufferingProxy: this.autoDetectLongPolling,
            };
        this.useFetchStreams && (o.xmlHttpFactory = new _s({})),
            this.lo(o.initMessageHeaders, e, n),
            (o.encodeInitMessageHeaders = !0);
        const a = s.join("");
        Ms("Connection", "Creating WebChannel: " + a, o);
        const u = r.createWebChannel(a, o);
        let c = !1,
            h = !1;
        const l = new ul({
                Hr: (t) => {
                    h
                        ? Ms(
                              "Connection",
                              "Not sending because WebChannel is closed:",
                              t
                          )
                        : (c ||
                              (Ms(
                                  "Connection",
                                  "Opening WebChannel transport."
                              ),
                              u.open(),
                              (c = !0)),
                          Ms("Connection", "WebChannel sending:", t),
                          u.send(t));
                },
                Jr: () => u.close(),
            }),
            d = (t, e, n) => {
                t.listen(e, (t) => {
                    try {
                        n(t);
                    } catch (t) {
                        setTimeout(() => {
                            throw t;
                        }, 0);
                    }
                });
            };
        return (
            d(u, xs.EventType.OPEN, () => {
                h || Ms("Connection", "WebChannel transport opened.");
            }),
            d(u, xs.EventType.CLOSE, () => {
                h ||
                    ((h = !0),
                    Ms("Connection", "WebChannel transport closed"),
                    l.io());
            }),
            d(u, xs.EventType.ERROR, (t) => {
                h ||
                    ((h = !0),
                    Os("Connection", "WebChannel transport errored:", t),
                    l.io(
                        new Ks(
                            Gs.UNAVAILABLE,
                            "The operation could not be completed"
                        )
                    ));
            }),
            d(u, xs.EventType.MESSAGE, (t) => {
                var e;
                if (!h) {
                    const n = t.data[0];
                    qs(!!n);
                    const s = n,
                        r =
                            s.error ||
                            (null === (e = s[0]) || void 0 === e
                                ? void 0
                                : e.error);
                    if (r) {
                        Ms("Connection", "WebChannel received error:", r);
                        const t = r.status;
                        let e = (function (t) {
                                const e = ca[t];
                                if (void 0 !== e) return da(e);
                            })(t),
                            n = r.message;
                        void 0 === e &&
                            ((e = Gs.INTERNAL),
                            (n =
                                "Unknown error status: " +
                                t +
                                " with message " +
                                r.message)),
                            (h = !0),
                            l.io(new Ks(e, n)),
                            u.close();
                    } else Ms("Connection", "WebChannel received:", n), l.ro(n);
                }
            }),
            d(i, Es.STAT_EVENT, (t) => {
                t.stat === Ts
                    ? Ms("Connection", "Detected buffering proxy")
                    : t.stat === Ss &&
                      Ms("Connection", "Detected no buffering proxy");
            }),
            setTimeout(() => {
                l.so();
            }, 0),
            l
        );
    }
}
function hl() {
    return "undefined" != typeof window ? window : null;
}
function ll() {
    return "undefined" != typeof document ? document : null;
}
function dl(t) {
    return new qa(t, !0);
}
class fl {
    constructor(t, e, n = 1e3, s = 1.5, r = 6e4) {
        (this.Hs = t),
            (this.timerId = e),
            (this.mo = n),
            (this.yo = s),
            (this.po = r),
            (this.Io = 0),
            (this.To = null),
            (this.Eo = Date.now()),
            this.reset();
    }
    reset() {
        this.Io = 0;
    }
    Ao() {
        this.Io = this.po;
    }
    Ro(t) {
        this.cancel();
        const e = Math.floor(this.Io + this.bo()),
            n = Math.max(0, Date.now() - this.Eo),
            s = Math.max(0, e - n);
        s > 0 &&
            Ms(
                "ExponentialBackoff",
                `Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`
            ),
            (this.To = this.Hs.enqueueAfterDelay(
                this.timerId,
                s,
                () => ((this.Eo = Date.now()), t())
            )),
            (this.Io *= this.yo),
            this.Io < this.mo && (this.Io = this.mo),
            this.Io > this.po && (this.Io = this.po);
    }
    Po() {
        null !== this.To && (this.To.skipDelay(), (this.To = null));
    }
    cancel() {
        null !== this.To && (this.To.cancel(), (this.To = null));
    }
    bo() {
        return (Math.random() - 0.5) * this.Io;
    }
}
class ml {
    constructor(t, e, n, s, r, i, o, a) {
        (this.Hs = t),
            (this.vo = n),
            (this.Vo = s),
            (this.connection = r),
            (this.authCredentialsProvider = i),
            (this.appCheckCredentialsProvider = o),
            (this.listener = a),
            (this.state = 0),
            (this.So = 0),
            (this.Do = null),
            (this.Co = null),
            (this.stream = null),
            (this.xo = new fl(t, e));
    }
    No() {
        return 1 === this.state || 5 === this.state || this.ko();
    }
    ko() {
        return 2 === this.state || 3 === this.state;
    }
    start() {
        4 !== this.state ? this.auth() : this.Oo();
    }
    async stop() {
        this.No() && (await this.close(0));
    }
    Mo() {
        (this.state = 0), this.xo.reset();
    }
    Fo() {
        this.ko() &&
            null === this.Do &&
            (this.Do = this.Hs.enqueueAfterDelay(this.vo, 6e4, () =>
                this.$o()
            ));
    }
    Bo(t) {
        this.Lo(), this.stream.send(t);
    }
    async $o() {
        if (this.ko()) return this.close(0);
    }
    Lo() {
        this.Do && (this.Do.cancel(), (this.Do = null));
    }
    qo() {
        this.Co && (this.Co.cancel(), (this.Co = null));
    }
    async close(t, e) {
        this.Lo(),
            this.qo(),
            this.xo.cancel(),
            this.So++,
            4 !== t
                ? this.xo.reset()
                : e && e.code === Gs.RESOURCE_EXHAUSTED
                ? (Fs(e.toString()),
                  Fs(
                      "Using maximum backoff delay to prevent overloading the backend."
                  ),
                  this.xo.Ao())
                : e &&
                  e.code === Gs.UNAUTHENTICATED &&
                  3 !== this.state &&
                  (this.authCredentialsProvider.invalidateToken(),
                  this.appCheckCredentialsProvider.invalidateToken()),
            null !== this.stream &&
                (this.Uo(), this.stream.close(), (this.stream = null)),
            (this.state = t),
            await this.listener.Zr(e);
    }
    Uo() {}
    auth() {
        this.state = 1;
        const t = this.Ko(this.So),
            e = this.So;
        Promise.all([
            this.authCredentialsProvider.getToken(),
            this.appCheckCredentialsProvider.getToken(),
        ]).then(
            ([t, n]) => {
                this.So === e && this.Go(t, n);
            },
            (e) => {
                t(() => {
                    const t = new Ks(
                        Gs.UNKNOWN,
                        "Fetching auth token failed: " + e.message
                    );
                    return this.Qo(t);
                });
            }
        );
    }
    Go(t, e) {
        const n = this.Ko(this.So);
        (this.stream = this.jo(t, e)),
            this.stream.Yr(() => {
                n(
                    () => (
                        (this.state = 2),
                        (this.Co = this.Hs.enqueueAfterDelay(
                            this.Vo,
                            1e4,
                            () => (
                                this.ko() && (this.state = 3), Promise.resolve()
                            )
                        )),
                        this.listener.Yr()
                    )
                );
            }),
            this.stream.Zr((t) => {
                n(() => this.Qo(t));
            }),
            this.stream.onMessage((t) => {
                n(() => this.onMessage(t));
            });
    }
    Oo() {
        (this.state = 5),
            this.xo.Ro(async () => {
                (this.state = 0), this.start();
            });
    }
    Qo(t) {
        return (
            Ms("PersistentStream", `close with error: ${t}`),
            (this.stream = null),
            this.close(4, t)
        );
    }
    Ko(t) {
        return (e) => {
            this.Hs.enqueueAndForget(() =>
                this.So === t
                    ? e()
                    : (Ms(
                          "PersistentStream",
                          "stream callback skipped by getCloseGuardedDispatcher."
                      ),
                      Promise.resolve())
            );
        };
    }
}
class gl extends ml {
    constructor(t, e, n, s, r, i) {
        super(
            t,
            "listen_stream_connection_backoff",
            "listen_stream_idle",
            "health_check_timeout",
            e,
            n,
            s,
            i
        ),
            (this.yt = r);
    }
    jo(t, e) {
        return this.connection.wo("Listen", t, e);
    }
    onMessage(t) {
        this.xo.reset();
        const e = (function (t, e) {
                let n;
                if ("targetChange" in e) {
                    e.targetChange;
                    const s = (function (t) {
                            return "NO_CHANGE" === t
                                ? 0
                                : "ADD" === t
                                ? 1
                                : "REMOVE" === t
                                ? 2
                                : "CURRENT" === t
                                ? 3
                                : "RESET" === t
                                ? 4
                                : Ps();
                        })(e.targetChange.targetChangeType || "NO_CHANGE"),
                        r = e.targetChange.targetIds || [],
                        i = (function (t, e) {
                            return t.wt
                                ? (qs(void 0 === e || "string" == typeof e),
                                  Hr.fromBase64String(e || ""))
                                : (qs(void 0 === e || e instanceof Uint8Array),
                                  Hr.fromUint8Array(e || new Uint8Array()));
                        })(t, e.targetChange.resumeToken),
                        o = e.targetChange.cause,
                        a =
                            o &&
                            (function (t) {
                                const e =
                                    void 0 === t.code ? Gs.UNKNOWN : da(t.code);
                                return new Ks(e, t.message || "");
                            })(o);
                    n = new ka(s, r, i, a || null);
                } else if ("documentChange" in e) {
                    e.documentChange;
                    const s = e.documentChange;
                    s.document, s.document.name, s.document.updateTime;
                    const r = za(t, s.document.name),
                        i = Ka(s.document.updateTime),
                        o = s.document.createTime
                            ? Ka(s.document.createTime)
                            : or.min(),
                        a = new to({ mapValue: { fields: s.document.fields } }),
                        u = no.newFoundDocument(r, i, o, a),
                        c = s.targetIds || [],
                        h = s.removedTargetIds || [];
                    n = new Ca(c, h, u.key, u);
                } else if ("documentDelete" in e) {
                    e.documentDelete;
                    const s = e.documentDelete;
                    s.document;
                    const r = za(t, s.document),
                        i = s.readTime ? Ka(s.readTime) : or.min(),
                        o = no.newNoDocument(r, i),
                        a = s.removedTargetIds || [];
                    n = new Ca([], a, o.key, o);
                } else if ("documentRemove" in e) {
                    e.documentRemove;
                    const s = e.documentRemove;
                    s.document;
                    const r = za(t, s.document),
                        i = s.removedTargetIds || [];
                    n = new Ca([], i, r, null);
                } else {
                    if (!("filter" in e)) return Ps();
                    {
                        e.filter;
                        const t = e.filter;
                        t.targetId;
                        const s = t.count || 0,
                            r = new ua(s),
                            i = t.targetId;
                        n = new Na(i, r);
                    }
                }
                return n;
            })(this.yt, t),
            n = (function (t) {
                if (!("targetChange" in t)) return or.min();
                const e = t.targetChange;
                return e.targetIds && e.targetIds.length
                    ? or.min()
                    : e.readTime
                    ? Ka(e.readTime)
                    : or.min();
            })(t);
        return this.listener.Wo(e, n);
    }
    zo(t) {
        const e = {};
        (e.database = Ya(this.yt)),
            (e.addTarget = (function (t, e) {
                let n;
                const s = e.target;
                return (
                    (n = ao(s) ? { documents: nu(t, s) } : { query: su(t, s) }),
                    (n.targetId = e.targetId),
                    e.resumeToken.approximateByteSize() > 0
                        ? (n.resumeToken = Ua(t, e.resumeToken))
                        : e.snapshotVersion.compareTo(or.min()) > 0 &&
                          (n.readTime = Ba(t, e.snapshotVersion.toTimestamp())),
                    n
                );
            })(this.yt, t));
        const n = (function (t, e) {
            const n = (function (t, e) {
                switch (e) {
                    case 0:
                        return null;
                    case 1:
                        return "existence-filter-mismatch";
                    case 2:
                        return "limbo-document";
                    default:
                        return Ps();
                }
            })(0, e.purpose);
            return null == n ? null : { "goog-listen-tags": n };
        })(this.yt, t);
        n && (e.labels = n), this.Bo(e);
    }
    Ho(t) {
        const e = {};
        (e.database = Ya(this.yt)), (e.removeTarget = t), this.Bo(e);
    }
}
class pl extends ml {
    constructor(t, e, n, s, r, i) {
        super(
            t,
            "write_stream_connection_backoff",
            "write_stream_idle",
            "health_check_timeout",
            e,
            n,
            s,
            i
        ),
            (this.yt = r),
            (this.Jo = !1);
    }
    get Yo() {
        return this.Jo;
    }
    start() {
        (this.Jo = !1), (this.lastStreamToken = void 0), super.start();
    }
    Uo() {
        this.Jo && this.Xo([]);
    }
    jo(t, e) {
        return this.connection.wo("Write", t, e);
    }
    onMessage(t) {
        if (
            (qs(!!t.streamToken),
            (this.lastStreamToken = t.streamToken),
            this.Jo)
        ) {
            this.xo.reset();
            const e = (function (t, e) {
                    return t && t.length > 0
                        ? (qs(void 0 !== e),
                          t.map((t) =>
                              (function (t, e) {
                                  let n = t.updateTime
                                      ? Ka(t.updateTime)
                                      : Ka(e);
                                  return (
                                      n.isEqual(or.min()) && (n = Ka(e)),
                                      new Qo(n, t.transformResults || [])
                                  );
                              })(t, e)
                          ))
                        : [];
                })(t.writeResults, t.commitTime),
                n = Ka(t.commitTime);
            return this.listener.Zo(n, e);
        }
        return (
            qs(!t.writeResults || 0 === t.writeResults.length),
            (this.Jo = !0),
            this.listener.tu()
        );
    }
    eu() {
        const t = {};
        (t.database = Ya(this.yt)), this.Bo(t);
    }
    Xo(t) {
        const e = {
            streamToken: this.lastStreamToken,
            writes: t.map((t) => tu(this.yt, t)),
        };
        this.Bo(e);
    }
}
class yl extends class {} {
    constructor(t, e, n, s) {
        super(),
            (this.authCredentials = t),
            (this.appCheckCredentials = e),
            (this.connection = n),
            (this.yt = s),
            (this.nu = !1);
    }
    su() {
        if (this.nu)
            throw new Ks(
                Gs.FAILED_PRECONDITION,
                "The client has already been terminated."
            );
    }
    ao(t, e, n) {
        return (
            this.su(),
            Promise.all([
                this.authCredentials.getToken(),
                this.appCheckCredentials.getToken(),
            ])
                .then(([s, r]) => this.connection.ao(t, e, n, s, r))
                .catch((t) => {
                    throw "FirebaseError" === t.name
                        ? (t.code === Gs.UNAUTHENTICATED &&
                              (this.authCredentials.invalidateToken(),
                              this.appCheckCredentials.invalidateToken()),
                          t)
                        : new Ks(Gs.UNKNOWN, t.toString());
                })
        );
    }
    _o(t, e, n, s) {
        return (
            this.su(),
            Promise.all([
                this.authCredentials.getToken(),
                this.appCheckCredentials.getToken(),
            ])
                .then(([r, i]) => this.connection._o(t, e, n, r, i, s))
                .catch((t) => {
                    throw "FirebaseError" === t.name
                        ? (t.code === Gs.UNAUTHENTICATED &&
                              (this.authCredentials.invalidateToken(),
                              this.appCheckCredentials.invalidateToken()),
                          t)
                        : new Ks(Gs.UNKNOWN, t.toString());
                })
        );
    }
    terminate() {
        this.nu = !0;
    }
}
class wl {
    constructor(t, e) {
        (this.asyncQueue = t),
            (this.onlineStateHandler = e),
            (this.state = "Unknown"),
            (this.iu = 0),
            (this.ru = null),
            (this.ou = !0);
    }
    uu() {
        0 === this.iu &&
            (this.cu("Unknown"),
            (this.ru = this.asyncQueue.enqueueAfterDelay(
                "online_state_timeout",
                1e4,
                () => (
                    (this.ru = null),
                    this.au("Backend didn't respond within 10 seconds."),
                    this.cu("Offline"),
                    Promise.resolve()
                )
            )));
    }
    hu(t) {
        "Online" === this.state
            ? this.cu("Unknown")
            : (this.iu++,
              this.iu >= 1 &&
                  (this.lu(),
                  this.au(
                      `Connection failed 1 times. Most recent error: ${t.toString()}`
                  ),
                  this.cu("Offline")));
    }
    set(t) {
        this.lu(), (this.iu = 0), "Online" === t && (this.ou = !1), this.cu(t);
    }
    cu(t) {
        t !== this.state && ((this.state = t), this.onlineStateHandler(t));
    }
    au(t) {
        const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.ou ? (Fs(e), (this.ou = !1)) : Ms("OnlineStateTracker", e);
    }
    lu() {
        null !== this.ru && (this.ru.cancel(), (this.ru = null));
    }
}
class vl {
    constructor(t, e, n, s, r) {
        (this.localStore = t),
            (this.datastore = e),
            (this.asyncQueue = n),
            (this.remoteSyncer = {}),
            (this.fu = []),
            (this.du = new Map()),
            (this._u = new Set()),
            (this.wu = []),
            (this.mu = r),
            this.mu.Ur((t) => {
                n.enqueueAndForget(async () => {
                    Al(this) &&
                        (Ms(
                            "RemoteStore",
                            "Restarting streams for network reachability change."
                        ),
                        await (async function (t) {
                            const e = Us(t);
                            e._u.add(4),
                                await bl(e),
                                e.gu.set("Unknown"),
                                e._u.delete(4),
                                await Il(e);
                        })(this));
                });
            }),
            (this.gu = new wl(n, s));
    }
}
async function Il(t) {
    if (Al(t)) for (const e of t.wu) await e(!0);
}
async function bl(t) {
    for (const e of t.wu) await e(!1);
}
function El(t, e) {
    const n = Us(t);
    n.du.has(e.targetId) ||
        (n.du.set(e.targetId, e), Dl(n) ? xl(n) : Ql(n).ko() && Sl(n, e));
}
function Tl(t, e) {
    const n = Us(t),
        s = Ql(n);
    n.du.delete(e),
        s.ko() && _l(n, e),
        0 === n.du.size && (s.ko() ? s.Fo() : Al(n) && n.gu.set("Unknown"));
}
function Sl(t, e) {
    t.yu.Ot(e.targetId), Ql(t).zo(e);
}
function _l(t, e) {
    t.yu.Ot(e), Ql(t).Ho(e);
}
function xl(t) {
    (t.yu = new La({
        getRemoteKeysForTarget: (e) => t.remoteSyncer.getRemoteKeysForTarget(e),
        ne: (e) => t.du.get(e) || null,
    })),
        Ql(t).start(),
        t.gu.uu();
}
function Dl(t) {
    return Al(t) && !Ql(t).No() && t.du.size > 0;
}
function Al(t) {
    return 0 === Us(t)._u.size;
}
function Cl(t) {
    t.yu = void 0;
}
async function Nl(t) {
    t.du.forEach((e, n) => {
        Sl(t, e);
    });
}
async function kl(t, e) {
    Cl(t), Dl(t) ? (t.gu.hu(e), xl(t)) : t.gu.set("Unknown");
}
async function Rl(t, e, n) {
    if ((t.gu.set("Online"), e instanceof ka && 2 === e.state && e.cause))
        try {
            await (async function (t, e) {
                const n = e.cause;
                for (const s of e.targetIds)
                    t.du.has(s) &&
                        (await t.remoteSyncer.rejectListen(s, n),
                        t.du.delete(s),
                        t.yu.removeTarget(s));
            })(t, e);
        } catch (n) {
            Ms(
                "RemoteStore",
                "Failed to remove targets %s: %s ",
                e.targetIds.join(","),
                n
            ),
                await Ll(t, n);
        }
    else if (
        (e instanceof Ca
            ? t.yu.Kt(e)
            : e instanceof Na
            ? t.yu.Jt(e)
            : t.yu.jt(e),
        !n.isEqual(or.min()))
    )
        try {
            const e = await qh(t.localStore);
            n.compareTo(e) >= 0 &&
                (await (function (t, e) {
                    const n = t.yu.Zt(e);
                    return (
                        n.targetChanges.forEach((n, s) => {
                            if (n.resumeToken.approximateByteSize() > 0) {
                                const r = t.du.get(s);
                                r &&
                                    t.du.set(
                                        s,
                                        r.withResumeToken(n.resumeToken, e)
                                    );
                            }
                        }),
                        n.targetMismatches.forEach((e) => {
                            const n = t.du.get(e);
                            if (!n) return;
                            t.du.set(
                                e,
                                n.withResumeToken(
                                    Hr.EMPTY_BYTE_STRING,
                                    n.snapshotVersion
                                )
                            ),
                                _l(t, e);
                            const s = new Qu(n.target, e, 1, n.sequenceNumber);
                            Sl(t, s);
                        }),
                        t.remoteSyncer.applyRemoteEvent(n)
                    );
                })(t, n));
        } catch (e) {
            Ms("RemoteStore", "Failed to raise snapshot:", e), await Ll(t, e);
        }
}
async function Ll(t, e, n) {
    if (!kr(e)) throw e;
    t._u.add(1),
        await bl(t),
        t.gu.set("Offline"),
        n || (n = () => qh(t.localStore)),
        t.asyncQueue.enqueueRetryable(async () => {
            Ms("RemoteStore", "Retrying IndexedDB access"),
                await n(),
                t._u.delete(1),
                await Il(t);
        });
}
function Ml(t, e) {
    return e().catch((n) => Ll(t, n, e));
}
async function Fl(t) {
    const e = Us(t),
        n = zl(e);
    let s = e.fu.length > 0 ? e.fu[e.fu.length - 1].batchId : -1;
    for (; Ol(e); )
        try {
            const t = await Uh(e.localStore, s);
            if (null === t) {
                0 === e.fu.length && n.Fo();
                break;
            }
            (s = t.batchId), Vl(e, t);
        } catch (t) {
            await Ll(e, t);
        }
    Pl(e) && ql(e);
}
function Ol(t) {
    return Al(t) && t.fu.length < 10;
}
function Vl(t, e) {
    t.fu.push(e);
    const n = zl(t);
    n.ko() && n.Yo && n.Xo(e.mutations);
}
function Pl(t) {
    return Al(t) && !zl(t).No() && t.fu.length > 0;
}
function ql(t) {
    zl(t).start();
}
async function Bl(t) {
    zl(t).eu();
}
async function Ul(t) {
    const e = zl(t);
    for (const n of t.fu) e.Xo(n.mutations);
}
async function Gl(t, e, n) {
    const s = t.fu.shift(),
        r = ju.from(s, e, n);
    await Ml(t, () => t.remoteSyncer.applySuccessfulWrite(r)), await Fl(t);
}
async function Kl(t, e) {
    e &&
        zl(t).Yo &&
        (await (async function (t, e) {
            if (la((n = e.code)) && n !== Gs.ABORTED) {
                const n = t.fu.shift();
                zl(t).Mo(),
                    await Ml(t, () =>
                        t.remoteSyncer.rejectFailedWrite(n.batchId, e)
                    ),
                    await Fl(t);
            }
            var n;
        })(t, e)),
        Pl(t) && ql(t);
}
async function jl(t, e) {
    const n = Us(t);
    n.asyncQueue.verifyOperationInProgress(),
        Ms("RemoteStore", "RemoteStore received new credentials");
    const s = Al(n);
    n._u.add(3),
        await bl(n),
        s && n.gu.set("Unknown"),
        await n.remoteSyncer.handleCredentialChange(e),
        n._u.delete(3),
        await Il(n);
}
async function $l(t, e) {
    const n = Us(t);
    e
        ? (n._u.delete(2), await Il(n))
        : e || (n._u.add(2), await bl(n), n.gu.set("Unknown"));
}
function Ql(t) {
    return (
        t.pu ||
            ((t.pu = (function (t, e, n) {
                const s = Us(t);
                return (
                    s.su(),
                    new gl(
                        e,
                        s.connection,
                        s.authCredentials,
                        s.appCheckCredentials,
                        s.yt,
                        n
                    )
                );
            })(t.datastore, t.asyncQueue, {
                Yr: Nl.bind(null, t),
                Zr: kl.bind(null, t),
                Wo: Rl.bind(null, t),
            })),
            t.wu.push(async (e) => {
                e
                    ? (t.pu.Mo(), Dl(t) ? xl(t) : t.gu.set("Unknown"))
                    : (await t.pu.stop(), Cl(t));
            })),
        t.pu
    );
}
function zl(t) {
    return (
        t.Iu ||
            ((t.Iu = (function (t, e, n) {
                const s = Us(t);
                return (
                    s.su(),
                    new pl(
                        e,
                        s.connection,
                        s.authCredentials,
                        s.appCheckCredentials,
                        s.yt,
                        n
                    )
                );
            })(t.datastore, t.asyncQueue, {
                Yr: Bl.bind(null, t),
                Zr: Kl.bind(null, t),
                tu: Ul.bind(null, t),
                Zo: Gl.bind(null, t),
            })),
            t.wu.push(async (e) => {
                e
                    ? (t.Iu.Mo(), await Fl(t))
                    : (await t.Iu.stop(),
                      t.fu.length > 0 &&
                          (Ms(
                              "RemoteStore",
                              `Stopping write stream with ${t.fu.length} pending writes`
                          ),
                          (t.fu = [])));
            })),
        t.Iu
    );
}
class Hl {
    constructor(t, e, n, s, r) {
        (this.asyncQueue = t),
            (this.timerId = e),
            (this.targetTimeMs = n),
            (this.op = s),
            (this.removalCallback = r),
            (this.deferred = new js()),
            (this.then = this.deferred.promise.then.bind(
                this.deferred.promise
            )),
            this.deferred.promise.catch((t) => {});
    }
    static createAndSchedule(t, e, n, s, r) {
        const i = Date.now() + n,
            o = new Hl(t, e, i, s, r);
        return o.start(n), o;
    }
    start(t) {
        this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t);
    }
    skipDelay() {
        return this.handleDelayElapsed();
    }
    cancel(t) {
        null !== this.timerHandle &&
            (this.clearTimeout(),
            this.deferred.reject(
                new Ks(
                    Gs.CANCELLED,
                    "Operation cancelled" + (t ? ": " + t : "")
                )
            ));
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget(() =>
            null !== this.timerHandle
                ? (this.clearTimeout(),
                  this.op().then((t) => this.deferred.resolve(t)))
                : Promise.resolve()
        );
    }
    clearTimeout() {
        null !== this.timerHandle &&
            (this.removalCallback(this),
            clearTimeout(this.timerHandle),
            (this.timerHandle = null));
    }
}
function Wl(t, e) {
    if ((Fs("AsyncQueue", `${e}: ${t}`), kr(t)))
        return new Ks(Gs.UNAVAILABLE, `${e}: ${t}`);
    throw t;
}
class Yl {
    constructor(t) {
        (this.comparator = t
            ? (e, n) => t(e, n) || lr.comparator(e.key, n.key)
            : (t, e) => lr.comparator(t.key, e.key)),
            (this.keyedMap = ya()),
            (this.sortedSet = new zi(this.comparator));
    }
    static emptySet(t) {
        return new Yl(t.comparator);
    }
    has(t) {
        return null != this.keyedMap.get(t);
    }
    get(t) {
        return this.keyedMap.get(t);
    }
    first() {
        return this.sortedSet.minKey();
    }
    last() {
        return this.sortedSet.maxKey();
    }
    isEmpty() {
        return this.sortedSet.isEmpty();
    }
    indexOf(t) {
        const e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }
    get size() {
        return this.sortedSet.size;
    }
    forEach(t) {
        this.sortedSet.inorderTraversal((e, n) => (t(e), !1));
    }
    add(t) {
        const e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }
    delete(t) {
        const e = this.get(t);
        return e
            ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e))
            : this;
    }
    isEqual(t) {
        if (!(t instanceof Yl)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.sortedSet.getIterator(),
            n = t.sortedSet.getIterator();
        for (; e.hasNext(); ) {
            const t = e.getNext().key,
                s = n.getNext().key;
            if (!t.isEqual(s)) return !1;
        }
        return !0;
    }
    toString() {
        const t = [];
        return (
            this.forEach((e) => {
                t.push(e.toString());
            }),
            0 === t.length
                ? "DocumentSet ()"
                : "DocumentSet (\n  " + t.join("  \n") + "\n)"
        );
    }
    copy(t, e) {
        const n = new Yl();
        return (
            (n.comparator = this.comparator),
            (n.keyedMap = t),
            (n.sortedSet = e),
            n
        );
    }
}
class Xl {
    constructor() {
        this.Tu = new zi(lr.comparator);
    }
    track(t) {
        const e = t.doc.key,
            n = this.Tu.get(e);
        n
            ? 0 !== t.type && 3 === n.type
                ? (this.Tu = this.Tu.insert(e, t))
                : 3 === t.type && 1 !== n.type
                ? (this.Tu = this.Tu.insert(e, { type: n.type, doc: t.doc }))
                : 2 === t.type && 2 === n.type
                ? (this.Tu = this.Tu.insert(e, { type: 2, doc: t.doc }))
                : 2 === t.type && 0 === n.type
                ? (this.Tu = this.Tu.insert(e, { type: 0, doc: t.doc }))
                : 1 === t.type && 0 === n.type
                ? (this.Tu = this.Tu.remove(e))
                : 1 === t.type && 2 === n.type
                ? (this.Tu = this.Tu.insert(e, { type: 1, doc: n.doc }))
                : 0 === t.type && 1 === n.type
                ? (this.Tu = this.Tu.insert(e, { type: 2, doc: t.doc }))
                : Ps()
            : (this.Tu = this.Tu.insert(e, t));
    }
    Eu() {
        const t = [];
        return (
            this.Tu.inorderTraversal((e, n) => {
                t.push(n);
            }),
            t
        );
    }
}
class Jl {
    constructor(t, e, n, s, r, i, o, a, u) {
        (this.query = t),
            (this.docs = e),
            (this.oldDocs = n),
            (this.docChanges = s),
            (this.mutatedKeys = r),
            (this.fromCache = i),
            (this.syncStateChanged = o),
            (this.excludesMetadataChanges = a),
            (this.hasCachedResults = u);
    }
    static fromInitialDocuments(t, e, n, s, r) {
        const i = [];
        return (
            e.forEach((t) => {
                i.push({ type: 0, doc: t });
            }),
            new Jl(t, e, Yl.emptySet(e), i, n, s, !0, !1, r)
        );
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
    }
    isEqual(t) {
        if (
            !(
                this.fromCache === t.fromCache &&
                this.hasCachedResults === t.hasCachedResults &&
                this.syncStateChanged === t.syncStateChanged &&
                this.mutatedKeys.isEqual(t.mutatedKeys) &&
                To(this.query, t.query) &&
                this.docs.isEqual(t.docs) &&
                this.oldDocs.isEqual(t.oldDocs)
            )
        )
            return !1;
        const e = this.docChanges,
            n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (let t = 0; t < e.length; t++)
            if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc))
                return !1;
        return !0;
    }
}
class Zl {
    constructor() {
        (this.Au = void 0), (this.listeners = []);
    }
}
class td {
    constructor() {
        (this.queries = new fa((t) => So(t), To)),
            (this.onlineState = "Unknown"),
            (this.Ru = new Set());
    }
}
async function ed(t, e) {
    const n = Us(t),
        s = e.query;
    let r = !1,
        i = n.queries.get(s);
    if ((i || ((r = !0), (i = new Zl())), r))
        try {
            i.Au = await n.onListen(s);
        } catch (t) {
            const n = Wl(t, `Initialization of query '${_o(e.query)}' failed`);
            return void e.onError(n);
        }
    n.queries.set(s, i),
        i.listeners.push(e),
        e.bu(n.onlineState),
        i.Au && e.Pu(i.Au) && id(n);
}
async function nd(t, e) {
    const n = Us(t),
        s = e.query;
    let r = !1;
    const i = n.queries.get(s);
    if (i) {
        const t = i.listeners.indexOf(e);
        t >= 0 && (i.listeners.splice(t, 1), (r = 0 === i.listeners.length));
    }
    if (r) return n.queries.delete(s), n.onUnlisten(s);
}
function sd(t, e) {
    const n = Us(t);
    let s = !1;
    for (const t of e) {
        const e = t.query,
            r = n.queries.get(e);
        if (r) {
            for (const e of r.listeners) e.Pu(t) && (s = !0);
            r.Au = t;
        }
    }
    s && id(n);
}
function rd(t, e, n) {
    const s = Us(t),
        r = s.queries.get(e);
    if (r) for (const t of r.listeners) t.onError(n);
    s.queries.delete(e);
}
function id(t) {
    t.Ru.forEach((t) => {
        t.next();
    });
}
class od {
    constructor(t, e, n) {
        (this.query = t),
            (this.vu = e),
            (this.Vu = !1),
            (this.Su = null),
            (this.onlineState = "Unknown"),
            (this.options = n || {});
    }
    Pu(t) {
        if (!this.options.includeMetadataChanges) {
            const e = [];
            for (const n of t.docChanges) 3 !== n.type && e.push(n);
            t = new Jl(
                t.query,
                t.docs,
                t.oldDocs,
                e,
                t.mutatedKeys,
                t.fromCache,
                t.syncStateChanged,
                !0,
                t.hasCachedResults
            );
        }
        let e = !1;
        return (
            this.Vu
                ? this.Du(t) && (this.vu.next(t), (e = !0))
                : this.Cu(t, this.onlineState) && (this.xu(t), (e = !0)),
            (this.Su = t),
            e
        );
    }
    onError(t) {
        this.vu.error(t);
    }
    bu(t) {
        this.onlineState = t;
        let e = !1;
        return (
            this.Su &&
                !this.Vu &&
                this.Cu(this.Su, t) &&
                (this.xu(this.Su), (e = !0)),
            e
        );
    }
    Cu(t, e) {
        if (!t.fromCache) return !0;
        const n = "Offline" !== e;
        return (
            (!this.options.Nu || !n) &&
            (!t.docs.isEmpty() || t.hasCachedResults || "Offline" === e)
        );
    }
    Du(t) {
        if (t.docChanges.length > 0) return !0;
        const e = this.Su && this.Su.hasPendingWrites !== t.hasPendingWrites;
        return (
            !(!t.syncStateChanged && !e) &&
            !0 === this.options.includeMetadataChanges
        );
    }
    xu(t) {
        (t = Jl.fromInitialDocuments(
            t.query,
            t.docs,
            t.mutatedKeys,
            t.fromCache,
            t.hasCachedResults
        )),
            (this.Vu = !0),
            this.vu.next(t);
    }
}
class ad {
    constructor(t, e) {
        (this.ku = t), (this.byteLength = e);
    }
    Ou() {
        return "metadata" in this.ku;
    }
}
class ud {
    constructor(t) {
        this.yt = t;
    }
    Ji(t) {
        return za(this.yt, t);
    }
    Yi(t) {
        return t.metadata.exists
            ? Za(this.yt, t.document, !1)
            : no.newNoDocument(
                  this.Ji(t.metadata.name),
                  this.Xi(t.metadata.readTime)
              );
    }
    Xi(t) {
        return Ka(t);
    }
}
class cd {
    constructor(t, e, n) {
        (this.Mu = t),
            (this.localStore = e),
            (this.yt = n),
            (this.queries = []),
            (this.documents = []),
            (this.collectionGroups = new Set()),
            (this.progress = hd(t));
    }
    Fu(t) {
        this.progress.bytesLoaded += t.byteLength;
        let e = this.progress.documentsLoaded;
        if (t.ku.namedQuery) this.queries.push(t.ku.namedQuery);
        else if (t.ku.documentMetadata) {
            this.documents.push({ metadata: t.ku.documentMetadata }),
                t.ku.documentMetadata.exists || ++e;
            const n = ur.fromString(t.ku.documentMetadata.name);
            this.collectionGroups.add(n.get(n.length - 2));
        } else
            t.ku.document &&
                ((this.documents[this.documents.length - 1].document =
                    t.ku.document),
                ++e);
        return e !== this.progress.documentsLoaded
            ? ((this.progress.documentsLoaded = e),
              Object.assign({}, this.progress))
            : null;
    }
    $u(t) {
        const e = new Map(),
            n = new ud(this.yt);
        for (const s of t)
            if (s.metadata.queries) {
                const t = n.Ji(s.metadata.name);
                for (const n of s.metadata.queries) {
                    const s = (e.get(n) || Sa()).add(t);
                    e.set(n, s);
                }
            }
        return e;
    }
    async complete() {
        const t = await (async function (t, e, n, s) {
                const r = Us(t);
                let i = Sa(),
                    o = ga();
                for (const t of n) {
                    const n = e.Ji(t.metadata.name);
                    t.document && (i = i.add(n));
                    const s = e.Yi(t);
                    s.setReadTime(e.Xi(t.metadata.readTime)),
                        (o = o.insert(n, s));
                }
                const a = r.Gi.newChangeBuffer({ trackRemovals: !0 }),
                    u = await Gh(
                        r,
                        (function (t) {
                            return Io(
                                mo(ur.fromString(`__bundle__/docs/${t}`))
                            );
                        })(s)
                    );
                return r.persistence.runTransaction(
                    "Apply bundle documents",
                    "readwrite",
                    (t) =>
                        Bh(t, a, o)
                            .next((e) => (a.apply(t), e))
                            .next((e) =>
                                r.Cs.removeMatchingKeysForTargetId(
                                    t,
                                    u.targetId
                                )
                                    .next(() =>
                                        r.Cs.addMatchingKeys(t, i, u.targetId)
                                    )
                                    .next(() =>
                                        r.localDocuments.getLocalViewOfDocuments(
                                            t,
                                            e.Wi,
                                            e.zi
                                        )
                                    )
                                    .next(() => e.Wi)
                            )
                );
            })(this.localStore, new ud(this.yt), this.documents, this.Mu.id),
            e = this.$u(this.documents);
        for (const t of this.queries)
            await Hh(this.localStore, t, e.get(t.name));
        return (
            (this.progress.taskState = "Success"),
            { progress: this.progress, Bu: this.collectionGroups, Lu: t }
        );
    }
}
function hd(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes,
    };
}
class ld {
    constructor(t) {
        this.key = t;
    }
}
class dd {
    constructor(t) {
        this.key = t;
    }
}
class fd {
    constructor(t, e) {
        (this.query = t),
            (this.qu = e),
            (this.Uu = null),
            (this.hasCachedResults = !1),
            (this.current = !1),
            (this.Ku = Sa()),
            (this.mutatedKeys = Sa()),
            (this.Gu = Ao(t)),
            (this.Qu = new Yl(this.Gu));
    }
    get ju() {
        return this.qu;
    }
    Wu(t, e) {
        const n = e ? e.zu : new Xl(),
            s = e ? e.Qu : this.Qu;
        let r = e ? e.mutatedKeys : this.mutatedKeys,
            i = s,
            o = !1;
        const a =
                "F" === this.query.limitType && s.size === this.query.limit
                    ? s.last()
                    : null,
            u =
                "L" === this.query.limitType && s.size === this.query.limit
                    ? s.first()
                    : null;
        if (
            (t.inorderTraversal((t, e) => {
                const c = s.get(t),
                    h = xo(this.query, e) ? e : null,
                    l = !!c && this.mutatedKeys.has(c.key),
                    d =
                        !!h &&
                        (h.hasLocalMutations ||
                            (this.mutatedKeys.has(h.key) &&
                                h.hasCommittedMutations));
                let f = !1;
                c && h
                    ? c.data.isEqual(h.data)
                        ? l !== d && (n.track({ type: 3, doc: h }), (f = !0))
                        : this.Hu(c, h) ||
                          (n.track({ type: 2, doc: h }),
                          (f = !0),
                          ((a && this.Gu(h, a) > 0) ||
                              (u && this.Gu(h, u) < 0)) &&
                              (o = !0))
                    : !c && h
                    ? (n.track({ type: 0, doc: h }), (f = !0))
                    : c &&
                      !h &&
                      (n.track({ type: 1, doc: c }),
                      (f = !0),
                      (a || u) && (o = !0)),
                    f &&
                        (h
                            ? ((i = i.add(h)), (r = d ? r.add(t) : r.delete(t)))
                            : ((i = i.delete(t)), (r = r.delete(t))));
            }),
            null !== this.query.limit)
        )
            for (; i.size > this.query.limit; ) {
                const t = "F" === this.query.limitType ? i.last() : i.first();
                (i = i.delete(t.key)),
                    (r = r.delete(t.key)),
                    n.track({ type: 1, doc: t });
            }
        return { Qu: i, zu: n, $i: o, mutatedKeys: r };
    }
    Hu(t, e) {
        return (
            t.hasLocalMutations &&
            e.hasCommittedMutations &&
            !e.hasLocalMutations
        );
    }
    applyChanges(t, e, n) {
        const s = this.Qu;
        (this.Qu = t.Qu), (this.mutatedKeys = t.mutatedKeys);
        const r = t.zu.Eu();
        r.sort(
            (t, e) =>
                (function (t, e) {
                    const n = (t) => {
                        switch (t) {
                            case 0:
                                return 1;
                            case 2:
                            case 3:
                                return 2;
                            case 1:
                                return 0;
                            default:
                                return Ps();
                        }
                    };
                    return n(t) - n(e);
                })(t.type, e.type) || this.Gu(t.doc, e.doc)
        ),
            this.Ju(n);
        const i = e ? this.Yu() : [],
            o = 0 === this.Ku.size && this.current ? 1 : 0,
            a = o !== this.Uu;
        return (
            (this.Uu = o),
            0 !== r.length || a
                ? {
                      snapshot: new Jl(
                          this.query,
                          t.Qu,
                          s,
                          r,
                          t.mutatedKeys,
                          0 === o,
                          a,
                          !1,
                          !!n && n.resumeToken.approximateByteSize() > 0
                      ),
                      Xu: i,
                  }
                : { Xu: i }
        );
    }
    bu(t) {
        return this.current && "Offline" === t
            ? ((this.current = !1),
              this.applyChanges(
                  {
                      Qu: this.Qu,
                      zu: new Xl(),
                      mutatedKeys: this.mutatedKeys,
                      $i: !1,
                  },
                  !1
              ))
            : { Xu: [] };
    }
    Zu(t) {
        return (
            !this.qu.has(t) &&
            !!this.Qu.has(t) &&
            !this.Qu.get(t).hasLocalMutations
        );
    }
    Ju(t) {
        t &&
            (t.addedDocuments.forEach((t) => (this.qu = this.qu.add(t))),
            t.modifiedDocuments.forEach((t) => {}),
            t.removedDocuments.forEach((t) => (this.qu = this.qu.delete(t))),
            (this.current = t.current));
    }
    Yu() {
        if (!this.current) return [];
        const t = this.Ku;
        (this.Ku = Sa()),
            this.Qu.forEach((t) => {
                this.Zu(t.key) && (this.Ku = this.Ku.add(t.key));
            });
        const e = [];
        return (
            t.forEach((t) => {
                this.Ku.has(t) || e.push(new dd(t));
            }),
            this.Ku.forEach((n) => {
                t.has(n) || e.push(new ld(n));
            }),
            e
        );
    }
    tc(t) {
        (this.qu = t.Hi), (this.Ku = Sa());
        const e = this.Wu(t.documents);
        return this.applyChanges(e, !0);
    }
    ec() {
        return Jl.fromInitialDocuments(
            this.query,
            this.Qu,
            this.mutatedKeys,
            0 === this.Uu,
            this.hasCachedResults
        );
    }
}
class md {
    constructor(t, e, n) {
        (this.query = t), (this.targetId = e), (this.view = n);
    }
}
class gd {
    constructor(t) {
        (this.key = t), (this.nc = !1);
    }
}
class pd {
    constructor(t, e, n, s, r, i) {
        (this.localStore = t),
            (this.remoteStore = e),
            (this.eventManager = n),
            (this.sharedClientState = s),
            (this.currentUser = r),
            (this.maxConcurrentLimboResolutions = i),
            (this.sc = {}),
            (this.ic = new fa((t) => So(t), To)),
            (this.rc = new Map()),
            (this.oc = new Set()),
            (this.uc = new zi(lr.comparator)),
            (this.cc = new Map()),
            (this.ac = new wh()),
            (this.hc = {}),
            (this.lc = new Map()),
            (this.fc = Hc.vn()),
            (this.onlineState = "Unknown"),
            (this.dc = void 0);
    }
    get isPrimaryClient() {
        return !0 === this.dc;
    }
}
async function yd(t, e) {
    const n = Kd(t);
    let s, r;
    const i = n.ic.get(e);
    if (i)
        (s = i.targetId),
            n.sharedClientState.addLocalQueryTarget(s),
            (r = i.view.ec());
    else {
        const t = await Gh(n.localStore, Io(e));
        n.isPrimaryClient && El(n.remoteStore, t);
        const i = n.sharedClientState.addLocalQueryTarget(t.targetId);
        (s = t.targetId),
            (r = await wd(n, e, s, "current" === i, t.resumeToken));
    }
    return r;
}
async function wd(t, e, n, s, r) {
    t._c = (e, n, s) =>
        (async function (t, e, n, s) {
            let r = e.view.Wu(n);
            r.$i &&
                (r = await jh(t.localStore, e.query, !1).then(
                    ({ documents: t }) => e.view.Wu(t, r)
                ));
            const i = s && s.targetChanges.get(e.targetId),
                o = e.view.applyChanges(r, t.isPrimaryClient, i);
            return Cd(t, e.targetId, o.Xu), o.snapshot;
        })(t, e, n, s);
    const i = await jh(t.localStore, e, !0),
        o = new fd(e, i.Hi),
        a = o.Wu(i.documents),
        u = Aa.createSynthesizedTargetChangeForCurrentChange(
            n,
            s && "Offline" !== t.onlineState,
            r
        ),
        c = o.applyChanges(a, t.isPrimaryClient, u);
    Cd(t, n, c.Xu);
    const h = new md(e, n, o);
    return (
        t.ic.set(e, h),
        t.rc.has(n) ? t.rc.get(n).push(e) : t.rc.set(n, [e]),
        c.snapshot
    );
}
async function vd(t, e) {
    const n = Us(t),
        s = n.ic.get(e),
        r = n.rc.get(s.targetId);
    if (r.length > 1)
        return (
            n.rc.set(
                s.targetId,
                r.filter((t) => !To(t, e))
            ),
            void n.ic.delete(e)
        );
    n.isPrimaryClient
        ? (n.sharedClientState.removeLocalQueryTarget(s.targetId),
          n.sharedClientState.isActiveQueryTarget(s.targetId) ||
              (await Kh(n.localStore, s.targetId, !1)
                  .then(() => {
                      n.sharedClientState.clearQueryState(s.targetId),
                          Tl(n.remoteStore, s.targetId),
                          Dd(n, s.targetId);
                  })
                  .catch(_r)))
        : (Dd(n, s.targetId), await Kh(n.localStore, s.targetId, !0));
}
async function Id(t, e) {
    const n = Us(t);
    try {
        const t = await (function (t, e) {
            const n = Us(t),
                s = e.snapshotVersion;
            let r = n.qi;
            return n.persistence
                .runTransaction(
                    "Apply remote event",
                    "readwrite-primary",
                    (t) => {
                        const i = n.Gi.newChangeBuffer({ trackRemovals: !0 });
                        r = n.qi;
                        const o = [];
                        e.targetChanges.forEach((i, a) => {
                            const u = r.get(a);
                            if (!u) return;
                            o.push(
                                n.Cs.removeMatchingKeys(
                                    t,
                                    i.removedDocuments,
                                    a
                                ).next(() =>
                                    n.Cs.addMatchingKeys(t, i.addedDocuments, a)
                                )
                            );
                            let c = u.withSequenceNumber(
                                t.currentSequenceNumber
                            );
                            e.targetMismatches.has(a)
                                ? (c = c
                                      .withResumeToken(
                                          Hr.EMPTY_BYTE_STRING,
                                          or.min()
                                      )
                                      .withLastLimboFreeSnapshotVersion(
                                          or.min()
                                      ))
                                : i.resumeToken.approximateByteSize() > 0 &&
                                  (c = c.withResumeToken(i.resumeToken, s)),
                                (r = r.insert(a, c)),
                                (function (t, e, n) {
                                    return (
                                        0 ===
                                            t.resumeToken.approximateByteSize() ||
                                        e.snapshotVersion.toMicroseconds() -
                                            t.snapshotVersion.toMicroseconds() >=
                                            3e8 ||
                                        n.addedDocuments.size +
                                            n.modifiedDocuments.size +
                                            n.removedDocuments.size >
                                            0
                                    );
                                })(u, c, i) &&
                                    o.push(n.Cs.updateTargetData(t, c));
                        });
                        let a = ga(),
                            u = Sa();
                        if (
                            (e.documentUpdates.forEach((s) => {
                                e.resolvedLimboDocuments.has(s) &&
                                    o.push(
                                        n.persistence.referenceDelegate.updateLimboDocument(
                                            t,
                                            s
                                        )
                                    );
                            }),
                            o.push(
                                Bh(t, i, e.documentUpdates).next((t) => {
                                    (a = t.Wi), (u = t.zi);
                                })
                            ),
                            !s.isEqual(or.min()))
                        ) {
                            const e = n.Cs.getLastRemoteSnapshotVersion(t).next(
                                (e) =>
                                    n.Cs.setTargetsMetadata(
                                        t,
                                        t.currentSequenceNumber,
                                        s
                                    )
                            );
                            o.push(e);
                        }
                        return xr
                            .waitFor(o)
                            .next(() => i.apply(t))
                            .next(() =>
                                n.localDocuments.getLocalViewOfDocuments(
                                    t,
                                    a,
                                    u
                                )
                            )
                            .next(() => a);
                    }
                )
                .then((t) => ((n.qi = r), t));
        })(n.localStore, e);
        e.targetChanges.forEach((t, e) => {
            const s = n.cc.get(e);
            s &&
                (qs(
                    t.addedDocuments.size +
                        t.modifiedDocuments.size +
                        t.removedDocuments.size <=
                        1
                ),
                t.addedDocuments.size > 0
                    ? (s.nc = !0)
                    : t.modifiedDocuments.size > 0
                    ? qs(s.nc)
                    : t.removedDocuments.size > 0 && (qs(s.nc), (s.nc = !1)));
        }),
            await Rd(n, t, e);
    } catch (t) {
        await _r(t);
    }
}
function bd(t, e, n) {
    const s = Us(t);
    if ((s.isPrimaryClient && 0 === n) || (!s.isPrimaryClient && 1 === n)) {
        const t = [];
        s.ic.forEach((n, s) => {
            const r = s.view.bu(e);
            r.snapshot && t.push(r.snapshot);
        }),
            (function (t, e) {
                const n = Us(t);
                n.onlineState = e;
                let s = !1;
                n.queries.forEach((t, n) => {
                    for (const t of n.listeners) t.bu(e) && (s = !0);
                }),
                    s && id(n);
            })(s.eventManager, e),
            t.length && s.sc.Wo(t),
            (s.onlineState = e),
            s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
    }
}
async function Ed(t, e, n) {
    const s = Us(t);
    s.sharedClientState.updateQueryState(e, "rejected", n);
    const r = s.cc.get(e),
        i = r && r.key;
    if (i) {
        let t = new zi(lr.comparator);
        t = t.insert(i, no.newNoDocument(i, or.min()));
        const n = Sa().add(i),
            r = new Da(or.min(), new Map(), new Yi(nr), t, n);
        await Id(s, r), (s.uc = s.uc.remove(i)), s.cc.delete(e), kd(s);
    } else
        await Kh(s.localStore, e, !1)
            .then(() => Dd(s, e, n))
            .catch(_r);
}
async function Td(t, e) {
    const n = Us(t),
        s = e.batch.batchId;
    try {
        const t = await (function (t, e) {
            const n = Us(t);
            return n.persistence.runTransaction(
                "Acknowledge batch",
                "readwrite-primary",
                (t) => {
                    const s = e.batch.keys(),
                        r = n.Gi.newChangeBuffer({ trackRemovals: !0 });
                    return (function (t, e, n, s) {
                        const r = n.batch,
                            i = r.keys();
                        let o = xr.resolve();
                        return (
                            i.forEach((t) => {
                                o = o
                                    .next(() => s.getEntry(e, t))
                                    .next((e) => {
                                        const i = n.docVersions.get(t);
                                        qs(null !== i),
                                            e.version.compareTo(i) < 0 &&
                                                (r.applyToRemoteDocument(e, n),
                                                e.isValidDocument() &&
                                                    (e.setReadTime(
                                                        n.commitVersion
                                                    ),
                                                    s.addEntry(e)));
                                    });
                            }),
                            o.next(() =>
                                t.mutationQueue.removeMutationBatch(e, r)
                            )
                        );
                    })(n, t, e, r)
                        .next(() => r.apply(t))
                        .next(() => n.mutationQueue.performConsistencyCheck(t))
                        .next(() =>
                            n.documentOverlayCache.removeOverlaysForBatchId(
                                t,
                                s,
                                e.batch.batchId
                            )
                        )
                        .next(() =>
                            n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                                t,
                                (function (t) {
                                    let e = Sa();
                                    for (
                                        let n = 0;
                                        n < t.mutationResults.length;
                                        ++n
                                    )
                                        t.mutationResults[n].transformResults
                                            .length > 0 &&
                                            (e = e.add(
                                                t.batch.mutations[n].key
                                            ));
                                    return e;
                                })(e)
                            )
                        )
                        .next(() => n.localDocuments.getDocuments(t, s));
                }
            );
        })(n.localStore, e);
        xd(n, s, null),
            _d(n, s),
            n.sharedClientState.updateMutationState(s, "acknowledged"),
            await Rd(n, t);
    } catch (t) {
        await _r(t);
    }
}
async function Sd(t, e, n) {
    const s = Us(t);
    try {
        const t = await (function (t, e) {
            const n = Us(t);
            return n.persistence.runTransaction(
                "Reject batch",
                "readwrite-primary",
                (t) => {
                    let s;
                    return n.mutationQueue
                        .lookupMutationBatch(t, e)
                        .next(
                            (e) => (
                                qs(null !== e),
                                (s = e.keys()),
                                n.mutationQueue.removeMutationBatch(t, e)
                            )
                        )
                        .next(() => n.mutationQueue.performConsistencyCheck(t))
                        .next(() =>
                            n.documentOverlayCache.removeOverlaysForBatchId(
                                t,
                                s,
                                e
                            )
                        )
                        .next(() =>
                            n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
                                t,
                                s
                            )
                        )
                        .next(() => n.localDocuments.getDocuments(t, s));
                }
            );
        })(s.localStore, e);
        xd(s, e, n),
            _d(s, e),
            s.sharedClientState.updateMutationState(e, "rejected", n),
            await Rd(s, t);
    } catch (n) {
        await _r(n);
    }
}
function _d(t, e) {
    (t.lc.get(e) || []).forEach((t) => {
        t.resolve();
    }),
        t.lc.delete(e);
}
function xd(t, e, n) {
    const s = Us(t);
    let r = s.hc[s.currentUser.toKey()];
    if (r) {
        const t = r.get(e);
        t && (n ? t.reject(n) : t.resolve(), (r = r.remove(e))),
            (s.hc[s.currentUser.toKey()] = r);
    }
}
function Dd(t, e, n = null) {
    t.sharedClientState.removeLocalQueryTarget(e);
    for (const s of t.rc.get(e)) t.ic.delete(s), n && t.sc.wc(s, n);
    t.rc.delete(e),
        t.isPrimaryClient &&
            t.ac.ls(e).forEach((e) => {
                t.ac.containsKey(e) || Ad(t, e);
            });
}
function Ad(t, e) {
    t.oc.delete(e.path.canonicalString());
    const n = t.uc.get(e);
    null !== n &&
        (Tl(t.remoteStore, n), (t.uc = t.uc.remove(e)), t.cc.delete(n), kd(t));
}
function Cd(t, e, n) {
    for (const s of n)
        s instanceof ld
            ? (t.ac.addReference(s.key, e), Nd(t, s))
            : s instanceof dd
            ? (Ms("SyncEngine", "Document no longer in limbo: " + s.key),
              t.ac.removeReference(s.key, e),
              t.ac.containsKey(s.key) || Ad(t, s.key))
            : Ps();
}
function Nd(t, e) {
    const n = e.key,
        s = n.path.canonicalString();
    t.uc.get(n) ||
        t.oc.has(s) ||
        (Ms("SyncEngine", "New document in limbo: " + n), t.oc.add(s), kd(t));
}
function kd(t) {
    for (; t.oc.size > 0 && t.uc.size < t.maxConcurrentLimboResolutions; ) {
        const e = t.oc.values().next().value;
        t.oc.delete(e);
        const n = new lr(ur.fromString(e)),
            s = t.fc.next();
        t.cc.set(s, new gd(n)),
            (t.uc = t.uc.insert(n, s)),
            El(t.remoteStore, new Qu(Io(mo(n.path)), s, 2, Pr.at));
    }
}
async function Rd(t, e, n) {
    const s = Us(t),
        r = [],
        i = [],
        o = [];
    s.ic.isEmpty() ||
        (s.ic.forEach((t, a) => {
            o.push(
                s._c(a, e, n).then((t) => {
                    if (
                        ((t || n) &&
                            s.isPrimaryClient &&
                            s.sharedClientState.updateQueryState(
                                a.targetId,
                                (null == t ? void 0 : t.fromCache)
                                    ? "not-current"
                                    : "current"
                            ),
                        t)
                    ) {
                        r.push(t);
                        const e = Mh.Ci(a.targetId, t);
                        i.push(e);
                    }
                })
            );
        }),
        await Promise.all(o),
        s.sc.Wo(r),
        await (async function (t, e) {
            const n = Us(t);
            try {
                await n.persistence.runTransaction(
                    "notifyLocalViewChanges",
                    "readwrite",
                    (t) =>
                        xr.forEach(e, (e) =>
                            xr
                                .forEach(e.Si, (s) =>
                                    n.persistence.referenceDelegate.addReference(
                                        t,
                                        e.targetId,
                                        s
                                    )
                                )
                                .next(() =>
                                    xr.forEach(e.Di, (s) =>
                                        n.persistence.referenceDelegate.removeReference(
                                            t,
                                            e.targetId,
                                            s
                                        )
                                    )
                                )
                        )
                );
            } catch (t) {
                if (!kr(t)) throw t;
                Ms("LocalStore", "Failed to update sequence numbers: " + t);
            }
            for (const t of e) {
                const e = t.targetId;
                if (!t.fromCache) {
                    const t = n.qi.get(e),
                        s = t.snapshotVersion,
                        r = t.withLastLimboFreeSnapshotVersion(s);
                    n.qi = n.qi.insert(e, r);
                }
            }
        })(s.localStore, i));
}
async function Ld(t, e) {
    const n = Us(t);
    if (!n.currentUser.isEqual(e)) {
        Ms("SyncEngine", "User change. New user:", e.toKey());
        const t = await Ph(n.localStore, e);
        (n.currentUser = e),
            (function (t, e) {
                t.lc.forEach((t) => {
                    t.forEach((t) => {
                        t.reject(
                            new Ks(
                                Gs.CANCELLED,
                                "'waitForPendingWrites' promise is rejected due to a user change."
                            )
                        );
                    });
                }),
                    t.lc.clear();
            })(n),
            n.sharedClientState.handleUserChange(
                e,
                t.removedBatchIds,
                t.addedBatchIds
            ),
            await Rd(n, t.ji);
    }
}
function Md(t, e) {
    const n = Us(t),
        s = n.cc.get(e);
    if (s && s.nc) return Sa().add(s.key);
    {
        let t = Sa();
        const s = n.rc.get(e);
        if (!s) return t;
        for (const e of s) {
            const s = n.ic.get(e);
            t = t.unionWith(s.view.ju);
        }
        return t;
    }
}
async function Fd(t, e) {
    const n = Us(t),
        s = await jh(n.localStore, e.query, !0),
        r = e.view.tc(s);
    return n.isPrimaryClient && Cd(n, e.targetId, r.Xu), r;
}
async function Od(t, e) {
    const n = Us(t);
    return Qh(n.localStore, e).then((t) => Rd(n, t));
}
async function Vd(t, e, n, s) {
    const r = Us(t),
        i = await (function (t, e) {
            const n = Us(t),
                s = Us(n.mutationQueue);
            return n.persistence.runTransaction(
                "Lookup mutation documents",
                "readonly",
                (t) =>
                    s
                        .Tn(t, e)
                        .next((e) =>
                            e
                                ? n.localDocuments.getDocuments(t, e)
                                : xr.resolve(null)
                        )
            );
        })(r.localStore, e);
    null !== i
        ? ("pending" === n
              ? await Fl(r.remoteStore)
              : "acknowledged" === n || "rejected" === n
              ? (xd(r, e, s || null),
                _d(r, e),
                (function (t, e) {
                    Us(Us(t).mutationQueue).An(e);
                })(r.localStore, e))
              : Ps(),
          await Rd(r, i))
        : Ms("SyncEngine", "Cannot apply mutation batch with id: " + e);
}
async function Pd(t, e, n) {
    const s = Us(t),
        r = [],
        i = [];
    for (const t of e) {
        let e;
        const n = s.rc.get(t);
        if (n && 0 !== n.length) {
            e = await Gh(s.localStore, Io(n[0]));
            for (const t of n) {
                const e = s.ic.get(t),
                    n = await Fd(s, e);
                n.snapshot && i.push(n.snapshot);
            }
        } else {
            const n = await $h(s.localStore, t);
            (e = await Gh(s.localStore, n)),
                await wd(s, qd(n), t, !1, e.resumeToken);
        }
        r.push(e);
    }
    return s.sc.Wo(i), r;
}
function qd(t) {
    return fo(
        t.path,
        t.collectionGroup,
        t.orderBy,
        t.filters,
        t.limit,
        "F",
        t.startAt,
        t.endAt
    );
}
function Bd(t) {
    const e = Us(t);
    return Us(Us(e.localStore).persistence).vi();
}
async function Ud(t, e, n, s) {
    const r = Us(t);
    if (r.dc)
        return void Ms(
            "SyncEngine",
            "Ignoring unexpected query state notification."
        );
    const i = r.rc.get(e);
    if (i && i.length > 0)
        switch (n) {
            case "current":
            case "not-current": {
                const t = await Qh(r.localStore, Do(i[0])),
                    s = Da.createSynthesizedRemoteEventForCurrentChange(
                        e,
                        "current" === n,
                        Hr.EMPTY_BYTE_STRING
                    );
                await Rd(r, t, s);
                break;
            }
            case "rejected":
                await Kh(r.localStore, e, !0), Dd(r, e, s);
                break;
            default:
                Ps();
        }
}
async function Gd(t, e, n) {
    const s = Kd(t);
    if (s.dc) {
        for (const t of e) {
            if (s.rc.has(t)) {
                Ms("SyncEngine", "Adding an already active target " + t);
                continue;
            }
            const e = await $h(s.localStore, t),
                n = await Gh(s.localStore, e);
            await wd(s, qd(e), n.targetId, !1, n.resumeToken),
                El(s.remoteStore, n);
        }
        for (const t of n)
            s.rc.has(t) &&
                (await Kh(s.localStore, t, !1)
                    .then(() => {
                        Tl(s.remoteStore, t), Dd(s, t);
                    })
                    .catch(_r));
    }
}
function Kd(t) {
    const e = Us(t);
    return (
        (e.remoteStore.remoteSyncer.applyRemoteEvent = Id.bind(null, e)),
        (e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Md.bind(null, e)),
        (e.remoteStore.remoteSyncer.rejectListen = Ed.bind(null, e)),
        (e.sc.Wo = sd.bind(null, e.eventManager)),
        (e.sc.wc = rd.bind(null, e.eventManager)),
        e
    );
}
function jd(t) {
    const e = Us(t);
    return (
        (e.remoteStore.remoteSyncer.applySuccessfulWrite = Td.bind(null, e)),
        (e.remoteStore.remoteSyncer.rejectFailedWrite = Sd.bind(null, e)),
        e
    );
}
class $d {
    constructor() {
        this.synchronizeTabs = !1;
    }
    async initialize(t) {
        (this.yt = dl(t.databaseInfo.databaseId)),
            (this.sharedClientState = this.gc(t)),
            (this.persistence = this.yc(t)),
            await this.persistence.start(),
            (this.localStore = this.Ic(t)),
            (this.gcScheduler = this.Tc(t, this.localStore)),
            (this.indexBackfillerScheduler = this.Ec(t, this.localStore));
    }
    Tc(t, e) {
        return null;
    }
    Ec(t, e) {
        return null;
    }
    Ic(t) {
        return Vh(this.persistence, new Fh(), t.initialUser, this.yt);
    }
    yc(t) {
        return new Sh(xh.Bs, this.yt);
    }
    gc(t) {
        return new rl();
    }
    async terminate() {
        this.gcScheduler && this.gcScheduler.stop(),
            await this.sharedClientState.shutdown(),
            await this.persistence.shutdown();
    }
}
class Qd extends $d {
    constructor(t, e, n) {
        super(),
            (this.Ac = t),
            (this.cacheSizeBytes = e),
            (this.forceOwnership = n),
            (this.synchronizeTabs = !1);
    }
    async initialize(t) {
        await super.initialize(t),
            await this.Ac.initialize(this, t),
            await jd(this.Ac.syncEngine),
            await Fl(this.Ac.remoteStore),
            await this.persistence.li(
                () => (
                    this.gcScheduler &&
                        !this.gcScheduler.started &&
                        this.gcScheduler.start(),
                    this.indexBackfillerScheduler &&
                        !this.indexBackfillerScheduler.started &&
                        this.indexBackfillerScheduler.start(),
                    Promise.resolve()
                )
            );
    }
    Ic(t) {
        return Vh(this.persistence, new Fh(), t.initialUser, this.yt);
    }
    Tc(t, e) {
        const n = this.persistence.referenceDelegate.garbageCollector;
        return new eh(n, t.asyncQueue, e);
    }
    Ec(t, e) {
        const n = new Vr(e, this.persistence);
        return new Or(t.asyncQueue, n);
    }
    yc(t) {
        const e = Lh(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey),
            n =
                void 0 !== this.cacheSizeBytes
                    ? Bc.withCacheSize(this.cacheSizeBytes)
                    : Bc.DEFAULT;
        return new Nh(
            this.synchronizeTabs,
            e,
            t.clientId,
            n,
            t.asyncQueue,
            hl(),
            ll(),
            this.yt,
            this.sharedClientState,
            !!this.forceOwnership
        );
    }
    gc(t) {
        return new rl();
    }
}
class zd extends Qd {
    constructor(t, e) {
        super(t, e, !1),
            (this.Ac = t),
            (this.cacheSizeBytes = e),
            (this.synchronizeTabs = !0);
    }
    async initialize(t) {
        await super.initialize(t);
        const e = this.Ac.syncEngine;
        this.sharedClientState instanceof sl &&
            ((this.sharedClientState.syncEngine = {
                Fr: Vd.bind(null, e),
                $r: Ud.bind(null, e),
                Br: Gd.bind(null, e),
                vi: Bd.bind(null, e),
                Mr: Od.bind(null, e),
            }),
            await this.sharedClientState.start()),
            await this.persistence.li(async (t) => {
                await (async function (t, e) {
                    const n = Us(t);
                    if ((Kd(n), jd(n), !0 === e && !0 !== n.dc)) {
                        const t =
                                n.sharedClientState.getAllActiveQueryTargets(),
                            e = await Pd(n, t.toArray());
                        (n.dc = !0), await $l(n.remoteStore, !0);
                        for (const t of e) El(n.remoteStore, t);
                    } else if (!1 === e && !1 !== n.dc) {
                        const t = [];
                        let e = Promise.resolve();
                        n.rc.forEach((s, r) => {
                            n.sharedClientState.isLocalQueryTarget(r)
                                ? t.push(r)
                                : (e = e.then(
                                      () => (Dd(n, r), Kh(n.localStore, r, !0))
                                  )),
                                Tl(n.remoteStore, r);
                        }),
                            await e,
                            await Pd(n, t),
                            (function (t) {
                                const e = Us(t);
                                e.cc.forEach((t, n) => {
                                    Tl(e.remoteStore, n);
                                }),
                                    e.ac.fs(),
                                    (e.cc = new Map()),
                                    (e.uc = new zi(lr.comparator));
                            })(n),
                            (n.dc = !1),
                            await $l(n.remoteStore, !1);
                    }
                })(this.Ac.syncEngine, t),
                    this.gcScheduler &&
                        (t && !this.gcScheduler.started
                            ? this.gcScheduler.start()
                            : t || this.gcScheduler.stop()),
                    this.indexBackfillerScheduler &&
                        (t && !this.indexBackfillerScheduler.started
                            ? this.indexBackfillerScheduler.start()
                            : t || this.indexBackfillerScheduler.stop());
            });
    }
    gc(t) {
        const e = hl();
        if (!sl.C(e))
            throw new Ks(
                Gs.UNIMPLEMENTED,
                "IndexedDB persistence is only available on platforms that support LocalStorage."
            );
        const n = Lh(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new sl(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }
}
class Hd {
    async initialize(t, e) {
        this.localStore ||
            ((this.localStore = t.localStore),
            (this.sharedClientState = t.sharedClientState),
            (this.datastore = this.createDatastore(e)),
            (this.remoteStore = this.createRemoteStore(e)),
            (this.eventManager = this.createEventManager(e)),
            (this.syncEngine = this.createSyncEngine(e, !t.synchronizeTabs)),
            (this.sharedClientState.onlineStateHandler = (t) =>
                bd(this.syncEngine, t, 1)),
            (this.remoteStore.remoteSyncer.handleCredentialChange = Ld.bind(
                null,
                this.syncEngine
            )),
            await $l(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(t) {
        return new td();
    }
    createDatastore(t) {
        const e = dl(t.databaseInfo.databaseId),
            n = ((s = t.databaseInfo), new cl(s));
        var s;
        return (function (t, e, n, s) {
            return new yl(t, e, n, s);
        })(t.authCredentials, t.appCheckCredentials, n, e);
    }
    createRemoteStore(t) {
        return (
            (e = this.localStore),
            (n = this.datastore),
            (s = t.asyncQueue),
            (r = (t) => bd(this.syncEngine, t, 0)),
            (i = ol.C() ? new ol() : new il()),
            new vl(e, n, s, r, i)
        );
        var e, n, s, r, i;
    }
    createSyncEngine(t, e) {
        return (function (t, e, n, s, r, i, o) {
            const a = new pd(t, e, n, s, r, i);
            return o && (a.dc = !0), a;
        })(
            this.localStore,
            this.remoteStore,
            this.eventManager,
            this.sharedClientState,
            t.initialUser,
            t.maxConcurrentLimboResolutions,
            e
        );
    }
    terminate() {
        return (async function (t) {
            const e = Us(t);
            Ms("RemoteStore", "RemoteStore shutting down."),
                e._u.add(5),
                await bl(e),
                e.mu.shutdown(),
                e.gu.set("Unknown");
        })(this.remoteStore);
    }
}
function Wd(t, e, n) {
    if (!n)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Function ${t}() cannot be called with an empty ${e}.`
        );
}
function Yd(t, e, n, s) {
    if (!0 === e && !0 === s)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `${t} and ${n} cannot be used together.`
        );
}
function Xd(t) {
    if (!lr.isDocumentKey(t))
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`
        );
}
function Jd(t) {
    if (lr.isDocumentKey(t))
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`
        );
}
function Zd(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t)
        return (
            t.length > 20 && (t = `${t.substring(0, 20)}...`), JSON.stringify(t)
        );
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        {
            const e = (function (t) {
                return t.constructor ? t.constructor.name : null;
            })(t);
            return e ? `a custom ${e} object` : "an object";
        }
    }
    return "function" == typeof t ? "a function" : Ps();
}
function tf(t, e) {
    if (("_delegate" in t && (t = t._delegate), !(t instanceof e))) {
        if (e.name === t.constructor.name)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?"
            );
        {
            const n = Zd(t);
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                `Expected type '${e.name}', but it was: ${n}`
            );
        }
    }
    return t;
}
function ef(t, e) {
    if (e <= 0)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Function ${t}() requires a positive number, but it was: ${e}.`
        );
}
const nf = new Map();
class sf {
    constructor(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Can't provide ssl option if host option is not set"
                );
            (this.host = "firestore.googleapis.com"), (this.ssl = !0);
        } else
            (this.host = t.host),
                (this.ssl = null === (e = t.ssl) || void 0 === e || e);
        if (
            ((this.credentials = t.credentials),
            (this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties),
            void 0 === t.cacheSizeBytes)
        )
            this.cacheSizeBytes = 41943040;
        else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "cacheSizeBytes must be at least 1048576"
                );
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        (this.experimentalForceLongPolling = !!t.experimentalForceLongPolling),
            (this.experimentalAutoDetectLongPolling =
                !!t.experimentalAutoDetectLongPolling),
            (this.useFetchStreams = !!t.useFetchStreams),
            Yd(
                "experimentalForceLongPolling",
                t.experimentalForceLongPolling,
                "experimentalAutoDetectLongPolling",
                t.experimentalAutoDetectLongPolling
            );
    }
    isEqual(t) {
        return (
            this.host === t.host &&
            this.ssl === t.ssl &&
            this.credentials === t.credentials &&
            this.cacheSizeBytes === t.cacheSizeBytes &&
            this.experimentalForceLongPolling ===
                t.experimentalForceLongPolling &&
            this.experimentalAutoDetectLongPolling ===
                t.experimentalAutoDetectLongPolling &&
            this.ignoreUndefinedProperties === t.ignoreUndefinedProperties &&
            this.useFetchStreams === t.useFetchStreams
        );
    }
}
class rf {
    constructor(t, e, n, s) {
        (this._authCredentials = t),
            (this._appCheckCredentials = e),
            (this._databaseId = n),
            (this._app = s),
            (this.type = "firestore-lite"),
            (this._persistenceKey = "(lite)"),
            (this._settings = new sf({})),
            (this._settingsFrozen = !1);
    }
    get app() {
        if (!this._app)
            throw new Ks(
                Gs.FAILED_PRECONDITION,
                "Firestore was not initialized using the Firebase SDK. 'app' is not available"
            );
        return this._app;
    }
    get _initialized() {
        return this._settingsFrozen;
    }
    get _terminated() {
        return void 0 !== this._terminateTask;
    }
    _setSettings(t) {
        if (this._settingsFrozen)
            throw new Ks(
                Gs.FAILED_PRECONDITION,
                "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object."
            );
        (this._settings = new sf(t)),
            void 0 !== t.credentials &&
                (this._authCredentials = (function (t) {
                    if (!t) return new Qs();
                    switch (t.type) {
                        case "gapi":
                            const e = t.client;
                            return new Ys(
                                e,
                                t.sessionIndex || "0",
                                t.iamToken || null,
                                t.authTokenFactory || null
                            );
                        case "provider":
                            return t.client;
                        default:
                            throw new Ks(
                                Gs.INVALID_ARGUMENT,
                                "makeAuthCredentialsProvider failed due to invalid credential type"
                            );
                    }
                })(t.credentials));
    }
    _getSettings() {
        return this._settings;
    }
    _freezeSettings() {
        return (this._settingsFrozen = !0), this._settings;
    }
    _delete() {
        return (
            this._terminateTask || (this._terminateTask = this._terminate()),
            this._terminateTask
        );
    }
    toJSON() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings,
        };
    }
    _terminate() {
        return (
            (function (t) {
                const e = nf.get(t);
                e &&
                    (Ms("ComponentProvider", "Removing Datastore"),
                    nf.delete(t),
                    e.terminate());
            })(this),
            Promise.resolve()
        );
    }
}
function of(t, e, n, s = {}) {
    var r;
    const i = (t = tf(t, rf))._getSettings();
    if (
        ("firestore.googleapis.com" !== i.host &&
            i.host !== e &&
            Os(
                "Host has been set in both settings() and useEmulator(), emulator host will be used"
            ),
        t._setSettings(
            Object.assign(Object.assign({}, i), { host: `${e}:${n}`, ssl: !1 })
        ),
        s.mockUserToken)
    ) {
        let e, n;
        if ("string" == typeof s.mockUserToken)
            (e = s.mockUserToken), (n = Cs.MOCK_USER);
        else {
            e = (function (t, e) {
                if (t.uid)
                    throw new Error(
                        'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
                    );
                const n = e || "demo-project",
                    s = t.iat || 0,
                    r = t.sub || t.user_id;
                if (!r)
                    throw new Error(
                        "mockUserToken must contain 'sub' or 'user_id' field!"
                    );
                const i = Object.assign(
                    {
                        iss: `https://securetoken.google.com/${n}`,
                        aud: n,
                        iat: s,
                        exp: s + 3600,
                        auth_time: s,
                        sub: r,
                        user_id: r,
                        firebase: {
                            sign_in_provider: "custom",
                            identities: {},
                        },
                    },
                    t
                );
                return [
                    u(JSON.stringify({ alg: "none", type: "JWT" })),
                    u(JSON.stringify(i)),
                    "",
                ].join(".");
            })(
                s.mockUserToken,
                null === (r = t._app) || void 0 === r
                    ? void 0
                    : r.options.projectId
            );
            const i = s.mockUserToken.sub || s.mockUserToken.user_id;
            if (!i)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "mockUserToken must contain 'sub' or 'user_id' field!"
                );
            n = new Cs(i);
        }
        t._authCredentials = new zs(new $s(e, n));
    }
}
class af {
    constructor(t, e, n) {
        (this.converter = e),
            (this._key = n),
            (this.type = "document"),
            (this.firestore = t);
    }
    get _path() {
        return this._key.path;
    }
    get id() {
        return this._key.path.lastSegment();
    }
    get path() {
        return this._key.path.canonicalString();
    }
    get parent() {
        return new cf(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(t) {
        return new af(this.firestore, t, this._key);
    }
}
class uf {
    constructor(t, e, n) {
        (this.converter = e),
            (this._query = n),
            (this.type = "query"),
            (this.firestore = t);
    }
    withConverter(t) {
        return new uf(this.firestore, t, this._query);
    }
}
class cf extends uf {
    constructor(t, e, n) {
        super(t, e, mo(n)), (this._path = n), (this.type = "collection");
    }
    get id() {
        return this._query.path.lastSegment();
    }
    get path() {
        return this._query.path.canonicalString();
    }
    get parent() {
        const t = this._path.popLast();
        return t.isEmpty() ? null : new af(this.firestore, null, new lr(t));
    }
    withConverter(t) {
        return new cf(this.firestore, t, this._path);
    }
}
function hf(t, e, ...n) {
    if (((t = I(t)), Wd("collection", "path", e), t instanceof rf)) {
        const s = ur.fromString(e, ...n);
        return Jd(s), new cf(t, null, s);
    }
    {
        if (!(t instanceof af || t instanceof cf))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
            );
        const s = t._path.child(ur.fromString(e, ...n));
        return Jd(s), new cf(t.firestore, null, s);
    }
}
function lf(t, e) {
    if (
        ((t = tf(t, rf)),
        Wd("collectionGroup", "collection id", e),
        e.indexOf("/") >= 0)
    )
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`
        );
    return new uf(
        t,
        null,
        (function (t) {
            return new lo(ur.emptyPath(), t);
        })(e)
    );
}
function df(t, e, ...n) {
    if (
        ((t = I(t)),
        1 === arguments.length && (e = er.R()),
        Wd("doc", "path", e),
        t instanceof rf)
    ) {
        const s = ur.fromString(e, ...n);
        return Xd(s), new af(t, null, new lr(s));
    }
    {
        if (!(t instanceof af || t instanceof cf))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore"
            );
        const s = t._path.child(ur.fromString(e, ...n));
        return (
            Xd(s),
            new af(t.firestore, t instanceof cf ? t.converter : null, new lr(s))
        );
    }
}
function ff(t, e) {
    return (
        (t = I(t)),
        (e = I(e)),
        (t instanceof af || t instanceof cf) &&
            (e instanceof af || e instanceof cf) &&
            t.firestore === e.firestore &&
            t.path === e.path &&
            t.converter === e.converter
    );
}
function mf(t, e) {
    return (
        (t = I(t)),
        (e = I(e)),
        t instanceof uf &&
            e instanceof uf &&
            t.firestore === e.firestore &&
            To(t._query, e._query) &&
            t.converter === e.converter
    );
}
function gf(t, e = 10240) {
    let n = 0;
    return {
        async read() {
            if (n < t.byteLength) {
                const s = { value: t.slice(n, n + e), done: !1 };
                return (n += e), s;
            }
            return { done: !0 };
        },
        async cancel() {},
        releaseLock() {},
        closed: Promise.reject("unimplemented"),
    };
}
class pf {
    constructor(t) {
        (this.observer = t), (this.muted = !1);
    }
    next(t) {
        this.observer.next && this.Rc(this.observer.next, t);
    }
    error(t) {
        this.observer.error
            ? this.Rc(this.observer.error, t)
            : Fs("Uncaught Error in snapshot listener:", t.toString());
    }
    bc() {
        this.muted = !0;
    }
    Rc(t, e) {
        this.muted ||
            setTimeout(() => {
                this.muted || t(e);
            }, 0);
    }
}
class yf {
    constructor(t, e) {
        (this.Pc = t),
            (this.yt = e),
            (this.metadata = new js()),
            (this.buffer = new Uint8Array()),
            (this.vc = new TextDecoder("utf-8")),
            this.Vc().then(
                (t) => {
                    t && t.Ou()
                        ? this.metadata.resolve(t.ku.metadata)
                        : this.metadata.reject(
                              new Error(
                                  `The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(
                                      null == t ? void 0 : t.ku
                                  )}`
                              )
                          );
                },
                (t) => this.metadata.reject(t)
            );
    }
    close() {
        return this.Pc.cancel();
    }
    async getMetadata() {
        return this.metadata.promise;
    }
    async mc() {
        return await this.getMetadata(), this.Vc();
    }
    async Vc() {
        const t = await this.Sc();
        if (null === t) return null;
        const e = this.vc.decode(t),
            n = Number(e);
        isNaN(n) && this.Dc(`length string (${e}) is not valid number`);
        const s = await this.Cc(n);
        return new ad(JSON.parse(s), t.length + n);
    }
    xc() {
        return this.buffer.findIndex((t) => t === "{".charCodeAt(0));
    }
    async Sc() {
        for (; this.xc() < 0 && !(await this.Nc()); );
        if (0 === this.buffer.length) return null;
        const t = this.xc();
        t < 0 &&
            this.Dc(
                "Reached the end of bundle when a length string is expected."
            );
        const e = this.buffer.slice(0, t);
        return (this.buffer = this.buffer.slice(t)), e;
    }
    async Cc(t) {
        for (; this.buffer.length < t; )
            (await this.Nc()) &&
                this.Dc("Reached the end of bundle when more is expected.");
        const e = this.vc.decode(this.buffer.slice(0, t));
        return (this.buffer = this.buffer.slice(t)), e;
    }
    Dc(t) {
        throw (this.Pc.cancel(), new Error(`Invalid bundle format: ${t}`));
    }
    async Nc() {
        const t = await this.Pc.read();
        if (!t.done) {
            const e = new Uint8Array(this.buffer.length + t.value.length);
            e.set(this.buffer),
                e.set(t.value, this.buffer.length),
                (this.buffer = e);
        }
        return t.done;
    }
}
class wf {
    constructor() {
        this.type = "AggregateField";
    }
}
class vf {
    constructor(t, e) {
        (this._data = e),
            (this.type = "AggregateQuerySnapshot"),
            (this.query = t);
    }
    data() {
        return this._data;
    }
}
class If {
    constructor(t, e, n) {
        (this.query = t), (this.datastore = e), (this.userDataWriter = n);
    }
    run() {
        return (async function (t, e) {
            const n = Us(t),
                s = (function (t, e) {
                    const n = su(t, e);
                    return {
                        structuredAggregationQuery: {
                            aggregations: [{ count: {}, alias: "count_alias" }],
                            structuredQuery: n.structuredQuery,
                        },
                        parent: n.parent,
                    };
                })(n.yt, Io(e)),
                r = s.parent;
            return (
                n.connection.co || delete s.parent,
                (await n._o("RunAggregationQuery", r, s, 1))
                    .filter((t) => !!t.result)
                    .map((t) => t.result.aggregateFields)
            );
        })(this.datastore, this.query._query).then((t) => {
            qs(void 0 !== t[0]);
            const e = Object.entries(t[0])
                .filter(([t, e]) => "count_alias" === t)
                .map(([t, e]) => this.userDataWriter.convertValue(e))[0];
            return (
                qs("number" == typeof e),
                Promise.resolve(new vf(this.query, { count: e }))
            );
        });
    }
}
class bf {
    constructor(t) {
        (this.datastore = t),
            (this.readVersions = new Map()),
            (this.mutations = []),
            (this.committed = !1),
            (this.lastWriteError = null),
            (this.writtenDocs = new Set());
    }
    async lookup(t) {
        if ((this.ensureCommitNotCalled(), this.mutations.length > 0))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Firestore transactions require all reads to be executed before all writes."
            );
        const e = await (async function (t, e) {
            const n = Us(t),
                s = Ya(n.yt) + "/documents",
                r = { documents: e.map((t) => Qa(n.yt, t)) },
                i = await n._o("BatchGetDocuments", s, r, e.length),
                o = new Map();
            i.forEach((t) => {
                const e = (function (t, e) {
                    return "found" in e
                        ? (function (t, e) {
                              qs(!!e.found), e.found.name, e.found.updateTime;
                              const n = za(t, e.found.name),
                                  s = Ka(e.found.updateTime),
                                  r = e.found.createTime
                                      ? Ka(e.found.createTime)
                                      : or.min(),
                                  i = new to({
                                      mapValue: { fields: e.found.fields },
                                  });
                              return no.newFoundDocument(n, s, r, i);
                          })(t, e)
                        : "missing" in e
                        ? (function (t, e) {
                              qs(!!e.missing), qs(!!e.readTime);
                              const n = za(t, e.missing),
                                  s = Ka(e.readTime);
                              return no.newNoDocument(n, s);
                          })(t, e)
                        : Ps();
                })(n.yt, t);
                o.set(e.key.toString(), e);
            });
            const a = [];
            return (
                e.forEach((t) => {
                    const e = o.get(t.toString());
                    qs(!!e), a.push(e);
                }),
                a
            );
        })(this.datastore, t);
        return e.forEach((t) => this.recordVersion(t)), e;
    }
    set(t, e) {
        this.write(e.toMutation(t, this.precondition(t))),
            this.writtenDocs.add(t.toString());
    }
    update(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastWriteError = t;
        }
        this.writtenDocs.add(t.toString());
    }
    delete(t) {
        this.write(new oa(t, this.precondition(t))),
            this.writtenDocs.add(t.toString());
    }
    async commit() {
        if ((this.ensureCommitNotCalled(), this.lastWriteError))
            throw this.lastWriteError;
        const t = this.readVersions;
        this.mutations.forEach((e) => {
            t.delete(e.key.toString());
        }),
            t.forEach((t, e) => {
                const n = lr.fromPath(e);
                this.mutations.push(new aa(n, this.precondition(n)));
            }),
            await (async function (t, e) {
                const n = Us(t),
                    s = Ya(n.yt) + "/documents",
                    r = { writes: e.map((t) => tu(n.yt, t)) };
                await n.ao("Commit", s, r);
            })(this.datastore, this.mutations),
            (this.committed = !0);
    }
    recordVersion(t) {
        let e;
        if (t.isFoundDocument()) e = t.version;
        else {
            if (!t.isNoDocument()) throw Ps();
            e = or.min();
        }
        const n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n))
                throw new Ks(
                    Gs.ABORTED,
                    "Document version changed between two reads."
                );
        } else this.readVersions.set(t.key.toString(), e);
    }
    precondition(t) {
        const e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e
            ? e.isEqual(or.min())
                ? zo.exists(!1)
                : zo.updateTime(e)
            : zo.none();
    }
    preconditionForUpdate(t) {
        const e = this.readVersions.get(t.toString());
        if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(or.min()))
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Can't update a document that doesn't exist."
                );
            return zo.updateTime(e);
        }
        return zo.exists(!0);
    }
    write(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }
    ensureCommitNotCalled() {}
}
class Ef {
    constructor(t, e, n, s, r) {
        (this.asyncQueue = t),
            (this.datastore = e),
            (this.options = n),
            (this.updateFunction = s),
            (this.deferred = r),
            (this.kc = n.maxAttempts),
            (this.xo = new fl(this.asyncQueue, "transaction_retry"));
    }
    run() {
        (this.kc -= 1), this.Oc();
    }
    Oc() {
        this.xo.Ro(async () => {
            const t = new bf(this.datastore),
                e = this.Mc(t);
            e &&
                e
                    .then((e) => {
                        this.asyncQueue.enqueueAndForget(() =>
                            t
                                .commit()
                                .then(() => {
                                    this.deferred.resolve(e);
                                })
                                .catch((t) => {
                                    this.Fc(t);
                                })
                        );
                    })
                    .catch((t) => {
                        this.Fc(t);
                    });
        });
    }
    Mc(t) {
        try {
            const e = this.updateFunction(t);
            return !jr(e) && e.catch && e.then
                ? e
                : (this.deferred.reject(
                      Error("Transaction callback must return a Promise")
                  ),
                  null);
        } catch (t) {
            return this.deferred.reject(t), null;
        }
    }
    Fc(t) {
        this.kc > 0 && this.$c(t)
            ? ((this.kc -= 1),
              this.asyncQueue.enqueueAndForget(
                  () => (this.Oc(), Promise.resolve())
              ))
            : this.deferred.reject(t);
    }
    $c(t) {
        if ("FirebaseError" === t.name) {
            const e = t.code;
            return (
                "aborted" === e ||
                "failed-precondition" === e ||
                "already-exists" === e ||
                !la(e)
            );
        }
        return !1;
    }
}
class Tf {
    constructor(t, e, n, s) {
        (this.authCredentials = t),
            (this.appCheckCredentials = e),
            (this.asyncQueue = n),
            (this.databaseInfo = s),
            (this.user = Cs.UNAUTHENTICATED),
            (this.clientId = er.R()),
            (this.authCredentialListener = () => Promise.resolve()),
            (this.appCheckCredentialListener = () => Promise.resolve()),
            this.authCredentials.start(n, async (t) => {
                Ms("FirestoreClient", "Received user=", t.uid),
                    await this.authCredentialListener(t),
                    (this.user = t);
            }),
            this.appCheckCredentials.start(
                n,
                (t) => (
                    Ms("FirestoreClient", "Received new app check token=", t),
                    this.appCheckCredentialListener(t, this.user)
                )
            );
    }
    async getConfiguration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100,
        };
    }
    setCredentialChangeListener(t) {
        this.authCredentialListener = t;
    }
    setAppCheckTokenChangeListener(t) {
        this.appCheckCredentialListener = t;
    }
    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown)
            throw new Ks(
                Gs.FAILED_PRECONDITION,
                "The client has already been terminated."
            );
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const t = new js();
        return (
            this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
                try {
                    this.onlineComponents &&
                        (await this.onlineComponents.terminate()),
                        this.offlineComponents &&
                            (await this.offlineComponents.terminate()),
                        this.authCredentials.shutdown(),
                        this.appCheckCredentials.shutdown(),
                        t.resolve();
                } catch (e) {
                    const n = Wl(e, "Failed to shutdown persistence");
                    t.reject(n);
                }
            }),
            t.promise
        );
    }
}
async function Sf(t, e) {
    t.asyncQueue.verifyOperationInProgress(),
        Ms("FirestoreClient", "Initializing OfflineComponentProvider");
    const n = await t.getConfiguration();
    await e.initialize(n);
    let s = n.initialUser;
    t.setCredentialChangeListener(async (t) => {
        s.isEqual(t) || (await Ph(e.localStore, t), (s = t));
    }),
        e.persistence.setDatabaseDeletedListener(() => t.terminate()),
        (t.offlineComponents = e);
}
async function _f(t, e) {
    t.asyncQueue.verifyOperationInProgress();
    const n = await xf(t);
    Ms("FirestoreClient", "Initializing OnlineComponentProvider");
    const s = await t.getConfiguration();
    await e.initialize(n, s),
        t.setCredentialChangeListener((t) => jl(e.remoteStore, t)),
        t.setAppCheckTokenChangeListener((t, n) => jl(e.remoteStore, n)),
        (t.onlineComponents = e);
}
async function xf(t) {
    return (
        t.offlineComponents ||
            (Ms("FirestoreClient", "Using default OfflineComponentProvider"),
            await Sf(t, new $d())),
        t.offlineComponents
    );
}
async function Df(t) {
    return (
        t.onlineComponents ||
            (Ms("FirestoreClient", "Using default OnlineComponentProvider"),
            await _f(t, new Hd())),
        t.onlineComponents
    );
}
function Af(t) {
    return xf(t).then((t) => t.persistence);
}
function Cf(t) {
    return xf(t).then((t) => t.localStore);
}
function Nf(t) {
    return Df(t).then((t) => t.remoteStore);
}
function kf(t) {
    return Df(t).then((t) => t.syncEngine);
}
function Rf(t) {
    return Df(t).then((t) => t.datastore);
}
async function Lf(t) {
    const e = await Df(t),
        n = e.eventManager;
    return (
        (n.onListen = yd.bind(null, e.syncEngine)),
        (n.onUnlisten = vd.bind(null, e.syncEngine)),
        n
    );
}
function Mf(t, e, n = {}) {
    const s = new js();
    return (
        t.asyncQueue.enqueueAndForget(async () =>
            (function (t, e, n, s, r) {
                const i = new pf({
                        next: (i) => {
                            e.enqueueAndForget(() => nd(t, o));
                            const a = i.docs.has(n);
                            !a && i.fromCache
                                ? r.reject(
                                      new Ks(
                                          Gs.UNAVAILABLE,
                                          "Failed to get document because the client is offline."
                                      )
                                  )
                                : a && i.fromCache && s && "server" === s.source
                                ? r.reject(
                                      new Ks(
                                          Gs.UNAVAILABLE,
                                          'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)'
                                      )
                                  )
                                : r.resolve(i);
                        },
                        error: (t) => r.reject(t),
                    }),
                    o = new od(mo(n.path), i, {
                        includeMetadataChanges: !0,
                        Nu: !0,
                    });
                return ed(t, o);
            })(await Lf(t), t.asyncQueue, e, n, s)
        ),
        s.promise
    );
}
function Ff(t, e, n = {}) {
    const s = new js();
    return (
        t.asyncQueue.enqueueAndForget(async () =>
            (function (t, e, n, s, r) {
                const i = new pf({
                        next: (n) => {
                            e.enqueueAndForget(() => nd(t, o)),
                                n.fromCache && "server" === s.source
                                    ? r.reject(
                                          new Ks(
                                              Gs.UNAVAILABLE,
                                              'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)'
                                          )
                                      )
                                    : r.resolve(n);
                        },
                        error: (t) => r.reject(t),
                    }),
                    o = new od(n, i, { includeMetadataChanges: !0, Nu: !0 });
                return ed(t, o);
            })(await Lf(t), t.asyncQueue, e, n, s)
        ),
        s.promise
    );
}
function Of(t, e, n, s) {
    const r = (function (t, e) {
        let n;
        return (
            (n = "string" == typeof t ? new TextEncoder().encode(t) : t),
            (function (t, e) {
                return new yf(t, e);
            })(
                (function (t, e) {
                    if (t instanceof Uint8Array) return gf(t, e);
                    if (t instanceof ArrayBuffer)
                        return gf(new Uint8Array(t), e);
                    if (t instanceof ReadableStream) return t.getReader();
                    throw new Error(
                        "Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream"
                    );
                })(n),
                e
            )
        );
    })(n, dl(e));
    t.asyncQueue.enqueueAndForget(async () => {
        !(function (t, e, n) {
            const s = Us(t);
            (async function (t, e, n) {
                try {
                    const s = await e.getMetadata();
                    if (
                        await (function (t, e) {
                            const n = Us(t),
                                s = Ka(e.createTime);
                            return n.persistence
                                .runTransaction(
                                    "hasNewerBundle",
                                    "readonly",
                                    (t) => n.Ns.getBundleMetadata(t, e.id)
                                )
                                .then(
                                    (t) => !!t && t.createTime.compareTo(s) >= 0
                                );
                        })(t.localStore, s)
                    )
                        return (
                            await e.close(),
                            n._completeWith(
                                (function (t) {
                                    return {
                                        taskState: "Success",
                                        documentsLoaded: t.totalDocuments,
                                        bytesLoaded: t.totalBytes,
                                        totalDocuments: t.totalDocuments,
                                        totalBytes: t.totalBytes,
                                    };
                                })(s)
                            ),
                            Promise.resolve(new Set())
                        );
                    n._updateProgress(hd(s));
                    const r = new cd(s, t.localStore, e.yt);
                    let i = await e.mc();
                    for (; i; ) {
                        const t = await r.Fu(i);
                        t && n._updateProgress(t), (i = await e.mc());
                    }
                    const o = await r.complete();
                    return (
                        await Rd(t, o.Lu, void 0),
                        await (function (t, e) {
                            const n = Us(t);
                            return n.persistence.runTransaction(
                                "Save bundle",
                                "readwrite",
                                (t) => n.Ns.saveBundleMetadata(t, e)
                            );
                        })(t.localStore, s),
                        n._completeWith(o.progress),
                        Promise.resolve(o.Bu)
                    );
                } catch (t) {
                    return (
                        Os("SyncEngine", `Loading bundle failed with ${t}`),
                        n._failWith(t),
                        Promise.resolve(new Set())
                    );
                }
            })(s, e, n).then((t) => {
                s.sharedClientState.notifyBundleLoaded(t);
            });
        })(await kf(t), r, s);
    });
}
class Vf {
    constructor() {
        (this.Bc = Promise.resolve()),
            (this.Lc = []),
            (this.qc = !1),
            (this.Uc = []),
            (this.Kc = null),
            (this.Gc = !1),
            (this.Qc = !1),
            (this.jc = []),
            (this.xo = new fl(this, "async_queue_retry")),
            (this.Wc = () => {
                const t = ll();
                t &&
                    Ms(
                        "AsyncQueue",
                        "Visibility state changed to " + t.visibilityState
                    ),
                    this.xo.Po();
            });
        const t = ll();
        t &&
            "function" == typeof t.addEventListener &&
            t.addEventListener("visibilitychange", this.Wc);
    }
    get isShuttingDown() {
        return this.qc;
    }
    enqueueAndForget(t) {
        this.enqueue(t);
    }
    enqueueAndForgetEvenWhileRestricted(t) {
        this.zc(), this.Hc(t);
    }
    enterRestrictedMode(t) {
        if (!this.qc) {
            (this.qc = !0), (this.Qc = t || !1);
            const e = ll();
            e &&
                "function" == typeof e.removeEventListener &&
                e.removeEventListener("visibilitychange", this.Wc);
        }
    }
    enqueue(t) {
        if ((this.zc(), this.qc)) return new Promise(() => {});
        const e = new js();
        return this.Hc(() =>
            this.qc && this.Qc
                ? Promise.resolve()
                : (t().then(e.resolve, e.reject), e.promise)
        ).then(() => e.promise);
    }
    enqueueRetryable(t) {
        this.enqueueAndForget(() => (this.Lc.push(t), this.Jc()));
    }
    async Jc() {
        if (0 !== this.Lc.length) {
            try {
                await this.Lc[0](), this.Lc.shift(), this.xo.reset();
            } catch (t) {
                if (!kr(t)) throw t;
                Ms("AsyncQueue", "Operation failed with retryable error: " + t);
            }
            this.Lc.length > 0 && this.xo.Ro(() => this.Jc());
        }
    }
    Hc(t) {
        const e = this.Bc.then(
            () => (
                (this.Gc = !0),
                t()
                    .catch((t) => {
                        (this.Kc = t), (this.Gc = !1);
                        const e = (function (t) {
                            let e = t.message || "";
                            return (
                                t.stack &&
                                    (e = t.stack.includes(t.message)
                                        ? t.stack
                                        : t.message + "\n" + t.stack),
                                e
                            );
                        })(t);
                        throw (Fs("INTERNAL UNHANDLED ERROR: ", e), t);
                    })
                    .then((t) => ((this.Gc = !1), t))
            )
        );
        return (this.Bc = e), e;
    }
    enqueueAfterDelay(t, e, n) {
        this.zc(), this.jc.indexOf(t) > -1 && (e = 0);
        const s = Hl.createAndSchedule(this, t, e, n, (t) => this.Yc(t));
        return this.Uc.push(s), s;
    }
    zc() {
        this.Kc && Ps();
    }
    verifyOperationInProgress() {}
    async Xc() {
        let t;
        do {
            (t = this.Bc), await t;
        } while (t !== this.Bc);
    }
    Zc(t) {
        for (const e of this.Uc) if (e.timerId === t) return !0;
        return !1;
    }
    ta(t) {
        return this.Xc().then(() => {
            this.Uc.sort((t, e) => t.targetTimeMs - e.targetTimeMs);
            for (const e of this.Uc)
                if ((e.skipDelay(), "all" !== t && e.timerId === t)) break;
            return this.Xc();
        });
    }
    ea(t) {
        this.jc.push(t);
    }
    Yc(t) {
        const e = this.Uc.indexOf(t);
        this.Uc.splice(e, 1);
    }
}
function Pf(t) {
    return (function (t, e) {
        if ("object" != typeof t || null === t) return !1;
        const n = t;
        for (const t of ["next", "error", "complete"])
            if (t in n && "function" == typeof n[t]) return !0;
        return !1;
    })(t);
}
class qf {
    constructor() {
        (this._progressObserver = {}),
            (this._taskCompletionResolver = new js()),
            (this._lastProgress = {
                taskState: "Running",
                totalBytes: 0,
                totalDocuments: 0,
                bytesLoaded: 0,
                documentsLoaded: 0,
            });
    }
    onProgress(t, e, n) {
        this._progressObserver = { next: t, error: e, complete: n };
    }
    catch(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }
    then(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }
    _completeWith(t) {
        this._updateProgress(t),
            this._progressObserver.complete &&
                this._progressObserver.complete(),
            this._taskCompletionResolver.resolve(t);
    }
    _failWith(t) {
        (this._lastProgress.taskState = "Error"),
            this._progressObserver.next &&
                this._progressObserver.next(this._lastProgress),
            this._progressObserver.error && this._progressObserver.error(t),
            this._taskCompletionResolver.reject(t);
    }
    _updateProgress(t) {
        (this._lastProgress = t),
            this._progressObserver.next && this._progressObserver.next(t);
    }
}
const Bf = -1;
class Uf extends rf {
    constructor(t, e, n, s) {
        super(t, e, n, s),
            (this.type = "firestore"),
            (this._queue = new Vf()),
            (this._persistenceKey =
                (null == s ? void 0 : s.name) || "[DEFAULT]");
    }
    _terminate() {
        return (
            this._firestoreClient || $f(this), this._firestoreClient.terminate()
        );
    }
}
function Gf(t, e, s) {
    s || (s = "(default)");
    const r = n(t, "firestore");
    if (r.isInitialized(s)) {
        const t = r.getImmediate({ identifier: s });
        if (w(r.getOptions(s), e)) return t;
        throw new Ks(
            Gs.FAILED_PRECONDITION,
            "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance."
        );
    }
    if (
        void 0 !== e.cacheSizeBytes &&
        -1 !== e.cacheSizeBytes &&
        e.cacheSizeBytes < 1048576
    )
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            "cacheSizeBytes must be at least 1048576"
        );
    return r.initialize({ options: e, instanceIdentifier: s });
}
function Kf(t, e) {
    const r = "object" == typeof t ? t : s(),
        i = "string" == typeof t ? t : e || "(default)",
        o = n(r, "firestore").getImmediate({ identifier: i });
    if (!o._initialized) {
        const t = d("firestore");
        t && of(o, ...t);
    }
    return o;
}
function jf(t) {
    return (
        t._firestoreClient || $f(t),
        t._firestoreClient.verifyNotTerminated(),
        t._firestoreClient
    );
}
function $f(t) {
    var e;
    const n = t._freezeSettings(),
        s = (function (t, e, n, s) {
            return new qr(
                t,
                e,
                n,
                s.host,
                s.ssl,
                s.experimentalForceLongPolling,
                s.experimentalAutoDetectLongPolling,
                s.useFetchStreams
            );
        })(
            t._databaseId,
            (null === (e = t._app) || void 0 === e
                ? void 0
                : e.options.appId) || "",
            t._persistenceKey,
            n
        );
    t._firestoreClient = new Tf(
        t._authCredentials,
        t._appCheckCredentials,
        t._queue,
        s
    );
}
function Qf(t, e) {
    nm((t = tf(t, Uf)));
    const n = jf(t),
        s = t._freezeSettings(),
        r = new Hd();
    return Hf(
        n,
        r,
        new Qd(r, s.cacheSizeBytes, null == e ? void 0 : e.forceOwnership)
    );
}
function zf(t) {
    nm((t = tf(t, Uf)));
    const e = jf(t),
        n = t._freezeSettings(),
        s = new Hd();
    return Hf(e, s, new zd(s, n.cacheSizeBytes));
}
function Hf(t, e, n) {
    const s = new js();
    return t.asyncQueue
        .enqueue(async () => {
            try {
                await Sf(t, n), await _f(t, e), s.resolve();
            } catch (t) {
                const e = t;
                if (
                    !(function (t) {
                        return "FirebaseError" === t.name
                            ? t.code === Gs.FAILED_PRECONDITION ||
                                  t.code === Gs.UNIMPLEMENTED
                            : !(
                                  "undefined" != typeof DOMException &&
                                  t instanceof DOMException
                              ) ||
                                  22 === t.code ||
                                  20 === t.code ||
                                  11 === t.code;
                    })(e)
                )
                    throw e;
                Os(
                    "Error enabling offline persistence. Falling back to persistence disabled: " +
                        e
                ),
                    s.reject(e);
            }
        })
        .then(() => s.promise);
}
function Wf(t) {
    if (t._initialized && !t._terminated)
        throw new Ks(
            Gs.FAILED_PRECONDITION,
            "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated."
        );
    const e = new js();
    return (
        t._queue.enqueueAndForgetEvenWhileRestricted(async () => {
            try {
                await (async function (t) {
                    if (!Ar.C()) return Promise.resolve();
                    const e = t + "main";
                    await Ar.delete(e);
                })(Lh(t._databaseId, t._persistenceKey)),
                    e.resolve();
            } catch (t) {
                e.reject(t);
            }
        }),
        e.promise
    );
}
function Yf(t) {
    return (function (t) {
        const e = new js();
        return (
            t.asyncQueue.enqueueAndForget(async () =>
                (async function (t, e) {
                    const n = Us(t);
                    Al(n.remoteStore) ||
                        Ms(
                            "SyncEngine",
                            "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled."
                        );
                    try {
                        const t = await (function (t) {
                            const e = Us(t);
                            return e.persistence.runTransaction(
                                "Get highest unacknowledged batch id",
                                "readonly",
                                (t) =>
                                    e.mutationQueue.getHighestUnacknowledgedBatchId(
                                        t
                                    )
                            );
                        })(n.localStore);
                        if (-1 === t) return void e.resolve();
                        const s = n.lc.get(t) || [];
                        s.push(e), n.lc.set(t, s);
                    } catch (t) {
                        const n = Wl(
                            t,
                            "Initialization of waitForPendingWrites() operation failed"
                        );
                        e.reject(n);
                    }
                })(await kf(t), e)
            ),
            e.promise
        );
    })(jf((t = tf(t, Uf))));
}
function Xf(t) {
    return (function (t) {
        return t.asyncQueue.enqueue(async () => {
            const e = await Af(t),
                n = await Nf(t);
            return (
                e.setNetworkEnabled(!0),
                (function (t) {
                    const e = Us(t);
                    return e._u.delete(0), Il(e);
                })(n)
            );
        });
    })(jf((t = tf(t, Uf))));
}
function Jf(t) {
    return (function (t) {
        return t.asyncQueue.enqueue(async () => {
            const e = await Af(t),
                n = await Nf(t);
            return (
                e.setNetworkEnabled(!1),
                (async function (t) {
                    const e = Us(t);
                    e._u.add(0), await bl(e), e.gu.set("Offline");
                })(n)
            );
        });
    })(jf((t = tf(t, Uf))));
}
function Zf(t) {
    return r(t.app, "firestore", t._databaseId.database), t._delete();
}
function tm(t, e) {
    const n = jf((t = tf(t, Uf))),
        s = new qf();
    return Of(n, t._databaseId, e, s), s;
}
function em(t, e) {
    return (function (t, e) {
        return t.asyncQueue.enqueue(async () =>
            (function (t, e) {
                const n = Us(t);
                return n.persistence.runTransaction(
                    "Get named query",
                    "readonly",
                    (t) => n.Ns.getNamedQuery(t, e)
                );
            })(await Cf(t), e)
        );
    })(jf((t = tf(t, Uf))), e).then((e) =>
        e ? new uf(t, null, e.query) : null
    );
}
function nm(t) {
    if (t._initialized || t._terminated)
        throw new Ks(
            Gs.FAILED_PRECONDITION,
            "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object."
        );
}
class sm {
    constructor(t) {
        this._byteString = t;
    }
    static fromBase64String(t) {
        try {
            return new sm(Hr.fromBase64String(t));
        } catch (t) {
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Failed to construct data from Base64 string: " + t
            );
        }
    }
    static fromUint8Array(t) {
        return new sm(Hr.fromUint8Array(t));
    }
    toBase64() {
        return this._byteString.toBase64();
    }
    toUint8Array() {
        return this._byteString.toUint8Array();
    }
    toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }
    isEqual(t) {
        return this._byteString.isEqual(t._byteString);
    }
}
class rm {
    constructor(...t) {
        for (let e = 0; e < t.length; ++e)
            if (0 === t[e].length)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Invalid field name at argument $(i + 1). Field names must not be empty."
                );
        this._internalPath = new hr(t);
    }
    isEqual(t) {
        return this._internalPath.isEqual(t._internalPath);
    }
}
function im() {
    return new rm("__name__");
}
class om {
    constructor(t) {
        this._methodName = t;
    }
}
class am {
    constructor(t, e) {
        if (!isFinite(t) || t < -90 || t > 90)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Latitude must be a number between -90 and 90, but was: " + t
            );
        if (!isFinite(e) || e < -180 || e > 180)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Longitude must be a number between -180 and 180, but was: " + e
            );
        (this._lat = t), (this._long = e);
    }
    get latitude() {
        return this._lat;
    }
    get longitude() {
        return this._long;
    }
    isEqual(t) {
        return this._lat === t._lat && this._long === t._long;
    }
    toJSON() {
        return { latitude: this._lat, longitude: this._long };
    }
    _compareTo(t) {
        return nr(this._lat, t._lat) || nr(this._long, t._long);
    }
}
const um = /^__.*__$/;
class cm {
    constructor(t, e, n) {
        (this.data = t), (this.fieldMask = e), (this.fieldTransforms = n);
    }
    toMutation(t, e) {
        return null !== this.fieldMask
            ? new na(t, this.data, this.fieldMask, e, this.fieldTransforms)
            : new ea(t, this.data, e, this.fieldTransforms);
    }
}
class hm {
    constructor(t, e, n) {
        (this.data = t), (this.fieldMask = e), (this.fieldTransforms = n);
    }
    toMutation(t, e) {
        return new na(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }
}
function lm(t) {
    switch (t) {
        case 0:
        case 2:
        case 1:
            return !0;
        case 3:
        case 4:
            return !1;
        default:
            throw Ps();
    }
}
class dm {
    constructor(t, e, n, s, r, i) {
        (this.settings = t),
            (this.databaseId = e),
            (this.yt = n),
            (this.ignoreUndefinedProperties = s),
            void 0 === r && this.na(),
            (this.fieldTransforms = r || []),
            (this.fieldMask = i || []);
    }
    get path() {
        return this.settings.path;
    }
    get sa() {
        return this.settings.sa;
    }
    ia(t) {
        return new dm(
            Object.assign(Object.assign({}, this.settings), t),
            this.databaseId,
            this.yt,
            this.ignoreUndefinedProperties,
            this.fieldTransforms,
            this.fieldMask
        );
    }
    ra(t) {
        var e;
        const n =
                null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
            s = this.ia({ path: n, oa: !1 });
        return s.ua(t), s;
    }
    ca(t) {
        var e;
        const n =
                null === (e = this.path) || void 0 === e ? void 0 : e.child(t),
            s = this.ia({ path: n, oa: !1 });
        return s.na(), s;
    }
    aa(t) {
        return this.ia({ path: void 0, oa: !0 });
    }
    ha(t) {
        return Rm(
            t,
            this.settings.methodName,
            this.settings.la || !1,
            this.path,
            this.settings.fa
        );
    }
    contains(t) {
        return (
            void 0 !== this.fieldMask.find((e) => t.isPrefixOf(e)) ||
            void 0 !== this.fieldTransforms.find((e) => t.isPrefixOf(e.field))
        );
    }
    na() {
        if (this.path)
            for (let t = 0; t < this.path.length; t++)
                this.ua(this.path.get(t));
    }
    ua(t) {
        if (0 === t.length) throw this.ha("Document fields must not be empty");
        if (lm(this.sa) && um.test(t))
            throw this.ha('Document fields cannot begin and end with "__"');
    }
}
class fm {
    constructor(t, e, n) {
        (this.databaseId = t),
            (this.ignoreUndefinedProperties = e),
            (this.yt = n || dl(t));
    }
    da(t, e, n, s = !1) {
        return new dm(
            {
                sa: t,
                methodName: e,
                fa: n,
                path: hr.emptyPath(),
                oa: !1,
                la: s,
            },
            this.databaseId,
            this.yt,
            this.ignoreUndefinedProperties
        );
    }
}
function mm(t) {
    const e = t._freezeSettings(),
        n = dl(t._databaseId);
    return new fm(t._databaseId, !!e.ignoreUndefinedProperties, n);
}
function gm(t, e, n, s, r, i = {}) {
    const o = t.da(i.merge || i.mergeFields ? 2 : 0, e, n, r);
    Am("Data must be an object, but it was:", o, s);
    const a = xm(s, o);
    let u, c;
    if (i.merge) (u = new Zi(o.fieldMask)), (c = o.fieldTransforms);
    else if (i.mergeFields) {
        const t = [];
        for (const s of i.mergeFields) {
            const r = Cm(e, s, n);
            if (!o.contains(r))
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    `Field '${r}' is specified in your field mask but missing from your input data.`
                );
            Lm(t, r) || t.push(r);
        }
        (u = new Zi(t)),
            (c = o.fieldTransforms.filter((t) => u.covers(t.field)));
    } else (u = null), (c = o.fieldTransforms);
    return new cm(new to(a), u, c);
}
class pm extends om {
    _toFieldTransform(t) {
        if (2 !== t.sa)
            throw 1 === t.sa
                ? t.ha(
                      `${this._methodName}() can only appear at the top level of your update data`
                  )
                : t.ha(
                      `${this._methodName}() cannot be used with set() unless you pass {merge:true}`
                  );
        return t.fieldMask.push(t.path), null;
    }
    isEqual(t) {
        return t instanceof pm;
    }
}
function ym(t, e, n) {
    return new dm(
        { sa: 3, fa: e.settings.fa, methodName: t._methodName, oa: n },
        e.databaseId,
        e.yt,
        e.ignoreUndefinedProperties
    );
}
class wm extends om {
    _toFieldTransform(t) {
        return new $o(t.path, new Vo());
    }
    isEqual(t) {
        return t instanceof wm;
    }
}
class vm extends om {
    constructor(t, e) {
        super(t), (this._a = e);
    }
    _toFieldTransform(t) {
        const e = ym(this, t, !0),
            n = this._a.map((t) => _m(t, e)),
            s = new Po(n);
        return new $o(t.path, s);
    }
    isEqual(t) {
        return this === t;
    }
}
class Im extends om {
    constructor(t, e) {
        super(t), (this._a = e);
    }
    _toFieldTransform(t) {
        const e = ym(this, t, !0),
            n = this._a.map((t) => _m(t, e)),
            s = new Bo(n);
        return new $o(t.path, s);
    }
    isEqual(t) {
        return this === t;
    }
}
class bm extends om {
    constructor(t, e) {
        super(t), (this.wa = e);
    }
    _toFieldTransform(t) {
        const e = new Go(t.yt, Ro(t.yt, this.wa));
        return new $o(t.path, e);
    }
    isEqual(t) {
        return this === t;
    }
}
function Em(t, e, n, s) {
    const r = t.da(1, e, n);
    Am("Data must be an object, but it was:", r, s);
    const i = [],
        o = to.empty();
    Gr(s, (t, s) => {
        const a = km(e, t, n);
        s = I(s);
        const u = r.ca(a);
        if (s instanceof pm) i.push(a);
        else {
            const t = _m(s, u);
            null != t && (i.push(a), o.set(a, t));
        }
    });
    const a = new Zi(i);
    return new hm(o, a, r.fieldTransforms);
}
function Tm(t, e, n, s, r, i) {
    const o = t.da(1, e, n),
        a = [Cm(e, s, n)],
        u = [r];
    if (i.length % 2 != 0)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`
        );
    for (let t = 0; t < i.length; t += 2) a.push(Cm(e, i[t])), u.push(i[t + 1]);
    const c = [],
        h = to.empty();
    for (let t = a.length - 1; t >= 0; --t)
        if (!Lm(c, a[t])) {
            const e = a[t];
            let n = u[t];
            n = I(n);
            const s = o.ca(e);
            if (n instanceof pm) c.push(e);
            else {
                const t = _m(n, s);
                null != t && (c.push(e), h.set(e, t));
            }
        }
    const l = new Zi(c);
    return new hm(h, l, o.fieldTransforms);
}
function Sm(t, e, n, s = !1) {
    return _m(n, t.da(s ? 4 : 3, e));
}
function _m(t, e) {
    if (Dm((t = I(t)))) return Am("Unsupported field value:", e, t), xm(t, e);
    if (t instanceof om)
        return (
            (function (t, e) {
                if (!lm(e.sa))
                    throw e.ha(
                        `${t._methodName}() can only be used with update() and set()`
                    );
                if (!e.path)
                    throw e.ha(
                        `${t._methodName}() is not currently supported inside arrays`
                    );
                const n = t._toFieldTransform(e);
                n && e.fieldTransforms.push(n);
            })(t, e),
            null
        );
    if (void 0 === t && e.ignoreUndefinedProperties) return null;
    if ((e.path && e.fieldMask.push(e.path), t instanceof Array)) {
        if (e.settings.oa && 4 !== e.sa)
            throw e.ha("Nested arrays are not supported");
        return (function (t, e) {
            const n = [];
            let s = 0;
            for (const r of t) {
                let t = _m(r, e.aa(s));
                null == t && (t = { nullValue: "NULL_VALUE" }), n.push(t), s++;
            }
            return { arrayValue: { values: n } };
        })(t, e);
    }
    return (function (t, e) {
        if (null === (t = I(t))) return { nullValue: "NULL_VALUE" };
        if ("number" == typeof t) return Ro(e.yt, t);
        if ("boolean" == typeof t) return { booleanValue: t };
        if ("string" == typeof t) return { stringValue: t };
        if (t instanceof Date) {
            const n = ir.fromDate(t);
            return { timestampValue: Ba(e.yt, n) };
        }
        if (t instanceof ir) {
            const n = new ir(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return { timestampValue: Ba(e.yt, n) };
        }
        if (t instanceof am)
            return {
                geoPointValue: { latitude: t.latitude, longitude: t.longitude },
            };
        if (t instanceof sm) return { bytesValue: Ua(e.yt, t._byteString) };
        if (t instanceof af) {
            const n = e.databaseId,
                s = t.firestore._databaseId;
            if (!s.isEqual(n))
                throw e.ha(
                    `Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`
                );
            return {
                referenceValue: ja(
                    t.firestore._databaseId || e.databaseId,
                    t._key.path
                ),
            };
        }
        throw e.ha(`Unsupported field value: ${Zd(t)}`);
    })(t, e);
}
function xm(t, e) {
    const n = {};
    return (
        Kr(t)
            ? e.path && e.path.length > 0 && e.fieldMask.push(e.path)
            : Gr(t, (t, s) => {
                  const r = _m(s, e.ra(t));
                  null != r && (n[t] = r);
              }),
        { mapValue: { fields: n } }
    );
}
function Dm(t) {
    return !(
        "object" != typeof t ||
        null === t ||
        t instanceof Array ||
        t instanceof Date ||
        t instanceof ir ||
        t instanceof am ||
        t instanceof sm ||
        t instanceof af ||
        t instanceof om
    );
}
function Am(t, e, n) {
    if (
        !Dm(n) ||
        !(function (t) {
            return (
                "object" == typeof t &&
                null !== t &&
                (Object.getPrototypeOf(t) === Object.prototype ||
                    null === Object.getPrototypeOf(t))
            );
        })(n)
    ) {
        const s = Zd(n);
        throw "an object" === s
            ? e.ha(t + " a custom object")
            : e.ha(t + " " + s);
    }
}
function Cm(t, e, n) {
    if ((e = I(e)) instanceof rm) return e._internalPath;
    if ("string" == typeof e) return km(t, e);
    throw Rm(
        "Field path arguments must be of type string or ",
        t,
        !1,
        void 0,
        n
    );
}
const Nm = new RegExp("[~\\*/\\[\\]]");
function km(t, e, n) {
    if (e.search(Nm) >= 0)
        throw Rm(
            `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
            t,
            !1,
            void 0,
            n
        );
    try {
        return new rm(...e.split("."))._internalPath;
    } catch (s) {
        throw Rm(
            `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
            t,
            !1,
            void 0,
            n
        );
    }
}
function Rm(t, e, n, s, r) {
    const i = s && !s.isEmpty(),
        o = void 0 !== r;
    let a = `Function ${e}() called with invalid data`;
    n && (a += " (via `toFirestore()`)"), (a += ". ");
    let u = "";
    return (
        (i || o) &&
            ((u += " (found"),
            i && (u += ` in field ${s}`),
            o && (u += ` in document ${r}`),
            (u += ")")),
        new Ks(Gs.INVALID_ARGUMENT, a + t + u)
    );
}
function Lm(t, e) {
    return t.some((t) => t.isEqual(e));
}
class Mm {
    constructor(t, e, n, s, r) {
        (this._firestore = t),
            (this._userDataWriter = e),
            (this._key = n),
            (this._document = s),
            (this._converter = r);
    }
    get id() {
        return this._key.path.lastSegment();
    }
    get ref() {
        return new af(this._firestore, this._converter, this._key);
    }
    exists() {
        return null !== this._document;
    }
    data() {
        if (this._document) {
            if (this._converter) {
                const t = new Fm(
                    this._firestore,
                    this._userDataWriter,
                    this._key,
                    this._document,
                    null
                );
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }
    get(t) {
        if (this._document) {
            const e = this._document.data.field(Om("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }
}
class Fm extends Mm {
    data() {
        return super.data();
    }
}
function Om(t, e) {
    return "string" == typeof e
        ? km(t, e)
        : e instanceof rm
        ? e._internalPath
        : e._delegate._internalPath;
}
function Vm(t) {
    if ("L" === t.limitType && 0 === t.explicitOrderBy.length)
        throw new Ks(
            Gs.UNIMPLEMENTED,
            "limitToLast() queries require specifying at least one orderBy() clause"
        );
}
class Pm {}
class qm extends Pm {}
function Bm(t, e, ...n) {
    let s = [];
    e instanceof Pm && s.push(e),
        (s = s.concat(n)),
        (function (t) {
            const e = t.filter((t) => t instanceof Km).length,
                n = t.filter((t) => t instanceof Um).length;
            if (e > 1 || (e > 0 && n > 0))
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`."
                );
        })(s);
    for (const e of s) t = e._apply(t);
    return t;
}
class Um extends qm {
    constructor(t, e, n) {
        super(),
            (this._field = t),
            (this._op = e),
            (this._value = n),
            (this.type = "where");
    }
    static _create(t, e, n) {
        return new Um(t, e, n);
    }
    _apply(t) {
        const e = this._parse(t);
        return (
            og(t._query, e), new uf(t.firestore, t.converter, bo(t._query, e))
        );
    }
    _parse(t) {
        const e = mm(t.firestore),
            n = (function (t, e, n, s, r, i, o) {
                let a;
                if (r.isKeyField()) {
                    if ("array-contains" === i || "array-contains-any" === i)
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            `Invalid Query. You can't perform '${i}' queries on documentId().`
                        );
                    if ("in" === i || "not-in" === i) {
                        ig(o, i);
                        const e = [];
                        for (const n of o) e.push(rg(s, t, n));
                        a = { arrayValue: { values: e } };
                    } else a = rg(s, t, o);
                } else
                    ("in" !== i &&
                        "not-in" !== i &&
                        "array-contains-any" !== i) ||
                        ig(o, i),
                        (a = Sm(n, "where", o, "in" === i || "not-in" === i));
                return Di.create(r, i, a);
            })(
                t._query,
                0,
                e,
                t.firestore._databaseId,
                this._field,
                this._op,
                this._value
            );
        return n;
    }
}
function Gm(t, e, n) {
    const s = e,
        r = Om("where", t);
    return Um._create(r, s, n);
}
class Km extends Pm {
    constructor(t, e) {
        super(), (this.type = t), (this._queryConstraints = e);
    }
    static _create(t, e) {
        return new Km(t, e);
    }
    _parse(t) {
        const e = this._queryConstraints
            .map((e) => e._parse(t))
            .filter((t) => t.getFilters().length > 0);
        return 1 === e.length ? e[0] : Ai.create(e, this._getOperator());
    }
    _apply(t) {
        const e = this._parse(t);
        return 0 === e.getFilters().length
            ? t
            : ((function (t, e) {
                  let n = t;
                  const s = e.getFlattenedFilters();
                  for (const t of s) og(n, t), (n = bo(n, t));
              })(t._query, e),
              new uf(t.firestore, t.converter, bo(t._query, e)));
    }
    _getQueryConstraints() {
        return this._queryConstraints;
    }
    _getOperator() {
        return "and" === this.type ? "and" : "or";
    }
}
function jm(...t) {
    return t.forEach((t) => ug("or", t)), Km._create("or", t);
}
function $m(...t) {
    return t.forEach((t) => ug("and", t)), Km._create("and", t);
}
class Qm extends qm {
    constructor(t, e) {
        super(),
            (this._field = t),
            (this._direction = e),
            (this.type = "orderBy");
    }
    static _create(t, e) {
        return new Qm(t, e);
    }
    _apply(t) {
        const e = (function (t, e, n) {
            if (null !== t.startAt)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Invalid query. You must not call startAt() or startAfter() before calling orderBy()."
                );
            if (null !== t.endAt)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Invalid query. You must not call endAt() or endBefore() before calling orderBy()."
                );
            const s = new $i(e, n);
            return (
                (function (t, e) {
                    if (null === po(t)) {
                        const n = yo(t);
                        null !== n && ag(t, n, e.field);
                    }
                })(t, s),
                s
            );
        })(t._query, this._field, this._direction);
        return new uf(
            t.firestore,
            t.converter,
            (function (t, e) {
                const n = t.explicitOrderBy.concat([e]);
                return new lo(
                    t.path,
                    t.collectionGroup,
                    n,
                    t.filters.slice(),
                    t.limit,
                    t.limitType,
                    t.startAt,
                    t.endAt
                );
            })(t._query, e)
        );
    }
}
function zm(t, e = "asc") {
    const n = e,
        s = Om("orderBy", t);
    return Qm._create(s, n);
}
class Hm extends qm {
    constructor(t, e, n) {
        super(), (this.type = t), (this._limit = e), (this._limitType = n);
    }
    static _create(t, e, n) {
        return new Hm(t, e, n);
    }
    _apply(t) {
        return new uf(
            t.firestore,
            t.converter,
            Eo(t._query, this._limit, this._limitType)
        );
    }
}
function Wm(t) {
    return ef("limit", t), Hm._create("limit", t, "F");
}
function Ym(t) {
    return ef("limitToLast", t), Hm._create("limitToLast", t, "L");
}
class Xm extends qm {
    constructor(t, e, n) {
        super(),
            (this.type = t),
            (this._docOrFields = e),
            (this._inclusive = n);
    }
    static _create(t, e, n) {
        return new Xm(t, e, n);
    }
    _apply(t) {
        const e = sg(t, this.type, this._docOrFields, this._inclusive);
        return new uf(
            t.firestore,
            t.converter,
            (function (t, e) {
                return new lo(
                    t.path,
                    t.collectionGroup,
                    t.explicitOrderBy.slice(),
                    t.filters.slice(),
                    t.limit,
                    t.limitType,
                    e,
                    t.endAt
                );
            })(t._query, e)
        );
    }
}
function Jm(...t) {
    return Xm._create("startAt", t, !0);
}
function Zm(...t) {
    return Xm._create("startAfter", t, !1);
}
class tg extends qm {
    constructor(t, e, n) {
        super(),
            (this.type = t),
            (this._docOrFields = e),
            (this._inclusive = n);
    }
    static _create(t, e, n) {
        return new tg(t, e, n);
    }
    _apply(t) {
        const e = sg(t, this.type, this._docOrFields, this._inclusive);
        return new uf(
            t.firestore,
            t.converter,
            (function (t, e) {
                return new lo(
                    t.path,
                    t.collectionGroup,
                    t.explicitOrderBy.slice(),
                    t.filters.slice(),
                    t.limit,
                    t.limitType,
                    t.startAt,
                    e
                );
            })(t._query, e)
        );
    }
}
function eg(...t) {
    return tg._create("endBefore", t, !1);
}
function ng(...t) {
    return tg._create("endAt", t, !0);
}
function sg(t, e, n, s) {
    if (((n[0] = I(n[0])), n[0] instanceof Mm))
        return (function (t, e, n, s, r) {
            if (!s)
                throw new Ks(
                    Gs.NOT_FOUND,
                    `Can't use a DocumentSnapshot that doesn't exist for ${n}().`
                );
            const i = [];
            for (const n of vo(t))
                if (n.field.isKeyField()) i.push(li(e, s.key));
                else {
                    const t = s.data.field(n.field);
                    if (Zr(t))
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            'Invalid query. You are trying to start or end a query using a document for which the field "' +
                                n.field +
                                '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)'
                        );
                    if (null === t) {
                        const t = n.field.canonicalString();
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`
                        );
                    }
                    i.push(t);
                }
            return new Ti(i, r);
        })(t._query, t.firestore._databaseId, e, n[0]._document, s);
    {
        const r = mm(t.firestore);
        return (function (t, e, n, s, r, i) {
            const o = t.explicitOrderBy;
            if (r.length > o.length)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`
                );
            const a = [];
            for (let i = 0; i < r.length; i++) {
                const u = r[i];
                if (o[i].field.isKeyField()) {
                    if ("string" != typeof u)
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof u}`
                        );
                    if (!wo(t) && -1 !== u.indexOf("/"))
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${s}() must be a plain document ID, but '${u}' contains a slash.`
                        );
                    const n = t.path.child(ur.fromString(u));
                    if (!lr.isDocumentKey(n))
                        throw new Ks(
                            Gs.INVALID_ARGUMENT,
                            `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`
                        );
                    const r = new lr(n);
                    a.push(li(e, r));
                } else {
                    const t = Sm(n, s, u);
                    a.push(t);
                }
            }
            return new Ti(a, i);
        })(t._query, t.firestore._databaseId, r, e, n, s);
    }
}
function rg(t, e, n) {
    if ("string" == typeof (n = I(n))) {
        if ("" === n)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string."
            );
        if (!wo(e) && -1 !== n.indexOf("/"))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`
            );
        const s = e.path.child(ur.fromString(n));
        if (!lr.isDocumentKey(s))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`
            );
        return li(t, new lr(s));
    }
    if (n instanceof af) return li(t, n._key);
    throw new Ks(
        Gs.INVALID_ARGUMENT,
        `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Zd(
            n
        )}.`
    );
}
function ig(t, e) {
    if (!Array.isArray(t) || 0 === t.length)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`
        );
    if (t.length > 10)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`
        );
}
function og(t, e) {
    if (e.isInequality()) {
        const n = yo(t),
            s = e.field;
        if (null !== n && !n.isEqual(s))
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${s.toString()}'`
            );
        const r = po(t);
        null !== r && ag(t, s, r);
    }
    const n = (function (t, e) {
        for (const n of t)
            for (const t of n.getFlattenedFilters())
                if (e.indexOf(t.op) >= 0) return t.op;
        return null;
    })(
        t.filters,
        (function (t) {
            switch (t) {
                case "!=":
                    return ["!=", "not-in"];
                case "array-contains":
                    return ["array-contains", "array-contains-any", "not-in"];
                case "in":
                    return ["array-contains-any", "in", "not-in"];
                case "array-contains-any":
                    return [
                        "array-contains",
                        "array-contains-any",
                        "in",
                        "not-in",
                    ];
                case "not-in":
                    return [
                        "array-contains",
                        "array-contains-any",
                        "in",
                        "not-in",
                        "!=",
                    ];
                default:
                    return [];
            }
        })(e.op)
    );
    if (null !== n)
        throw n === e.op
            ? new Ks(
                  Gs.INVALID_ARGUMENT,
                  `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`
              )
            : new Ks(
                  Gs.INVALID_ARGUMENT,
                  `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`
              );
}
function ag(t, e, n) {
    if (!n.isEqual(e))
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`
        );
}
function ug(t, e) {
    if (!(e instanceof Um || e instanceof Km))
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            `Function ${t}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`
        );
}
class cg {
    convertValue(t, e = "none") {
        switch (ri(t)) {
            case 0:
                return null;
            case 1:
                return t.booleanValue;
            case 2:
                return Xr(t.integerValue || t.doubleValue);
            case 3:
                return this.convertTimestamp(t.timestampValue);
            case 4:
                return this.convertServerTimestamp(t, e);
            case 5:
                return t.stringValue;
            case 6:
                return this.convertBytes(Jr(t.bytesValue));
            case 7:
                return this.convertReference(t.referenceValue);
            case 8:
                return this.convertGeoPoint(t.geoPointValue);
            case 9:
                return this.convertArray(t.arrayValue, e);
            case 10:
                return this.convertObject(t.mapValue, e);
            default:
                throw Ps();
        }
    }
    convertObject(t, e) {
        const n = {};
        return (
            Gr(t.fields, (t, s) => {
                n[t] = this.convertValue(s, e);
            }),
            n
        );
    }
    convertGeoPoint(t) {
        return new am(Xr(t.latitude), Xr(t.longitude));
    }
    convertArray(t, e) {
        return (t.values || []).map((t) => this.convertValue(t, e));
    }
    convertServerTimestamp(t, e) {
        switch (e) {
            case "previous":
                const n = ti(t);
                return null == n ? null : this.convertValue(n, e);
            case "estimate":
                return this.convertTimestamp(ei(t));
            default:
                return null;
        }
    }
    convertTimestamp(t) {
        const e = Yr(t);
        return new ir(e.seconds, e.nanos);
    }
    convertDocumentKey(t, e) {
        const n = ur.fromString(t);
        qs(fu(n));
        const s = new Br(n.get(1), n.get(3)),
            r = new lr(n.popFirst(5));
        return (
            s.isEqual(e) ||
                Fs(
                    `Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`
                ),
            r
        );
    }
}
function hg(t, e, n) {
    let s;
    return (
        (s = t
            ? n && (n.merge || n.mergeFields)
                ? t.toFirestore(e, n)
                : t.toFirestore(e)
            : e),
        s
    );
}
class lg extends cg {
    constructor(t) {
        super(), (this.firestore = t);
    }
    convertBytes(t) {
        return new sm(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new af(this.firestore, null, e);
    }
}
class dg {
    constructor(t, e) {
        (this.hasPendingWrites = t), (this.fromCache = e);
    }
    isEqual(t) {
        return (
            this.hasPendingWrites === t.hasPendingWrites &&
            this.fromCache === t.fromCache
        );
    }
}
class fg extends Mm {
    constructor(t, e, n, s, r, i) {
        super(t, e, n, s, i),
            (this._firestore = t),
            (this._firestoreImpl = t),
            (this.metadata = r);
    }
    exists() {
        return super.exists();
    }
    data(t = {}) {
        if (this._document) {
            if (this._converter) {
                const e = new mg(
                    this._firestore,
                    this._userDataWriter,
                    this._key,
                    this._document,
                    this.metadata,
                    null
                );
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(
                this._document.data.value,
                t.serverTimestamps
            );
        }
    }
    get(t, e = {}) {
        if (this._document) {
            const n = this._document.data.field(Om("DocumentSnapshot.get", t));
            if (null !== n)
                return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }
}
class mg extends fg {
    data(t = {}) {
        return super.data(t);
    }
}
class gg {
    constructor(t, e, n, s) {
        (this._firestore = t),
            (this._userDataWriter = e),
            (this._snapshot = s),
            (this.metadata = new dg(s.hasPendingWrites, s.fromCache)),
            (this.query = n);
    }
    get docs() {
        const t = [];
        return this.forEach((e) => t.push(e)), t;
    }
    get size() {
        return this._snapshot.docs.size;
    }
    get empty() {
        return 0 === this.size;
    }
    forEach(t, e) {
        this._snapshot.docs.forEach((n) => {
            t.call(
                e,
                new mg(
                    this._firestore,
                    this._userDataWriter,
                    n.key,
                    n,
                    new dg(
                        this._snapshot.mutatedKeys.has(n.key),
                        this._snapshot.fromCache
                    ),
                    this.query.converter
                )
            );
        });
    }
    docChanges(t = {}) {
        const e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges)
            throw new Ks(
                Gs.INVALID_ARGUMENT,
                "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot()."
            );
        return (
            (this._cachedChanges &&
                this._cachedChangesIncludeMetadataChanges === e) ||
                ((this._cachedChanges = (function (t, e) {
                    if (t._snapshot.oldDocs.isEmpty()) {
                        let e = 0;
                        return t._snapshot.docChanges.map((n) => {
                            const s = new mg(
                                t._firestore,
                                t._userDataWriter,
                                n.doc.key,
                                n.doc,
                                new dg(
                                    t._snapshot.mutatedKeys.has(n.doc.key),
                                    t._snapshot.fromCache
                                ),
                                t.query.converter
                            );
                            return (
                                n.doc,
                                {
                                    type: "added",
                                    doc: s,
                                    oldIndex: -1,
                                    newIndex: e++,
                                }
                            );
                        });
                    }
                    {
                        let n = t._snapshot.oldDocs;
                        return t._snapshot.docChanges
                            .filter((t) => e || 3 !== t.type)
                            .map((e) => {
                                const s = new mg(
                                    t._firestore,
                                    t._userDataWriter,
                                    e.doc.key,
                                    e.doc,
                                    new dg(
                                        t._snapshot.mutatedKeys.has(e.doc.key),
                                        t._snapshot.fromCache
                                    ),
                                    t.query.converter
                                );
                                let r = -1,
                                    i = -1;
                                return (
                                    0 !== e.type &&
                                        ((r = n.indexOf(e.doc.key)),
                                        (n = n.delete(e.doc.key))),
                                    1 !== e.type &&
                                        ((n = n.add(e.doc)),
                                        (i = n.indexOf(e.doc.key))),
                                    {
                                        type: pg(e.type),
                                        doc: s,
                                        oldIndex: r,
                                        newIndex: i,
                                    }
                                );
                            });
                    }
                })(this, e)),
                (this._cachedChangesIncludeMetadataChanges = e)),
            this._cachedChanges
        );
    }
}
function pg(t) {
    switch (t) {
        case 0:
            return "added";
        case 2:
        case 3:
            return "modified";
        case 1:
            return "removed";
        default:
            return Ps();
    }
}
function yg(t, e) {
    return t instanceof fg && e instanceof fg
        ? t._firestore === e._firestore &&
              t._key.isEqual(e._key) &&
              (null === t._document
                  ? null === e._document
                  : t._document.isEqual(e._document)) &&
              t._converter === e._converter
        : t instanceof gg &&
              e instanceof gg &&
              t._firestore === e._firestore &&
              mf(t.query, e.query) &&
              t.metadata.isEqual(e.metadata) &&
              t._snapshot.isEqual(e._snapshot);
}
function wg(t) {
    t = tf(t, af);
    const e = tf(t.firestore, Uf);
    return Mf(jf(e), t._key).then((n) => Rg(e, t, n));
}
class vg extends cg {
    constructor(t) {
        super(), (this.firestore = t);
    }
    convertBytes(t) {
        return new sm(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new af(this.firestore, null, e);
    }
}
function Ig(t) {
    t = tf(t, af);
    const e = tf(t.firestore, Uf),
        n = jf(e),
        s = new vg(e);
    return (function (t, e) {
        const n = new js();
        return (
            t.asyncQueue.enqueueAndForget(async () =>
                (async function (t, e, n) {
                    try {
                        const s = await (function (t, e) {
                            const n = Us(t);
                            return n.persistence.runTransaction(
                                "read document",
                                "readonly",
                                (t) => n.localDocuments.getDocument(t, e)
                            );
                        })(t, e);
                        s.isFoundDocument()
                            ? n.resolve(s)
                            : s.isNoDocument()
                            ? n.resolve(null)
                            : n.reject(
                                  new Ks(
                                      Gs.UNAVAILABLE,
                                      "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"
                                  )
                              );
                    } catch (t) {
                        const s = Wl(
                            t,
                            `Failed to get document '${e} from cache`
                        );
                        n.reject(s);
                    }
                })(await Cf(t), e, n)
            ),
            n.promise
        );
    })(n, t._key).then(
        (n) =>
            new fg(
                e,
                s,
                t._key,
                n,
                new dg(null !== n && n.hasLocalMutations, !0),
                t.converter
            )
    );
}
function bg(t) {
    t = tf(t, af);
    const e = tf(t.firestore, Uf);
    return Mf(jf(e), t._key, { source: "server" }).then((n) => Rg(e, t, n));
}
function Eg(t) {
    t = tf(t, uf);
    const e = tf(t.firestore, Uf),
        n = jf(e),
        s = new vg(e);
    return Vm(t._query), Ff(n, t._query).then((n) => new gg(e, s, t, n));
}
function Tg(t) {
    t = tf(t, uf);
    const e = tf(t.firestore, Uf),
        n = jf(e),
        s = new vg(e);
    return (function (t, e) {
        const n = new js();
        return (
            t.asyncQueue.enqueueAndForget(async () =>
                (async function (t, e, n) {
                    try {
                        const s = await jh(t, e, !0),
                            r = new fd(e, s.Hi),
                            i = r.Wu(s.documents),
                            o = r.applyChanges(i, !1);
                        n.resolve(o.snapshot);
                    } catch (t) {
                        const s = Wl(
                            t,
                            `Failed to execute query '${e} against cache`
                        );
                        n.reject(s);
                    }
                })(await Cf(t), e, n)
            ),
            n.promise
        );
    })(n, t._query).then((n) => new gg(e, s, t, n));
}
function Sg(t) {
    t = tf(t, uf);
    const e = tf(t.firestore, Uf),
        n = jf(e),
        s = new vg(e);
    return Ff(n, t._query, { source: "server" }).then(
        (n) => new gg(e, s, t, n)
    );
}
function _g(t, e, n) {
    t = tf(t, af);
    const s = tf(t.firestore, Uf),
        r = hg(t.converter, e, n);
    return kg(s, [
        gm(mm(s), "setDoc", t._key, r, null !== t.converter, n).toMutation(
            t._key,
            zo.none()
        ),
    ]);
}
function xg(t, e, n, ...s) {
    t = tf(t, af);
    const r = tf(t.firestore, Uf),
        i = mm(r);
    let o;
    return (
        (o =
            "string" == typeof (e = I(e)) || e instanceof rm
                ? Tm(i, "updateDoc", t._key, e, n, s)
                : Em(i, "updateDoc", t._key, e)),
        kg(r, [o.toMutation(t._key, zo.exists(!0))])
    );
}
function Dg(t) {
    return kg(tf(t.firestore, Uf), [new oa(t._key, zo.none())]);
}
function Ag(t, e) {
    const n = tf(t.firestore, Uf),
        s = df(t),
        r = hg(t.converter, e);
    return kg(n, [
        gm(
            mm(t.firestore),
            "addDoc",
            s._key,
            r,
            null !== t.converter,
            {}
        ).toMutation(s._key, zo.exists(!1)),
    ]).then(() => s);
}
function Cg(t, ...e) {
    var n, s, r;
    t = I(t);
    let i = { includeMetadataChanges: !1 },
        o = 0;
    "object" != typeof e[o] || Pf(e[o]) || ((i = e[o]), o++);
    const a = { includeMetadataChanges: i.includeMetadataChanges };
    if (Pf(e[o])) {
        const t = e[o];
        (e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t)),
            (e[o + 1] =
                null === (s = t.error) || void 0 === s ? void 0 : s.bind(t)),
            (e[o + 2] =
                null === (r = t.complete) || void 0 === r ? void 0 : r.bind(t));
    }
    let u, c, h;
    if (t instanceof af)
        (c = tf(t.firestore, Uf)),
            (h = mo(t._key.path)),
            (u = {
                next: (n) => {
                    e[o] && e[o](Rg(c, t, n));
                },
                error: e[o + 1],
                complete: e[o + 2],
            });
    else {
        const n = tf(t, uf);
        (c = tf(n.firestore, Uf)), (h = n._query);
        const s = new vg(c);
        (u = {
            next: (t) => {
                e[o] && e[o](new gg(c, s, n, t));
            },
            error: e[o + 1],
            complete: e[o + 2],
        }),
            Vm(t._query);
    }
    return (function (t, e, n, s) {
        const r = new pf(s),
            i = new od(e, r, n);
        return (
            t.asyncQueue.enqueueAndForget(async () => ed(await Lf(t), i)),
            () => {
                r.bc(),
                    t.asyncQueue.enqueueAndForget(async () =>
                        nd(await Lf(t), i)
                    );
            }
        );
    })(jf(c), h, a, u);
}
function Ng(t, e) {
    return (function (t, e) {
        const n = new pf(e);
        return (
            t.asyncQueue.enqueueAndForget(async () =>
                (function (t, e) {
                    Us(t).Ru.add(e), e.next();
                })(await Lf(t), n)
            ),
            () => {
                n.bc(),
                    t.asyncQueue.enqueueAndForget(async () =>
                        (function (t, e) {
                            Us(t).Ru.delete(e);
                        })(await Lf(t), n)
                    );
            }
        );
    })(jf((t = tf(t, Uf))), Pf(e) ? e : { next: e });
}
function kg(t, e) {
    return (function (t, e) {
        const n = new js();
        return (
            t.asyncQueue.enqueueAndForget(async () =>
                (async function (t, e, n) {
                    const s = jd(t);
                    try {
                        const t = await (function (t, e) {
                            const n = Us(t),
                                s = ir.now(),
                                r = e.reduce((t, e) => t.add(e.key), Sa());
                            let i, o;
                            return n.persistence
                                .runTransaction(
                                    "Locally write mutations",
                                    "readwrite",
                                    (t) => {
                                        let a = ga(),
                                            u = Sa();
                                        return n.Gi.getEntries(t, r)
                                            .next((t) => {
                                                (a = t),
                                                    a.forEach((t, e) => {
                                                        e.isValidDocument() ||
                                                            (u = u.add(t));
                                                    });
                                            })
                                            .next(() =>
                                                n.localDocuments.getOverlayedDocuments(
                                                    t,
                                                    a
                                                )
                                            )
                                            .next((r) => {
                                                i = r;
                                                const o = [];
                                                for (const t of e) {
                                                    const e = Zo(
                                                        t,
                                                        i.get(t.key)
                                                            .overlayedDocument
                                                    );
                                                    null != e &&
                                                        o.push(
                                                            new na(
                                                                t.key,
                                                                e,
                                                                eo(
                                                                    e.value
                                                                        .mapValue
                                                                ),
                                                                zo.exists(!0)
                                                            )
                                                        );
                                                }
                                                return n.mutationQueue.addMutationBatch(
                                                    t,
                                                    s,
                                                    o,
                                                    e
                                                );
                                            })
                                            .next((e) => {
                                                o = e;
                                                const s =
                                                    e.applyToLocalDocumentSet(
                                                        i,
                                                        u
                                                    );
                                                return n.documentOverlayCache.saveOverlays(
                                                    t,
                                                    e.batchId,
                                                    s
                                                );
                                            });
                                    }
                                )
                                .then(() => ({
                                    batchId: o.batchId,
                                    changes: wa(i),
                                }));
                        })(s.localStore, e);
                        s.sharedClientState.addPendingMutation(t.batchId),
                            (function (t, e, n) {
                                let s = t.hc[t.currentUser.toKey()];
                                s || (s = new zi(nr)),
                                    (s = s.insert(e, n)),
                                    (t.hc[t.currentUser.toKey()] = s);
                            })(s, t.batchId, n),
                            await Rd(s, t.changes),
                            await Fl(s.remoteStore);
                    } catch (t) {
                        const e = Wl(t, "Failed to persist write");
                        n.reject(e);
                    }
                })(await kf(t), e, n)
            ),
            n.promise
        );
    })(jf(t), e);
}
function Rg(t, e, n) {
    const s = n.docs.get(e._key),
        r = new vg(t);
    return new fg(
        t,
        r,
        e._key,
        s,
        new dg(n.hasPendingWrites, n.fromCache),
        e.converter
    );
}
function Lg(t, e) {
    return mf(t.query, e.query) && w(t.data(), e.data());
}
function Mg(t) {
    const e = tf(t.firestore, Uf);
    return (function (t, e, n) {
        const s = new js();
        return (
            t.asyncQueue.enqueueAndForget(async () => {
                try {
                    if (Al(await Nf(t))) {
                        const r = await Rf(t),
                            i = new If(e, r, n).run();
                        s.resolve(i);
                    } else
                        s.reject(
                            new Ks(
                                Gs.UNAVAILABLE,
                                "Failed to get count result because the client is offline."
                            )
                        );
                } catch (t) {
                    s.reject(t);
                }
            }),
            s.promise
        );
    })(jf(e), t, new vg(e));
}
const Fg = { maxAttempts: 5 };
class Og {
    constructor(t, e) {
        (this._firestore = t),
            (this._commitHandler = e),
            (this._mutations = []),
            (this._committed = !1),
            (this._dataReader = mm(t));
    }
    set(t, e, n) {
        this._verifyNotCommitted();
        const s = Vg(t, this._firestore),
            r = hg(s.converter, e, n),
            i = gm(
                this._dataReader,
                "WriteBatch.set",
                s._key,
                r,
                null !== s.converter,
                n
            );
        return this._mutations.push(i.toMutation(s._key, zo.none())), this;
    }
    update(t, e, n, ...s) {
        this._verifyNotCommitted();
        const r = Vg(t, this._firestore);
        let i;
        return (
            (i =
                "string" == typeof (e = I(e)) || e instanceof rm
                    ? Tm(this._dataReader, "WriteBatch.update", r._key, e, n, s)
                    : Em(this._dataReader, "WriteBatch.update", r._key, e)),
            this._mutations.push(i.toMutation(r._key, zo.exists(!0))),
            this
        );
    }
    delete(t) {
        this._verifyNotCommitted();
        const e = Vg(t, this._firestore);
        return (
            (this._mutations = this._mutations.concat(
                new oa(e._key, zo.none())
            )),
            this
        );
    }
    commit() {
        return (
            this._verifyNotCommitted(),
            (this._committed = !0),
            this._mutations.length > 0
                ? this._commitHandler(this._mutations)
                : Promise.resolve()
        );
    }
    _verifyNotCommitted() {
        if (this._committed)
            throw new Ks(
                Gs.FAILED_PRECONDITION,
                "A write batch can no longer be used after commit() has been called."
            );
    }
}
function Vg(t, e) {
    if ((t = I(t)).firestore !== e)
        throw new Ks(
            Gs.INVALID_ARGUMENT,
            "Provided document reference is from a different Firestore instance."
        );
    return t;
}
class Pg extends class {
    constructor(t, e) {
        (this._firestore = t),
            (this._transaction = e),
            (this._dataReader = mm(t));
    }
    get(t) {
        const e = Vg(t, this._firestore),
            n = new lg(this._firestore);
        return this._transaction.lookup([e._key]).then((t) => {
            if (!t || 1 !== t.length) return Ps();
            const s = t[0];
            if (s.isFoundDocument())
                return new Mm(this._firestore, n, s.key, s, e.converter);
            if (s.isNoDocument())
                return new Mm(this._firestore, n, e._key, null, e.converter);
            throw Ps();
        });
    }
    set(t, e, n) {
        const s = Vg(t, this._firestore),
            r = hg(s.converter, e, n),
            i = gm(
                this._dataReader,
                "Transaction.set",
                s._key,
                r,
                null !== s.converter,
                n
            );
        return this._transaction.set(s._key, i), this;
    }
    update(t, e, n, ...s) {
        const r = Vg(t, this._firestore);
        let i;
        return (
            (i =
                "string" == typeof (e = I(e)) || e instanceof rm
                    ? Tm(
                          this._dataReader,
                          "Transaction.update",
                          r._key,
                          e,
                          n,
                          s
                      )
                    : Em(this._dataReader, "Transaction.update", r._key, e)),
            this._transaction.update(r._key, i),
            this
        );
    }
    delete(t) {
        const e = Vg(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }
} {
    constructor(t, e) {
        super(t, e), (this._firestore = t);
    }
    get(t) {
        const e = Vg(t, this._firestore),
            n = new vg(this._firestore);
        return super
            .get(t)
            .then(
                (t) =>
                    new fg(
                        this._firestore,
                        n,
                        e._key,
                        t._document,
                        new dg(!1, !1),
                        e.converter
                    )
            );
    }
}
function qg(t, e, n) {
    t = tf(t, Uf);
    const s = Object.assign(Object.assign({}, Fg), n);
    return (
        (function (t) {
            if (t.maxAttempts < 1)
                throw new Ks(
                    Gs.INVALID_ARGUMENT,
                    "Max attempts must be at least 1"
                );
        })(s),
        (function (t, e, n) {
            const s = new js();
            return (
                t.asyncQueue.enqueueAndForget(async () => {
                    const r = await Rf(t);
                    new Ef(t.asyncQueue, r, n, e, s).run();
                }),
                s.promise
            );
        })(jf(t), (n) => e(new Pg(t, n)), s)
    );
}
function Bg() {
    return new pm("deleteField");
}
function Ug() {
    return new wm("serverTimestamp");
}
function Gg(...t) {
    return new vm("arrayUnion", t);
}
function Kg(...t) {
    return new Im("arrayRemove", t);
}
function jg(t) {
    return new bm("increment", t);
}
function $g(t) {
    return jf((t = tf(t, Uf))), new Og(t, (e) => kg(t, e));
}
function Qg(t, e) {
    var n;
    const s = jf((t = tf(t, Uf)));
    if (
        !(null === (n = s.offlineComponents) || void 0 === n
            ? void 0
            : n.indexBackfillerScheduler)
    )
        return (
            Os("Cannot enable indexes when persistence is disabled"),
            Promise.resolve()
        );
    const r = (function (t) {
        const e =
                "string" == typeof t
                    ? (function (t) {
                          try {
                              return JSON.parse(t);
                          } catch (t) {
                              throw new Ks(
                                  Gs.INVALID_ARGUMENT,
                                  "Failed to parse JSON: " +
                                      (null == t ? void 0 : t.message)
                              );
                          }
                      })(t)
                    : t,
            n = [];
        if (Array.isArray(e.indexes))
            for (const t of e.indexes) {
                const e = zg(t, "collectionGroup"),
                    s = [];
                if (Array.isArray(t.fields))
                    for (const e of t.fields) {
                        const t = km(
                            "setIndexConfiguration",
                            zg(e, "fieldPath")
                        );
                        "CONTAINS" === e.arrayConfig
                            ? s.push(new pr(t, 2))
                            : "ASCENDING" === e.order
                            ? s.push(new pr(t, 0))
                            : "DESCENDING" === e.order && s.push(new pr(t, 1));
                    }
                n.push(new dr(dr.UNKNOWN_ID, e, s, wr.empty()));
            }
        return n;
    })(e);
    return Cf(s).then((t) =>
        (async function (t, e) {
            const n = Us(t),
                s = n.indexManager,
                r = [];
            return n.persistence.runTransaction(
                "Configure indexes",
                "readwrite",
                (t) =>
                    s
                        .getFieldIndexes(t)
                        .next((n) =>
                            (function (t, e, n, s, r) {
                                (t = [...t]),
                                    (e = [...e]),
                                    t.sort(n),
                                    e.sort(n);
                                const i = t.length,
                                    o = e.length;
                                let a = 0,
                                    u = 0;
                                for (; a < o && u < i; ) {
                                    const i = n(t[u], e[a]);
                                    i < 0
                                        ? r(t[u++])
                                        : i > 0
                                        ? s(e[a++])
                                        : (a++, u++);
                                }
                                for (; a < o; ) s(e[a++]);
                                for (; u < i; ) r(t[u++]);
                            })(
                                n,
                                e,
                                gr,
                                (e) => {
                                    r.push(s.addFieldIndex(t, e));
                                },
                                (e) => {
                                    r.push(s.deleteFieldIndex(t, e));
                                }
                            )
                        )
                        .next(() => xr.waitFor(r))
            );
        })(t, r)
    );
}
function zg(t, e) {
    if ("string" != typeof t[e])
        throw new Ks(Gs.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e];
}
!(function (n, s = !0) {
    (Ns = i),
        t(
            new b(
                "firestore",
                (t, { instanceIdentifier: e, options: n }) => {
                    const r = t.getProvider("app").getImmediate(),
                        i = new Uf(
                            new Hs(t.getProvider("auth-internal")),
                            new Js(t.getProvider("app-check-internal")),
                            (function (t, e) {
                                if (
                                    !Object.prototype.hasOwnProperty.apply(
                                        t.options,
                                        ["projectId"]
                                    )
                                )
                                    throw new Ks(
                                        Gs.INVALID_ARGUMENT,
                                        '"projectId" not provided in firebase.initializeApp.'
                                    );
                                return new Br(t.options.projectId, e);
                            })(r, e),
                            r
                        );
                    return (
                        (n = Object.assign({ useFetchStreams: s }, n)),
                        i._setSettings(n),
                        i
                    );
                },
                "PUBLIC"
            ).setMultipleInstances(!0)
        ),
        e(As, "3.8.3", n),
        e(As, "3.8.3", "esm2017");
})();
export {
    cg as AbstractUserDataWriter,
    wf as AggregateField,
    vf as AggregateQuerySnapshot,
    sm as Bytes,
    Bf as CACHE_SIZE_UNLIMITED,
    cf as CollectionReference,
    af as DocumentReference,
    fg as DocumentSnapshot,
    rm as FieldPath,
    om as FieldValue,
    Uf as Firestore,
    Ks as FirestoreError,
    am as GeoPoint,
    qf as LoadBundleTask,
    uf as Query,
    Km as QueryCompositeFilterConstraint,
    qm as QueryConstraint,
    mg as QueryDocumentSnapshot,
    tg as QueryEndAtConstraint,
    Um as QueryFieldFilterConstraint,
    Hm as QueryLimitConstraint,
    Qm as QueryOrderByConstraint,
    gg as QuerySnapshot,
    Xm as QueryStartAtConstraint,
    dg as SnapshotMetadata,
    ir as Timestamp,
    Pg as Transaction,
    Og as WriteBatch,
    Br as _DatabaseId,
    lr as _DocumentKey,
    Zs as _EmptyAppCheckTokenProvider,
    Qs as _EmptyAuthCredentialsProvider,
    hr as _FieldPath,
    tf as _cast,
    Bs as _debugAssert,
    zr as _isBase64Available,
    Os as _logWarn,
    Yd as _validateIsNotUsedTogether,
    Ag as addDoc,
    Lg as aggregateQuerySnapshotEqual,
    $m as and,
    Kg as arrayRemove,
    Gg as arrayUnion,
    Wf as clearIndexedDbPersistence,
    hf as collection,
    lf as collectionGroup,
    of as connectFirestoreEmulator,
    Dg as deleteDoc,
    Bg as deleteField,
    Jf as disableNetwork,
    df as doc,
    im as documentId,
    Qf as enableIndexedDbPersistence,
    zf as enableMultiTabIndexedDbPersistence,
    Xf as enableNetwork,
    ng as endAt,
    eg as endBefore,
    jf as ensureFirestoreConfigured,
    kg as executeWrite,
    Mg as getCountFromServer,
    wg as getDoc,
    Ig as getDocFromCache,
    bg as getDocFromServer,
    Eg as getDocs,
    Tg as getDocsFromCache,
    Sg as getDocsFromServer,
    Kf as getFirestore,
    jg as increment,
    Gf as initializeFirestore,
    Wm as limit,
    Ym as limitToLast,
    tm as loadBundle,
    em as namedQuery,
    Cg as onSnapshot,
    Ng as onSnapshotsInSync,
    jm as or,
    zm as orderBy,
    Bm as query,
    mf as queryEqual,
    ff as refEqual,
    qg as runTransaction,
    Ug as serverTimestamp,
    _g as setDoc,
    Qg as setIndexConfiguration,
    Ls as setLogLevel,
    yg as snapshotEqual,
    Zm as startAfter,
    Jm as startAt,
    Zf as terminate,
    xg as updateDoc,
    Yf as waitForPendingWrites,
    Gm as where,
    $g as writeBatch,
};

//# sourceMappingURL=firebase-firestore.js.map
