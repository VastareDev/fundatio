/**
 * Sol Design Foundation: Em element helpers.
 *
 * @remarks
 * The em element (`<em>`) marks text that has stress emphasis. Stress emphasis is
 * semantic: it can change the meaning of a sentence, and nested `<em>` elements
 * indicate a greater degree of emphasis. :contentReference[oaicite:2]{index=2}
 *
 * Best-practice guidance:
 * - Use `<em>` when you would change vocal stress if speaking the sentence.
 * - Avoid using `<em>` purely for visual styling (e.g. italics); use CSS instead.
 * - Nested `<em>` increases emphasis; do not nest for decoration. :contentReference[oaicite:3]{index=3}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create emphasis nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for stress emphasis.
 *
 * @category Constants
 */
export declare const EM_TAG: "em";
/**
 * A CSS selector targeting em elements.
 *
 * @category Constants
 */
export declare const EM_SELECTOR = "em";
/**
 * Attribute bag for em creation/enhancement.
 *
 * @remarks
 * The `<em>` element uses standard HTML global attributes. :contentReference[oaicite:4]{index=4}
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type EmAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an em element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the em element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<em>` element.
 *
 * @example
 * Stress emphasis:
 * ```ts
 * import { createEm } from "@lnpg/sol/elements/inline/em";
 *
 * const e = createEm("really", { className: "stress" });
 * document.body.appendChild(e);
 * ```
 *
 * @category DOM
 */
export declare function createEm(text?: string, attrs?: EmAttrs): ElementOf<typeof EM_TAG>;
/**
 * Enhance em elements within a given root.
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
export declare function enhanceEms(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map