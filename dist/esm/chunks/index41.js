import { c as l } from "./dom.js";
const a = "h4", r = "h4";
function i(t) {
  if (!t) return;
  const { aria: e, ...o } = t;
  if (!e) return o;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...o, aria: n } : o;
}
function c(t, e) {
  return l(a, i(e), t);
}
function s(t = document) {
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  H4_SELECTOR: r,
  H4_TAG: a,
  createH4: c,
  enhanceH4s: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as H,
  a,
  c,
  s as e,
  d as i
};
//# sourceMappingURL=index41.js.map
