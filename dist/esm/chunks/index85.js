import { c as _ } from "./dom.js";
const s = "form", j = "form";
function F(o) {
  if (!o) return;
  const {
    aria: e,
    action: d,
    method: f,
    enctype: p,
    acceptCharset: b,
    autocomplete: m,
    name: u,
    noValidate: h,
    target: y,
    rel: g,
    ...c
  } = o, n = { ...c.attrs ?? {} }, t = (i, l) => {
    l !== void 0 && (Object.prototype.hasOwnProperty.call(n, i) || (n[i] = l));
  };
  t("action", d), t("method", f), t("enctype", p), t("accept-charset", b), t("autocomplete", m), t("name", u), t("target", y), t("rel", g), h === !0 && t("novalidate", "");
  const a = {};
  e && (typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden));
  const O = Object.keys(a).length > 0, A = Object.keys(n).length > 0, r = { ...c };
  return A && (r.attrs = n), O && (r.aria = a), r;
}
function M(o, e) {
  return _(s, F(e), o);
}
function v(o = document) {
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FORM_SELECTOR: j,
  FORM_TAG: s,
  createForm: M,
  enhanceForms: v
}, Symbol.toStringTag, { value: "Module" }));
export {
  j as F,
  s as a,
  M as c,
  v as e,
  E as i
};
//# sourceMappingURL=index85.js.map
