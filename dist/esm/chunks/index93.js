import { c as y } from "./dom.js";
const d = "progress", m = "progress";
function g(t) {
  if (!t) return;
  const { aria: e, value: l, max: o, ...i } = t, n = { ...i.attrs ?? {} }, s = (f, b) => {
    b !== void 0 && (Object.prototype.hasOwnProperty.call(n, f) || (n[f] = b));
  }, c = typeof l == "number";
  c && s("value", l), c ? s("max", typeof o == "number" ? o : 1) : s("max", typeof o == "number" ? o : void 0);
  const r = {};
  e && (typeof e.label == "string" && (r.label = e.label), typeof e.labelledby == "string" && (r.labelledby = e.labelledby), typeof e.hidden == "boolean" && (r.hidden = e.hidden));
  const p = Object.keys(n).length > 0, u = Object.keys(r).length > 0, a = { ...i };
  return p && (a.attrs = n), u && (a.aria = r), a;
}
function h(t, e) {
  return y(d, g(e), t);
}
function O(t = document) {
}
const S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PROGRESS_SELECTOR: m,
  PROGRESS_TAG: d,
  createProgress: h,
  enhanceProgresses: O
}, Symbol.toStringTag, { value: "Module" }));
export {
  m as P,
  d as a,
  h as c,
  O as e,
  S as i
};
//# sourceMappingURL=index93.js.map
