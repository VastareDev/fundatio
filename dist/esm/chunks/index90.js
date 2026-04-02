import { c as p } from "./dom.js";
const s = "optgroup", c = "optgroup";
function b(a, l) {
  const { aria: e, disabled: i, ...n } = l ?? {}, o = {};
  e && (typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden));
  const t = { ...n.attrs ?? {} };
  Object.prototype.hasOwnProperty.call(t, "label") || (t.label = a), i === !0 && !Object.prototype.hasOwnProperty.call(t, "disabled") && (t.disabled = "");
  const r = { ...n };
  return Object.keys(t).length > 0 && (r.attrs = t), Object.keys(o).length > 0 && (r.aria = o), r;
}
function d(a, l) {
  return p(s, b(a, l));
}
function f(a = document) {
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OPTGROUP_SELECTOR: c,
  OPTGROUP_TAG: s,
  createOptgroup: d,
  enhanceOptgroups: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as O,
  s as a,
  d as c,
  f as e,
  u as i
};
//# sourceMappingURL=index90.js.map
