import { c as x } from "./dom.js";
const c = "iframe", E = "iframe";
function F(r) {
  if (!r) return;
  const {
    aria: t,
    src: d,
    srcdoc: f,
    name: b,
    sandbox: p,
    allow: h,
    allowFullScreen: u,
    loading: y,
    referrerPolicy: m,
    width: g,
    height: A,
    fetchPriority: w,
    csp: O,
    credentialless: I,
    ...l
  } = r, n = { ...l.attrs ?? {} }, e = (i, s) => {
    s !== void 0 && (Object.prototype.hasOwnProperty.call(n, i) || (n[i] = s));
  };
  e("src", d), e("srcdoc", f), e("name", b), e("sandbox", p), e("allow", h), e("loading", y), e("referrerpolicy", m), e("width", g), e("height", A), e("fetchpriority", w), e("csp", O), u === !0 && e("allowfullscreen", ""), I === !0 && e("credentialless", "");
  const o = {};
  t && (typeof t.label == "string" && (o.label = t.label), typeof t.labelledby == "string" && (o.labelledby = t.labelledby), typeof t.hidden == "boolean" && (o.hidden = t.hidden));
  const _ = Object.keys(o).length > 0, j = Object.keys(n).length > 0, a = { ...l };
  return j && (a.attrs = n), _ && (a.aria = o), a;
}
function M(r, t) {
  return x(c, F(t), r);
}
function P(r = document) {
}
const R = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IFRAME_SELECTOR: E,
  IFRAME_TAG: c,
  createIFrame: M,
  enhanceIFrames: P
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as I,
  c as a,
  M as c,
  P as e,
  R as i
};
//# sourceMappingURL=index23.js.map
