/**
 * Sol Design Foundation: Datalist element helpers.
 *
 * @remarks
 * The datalist element (`<datalist>`) contains a set of `<option>` elements that
 * represent permissible or recommended values for an associated form control
 * (most commonly an `<input>`), connected via the input's `list` attribute.
 *
 * Best-practice guidance:
 * - Pair a `<datalist>` with an `<input>` using a stable, unique `id` on the
 *   datalist and a matching `list` attribute on the input.
 * - Use `<datalist>` for suggestions, not strict validation. If users must pick
 *   from a fixed set, prefer `<select>`.
 * - Populate suggestions using descendant `<option>` elements, typically with
 *   `value` attributes.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<datalist>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * Attributes:
 * - `<datalist>` supports global attributes only (no element-specific content
 *   attributes).
 *
 * Security:
 * - Global attribute escape hatches are guarded by Sol's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist
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
 * The semantic tag name for datalist.
 *
 * @category Constants
 */
export const DATALIST_TAG = 'datalist' as const;

/**
 * A CSS selector targeting datalist elements.
 *
 * @category Constants
 */
export const DATALIST_SELECTOR = 'datalist';

/**
 * Attribute bag for datalist creation/enhancement.
 *
 * @remarks
 * Datalist elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type DatalistAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link DatalistAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The datalist attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: DatalistAttrs): GlobalAttrs | undefined {
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
 * Create a datalist element with optional text content and global attributes.
 *
 * @remarks
 * While `<datalist>` is typically populated with `<option>` children, this helper
 * follows Sol's consistent "optional text" factory signature for non-void elements.
 *
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the datalist (rare, but supported).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<datalist>` element.
 *
 * @example
 * ```ts
 * import { createDatalist } from "@lnpg/sol/elements/form/datalist";
 *
 * const dl = createDatalist(undefined, { id: "city-list" });
 * document.body.appendChild(dl);
 * ```
 *
 * @category DOM
 */
export function createDatalist(
  text?: string,
  attrs?: DatalistAttrs,
): ElementOf<typeof DATALIST_TAG> {
  return createElement(DATALIST_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance datalist elements within a given root.
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
export function enhanceDatalists(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for datalist.
  void root;
}
