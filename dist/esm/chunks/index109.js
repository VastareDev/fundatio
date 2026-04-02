import { c as l } from "./dom.js";
const o = "nav", r = "nav";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function s(t, e) {
  return l(o, i(e), t);
}
function c(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NAV_SELECTOR: r,
  NAV_TAG: o,
  createNav: s,
  enhanceNavs: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as N,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index109.js.map
