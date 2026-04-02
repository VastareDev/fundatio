/**
 * Container element factories.
 *
 * Provides framework-agnostic factory functions for generic container
 * elements used to group flow or inline content.
 *
 * These factories:
 * - Create semantic HTML elements using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured ARIA input.
 * - Prevent unsafe attribute injection.
 *
 * @module elements/container
 * @since 1.0.0
 */
/**
 * `<div>` element factory namespace.
 *
 * Represents a generic block-level container with no semantic meaning.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
 */
export * as div from './div';
/**
 * `<span>` element factory namespace.
 *
 * Represents a generic inline container with no semantic meaning.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
 */
export * as span from './span';
//# sourceMappingURL=index.d.ts.map