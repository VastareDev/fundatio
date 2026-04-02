/**
 * Fundatio Design Foundation: Sup element helpers.
 *
 * @remarks
 * The sup element (`<sup>`) represents superscript text.
 *
 * Best-practice guidance:
 * - Use `<sup>` for semantic superscripts such as footnote markers, ordinal indicators,
 *   and mathematical exponents.
 * - Avoid using `<sup>` purely for visual styling; prefer CSS when semantics are not intended.
 * - For footnotes, consider pairing markers with accessible labelling (e.g. via `aria-label`)
 *   and appropriate linking patterns.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create superscript nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
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
 * The semantic tag name for superscript elements.
 *
 * @category Constants
 */
export declare const SUP_TAG: "sup";
/**
 * A CSS selector targeting sup elements.
 *
 * @category Constants
 */
export declare const SUP_SELECTOR = "sup";
/**
 * Attribute bag for sup creation/enhancement.
 *
 * @remarks
 * Sup elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type SupAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a sup element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the sup.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<sup>` element.
 *
 * @example
 * Create a footnote marker:
 * ```ts
 * import { createSup } from "@Vastare/Fundatio/elements/inline/sup";
 *
 * const marker = createSup("1", { aria: { label: "Footnote 1" } });
 * ```
 *
 * @category DOM
 */
export declare function createSup(text?: string, attrs?: SupAttrs): ElementOf<typeof SUP_TAG>;
/**
 * Enhance sup elements within a given root.
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
export declare function enhanceSups(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map