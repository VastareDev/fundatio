import { c as f } from "./dom.js";
const s = "details", b = "details";
function p(n) {
  if (!n) return;
  const { aria: t, open: c, name: d, ...r } = n, o = { ...r.attrs ?? {} }, i = (e, l) => {
    l !== void 0 && (Object.prototype.hasOwnProperty.call(o, e) || (o[e] = l));
  };
  i("name", d), c === !0 && i("open", "");
  const a = { ...r };
  if (Object.keys(o).length > 0 && (a.attrs = o), t) {
    const e = {};
    typeof t.label == "string" && (e.label = t.label), typeof t.labelledby == "string" && (e.labelledby = t.labelledby), typeof t.hidden == "boolean" && (e.hidden = t.hidden), Object.keys(e).length > 0 && (a.aria = e);
  }
  return a;
}
function u(n) {
  return f(s, p(n));
}
function y(n = document) {
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DETAILS_SELECTOR: b,
  DETAILS_TAG: s,
  createDetails: u,
  enhanceDetails: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as D,
  s as a,
  u as c,
  y as e,
  g as i
};
//# sourceMappingURL=index96.js.map
