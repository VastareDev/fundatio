import { a as r } from "./dom.js";
const o = "hr", l = "hr";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function s(t) {
  return r(o, i(t));
}
function d(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HR_SELECTOR: l,
  HR_TAG: o,
  createHr: s,
  enhanceHrs: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as H,
  o as a,
  s as c,
  d as e,
  f as i
};
//# sourceMappingURL=index45.js.map
