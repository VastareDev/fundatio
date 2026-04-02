/**
 * Sol Design Foundation: Source element helpers.
 *
 * @remarks
 * The source element (`<source>`) provides one or more media resources for:
 * - `<picture>` (responsive images via `srcset`/`sizes`)
 * - `<audio>` / `<video>` (alternate encodings via `src`)
 *
 * Best-practice guidance:
 * - Use `<picture><source srcset ...></picture>` for responsive images and art direction.
 * - Use multiple `<source>` children under `<audio>/<video>` to provide fallback formats.
 * - Prefer providing a `type` when possible to help user agents skip unsupported formats.
 * - Use `media` to gate sources behind media conditions.
 * - Only use `sizes` when `srcset` is present (it is meaningless otherwise).
 *
 * Attributes (element-specific):
 * - `src` (string): media resource URL (primarily for `<audio>/<video>` contexts).
 * - `srcSet` (string): source set candidates (primarily for `<picture>` contexts).
 * - `sizes` (string): sizes list for `srcset` selection.
 * - `type` (string): MIME type hint.
 * - `media` (string): media query condition.
 *
 * Notes:
 * - `<source>` is a void element (no text content).
 *
 * Security:
 * - Global attribute escape hatches are guarded by Sol's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source
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
 * The semantic tag name for source.
 *
 * @category Constants
 */
export declare const SOURCE_TAG: "source";
/**
 * A CSS selector targeting source elements.
 *
 * @category Constants
 */
export declare const SOURCE_SELECTOR = "source";
/**
 * Attribute bag for source creation/enhancement.
 *
 * @remarks
 * Source elements accept standard HTML global attributes plus source-specific
 * content attributes used by `<picture>`, `<audio>`, and `<video>`.
 *
 * Sol supports structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * Validation rules enforced by this module:
 * - `sizes` may only be specified when `srcSet` is provided.
 * - At least one of `src` or `srcSet` must be provided (a `<source>` without a
 *   resource is not useful).
 *
 * @category Attributes
 */
export type SourceAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Media resource URL.
     *
     * @remarks
     * Primarily used by `<audio>` and `<video>`. It is ignored when the `<source>`
     * is nested inside `<picture>`.
     */
    src?: string;
    /**
     * Image candidate source set.
     *
     * @remarks
     * Primarily used by `<picture>` responsive images.
     * Maps to the `srcset` content attribute.
     */
    srcSet?: string;
    /**
     * Sizes list describing the intended display size for `srcset` selection.
     *
     * @remarks
     * Only meaningful when `srcset` is present.
     */
    sizes?: string;
    /**
     * Media query condition for selecting this source.
     */
    media?: string;
    /**
     * MIME type hint for the resource(s).
     */
    type?: string;
};
/**
 * Create a source element with attributes.
 *
 * @remarks
 * `<source>` is a void element: it never carries text content.
 *
 * Global attributes and escape-hatch attributes are applied via Sol's shared DOM helper,
 * including security guards that block inline event handler attributes (e.g. `onclick`)
 * and raw `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<source>` element.
 *
 * @example
 * Responsive image source (picture):
 * ```ts
 * import { createSource } from "@lnpg/sol/elements/responsive/source";
 *
 * const s = createSource({
 *   srcSet: "/img/hero-800.jpg 800w, /img/hero-1600.jpg 1600w",
 *   sizes: "(max-width: 800px) 100vw, 800px",
 *   type: "image/jpeg"
 * });
 * ```
 *
 * @category DOM
 */
export declare function createSource(attrs?: SourceAttrs): ElementOf<typeof SOURCE_TAG>;
/**
 * Enhance source elements within a given root.
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
export declare function enhanceSources(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map