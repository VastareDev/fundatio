/**
 * Layout element factories.
 *
 * Provides framework-agnostic factory functions for HTML elements used to
 * structure the major sections of a document or application.
 *
 * These factories:
 * - Create semantic layout structures using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve correct document outline and accessibility semantics.
 * - Prevent unsafe attribute injection.
 *
 * The elements in this module define the high-level structure of pages,
 * articles, navigation regions, and supporting content.
 *
 * @module elements/layout
 * @since 1.0.0
 */

/**
 * `<article>` element factory namespace.
 *
 * Represents a self-contained composition that can be independently
 * distributed or reused, such as a blog post, news article, or forum entry.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
 */
export * as article from './article';

/**
 * `<aside>` element factory namespace.
 *
 * Represents content indirectly related to the surrounding content, often
 * presented as a sidebar, pull quote, or complementary section.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
 */
export * as aside from './aside';

/**
 * `<footer>` element factory namespace.
 *
 * Represents a footer for its nearest sectioning content or sectioning root,
 * typically containing metadata, copyright information, or related links.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
 */
export * as footer from './footer';

/**
 * `<header>` element factory namespace.
 *
 * Represents introductory content or navigational aids for a page or section,
 * often containing headings, logos, or navigation elements.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
export * as header from './header';

/**
 * `<main>` element factory namespace.
 *
 * Represents the dominant content of the document body. There should only be
 * one `<main>` element per document.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
 */
export * as main from './main';

/**
 * `<nav>` element factory namespace.
 *
 * Represents a section of the page containing navigation links to other
 * pages or parts of the current page.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
 */
export * as nav from './nav';

/**
 * `<section>` element factory namespace.
 *
 * Represents a thematic grouping of content, typically with a heading.
 * Sections contribute to the document outline.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
 */
export * as section from './section';
