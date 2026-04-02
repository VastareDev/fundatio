/**
 * Sol Design Foundation: Details element helpers.
 *
 * @remarks
 * The details element (`<details>`) creates a disclosure widget where content is
 * shown/hidden by toggling the element open/closed. (MDN) :contentReference[oaicite:3]{index=3}
 *
 * Best-practice guidance:
 * - Provide a visible label using a child `<summary>` element; it acts as the
 *   interactive control for toggling the parent `<details>`. (MDN) :contentReference[oaicite:4]{index=4}
 * - Use the `open` attribute to render expanded by default. (MDN) :contentReference[oaicite:5]{index=5}
 * - If using the `name` attribute to create a mutually-exclusive group, authors
 *   must avoid markup where more than one element in the same name group has
 *   `open` present. User agents may enforce exclusivity by changing `open`.
 *   (WHATWG) :contentReference[oaicite:6]{index=6}
 *
 * Sol-specific conventions:
 * - Applies global attributes via Sol's hardened DOM helpers (`dom.ts`), which
 *   block inline event handler attributes (e.g. `onclick`) and the raw `style`
 *   attribute string.
 * - Supports a small structured ARIA input to reduce typo-based ARIA bugs.
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
 * This is intentionally a small, typed subset mapped into {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type StructuredAria = {
    /**
     * Accessible label, mapped to `aria-label`.
     */
    label?: string;
    /**
     * ID reference(s) to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for details disclosure widgets.
 *
 * @category Constants
 */
export declare const DETAILS_TAG: "details";
/**
 * A CSS selector targeting details elements.
 *
 * @category Constants
 */
export declare const DETAILS_SELECTOR = "details";
/**
 * Attribute bag for details creation/enhancement.
 *
 * @remarks
 * `<details>` accepts global attributes plus:
 * - `open` (boolean attribute)
 * - `name` (creates a mutually-exclusive details name group, per spec)
 *
 * `name` grouping behavior is specified by HTML; Sol does not enforce group
 * constraints at runtime. (WHATWG) :contentReference[oaicite:7]{index=7}
 *
 * Sol also supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type DetailsAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Whether the details is open (expanded) by default.
     *
     * @remarks
     * This maps to the boolean `open` attribute. (MDN) :contentReference[oaicite:8]{index=8}
     */
    open?: boolean;
    /**
     * Name of a mutually-exclusive details group.
     *
     * @remarks
     * Details with the same `name` may form an exclusive group where at most one
     * is open at a time. (WHATWG) :contentReference[oaicite:9]{index=9}
     */
    name?: string;
};
/**
 * Create a details element with optional attributes.
 *
 * @remarks
 * - Provide a child `<summary>` for the visible label/toggle control. (MDN) :contentReference[oaicite:10]{index=10}
 * - Global attributes are applied via Sol's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<details>` element.
 *
 * @example
 * ```ts
 * import { createDetails } from "@lnpg/sol/elements/interactive/details";
 *
 * const d = createDetails({ open: true });
 * ```
 *
 * @category DOM
 */
export declare function createDetails(attrs?: DetailsAttrs): ElementOf<typeof DETAILS_TAG>;
/**
 * Enhance details elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceDetails(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map