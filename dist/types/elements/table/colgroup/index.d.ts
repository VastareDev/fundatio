/**
 * Sol Design Foundation: Colgroup element helpers.
 *
 * @remarks
 * The colgroup element (`<colgroup>`) represents a group of one or more columns
 * in a table and is primarily used to apply presentation (not structure) to
 * entire columns (typically via CSS). :contentReference[oaicite:1]{index=1}
 *
 * Best-practice guidance:
 * - Use `<colgroup>` (and optionally `<col>`) to apply column-level styling
 *   without repeating styles across cells.
 * - Place `<colgroup>` inside a `<table>`, after any `<caption>` and before
 *   `<thead>`, `<tbody>`, `<tfoot>`, or `<tr>`. :contentReference[oaicite:2]{index=2}
 * - Use the `span` attribute only when the `<colgroup>` contains no `<col>`
 *   children; otherwise, define spans via `<col>` elements. :contentReference[oaicite:3]{index=3}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<colgroup>` elements in vanilla JS/TS without templates
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
 * The semantic tag name for colgroup elements.
 *
 * @category Constants
 */
export declare const COLGROUP_TAG: "colgroup";
/**
 * A CSS selector targeting colgroup elements.
 *
 * @category Constants
 */
export declare const COLGROUP_SELECTOR = "colgroup";
/**
 * Attribute bag for colgroup creation/enhancement.
 *
 * @remarks
 * Colgroup elements accept standard HTML global attributes, plus:
 * - `span`: the number of consecutive columns in the group (when no `<col>`
 *   children are present). :contentReference[oaicite:4]{index=4}
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * Security notes:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style} instead.
 *
 * @category Attributes
 */
export type ColgroupAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Number of consecutive columns spanned by this column group.
     *
     * @remarks
     * This should be a positive integer. The HTML spec clamps values above 1000
     * and treats invalid/zero values as `1` in the table model. Sol does not
     * attempt to emulate the full table model at runtime; it sets the attribute
     * when you provide a valid positive integer. :contentReference[oaicite:5]{index=5}
     *
     * Note: Not permitted when the `<colgroup>` contains one or more `<col>`
     * elements. Sol does not enforce child-structure rules; consumers control
     * their DOM trees. :contentReference[oaicite:6]{index=6}
     */
    span?: number;
};
/**
 * Create a colgroup element with global attributes.
 *
 * @remarks
 * - `<colgroup>` should not contain text content; Sol does not accept a `text`
 *   argument for this factory.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<colgroup>` element.
 *
 * @example
 * Create a colgroup that spans two columns:
 * ```ts
 * import { createColgroup } from "@lnpg/sol/elements/table/colgroup";
 *
 * const colgroup = createColgroup({ span: 2, className: "cols" });
 * table.appendChild(colgroup);
 * ```
 *
 * @category DOM
 */
export declare function createColgroup(attrs?: ColgroupAttrs): ElementOf<typeof COLGROUP_TAG>;
/**
 * Enhance colgroup elements within a given root.
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
export declare function enhanceColgroups(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map