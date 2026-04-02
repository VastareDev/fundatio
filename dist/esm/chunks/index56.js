import { c as f } from "./dom.js";
const s = "data", d = "data";
function b(t, o) {
  if (!t)
    return;
  const { aria: e, value: r, ...c } = t, a = c, i = { ...a.attrs ?? {} }, l = typeof r == "string" || typeof r == "number" ? r : typeof o == "string" ? o : void 0;
  if ((typeof l == "string" || typeof l == "number") && (i.value = l), Object.keys(i).length > 0 && (a.attrs = i), !e) return a;
  const n = {};
  return typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 ? { ...a, aria: n } : a;
}
function p(t, o) {
  return f(s, b(o, t), t);
}
function u(t = document) {
}
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DATA_SELECTOR: d,
  DATA_TAG: s,
  createData: p,
  enhanceDatas: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as D,
  s as a,
  p as c,
  u as e,
  h as i
};
//# sourceMappingURL=index56.js.map
