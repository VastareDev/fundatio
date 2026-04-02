import { c as l } from "./dom.js";
const o = "thead", r = "thead";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function d(t) {
  return l(o, i(t));
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  THEAD_SELECTOR: r,
  THEAD_TAG: o,
  createThead: d,
  enhanceTheads: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as T,
  o as a,
  d as c,
  s as e,
  f as i
};
//# sourceMappingURL=index31.js.map
