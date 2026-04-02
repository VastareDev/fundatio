import { c } from "./dom.js";
const r = "dialog", d = "dialog";
function b(t) {
  if (!t) return;
  const { aria: e, open: i, closedBy: n, ...s } = t, o = { ...s }, l = { ...o.attrs ?? {} };
  if (i === !0 && (l.open = !0), (n === "any" || n === "closerequest" || n === "none") && (l.closedby = n), Object.keys(l).length > 0 && (o.attrs = l), !e) return o;
  const a = {};
  return typeof e.label == "string" && (a.label = e.label), typeof e.labelledby == "string" && (a.labelledby = e.labelledby), typeof e.hidden == "boolean" && (a.hidden = e.hidden), Object.keys(a).length > 0 ? { ...o, aria: a } : o;
}
function f(t, e) {
  return c(r, b(e), t);
}
function p(t = document) {
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DIALOG_SELECTOR: d,
  DIALOG_TAG: r,
  createDialog: f,
  enhanceDialogs: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as D,
  r as a,
  f as c,
  p as e,
  g as i
};
//# sourceMappingURL=index97.js.map
