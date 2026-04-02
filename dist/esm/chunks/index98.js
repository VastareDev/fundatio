import { c as r } from "./dom.js";
const o = "summary", l = "summary";
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
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUMMARY_SELECTOR: l,
  SUMMARY_TAG: o,
  createSummary: s,
  enhanceSummaries: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as S,
  o as a,
  s as c,
  c as e,
  u as i
};
//# sourceMappingURL=index98.js.map
