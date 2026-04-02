import { c as r } from "./dom.js";
const o = "picture", i = "picture";
function l(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function c(t) {
  return r(o, l(t));
}
function s(t = document) {
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PICTURE_SELECTOR: i,
  PICTURE_TAG: o,
  createPicture: c,
  enhancePictures: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as P,
  o as a,
  c,
  s as e,
  p as i
};
//# sourceMappingURL=index101.js.map
