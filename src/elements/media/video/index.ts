/**
 * Fundatio Design Foundation: Video element helpers.
 *
 * @remarks
 * The video element (`<video>`) embeds media playback.
 *
 * Best-practice guidance:
 * - Provide user controls (`controls`) unless you have a very strong reason not to.
 * - Autoplay is often blocked when audio is present; if `autoplay` is enabled,
 *   videos commonly need to be `muted` to actually autoplay in modern browsers.
 * - Prefer captions/subtitles via `<track>` for accessibility when relevant.
 * - Avoid obsolete attributes; use modern properties/attributes and CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create video elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { createElement, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Fundatio element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset that covers common cases and
 * prevents typo-based ARIA bugs.
 *
 * It is mapped into {@link GlobalAttrs.aria} for application by `dom.ts`.
 *
 * @category Attributes
 */
export type StructuredAria = {
  /**
   * Accessible label, mapped to `aria-label`.
   */
  label?: string;

  /**
   * ID reference to the labelling element(s), mapped to `aria-labelledby`.
   */
  labelledby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * Token values for the `preload` attribute.
 *
 * @category Attributes
 */
export type VideoPreload = 'none' | 'metadata' | 'auto';

/**
 * Token values for the `crossorigin` attribute.
 *
 * @category Attributes
 */
export type VideoCrossOrigin = 'anonymous' | 'use-credentials';

/**
 * Token values for the `referrerpolicy` attribute.
 *
 * @category Attributes
 */
export type VideoReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

/**
 * Token values for the `fetchpriority` attribute (where supported).
 *
 * @category Attributes
 */
export type VideoFetchPriority = 'high' | 'low' | 'auto';

/**
 * The semantic tag name for video.
 *
 * @category Constants
 */
export const VIDEO_TAG = 'video' as const;

/**
 * A CSS selector targeting video elements.
 *
 * @category Constants
 */
export const VIDEO_SELECTOR = 'video';

/**
 * Attribute bag for video creation/enhancement.
 *
 * @remarks
 * Video elements accept standard HTML global attributes, plus media-specific
 * attributes and properties.
 *
 * Fundatio supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type VideoAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Source URL for the video.
   */
  src?: string;

  /**
   * Whether the browser should offer playback controls to the user.
   */
  controls?: boolean;

  /**
   * Whether the video should start playing automatically.
   *
   * @remarks
   * Autoplay is frequently blocked unless the video is muted.
   */
  autoplay?: boolean;

  /**
   * Whether the video should loop after ending.
   */
  loop?: boolean;

  /**
   * Whether the audio should be muted.
   */
  muted?: boolean;

  /**
   * Hint that playback should happen inline on mobile browsers (not fullscreen).
   */
  playsInline?: boolean;

  /**
   * Preload behavior hint.
   */
  preload?: VideoPreload;

  /**
   * Poster image URL shown before playback starts.
   */
  poster?: string;

  /**
   * Display width in CSS pixels (attribute-reflected).
   */
  width?: number;

  /**
   * Display height in CSS pixels (attribute-reflected).
   */
  height?: number;

  /**
   * CORS setting for fetching the media.
   */
  crossOrigin?: VideoCrossOrigin;

  /**
   * Feature-control tokens for the video UI.
   *
   * @remarks
   * Maps to the `controlslist` attribute (space-separated tokens).
   */
  controlsList?: string[] | string;

  /**
   * Disable Picture-in-Picture where supported.
   */
  disablePictureInPicture?: boolean;

  /**
   * Disable remote playback where supported.
   */
  disableRemotePlayback?: boolean;

  /**
   * Referrer policy for fetching the media.
   */
  referrerPolicy?: VideoReferrerPolicy;

  /**
   * Fetch priority hint (where supported).
   */
  fetchPriority?: VideoFetchPriority;
};

/**
 * Normalize {@link VideoAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The video attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: VideoAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const {
    aria,
    src,
    controls,
    autoplay,
    loop,
    muted,
    playsInline,
    preload,
    poster,
    width,
    height,
    crossOrigin,
    controlsList,
    disablePictureInPicture,
    disableRemotePlayback,
    referrerPolicy,
    fetchPriority,
    ...rest
  } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  if (aria) {
    const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

    if (Object.keys(mappedAria).length > 0) mapped.aria = mappedAria;
  }

  // Only attach attrs if we actually have any element-specific attributes to set
  // via dom.ts (keeps output stable and avoids needless objects).
  const elementAttrs: NonNullable<GlobalAttrs['attrs']> = {};

  if (typeof controlsList === 'string') elementAttrs.controlslist = controlsList;
  if (Array.isArray(controlsList)) elementAttrs.controlslist = controlsList.join(' ');

  if (typeof referrerPolicy === 'string') elementAttrs.referrerpolicy = referrerPolicy;
  if (typeof fetchPriority === 'string') elementAttrs.fetchpriority = fetchPriority;

  // Boolean-ish feature flags that don't have reliable reflected properties everywhere.
  if (typeof disablePictureInPicture === 'boolean') {
    elementAttrs.disablepictureinpicture = disablePictureInPicture;
  }
  if (typeof disableRemotePlayback === 'boolean') {
    elementAttrs.disableremoteplayback = disableRemotePlayback;
  }

  if (Object.keys(elementAttrs).length > 0) mapped.attrs = elementAttrs;

  // The rest are applied as properties after createElement to preserve proper boolean semantics.
  void src;
  void controls;
  void autoplay;
  void loop;
  void muted;
  void playsInline;
  void preload;
  void poster;
  void width;
  void height;
  void crossOrigin;

  return mapped;
}

/**
 * Create a video element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 * - If `autoplay` is enabled and `muted` is not explicitly provided, Fundatio will
 *   default `muted` to `true` to align with common browser autoplay policies.
 *
 * @param text - Optional fallback text shown if video is unsupported.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<video>` element.
 *
 * @example
 * ```ts
 * import { createVideo } from "@Vastare/Fundatio/elements/media/video";
 *
 * document.body.appendChild(
 *   createVideo("Your browser does not support video.", {
 *     src: "/media/intro.mp4",
 *     controls: true,
 *     preload: "metadata",
 *   })
 * );
 * ```
 *
 * @category DOM
 */
export function createVideo(text?: string, attrs?: VideoAttrs): HTMLVideoElement {
  const el = createElement(VIDEO_TAG, toGlobalAttrs(attrs), text) as unknown as HTMLVideoElement;

  if (!attrs) return el;

  if (typeof attrs.src === 'string') el.src = attrs.src;

  if (typeof attrs.controls === 'boolean') el.controls = attrs.controls;

  if (typeof attrs.autoplay === 'boolean') el.autoplay = attrs.autoplay;
  if (typeof attrs.loop === 'boolean') el.loop = attrs.loop;

  // Practical default: autoplay usually requires muted.
  if (attrs.autoplay === true && typeof attrs.muted !== 'boolean') {
    el.muted = true;
  } else if (typeof attrs.muted === 'boolean') {
    el.muted = attrs.muted;
  }

  if (typeof attrs.playsInline === 'boolean')
    (el as unknown as { playsInline?: boolean }).playsInline = attrs.playsInline;

  if (typeof attrs.preload === 'string') el.preload = attrs.preload;

  if (typeof attrs.poster === 'string') el.poster = attrs.poster;

  if (typeof attrs.width === 'number') el.width = attrs.width;
  if (typeof attrs.height === 'number') el.height = attrs.height;

  if (typeof attrs.crossOrigin === 'string') el.crossOrigin = attrs.crossOrigin;

  return el;
}

/**
 * Enhance video elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * What it will never do:
 * - It will not inject styles (CSS remains the source of truth)
 * - It will not introduce framework-specific behavior
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceVideos(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for video.
  void root;
}
