/**
 * Sol Design Foundation: Dt element helpers.
 *
 * @remarks
 * The dt element (`<dt>`) represents a definition term in a description list (`<dl>`).
 * It is typically paired with one or more `<dd>` elements (the descriptions/details).
 *
 * Best-practice guidance:
 * - Use `<dl>` + `<dt>` + `<dd>` for name/value groups (terms and descriptions),
 *   not for arbitrary layout or "two-column" grids.
 * - Keep terms concise; put the detail/content in `<dd>`.
 * - Use CSS for presentation (avoid presentational patterns that change semantics).
 *
 * Attributes:
 * - `<dt>` supports only global attributes (no element-specific attributes).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create dt elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * @see MDN `<dt>`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
 * @see WHATWG HTML `<dt>`: https://html.spec.whatwg.org/multipage/grouping-content.html#the-dt-element
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
 * The semantic tag name for dt elements.
 *
 * @category Constants
 */
export declare const DT_TAG: "dt";
/**
 * A CSS selector targeting dt elements.
 *
 * @category Constants
 */
export declare const DT_SELECTOR = "dt";
/**
 * Attribute bag for dt creation/enhancement.
 *
 * @remarks
 * Dt elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type DtAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a dt element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the dt.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<dt>` element.
 *
 * @example
 * ```ts
 * import { createDt } from "@lnpg/sol/elements/list/dt";
 *
 * const dl = document.createElement("dl");
 * dl.appendChild(createDt("Size"));
 * ```
 *
 * @category DOM
 */
export declare function createDt(text?: string, attrs?: DtAttrs): ElementOf<typeof DT_TAG>;
/**
 * Enhance dt elements within a given root.
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
export declare function enhanceDts(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map