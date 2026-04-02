/**
 * Sol Design Foundation: Unordered list (ul) element helpers.
 *
 * @remarks
 * The unordered list element (`<ul>`) represents a list of items where the
 * order does not change the meaning.
 *
 * Best-practice guidance:
 * - Use `<ul>` for lists where sequence is not meaningful (use `<ol>` when it is).
 * - Ensure list children are `<li>` elements.
 * - Do not use `<ul>` purely for indentation or spacing; use CSS for layout.
 * - The legacy `type` attribute is obsolete; prefer `list-style-type` in CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<ul>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - optionally set legacy presentation attributes in a controlled way
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for unordered lists.
 *
 * @category Constants
 */
export const UL_TAG = 'ul' as const;

/**
 * A CSS selector targeting unordered list elements.
 *
 * @category Constants
 */
export const UL_SELECTOR = 'ul';

/**
 * Legacy marker style values for `<ul type="...">`.
 *
 * @remarks
 * The `type` attribute is obsolete in HTML5. Prefer CSS `list-style-type`.
 * This is included as a pragmatic escape hatch for legacy markup needs.
 *
 * @category Attributes
 */
export type UlLegacyType = 'disc' | 'circle' | 'square';

/**
 * Attribute bag for ul creation/enhancement.
 *
 * @remarks
 * `<ul>` primarily accepts standard HTML global attributes.
 *
 * Sol also supports:
 * - structured ARIA input mapped into `aria-*`
 * - optional legacy `type` mapping to the `type` attribute (obsolete)
 * - an `attrs` escape hatch, still guarded by Sol's attribute safety rules
 *
 * @category Attributes
 */
export type UlAttrs = Omit<GlobalAttrs, 'aria' | 'attrs'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Legacy bullet style hint mapped to the `type` attribute (obsolete).
   *
   * @remarks
   * Prefer CSS `list-style-type` instead.
   */
  type?: UlLegacyType;

  /**
   * Additional attributes not modeled above.
   *
   * @remarks
   * This exists as an escape hatch while still allowing Sol to apply its
   * attribute safety rules via `dom.ts`.
   */
  attrs?: GlobalAttrs['attrs'];
};

/**
 * Normalize {@link UlAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The ul attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: UlAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, type, attrs: extraAttrs, ...rest } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  // Map structured aria.
  if (aria) {
    const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

    if (Object.keys(mappedAria).length > 0) mapped.aria = mappedAria;
  }

  // Merge escape-hatch attrs and add legacy `type` if provided.
  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = { ...(extraAttrs ?? {}) };
  if (typeof type === 'string' && type.length > 0) mergedAttrs.type = type;

  if (Object.keys(mergedAttrs).length > 0) mapped.attrs = mergedAttrs;

  return mapped;
}

/**
 * Create an unordered list (`<ul>`) with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - In real documents, `<ul>` should contain `<li>` children, not raw text.
 *   The optional `text` parameter exists for consistency with Sol factories and
 *   testing convenience.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the ul.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<ul>` element.
 *
 * @example
 * ```ts
 * import { createUl } from "@lnpg/sol/elements/list/ul";
 *
 * const ul = createUl(undefined, { id: "features" });
 * document.body.appendChild(ul);
 * ```
 *
 * @category DOM
 */
export function createUl(text?: string, attrs?: UlAttrs): ElementOf<typeof UL_TAG> {
  return createElement(UL_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance unordered list elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceUls(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for ul.
  void root;
}
