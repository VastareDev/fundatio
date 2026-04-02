import { c as i } from "./dom.js";
const o = "main", l = "main";
function r(n) {
  if (!n) return;
  const { aria: e, ...a } = n;
  if (!e) return a;
  const t = {};
  return typeof e.label == "string" && (t.label = e.label), typeof e.labelledby == "string" && (t.labelledby = e.labelledby), typeof e.hidden == "boolean" && (t.hidden = e.hidden), Object.keys(t).length > 0 ? { ...a, aria: t } : a;
}
function s(n, e) {
  return i(o, r(e), n);
}
function c(n = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAIN_SELECTOR: l,
  MAIN_TAG: o,
  createMain: s,
  enhanceMains: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as M,
  o as a,
  s as c,
  c as e,
  f as i
};
//# sourceMappingURL=index108.js.map
