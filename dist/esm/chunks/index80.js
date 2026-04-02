import { c as i } from "./dom.js";
const o = "figcaption", l = "figcaption";
function r(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function c(t, e) {
  return i(o, r(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FIGCAPTION_SELECTOR: l,
  FIGCAPTION_TAG: o,
  createFigcaption: c,
  enhanceFigcaptions: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as F,
  o as a,
  c,
  s as e,
  f as i
};
//# sourceMappingURL=index80.js.map
