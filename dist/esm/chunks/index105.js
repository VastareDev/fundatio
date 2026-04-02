import { c as i } from "./dom.js";
const o = "aside", l = "aside";
function r(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function s(t, e) {
  return i(o, r(e), t);
}
function d(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ASIDE_SELECTOR: l,
  ASIDE_TAG: o,
  createAside: s,
  enhanceAsides: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as A,
  o as a,
  s as c,
  d as e,
  f as i
};
//# sourceMappingURL=index105.js.map
