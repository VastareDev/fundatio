/**
 * Sol Design Foundation: Q element helpers.
 *
 * @remarks
 * The q element (`<q>`) indicates that the enclosed text is a short inline
 * quotation. Most modern browsers render it with quotation punctuation. This
 * element is intended for quotations that do not require paragraph breaks; for
 * longer quotations, use `<blockquote>`. :contentReference[oaicite:3]{index=3}
 *
 * Best-practice guidance:
 * - Use `<q>` for short inline quotations; use `<blockquote>` for longer quotes.
 * - Do not manually insert quotation punctuation immediately around `<q>`; user
 *   agents may insert punctuation as part of rendering. :contentReference[oaicite:4]{index=4}
 * - If you want a visible, user-facing citation link, use an `<a>` element.
 *   The optional `cite` attribute on `<q>` is a URL for the quotation source and
 *   is often treated as metadata. :contentReference[oaicite:5]{index=5}
 *
 * Security note:
 * - Sol does not attempt to validate or sanitize URLs. If `cite` is derived from
 *   untrusted input, validate it at the application boundary.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create inline quotations in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
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
 * The semantic tag name for inline quotations.
 *
 * @category Constants
 */
export declare const Q_TAG: "q";
/**
 * A CSS selector targeting q elements.
 *
 * @category Constants
 */
export declare const Q_SELECTOR = "q";
/**
 * Attribute bag for q creation/enhancement.
 *
 * @remarks
 * The `<q>` element uses standard HTML global attributes and supports an
 * optional `cite` attribute, which provides a URL for the quotation source. :contentReference[oaicite:6]{index=6}
 *
 * Sol supports structured ARIA for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type QAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * A URL for the source of the quotation.
     *
     * @remarks
     * This reflects the `cite` attribute used by `<q>` (and `<blockquote>`).
     * User agents may expose it, but it is often treated as metadata. :contentReference[oaicite:7]{index=7}
     */
    cite?: string;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a q element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 * - The optional `cite` attribute is applied via the `attrs` escape hatch. :contentReference[oaicite:8]{index=8}
 *
 * @param text - Optional text content for the q element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<q>` element.
 *
 * @example
 * Inline quotation with source metadata:
 * ```ts
 * import { createQ } from "@lnpg/sol/elements/inline/q";
 *
 * const q = createQ("We choose to go to the Moon.", {
 *   cite: "https://example.com/speech",
 *   aria: { label: "Inline quotation" }
 * });
 *
 * document.body.appendChild(q);
 * ```
 *
 * @category DOM
 */
export declare function createQ(text?: string, attrs?: QAttrs): ElementOf<typeof Q_TAG>;
/**
 * Enhance q elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceQs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map