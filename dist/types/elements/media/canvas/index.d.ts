/**
 * Sol Design Foundation: Canvas element helpers.
 *
 * @remarks
 * The canvas element (`<canvas>`) provides a scriptable drawing surface.
 *
 * Best-practice guidance:
 * - Prefer setting `width` and `height` attributes (not only CSS sizing) to avoid
 *   rendering distortion from bitmap scaling.
 * - Provide meaningful fallback content where appropriate (e.g. a short text
 *   alternative) as the canvas element can represent its fallback content in
 *   non-visual/unsupported contexts.
 * - If the canvas conveys information, ensure it is labeled accessibly (e.g.
 *   via `aria-label` / `aria-labelledby`) and that equivalent information is
 *   available outside the canvas where needed.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create canvas elements in vanilla JS/TS without templates
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
 * The semantic tag name for canvas.
 *
 * @category Constants
 */
export declare const CANVAS_TAG: "canvas";
/**
 * A CSS selector targeting canvas elements.
 *
 * @category Constants
 */
export declare const CANVAS_SELECTOR = "canvas";
/**
 * Attribute bag for canvas creation/enhancement.
 *
 * @remarks
 * Canvas supports:
 * - standard HTML global attributes
 * - `width` and `height` attributes for bitmap sizing
 * - structured ARIA input mapped into `aria-*`
 *
 * @category Attributes
 */
export type CanvasAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Bitmap width (in CSS pixels) for the canvas drawing surface.
     *
     * @remarks
     * Prefer this over CSS-only sizing to avoid scaling distortion.
     */
    width?: number;
    /**
     * Bitmap height (in CSS pixels) for the canvas drawing surface.
     *
     * @remarks
     * Prefer this over CSS-only sizing to avoid scaling distortion.
     */
    height?: number;
};
/**
 * Create a canvas element with optional fallback text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - `width` and `height` (if provided) are applied as attributes via the safe
 *   attribute path in `dom.ts`.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text content for the canvas.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<canvas>` element.
 *
 * @example
 * Create a 300x150 canvas with a label:
 * ```ts
 * import { createCanvas } from "@lnpg/sol/elements/media/canvas";
 *
 * const el = createCanvas(undefined, {
 *   width: 300,
 *   height: 150,
 *   aria: { label: "Sparkline chart" },
 * });
 * ```
 *
 * @category DOM
 */
export declare function createCanvas(text?: string, attrs?: CanvasAttrs): ElementOf<typeof CANVAS_TAG>;
/**
 * Enhance canvas elements within a given root.
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
export declare function enhanceCanvases(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map