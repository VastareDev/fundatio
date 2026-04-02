/**
 * Sol Design Foundation: Footer element helpers.
 *
 * @remarks
 * The footer element (`<footer>`) represents a footer for its nearest ancestor
 * sectioning content or sectioning root. It can be used as a page footer or as
 * a footer within an `<article>`, `<section>`, etc.
 *
 * Best-practice guidance:
 * - Use `<footer>` for information about the section it belongs to (author info,
 *   related links, legal text, etc.).
 * - Do not use `<footer>` purely for visual positioning. Layout is CSS; meaning
 *   is HTML.
 * - Prefer native semantics. Only add ARIA roles when needed.
 *
 * Sol notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Sol's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<footer>` element
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
 * The semantic tag name for footer.
 *
 * @category Constants
 */
export declare const FOOTER_TAG: "footer";
/**
 * A CSS selector targeting footer elements.
 *
 * @category Constants
 */
export declare const FOOTER_SELECTOR = "footer";
/**
 * Attribute bag for footer creation/enhancement.
 *
 * @remarks
 * Footer elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type FooterAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a footer element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the footer.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<footer>` element.
 *
 * @example
 * ```ts
 * import { createFooter } from "@lnpg/sol/elements/layout/footer";
 *
 * const f = createFooter("© 2026", { className: "site-footer" });
 * ```
 *
 * @category DOM
 */
export declare function createFooter(text?: string, attrs?: FooterAttrs): ElementOf<typeof FOOTER_TAG>;
/**
 * Enhance footer elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceFooters(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map