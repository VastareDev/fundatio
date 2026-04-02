import { c as m } from "./dom.js";
const d = "map", b = "map";
function u(e) {
  const t = String(e).trim();
  if (t.length === 0)
    throw new Error('Map "name" must be a non-empty string.');
  if (/\s/.test(t))
    throw new Error('Map "name" must not contain whitespace.');
}
function y(e) {
  const a = e ?? {}, { aria: t, name: o, ...n } = a, i = { ...n.attrs ?? {} }, f = (l, p) => {
    p !== void 0 && (Object.prototype.hasOwnProperty.call(i, l) || (i[l] = p));
  }, s = typeof o == "string" ? o : typeof n.id == "string" ? n.id : "map";
  if (u(s), typeof o == "string" && typeof n.id == "string" && o !== n.id)
    throw new Error('Map "id" must match "name" when both are provided.');
  f("name", s);
  const r = {};
  t && (typeof t.label == "string" && (r.label = t.label), typeof t.labelledby == "string" && (r.labelledby = t.labelledby), typeof t.hidden == "boolean" && (r.hidden = t.hidden));
  const c = { ...n, attrs: i };
  return Object.keys(r).length > 0 && (c.aria = r), c;
}
function h(e, a) {
  return m(d, y(a), e);
}
function g(e = document) {
}
const M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAP_SELECTOR: b,
  MAP_TAG: d,
  createMap: h,
  enhanceMaps: g
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as M,
  d as a,
  h as c,
  g as e,
  M as i
};
//# sourceMappingURL=index100.js.map
