/**
 * Fundatio Design Foundation: Li element helpers.
 *
 * @remarks
 * The list item element (`<li>`) represents an item in a list.
 *
 * Best-practice guidance:
 * - Use `<li>` only as a direct child of a list container (`<ul>`, `<ol>`, `<menu>`).
 * - Prefer semantic list structure over styling hacks.
 * - For ordered lists, use the `value` attribute/property to control numbering when needed
 *   (e.g. continuing a sequence after inserted items).
 * - Avoid the legacy `type` attribute where possible; prefer list-level semantics and CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<li>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - supply typed element-specific fields like `value`
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
 * Legacy marker type options for list items.
 *
 * @remarks
 * The `type` attribute on `<li>` is legacy and should be avoided when possible.
 * It is retained here for compatibility scenarios.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 *
 * @category Attributes
 */
export type LiMarkerType = '1' | 'a' | 'A' | 'i' | 'I';

/**
 * The semantic tag name for list items.
 *
 * @category Constants
 */
export const LI_TAG = 'li' as const;

/**
 * A CSS selector targeting list item elements.
 *
 * @category Constants
 */
export const LI_SELECTOR = 'li';

/**
 * Attribute bag for li creation/enhancement.
 *
 * @remarks
 * In addition to global attributes, `<li>` supports:
 * - `value` (primarily for `<ol>` numbering control)
 * - legacy `type` marker hint (deprecated)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 *
 * @category Attributes
 */
export type LiAttrs = Omit<GlobalAttrs, 'aria' | 'attrs'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Ordinal value for ordered lists.
   *
   * @remarks
   * When used within an `<ol>`, this sets the list item's numbering value.
   * This is modeled as a number and applied via the `HTMLLIElement.value` property.
   */
  value?: number;

  /**
   * Legacy marker type hint (deprecated).
   *
   * @remarks
   * Prefer list semantics and CSS. Retained for compatibility.
   */
  type?: LiMarkerType;

  /**
   * Additional attributes not modeled above.
   *
   * @remarks
   * This exists as an escape hatch while still allowing Fundatio to apply its
   * attribute safety rules via `dom.ts`.
   */
  attrs?: GlobalAttrs['attrs'];
};

/**
 * Normalize {@link LiAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The li attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: LiAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, type, attrs: extraAttrs, value: _value, ...rest } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  // Map structured aria.
  if (aria) {
    const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

    if (Object.keys(mappedAria).length > 0) mapped.aria = mappedAria;
  }

  // Merge extra attrs and map legacy `type` through the hardened attrs path.
  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = { ...(extraAttrs ?? {}) };
  if (typeof type === 'string' && type.length > 0) mergedAttrs.type = type;

  if (Object.keys(mergedAttrs).length > 0) mapped.attrs = mergedAttrs;

  return mapped;
}

/**
 * Create a list item element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 * - The `value` field is applied via the `HTMLLIElement.value` property for correct behavior.
 *
 * @param text - Optional text content for the list item.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<li>` element.
 *
 * @example
 * ```ts
 * import { createLi } from "@Vastare/Fundatio/elements/list/li";
 *
 * const li = createLi("Item 3", { value: 3 });
 * ```
 *
 * @category DOM
 */
export function createLi(text?: string, attrs?: LiAttrs): ElementOf<typeof LI_TAG> {
  const el = createElement(LI_TAG, toGlobalAttrs(attrs), text);

  // Apply ordered-list numbering via the DOM property.
  if (attrs && typeof attrs.value === 'number' && Number.isFinite(attrs.value)) {
    (el as unknown as HTMLLIElement).value = attrs.value;
  }

  return el;
}

/**
 * Enhance list item elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceLis(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for li.
  void root;
}
