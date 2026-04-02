/**
 * Sol Design Foundation: Mark element helpers.
 *
 * @remarks
 * The mark element (`<mark>`) represents text that is marked or highlighted for
 * reference or notation because it is relevant in the current context.
 *
 * Common, semantic uses:
 * - Highlighting search matches within results or a document.
 * - Marking passages being referenced elsewhere (e.g. annotated excerpts).
 *
 * Best-practice guidance:
 * - Use `<mark>` when the highlight communicates contextual relevance, not merely
 *   a visual style.
 * - Prefer CSS for purely presentational highlighting.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create marked text spans in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
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
 * The semantic tag name for marked/highlighted text.
 *
 * @category Constants
 */
export declare const MARK_TAG: "mark";
/**
 * A CSS selector targeting mark elements.
 *
 * @category Constants
 */
export declare const MARK_SELECTOR = "mark";
/**
 * Attribute bag for mark creation/enhancement.
 *
 * @remarks
 * Mark elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type MarkAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a mark element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the mark element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<mark>` element.
 *
 * @example
 * ```ts
 * import { createMark } from "@lnpg/sol/elements/inline/mark";
 *
 * // Highlight a search match:
 * document.body.appendChild(createMark("kitchen", { className: "match" }));
 * ```
 *
 * @category DOM
 */
export declare function createMark(text?: string, attrs?: MarkAttrs): ElementOf<typeof MARK_TAG>;
/**
 * Enhance mark elements within a given root.
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
export declare function enhanceMarks(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map