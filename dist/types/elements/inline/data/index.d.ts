/**
 * Sol Design Foundation: Data (`data`) element helpers.
 *
 * @remarks
 * The data element (`<data>`) links human-readable content to a machine-readable
 * value via the `value` attribute.
 *
 * Best-practice guidance:
 * - Use `value` for canonical/machine-readable values (IDs, codes, normalized forms).
 * - Keep visible text human-friendly.
 * - Prefer explicit `value` when the machine value differs from the displayed text.
 *
 * Sol applies a sensible fallback:
 * - If `attrs.value` is omitted and `text` is provided, Sol sets `value` to `text`.
 *
 * Security notes:
 * - Sol blocks unsafe attribute *names* (e.g. `onclick`, raw `style`).
 * - Sol does not sanitize attribute *values*. Treat untrusted inputs accordingly.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 * - WHATWG: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-data-element
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
 * Allowed value types for the `value` attribute on `<data>`.
 *
 * @remarks
 * HTML treats attributes as strings. Sol allows string/number and coerces to string.
 *
 * @category Attributes
 */
export type DataValue = string | number;
/**
 * The semantic tag name for data elements.
 *
 * @category Constants
 */
export declare const DATA_TAG: "data";
/**
 * A CSS selector targeting data elements.
 *
 * @category Constants
 */
export declare const DATA_SELECTOR = "data";
/**
 * Attribute bag for data element creation/enhancement.
 *
 * @remarks
 * Data elements accept standard HTML global attributes, plus:
 * - `value`: machine-readable translation of the element's content.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type DataAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Machine-readable value for the data.
     *
     * @remarks
     * If omitted and `text` is provided, Sol falls back to using `text` as `value`.
     */
    value?: DataValue;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a data element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 * - If `attrs.value` is omitted and `text` is provided, Sol sets `value` to `text`.
 *
 * @param text - Optional human-readable content for the data element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<data>` element.
 *
 * @example
 * ```ts
 * import { createData } from "@lnpg/sol/elements/inline/data";
 *
 * document.body.appendChild(
 *   createData("Mini Ketchup", { value: 398 })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createData(text?: string, attrs?: DataAttrs): ElementOf<typeof DATA_TAG>;
/**
 * Enhance data elements within a given root.
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
export declare function enhanceDatas(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map