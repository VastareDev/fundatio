/**
 * Fundatio Design Foundation: Progress element helpers.
 *
 * @remarks
 * The progress element (`<progress>`) represents the completion progress of a task.
 *
 * Best-practice guidance:
 * - Use `<progress>` to represent task completion (downloads, uploads, multi-step flows).
 * - If the amount of work is unknown, omit `value` to produce an indeterminate progress bar.
 * - Provide fallback text content for user agents that don't render `<progress>`.
 * - When using a determinate progress bar, set `value` and (usually) `max`.
 *
 * Fundatio notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Fundatio's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<progress>` element
 * - WHATWG HTML: `progress` element IDL and defaults (`max` defaults to 1.0)
 * - MDN: `:indeterminate` and indeterminate `<progress>` when `value` is absent
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
 * The semantic tag name for progress.
 *
 * @category Constants
 */
export const PROGRESS_TAG = 'progress' as const;

/**
 * A CSS selector targeting progress elements.
 *
 * @category Constants
 */
export const PROGRESS_SELECTOR = 'progress';

/**
 * Attribute bag for progress creation/enhancement.
 *
 * @remarks
 * Supported element-specific attributes:
 * - `value` (optional): when omitted, the progress bar is indeterminate
 * - `max` (optional): defaults to 1.0 when omitted (platform default)
 *
 * Fundatio behavior:
 * - If `value` is omitted, Fundatio does NOT set it, preserving indeterminate semantics.
 * - If `value` is provided and `max` is omitted, Fundatio applies `max=1` explicitly
 *   for predictable, testable output in node-based environments.
 *
 * @category Attributes
 */
export type ProgressAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Current progress value.
   *
   * @remarks
   * If omitted, the progress bar is indeterminate.
   */
  value?: number;

  /**
   * Maximum value. Must be greater than 0.
   *
   * @remarks
   * Defaults to 1.0 when omitted (platform default).
   */
  max?: number;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link ProgressAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @remarks
 * - Preserves caller-provided `attrs` escape hatch (still validated by `dom.ts`).
 * - Element-specific attributes are merged into `attrs` without overwriting keys
 *   explicitly provided by the caller.
 * - Does NOT default `value` (keeps indeterminate semantics).
 * - Defaults `max` to `1` only when `value` is provided and caller did not supply `max`.
 *
 * @param attrs - The progress attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: ProgressAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, value, max, ...rest } = attrs;

  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, v: AttrValue | undefined): void => {
    if (v === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = v;
  };

  // Preserve indeterminate semantics: only set `value` if explicitly provided.
  const hasValue = typeof value === 'number';
  if (hasValue) setIfUnset('value', value);

  // Only default `max` in determinate mode.
  if (hasValue) {
    setIfUnset('max', typeof max === 'number' ? max : 1);
  } else {
    // If caller explicitly provides max (or via escape hatch), allow it.
    setIfUnset('max', typeof max === 'number' ? max : undefined);
  }

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
 * Create a progress element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text for user agents that don't render `<progress>`.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<progress>` element.
 *
 * @example
 * Indeterminate progress:
 * ```ts
 * createProgress("Loading...");
 * ```
 *
 * @example
 * Determinate progress:
 * ```ts
 * createProgress(undefined, { value: 30, max: 100 });
 * ```
 *
 * @category DOM
 */
export function createProgress(
  text?: string,
  attrs?: ProgressAttrs,
): ElementOf<typeof PROGRESS_TAG> {
  return createElement(PROGRESS_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance progress elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceProgresses(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for progress.
  void root;
}
