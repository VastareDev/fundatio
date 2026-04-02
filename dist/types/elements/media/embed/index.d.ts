/**
 * Sol Design Foundation: Embed element helpers.
 *
 * @remarks
 * The embed element (`<embed>`) embeds external content at a point in the
 * document. Historically this was often browser plug-ins; modern browsers have
 * largely removed plug-in support, so relying on `<embed>` is frequently a poor
 * choice for general-purpose sites. Prefer purpose-built elements when possible
 * (e.g. `<img>`, `<video>`, `<audio>`, `<iframe>`, or `<object>` depending on the use case).
 *
 * Best-practice guidance:
 * - Prefer native elements over `<embed>` when there is a semantic alternative.
 * - Use the `title` attribute to label embedded content for assistive technology.
 * - `width`/`height` should be absolute pixel values (no percentages).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create embed nodes in vanilla JS/TS without templates
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
     * ID reference to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for embed.
 *
 * @category Constants
 */
export declare const EMBED_TAG: "embed";
/**
 * A CSS selector targeting embed elements.
 *
 * @category Constants
 */
export declare const EMBED_SELECTOR = "embed";
/**
 * Attribute bag for embed creation/enhancement.
 *
 * @remarks
 * `<embed>` supports global attributes plus:
 * - `src` (URL)
 * - `type` (MIME type)
 * - `width` / `height` (absolute pixel values; percentages are invalid)
 *
 * Accessibility:
 * - Provide a `title` (global attribute) to label the embedded content.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, mapped into
 * `aria-*` attributes.
 *
 * @category Attributes
 */
export type EmbedAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * URL of the resource being embedded.
     */
    src?: string;
    /**
     * MIME type used to select the appropriate handler.
     */
    type?: string;
    /**
     * Displayed width in CSS pixels (absolute; percentages are not allowed).
     */
    width?: number | string;
    /**
     * Displayed height in CSS pixels (absolute; percentages are not allowed).
     */
    height?: number | string;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an embed element and apply attributes.
 *
 * @remarks
 * Global attributes are applied via Sol's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<embed>` element.
 *
 * @example
 * ```ts
 * import { createEmbed } from "@lnpg/sol/elements/media/embed";
 *
 * document.body.appendChild(
 *   createEmbed({ src: "/files/manual.pdf", type: "application/pdf", title: "User manual" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createEmbed(attrs?: EmbedAttrs): ElementOf<typeof EMBED_TAG>;
/**
 * Enhance embed elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceEmbeds(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map