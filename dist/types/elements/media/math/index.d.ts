/**
 * Fundatio Design Foundation: Math element helpers.
 *
 * @remarks
 * The MathML math element (`<math>`) represents mathematical notation.
 *
 * Best-practice guidance:
 * - Prefer real MathML over images for math content when possible.
 * - Use `display="block"` for standalone equations; inline math remains the default.
 * - Do not rely on raw attribute injection for behavior; keep markup semantic.
 *
 * Accessibility defaults for Fundatio v1.0.0:
 * - `<math>` is treated as decorative by default:
 *   - `aria-hidden="true"`
 *   - `tabIndex = -1`
 * - If consumers provide explicit overrides (e.g. `aria.hidden`, `tabIndex`), Fundatio
 *   respects them.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create MathML roots in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type GlobalAttrs } from '../../../ts/dom';
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
 * The semantic tag name for MathML roots.
 *
 * @category Constants
 */
export declare const MATH_TAG: "math";
/**
 * A CSS selector targeting math elements.
 *
 * @category Constants
 */
export declare const MATH_SELECTOR = "math";
/**
 * Attribute bag for math creation/enhancement.
 *
 * @remarks
 * MathML `<math>` supports the `display` attribute:
 * - `inline` (default)
 * - `block`
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type MathAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * MathML display mode.
     *
     * @remarks
     * `block` renders as a block-level equation, `inline` renders inline.
     */
    display?: 'block' | 'inline';
};
/**
 * Create a MathML `<math>` element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<math>` is not part of {@link HTMLElementTagNameMap}, so Fundatio creates it
 * via `document.createElement("math")` and narrows the type to {@link MathMLElement}.
 *
 * @param text - Optional text content for the math element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<math>` element.
 *
 * @category DOM
 */
export declare function createMath(text?: string, attrs?: MathAttrs): MathMLElement;
/**
 * Enhance math elements within a given root.
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
export declare function enhanceMath(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map