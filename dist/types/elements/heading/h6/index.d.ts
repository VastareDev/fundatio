/**
 * Fundatio Design Foundation: H6 element helpers.
 *
 * @remarks
 * The h6 element (`<h6>`) represents the lowest-ranked section heading.
 *
 * Best-practice guidance:
 * - Use headings to convey document structure, not visual styling.
 * - Do not choose heading levels based on appearance; use CSS for styling.
 * - Avoid skipping heading levels (e.g. jumping from `<h2>` to `<h6>`), unless the
 *   document structure genuinely calls for it.
 * - Keep headings short and descriptive to support accessibility navigation.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create heading elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements
 * @see https://html.spec.whatwg.org/multipage/sections.html
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
     * ID reference to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for h6 headings.
 *
 * @category Constants
 */
export declare const H6_TAG: "h6";
/**
 * A CSS selector targeting h6 elements.
 *
 * @category Constants
 */
export declare const H6_SELECTOR = "h6";
/**
 * Attribute bag for h6 creation/enhancement.
 *
 * @remarks
 * `<h6>` accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type H6Attrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an h6 element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the heading.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<h6>` element.
 *
 * @example
 * ```ts
 * import { createH6 } from "@Vastare/Fundatio/elements/heading/h6";
 *
 * const heading = createH6("Minor heading", { id: "minor" });
 * ```
 *
 * @category DOM
 */
export declare function createH6(text?: string, attrs?: H6Attrs): ElementOf<typeof H6_TAG>;
/**
 * Enhance h6 elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * It exists to establish a stable enhancement pattern across all elements.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceH6s(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map