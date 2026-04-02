import { c as i } from "./dom.js";
const a = "section", l = "section";
function r(t) {
  if (!t) return;
  const { aria: e, ...o } = t;
  if (!e) return o;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...o, aria: n } : o;
}
function c(t, e) {
  return i(a, r(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SECTION_SELECTOR: l,
  SECTION_TAG: a,
  createSection: c,
  enhanceSections: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as S,
  a,
  c,
  s as e,
  f as i
};
//# sourceMappingURL=index110.js.map
