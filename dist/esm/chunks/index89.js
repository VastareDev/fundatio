import { c as g } from "./dom.js";
const h = "meter", v = "meter";
function E(n) {
  const r = n ?? {}, { aria: e, value: i, min: l, max: s, low: f, high: m, optimum: c, form: b, ...p } = r, a = { ...p.attrs ?? {} }, t = (d, y) => {
    y !== void 0 && (Object.prototype.hasOwnProperty.call(a, d) || (a[d] = y));
  };
  t("min", typeof l == "number" ? l : 0), t("max", typeof s == "number" ? s : 1), t("value", typeof i == "number" ? i : 0), t("low", typeof f == "number" ? f : void 0), t("high", typeof m == "number" ? m : void 0), t("optimum", typeof c == "number" ? c : void 0), t("form", typeof b == "string" ? b : void 0);
  const o = {};
  e && (typeof e.label == "string" && (o.label = e.label), typeof e.labelledby == "string" && (o.labelledby = e.labelledby), typeof e.hidden == "boolean" && (o.hidden = e.hidden));
  const u = { ...p, attrs: a };
  return Object.keys(o).length > 0 && (u.aria = o), u;
}
function M(n, r) {
  return g(h, E(r), n);
}
function O(n = document) {
}
const x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  METER_SELECTOR: v,
  METER_TAG: h,
  createMeter: M,
  enhanceMeters: O
}, Symbol.toStringTag, { value: "Module" }));
export {
  v as M,
  h as a,
  M as c,
  O as e,
  x as i
};
//# sourceMappingURL=index89.js.map
