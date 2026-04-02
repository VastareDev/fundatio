import { c as i } from "./dom.js";
const l = "ol", r = "ol";
function a(e) {
  if (!e) return;
  const { aria: o, ...n } = e;
  if (!o) return n;
  const t = {};
  return typeof o.label == "string" && (t.label = o.label), typeof o.labelledby == "string" && (t.labelledby = o.labelledby), typeof o.hidden == "boolean" && (t.hidden = o.hidden), Object.keys(t).length > 0 ? { ...n, aria: t } : n;
}
function s(e) {
  const o = i(l, a(e)), n = o;
  return e && (typeof e.reversed == "boolean" && (n.reversed = e.reversed), typeof e.start == "number" && Number.isFinite(e.start) && (n.start = e.start), typeof e.type == "string" && (n.type = e.type)), o;
}
function f(e = document) {
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OL_SELECTOR: r,
  OL_TAG: l,
  createOl: s,
  enhanceOls: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as O,
  l as a,
  s as c,
  f as e,
  p as i
};
//# sourceMappingURL=index78.js.map
