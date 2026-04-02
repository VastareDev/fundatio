import { c as r } from "./dom.js";
const o = "figure", i = "figure";
function l(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function s(t, e) {
  return r(o, l(e), t);
}
function c(t = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FIGURE_SELECTOR: i,
  FIGURE_TAG: o,
  createFigure: s,
  enhanceFigures: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as F,
  o as a,
  s as c,
  c as e,
  b as i
};
//# sourceMappingURL=index81.js.map
