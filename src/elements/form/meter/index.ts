/**
 * Sol Design Foundation: Meter element helpers.
 *
 * @remarks
 * The meter element (`<meter>`) represents a scalar measurement within a known range,
 * or a fractional value.
 *
 * Best-practice guidance:
 * - Use `<meter>` for a known-range measurement (e.g. disk usage, score, relevance).
 * - Do NOT use `<meter>` for task progress. Use `<progress>` for progress indication.
 * - Provide fallback text content for user agents that don't render `<meter>`.
 * - Define `min`/`max` if your `value` is not in the default 0..1 range.
 * - Use `low`/`high`/`optimum` only when you actually want "good/bad" semantics.
 *
 * Sol notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Sol's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<meter>` element
 * - WHATWG HTML: meter attributes and behavior
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
 * The semantic tag name for meter.
 *
 * @category Constants
 */
export const METER_TAG = 'meter' as const;

/**
 * A CSS selector targeting meter elements.
 *
 * @category Constants
 */
export const METER_SELECTOR = 'meter';

/**
 * Attribute bag for meter creation/enhancement.
 *
 * @remarks
 * Supported element-specific attributes:
 * - `value`, `min`, `max`, `low`, `high`, `optimum`
 * - `form` (associates the meter with a form owner by ID)
 *
 * Defaults (documented platform behavior):
 * - `min` defaults to `0` when omitted
 * - `max` defaults to `1` when omitted
 * - `value` defaults to `0` when omitted or malformed
 *
 * Sol applies these defaults as explicit attributes to keep output predictable
 * and testable even in node-based DOM shims.
 *
 * @category Attributes
 */
export type MeterAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Current numeric value.
   *
   * @remarks
   * Should be within `[min, max]` when those are defined.
   */
  value?: number;

  /**
   * Lower numeric bound of the range. Defaults to `0`.
   */
  min?: number;

  /**
   * Upper numeric bound of the range. Defaults to `1`.
   */
  max?: number;

  /**
   * Upper numeric bound of the low end of the range.
   */
  low?: number;

  /**
   * Lower numeric bound of the high end of the range.
   */
  high?: number;

  /**
   * The optimal value within the range.
   */
  optimum?: number;

  /**
   * Associates the meter with a form element by ID.
   *
   * @remarks
   * Mirrors the HTML `form` attribute used by form-associated elements.
   */
  form?: string;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link MeterAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @remarks
 * - Preserves caller-provided `attrs` escape hatch (still validated by `dom.ts`).
 * - Element-specific attributes are merged into `attrs` without overwriting keys
 *   explicitly provided by the caller.
 * - Applies predictable defaults for `min`, `max`, and `value` even if callers
 *   omit the `attrs` bag entirely.
 *
 * @param attrs - The meter attributes.
 * @returns A {@link GlobalAttrs} object.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: MeterAttrs): GlobalAttrs {
  const a: MeterAttrs = attrs ?? {};

  const { aria, value, min, max, low, high, optimum, form, ...rest } = a;

  // Start with any caller-provided attrs escape hatch (it is still validated by dom.ts).
  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  // Helper: only set if caller didn't already set the raw attribute explicitly.
  const setIfUnset = (key: string, v: AttrValue | undefined): void => {
    if (v === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = v;
  };

  // Defaults: make output deterministic even when attrs is omitted.
  setIfUnset('min', typeof min === 'number' ? min : 0);
  setIfUnset('max', typeof max === 'number' ? max : 1);
  setIfUnset('value', typeof value === 'number' ? value : 0);

  // Optional meter semantics.
  setIfUnset('low', typeof low === 'number' ? low : undefined);
  setIfUnset('high', typeof high === 'number' ? high : undefined);
  setIfUnset('optimum', typeof optimum === 'number' ? optimum : undefined);

  // Form association.
  setIfUnset('form', typeof form === 'string' ? form : undefined);

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const next: GlobalAttrs = { ...rest, attrs: mergedAttrs };

  if (Object.keys(mappedAria).length > 0) {
    next.aria = mappedAria;
  }

  return next;
}

/**
 * Create a meter element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text for user agents that don't render `<meter>`.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<meter>` element.
 *
 * @category DOM
 */
export function createMeter(text?: string, attrs?: MeterAttrs): ElementOf<typeof METER_TAG> {
  return createElement(METER_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance meter elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceMeters(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for meter.
  void root;
}
