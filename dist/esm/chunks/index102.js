import { a as u } from "./dom.js";
const d = "source", b = "source";
function h(r) {
  if (!r) return;
  const { aria: e, src: n, srcSet: a, sizes: s, media: l, type: f, ...y } = r, p = typeof n == "string" && n.trim().length > 0, c = typeof a == "string" && a.trim().length > 0;
  if (!p && !c)
    throw new Error('source requires at least one of "src" or "srcSet".');
  if (typeof s == "string" && s.trim().length > 0 && !c)
    throw new Error('source "sizes" may only be specified when "srcSet" is provided.');
  const o = { ...y }, t = { ...o.attrs ?? {} };
  if (p && (t.src = n), c && (t.srcset = a), typeof s == "string" && s.trim().length > 0 && (t.sizes = s), typeof l == "string" && (t.media = l), typeof f == "string" && (t.type = f), Object.keys(t).length > 0 && (o.attrs = t), !e) return o;
  const i = {};
  return typeof e.label == "string" && (i.label = e.label), typeof e.labelledby == "string" && (i.labelledby = e.labelledby), typeof e.hidden == "boolean" && (i.hidden = e.hidden), Object.keys(i).length > 0 ? { ...o, aria: i } : o;
}
function g(r) {
  return u(d, h(r));
}
function m(r = document) {
}
const O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SOURCE_SELECTOR: b,
  SOURCE_TAG: d,
  createSource: g,
  enhanceSources: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as S,
  d as a,
  g as c,
  m as e,
  O as i
};
//# sourceMappingURL=index102.js.map
