/**
 * Sol Design Foundation: Dfn element helpers.
 *
 * @remarks
 * The dfn element (`<dfn>`) indicates the defining instance of a term.
 * The nearest containing phrasing context (often a paragraph, list item, or
 * section) should include the term's definition.
 *
 * Best-practice guidance:
 * - Use `<dfn>` for the defining instance of a term, not for general emphasis.
 * - Avoid nesting `<dfn>` inside another `<dfn>`.
 * - If you use the `title` attribute on `<dfn>`, it should contain only the term
 *   being defined (useful when the displayed text differs from the term).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create definition-term markers in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
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
 * The semantic tag name for defining instances of terms.
 *
 * @category Constants
 */
export declare const DFN_TAG: "dfn";
/**
 * A CSS selector targeting dfn elements.
 *
 * @category Constants
 */
export declare const DFN_SELECTOR = "dfn";
/**
 * Attribute bag for dfn creation/enhancement.
 *
 * @remarks
 * Dfn elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type DfnAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a dfn element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the dfn element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<dfn>` element.
 *
 * @example
 * ```ts
 * import { createDfn } from "@lnpg/sol/elements/inline/dfn";
 *
 * document.body.appendChild(
 *   createDfn("validator", { id: "term-validator" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createDfn(text?: string, attrs?: DfnAttrs): ElementOf<typeof DFN_TAG>;
/**
 * Enhance dfn elements within a given root.
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
export declare function enhanceDfns(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map