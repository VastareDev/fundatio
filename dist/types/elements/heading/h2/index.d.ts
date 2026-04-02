/**
 * Fundatio Design Foundation: H2 element helpers.
 *
 * @remarks
 * The h2 element (`<h2>`) represents a second-level heading. Headings define the
 * hierarchical structure of a document and provide navigational landmarks for
 * assistive technologies. :contentReference[oaicite:1]{index=1}
 *
 * Best-practice guidance:
 * - Use headings to represent structure, not visual styling.
 * - Prefer a logical hierarchy (e.g. `<h1>` then `<h2>`, then `<h3>`), and avoid
 *   skipping levels purely for appearance. :contentReference[oaicite:2]{index=2}
 * - Keep headings concise and descriptive to support scanning and accessibility. :contentReference[oaicite:3]{index=3}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<h2>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for h2 headings.
 *
 * @category Constants
 */
export declare const H2_TAG: "h2";
/**
 * A CSS selector targeting h2 elements.
 *
 * @category Constants
 */
export declare const H2_SELECTOR = "h2";
/**
 * Attribute bag for h2 creation/enhancement.
 *
 * @remarks
 * H2 elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * Security notes:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style} instead.
 *
 * @category Attributes
 */
export type H2Attrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an h2 element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the h2.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<h2>` element.
 *
 * @example
 * Create and append a heading:
 * ```ts
 * import { createH2 } from "@Vastare/Fundatio/elements/heading/h2";
 *
 * document.body.appendChild(createH2("Section title", { className: "section-title" }));
 * ```
 *
 * @category DOM
 */
export declare function createH2(text?: string, attrs?: H2Attrs): ElementOf<typeof H2_TAG>;
/**
 * Enhance h2 elements within a given root.
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
export declare function enhanceH2s(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map