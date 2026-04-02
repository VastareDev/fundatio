import { c } from "./dom.js";
const a = "ul", f = "ul";
function d(t) {
  if (!t) return;
  const { aria: e, type: l, attrs: i, ...s } = t, o = { ...s };
  if (e) {
    const n = {};
    typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 && (o.aria = n);
  }
  const r = { ...i ?? {} };
  return typeof l == "string" && l.length > 0 && (r.type = l), Object.keys(r).length > 0 && (o.attrs = r), o;
}
function b(t, e) {
  return c(a, d(e), t);
}
function p(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  UL_SELECTOR: f,
  UL_TAG: a,
  createUl: b,
  enhanceUls: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as U,
  a,
  b as c,
  p as e,
  u as i
};
//# sourceMappingURL=index79.js.map
