import { a as m } from "./dom.js";
const y = "img", u = "img";
function _(i) {
  const {
    aria: e,
    alt: n,
    src: s,
    srcset: a,
    sizes: o,
    width: l,
    height: c,
    loading: f,
    decoding: d,
    referrerPolicy: g,
    ...h
  } = i ?? {}, t = { ...h }, r = {};
  e && (typeof e.label == "string" && (r.label = e.label), typeof e.labelledby == "string" && (r.labelledby = e.labelledby), typeof e.hidden == "boolean" && (r.hidden = e.hidden)), Object.keys(r).length > 0 && (t.aria = r), t.attrs = {
    ...t.attrs ?? {},
    alt: typeof n == "string" ? n : ""
  };
  const b = typeof s == "string" && s.length > 0, p = typeof a == "string" && a.length > 0;
  return b && (t.attrs.src = s), p && (t.attrs.srcset = a), o && (t.attrs.sizes = o), typeof l == "number" && (t.attrs.width = l), typeof c == "number" && (t.attrs.height = c), f && (t.attrs.loading = f), d && (t.attrs.decoding = d), g && (t.attrs.referrerpolicy = g), !b && !p && (t.attrs.src = "data:,"), t;
}
function I(i) {
  return m(y, _(i));
}
function S(i = document) {
}
const O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IMG_SELECTOR: u,
  IMG_TAG: y,
  createImg: I,
  enhanceImgs: S
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as I,
  y as a,
  I as c,
  S as e,
  O as i
};
//# sourceMappingURL=index19.js.map
