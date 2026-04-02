import { c as r } from "./dom.js";
const o = "ruby", l = "ruby";
function i(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function b(t, e) {
  return r(o, i(e), t);
}
function s(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RUBY_SELECTOR: l,
  RUBY_TAG: o,
  createRuby: b,
  enhanceRubies: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as R,
  o as a,
  b as c,
  s as e,
  u as i
};
//# sourceMappingURL=index66.js.map
