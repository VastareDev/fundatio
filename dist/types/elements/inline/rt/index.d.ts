/**
 * Fundatio Design Foundation: Rt element helpers.
 *
 * @remarks
 * The rt element (`<rt>`) provides the ruby text component of a ruby annotation.
 * Ruby annotations are commonly used to supply pronunciation, translation, or
 * transliteration information (often in East Asian typography).
 *
 * Best-practice guidance:
 * - `<rt>` must be used within a `<ruby>` element.
 * - Use ruby for semantic annotation (pronunciation/reading aids), not for
 *   purely presentational styling.
 * - Prefer plain text via `textContent` for annotation content (Fundatio enforces
 *   this by using `textContent`, never `innerHTML`).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<rt>` nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
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
 * The semantic tag name for ruby text annotations.
 *
 * @category Constants
 */
export declare const RT_TAG: "rt";
/**
 * A CSS selector targeting rt elements.
 *
 * @category Constants
 */
export declare const RT_SELECTOR = "rt";
/**
 * Attribute bag for rt creation/enhancement.
 *
 * @remarks
 * Rt elements include only standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type RtAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an rt element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the rt element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<rt>` element.
 *
 * @example
 * ```ts
 * import { createRt } from "@Vastare/Fundatio/elements/inline/rt";
 *
 * // Intended usage: inside <ruby>
 * const rt = createRt("kan");
 * ```
 *
 * @category DOM
 */
export declare function createRt(text?: string, attrs?: RtAttrs): ElementOf<typeof RT_TAG>;
/**
 * Enhance rt elements within a given root.
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
export declare function enhanceRts(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map