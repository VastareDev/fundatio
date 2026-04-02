/**
 * Sol Design Foundation: Object element helpers.
 *
 * @remarks
 * The object element (`<object>`) embeds external resources (HTML, images, PDFs,
 * SVG, etc.) into the document.
 *
 * Best-practice guidance:
 * - Prefer purpose-built elements when available:
 *   - `<img>` for images
 *   - `<video>` / `<audio>` for media
 *   - `<iframe>` for embedded documents/interactive content (with sandboxing)
 * - Always provide a meaningful fallback inside `<object>` for unsupported content.
 * - Avoid obsolete attributes (e.g. `codebase`, `classid`, `declare`, etc.).
 * - For layout, prefer CSS. If using `width`/`height` attributes, keep them numeric.
 *
 * Attribute guidance:
 * - At least one of `data` or `type` should be provided.
 * - If neither is provided, Sol falls back to `data="about:blank"` to avoid an
 *   "empty" embed configuration while staying inert.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create object elements in vanilla JS/TS without templates
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
     * ID reference to the describing element(s), mapped to `aria-describedby`.
     */
    describedby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for object embeds.
 *
 * @category Constants
 */
export declare const OBJECT_TAG: "object";
/**
 * A CSS selector targeting object elements.
 *
 * @category Constants
 */
export declare const OBJECT_SELECTOR = "object";
/**
 * Dimension values allowed for width/height attributes.
 *
 * @remarks
 * Per best practice, keep these numeric (pixels). Prefer CSS for layout.
 *
 * @category Types
 */
export type ObjectDimension = number | `${number}`;
/**
 * Attribute bag for object creation/enhancement.
 *
 * @remarks
 * - `data` and `type` are the primary configuration attributes.
 * - Provide fallback content via `text` or by appending children after creation.
 * - Global attributes are supported, including a structured ARIA input.
 *
 * @category Attributes
 */
export type ObjectAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Address of the resource to embed (maps to `data`).
     */
    data?: string;
    /**
     * MIME type of the embedded resource (maps to `type`).
     *
     * @example
     * "text/html", "image/svg+xml", "application/pdf"
     */
    type?: string;
    /**
     * Name of the object (maps to `name`).
     */
    name?: string;
    /**
     * Associate the object with a form (maps to `form`).
     */
    form?: string;
    /**
     * Width in CSS pixels (maps to `width`).
     *
     * @remarks
     * Prefer CSS for layout.
     */
    width?: ObjectDimension;
    /**
     * Height in CSS pixels (maps to `height`).
     *
     * @remarks
     * Prefer CSS for layout.
     */
    height?: ObjectDimension;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an object element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - For richer fallback, append children after creation.
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text content for the object.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<object>` element.
 *
 * @example
 * ```ts
 * import { createObject } from "@lnpg/sol/elements/media/object";
 *
 * const obj = createObject("Your browser can't display this content.", {
 *   data: "/docs/guide.pdf",
 *   type: "application/pdf",
 *   width: 640,
 *   height: 480,
 * });
 *
 * document.body.appendChild(obj);
 * ```
 *
 * @category DOM
 */
export declare function createObject(text?: string, attrs?: ObjectAttrs): ElementOf<typeof OBJECT_TAG>;
/**
 * Enhance object elements within a given root.
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
export declare function enhanceObjects(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map