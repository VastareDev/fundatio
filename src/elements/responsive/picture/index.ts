/**
 * Fundatio Design Foundation: Picture element helpers.
 *
 * @remarks
 * The picture element (`<picture>`) is a container used for responsive images.
 * It allows authors to provide multiple image sources (typically via child
 * `<source>` elements) and a required fallback `<img>` element.
 *
 * Best-practice guidance:
 * - Always include an `<img>` inside `<picture>` as the fallback and for
 *   accessibility. The alternative text (`alt`) belongs on the `<img>`, not on
 *   `<picture>`.
 * - Use `<source>` elements with `media` and/or `type` to provide format and
 *   breakpoint-specific sources.
 * - Prefer modern formats (e.g. AVIF/WebP) with a sensible fallback.
 *
 * Fundatio-specific conventions:
 * - `<picture>` has no element-specific attributes; this module applies global
 *   attributes via Fundatio's hardened DOM helpers (`dom.ts`), which block inline
 *   event handler attributes (e.g. `onclick`) and the raw `style` attribute
 *   string.
 * - Supports a small structured ARIA input to reduce typo-based ARIA bugs.
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Fundatio element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset mapped into {@link GlobalAttrs.aria}.
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
 * The semantic tag name for picture containers.
 *
 * @category Constants
 */
export const PICTURE_TAG = 'picture' as const;

/**
 * A CSS selector targeting picture elements.
 *
 * @category Constants
 */
export const PICTURE_SELECTOR = 'picture';

/**
 * Attribute bag for picture creation/enhancement.
 *
 * @remarks
 * `<picture>` does not define unique attributes; it is a container that affects
 * image source selection in conjunction with child `<source>` and `<img>`.
 *
 *
 * Fundatio supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type PictureAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link PictureAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The picture attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: PictureAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create a picture element with optional global attributes.
 *
 * @remarks
 * `<picture>` is a container; authors must append a fallback `<img>` and any
 * `<source>` children. The alternative text (`alt`) is provided on the `<img>`.
 *
 *
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<picture>` element.
 *
 * @example
 * ```ts
 * import { createPicture } from "@Vastare/Fundatio/elements/responsive/picture";
 *
 * const p = createPicture({ className: "hero-media" });
 * ```
 *
 * @category DOM
 */
export function createPicture(attrs?: PictureAttrs): ElementOf<typeof PICTURE_TAG> {
  return createElement(PICTURE_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance picture elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhancePictures(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for picture.
  void root;
}
