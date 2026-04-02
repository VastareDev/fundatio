import { c as d } from "./dom.js";
const s = "video", b = "video";
function u(l) {
  if (!l) return;
  const {
    aria: e,
    src: o,
    controls: m,
    autoplay: O,
    loop: I,
    muted: A,
    playsInline: P,
    preload: _,
    poster: j,
    width: E,
    height: V,
    crossOrigin: k,
    controlsList: t,
    disablePictureInPicture: f,
    disableRemotePlayback: p,
    referrerPolicy: c,
    fetchPriority: y,
    ...a
  } = l, r = { ...a };
  if (e) {
    const n = {};
    typeof e.label == "string" && (n.label = e.label), typeof e.labelledby == "string" && (n.labelledby = e.labelledby), typeof e.hidden == "boolean" && (n.hidden = e.hidden), Object.keys(n).length > 0 && (r.aria = n);
  }
  const i = {};
  return typeof t == "string" && (i.controlslist = t), Array.isArray(t) && (i.controlslist = t.join(" ")), typeof c == "string" && (i.referrerpolicy = c), typeof y == "string" && (i.fetchpriority = y), typeof f == "boolean" && (i.disablepictureinpicture = f), typeof p == "boolean" && (i.disableremoteplayback = p), Object.keys(i).length > 0 && (r.attrs = i), r;
}
function g(l, e) {
  const o = d(s, u(e), l);
  return e && (typeof e.src == "string" && (o.src = e.src), typeof e.controls == "boolean" && (o.controls = e.controls), typeof e.autoplay == "boolean" && (o.autoplay = e.autoplay), typeof e.loop == "boolean" && (o.loop = e.loop), e.autoplay === !0 && typeof e.muted != "boolean" ? o.muted = !0 : typeof e.muted == "boolean" && (o.muted = e.muted), typeof e.playsInline == "boolean" && (o.playsInline = e.playsInline), typeof e.preload == "string" && (o.preload = e.preload), typeof e.poster == "string" && (o.poster = e.poster), typeof e.width == "number" && (o.width = e.width), typeof e.height == "number" && (o.height = e.height), typeof e.crossOrigin == "string" && (o.crossOrigin = e.crossOrigin)), o;
}
function h(l = document) {
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  VIDEO_SELECTOR: b,
  VIDEO_TAG: s,
  createVideo: g,
  enhanceVideos: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as V,
  s as a,
  g as c,
  h as e,
  w as i
};
//# sourceMappingURL=index26.js.map
