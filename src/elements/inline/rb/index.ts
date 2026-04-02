/**
 * Fundatio Design Foundation: rb element helpers.
 *
 * @remarks
 * The rb element (`<rb>`) represents the ruby base text: the text being
 * annotated within a `<ruby>` element.
 *
 * Best-practice guidance:
 * - Use `<rb>` to wrap each atomic segment of base text when authoring complex
 *   ruby annotations (e.g. multiple base units with paired `<rt>` annotations).
 * - For simple ruby, the base text can be implicit (`<ruby>base<rt>anno</rt></ruby>`),
 *   but using `<rb>` can improve clarity and pairing in complex markup.
 * - `<rb>` is intended to be used within `<ruby>` (or within `<rtc>` in extended
 *   ruby models), alongside `<rt>` / `<rp>` / `<rtc>` where applicable.
 *
 * Attributes:
 * - `<rb>` has no element-specific attributes in HTML. It accepts global
 *   attributes only.
 *
 * Implementation note:
 * - In HTML source, `</rb>` may be omitted in certain sequences, but Fundatio creates
 *   DOM nodes, so it always creates a concrete `<rb>` element.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<rb>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rb
 * @see https://www.w3.org/TR/html-ruby-extensions/
 *
 * @module
 * @category Elements
 */

import { createElement, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for ruby base units.
 *
 * @category Constants
 */
export const RB_TAG = 'rb' as const;

/**
 * A CSS selector targeting rb elements.
 *
 * @category Constants
 */
export const RB_SELECTOR = 'rb';

/**
 * Attribute bag for rb creation/enhancement.
 *
 * @remarks
 * `<rb>` accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * Security note:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style}.
 *
 * @category Attributes
 */
export type RbAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link RbAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The rb attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: RbAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create an rb element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<rb>` is phrasing content. This helper supports a simple `text`
 * convenience for cases where plain text is sufficient; consumers can still
 * append richer child nodes afterwards.
 *
 * @param text - Optional text content for the rb element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<rb>` element.
 *
 * @example
 * ```ts
 * import { createRb } from "@Vastare/Fundatio/elements/inline/rb";
 *
 * const rb = createRb("漢", { className: "ruby-base" });
 * ```
 *
 * @category DOM
 */
export function createRb(text?: string, attrs?: RbAttrs): HTMLElement {
  return createElement(
    RB_TAG as unknown as keyof HTMLElementTagNameMap,
    toGlobalAttrs(attrs),
    text,
  ) as unknown as HTMLElement;
}

/**
 * Enhance rb elements within a given root.
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
export function enhanceRbs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for rb.
  void root;
}
