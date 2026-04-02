import { a as A } from "./dom.js";
const g = "area", u = "area";
function m(a) {
  const {
    aria: e,
    alt: s,
    href: n,
    shape: i,
    coords: l,
    target: f,
    download: o,
    ping: d,
    rel: c,
    referrerPolicy: p,
    hreflang: y,
    type: b,
    ...h
  } = a ?? {}, t = { ...h }, r = {};
  return e && (typeof e.label == "string" && (r.label = e.label), typeof e.labelledby == "string" && (r.labelledby = e.labelledby), typeof e.hidden == "boolean" && (r.hidden = e.hidden)), Object.keys(r).length > 0 && (t.aria = r), t.attrs = { ...t.attrs ?? {} }, typeof n == "string" && n.length > 0 && (t.attrs.href = n, t.attrs.alt = typeof s == "string" ? s : ""), i && (t.attrs.shape = i), l && (t.attrs.coords = l), f && (t.attrs.target = f), typeof o == "boolean" && (t.attrs.download = o), typeof o == "string" && (t.attrs.download = o), d && (t.attrs.ping = d), c && (t.attrs.rel = c), p && (t.attrs.referrerpolicy = p), y && (t.attrs.hreflang = y), b && (t.attrs.type = b), t;
}
function _(a) {
  return A(g, m(a));
}
function E(a = document) {
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AREA_SELECTOR: u,
  AREA_TAG: g,
  createArea: _,
  enhanceAreas: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as A,
  g as a,
  _ as c,
  E as e,
  w as i
};
//# sourceMappingURL=index99.js.map
