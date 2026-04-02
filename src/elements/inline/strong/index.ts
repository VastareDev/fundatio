/**
 * Fundatio Design Foundation: Strong element helpers.
 *
 * @remarks
 * The strong element (`<strong>`) indicates that its contents have strong
 * importance, seriousness, or urgency. Browsers typically render it as bold,
 * but the semantic meaning is what matters. :contentReference[oaicite:3]{index=3}
 *
 * Best-practice guidance:
 * - Use `<strong>` for genuinely important text (e.g. warnings, urgent notes).
 * - Do not use `<strong>` purely for visual styling; use CSS for presentation.
 * - Do not confuse `<strong>` with `<b>`:
 *   - `<strong>` conveys importance/seriousness/urgency.
 *   - `<b>` draws attention without adding semantic importance. :contentReference[oaicite:4]{index=4}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create strong text nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
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
 * The semantic tag name for strong importance.
 *
 * @category Constants
 */
export const STRONG_TAG = 'strong' as const;

/**
 * A CSS selector targeting strong elements.
 *
 * @category Constants
 */
export const STRONG_SELECTOR = 'strong';

/**
 * Attribute bag for strong creation/enhancement.
 *
 * @remarks
 * The `<strong>` element uses standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type StrongAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link StrongAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The strong attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: StrongAttrs): GlobalAttrs | undefined {
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
 * Create a strong element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the strong element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<strong>` element.
 *
 * @example
 * Emphasize a warning:
 * ```ts
 * import { createStrong } from "@Vastare/Fundatio/elements/inline/strong";
 *
 * const warning = createStrong("Warning:", { className: "warning-label" });
 * document.body.appendChild(warning);
 * ```
 *
 * @category DOM
 */
export function createStrong(text?: string, attrs?: StrongAttrs): ElementOf<typeof STRONG_TAG> {
  return createElement(STRONG_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance strong elements within a given root.
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
export function enhanceStrongs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for strong.
  void root;
}
