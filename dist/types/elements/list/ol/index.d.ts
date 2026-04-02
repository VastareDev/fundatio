/**
 * Fundatio Design Foundation: Ordered list element helpers.
 *
 * @remarks
 * The ordered list element (`<ol>`) represents an ordered list of items.
 *
 * Best-practice guidance:
 * - Prefer `<ol>` when the order of items matters (steps, rankings, sequences).
 * - List items should be `<li>` elements (direct children).
 * - Avoid presentational attributes when possible; prefer CSS for styling.
 * - Use `start`/`reversed` only when semantics require non-default numbering.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create ordered lists in vanilla JS/TS without templates
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
 * The semantic tag name for ordered lists.
 *
 * @category Constants
 */
export declare const OL_TAG: "ol";
/**
 * A CSS selector targeting ordered list elements.
 *
 * @category Constants
 */
export declare const OL_SELECTOR = "ol";
/**
 * Allowed values for the `<ol>` `type` attribute.
 *
 * @remarks
 * While `type` is still supported by browsers, it is presentational and CSS is
 * often preferable.
 *
 * - `1`  Decimal numbers (default)
 * - `a`  Lowercase letters
 * - `A`  Uppercase letters
 * - `i`  Lowercase Roman numerals
 * - `I`  Uppercase Roman numerals
 *
 * @category Attributes
 */
export type OlType = '1' | 'a' | 'A' | 'i' | 'I';
/**
 * Attribute bag for ordered list creation/enhancement.
 *
 * @remarks
 * Ordered lists accept HTML global attributes and a small set of specific
 * attributes:
 * - `reversed` for descending numbering
 * - `start` to set the initial counter value
 * - `type` to choose the marker style (often better via CSS)
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type OlAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Whether numbering should be descending.
     */
    reversed?: boolean;
    /**
     * Starting value for the list counter.
     */
    start?: number;
    /**
     * Marker type for list items.
     */
    type?: OlType;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an ordered list element with global and list-specific attributes.
 *
 * @remarks
 * This helper intentionally does not accept raw HTML. Consumers should append
 * `<li>` children using DOM APIs.
 *
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<ol>` element.
 *
 * @example
 * ```ts
 * import { createOl } from "@Vastare/Fundatio/elements/list/ol";
 *
 * const ol = createOl({ start: 3, reversed: true, className: "steps" });
 * document.body.appendChild(ol);
 * ```
 *
 * @category DOM
 */
export declare function createOl(attrs?: OlAttrs): ElementOf<typeof OL_TAG>;
/**
 * Enhance ordered list elements within a given root.
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
export declare function enhanceOls(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map