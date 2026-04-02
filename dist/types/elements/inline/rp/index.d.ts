/**
 * Fundatio Design Foundation: Rp element helpers.
 *
 * @remarks
 * The rp element (`<rp>`) provides fallback parentheses (or other markers) for
 * ruby annotations when ruby rendering is not supported.
 *
 * Best-practice guidance:
 * - Use `<rp>` only inside `<ruby>` as a fallback wrapper around `<rt>` content.
 * - Keep `<rp>` content short (commonly "(" and ")").
 * - Do not use `<rp>` for general punctuation or layout. Use normal text instead.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create rp elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
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
 * The semantic tag name for rp elements.
 *
 * @category Constants
 */
export declare const RP_TAG: "rp";
/**
 * A CSS selector targeting rp elements.
 *
 * @category Constants
 */
export declare const RP_SELECTOR = "rp";
/**
 * Attribute bag for rp creation/enhancement.
 *
 * @remarks
 * Rp elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type RpAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an rp element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the rp element (commonly "(" or ")").
 * @param attrs - Optional attributes to apply.
 * @returns The created `<rp>` element.
 *
 * @example
 * Create a ruby fallback wrapper:
 * ```ts
 * import { createRp } from "@Vastare/Fundatio/elements/inline/rp";
 *
 * const open = createRp("(");
 * const close = createRp(")");
 * ```
 *
 * @category DOM
 */
export declare function createRp(text?: string, attrs?: RpAttrs): ElementOf<typeof RP_TAG>;
/**
 * Enhance rp elements within a given root.
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
export declare function enhanceRps(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map