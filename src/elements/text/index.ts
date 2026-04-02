/**
 * Text element factories.
 *
 * Provides framework-agnostic factory functions for common text and
 * text-adjacent grouping elements.
 *
 * These factories:
 * - Create semantic HTML text elements using Fundatio's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Apply sensible fallbacks where required by the HTML specification.
 * - Prevent unsafe attribute injection.
 *
 * @module elements/text
 * @since 1.0.0
 */

/**
 * `<p>` element factory namespace.
 *
 * Represents a paragraph of text (phrasing content).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
 */
export * as paragraph from './paragraph';

/**
 * `<hr>` element factory namespace.
 *
 * Represents a thematic break between paragraph-level elements.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
 */
export * as hr from './hr';

/**
 * `<pre>` element factory namespace.
 *
 * Represents preformatted text where whitespace is significant.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
 */
export * as pre from './pre';

/**
 * `<blockquote>` element factory namespace.
 *
 * Represents a section quoted from another source (an extended quotation).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
 */
export * as blockquote from './blockquote';

/**
 * `<address>` element factory namespace.
 *
 * Represents contact information for a person, people, or an organization.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 */
export * as address from './address';
