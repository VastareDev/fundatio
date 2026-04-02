/**
 * Fundatio Design Foundation: i element helpers.
 *
 * @remarks
 * The i element (`<i>`) represents a range of text set off from the normal prose
 * for some reason, such as:
 * - idiomatic text / alternate voice or mood
 * - technical terms
 * - taxonomical designations
 * - transliterations
 *
 * Best-practice guidance:
 * - Do not use `<i>` purely for visual italics. Use CSS when the intent is
 *   presentational rather than semantic.
 * - If you mean emphasis (stress), use `<em>`.
 * - If you mean importance, use `<strong>`.
 * - If you mean the title of a work, use `<cite>`.
 *
 * Attributes:
 * - `<i>` has no element-specific attributes in HTML. It accepts global
 *   attributes only.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<i>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/i
 * @see https://html.spec.whatwg.org/multipage/text-level-semantics.html
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
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
 * The semantic tag name for the i element.
 *
 * @category Constants
 */
export declare const I_TAG: "i";
/**
 * A CSS selector targeting i elements.
 *
 * @category Constants
 */
export declare const I_SELECTOR = "i";
/**
 * Attribute bag for i creation/enhancement.
 *
 * @remarks
 * `<i>` accepts standard HTML global attributes.
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
export type IAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an i element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<i>` is phrasing content. This helper supports a simple `text`
 * convenience for cases where plain text is sufficient; consumers can still
 * append richer child nodes afterwards.
 *
 * @param text - Optional text content for the i element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<i>` element.
 *
 * @example
 * ```ts
 * import { createI } from "@Vastare/Fundatio/elements/inline/i";
 *
 * const term = createI("Homo sapiens", { className: "taxonomy" });
 * document.body.appendChild(term);
 * ```
 *
 * @category DOM
 */
export declare function createI(text?: string, attrs?: IAttrs): ElementOf<typeof I_TAG>;
/**
 * Enhance i elements within a given root.
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
export declare function enhanceIs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map