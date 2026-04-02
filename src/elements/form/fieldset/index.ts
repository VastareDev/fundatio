/**
 * Sol Design Foundation: Fieldset element helpers.
 *
 * @remarks
 * The fieldset element (`<fieldset>`) groups related form controls, typically
 * with a `<legend>` that provides an accessible label for the group.
 *
 * Best-practice guidance:
 * - Use `<fieldset>` to group related controls (e.g. radio button sets).
 * - Prefer a meaningful `<legend>` as the first child to label the group.
 * - Do not use `<fieldset>` purely for layout; use CSS for visual grouping.
 *
 * Attribute behavior notes:
 * - When `disabled` is set on a `<fieldset>`, user agents disable descendant
 *   form controls, except those that are descendants of the fieldset's first
 *   `<legend>` child (if any). This is native platform behavior.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create fieldsets in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
 * @see https://www.w3.org/WAI/tutorials/forms/grouping/
 *
 * @module
 * @category Elements
 */

import { createElement, type AttrValue, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for fieldset groups.
 *
 * @category Constants
 */
export const FIELDSET_TAG = 'fieldset' as const;

/**
 * A CSS selector targeting fieldset elements.
 *
 * @category Constants
 */
export const FIELDSET_SELECTOR = 'fieldset';

/**
 * Attribute bag for fieldset creation/enhancement.
 *
 * @remarks
 * Fieldset accepts standard HTML global attributes plus fieldset-specific
 * attributes (`disabled`, `form`, `name`).
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type FieldsetAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Disables descendant form controls (native platform behavior).
   *
   * @remarks
   * When set, controls inside the first `<legend>` (if present) are typically
   * excluded from disabling per spec/user agent behavior.
   */
  disabled?: boolean;

  /**
   * Associates the fieldset with a form element by ID, even if not a descendant.
   */
  form?: string;

  /**
   * Name of the fieldset (submitted/associated in form processing contexts).
   */
  name?: string;
};

/**
 * Normalize {@link FieldsetAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The fieldset attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: FieldsetAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, disabled, form, name, ...rest } = attrs;

  // Start with any caller-provided attrs escape hatch (still validated by dom.ts).
  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, value: AttrValue | undefined): void => {
    if (value === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = value;
  };

  setIfUnset('form', form);
  setIfUnset('name', name);

  // Boolean attributes are represented by presence. We set empty-string when true.
  if (disabled === true) setIfUnset('disabled', '');

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const hasMappedAria = Object.keys(mappedAria).length > 0;
  const hasMergedAttrs = Object.keys(mergedAttrs).length > 0;

  const next: GlobalAttrs = { ...rest };
  if (hasMergedAttrs) next.attrs = mergedAttrs;
  if (hasMappedAria) next.aria = mappedAria;

  return next;
}

/**
 * Create a fieldset element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the fieldset (rare; most fieldsets contain child nodes).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<fieldset>` element.
 *
 * @example
 * ```ts
 * import { createFieldset } from "@lnpg/sol/elements/form/fieldset";
 *
 * const fs = createFieldset(undefined, { disabled: false });
 * // fs.appendChild(createLegend("Shipping address"));
 * ```
 *
 * @category DOM
 */
export function createFieldset(
  text?: string,
  attrs?: FieldsetAttrs,
): ElementOf<typeof FIELDSET_TAG> {
  return createElement(FIELDSET_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance fieldset elements within a given root.
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
export function enhanceFieldsets(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for fieldset.
  void root;
}
