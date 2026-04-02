import { a as D } from "./dom.js";
const h = "input", F = "input";
function J(o) {
  const {
    aria: t,
    type: b,
    name: y,
    value: g,
    placeholder: v,
    disabled: O,
    readOnly: T,
    required: x,
    multiple: A,
    checked: _,
    min: I,
    max: j,
    step: k,
    minLength: u,
    maxLength: c,
    pattern: w,
    size: f,
    autoComplete: E,
    autofocus: P,
    list: z,
    form: L,
    formAction: M,
    formEnctype: N,
    formMethod: S,
    formNoValidate: U,
    formTarget: q,
    src: C,
    alt: G,
    width: s,
    height: d,
    accept: V,
    capture: a,
    inputMode: H,
    enterKeyHint: K,
    popoverTarget: R,
    popoverTargetAction: B,
    ...m
  } = o ?? {}, n = { ...m.attrs ?? {} }, e = (l, i) => {
    i !== void 0 && (Object.prototype.hasOwnProperty.call(n, l) || (n[l] = i));
  };
  e("type", b ?? "text"), e("name", y), e("value", g), e("placeholder", v), e("min", I), e("max", j), e("step", k), e("minlength", typeof u == "number" ? u : void 0), e("maxlength", typeof c == "number" ? c : void 0), e("pattern", w), e("size", typeof f == "number" ? f : void 0), e("autocomplete", E), e("list", z), e("form", L), e("formaction", M), e("formenctype", N), e("formmethod", S), e("formtarget", q), e("src", C), e("alt", G), e("width", typeof s == "number" ? s : void 0), e("height", typeof d == "number" ? d : void 0), e("accept", V), e("inputmode", H), e("enterkeyhint", K), e("popovertarget", R), e("popovertargetaction", B), O === !0 && e("disabled", ""), T === !0 && e("readonly", ""), x === !0 && e("required", ""), A === !0 && e("multiple", ""), _ === !0 && e("checked", ""), P === !0 && e("autofocus", ""), U === !0 && e("formnovalidate", ""), a === !0 && e("capture", ""), a === "user" && e("capture", "user"), a === "environment" && e("capture", "environment");
  const p = { ...m, attrs: n }, r = {};
  if (t && (typeof t.label == "string" && (r.label = t.label), typeof t.labelledby == "string" && (r.labelledby = t.labelledby), typeof t.hidden == "boolean" && (r.hidden = t.hidden)), Object.keys(r).length > 0 && (p.aria = r), Object.keys(n).length === 0) {
    const { attrs: l, ...i } = p;
    return i;
  }
  return p;
}
function Q(o) {
  return D(h, J(o));
}
function W(o = document) {
}
const Y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  INPUT_SELECTOR: F,
  INPUT_TAG: h,
  createInput: Q,
  enhanceInputs: W
}, Symbol.toStringTag, { value: "Module" }));
export {
  F as I,
  h as a,
  Q as c,
  W as e,
  Y as i
};
//# sourceMappingURL=index86.js.map
