/**
 * Sol Design Foundation: Area element helpers.
 *
 * @remarks
 * The area element (`<area>`) defines a hyperlink or dead region within an image map.
 * It is used inside a `<map>` element to define clickable (or non-clickable) areas.
 *
 * Best-practice guidance:
 * - Use `<area>` only within `<map>` and pair with an `<img usemap="...">`.
 * - Prefer meaningful alternative text for clickable regions (screen readers rely on it).
 * - Keep shapes and coordinates accurate; imprecise maps are a usability disaster.
 *
 * Spec-aware Sol behavior:
 * - If `href` is provided: `alt` is required, and Sol will ensure an `alt` attribute
 *   exists (defaults to empty string if not provided).
 * - If `href` is not provided: `alt` must be omitted, and Sol will omit it.
 *
 * Global attributes are applied via Sol's hardened DOM helpers (`dom.ts`), which block:
 * - inline event handler attributes (e.g. `onclick`)
 * - the raw `style` attribute string (use `style` object instead)
 *
 * This module has no side effects and does not mutate the DOM unless you call its functions.
 *
 * @module
 * @category Elements
 */

import { createVoidElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @category Attributes
 */
export type StructuredAria = {
  /**
   * Accessible label, mapped to `aria-label`.
   */
  label?: string;

  /**
   * ID reference(s) to labelling element(s), mapped to `aria-labelledby`.
   */
  labelledby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * The semantic tag name for area elements.
 *
 * @category Constants
 */
export const AREA_TAG = 'area' as const;

/**
 * A CSS selector targeting area elements.
 *
 * @category Constants
 */
export const AREA_SELECTOR = 'area';

/**
 * Enumerated shape values for `<area>`.
 *
 * @remarks
 * The default (when omitted) is effectively `rect` in HTML's image map processing model,
 * but Sol does not force a default; it passes through what you provide.
 *
 * @category Types
 */
export type AreaShape = 'rect' | 'circle' | 'poly' | 'default';

/**
 * Area-specific attributes.
 *
 * @remarks
 * `<area>` largely mirrors hyperlink-related attributes when `href` is present.
 * Sol enforces the spec rule around `alt`:
 * - `href` present => `alt` must be present (Sol ensures it exists)
 * - `href` absent  => `alt` must be omitted (Sol omits it)
 *
 * @category Attributes
 */
export type AreaAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Alternative text for the area.
   *
   * @remarks
   * Only applied when `href` is present. If `href` is present and `alt` is not
   * provided, Sol defaults it to `""`. If `href` is absent, Sol omits `alt`
   * entirely.
   */
  alt?: string;

  /**
   * Link target URL. When present, the area represents a hyperlink.
   */
  href?: string;

  /**
   * The shape of the area. Common values: `rect`, `circle`, `poly`, `default`.
   */
  shape?: AreaShape;

  /**
   * Coordinates defining the area geometry. Interpretation depends on `shape`.
   */
  coords?: string;

  /**
   * Where to display the linked URL (e.g. `_blank`).
   */
  target?: string;

  /**
   * Whether to download the linked resource instead of navigating.
   *
   * @remarks
   * May be a boolean (attribute presence) or a suggested filename.
   */
  download?: boolean | string;

  /**
   * A space-separated list of URLs to ping when the link is followed.
   */
  ping?: string;

  /**
   * Relationship of the target object to the linking object.
   */
  rel?: string;

  /**
   * Referrer policy for the link.
   */
  referrerPolicy?: string;

  /**
   * Language of the linked resource (BCP 47 tag).
   */
  hreflang?: string;

  /**
   * MIME type of the linked resource (advisory).
   */
  type?: string;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

function toGlobalAttrs(attrs?: AreaAttrs): GlobalAttrs {
  const {
    aria,
    alt,
    href,
    shape,
    coords,
    target,
    download,
    ping,
    rel,
    referrerPolicy,
    hreflang,
    type,
    ...rest
  } = attrs ?? {};

  const mapped: GlobalAttrs = { ...rest };

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  if (Object.keys(mappedAria).length > 0) {
    mapped.aria = mappedAria;
  }

  // Apply element-specific attributes via the safe attrs escape hatch.
  mapped.attrs = { ...(mapped.attrs ?? {}) };

  const hasHref = typeof href === 'string' && href.length > 0;

  if (hasHref) {
    mapped.attrs.href = href;

    // Spec: if href is present, alt must be present.
    mapped.attrs.alt = typeof alt === 'string' ? alt : '';
  } else {
    // Spec: if href is absent, alt must be omitted.
    // We intentionally do not set `alt` here even if provided.
  }

  if (shape) mapped.attrs.shape = shape;
  if (coords) mapped.attrs.coords = coords;
  if (target) mapped.attrs.target = target;

  if (typeof download === 'boolean') mapped.attrs.download = download;
  if (typeof download === 'string') mapped.attrs.download = download;

  if (ping) mapped.attrs.ping = ping;
  if (rel) mapped.attrs.rel = rel;
  if (referrerPolicy) mapped.attrs.referrerpolicy = referrerPolicy;
  if (hreflang) mapped.attrs.hreflang = hreflang;
  if (type) mapped.attrs.type = type;

  return mapped;
}

/**
 * Create an area element with spec-aware `alt` handling.
 *
 * @remarks
 * - `<area>` is a void element (no text content).
 * - If `href` is present, Sol ensures `alt` is present (defaults to `""`).
 * - If `href` is absent, Sol omits `alt`.
 *
 * @category DOM
 */
export function createArea(attrs?: AreaAttrs): ElementOf<typeof AREA_TAG> {
  return createVoidElement(AREA_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance area elements within a given root.
 *
 * @remarks
 * No runtime behaviour in v1.0.0.
 *
 * @category Enhancement
 */
export function enhanceAreas(root: ParentNode = document): void {
  void root;
}
