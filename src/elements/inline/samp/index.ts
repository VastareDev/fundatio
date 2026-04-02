/**
 * Sol Design Foundation: Samp element helpers.
 *
 * @remarks
 * The samp element (`<samp>`) represents sample (or quoted) output from another
 * program or computing system.
 *
 * Best-practice guidance:
 * - Use `<samp>` for *output* (what the computer/system printed).
 * - Use `<kbd>` for user input (what the user typed/pressed).
 * - Use `<code>` for code fragments (source code).
 * - Use CSS for presentation; semantics should match meaning.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create samp nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset that covers common cases and
 * prevents typo-based ARIA bugs (e.g. `lable`).
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
 * The semantic tag name for sample output.
 *
 * @category Constants
 */
export const SAMP_TAG = 'samp' as const;

/**
 * A CSS selector targeting samp elements.
 *
 * @category Constants
 */
export const SAMP_SELECTOR = 'samp';

/**
 * Attribute bag for samp creation/enhancement.
 *
 * @remarks
 * Samp elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type SampAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link SampAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The samp attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: SampAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  // Only attach `aria` if something was actually defined.
  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create a samp element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the samp element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<samp>` element.
 *
 * @example
 * ```ts
 * import { createSamp } from "@lnpg/sol/elements/inline/samp";
 *
 * // Sample output:
 * const out = createSamp("Everything up-to-date");
 * ```
 *
 * @category DOM
 */
export function createSamp(text?: string, attrs?: SampAttrs): ElementOf<typeof SAMP_TAG> {
  return createElement(SAMP_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance samp elements within a given root.
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
export function enhanceSamps(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for samp.
  void root;
}
