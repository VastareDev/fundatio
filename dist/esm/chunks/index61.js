import { c as r } from "./dom.js";
const o = "mark", l = "mark";
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
  MARK_SELECTOR: l,
  MARK_TAG: o,
  createMark: s,
  enhanceMarks: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as M,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index61.js.map
