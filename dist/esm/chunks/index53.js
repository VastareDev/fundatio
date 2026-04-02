import { c as r } from "./dom.js";
const a = "strong", l = "strong";
function i(t) {
  if (!t) return;
  const { aria: e, ...o } = t;
  if (!e) return o;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...o, aria: n } : o;
}
function s(t, e) {
  return r(a, i(e), t);
}
function c(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  STRONG_SELECTOR: l,
  STRONG_TAG: a,
  createStrong: s,
  enhanceStrongs: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as S,
  a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index53.js.map
