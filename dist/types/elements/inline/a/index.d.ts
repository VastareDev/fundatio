/**
 * Fundatio Design Foundation: Anchor (`a`) element helpers.
 *
 * @remarks
 * The anchor element (`<a>`) creates a hyperlink when the `href` attribute is
 * present. It can link to web pages, files, email addresses, locations within
 * the same page, or any URL-addressable resource.
 *
 * Best-practice guidance:
 * - Prefer clear, descriptive link text. Avoid "click here".
 * - If using `target="_blank"`, strongly consider `rel="noopener noreferrer"`
 *   to prevent opener-based attacks (reverse tabnabbing).
 * - Do not use `<a>` as a button. Use `<button>` for actions and controls.
 * - Validate/sanitize untrusted URLs before assigning them to `href`.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create anchors in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 * - WHATWG: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element
 * - MDN rel=noopener: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noopener
 * - MDN rel=noreferrer: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noreferrer
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
 * prevents typo-based ARIA bugs (e.g. `lable`).
 *
 * It is mapped into {@link GlobalAttrs.aria} for application by `dom.ts`.
 *
 * @category Attributes
 */
export type StructuredAria = {
    /**
     * Accessible label, mapped to `aria-label`.
     *
     * @remarks
     * Prefer `labelledby` when a visible labeling element exists.
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
 * Common targets for anchor navigation.
 *
 * @remarks
 * Browsers also accept custom named targets (e.g. `myWindow`).
 *
 * @category Attributes
 */
export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top' | (string & {});
/**
 * Allowed values for the `referrerpolicy` attribute.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/referrerpolicy
 *
 * @category Attributes
 */
export type ReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
/**
 * The semantic tag name for anchors.
 *
 * @category Constants
 */
export declare const A_TAG: "a";
/**
 * A CSS selector targeting anchor elements.
 *
 * @category Constants
 */
export declare const A_SELECTOR = "a";
/**
 * Attribute bag for anchor creation/enhancement.
 *
 * @remarks
 * Anchor elements accept standard HTML global attributes, plus link-related
 * attributes such as `href`, `target`, and `rel`.
 *
 * Security notes:
 * - Fundatio blocks unsafe attribute *names* (e.g. `onclick`, raw `style`).
 * - Fundatio does not sanitize attribute *values*. Callers must validate untrusted
 *   URLs before passing them as `href`.
 * - When `target="_blank"` is used and `rel` is not provided, Fundatio applies a
 *   conservative default: `rel="noopener noreferrer"`.
 *
 * @category Attributes
 */
export type AnchorAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Destination URL for the hyperlink.
     *
     * @remarks
     * If omitted, the anchor is not a hyperlink.
     */
    href?: string;
    /**
     * Where to display the linked URL.
     */
    target?: AnchorTarget;
    /**
     * Relationship between the current document and the linked resource.
     *
     * @remarks
     * If `target="_blank"` is used and `rel` is not provided, Fundatio applies
     * `noopener noreferrer` by default.
     */
    rel?: string;
    /**
     * Indicates the linked resource should be downloaded.
     *
     * @remarks
     * - `true` sets a bare `download` attribute.
     * - A string sets the suggested filename.
     */
    download?: boolean | string;
    /**
     * Language of the linked resource.
     */
    hreflang?: string;
    /**
     * Space-separated list of URLs to notify (POST "ping") when the link is followed.
     *
     * @remarks
     * Limited browser support; use with care.
     */
    ping?: string | string[];
    /**
     * Referrer policy for the request initiated by following the hyperlink.
     */
    referrerPolicy?: ReferrerPolicy;
    /**
     * MIME type hint for the linked resource.
     */
    type?: string;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an anchor element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the anchor.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<a>` element.
 *
 * @example
 * ```ts
 * import { createA } from "@Vastare/Fundatio/elements/inline/a";
 *
 * document.body.appendChild(
 *   createA("Read more", { href: "/docs", className: "link" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createA(text?: string, attrs?: AnchorAttrs): ElementOf<typeof A_TAG>;
/**
 * Enhance anchor elements within a given root.
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
export declare function enhanceAs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map