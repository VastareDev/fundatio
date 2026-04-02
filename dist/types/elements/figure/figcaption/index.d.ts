/**
 * Fundatio Design Foundation: Figcaption element helpers.
 *
 * @remarks
 * The figcaption element (`<figcaption>`) represents a caption or legend for
 * the rest of the contents of its parent `<figure>` element.
 *
 * Best-practice guidance (summary):
 * - Use `<figcaption>` as the caption for a `<figure>`.
 * - Place it as the first or last child of the `<figure>` where possible.
 * - Keep the visible caption text human-friendly and meaningful.
 * - Do not use `<figcaption>` purely for styling. Use CSS instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<figcaption>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for figcaption.
 *
 * @category Constants
 */
export declare const FIGCAPTION_TAG: "figcaption";
/**
 * A CSS selector targeting figcaption elements.
 *
 * @category Constants
 */
export declare const FIGCAPTION_SELECTOR = "figcaption";
/**
 * Attribute bag for figcaption creation/enhancement.
 *
 * @remarks
 * `<figcaption>` supports standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type FigcaptionAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a figcaption element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the figcaption element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<figcaption>` element.
 *
 * @example
 * ```ts
 * import { createFigcaption } from "@Vastare/Fundatio/elements/figure/figcaption";
 *
 * const c = createFigcaption("Kitchen layout, 2026", { className: "caption" });
 * document.body.appendChild(c);
 * ```
 *
 * @category DOM
 */
export declare function createFigcaption(text?: string, attrs?: FigcaptionAttrs): ElementOf<typeof FIGCAPTION_TAG>;
/**
 * Enhance figcaption elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceFigcaptions(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map