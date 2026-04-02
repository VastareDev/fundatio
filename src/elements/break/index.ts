/**
 * Line and word break element factories.
 *
 * Provides framework-agnostic factory functions for elements that control
 * line breaking and word breaking behaviour within text flow.
 *
 * These factories:
 * - Create semantic HTML break elements using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured ARIA input where applicable.
 * - Prevent unsafe attribute injection.
 *
 * @module elements/break
 * @since 1.0.0
 */

/**
 * `<br>` element factory namespace.
 *
 * Represents a line break opportunity within text.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
 */
export * as br from './br';

/**
 * `<wbr>` element factory namespace.
 *
 * Represents a word break opportunity within text.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
 */
export * as wbr from './wbr';
