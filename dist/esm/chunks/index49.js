import { c as h } from "./dom.js";
const d = "a", u = "a";
function A(r) {
  if (!r) return;
  const { aria: t, href: f, target: a, rel: s, download: l, hreflang: p, ping: i, referrerPolicy: y, type: c, ...g } = r, n = g, e = { ...n.attrs ?? {} };
  typeof f == "string" && (e.href = f), typeof a == "string" && (e.target = a), typeof p == "string" && (e.hreflang = p), typeof y == "string" && (e.referrerpolicy = y), typeof c == "string" && (e.type = c), typeof i == "string" && (e.ping = i), Array.isArray(i) && (e.ping = i.join(" ")), typeof l == "string" && (e.download = l), l === !0 && (e.download = "");
  const b = typeof e.rel == "string" && e.rel.trim().length > 0 ? e.rel : void 0;
  if (typeof s == "string" ? e.rel = s : a === "_blank" && !b && (e.rel = "noopener noreferrer"), Object.keys(e).length > 0 && (n.attrs = e), !t) return n;
  const o = {};
  return typeof t.label == "string" && (o.label = t.label), typeof t.labelledby == "string" && (o.labelledby = t.labelledby), typeof t.hidden == "boolean" && (o.hidden = t.hidden), Object.keys(o).length > 0 ? { ...n, aria: o } : n;
}
function m(r, t) {
  return h(d, A(t), r);
}
function _(r = document) {
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  A_SELECTOR: u,
  A_TAG: d,
  createA: m,
  enhanceAs: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as A,
  d as a,
  m as c,
  _ as e,
  w as i
};
//# sourceMappingURL=index49.js.map
