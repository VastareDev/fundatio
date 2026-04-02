import { c as i } from "./dom.js";
const o = "caption", l = "caption";
function r(t) {
  if (!t) return;
  const { aria: e, ...a } = t;
  if (!e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function c(t, e) {
  return i(o, r(e), t);
}
function s(t = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CAPTION_SELECTOR: l,
  CAPTION_TAG: o,
  createCaption: c,
  enhanceCaptions: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as C,
  o as a,
  c,
  s as e,
  b as i
};
//# sourceMappingURL=index37.js.map
