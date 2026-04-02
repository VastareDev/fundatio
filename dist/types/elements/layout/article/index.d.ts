/**
 * Fundatio Design Foundation: Article element helpers.
 *
 * @remarks
 * The article element (`<article>`) represents a self-contained composition in a
 * document, page, application, or site that is intended to be independently
 * distributable or reusable (e.g. syndication).
 *
 * Best-practice guidance:
 * - Use `<article>` for content that makes sense on its own (blog post, news item,
 *   forum post, comment, product card, etc.).
 * - Prefer `<section>` for thematic grouping that is not independently distributable.
 * - Articles commonly include a heading (h1-h6) in their content, but this module
 *   does not enforce structure at runtime.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create article sections in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
 * @see https://html.spec.whatwg.org/multipage/sections.html#the-article-element
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
 * The semantic tag name for article.
 *
 * @category Constants
 */
export declare const ARTICLE_TAG: "article";
/**
 * A CSS selector targeting article elements.
 *
 * @category Constants
 */
export declare const ARTICLE_SELECTOR = "article";
/**
 * Attribute bag for article creation/enhancement.
 *
 * @remarks
 * Article elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type ArticleAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create an article element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the article.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<article>` element.
 *
 * @example
 * ```ts
 * import { createArticle } from "@Vastare/Fundatio/elements/layout/article";
 *
 * document.body.appendChild(
 *   createArticle(undefined, { className: "post", aria: { label: "Blog post" } })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createArticle(text?: string, attrs?: ArticleAttrs): ElementOf<typeof ARTICLE_TAG>;
/**
 * Enhance article elements within a given root.
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
export declare function enhanceArticles(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map