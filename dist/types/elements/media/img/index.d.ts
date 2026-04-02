/**
 * Fundatio Design Foundation: Img element helpers.
 *
 * @remarks
 * The img element (`<img>`) embeds an image into the document.
 *
 * Best-practice guidance:
 * - The `alt` attribute must always be present.
 * - Use `alt=""` for purely decorative images.
 * - Provide meaningful alternative text for informative images.
 * - Do not rely on images alone to convey critical information.
 *
 * This module enforces:
 * - `alt` always exists (defaults to empty string if not provided)
 * - If neither `src` nor `srcset` is provided, a safe fallback
 *   `src="data:,"` is applied to avoid broken network requests
 * - All global attributes are applied via Fundatio's hardened DOM helpers
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
 * @category Attributes
 */
export type StructuredAria = {
    label?: string;
    labelledby?: string;
    hidden?: boolean;
};
/**
 * The semantic tag name for images.
 *
 * @category Constants
 */
export declare const IMG_TAG: "img";
/**
 * A CSS selector targeting img elements.
 *
 * @category Constants
 */
export declare const IMG_SELECTOR = "img";
/**
 * Img-specific attributes.
 *
 * @remarks
 * `alt` is mandatory per HTML specification.
 *
 * @category Attributes
 */
export type ImgAttrs = Omit<GlobalAttrs, 'aria'> & {
    alt?: string;
    src?: string;
    srcset?: string;
    sizes?: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    decoding?: 'sync' | 'async' | 'auto';
    referrerPolicy?: string;
    aria?: StructuredAria;
};
/**
 * Create an img element with enforced accessibility safeguards.
 *
 * @category DOM
 */
export declare function createImg(attrs?: ImgAttrs): ElementOf<typeof IMG_TAG>;
/**
 * Enhance img elements within a given root.
 *
 * @remarks
 * No runtime behaviour in v1.0.0.
 *
 * @category Enhancement
 */
export declare function enhanceImgs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map