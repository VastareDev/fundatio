/**
 * Fundatio Design Foundation: Option element helpers.
 *
 * @remarks
 * The option element (`<option>`) defines an item within a `<select>`, `<optgroup>`,
 * or `<datalist>` element.
 *
 * Best-practice guidance:
 * - Prefer providing a `value` for form submission semantics. If `value` is omitted,
 *   the option's value typically falls back to its text content.
 * - Use `label` when you need a shorter label for UI display or accessibility hints,
 *   but keep the option text clear and readable.
 * - Use `disabled` to prevent selection of an option (or to mark placeholders as
 *   unavailable).
 * - Use `selected` to mark the default selection in a `<select>` (usually one
 *   option should be selected by default).
 *
 * Attributes:
 * - `value` (string): the value submitted/used when selected.
 * - `label` (string): a label for the option.
 * - `disabled` (boolean): whether the option is unavailable.
 * - `selected` (boolean): whether the option is selected by default.
 *
 * Security:
 * - Global attribute escape hatches are guarded by Fundatio's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option
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
 * The semantic tag name for option.
 *
 * @category Constants
 */
export const OPTION_TAG = 'option' as const;

/**
 * A CSS selector targeting option elements.
 *
 * @category Constants
 */
export const OPTION_SELECTOR = 'option';

/**
 * Attribute bag for option creation/enhancement.
 *
 * @remarks
 * Options accept standard HTML global attributes plus a small set of option-specific
 * content attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type OptionAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * The option value.
   *
   * @remarks
   * If omitted, user agents commonly derive a value from the option's text.
   */
  value?: string;

  /**
   * A label for the option.
   *
   * @remarks
   * When present, this may be used by user agents as the option's label instead
   * of the text content in certain contexts.
   */
  label?: string;

  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the option is selected by default.
   *
   * @remarks
   * For `<select>`, `selected` commonly indicates the default selected option on
   * initial load. If multiple options are marked selected, browser behavior varies;
   * prefer a single default selection unless using a multi-select.
   */
  selected?: boolean;
};

/**
 * Normalize {@link OptionAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The option attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: OptionAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, value, label, disabled, selected, ...rest } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  const extra: NonNullable<GlobalAttrs['attrs']> = { ...(mapped.attrs ?? {}) };

  if (typeof value === 'string') extra.value = value;
  if (typeof label === 'string') extra.label = label;

  if (disabled === true) extra.disabled = true;
  if (selected === true) extra.selected = true;

  // Only attach `attrs` if something was actually defined/added.
  if (Object.keys(extra).length > 0) {
    mapped.attrs = extra;
  }

  if (!aria) return mapped;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMappedAria = Object.keys(mappedAria).length > 0;

  return hasMappedAria ? { ...mapped, aria: mappedAria } : mapped;
}

/**
 * Create an option element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes and escape-hatch attributes are applied via Fundatio's shared
 *   DOM helper, including security guards that block inline event handler
 *   attributes (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the option.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<option>` element.
 *
 * @example
 * ```ts
 * import { createOption } from "@Vastare/Fundatio/elements/form/option";
 *
 * const opt = createOption("United Kingdom", { value: "UK" });
 * ```
 *
 * @category DOM
 */
export function createOption(text?: string, attrs?: OptionAttrs): ElementOf<typeof OPTION_TAG> {
  return createElement(OPTION_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance option elements within a given root.
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
export function enhanceOptions(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for option.
  void root;
}
