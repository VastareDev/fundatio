import { c as d } from "./dom.js";
const p = "th", h = "th";
function s(t, e, r) {
  Object.prototype.hasOwnProperty.call(t, e) || (t[e] = r);
}
function y(t) {
  if (!t) return;
  const { aria: e, abbr: r, colspan: i, rowspan: a, headers: l, scope: c, ...f } = t, b = e ? (() => {
    const o = {};
    return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? o : void 0;
  })() : void 0, n = { ...f.attrs ?? {} };
  typeof r == "string" && r.length > 0 && s(n, "abbr", r), typeof l == "string" && l.length > 0 && s(n, "headers", l), typeof c == "string" && c.length > 0 && s(n, "scope", c), typeof i == "number" && Number.isFinite(i) && i > 0 && s(n, "colspan", Math.trunc(i)), typeof a == "number" && Number.isFinite(a) && a > 0 && s(n, "rowspan", Math.trunc(a));
  const u = Object.keys(n).length > 0;
  return {
    ...f,
    ...b ? { aria: b } : null,
    ...u ? { attrs: n } : null
  };
}
function g(t, e) {
  return d(p, y(e), t);
}
function m(t = document) {
}
const O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TH_SELECTOR: h,
  TH_TAG: p,
  createTh: g,
  enhanceThs: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as T,
  p as a,
  g as c,
  m as e,
  O as i
};
//# sourceMappingURL=index35.js.map
