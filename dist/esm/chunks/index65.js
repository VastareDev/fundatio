import { b as l } from "./dom.js";
const a = "rtc", r = "rtc";
function i(n) {
  if (!n) return;
  const { aria: e, ...t } = n;
  if (!e) return t;
  const o = {};
  return typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden), Object.keys(o).length > 0 ? { ...t, aria: o } : t;
}
function c(n, e) {
  const t = document.createElement(a);
  return l(t, i(e)), typeof n == "string" && (t.textContent = n), t;
}
function s(n = document) {
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RTC_SELECTOR: r,
  RTC_TAG: a,
  createRtc: c,
  enhanceRtcs: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as R,
  a,
  c,
  s as e,
  f as i
};
//# sourceMappingURL=index65.js.map
