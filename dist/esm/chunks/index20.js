import { b as y } from "./dom.js";
const u = "svg", m = "svg";
function v(l) {
  const { aria: e, viewBox: o, width: r, height: d, role: a, tabIndex: c, attrs: p, ...h } = l ?? {}, t = { ...h };
  a && (t.role = a);
  const n = {}, f = typeof (e == null ? void 0 : e.label) == "string", b = typeof (e == null ? void 0 : e.labelledby) == "string", g = typeof (e == null ? void 0 : e.hidden) == "boolean";
  f && (n.label = e.label), b && (n.labelledby = e.labelledby), g && (n.hidden = e.hidden);
  const s = !f && !b;
  s && !g && (n.hidden = !0), Object.keys(n).length > 0 && (t.aria = n), !s && !a && (t.role = "img"), typeof c == "number" ? t.tabIndex = c : s && (t.tabIndex = -1);
  const i = {
    ...p ?? {}
  };
  return s && (i.focusable = "false"), o && (i.viewBox = o), r !== void 0 && (i.width = r), d !== void 0 && (i.height = d), Object.keys(i).length > 0 && (t.attrs = i), t;
}
function x(l, e) {
  const o = document.createElement("svg");
  return y(o, v(e)), typeof l == "string" && (o.textContent = l), o;
}
function S(l = document) {
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SVG_SELECTOR: m,
  SVG_TAG: u,
  createSvg: x,
  enhanceSvgs: S
}, Symbol.toStringTag, { value: "Module" }));
export {
  m as S,
  u as a,
  x as c,
  S as e,
  _ as i
};
//# sourceMappingURL=index20.js.map
