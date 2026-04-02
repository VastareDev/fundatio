import { c as o } from "./dom.js";
const l = "datalist", i = "datalist";
function r(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function s(t, e) {
  return o(l, r(e), t);
}
function d(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DATALIST_SELECTOR: i,
  DATALIST_TAG: l,
  createDatalist: s,
  enhanceDatalists: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as D,
  l as a,
  s as c,
  d as e,
  f as i
};
//# sourceMappingURL=index83.js.map
