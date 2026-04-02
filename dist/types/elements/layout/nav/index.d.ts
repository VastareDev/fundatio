/**
 * Sol Design Foundation: Nav element helpers.
 *
 * @remarks
 * The nav element (`<nav>`) represents a section of a page whose purpose is to
 * provide navigation links.
 *
 * Best-practice guidance:
 * - Use `<nav>` for major navigation blocks (site navigation, table of contents).
 * - If a page has multiple navigation regions, provide an accessible name via
 *   `aria-label` or `aria-labelledby` so assistive tech can distinguish them.
 * - Avoid nesting `<nav>` elements.
 * - Prefer semantic grouping of links (e.g. lists) inside the nav.
 *
 * Sol provides small, framework-agnostic helpers so consumers can:
 * - create navigation regions without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
 * @see https://html.spec.whatwg.org/multipage/sections.html#the-nav-element
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @remarks
 * `<nav>` is a landmark with an implicit `navigation` role.
 *
 * Sol intentionally encourages naming navigation regions when multiple navs
 * exist on the same page (e.g. primary vs footer vs breadcrumb navigation).
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
 * The semantic tag name for nav.
 *
 * @category Constants
 */
export declare const NAV_TAG: "nav";
/**
 * A CSS selector targeting nav elements.
 *
 * @category Constants
 */
export declare const NAV_SELECTOR = "nav";
/**
 * Attribute bag for nav creation/enhancement.
 *
 * @remarks
 * Nav elements accept standard HTML global attributes.
 *
 * Accessibility note:
 * - `<nav>` has an implicit landmark role.
 * - The ARIA-in-HTML mapping indicates no explicit `role` is permitted for
 *   `<nav>` in normal usage. Sol therefore omits `role` from {@link NavAttrs}.
 *   Name navs via `aria-label` / `aria-labelledby` instead.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type NavAttrs = Omit<GlobalAttrs, 'aria' | 'role'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a nav element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the nav.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<nav>` element.
 *
 * @example
 * Create a labelled primary navigation region:
 * ```ts
 * import { createNav } from "@lnpg/sol/elements/layout/nav";
 *
 * const nav = createNav(undefined, { aria: { label: "Primary" }, className: "site-nav" });
 * document.body.appendChild(nav);
 * ```
 *
 * @category DOM
 */
export declare function createNav(text?: string, attrs?: NavAttrs): ElementOf<typeof NAV_TAG>;
/**
 * Enhance nav elements within a given root.
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
export declare function enhanceNavs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map