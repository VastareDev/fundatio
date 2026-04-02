/**
 * Fundatio Design Foundation: Ordered list element helpers.
 *
 * @remarks
 * The ordered list element (`<ol>`) represents an ordered list of items.
 *
 * Best-practice guidance:
 * - Prefer `<ol>` when the order of items matters (steps, rankings, sequences).
 * - List items should be `<li>` elements (direct children).
 * - Avoid presentational attributes when possible; prefer CSS for styling.
 * - Use `start`/`reversed` only when semantics require non-default numbering.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create ordered lists in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
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
 * The semantic tag name for ordered lists.
 *
 * @category Constants
 */
export const OL_TAG = 'ol' as const;

/**
 * A CSS selector targeting ordered list elements.
 *
 * @category Constants
 */
export const OL_SELECTOR = 'ol';

/**
 * Allowed values for the `<ol>` `type` attribute.
 *
 * @remarks
 * While `type` is still supported by browsers, it is presentational and CSS is
 * often preferable.
 *
 * - `1`  Decimal numbers (default)
 * - `a`  Lowercase letters
 * - `A`  Uppercase letters
 * - `i`  Lowercase Roman numerals
 * - `I`  Uppercase Roman numerals
 *
 * @category Attributes
 */
export type OlType = '1' | 'a' | 'A' | 'i' | 'I';

/**
 * Attribute bag for ordered list creation/enhancement.
 *
 * @remarks
 * Ordered lists accept HTML global attributes and a small set of specific
 * attributes:
 * - `reversed` for descending numbering
 * - `start` to set the initial counter value
 * - `type` to choose the marker style (often better via CSS)
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type OlAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Whether numbering should be descending.
   */
  reversed?: boolean;

  /**
   * Starting value for the list counter.
   */
  start?: number;

  /**
   * Marker type for list items.
   */
  type?: OlType;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link OlAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The ordered list attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: OlAttrs): GlobalAttrs | undefined {
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
 * Create an ordered list element with global and list-specific attributes.
 *
 * @remarks
 * This helper intentionally does not accept raw HTML. Consumers should append
 * `<li>` children using DOM APIs.
 *
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<ol>` element.
 *
 * @example
 * ```ts
 * import { createOl } from "@Vastare/Fundatio/elements/list/ol";
 *
 * const ol = createOl({ start: 3, reversed: true, className: "steps" });
 * document.body.appendChild(ol);
 * ```
 *
 * @category DOM
 */
export function createOl(attrs?: OlAttrs): ElementOf<typeof OL_TAG> {
  const el = createElement(OL_TAG, toGlobalAttrs(attrs));
  const ol = el as unknown as HTMLOListElement;

  if (attrs) {
    if (typeof attrs.reversed === 'boolean') ol.reversed = attrs.reversed;
    if (typeof attrs.start === 'number' && Number.isFinite(attrs.start)) ol.start = attrs.start;
    if (typeof attrs.type === 'string') ol.type = attrs.type;
  }

  return el;
}

/**
 * Enhance ordered list elements within a given root.
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
export function enhanceOls(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for ol.
  void root;
}
