import { c as i } from "./dom.js";
const r = "canvas", f = "canvas";
function c(n) {
  if (!n) return;
  const { aria: e, width: a, height: l, ...s } = n, t = { ...s }, o = {};
  return typeof (e == null ? void 0 : e.label) == "string" && (o.label = e.label), typeof (e == null ? void 0 : e.labelledby) == "string" && (o.labelledby = e.labelledby), typeof (e == null ? void 0 : e.hidden) == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 && (t.aria = o), (typeof a == "number" || typeof l == "number") && (t.attrs = { ...t.attrs ?? {} }, typeof a == "number" && (t.attrs.width = a), typeof l == "number" && (t.attrs.height = l)), t;
}
function b(n, e) {
  return i(r, c(e), n);
}
function d(n = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CANVAS_SELECTOR: f,
  CANVAS_TAG: r,
  createCanvas: b,
  enhanceCanvases: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as C,
  r as a,
  b as c,
  d as e,
  u as i
};
//# sourceMappingURL=index22.js.map
