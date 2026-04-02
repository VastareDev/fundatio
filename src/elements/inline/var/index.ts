/**
 * Sol Design Foundation: Var element helpers.
 *
 * @remarks
 * The var element (`<var>`) represents a variable name in a mathematical
 * expression or programming context. Browsers typically render it in italics
 * by default, but presentation should be handled via CSS.
 *
 * Best-practice guidance:
 * - Use `<var>` specifically for variables (e.g. `x`, `y`, `n`, `userId`).
 * - Use `<code>` for code fragments, `<kbd>` for user input, and `<samp>` for
 *   sample output, rather than overloading `<var>`.
 * - Keep semantics clean: `<var>` is inline and should not be used as a generic
 *   styling hook.
 *
 * Sol provides small, framework-agnostic helpers so consumers can:
 * - create `<var>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
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
 * The semantic tag name for var elements.
 *
 * @category Constants
 */
export const VAR_TAG = 'var' as const;

/**
 * A CSS selector targeting var elements.
 *
 * @category Constants
 */
export const VAR_SELECTOR = 'var';

/**
 * Attribute bag for var creation/enhancement.
 *
 * @remarks
 * The `<var>` element accepts standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type VarAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link VarAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The var attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: VarAttrs): GlobalAttrs | undefined {
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
 * Create a var element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the var element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<var>` element.
 *
 * @example
 * ```ts
 * import { createVar } from "@lnpg/sol/elements/inline/var";
 *
 * const v = createVar("n", { className: "symbol" });
 * document.body.appendChild(v);
 * ```
 *
 * @category DOM
 */
export function createVar(text?: string, attrs?: VarAttrs): ElementOf<typeof VAR_TAG> {
  return createElement(VAR_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance var elements within a given root.
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
export function enhanceVars(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for var.
  void root;
}
