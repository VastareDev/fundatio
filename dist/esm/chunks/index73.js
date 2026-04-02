import { c as r } from "./dom.js";
const o = "var", l = "var";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function s(t, e) {
  return r(o, i(e), t);
}
function c(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VAR_SELECTOR: l,
  VAR_TAG: o,
  createVar: s,
  enhanceVars: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as V,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index73.js.map
