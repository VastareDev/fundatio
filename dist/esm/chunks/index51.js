import { c as l } from "./dom.js";
const o = "b", r = "b";
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
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  B_SELECTOR: r,
  B_TAG: o,
  createB: s,
  enhanceBs: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as B,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index51.js.map
