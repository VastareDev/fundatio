/**
 * Sol element factory namespaces.
 *
 * Provides grouped access to all HTML element factory modules included in Sol.
 *
 * These namespaces:
 * - Expose framework-agnostic DOM factory helpers.
 * - Maintain strong TypeScript typing for attributes.
 * - Forward Sol's curated global attributes safely.
 * - Prevent unsafe attribute injection.
 * - Keep the public API stable and predictable.
 *
 * Each namespace corresponds to a semantic category of HTML elements,
 * allowing consumers to import only what they need while preserving
 * a logical structure across the library.
 *
 * @module elements
 * @since 1.0.0
 */

/**
 * Container element factories.
 *
 * Generic structural elements such as `<div>` and `<span>` used for grouping
 * and layout where no stronger semantic element is appropriate.
 */
export * as container from './container';

/**
 * Break element factories.
 *
 * Line and word break elements that influence text flow.
 */
export * as break from './break';

/**
 * Media element factories.
 *
 * Elements for embedding media such as images, video, audio, and embedded
 * external resources.
 */
export * as media from './media';

/**
 * Table element factories.
 *
 * Elements used to construct semantic tabular data structures.
 */
export * as table from './table';

/**
 * Heading element factories.
 *
 * Document heading elements (`h1`-`h6`) used to create the page outline
 * and hierarchical structure.
 */
export * as heading from './heading';

/**
 * Text content element factories.
 *
 * Elements used for paragraphs, quotations, horizontal rules, and other
 * primary textual structures.
 */
export * as text from './text';

/**
 * Inline text element factories.
 *
 * Elements that apply semantic meaning, emphasis, or annotations within
 * flowing text.
 */
export * as inline from './inline';

/**
 * List element factories.
 *
 * Elements for ordered, unordered, and description lists.
 */
export * as list from './list';

/**
 * Figure element factories.
 *
 * Elements for self-contained media, illustrations, diagrams, or code
 * samples with optional captions.
 */
export * as figure from './figure';

/**
 * Form element factories.
 *
 * Elements used to collect, validate, and submit user input.
 */
export * as form from './form';

/**
 * Interactive element factories.
 *
 * Elements that provide native interactive behaviors such as dialogs
 * and disclosure widgets.
 */
export * as interactive from './interactive';

/**
 * Responsive media element factories.
 *
 * Elements supporting responsive images, media sources, and timed text
 * tracks.
 */
export * as responsive from './responsive';

/**
 * Layout element factories.
 *
 * High-level structural elements that define the major sections of a page.
 */
export * as layout from './layout';
