import { a as c } from "./dom.js";
const l = "col", f = "col";
function b(t) {
  if (!t) return;
  const { aria: e, span: r, attrs: i, ...s } = t, a = { ...s };
  if (e) {
    const o = {};
    typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 && (a.aria = o);
  }
  const n = { ...i ?? {} };
  if (typeof r == "number" && !Object.prototype.hasOwnProperty.call(n, "span")) {
    if (!Number.isInteger(r) || r <= 0)
      throw new Error('Invalid "span" for <col>: expected a positive integer greater than zero.');
    n.span = r;
  }
  return Object.keys(n).length > 0 && (a.attrs = n), a;
}
function d(t) {
  return c(l, b(t));
}
function p(t = document) {
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  COL_SELECTOR: f,
  COL_TAG: l,
  createCol: d,
  enhanceCols: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as C,
  l as a,
  d as c,
  p as e,
  y as i
};
//# sourceMappingURL=index30.js.map
