/**
 * Fundatio Design Foundation: Meter element helpers.
 *
 * @remarks
 * The meter element (`<meter>`) represents a scalar measurement within a known range,
 * or a fractional value.
 *
 * Best-practice guidance:
 * - Use `<meter>` for a known-range measurement (e.g. disk usage, score, relevance).
 * - Do NOT use `<meter>` for task progress. Use `<progress>` for progress indication.
 * - Provide fallback text content for user agents that don't render `<meter>`.
 * - Define `min`/`max` if your `value` is not in the default 0..1 range.
 * - Use `low`/`high`/`optimum` only when you actually want "good/bad" semantics.
 *
 * Fundatio notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Fundatio's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<meter>` element
 * - WHATWG HTML: meter attributes and behavior
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
 * The semantic tag name for meter.
 *
 * @category Constants
 */
export declare const METER_TAG: "meter";
/**
 * A CSS selector targeting meter elements.
 *
 * @category Constants
 */
export declare const METER_SELECTOR = "meter";
/**
 * Attribute bag for meter creation/enhancement.
 *
 * @remarks
 * Supported element-specific attributes:
 * - `value`, `min`, `max`, `low`, `high`, `optimum`
 * - `form` (associates the meter with a form owner by ID)
 *
 * Defaults (documented platform behavior):
 * - `min` defaults to `0` when omitted
 * - `max` defaults to `1` when omitted
 * - `value` defaults to `0` when omitted or malformed
 *
 * Fundatio applies these defaults as explicit attributes to keep output predictable
 * and testable even in node-based DOM shims.
 *
 * @category Attributes
 */
export type MeterAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Current numeric value.
     *
     * @remarks
     * Should be within `[min, max]` when those are defined.
     */
    value?: number;
    /**
     * Lower numeric bound of the range. Defaults to `0`.
     */
    min?: number;
    /**
     * Upper numeric bound of the range. Defaults to `1`.
     */
    max?: number;
    /**
     * Upper numeric bound of the low end of the range.
     */
    low?: number;
    /**
     * Lower numeric bound of the high end of the range.
     */
    high?: number;
    /**
     * The optimal value within the range.
     */
    optimum?: number;
    /**
     * Associates the meter with a form element by ID.
     *
     * @remarks
     * Mirrors the HTML `form` attribute used by form-associated elements.
     */
    form?: string;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a meter element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text for user agents that don't render `<meter>`.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<meter>` element.
 *
 * @category DOM
 */
export declare function createMeter(text?: string, attrs?: MeterAttrs): ElementOf<typeof METER_TAG>;
/**
 * Enhance meter elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceMeters(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map