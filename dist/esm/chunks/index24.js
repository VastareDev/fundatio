import { a as h } from "./dom.js";
const f = "embed", p = "embed";
function d(e, t) {
  if (e == null) return;
  if (typeof e == "number") {
    if (!Number.isFinite(e) || e < 0)
      throw new Error(`Invalid ${t}: must be a finite, non-negative number.`);
    return String(Math.floor(e));
  }
  const r = String(e).trim();
  if (r.length !== 0) {
    if (r.includes("%"))
      throw new Error(`Invalid ${t}: percentages are not allowed for <embed> ${t}.`);
    if (!/^\d+$/.test(r))
      throw new Error(`Invalid ${t}: must be a non-negative integer (CSS pixels).`);
    return r;
  }
}
function m(e) {
  if (!e) return;
  const { aria: t, src: r, type: i, width: c, height: b, attrs: u, ...g } = e, o = t ? (() => {
    const n = {};
    return typeof t.label == "string" && (n.label = t.label), typeof t.labelledby == "string" && (n.labelledby = t.labelledby), typeof t.hidden == "boolean" && (n.hidden = t.hidden), Object.keys(n).length > 0 ? n : void 0;
  })() : void 0, l = d(c, "width"), a = d(b, "height"), s = (() => {
    const n = { ...u ?? {} };
    return typeof r == "string" && r.length > 0 && (n.src = r), typeof i == "string" && i.length > 0 && (n.type = i), typeof l == "string" && (n.width = l), typeof a == "string" && (n.height = a), Object.keys(n).length > 0 ? n : void 0;
  })();
  return {
    ...g,
    ...o ? { aria: o } : null,
    ...s ? { attrs: s } : null
  };
}
function y(e) {
  return h(f, m(e));
}
function E(e = document) {
}
const S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EMBED_SELECTOR: p,
  EMBED_TAG: f,
  createEmbed: y,
  enhanceEmbeds: E
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as E,
  f as a,
  y as c,
  E as e,
  S as i
};
//# sourceMappingURL=index24.js.map
