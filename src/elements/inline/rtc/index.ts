/**
 * Fundatio Design Foundation: Rtc element helpers.
 *
 * @remarks
 * The rtc element (`<rtc>`) is a ruby text container used within `<ruby>` to
 * group ruby annotation text components, typically for semantic annotations.
 *
 * Best-practice guidance:
 * - Use `<rtc>` only as part of `<ruby>` markup.
 * - `<rtc>` has no element-specific attributes; it accepts global attributes.
 *
 * Note on DOM typing:
 * - `<rtc>` is not part of {@link HTMLElementTagNameMap} in TypeScript's DOM
 *   typings, so Fundatio creates it via `document.createElement("rtc")` and returns
 *   an {@link HTMLElement}.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create rtc elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { applyGlobalAttrs, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for ruby text containers.
 *
 * @category Constants
 */
export const RTC_TAG = 'rtc' as const;

/**
 * A CSS selector targeting rtc elements.
 *
 * @category Constants
 */
export const RTC_SELECTOR = 'rtc';

/**
 * Attribute bag for rtc creation/enhancement.
 *
 * @remarks
 * The `<rtc>` element uses standard HTML global attributes and has no
 * element-specific attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type RtcAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link RtcAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The rtc attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: RtcAttrs): GlobalAttrs | undefined {
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
 * Create an rtc element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<rtc>` is not part of {@link HTMLElementTagNameMap}, so Fundatio creates it
 * via `document.createElement("rtc")` and returns {@link HTMLElement}.
 *
 * @param text - Optional text content for the rtc element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<rtc>` element.
 *
 * @category DOM
 */
export function createRtc(text?: string, attrs?: RtcAttrs): HTMLElement {
  const el = document.createElement(RTC_TAG);

  applyGlobalAttrs(el, toGlobalAttrs(attrs));

  if (typeof text === 'string') el.textContent = text;

  return el;
}

/**
 * Enhance rtc elements within a given root.
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
export function enhanceRtcs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for rtc.
  void root;
}
