import { c as f } from "./dom.js";
const r = "time", b = "time";
function m(t) {
  if (!t) return;
  const { aria: e, datetime: l, dateTime: s, attrs: c, ...d } = t, o = { ...d };
  if (e) {
    const n = {};
    typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 && (o.aria = n);
  }
  const i = l ?? s, a = { ...c ?? {} };
  return typeof i == "string" ? i.length > 0 && (a.datetime = i) : i instanceof Date && (a.datetime = i.toISOString()), Object.keys(a).length > 0 && (o.attrs = a), o;
}
function p(t, e) {
  return f(r, m(e), t);
}
function y(t = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TIME_SELECTOR: b,
  TIME_TAG: r,
  createTime: p,
  enhanceTimes: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as T,
  r as a,
  p as c,
  y as e,
  u as i
};
//# sourceMappingURL=index71.js.map
