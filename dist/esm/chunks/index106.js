import { c as r } from "./dom.js";
const a = "footer", l = "footer";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function s(t, e) {
  return r(a, i(e), t);
}
function c(t = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FOOTER_SELECTOR: l,
  FOOTER_TAG: a,
  createFooter: s,
  enhanceFooters: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as F,
  a,
  s as c,
  c as e,
  b as i
};
//# sourceMappingURL=index106.js.map
