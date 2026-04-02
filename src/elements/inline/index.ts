/**
 * Inline text element factories.
 *
 * Provides framework-agnostic factory functions for semantic and typographic
 * inline elements used inside paragraphs, headings, labels, and other text
 * content.
 *
 * These factories:
 * - Create semantic inline elements using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Encourage accessible, standards-aligned markup.
 * - Prevent unsafe attribute injection.
 *
 * Inline elements refine meaning (emphasis, citations, abbreviations), express
 * user input or code, and support annotations such as Ruby text.
 *
 * @module elements/inline
 * @since 1.0.0
 */

/**
 * `<a>` element factory namespace.
 *
 * Represents a hyperlink to another location.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export * as anchor from './a';

/**
 * `<abbr>` element factory namespace.
 *
 * Represents an abbreviation or acronym, typically with a `title` expansion.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
 */
export * as abbr from './abbr';

/**
 * `<b>` element factory namespace.
 *
 * Represents stylistically offset text without conveying extra importance.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
 */
export * as b from './b';

/**
 * `<small>` element factory namespace.
 *
 * Represents side comments or small print.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
 */
export * as small from './small';

/**
 * `<strong>` element factory namespace.
 *
 * Represents strong importance, seriousness, or urgency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
 */
export * as strong from './strong';

/**
 * `<cite>` element factory namespace.
 *
 * Represents the title of a cited creative work.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
 */
export * as cite from './cite';

/**
 * `<code>` element factory namespace.
 *
 * Represents a fragment of computer code.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
 */
export * as code from './code';

/**
 * `<data>` element factory namespace.
 *
 * Associates a machine-readable value with human-readable content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
 */
export * as data from './data';

/**
 * `<dfn>` element factory namespace.
 *
 * Represents the defining instance of a term.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
 */
export * as dfn from './dfn';

/**
 * `<em>` element factory namespace.
 *
 * Represents stress emphasis.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
 */
export * as em from './em';

/**
 * `<i>` element factory namespace.
 *
 * Represents text in an alternate voice or mood, or otherwise offset from normal prose.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
 */
export * as italic from './i';

/**
 * `<kbd>` element factory namespace.
 *
 * Represents user input, typically keyboard input.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
 */
export * as kbd from './kbd';

/**
 * `<mark>` element factory namespace.
 *
 * Represents text marked or highlighted for reference.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
 */
export * as mark from './mark';

/**
 * `<q>` element factory namespace.
 *
 * Represents a short inline quotation.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
 */
export * as q from './q';

/**
 * `<rb>` element factory namespace.
 *
 * Represents the base text component of a ruby annotation.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rb
 */
export * as rb from './rb';

/**
 * `<rp>` element factory namespace.
 *
 * Represents fallback parentheses for ruby annotations.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
 */
export * as rp from './rp';

/**
 * `<rt>` element factory namespace.
 *
 * Represents ruby text, the pronunciation/annotation for base text.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
 */
export * as rt from './rt';

/**
 * `<rtc>` element factory namespace.
 *
 * Represents a ruby text container for semantic annotation groups.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rtc
 */
export * as rtc from './rtc';

/**
 * `<ruby>` element factory namespace.
 *
 * Represents ruby annotations for East Asian typography.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
 */
export * as ruby from './ruby';

/**
 * `<s>` element factory namespace.
 *
 * Represents content that is no longer accurate or relevant.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
 */
export * as s from './s';

/**
 * `<samp>` element factory namespace.
 *
 * Represents sample output from a program or computing system.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
 */
export * as samp from './samp';

/**
 * `<sub>` element factory namespace.
 *
 * Represents subscript text.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
 */
export * as sub from './sub';

/**
 * `<sup>` element factory namespace.
 *
 * Represents superscript text.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
 */
export * as sup from './sup';

/**
 * `<time>` element factory namespace.
 *
 * Represents a specific time period, optionally with a machine-readable `datetime`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
 */
export * as time from './time';

/**
 * `<u>` element factory namespace.
 *
 * Represents unarticulated annotation, such as misspelled text or proper names in some contexts.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
 */
export * as u from './u';

/**
 * `<var>` element factory namespace.
 *
 * Represents a variable in a mathematical expression or programming context.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
 */
export * as var from './var';
