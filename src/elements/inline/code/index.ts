/**
 * Fundatio Design Foundation: Code element helpers.
 *
 * @remarks
 * The code element (`<code>`) represents a fragment of computer code.
 *
 * Best-practice guidance:
 * - Use `<code>` for inline code fragments inside text.
 * - For code blocks, pair `<code>` with `<pre>` (e.g. `<pre><code>...</code></pre>`).
 * - Do not use `<code>` purely for visual styling. If the intent is presentational
 *   (monospace text), use CSS instead.
 *
 * Attributes:
 * - `<code>` has no element-specific attributes in HTML. It accepts global
 *   attributes only.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<code>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/code
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-code-element
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
 * The semantic tag name for the code element.
 *
 * @category Constants
 */
export const CODE_TAG = 'code' as const;

/**
 * A CSS selector targeting code elements.
 *
 * @category Constants
 */
export const CODE_SELECTOR = 'code';

/**
 * Attribute bag for code creation/enhancement.
 *
 * @remarks
 * `<code>` accepts standard HTML global attributes.
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
export type CodeAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link CodeAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The code attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: CodeAttrs): GlobalAttrs | undefined {
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
 * Create a code element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<code>` is phrasing content. This helper supports a simple `text`
 * convenience for cases where plain text is sufficient; consumers can still
 * append richer child nodes afterwards.
 *
 * @param text - Optional text content for the code element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<code>` element.
 *
 * @example
 * ```ts
 * import { createCode } from "@Vastare/Fundatio/elements/inline/code";
 *
 * const snippet = createCode("npm run build", { className: "cmd" });
 * document.body.appendChild(snippet);
 * ```
 *
 * @category DOM
 */
export function createCode(text?: string, attrs?: CodeAttrs): ElementOf<typeof CODE_TAG> {
  return createElement(CODE_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance code elements within a given root.
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
export function enhanceCodes(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for code.
  void root;
}
