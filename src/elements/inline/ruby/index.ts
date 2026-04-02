/**
 * Fundatio Design Foundation: ruby element helpers.
 *
 * @remarks
 * The ruby element (`<ruby>`) represents ruby annotations: small annotation text
 * rendered above, below, or next to base text (commonly used for pronunciation,
 * transliteration, or translation in East Asian typography).
 *
 * Best-practice guidance:
 * - Prefer correct ruby structure: base text followed by `<rt>` for annotation text.
 * - Use `<rp>` to provide fallback parentheses for user agents that do not support
 *   ruby rendering. Modern browsers generally ignore `<rp>` when ruby is supported,
 *   but it improves graceful degradation.
 * - For complex ruby (multiple base segments / multiple annotations), consider
 *   using `<rb>` to delimit base segments and `<rtc>` for semantic annotation groupings.
 * - Avoid using `innerHTML` for untrusted content. Fundatio assigns text via `textContent`.
 *
 * Attributes:
 * - `<ruby>` has no element-specific attributes in HTML. It accepts global
 *   attributes only.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<ruby>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-ruby-element
 * @see https://www.w3.org/TR/ruby-use-cases/
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
 * The semantic tag name for ruby annotation containers.
 *
 * @category Constants
 */
export const RUBY_TAG = 'ruby' as const;

/**
 * A CSS selector targeting ruby elements.
 *
 * @category Constants
 */
export const RUBY_SELECTOR = 'ruby';

/**
 * Attribute bag for ruby creation/enhancement.
 *
 * @remarks
 * `<ruby>` accepts standard HTML global attributes.
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
export type RubyAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link RubyAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The ruby attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: RubyAttrs): GlobalAttrs | undefined {
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
 * Create a ruby element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note:
 * - `<ruby>` typically contains mixed children (`<rt>`, `<rp>`, `<rb>`, etc.).
 *   The `text` argument is a convenience for simple cases; consumers can append
 *   richer child nodes afterwards.
 *
 * @param text - Optional text content for the ruby element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<ruby>` element.
 *
 * @example
 * ```ts
 * import { createRuby } from "@Vastare/Fundatio/elements/inline/ruby";
 *
 * const ruby = createRuby();
 * ruby.append(
 *   document.createTextNode("漢"),
 *   document.createElement("rt")
 * );
 * ```
 *
 * @category DOM
 */
export function createRuby(text?: string, attrs?: RubyAttrs): ElementOf<typeof RUBY_TAG> {
  return createElement(RUBY_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance ruby elements within a given root.
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
export function enhanceRubies(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for ruby.
  void root;
}
