/**
 * Fundatio Design Foundation: Track element helpers.
 *
 * @remarks
 * The track element (`<track>`) provides external timed text tracks for media
 * elements such as `<video>` and `<audio>`. Tracks can represent:
 * - subtitles
 * - captions
 * - descriptions
 * - chapters
 * - metadata
 *
 * Best-practice guidance:
 * - Use `<track>` for WebVTT (and similar timed text) resources that accompany media.
 * - Use `kind` to declare the track purpose (subtitles, captions, etc.).
 * - Use `label` for a user-facing title shown in media track selection UIs.
 * - Use `srclang` to declare the track language (BCP 47 tag).
 * - If `kind="subtitles"`, user agents/spec require `srclang` to be defined.
 *
 * Attribute behavior notes:
 * - `default` is a boolean attribute. When present, it indicates this track
 *   should be enabled if user preferences do not indicate a better choice.
 *
 * Fundatio keeps the API small and framework-agnostic:
 * - Attributes are routed through Fundatio's hardened DOM helpers.
 * - Unsafe attributes (inline event handlers, raw style) are blocked centrally.
 * - This module has no side effects and does not mutate the DOM unless you call
 *   its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 * @see https://html.spec.whatwg.org/multipage/media.html#the-track-element
 *
 * @module
 * @category Elements
 */

import {
  createVoidElement,
  type AttrValue,
  type ElementOf,
  type GlobalAttrs,
} from '../../../ts/dom';

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
 * Allowed values for the `kind` attribute on `<track>`.
 *
 * @remarks
 * This follows the HTML living standard's enumerated states.
 *
 * @category Attributes
 */
export type TrackKind = 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';

/**
 * The semantic tag name for track.
 *
 * @category Constants
 */
export const TRACK_TAG = 'track' as const;

/**
 * A CSS selector targeting track elements.
 *
 * @category Constants
 */
export const TRACK_SELECTOR = 'track';

/**
 * Attribute bag for track creation/enhancement.
 *
 * @remarks
 * Track is a void element and must not carry text content or child nodes.
 *
 * Track accepts standard HTML global attributes plus track-specific attributes:
 * - `kind`
 * - `src`
 * - `srclang`
 * - `label`
 * - `default` (boolean attribute)
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type TrackAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * The type of text track.
   */
  kind?: TrackKind;

  /**
   * The URL of the timed text track resource (commonly a `.vtt` file).
   */
  src?: string;

  /**
   * The language of the text track, as a BCP 47 language tag.
   *
   * @remarks
   * If `kind` is `subtitles`, user agents/spec require `srclang` to be defined.
   */
  srclang?: string;

  /**
   * User-visible label for the track (typically shown in media UI menus).
   */
  label?: string;

  /**
   * Marks this track as the default if user preferences do not indicate another.
   *
   * @remarks
   * This maps to the `default` boolean attribute (presence-based).
   */
  default?: boolean;
};

/**
 * Normalize {@link TrackAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The track attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TrackAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, kind, src, srclang, label, default: isDefault, ...rest } = attrs;

  // Start with any caller-provided attrs escape hatch (still validated by dom.ts).
  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, value: AttrValue | undefined): void => {
    if (value === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = value;
  };

  setIfUnset('kind', kind);
  setIfUnset('src', src);
  setIfUnset('srclang', srclang);
  setIfUnset('label', label);

  // Boolean attribute presence is represented by empty string when true.
  if (isDefault === true) setIfUnset('default', '');

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const hasMergedAttrs = Object.keys(mergedAttrs).length > 0;
  const hasMappedAria = Object.keys(mappedAria).length > 0;

  const next: GlobalAttrs = { ...rest };
  if (hasMergedAttrs) next.attrs = mergedAttrs;
  if (hasMappedAria) next.aria = mappedAria;

  return next;
}

/**
 * Create a track element and apply attributes.
 *
 * @remarks
 * Track is a void element:
 * - It must not have text content.
 * - It must not have child nodes.
 *
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<track>` element.
 *
 * @example
 * ```ts
 * import { createTrack } from "@Vastare/Fundatio/elements/responsive/track";
 *
 * const t = createTrack({
 *   kind: "subtitles",
 *   src: "/captions/en.vtt",
 *   srclang: "en",
 *   label: "English",
 *   default: true
 * });
 * ```
 *
 * @category DOM
 */
export function createTrack(attrs?: TrackAttrs): ElementOf<typeof TRACK_TAG> {
  return createVoidElement(TRACK_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance track elements within a given root.
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
export function enhanceTracks(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for track.
  void root;
}
