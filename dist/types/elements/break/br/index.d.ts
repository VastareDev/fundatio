/**
 * Fundatio Design Foundation: Br element helpers.
 *
 * @remarks
 * The br element (`<br>`) represents a line break within phrasing content.
 *
 * Best-practice guidance:
 * - Use `<br>` only for line breaks within text (e.g. poems, addresses).
 * - Do not use `<br>` for layout or spacing. Use CSS instead.
 * - `<br>` is a void element and must not contain text content.
 *
 * This module provides a small, framework-agnostic helper so consumers can:
 * - create line breaks safely in vanilla JS/TS
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
 * The semantic tag name for line break elements.
 *
 * @category Constants
 */
export declare const BR_TAG: "br";
/**
 * A CSS selector targeting br elements.
 *
 * @category Constants
 */
export declare const BR_SELECTOR = "br";
/**
 * Attribute bag for br creation/enhancement.
 *
 * @remarks
 * `<br>` accepts only global HTML attributes.
 * It does not accept text content and has no element-specific attributes.
 *
 * @category Attributes
 */
export type BrAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a br element with optional global attributes.
 *
 * @remarks
 * - `<br>` is a void element and does not accept text content.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<br>` element.
 *
 * @example
 * ```ts
 * import { createBr } from "@Vastare/Fundatio/elements/break/br";
 *
 * paragraph.appendChild(createBr());
 * ```
 *
 * @category DOM
 */
export declare function createBr(attrs?: BrAttrs): ElementOf<typeof BR_TAG>;
/**
 * Enhance br elements within a given root.
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
export declare function enhanceBrs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map