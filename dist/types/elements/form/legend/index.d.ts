/**
 * Sol Design Foundation: Legend element helpers.
 *
 * @remarks
 * The legend element (`<legend>`) represents a caption for the content of its
 * parent `<fieldset>`. It is commonly used to label groups of related form
 * controls (e.g. radio-button groups), improving clarity and accessibility.
 *
 * Best-practice guidance:
 * - Use `<legend>` as the first child of a `<fieldset>` to label the group.
 * - Keep legend text concise and meaningful (it is typically announced with
 *   grouped controls by assistive technologies).
 * - Avoid using `<legend>` purely for layout; use CSS for styling/spacing.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<legend>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
 * @see https://www.w3.org/WAI/tutorials/forms/grouping/
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
 * The semantic tag name for legend.
 *
 * @category Constants
 */
export declare const LEGEND_TAG: "legend";
/**
 * A CSS selector targeting legend elements.
 *
 * @category Constants
 */
export declare const LEGEND_SELECTOR = "legend";
/**
 * Attribute bag for legend creation/enhancement.
 *
 * @remarks
 * Legend elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type LegendAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a legend element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the legend.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<legend>` element.
 *
 * @example
 * ```ts
 * import { createLegend } from "@lnpg/sol/elements/form/legend";
 *
 * const legend = createLegend("Delivery address");
 * ```
 *
 * @category DOM
 */
export declare function createLegend(text?: string, attrs?: LegendAttrs): ElementOf<typeof LEGEND_TAG>;
/**
 * Enhance legend elements within a given root.
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
export declare function enhanceLegends(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map