/**
 * Sol Design Foundation: Rtc element helpers.
 *
 * @remarks
 * The rtc element (`<rtc>`) is a ruby text container used within `<ruby>` to
 * group ruby annotation text components, typically for semantic annotations.
 *
 * Best-practice guidance:
 * - Use `<rtc>` only as part of `<ruby>` markup.
 * - `<rtc>` has no element-specific attributes; it accepts global attributes.
 *
 * Note on DOM typing:
 * - `<rtc>` is not part of {@link HTMLElementTagNameMap} in TypeScript's DOM
 *   typings, so Sol creates it via `document.createElement("rtc")` and returns
 *   an {@link HTMLElement}.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create rtc elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type GlobalAttrs } from '../../../ts/dom';
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
 * The semantic tag name for ruby text containers.
 *
 * @category Constants
 */
export declare const RTC_TAG: "rtc";
/**
 * A CSS selector targeting rtc elements.
 *
 * @category Constants
 */
export declare const RTC_SELECTOR = "rtc";
/**
 * Attribute bag for rtc creation/enhancement.
 *
 * @remarks
 * The `<rtc>` element uses standard HTML global attributes and has no
 * element-specific attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type RtcAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an rtc element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<rtc>` is not part of {@link HTMLElementTagNameMap}, so Sol creates it
 * via `document.createElement("rtc")` and returns {@link HTMLElement}.
 *
 * @param text - Optional text content for the rtc element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<rtc>` element.
 *
 * @category DOM
 */
export declare function createRtc(text?: string, attrs?: RtcAttrs): HTMLElement;
/**
 * Enhance rtc elements within a given root.
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
export declare function enhanceRtcs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map