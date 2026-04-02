import { c as f } from "./dom.js";
const r = "option", p = "option";
function b(a) {
  if (!a) return;
  const { aria: e, value: i, label: l, disabled: s, selected: d, ...c } = a, n = { ...c }, t = { ...n.attrs ?? {} };
  if (typeof i == "string" && (t.value = i), typeof l == "string" && (t.label = l), s === !0 && (t.disabled = !0), d === !0 && (t.selected = !0), Object.keys(t).length > 0 && (n.attrs = t), !e) return n;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function u(a, e) {
  return f(r, b(e), a);
}
function y(a = document) {
}
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OPTION_SELECTOR: p,
  OPTION_TAG: r,
  createOption: u,
  enhanceOptions: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as O,
  r as a,
  u as c,
  y as e,
  h as i
};
//# sourceMappingURL=index91.js.map
