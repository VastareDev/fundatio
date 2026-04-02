/**
 * Sol Design Foundation: Picture element helpers.
 *
 * @remarks
 * The picture element (`<picture>`) is a container used for responsive images.
 * It allows authors to provide multiple image sources (typically via child
 * `<source>` elements) and a required fallback `<img>` element.
 *
 * Best-practice guidance:
 * - Always include an `<img>` inside `<picture>` as the fallback and for
 *   accessibility. The alternative text (`alt`) belongs on the `<img>`, not on
 *   `<picture>`.
 * - Use `<source>` elements with `media` and/or `type` to provide format and
 *   breakpoint-specific sources.
 * - Prefer modern formats (e.g. AVIF/WebP) with a sensible fallback.
 *
 * Sol-specific conventions:
 * - `<picture>` has no element-specific attributes; this module applies global
 *   attributes via Sol's hardened DOM helpers (`dom.ts`), which block inline
 *   event handler attributes (e.g. `onclick`) and the raw `style` attribute
 *   string.
 * - Supports a small structured ARIA input to reduce typo-based ARIA bugs.
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
 * This is intentionally a small, typed subset mapped into {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type StructuredAria = {
    /**
     * Accessible label, mapped to `aria-label`.
     */
    label?: string;
    /**
     * ID reference(s) to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for picture containers.
 *
 * @category Constants
 */
export declare const PICTURE_TAG: "picture";
/**
 * A CSS selector targeting picture elements.
 *
 * @category Constants
 */
export declare const PICTURE_SELECTOR = "picture";
/**
 * Attribute bag for picture creation/enhancement.
 *
 * @remarks
 * `<picture>` does not define unique attributes; it is a container that affects
 * image source selection in conjunction with child `<source>` and `<img>`.
 *
 *
 * Sol supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type PictureAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a picture element with optional global attributes.
 *
 * @remarks
 * `<picture>` is a container; authors must append a fallback `<img>` and any
 * `<source>` children. The alternative text (`alt`) is provided on the `<img>`.
 *
 *
 * Global attributes are applied via Sol's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<picture>` element.
 *
 * @example
 * ```ts
 * import { createPicture } from "@lnpg/sol/elements/responsive/picture";
 *
 * const p = createPicture({ className: "hero-media" });
 * ```
 *
 * @category DOM
 */
export declare function createPicture(attrs?: PictureAttrs): ElementOf<typeof PICTURE_TAG>;
/**
 * Enhance picture elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhancePictures(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map