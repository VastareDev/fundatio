import { a as h } from "./dom.js";
const c = "track", A = "track";
function T(t) {
  if (!t) return;
  const { aria: e, kind: d, src: f, srclang: b, label: u, default: p, ...l } = t, n = { ...l.attrs ?? {} }, r = (s, i) => {
    i !== void 0 && (Object.prototype.hasOwnProperty.call(n, s) || (n[s] = i));
  };
  r("kind", d), r("src", f), r("srclang", b), r("label", u), p === !0 && r("default", "");
  const a = {};
  e && (typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden));
  const y = Object.keys(n).length > 0, g = Object.keys(a).length > 0, o = { ...l };
  return y && (o.attrs = n), g && (o.aria = a), o;
}
function k(t) {
  return h(c, T(t));
}
function m(t = document) {
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TRACK_SELECTOR: A,
  TRACK_TAG: c,
  createTrack: k,
  enhanceTracks: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as T,
  c as a,
  k as c,
  m as e,
  _ as i
};
//# sourceMappingURL=index103.js.map
