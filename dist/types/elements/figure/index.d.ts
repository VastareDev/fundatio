/**
 * Figure and figcaption element factories.
 *
 * Provides framework-agnostic factory functions for the semantic HTML
 * `<figure>` and `<figcaption>` elements.
 *
 * These factories:
 * - Create semantic figure structures using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve correct semantic relationships between media and captions.
 * - Prevent unsafe attribute injection.
 *
 * The `<figure>` element represents self-contained content such as images,
 * diagrams, code listings, or illustrations, optionally paired with a
 * `<figcaption>` that provides a caption or legend.
 *
 * @module elements/figure
 * @since 1.0.0
 */
/**
 * `<figcaption>` element factory namespace.
 *
 * Represents a caption or legend describing the contents of a `<figure>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
 */
export * as figcaption from './figcaption';
/**
 * `<figure>` element factory namespace.
 *
 * Represents self-contained content that may include media, illustrations,
 * code examples, or diagrams, optionally associated with a `<figcaption>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
 */
export * as figure from './figure';
//# sourceMappingURL=index.d.ts.map