import { c as l } from "./dom.js";
const a = "tfoot", r = "tfoot";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function s(t) {
  return l(a, i(t));
}
function c(t = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TFOOT_SELECTOR: r,
  TFOOT_TAG: a,
  createTfoot: s,
  enhanceTfoots: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as T,
  a,
  s as c,
  c as e,
  b as i
};
//# sourceMappingURL=index33.js.map
