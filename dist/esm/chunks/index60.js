import { c as l } from "./dom.js";
const o = "kbd", r = "kbd";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function d(t, e) {
  return l(o, i(e), t);
}
function b(t = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  KBD_SELECTOR: r,
  KBD_TAG: o,
  createKbd: d,
  enhanceKbds: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as K,
  o as a,
  d as c,
  b as e,
  f as i
};
//# sourceMappingURL=index60.js.map
