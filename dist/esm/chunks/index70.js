import { c as l } from "./dom.js";
const o = "sup", r = "sup";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function s(t, e) {
  return l(o, i(e), t);
}
function c(t = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUP_SELECTOR: r,
  SUP_TAG: o,
  createSup: s,
  enhanceSups: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as S,
  o as a,
  s as c,
  c as e,
  b as i
};
//# sourceMappingURL=index70.js.map
