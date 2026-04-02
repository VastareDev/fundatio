import { a as r } from "./dom.js";
const o = "wbr", l = "wbr";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function b(t) {
  return r(o, i(t));
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WBR_SELECTOR: l,
  WBR_TAG: o,
  createWbr: b,
  enhanceWbrs: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as W,
  o as a,
  b as c,
  s as e,
  f as i
};
//# sourceMappingURL=index18.js.map
