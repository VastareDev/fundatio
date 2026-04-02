/**
 * Fundatio Design Foundation: Output element helpers.
 *
 * @remarks
 * The output element (`<output>`) represents the result of a calculation or a
 * user action, commonly used in forms to display derived values without
 * requiring focus changes.
 *
 * Best-practice guidance:
 * - Use `<output>` for computed results derived from form controls.
 * - Use the `for` attribute to associate the output with the control(s) whose
 *   values it reflects (space-separated list of element IDs).
 * - Prefer semantic HTML and native behavior over ARIA. Many browsers treat
 *   `<output>` as an ARIA live region, so updating its text may be announced by
 *   assistive technologies without moving focus.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create outputs in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/for
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/form
 *
 * @module
 * @category Elements
 */

import { createElement, type AttrValue, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for output.
 *
 * @category Constants
 */
export const OUTPUT_TAG = 'output' as const;

/**
 * A CSS selector targeting output elements.
 *
 * @category Constants
 */
export const OUTPUT_SELECTOR = 'output';

/**
 * Attribute bag for output creation/enhancement.
 *
 * @remarks
 * Output accepts standard HTML global attributes plus output-specific
 * attributes (`for`, `form`, `name`).
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type OutputAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Space-separated list of element IDs whose values contributed to the output.
   *
   * @remarks
   * This maps to the `for` attribute (yes, the HTML attribute is literally
   * called `for`).
   */
  for?: string;

  /**
   * Associates the output with a form element by ID, even if not a descendant.
   */
  form?: string;

  /**
   * Name of the output (useful in form-associated contexts).
   */
  name?: string;
};

/**
 * Normalize {@link OutputAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The output attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: OutputAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, for: htmlFor, form, name, ...rest } = attrs;

  // Start with any caller-provided attrs escape hatch (still validated by dom.ts).
  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, value: AttrValue | undefined): void => {
    if (value === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = value;
  };

  setIfUnset('for', htmlFor);
  setIfUnset('form', form);
  setIfUnset('name', name);

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const hasMergedAttrs = Object.keys(mergedAttrs).length > 0;
  const hasMappedAria = Object.keys(mappedAria).length > 0;

  const next: GlobalAttrs = { ...rest };
  if (hasMergedAttrs) next.attrs = mergedAttrs;
  if (hasMappedAria) next.aria = mappedAria;

  return next;
}

/**
 * Create an output element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the output.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<output>` element.
 *
 * @example
 * ```ts
 * import { createOutput } from "@Vastare/Fundatio/elements/form/output";
 *
 * const out = createOutput("0", { name: "result", for: "a b" });
 * ```
 *
 * @category DOM
 */
export function createOutput(text?: string, attrs?: OutputAttrs): ElementOf<typeof OUTPUT_TAG> {
  return createElement(OUTPUT_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance output elements within a given root.
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
export function enhanceOutputs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for output.
  void root;
}
