/**
 * Fundatio Design Foundation: Figure element helpers.
 *
 * @remarks
 * The figure element (`<figure>`) represents self-contained content, optionally
 * with a caption provided by a nested `<figcaption>`.
 *
 * Best-practice guidance:
 * - Use `<figure>` for content referenced from the main flow but which could be
 *   moved elsewhere without affecting the document's meaning.
 * - If a caption is present, use `<figcaption>` as the first or last child.
 * - Avoid using `<figure>` purely as a styling hook.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<figure>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
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
 * The semantic tag name for figure.
 *
 * @category Constants
 */
export declare const FIGURE_TAG: "figure";
/**
 * A CSS selector targeting figure elements.
 *
 * @category Constants
 */
export declare const FIGURE_SELECTOR = "figure";
/**
 * Attribute bag for figure creation/enhancement.
 *
 * @remarks
 * `<figure>` supports standard HTML global attributes only.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type FigureAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a figure element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<figure>` typically contains richer flow content (images, code blocks,
 * quotes, etc.). This helper supports optional text for parity with other Fundatio
 * element factories; consumers can append child nodes as needed.
 *
 * @param text - Optional text content for the figure.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<figure>` element.
 *
 * @example
 * Create a figure and append custom content:
 * ```ts
 * import { createFigure } from "@Vastare/Fundatio/elements/figure/figure";
 * import { createFigcaption } from "@Vastare/Fundatio/elements/figure/figcaption";
 *
 * const fig = createFigure(undefined, { className: "media" });
 * fig.appendChild(document.createElement("img"));
 * fig.appendChild(createFigcaption("Caption"));
 * ```
 *
 * @category DOM
 */
export declare function createFigure(text?: string, attrs?: FigureAttrs): ElementOf<typeof FIGURE_TAG>;
/**
 * Enhance figure elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceFigures(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map