/**
 * Sol Design Foundation: Label element helpers.
 *
 * @remarks
 * The label element (`<label>`) represents a caption in a user interface and is
 * primarily used to provide an accessible name for a form control.
 *
 * Best-practice guidance:
 * - Always associate labels with their control:
 *   - Prefer an explicit association using `for` (Sol: {@link LabelAttrs.htmlFor})
 *     that matches the control's `id`.
 *   - Alternatively, wrap the control inside the `<label>` element.
 * - Do not rely on placeholder text as a replacement for a visible label.
 * - Keep label text concise and descriptive.
 *
 * Attributes:
 * - `<label>` supports global attributes.
 * - The only relevant label-specific content attribute is `for`, reflected in
 *   JavaScript as `htmlFor`. (The `label` element does not have a `form` content
 *   attribute; it has a `form` *IDL attribute* derived from the associated control.)
 *
 * Security:
 * - Global attribute escape hatches are guarded by Sol's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/for
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
 * The semantic tag name for label.
 *
 * @category Constants
 */
export const LABEL_TAG = 'label' as const;

/**
 * A CSS selector targeting label elements.
 *
 * @category Constants
 */
export const LABEL_SELECTOR = 'label';

/**
 * Attribute bag for label creation/enhancement.
 *
 * @remarks
 * Labels accept standard HTML global attributes.
 *
 * Label-specific:
 * - {@link LabelAttrs.htmlFor} maps to the `for` attribute, associating the label
 *   with the control whose `id` matches.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type LabelAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Associate the label with a labelable form control by ID.
   *
   * @remarks
   * This maps to the `for` content attribute.
   *
   * The value should match the `id` of a labelable element in the same document
   * tree (e.g. `<input id="email">` pairs with `<label for="email">`).
   */
  htmlFor?: string;
};

/**
 * Normalize {@link LabelAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The label attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: LabelAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, htmlFor, ...rest } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  if (typeof htmlFor === 'string' && htmlFor.length > 0) {
    mapped.attrs = {
      ...(mapped.attrs ?? {}),
      for: htmlFor,
    };
  }

  if (!aria) return mapped;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  // Only attach `aria` if something was actually defined.
  const hasMappedAria = Object.keys(mappedAria).length > 0;

  return hasMappedAria ? { ...mapped, aria: mappedAria } : mapped;
}

/**
 * Create a label element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the label.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<label>` element.
 *
 * @example
 * ```ts
 * import { createLabel } from "@lnpg/sol/elements/form/label";
 *
 * const label = createLabel("Email address", { htmlFor: "email" });
 * ```
 *
 * @category DOM
 */
export function createLabel(text?: string, attrs?: LabelAttrs): ElementOf<typeof LABEL_TAG> {
  return createElement(LABEL_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance label elements within a given root.
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
export function enhanceLabels(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for label.
  void root;
}
