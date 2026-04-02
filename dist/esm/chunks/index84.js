import { c as m } from "./dom.js";
const d = "fieldset", y = "fieldset";
function h(t) {
  if (!t) return;
  const { aria: e, disabled: c, form: f, name: b, ...a } = t, r = { ...a.attrs ?? {} }, o = (i, l) => {
    l !== void 0 && (Object.prototype.hasOwnProperty.call(r, i) || (r[i] = l));
  };
  o("form", f), o("name", b), c === !0 && o("disabled", "");
  const n = {};
  e && (typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden));
  const p = Object.keys(n).length > 0, u = Object.keys(r).length > 0, s = { ...a };
  return u && (s.attrs = r), p && (s.aria = n), s;
}
function g(t, e) {
  return m(d, h(e), t);
}
function E(t = document) {
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FIELDSET_SELECTOR: y,
  FIELDSET_TAG: d,
  createFieldset: g,
  enhanceFieldsets: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  y as F,
  d as a,
  g as c,
  E as e,
  A as i
};
//# sourceMappingURL=index84.js.map
