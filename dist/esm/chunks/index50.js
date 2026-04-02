import { c as r } from "./dom.js";
const o = "abbr", l = "abbr";
function b(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function i(t, e) {
  return r(o, b(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ABBR_SELECTOR: l,
  ABBR_TAG: o,
  createAbbr: i,
  enhanceAbbrs: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as A,
  o as a,
  i as c,
  s as e,
  f as i
};
//# sourceMappingURL=index50.js.map
