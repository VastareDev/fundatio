/**
 * Form element factories.
 *
 * Provides framework-agnostic factory functions for common HTML form elements.
 *
 * These factories:
 * - Create semantic form structures using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve correct form semantics and associations (e.g. labels, fieldsets).
 * - Prevent unsafe attribute injection.
 *
 * @module elements/form
 * @since 1.0.0
 */

/**
 * `<button>` element factory namespace.
 *
 * Represents a clickable button used to submit forms, reset forms, or trigger
 * custom actions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
export * as button from './button';

/**
 * `<datalist>` element factory namespace.
 *
 * Represents a set of `<option>` suggestions for an associated `<input>`,
 * enabling autocomplete-like behavior.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
 */
export * as datalist from './datalist';

/**
 * `<fieldset>` element factory namespace.
 *
 * Represents a grouping container for related form controls, typically paired
 * with a `<legend>` that labels the group.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
 */
export * as fieldset from './fieldset';

/**
 * `<form>` element factory namespace.
 *
 * Represents a document section containing interactive controls for submitting
 * information to a web server or handling via client-side logic.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 */
export * as form from './form';

/**
 * `<input>` element factory namespace.
 *
 * Represents an interactive control for entering data. The `type` attribute
 * determines the control's behavior and UI.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */
export * as input from './input';

/**
 * `<label>` element factory namespace.
 *
 * Represents a caption for a form control, improving usability and
 * accessibility. Typically associated via the `for` attribute or by nesting.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
 */
export * as label from './label';

/**
 * `<legend>` element factory namespace.
 *
 * Represents a caption for the content of its parent `<fieldset>`, providing an
 * accessible label for grouped controls.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
 */
export * as legend from './legend';

/**
 * `<meter>` element factory namespace.
 *
 * Represents a scalar measurement within a known range, or a fractional value.
 * Use `<progress>` instead for progress over time.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
 */
export * as meter from './meter';

/**
 * `<optgroup>` element factory namespace.
 *
 * Represents a grouping of `<option>` elements within a `<select>` or
 * `<datalist>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
 */
export * as optgroup from './optgroup';

/**
 * `<option>` element factory namespace.
 *
 * Represents an item within a `<select>`, `<datalist>`, or `<optgroup>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
 */
export * as option from './option';

/**
 * `<output>` element factory namespace.
 *
 * Represents the result of a calculation or user action, commonly used in
 * forms to display derived values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
 */
export * as output from './output';

/**
 * `<progress>` element factory namespace.
 *
 * Represents the completion progress of a task, typically over time.
 * Use `<meter>` instead for a measurement within a known range.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
 */
export * as progress from './progress';

/**
 * `<select>` element factory namespace.
 *
 * Represents a control that provides a menu of options for the user to choose
 * from.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
export * as select from './select';

/**
 * `<textarea>` element factory namespace.
 *
 * Represents a multi-line plain-text editing control.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
export * as textarea from './textarea';
