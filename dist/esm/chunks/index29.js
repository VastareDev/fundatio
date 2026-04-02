import { c } from "./dom.js";
const s = "colgroup", u = "colgroup";
function b(t, e, o) {
  Object.prototype.hasOwnProperty.call(t, e) || (t[e] = o);
}
function d(t) {
  if (!t) return;
  const { aria: e, span: o, ...l } = t, a = e ? (() => {
    const n = {};
    return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? n : void 0;
  })() : void 0, r = { ...l.attrs ?? {} };
  typeof o == "number" && Number.isFinite(o) && o > 0 && b(r, "span", Math.trunc(o));
  const i = Object.keys(r).length > 0;
  return {
    ...l,
    ...a ? { aria: a } : null,
    ...i ? { attrs: r } : null
  };
}
function p(t) {
  return c(s, d(t));
}
function f(t = document) {
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COLGROUP_SELECTOR: u,
  COLGROUP_TAG: s,
  createColgroup: p,
  enhanceColgroups: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as C,
  s as a,
  p as c,
  f as e,
  g as i
};
//# sourceMappingURL=index29.js.map
