/**
 * Fundatio Design Foundation: Unordered list (ul) element helpers.
 *
 * @remarks
 * The unordered list element (`<ul>`) represents a list of items where the
 * order does not change the meaning.
 *
 * Best-practice guidance:
 * - Use `<ul>` for lists where sequence is not meaningful (use `<ol>` when it is).
 * - Ensure list children are `<li>` elements.
 * - Do not use `<ul>` purely for indentation or spacing; use CSS for layout.
 * - The legacy `type` attribute is obsolete; prefer `list-style-type` in CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<ul>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - optionally set legacy presentation attributes in a controlled way
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
     * ID reference to the labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for unordered lists.
 *
 * @category Constants
 */
export declare const UL_TAG: "ul";
/**
 * A CSS selector targeting unordered list elements.
 *
 * @category Constants
 */
export declare const UL_SELECTOR = "ul";
/**
 * Legacy marker style values for `<ul type="...">`.
 *
 * @remarks
 * The `type` attribute is obsolete in HTML5. Prefer CSS `list-style-type`.
 * This is included as a pragmatic escape hatch for legacy markup needs.
 *
 * @category Attributes
 */
export type UlLegacyType = 'disc' | 'circle' | 'square';
/**
 * Attribute bag for ul creation/enhancement.
 *
 * @remarks
 * `<ul>` primarily accepts standard HTML global attributes.
 *
 * Fundatio also supports:
 * - structured ARIA input mapped into `aria-*`
 * - optional legacy `type` mapping to the `type` attribute (obsolete)
 * - an `attrs` escape hatch, still guarded by Fundatio's attribute safety rules
 *
 * @category Attributes
 */
export type UlAttrs = Omit<GlobalAttrs, 'aria' | 'attrs'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Legacy bullet style hint mapped to the `type` attribute (obsolete).
     *
     * @remarks
     * Prefer CSS `list-style-type` instead.
     */
    type?: UlLegacyType;
    /**
     * Additional attributes not modeled above.
     *
     * @remarks
     * This exists as an escape hatch while still allowing Fundatio to apply its
     * attribute safety rules via `dom.ts`.
     */
    attrs?: GlobalAttrs['attrs'];
};
/**
 * Create an unordered list (`<ul>`) with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - In real documents, `<ul>` should contain `<li>` children, not raw text.
 *   The optional `text` parameter exists for consistency with Fundatio factories and
 *   testing convenience.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the ul.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<ul>` element.
 *
 * @example
 * ```ts
 * import { createUl } from "@Vastare/Fundatio/elements/list/ul";
 *
 * const ul = createUl(undefined, { id: "features" });
 * document.body.appendChild(ul);
 * ```
 *
 * @category DOM
 */
export declare function createUl(text?: string, attrs?: UlAttrs): ElementOf<typeof UL_TAG>;
/**
 * Enhance unordered list elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceUls(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map