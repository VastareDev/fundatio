import { c as l } from "./dom.js";
const o = "sub", r = "sub";
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
function b(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SUB_SELECTOR: r,
  SUB_TAG: o,
  createSub: s,
  enhanceSubs: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as S,
  o as a,
  s as c,
  b as e,
  u as i
};
//# sourceMappingURL=index69.js.map
