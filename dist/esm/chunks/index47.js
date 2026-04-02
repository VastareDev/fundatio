import { c as i } from "./dom.js";
const r = "blockquote", c = "blockquote";
function s(t) {
  if (!t) return;
  const { aria: e, cite: a, ...l } = t, n = { ...l };
  if (typeof a == "string" && a.length > 0 && (n.attrs = { ...l.attrs ?? {}, cite: a }), !e) return n;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function d(t, e) {
  return i(r, s(e), t);
}
function b(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BLOCKQUOTE_SELECTOR: c,
  BLOCKQUOTE_TAG: r,
  createBlockquote: d,
  enhanceBlockquotes: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as B,
  r as a,
  d as c,
  b as e,
  u as i
};
//# sourceMappingURL=index47.js.map
