import { c as t } from "./dom.js";
const n = "audio", a = "audio";
function r(e) {
  if (!e) return;
  const { aria: o, ...l } = e;
  if (!o) return l;
  const i = {};
  return typeof o.label == "string" && (i.label = o.label), typeof o.labelledby == "string" && (i.labelledby = o.labelledby), typeof o.hidden == "boolean" && (i.hidden = o.hidden), Object.keys(i).length > 0 ? { ...l, aria: i } : l;
}
function c(e) {
  const o = t(n, r(e));
  return e && (typeof e.src == "string" && (o.src = e.src), typeof e.controls == "boolean" && (o.controls = e.controls), typeof e.autoplay == "boolean" && (o.autoplay = e.autoplay), typeof e.loop == "boolean" && (o.loop = e.loop), typeof e.muted == "boolean" ? o.muted = e.muted : e.autoplay === !0 && (o.muted = !0), typeof e.preload == "string" && (o.preload = e.preload), typeof e.crossOrigin == "string" && (o.crossOrigin = e.crossOrigin), Array.isArray(e.controlsList) && e.controlsList.length > 0 && o.setAttribute("controlslist", e.controlsList.join(" ")), typeof e.disableRemotePlayback == "boolean" && (e.disableRemotePlayback ? o.setAttribute("disableremoteplayback", "") : o.removeAttribute("disableremoteplayback"))), o;
}
function f(e = document) {
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AUDIO_SELECTOR: a,
  AUDIO_TAG: n,
  createAudio: c,
  enhanceAudios: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  a as A,
  n as a,
  c,
  f as e,
  b as i
};
//# sourceMappingURL=index27.js.map
