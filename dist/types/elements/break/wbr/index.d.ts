/**
 * Fundatio Design Foundation: Wbr element helpers.
 *
 * @remarks
 * The wbr element (`<wbr>`) represents a word break opportunity.
 *
 * Best-practice guidance:
 * - Use `<wbr>` to suggest optional break points within long words or URLs.
 * - It does not force a line break; the browser decides if a break is needed.
 * - Do not use `<wbr>` for layout or spacing. Use CSS instead.
 * - `<wbr>` is a void element and must not contain text content.
 *
 * This module provides a small, framework-agnostic helper so consumers can:
 * - create word break opportunities safely in vanilla JS/TS
 * - apply consistent global attributes via Fundatio's hardened DOM helpers
 * - rely on a stable enhancement hook for future evolution
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
     * ID reference to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for word break opportunity elements.
 *
 * @category Constants
 */
export declare const WBR_TAG: "wbr";
/**
 * A CSS selector targeting wbr elements.
 *
 * @category Constants
 */
export declare const WBR_SELECTOR = "wbr";
/**
 * Attribute bag for wbr creation/enhancement.
 *
 * @remarks
 * `<wbr>` accepts only global HTML attributes.
 * It does not accept text content and has no element-specific attributes.
 *
 * @category Attributes
 */
export type WbrAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a wbr element with optional global attributes.
 *
 * @remarks
 * - `<wbr>` is a void element and does not accept text content.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<wbr>` element.
 *
 * @example
 * ```ts
 * import { createWbr } from "@Vastare/Fundatio/elements/break/wbr";
 *
 * paragraph.appendChild(createWbr());
 * ```
 *
 * @category DOM
 */
export declare function createWbr(attrs?: WbrAttrs): ElementOf<typeof WBR_TAG>;
/**
 * Enhance wbr elements within a given root.
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
export declare function enhanceWbrs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map