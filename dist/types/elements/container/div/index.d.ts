/**
 * Sol Design Foundation: Div element helpers.
 *
 * @remarks
 * The div element (`<div>`) is a non-semantic, generic container.
 *
 * Best-practice guidance:
 * - Prefer semantic elements when available (e.g. `<section>`, `<nav>`, `<article>`).
 * - Use `<div>` as a last resort when no semantic element fits.
 * - Avoid obsolete attributes like `align`; use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create div containers in vanilla JS/TS without templates
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
 * The semantic tag name for div containers.
 *
 * @category Constants
 */
export declare const DIV_TAG: "div";
/**
 * A CSS selector targeting div elements.
 *
 * @category Constants
 */
export declare const DIV_SELECTOR = "div";
/**
 * Attribute bag for div creation/enhancement.
 *
 * @remarks
 * Div elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type DivAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a div element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the div.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<div>` element.
 *
 * @example
 * Create and append a div:
 * ```ts
 * import { createDiv } from "@lnpg/sol/elements/container/div";
 *
 * document.body.appendChild(
 *   createDiv("Hello.", { className: "box", id: "root" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createDiv(text?: string, attrs?: DivAttrs): ElementOf<typeof DIV_TAG>;
/**
 * Enhance div elements within a given root.
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
export declare function enhanceDivs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map