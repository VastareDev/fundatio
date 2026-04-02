import { c as g } from "./dom.js";
const c = "select", h = "select";
function E(o) {
  if (!o) return;
  const {
    aria: r,
    name: f,
    form: u,
    disabled: d,
    required: b,
    multiple: m,
    size: a,
    autofocus: p,
    autoComplete: y,
    dirName: S,
    ...l
  } = o, i = { ...l.attrs ?? {} }, e = (t, s) => {
    s !== void 0 && (Object.prototype.hasOwnProperty.call(i, t) || (i[t] = s));
  };
  e("name", f), e("form", u), typeof a == "number" && e("size", a), e("autocomplete", y), e("dirname", S), d === !0 && e("disabled", ""), b === !0 && e("required", ""), m === !0 && e("multiple", ""), p === !0 && e("autofocus", "");
  const n = { ...l };
  if (Object.keys(i).length > 0 && (n.attrs = i), r) {
    const t = {};
    typeof r.label == "string" && (t.label = r.label), typeof r.labelledby == "string" && (t.labelledby = r.labelledby), typeof r.hidden == "boolean" && (t.hidden = r.hidden), Object.keys(t).length > 0 && (n.aria = t);
  }
  return n;
}
function O(o) {
  return g(c, E(o));
}
function _(o = document) {
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SELECT_SELECTOR: h,
  SELECT_TAG: c,
  createSelect: O,
  enhanceSelects: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as S,
  c as a,
  O as c,
  _ as e,
  T as i
};
//# sourceMappingURL=index94.js.map
