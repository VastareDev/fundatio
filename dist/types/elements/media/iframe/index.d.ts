/**
 * Fundatio Design Foundation: IFrame element helpers.
 *
 * @remarks
 * The iframe element (`<iframe>`) embeds another HTML page into the current page.
 *
 * Best-practice guidance:
 * - Prefer `<iframe>` only when you truly need third-party or isolated documents.
 * - Consider `loading="lazy"` for non-critical iframes to reduce initial load cost.
 * - Use `sandbox` with the least permissions possible when embedding untrusted content.
 * - Prefer restrictive `referrerpolicy` when embedding third-party content.
 * - Provide a meaningful `title` for accessibility (screen readers use it to identify the frame).
 * - Avoid obsolete attributes like `frameborder`; use CSS instead.
 *
 * Security notes:
 * - `srcdoc` embeds HTML directly. Fundatio does not sanitize or validate it.
 *   If you build `srcdoc` from untrusted input, that is on you (and your incident report).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create iframes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
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
 * The semantic tag name for iframe embeds.
 *
 * @category Constants
 */
export declare const IFRAME_TAG: "iframe";
/**
 * A CSS selector targeting iframe elements.
 *
 * @category Constants
 */
export declare const IFRAME_SELECTOR = "iframe";
/**
 * Allowed values for the iframe `loading` attribute.
 *
 * @category Types
 */
export type IFrameLoading = 'eager' | 'lazy';
/**
 * Allowed values for the iframe `referrerpolicy` attribute.
 *
 * @category Types
 */
export type IFrameReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
/**
 * Allowed values for the `fetchpriority` attribute.
 *
 * @category Types
 */
export type FetchPriority = 'high' | 'low' | 'auto';
/**
 * Attribute bag for iframe creation/enhancement.
 *
 * @remarks
 * Iframes accept standard HTML global attributes plus iframe-specific attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type IFrameAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Address of the document to embed.
     */
    src?: string;
    /**
     * Inline HTML to render within the iframe.
     *
     * @remarks
     * Fundatio does not sanitize `srcdoc`.
     */
    srcdoc?: string;
    /**
     * A name for the browsing context.
     */
    name?: string;
    /**
     * A space-separated list of sandbox tokens.
     *
     * @remarks
     * Use the least permissive sandbox you can.
     */
    sandbox?: string;
    /**
     * Permissions policy for the iframe (previously "feature policy").
     *
     * @remarks
     * Example: `allow="fullscreen; geolocation 'none'"`.
     */
    allow?: string;
    /**
     * Whether fullscreen is allowed.
     *
     * @remarks
     * Mirrors the `allowfullscreen` boolean attribute.
     */
    allowFullScreen?: boolean;
    /**
     * Whether the iframe should be loaded lazily or eagerly.
     */
    loading?: IFrameLoading;
    /**
     * Referrer policy for requests made by the iframe.
     */
    referrerPolicy?: IFrameReferrerPolicy;
    /**
     * Display width, in CSS pixels.
     */
    width?: number | string;
    /**
     * Display height, in CSS pixels.
     */
    height?: number | string;
    /**
     * Fetch priority hint.
     */
    fetchPriority?: FetchPriority;
    /**
     * Content Security Policy to apply to the embedded document.
     *
     * @remarks
     * Support varies by browser and context.
     */
    csp?: string;
    /**
     * Whether to use a credentialless iframe (privacy-oriented isolation).
     *
     * @remarks
     * Mirrors the `credentialless` boolean attribute where supported.
     */
    credentialless?: boolean;
};
/**
 * Create an iframe element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text content for the iframe (rarely used, but valid).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<iframe>` element.
 *
 * @example
 * ```ts
 * import { createIFrame } from "@Vastare/Fundatio/elements/media/iframe";
 *
 * document.body.appendChild(
 *   createIFrame(undefined, {
 *     title: "Embedded map",
 *     src: "https://example.com/map",
 *     loading: "lazy",
 *     sandbox: "allow-scripts allow-same-origin"
 *   })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createIFrame(text?: string, attrs?: IFrameAttrs): ElementOf<typeof IFRAME_TAG>;
/**
 * Enhance iframe elements within a given root.
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
export declare function enhanceIFrames(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map