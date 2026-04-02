/**
 * Fundatio Design Foundation: Thead element helpers.
 *
 * @remarks
 * The thead element (`<thead>`) represents the block of rows that form the
 * column headers (and related header-area rows) for a table.
 *
 * Best-practice guidance:
 * - Use `<thead>` to group header rows, typically using `<th>` cells for headers.
 * - Keep the table structure logical: `<caption>` (optional), then `<colgroup>`
 *   (optional), then `<thead>`, then `<tbody>`/`<tfoot>` as needed.
 * - Avoid deprecated presentational attributes (e.g. `align`) and use CSS instead.
 * - Prefer native table semantics; only use ARIA when you cannot express the
 *   intended structure using proper table markup.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<thead>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for thead elements.
 *
 * @category Constants
 */
export declare const THEAD_TAG: "thead";
/**
 * A CSS selector targeting thead elements.
 *
 * @category Constants
 */
export declare const THEAD_SELECTOR = "thead";
/**
 * Attribute bag for thead creation/enhancement.
 *
 * @remarks
 * Thead elements accept standard HTML global attributes.
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
export type TheadAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a thead element with global attributes.
 *
 * @remarks
 * - `<thead>` is a structural table element. Fundatio does not accept a text argument
 *   for this factory. Populate it with `<tr>` and header cells (`<th>`) as needed.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<thead>` element.
 *
 * @example
 * Create and append a thead:
 * ```ts
 * import { createThead } from "@Vastare/Fundatio/elements/table/thead";
 *
 * const thead = createThead({ className: "table-head" });
 * table.appendChild(thead);
 * ```
 *
 * @category DOM
 */
export declare function createThead(attrs?: TheadAttrs): ElementOf<typeof THEAD_TAG>;
/**
 * Enhance thead elements within a given root.
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
export declare function enhanceTheads(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map