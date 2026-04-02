import { c as f } from "./dom.js";
const d = "td", b = "td";
function h(n) {
  if (!n) return;
  const { aria: t, colspan: o, rowspan: a, headers: l, attrs: c, ...p } = n, i = { ...p };
  if (t) {
    const e = {};
    typeof t.label == "string" && (e.label = t.label), typeof t.labelledby == "string" && (e.labelledby = t.labelledby), typeof t.hidden == "boolean" && (e.hidden = t.hidden), Object.keys(e).length > 0 && (i.aria = e);
  }
  const r = { ...c ?? {} }, s = (e) => Object.prototype.hasOwnProperty.call(r, e);
  if (typeof o == "number" && !s("colspan")) {
    if (!Number.isInteger(o) || o <= 0)
      throw new Error('Invalid "colspan" for <td>: expected a positive integer greater than zero.');
    r.colspan = o;
  }
  if (typeof a == "number" && !s("rowspan")) {
    if (!Number.isInteger(a) || a <= 0)
      throw new Error('Invalid "rowspan" for <td>: expected a positive integer greater than zero.');
    r.rowspan = a;
  }
  if (typeof l == "string" && !s("headers")) {
    const e = l.trim();
    if (e.length === 0)
      throw new Error('Invalid "headers" for <td>: expected a non-empty string.');
    r.headers = e;
  }
  return Object.keys(r).length > 0 && (i.attrs = r), i;
}
function g(n, t) {
  return f(d, h(t), n);
}
function y(n = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TD_SELECTOR: b,
  TD_TAG: d,
  createTd: g,
  enhanceTds: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as T,
  d as a,
  g as c,
  y as e,
  u as i
};
//# sourceMappingURL=index36.js.map
