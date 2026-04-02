import { c as w } from "./dom.js";
const g = "textarea", N = "textarea";
function O(r) {
  if (!r) return;
  const {
    aria: t,
    name: u,
    form: d,
    disabled: h,
    required: x,
    readOnly: T,
    cols: o,
    rows: f,
    minLength: s,
    maxLength: l,
    placeholder: p,
    autoComplete: c,
    autoFocus: A,
    autoCapitalize: m,
    dirName: b,
    wrap: n,
    ...E
  } = r, i = { ...E }, e = { ...i.attrs ?? {} };
  if (typeof u == "string" && (e.name = u), typeof d == "string" && (e.form = d), h === !0 && (e.disabled = !0), x === !0 && (e.required = !0), T === !0 && (e.readonly = !0), typeof o == "number" && Number.isFinite(o) && (e.cols = o), typeof f == "number" && Number.isFinite(f) && (e.rows = f), typeof s == "number" && Number.isFinite(s) && (e.minlength = s), typeof l == "number" && Number.isFinite(l) && (e.maxlength = l), typeof p == "string" && (e.placeholder = p), typeof c == "string" && (e.autocomplete = c), A === !0 && (e.autofocus = !0), typeof m == "string" && (e.autocapitalize = m), typeof b == "string") {
    const y = b.trim();
    if (y.length === 0)
      throw new Error("textarea dirName must not be an empty string.");
    e.dirname = y;
  }
  if ((n === "soft" || n === "hard") && (e.wrap = n, n === "hard" && typeof e.cols > "u" && (e.cols = 20)), Object.keys(e).length > 0 && (i.attrs = e), !t) return i;
  const a = {};
  return typeof t.label == "string" && (a.label = t.label), typeof t.labelledby == "string" && (a.labelledby = t.labelledby), typeof t.hidden == "boolean" && (a.hidden = t.hidden), Object.keys(a).length > 0 ? { ...i, aria: a } : i;
}
function _(r, t) {
  return w(g, O(t), r);
}
function F(r = document) {
}
const C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TEXTAREA_SELECTOR: N,
  TEXTAREA_TAG: g,
  createTextarea: _,
  enhanceTextareas: F
}, Symbol.toStringTag, { value: "Module" }));
export {
  N as T,
  g as a,
  _ as c,
  F as e,
  C as i
};
//# sourceMappingURL=index95.js.map
