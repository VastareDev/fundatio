/**
 * Fundatio Design Foundation: Progress element helpers.
 *
 * @remarks
 * The progress element (`<progress>`) represents the completion progress of a task.
 *
 * Best-practice guidance:
 * - Use `<progress>` to represent task completion (downloads, uploads, multi-step flows).
 * - If the amount of work is unknown, omit `value` to produce an indeterminate progress bar.
 * - Provide fallback text content for user agents that don't render `<progress>`.
 * - When using a determinate progress bar, set `value` and (usually) `max`.
 *
 * Fundatio notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Fundatio's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<progress>` element
 * - WHATWG HTML: `progress` element IDL and defaults (`max` defaults to 1.0)
 * - MDN: `:indeterminate` and indeterminate `<progress>` when `value` is absent
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
 * The semantic tag name for progress.
 *
 * @category Constants
 */
export declare const PROGRESS_TAG: "progress";
/**
 * A CSS selector targeting progress elements.
 *
 * @category Constants
 */
export declare const PROGRESS_SELECTOR = "progress";
/**
 * Attribute bag for progress creation/enhancement.
 *
 * @remarks
 * Supported element-specific attributes:
 * - `value` (optional): when omitted, the progress bar is indeterminate
 * - `max` (optional): defaults to 1.0 when omitted (platform default)
 *
 * Fundatio behavior:
 * - If `value` is omitted, Fundatio does NOT set it, preserving indeterminate semantics.
 * - If `value` is provided and `max` is omitted, Fundatio applies `max=1` explicitly
 *   for predictable, testable output in node-based environments.
 *
 * @category Attributes
 */
export type ProgressAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Current progress value.
     *
     * @remarks
     * If omitted, the progress bar is indeterminate.
     */
    value?: number;
    /**
     * Maximum value. Must be greater than 0.
     *
     * @remarks
     * Defaults to 1.0 when omitted (platform default).
     */
    max?: number;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a progress element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text for user agents that don't render `<progress>`.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<progress>` element.
 *
 * @example
 * Indeterminate progress:
 * ```ts
 * createProgress("Loading...");
 * ```
 *
 * @example
 * Determinate progress:
 * ```ts
 * createProgress(undefined, { value: 30, max: 100 });
 * ```
 *
 * @category DOM
 */
export declare function createProgress(text?: string, attrs?: ProgressAttrs): ElementOf<typeof PROGRESS_TAG>;
/**
 * Enhance progress elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceProgresses(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map