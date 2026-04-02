import { c as B } from "./dom.js";
const s = "button", E = "button";
function N(r) {
  const {
    aria: e,
    type: l,
    name: m,
    value: d,
    disabled: u,
    autofocus: p,
    form: b,
    formAction: y,
    formEnctype: g,
    formMethod: h,
    formNoValidate: T,
    formTarget: O,
    popoverTarget: v,
    popoverTargetAction: A,
    command: _,
    commandFor: j,
    ...f
  } = r ?? {}, n = { ...f.attrs ?? {} }, t = (c, a) => {
    a !== void 0 && (Object.prototype.hasOwnProperty.call(n, c) || (n[c] = a));
  };
  t("type", l ?? "button"), t("name", m), t("value", d), t("form", b), t("formaction", y), t("formenctype", g), t("formmethod", h), t("formtarget", O), t("popovertarget", v), t("popovertargetaction", A), t("command", _), t("commandfor", j), u === !0 && t("disabled", ""), p === !0 && t("autofocus", ""), T === !0 && t("formnovalidate", "");
  const i = { ...f, attrs: n }, o = {};
  if (e && (typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden)), Object.keys(o).length > 0 && (i.aria = o), Object.keys(n).length === 0) {
    const { attrs: c, ...a } = i;
    return a;
  }
  return i;
}
function S(r, e) {
  return B(s, N(e), r);
}
function U(r = document) {
}
const x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BUTTON_SELECTOR: E,
  BUTTON_TAG: s,
  createButton: S,
  enhanceButtons: U
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as B,
  s as a,
  S as c,
  U as e,
  x as i
};
//# sourceMappingURL=index82.js.map
