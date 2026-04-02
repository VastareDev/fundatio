/**
 * Sol Design Foundation: Paragraph (`p`) element helpers.
 *
 * @remarks
 * The paragraph element (`<p>`) represents a paragraph: a structural grouping of
 * related phrasing content. It is a block-level element in HTML rendering
 * contexts, but its meaning is semantic, not visual.
 *
 * Best-practice guidance:
 * - Use `<p>` for paragraphs of text (phrasing content).
 * - Do not use `<p>` as a generic layout container. Prefer semantic grouping
 *   elements (e.g. `<section>`, `<article>`) or non-semantic `<div>` only when
 *   semantics do not apply.
 * - Avoid nesting block-level content inside `<p>`. In HTML parsing, a `<p>`
 *   element will auto-close when certain elements are encountered.
 * - Avoid obsolete attributes like `align`; use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create paragraphs in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
 * - WHATWG: https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
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
     *
     * @remarks
     * Prefer `labelledby` when a visible labeling element exists.
     */
    label?: string;
    /**
     * ID reference to the labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     *
     * @remarks
     * Generally avoid hiding meaningful text from assistive technology.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for paragraphs.
 *
 * @category Constants
 */
export declare const P_TAG: "p";
/**
 * A CSS selector targeting paragraph elements.
 *
 * @category Constants
 */
export declare const P_SELECTOR = "p";
/**
 * Attribute bag for paragraph creation/enhancement.
 *
 * @remarks
 * Paragraph elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type PAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a paragraph element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the paragraph.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<p>` element.
 *
 * @example
 * Create and append a paragraph:
 * ```ts
 * import { createP } from "@lnpg/sol/elements/text/p";
 *
 * document.body.appendChild(
 *   createP("Hello.", { className: "lead", id: "intro" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createP(text?: string, attrs?: PAttrs): ElementOf<typeof P_TAG>;
/**
 * Enhance paragraph elements within a given root.
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
export declare function enhancePs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map