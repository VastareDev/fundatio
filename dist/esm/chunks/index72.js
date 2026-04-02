import { c as l } from "./dom.js";
const o = "u", r = "u";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function s(t, e) {
  return l(o, i(e), t);
}
function c(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  U_SELECTOR: r,
  U_TAG: o,
  createU: s,
  enhanceUs: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as U,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index72.js.map
