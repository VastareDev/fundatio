import { b as c } from "./dom.js";
const i = "math", b = "math";
function f(l) {
  const { aria: e, display: t, attrs: d, tabIndex: s, ...r } = l ?? {}, o = { ...r }, n = {};
  typeof (e == null ? void 0 : e.label) == "string" && (n.label = e.label), typeof (e == null ? void 0 : e.labelledby) == "string" && (n.labelledby = e.labelledby), typeof (e == null ? void 0 : e.hidden) == "boolean" ? n.hidden = e.hidden : n.hidden = !0, Object.keys(n).length > 0 && (o.aria = n), typeof s == "number" ? o.tabIndex = s : o.tabIndex = -1;
  const a = { ...d ?? {} };
  return t && (a.display = t), Object.keys(a).length > 0 && (o.attrs = a), o;
}
function p(l, e) {
  const t = document.createElement(i);
  return c(t, f(e)), typeof l == "string" && (t.textContent = l), t;
}
function y(l = document) {
}
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MATH_SELECTOR: b,
  MATH_TAG: i,
  createMath: p,
  enhanceMath: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as M,
  i as a,
  p as c,
  y as e,
  h as i
};
//# sourceMappingURL=index21.js.map
