import { c as l } from "./dom.js";
const o = "dd", r = "dd";
function d(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function i(t, e) {
  return l(o, d(e), t);
}
function s(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DD_SELECTOR: r,
  DD_TAG: o,
  createDd: i,
  enhanceDds: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as D,
  o as a,
  i as c,
  s as e,
  f as i
};
//# sourceMappingURL=index74.js.map
