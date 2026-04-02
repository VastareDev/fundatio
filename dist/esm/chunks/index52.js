import { c as o } from "./dom.js";
const n = "small", r = "small";
function i(t) {
  if (!t) return;
  const { aria: e, ...l } = t;
  if (!e) return l;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...l, aria: a } : l;
}
function s(t, e) {
  return o(n, i(e), t);
}
function c(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SMALL_SELECTOR: r,
  SMALL_TAG: n,
  createSmall: s,
  enhanceSmalls: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as S,
  n as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index52.js.map
