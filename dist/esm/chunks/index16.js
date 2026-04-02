import { c as l } from "./dom.js";
const o = "span", r = "span";
function i(n) {
  if (!n) return;
  const { aria: e, ...a } = n;
  if (!e) return a;
  const t = {};
  return typeof e.label == "string" && (t.label = e.label), typeof e.labelledby == "string" && (t.labelledby = e.labelledby), typeof e.hidden == "boolean" && (t.hidden = e.hidden), Object.keys(t).length > 0 ? { ...a, aria: t } : a;
}
function s(n, e) {
  return l(o, i(e), n);
}
function c(n = document) {
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SPAN_SELECTOR: r,
  SPAN_TAG: o,
  createSpan: s,
  enhanceSpans: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as S,
  o as a,
  s as c,
  c as e,
  d as i
};
//# sourceMappingURL=index16.js.map
