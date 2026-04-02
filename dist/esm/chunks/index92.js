import { c as m } from "./dom.js";
const c = "output", O = "output";
function y(e) {
  if (!e) return;
  const { aria: t, for: f, form: d, name: u, ...s } = e, n = { ...s.attrs ?? {} }, r = (i, l) => {
    l !== void 0 && (Object.prototype.hasOwnProperty.call(n, i) || (n[i] = l));
  };
  r("for", f), r("form", d), r("name", u);
  const o = {};
  t && (typeof t.label == "string" && (o.label = t.label), typeof t.labelledby == "string" && (o.labelledby = t.labelledby), typeof t.hidden == "boolean" && (o.hidden = t.hidden));
  const p = Object.keys(n).length > 0, b = Object.keys(o).length > 0, a = { ...s };
  return p && (a.attrs = n), b && (a.aria = o), a;
}
function h(e, t) {
  return m(c, y(t), e);
}
function g(e = document) {
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OUTPUT_SELECTOR: O,
  OUTPUT_TAG: c,
  createOutput: h,
  enhanceOutputs: g
}, Symbol.toStringTag, { value: "Module" }));
export {
  O,
  c as a,
  h as c,
  g as e,
  A as i
};
//# sourceMappingURL=index92.js.map
