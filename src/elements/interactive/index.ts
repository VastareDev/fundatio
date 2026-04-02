/**
 * Interactive element factories.
 *
 * Provides framework-agnostic factory functions for interactive HTML elements
 * that expose built-in browser behaviors such as disclosure widgets and modal
 * dialogs.
 *
 * These factories:
 * - Create semantic interactive structures using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve correct accessibility semantics and relationships.
 * - Prevent unsafe attribute injection.
 *
 * The elements in this module provide native interactivity that browsers
 * understand without requiring JavaScript frameworks.
 *
 * @module elements/interactive
 * @since 1.0.0
 */

/**
 * `<details>` element factory namespace.
 *
 * Represents a disclosure widget that users can open and close to reveal
 * additional information.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 */
export * as details from './details';

/**
 * `<dialog>` element factory namespace.
 *
 * Represents a dialog box or interactive component such as a modal window,
 * alert, or confirmation interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 */
export * as dialog from './dialog';

/**
 * `<summary>` element factory namespace.
 *
 * Represents the summary or visible heading for a `<details>` disclosure
 * widget. Clicking the summary toggles the details content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
 */
export * as summary from './summary';
