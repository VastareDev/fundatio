import { i as n } from "./index49.js";
import { i as a } from "./index50.js";
import { i as m } from "./index51.js";
import { i as d } from "./index52.js";
import { i as p } from "./index53.js";
import { i as s } from "./index54.js";
import { i as f } from "./index55.js";
import { i as l } from "./index56.js";
import { i as x } from "./index57.js";
import { i as b } from "./index58.js";
import { i as c } from "./index59.js";
import { i as $ } from "./index60.js";
import { i as u } from "./index61.js";
import { i as y } from "./index62.js";
import { i as _ } from "./index63.js";
import { c as g } from "./dom.js";
import { i as h } from "./index64.js";
import { i as j } from "./index65.js";
import { i as O } from "./index66.js";
import { i as R } from "./index67.js";
import { i as S } from "./index68.js";
import { i as k } from "./index69.js";
import { i as v } from "./index70.js";
import { i as M } from "./index71.js";
import { i as P } from "./index72.js";
import { i as T } from "./index73.js";
const t = "rp", A = "rp";
function E(r) {
  if (!r) return;
  const { aria: i, ...e } = r;
  if (!i) return e;
  const o = {};
  return typeof i.label == "string" && (o.label = i.label), typeof i.labelledby == "string" && (o.labelledby = i.labelledby), typeof i.hidden == "boolean" && (o.hidden = i.hidden), Object.keys(o).length > 0 ? { ...e, aria: o } : e;
}
function q(r, i) {
  return g(t, E(i), r);
}
function z(r = document) {
}
const G = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RP_SELECTOR: A,
  RP_TAG: t,
  createRp: q,
  enhanceRps: z
}, Symbol.toStringTag, { value: "Module" })), pi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abbr: a,
  anchor: n,
  b: m,
  cite: s,
  code: f,
  data: l,
  dfn: x,
  em: b,
  italic: c,
  kbd: $,
  mark: u,
  q: y,
  rb: _,
  rp: G,
  rt: h,
  rtc: j,
  ruby: O,
  s: R,
  samp: S,
  small: d,
  strong: p,
  sub: k,
  sup: v,
  time: M,
  u: P,
  var: T
}, Symbol.toStringTag, { value: "Module" }));
export {
  G as a,
  pi as i
};
//# sourceMappingURL=index8.js.map
