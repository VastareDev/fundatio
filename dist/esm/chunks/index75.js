import { c as o } from "./dom.js";
const l = "dl", r = "dl";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function d(t, e) {
  return o(l, i(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DL_SELECTOR: r,
  DL_TAG: l,
  createDl: d,
  enhanceDls: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as D,
  l as a,
  d as c,
  s as e,
  f as i
};
//# sourceMappingURL=index75.js.map
