/**
 * Fundatio Design Foundation: Main element helpers.
 *
 * @remarks
 * The main element (`<main>`) represents the dominant content of the document.
 * It is a landmark element that helps assistive technologies and other tooling
 * identify the primary content area.
 *
 * Best-practice guidance:
 * - Use **only one** `<main>` per document.
 * - The content of `<main>` should be unique to the document (avoid repeated UI
 *   like nav, site chrome, copyright, etc.).
 * - Do not place `<main>` as a descendant of `<article>`, `<aside>`, `<footer>`,
 *   `<header>`, or `<nav>`.
 *
 * Attributes:
 * - `<main>` supports **global attributes only**.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create main landmarks in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: Main element (`<main>`)
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
 * The semantic tag name for main landmarks.
 *
 * @category Constants
 */
export declare const MAIN_TAG: "main";
/**
 * A CSS selector targeting main elements.
 *
 * @category Constants
 */
export declare const MAIN_SELECTOR = "main";
/**
 * Attribute bag for main creation/enhancement.
 *
 * @remarks
 * Main elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type MainAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a main element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * This helper does not enforce document-level semantics (e.g. "only one `<main>`")
 * at runtime. That is a document-authoring responsibility.
 *
 * @param text - Optional text content for the main element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<main>` element.
 *
 * @example
 * ```ts
 * import { createMain } from "@Vastare/Fundatio/elements/layout/main";
 *
 * document.body.appendChild(
 *   createMain(undefined, { id: "content", className: "page-main" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createMain(text?: string, attrs?: MainAttrs): ElementOf<typeof MAIN_TAG>;
/**
 * Enhance main elements within a given root.
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
export declare function enhanceMains(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map