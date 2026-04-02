/**
 * Sol Design Foundation: Select element helpers.
 *
 * @remarks
 * The select element (`<select>`) is a form control for choosing one or more
 * options from a list, typically expressed via child `<option>` and `<optgroup>`
 * elements. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select?utm_source=chatgpt.com))
 *
 * Best-practice guidance:
 * - Provide an accessible name via a `<label>` or ARIA labelling.
 * - Prefer native semantics over custom "fake selects" unless you have a very
 *   good reason (and a lot of time for accessibility testing).
 * - Use `multiple` and/or `size` intentionally; they change presentation and
 *   interaction patterns. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select?utm_source=chatgpt.com))
 * - Use `autocomplete` as a hint to user agents, not a security control. (HTML Standard)
 *
 * Sol-specific conventions:
 * - Applies global attributes via Sol's hardened DOM helpers (`dom.ts`), which
 *   block inline event handler attributes (e.g. `onclick`) and the raw `style`
 *   attribute string.
 * - Supports a small structured ARIA input to reduce typo-based ARIA bugs.
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset mapped into {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type StructuredAria = {
    /**
     * Accessible label, mapped to `aria-label`.
     */
    label?: string;
    /**
     * ID reference(s) to labelling element(s), mapped to `aria-labelledby`.
     */
    labelledby?: string;
    /**
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for select controls.
 *
 * @category Constants
 */
export declare const SELECT_TAG: "select";
/**
 * A CSS selector targeting select elements.
 *
 * @category Constants
 */
export declare const SELECT_SELECTOR = "select";
/**
 * Attribute bag for select creation/enhancement.
 *
 * @remarks
 * `<select>` accepts global attributes plus a small set of form-control and
 * select-specific attributes such as `multiple` and `size`. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select?utm_source=chatgpt.com))
 *
 * Sol models the most common attributes explicitly and leaves an escape hatch via
 * {@link GlobalAttrs.attrs} for less common cases (validated by `dom.ts`).
 *
 * @category Attributes
 */
export type SelectAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * The form control name (used during submission).
     */
    name?: string;
    /**
     * Explicitly associate the control with a form by ID.
     */
    form?: string;
    /**
     * Disables the control when true.
     */
    disabled?: boolean;
    /**
     * Marks the control required for form submission.
     */
    required?: boolean;
    /**
     * Enables selection of multiple options.
     */
    multiple?: boolean;
    /**
     * Number of options visible at once. Commonly used with `multiple`.
     */
    size?: number;
    /**
     * Autofocus hint.
     */
    autofocus?: boolean;
    /**
     * Autofill hint for user agents.
     *
     * @remarks
     * Defined by HTML for form controls.
     */
    autoComplete?: string;
    /**
     * Directionality submission control (submits `name.dir`).
     *
     * @remarks
     * Defined by the HTML form-control infrastructure (`dirname`).
     */
    dirName?: string;
};
/**
 * Create a select element with optional attributes.
 *
 * @remarks
 * - `<select>` content is provided via child `<option>`/`<optgroup>` elements,
 *   not text content. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select?utm_source=chatgpt.com))
 * - Global attributes are applied via Sol's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<select>` element.
 *
 * @example
 * ```ts
 * import { createSelect } from "@lnpg/sol/elements/form/select";
 *
 * const s = createSelect({ name: "country", required: true });
 * ```
 *
 * @category DOM
 */
export declare function createSelect(attrs?: SelectAttrs): ElementOf<typeof SELECT_TAG>;
/**
 * Enhance select elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceSelects(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map