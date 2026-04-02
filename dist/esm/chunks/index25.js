import { c as y } from "./dom.js";
const b = "object", u = "object";
function f(n, e) {
  if (typeof e == "number") {
    if (!Number.isFinite(e) || e < 0 || !Number.isInteger(e))
      throw new Error(`Invalid ${n}: expected a non-negative integer.`);
    return String(e);
  }
  if (!/^\d+$/.test(e))
    throw new Error(`Invalid ${n}: expected a numeric string.`);
  return e;
}
function m(n) {
  if (!n)
    return { attrs: { data: "about:blank" } };
  const { aria: e, data: r, type: a, name: o, form: s, width: d, height: l, attrs: c, ...p } = n, i = {};
  e && (typeof e.label == "string" && (i.label = e.label), typeof e.labelledby == "string" && (i.labelledby = e.labelledby), typeof e.describedby == "string" && (i.describedby = e.describedby), typeof e.hidden == "boolean" && (i.hidden = e.hidden));
  const t = { ...c ?? {} };
  typeof r == "string" && r.length > 0 && (t.data = r), typeof a == "string" && a.length > 0 && (t.type = a), t.data === void 0 && t.type === void 0 && (t.data = "about:blank"), typeof o == "string" && o.length > 0 && (t.name = o), typeof s == "string" && s.length > 0 && (t.form = s), d !== void 0 && (t.width = f("width", d)), l !== void 0 && (t.height = f("height", l));
  const g = Object.keys(i).length > 0, h = Object.keys(t).length > 0;
  return {
    ...p,
    ...g ? { aria: i } : null,
    ...h ? { attrs: t } : null
  };
}
function O(n, e) {
  return y(b, m(e), n);
}
function j(n = document) {
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  OBJECT_SELECTOR: u,
  OBJECT_TAG: b,
  createObject: O,
  enhanceObjects: j
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as O,
  b as a,
  O as c,
  j as e,
  A as i
};
//# sourceMappingURL=index25.js.map
