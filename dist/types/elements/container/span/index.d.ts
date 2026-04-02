/**
 * Fundatio Design Foundation: Span element helpers.
 *
 * @remarks
 * The `<span>` element is a generic inline container for phrasing content.
 * It has no inherent semantics and should be used only when no more suitable
 * semantic element exists.
 *
 * This module:
 * - Creates `<span>` elements via Fundatio's DOM helpers (no direct DOM calls).
 * - Applies a curated subset of global attributes safely.
 * - Exposes an enhancement hook (currently a no-op) for consistency and
 *   potential future progressive enhancements.
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input supported by Fundatio element factories.
 *
 * @remarks
 * This is a small, typed subset intended to prevent typo-driven ARIA bugs and
 * keep the API practical. Values are mapped into {@link GlobalAttrs.aria}.
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
 * The semantic tag name for span.
 *
 * @category Constants
 */
export declare const SPAN_TAG: "span";
/**
 * A CSS selector targeting span elements.
 *
 * @category Constants
 */
export declare const SPAN_SELECTOR = "span";
/**
 * Attribute bag for span creation/enhancement.
 *
 * @remarks
 * `<span>` supports HTML global attributes only.
 *
 * Fundatio additionally supports a typed, structured ARIA input that is mapped into
 * {@link GlobalAttrs.aria} without modifying the shared DOM helpers.
 *
 * @category Attributes
 */
export type SpanAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a span element with optional text content and global attributes.
 *
 * @remarks
 * - Text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper, which enforces:
 *   - No inline event handler attributes (e.g. `onclick`)
 *   - No raw `style` attribute injection (use the `style` object field)
 *   - No empty attribute names
 *
 * @param text - Optional text content for the span.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<span>` element.
 *
 * @category DOM
 */
export declare function createSpan(text?: string, attrs?: SpanAttrs): ElementOf<typeof SPAN_TAG>;
/**
 * Enhance span elements within a given root.
 *
 * @remarks
 * Intentionally a no-op in `1.0.0`. This exists to provide a stable, consistent
 * integration hook across element modules.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceSpans(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map