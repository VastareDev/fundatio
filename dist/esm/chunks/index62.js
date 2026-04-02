import { c as s } from "./dom.js";
const r = "q", c = "q";
function f(t, e, n) {
  typeof t[e] > "u" && (t[e] = n);
}
function d(t) {
  if (!t) return;
  const { aria: e, cite: n, ...l } = t, o = { ...l };
  if (typeof n == "string" && n.length > 0) {
    const i = { ...o.attrs ?? {} };
    f(i, "cite", n), o.attrs = i;
  }
  if (!e) return o;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...o, aria: a } : o;
}
function b(t, e) {
  return s(r, d(e), t);
}
function p(t = document) {
}
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Q_SELECTOR: c,
  Q_TAG: r,
  createQ: b,
  enhanceQs: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as Q,
  r as a,
  b as c,
  p as e,
  h as i
};
//# sourceMappingURL=index62.js.map
