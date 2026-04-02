import { c as r } from "./dom.js";
const o = "pre", l = "pre";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function s(t, e) {
  return r(o, i(e), t);
}
function c(t = document) {
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PRE_SELECTOR: l,
  PRE_TAG: o,
  createPre: s,
  enhancePres: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as P,
  o as a,
  s as c,
  c as e,
  p as i
};
//# sourceMappingURL=index46.js.map
