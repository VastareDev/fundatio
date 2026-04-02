/**
 * Fundatio Design Foundation: Sub element helpers.
 *
 * @remarks
 * The sub element (`<sub>`) represents subscript text.
 *
 * Best-practice guidance:
 * - Use `<sub>` for typographical conventions (e.g. chemical formulas like H₂O,
 *   mathematical indices in plain text, footnote markers) where subscript is
 *   semantically appropriate.
 * - Do not use `<sub>` purely for presentation. Use CSS for visual styling.
 *
 * The `<sub>` element has no element-specific attributes. It supports standard
 * HTML global attributes.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create sub elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * MDN:
 * - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/sub
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
 * The semantic tag name for subscript text.
 *
 * @category Constants
 */
export const SUB_TAG = 'sub' as const;

/**
 * A CSS selector targeting sub elements.
 *
 * @category Constants
 */
export const SUB_SELECTOR = 'sub';

/**
 * Attribute bag for sub creation/enhancement.
 *
 * @remarks
 * The `<sub>` element accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type SubAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link SubAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The sub attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: SubAttrs): GlobalAttrs | undefined {
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
 * Create a sub element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the sub element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<sub>` element.
 *
 * @example
 * ```ts
 * import { createSub } from "@Vastare/Fundatio/elements/inline/sub";
 *
 * const formula = document.createElement("span");
 * formula.append("H");
 * formula.appendChild(createSub("2"));
 * formula.append("O");
 * ```
 *
 * @category DOM
 */
export function createSub(text?: string, attrs?: SubAttrs): ElementOf<typeof SUB_TAG> {
  return createElement(SUB_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance sub elements within a given root.
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
export function enhanceSubs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for sub.
  void root;
}
