import { c } from "./dom.js";
const a = "li", f = "li";
function b(n) {
  if (!n) return;
  const { aria: e, type: t, attrs: r, value: p, ...s } = n, i = { ...s };
  if (e) {
    const l = {};
    typeof e.label == "string" && (l.label = e.label), typeof e.labelledby == "string" && (l.labelledby = e.labelledby), typeof e.hidden == "boolean" && (l.hidden = e.hidden), Object.keys(l).length > 0 && (i.aria = l);
  }
  const o = { ...r ?? {} };
  return typeof t == "string" && t.length > 0 && (o.type = t), Object.keys(o).length > 0 && (i.attrs = o), i;
}
function u(n, e) {
  const t = c(a, b(e), n);
  return e && typeof e.value == "number" && Number.isFinite(e.value) && (t.value = e.value), t;
}
function d(n = document) {
}
const m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LI_SELECTOR: f,
  LI_TAG: a,
  createLi: u,
  enhanceLis: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as L,
  a,
  u as c,
  d as e,
  m as i
};
//# sourceMappingURL=index77.js.map
