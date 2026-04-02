/**
 * Sol Design Foundation: Aside element helpers.
 *
 * @remarks
 * The aside element (`<aside>`) represents content that is tangentially related
 * to the content around it, such as sidebars, callout boxes, pull quotes, or
 * related links.
 *
 * Best-practice guidance:
 * - Use `<aside>` for content related to the surrounding section, but not part of
 *   the main narrative flow.
 * - Avoid using `<aside>` purely for visual layout. Use CSS for layout and choose
 *   semantic elements for meaning.
 * - Prefer native semantics. Only add ARIA roles when needed.
 *
 * Sol notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Sol's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<aside>` element
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
 * The semantic tag name for aside.
 *
 * @category Constants
 */
export declare const ASIDE_TAG: "aside";
/**
 * A CSS selector targeting aside elements.
 *
 * @category Constants
 */
export declare const ASIDE_SELECTOR = "aside";
/**
 * Attribute bag for aside creation/enhancement.
 *
 * @remarks
 * Aside elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type AsideAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an aside element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the aside.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<aside>` element.
 *
 * @example
 * ```ts
 * import { createAside } from "@lnpg/sol/elements/layout/aside";
 *
 * const a = createAside("Related links", { className: "sidebar" });
 * ```
 *
 * @category DOM
 */
export declare function createAside(text?: string, attrs?: AsideAttrs): ElementOf<typeof ASIDE_TAG>;
/**
 * Enhance aside elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceAsides(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map