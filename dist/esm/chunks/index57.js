import { c as l } from "./dom.js";
const o = "dfn", r = "dfn";
function i(n) {
  if (!n) return;
  const { aria: e, ...a } = n;
  if (!e) return a;
  const t = {};
  return typeof e.label == "string" && (t.label = e.label), typeof e.labelledby == "string" && (t.labelledby = e.labelledby), typeof e.hidden == "boolean" && (t.hidden = e.hidden), Object.keys(t).length > 0 ? { ...a, aria: t } : a;
}
function d(n, e) {
  return l(o, i(e), n);
}
function s(n = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DFN_SELECTOR: r,
  DFN_TAG: o,
  createDfn: d,
  enhanceDfns: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as D,
  o as a,
  d as c,
  s as e,
  b as i
};
//# sourceMappingURL=index57.js.map
