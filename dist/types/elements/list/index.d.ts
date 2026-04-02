/**
 * List element factories.
 *
 * Provides framework-agnostic factory functions for HTML list and list-related
 * elements used to express collections of items and term/description pairs.
 *
 * These factories:
 * - Create list elements using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Encourage accessible, standards-aligned markup.
 * - Prevent unsafe attribute injection.
 *
 * List elements are the backbone of navigations, feature lists, checklists, and
 * definition/description content, while preserving semantic meaning for assistive
 * technologies.
 *
 * @module elements/list
 * @since 1.0.0
 */
/**
 * `<dd>` element factory namespace.
 *
 * Represents the description/details/value for a term in a description list (`<dl>`).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
 */
export * as dd from './dd';
/**
 * `<dl>` element factory namespace.
 *
 * Represents a description list (name-value groups), containing `<dt>` and `<dd>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
 */
export * as dl from './dl';
/**
 * `<dt>` element factory namespace.
 *
 * Represents a term/name in a description list (`<dl>`).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
 */
export * as dt from './dt';
/**
 * `<li>` element factory namespace.
 *
 * Represents a list item inside `<ul>`, `<ol>`, or `<menu>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
 */
export * as li from './li';
/**
 * `<ol>` element factory namespace.
 *
 * Represents an ordered list where item order is meaningful.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
 */
export * as ol from './ol';
/**
 * `<ul>` element factory namespace.
 *
 * Represents an unordered list where item order is not meaningful.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
 */
export * as ul from './ul';
//# sourceMappingURL=index.d.ts.map