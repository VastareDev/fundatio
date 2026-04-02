import { c as r } from "./dom.js";
const o = "address", s = "address";
function d(t) {
  if (!t) return;
  const { aria: e, ...n } = t;
  if (!e) return n;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...n, aria: a } : n;
}
function l(t, e) {
  return r(o, d(e), t);
}
function i(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADDRESS_SELECTOR: s,
  ADDRESS_TAG: o,
  createAddress: l,
  enhanceAddresses: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  s as A,
  o as a,
  l as c,
  i as e,
  f as i
};
//# sourceMappingURL=index48.js.map
