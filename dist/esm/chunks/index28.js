import { c as o } from "./dom.js";
const l = "table", r = "table";
function i(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function b(t, e) {
  return o(l, i(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TABLE_SELECTOR: r,
  TABLE_TAG: l,
  createTable: b,
  enhanceTables: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as T,
  l as a,
  b as c,
  s as e,
  f as i
};
//# sourceMappingURL=index28.js.map
