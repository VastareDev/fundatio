import { c as i } from "./dom.js";
const o = "label", s = "label";
function b(t) {
  if (!t) return;
  const { aria: e, htmlFor: l, ...r } = t, a = { ...r };
  if (typeof l == "string" && l.length > 0 && (a.attrs = {
    ...a.attrs ?? {},
    for: l
  }), !e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function c(t, e) {
  return i(o, b(e), t);
}
function d(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LABEL_SELECTOR: s,
  LABEL_TAG: o,
  createLabel: c,
  enhanceLabels: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  s as L,
  o as a,
  c,
  d as e,
  u as i
};
//# sourceMappingURL=index87.js.map
