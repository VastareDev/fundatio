import { c as l } from "./dom.js";
const o = "samp", r = "samp";
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
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SAMP_SELECTOR: r,
  SAMP_TAG: o,
  createSamp: s,
  enhanceSamps: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as S,
  o as a,
  s as c,
  c as e,
  b as i
};
//# sourceMappingURL=index68.js.map
