/**
 * Fundatio Design Foundation: Small element helpers.
 *
 * @remarks
 * The small element (`<small>`) represents side comments and small print.
 *
 * Best-practice guidance:
 * - Use `<small>` for side notes, disclaimers, legal restrictions, copyright,
 *   attribution, or licensing text.
 * - Do not use `<small>` purely to make text visually smaller. Use CSS when the
 *   intent is presentational rather than semantic.
 * - Keep accessible meaning intact: if the content is important, it should be
 *   readable and not "hidden" behind styling choices.
 *
 * Attributes:
 * - `<small>` has no element-specific attributes in HTML. It accepts global
 *   attributes only.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<small>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
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
 * The semantic tag name for the small element.
 *
 * @category Constants
 */
export declare const SMALL_TAG: "small";
/**
 * A CSS selector targeting small elements.
 *
 * @category Constants
 */
export declare const SMALL_SELECTOR = "small";
/**
 * Attribute bag for small creation/enhancement.
 *
 * @remarks
 * `<small>` accepts standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * Security note:
 * - Inline event handler attributes (e.g. `onclick`) are blocked by `dom.ts`.
 * - The raw `style` attribute is blocked; use {@link GlobalAttrs.style}.
 *
 * @category Attributes
 */
export type SmallAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a small element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<small>` is phrasing content. This helper supports a simple `text`
 * convenience for cases where plain text is sufficient; consumers can still
 * append richer child nodes afterwards.
 *
 * @param text - Optional text content for the small element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<small>` element.
 *
 * @example
 * ```ts
 * import { createSmall } from "@Vastare/Fundatio/elements/inline/small";
 *
 * const legal = createSmall("Terms apply.", { className: "legal" });
 * document.body.appendChild(legal);
 * ```
 *
 * @category DOM
 */
export declare function createSmall(text?: string, attrs?: SmallAttrs): ElementOf<typeof SMALL_TAG>;
/**
 * Enhance small elements within a given root.
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
export declare function enhanceSmalls(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map