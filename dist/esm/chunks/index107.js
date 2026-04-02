import { c as r } from "./dom.js";
const o = "header", l = "header";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function d(t, e) {
  return r(o, i(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HEADER_SELECTOR: l,
  HEADER_TAG: o,
  createHeader: d,
  enhanceHeaders: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as H,
  o as a,
  d as c,
  s as e,
  f as i
};
//# sourceMappingURL=index107.js.map
