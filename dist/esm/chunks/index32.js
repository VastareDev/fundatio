import { c as l } from "./dom.js";
const a = "tbody", r = "tbody";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function d(t, e) {
  return l(a, i(e), t);
}
function b(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TBODY_SELECTOR: r,
  TBODY_TAG: a,
  createTbody: d,
  enhanceTbodies: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as T,
  a,
  d as c,
  b as e,
  f as i
};
//# sourceMappingURL=index32.js.map
