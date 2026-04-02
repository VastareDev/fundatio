/**
 * Fundatio Design Foundation: Input element helpers.
 *
 * @remarks
 * The input element (`<input>`) represents a typed data field whose behavior is
 * primarily controlled by its `type` attribute. :contentReference[oaicite:5]{index=5}
 *
 * Best-practice guidance:
 * - Prefer the most specific `type` possible (e.g. `email`, `tel`, `number`)
 *   to improve UX and validation behavior.
 * - Always provide an accessible name (visible label, `aria-label`, or
 *   `aria-labelledby`).
 * - Treat `autocomplete`, `inputmode`, and `enterkeyhint` as UX hints, not
 *   security controls. :contentReference[oaicite:6]{index=6}
 * - For `<input type="image">`, include meaningful `alt` text; while it may be
 *   technically optional, it should be provided for usability/accessibility. :contentReference[oaicite:7]{index=7}
 *
 * Fundatio-specific conventions:
 * - Defaults `type` to `"text"` unless explicitly overridden (typed field or raw
 *   attrs escape hatch), matching HTML's default behavior. :contentReference[oaicite:8]{index=8}
 * - Applies global attributes via Fundatio's hardened DOM helpers (`dom.ts`),
 *   which block inline event handler attributes (e.g. `onclick`) and the raw
 *   `style` attribute string.
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
 * Structured ARIA input supported by Fundatio element factories.
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
 * Common input `type` values.
 *
 * @remarks
 * The `type` attribute controls which control is rendered and how values are
 * processed. :contentReference[oaicite:9]{index=9}
 *
 * Fundatio models the widely used types while still allowing the raw `attrs` escape
 * hatch for unusual/experimental values.
 *
 * @category Attributes
 */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color' | 'checkbox' | 'radio' | 'file' | 'hidden' | 'image' | 'range' | 'reset' | 'submit' | 'button';
/**
 * Values for the `inputmode` hint.
 *
 * @remarks
 * `inputmode` is a hint to user agents about what kind of virtual keyboard to
 * show. :contentReference[oaicite:10]{index=10}
 *
 * @category Attributes
 */
export type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
/**
 * Values for the `enterkeyhint` hint.
 *
 * @remarks
 * Defines what action label/icon to present for the enter key on virtual
 * keyboards. :contentReference[oaicite:11]{index=11}
 *
 * @category Attributes
 */
export type EnterKeyHint = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
/**
 * Values for the `popovertargetaction` attribute when the input is used as a
 * popover invoker button.
 *
 * @category Attributes
 */
export type PopoverTargetAction = 'toggle' | 'show' | 'hide';
/**
 * The semantic tag name for inputs.
 *
 * @category Constants
 */
export declare const INPUT_TAG: "input";
/**
 * A CSS selector targeting input elements.
 *
 * @category Constants
 */
export declare const INPUT_SELECTOR = "input";
/**
 * Attribute bag for input creation/enhancement.
 *
 * @remarks
 * `<input>` supports a large surface area of attributes, many of which are
 * type-dependent. Fundatio models common attributes explicitly and provides
 * {@link GlobalAttrs.attrs} as an escape hatch (validated by `dom.ts`).
 *
 * Notes:
 * - Fundatio defaults `type` to `"text"` unless explicitly overridden. :contentReference[oaicite:12]{index=12}
 * - Boolean attributes are applied by presence (empty string) when `true`.
 * - For `type="image"`, `alt` should be provided for accessibility. :contentReference[oaicite:13]{index=13}
 *
 * @category Attributes
 */
export type InputAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * The input type. Defaults to `"text"` in Fundatio.
     */
    type?: InputType;
    /**
     * Form field name (used during submission).
     */
    name?: string;
    /**
     * Initial/current value (type-dependent semantics).
     */
    value?: string;
    /**
     * Placeholder hint (text-like types).
     */
    placeholder?: string;
    /**
     * Disables the control when true.
     */
    disabled?: boolean;
    /**
     * Marks the control read-only when true (where applicable).
     */
    readOnly?: boolean;
    /**
     * Marks the control required for form submission.
     */
    required?: boolean;
    /**
     * Enables multiple values (e.g. file inputs).
     */
    multiple?: boolean;
    /**
     * Marks a checkbox or radio as checked.
     */
    checked?: boolean;
    /**
     * Minimum value (number/date/time/range-like types).
     */
    min?: string | number;
    /**
     * Maximum value (number/date/time/range-like types).
     */
    max?: string | number;
    /**
     * Step interval (number/date/time/range-like types).
     */
    step?: string | number;
    /**
     * Minimum length (text-like types).
     */
    minLength?: number;
    /**
     * Maximum length (text-like types).
     */
    maxLength?: number;
    /**
     * Validation pattern (text-like types).
     */
    pattern?: string;
    /**
     * Size hint (visible character width, where applicable).
     */
    size?: number;
    /**
     * Autocomplete hint.
     */
    autoComplete?: string;
    /**
     * Autofocus hint.
     */
    autofocus?: boolean;
    /**
     * Associates the control with a datalist element by ID.
     */
    list?: string;
    /**
     * Associates the control with a form element by ID.
     */
    form?: string;
    /**
     * Overrides form submission target for submit/image inputs.
     */
    formAction?: string;
    /**
     * Overrides form submission encoding for submit/image inputs.
     */
    formEnctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    /**
     * Overrides form submission method for submit/image inputs.
     */
    formMethod?: 'get' | 'post' | 'dialog';
    /**
     * Prevents constraint validation on submission.
     */
    formNoValidate?: boolean;
    /**
     * Overrides form submission browsing context target.
     */
    formTarget?: string;
    /**
     * Source URL for `type="image"`.
     */
    src?: string;
    /**
     * Alternate text for `type="image"`.
     *
     * @remarks
     * This is only meaningful for image inputs and should be provided. :contentReference[oaicite:14]{index=14}
     */
    alt?: string;
    /**
     * Width for `type="image"`.
     */
    width?: number;
    /**
     * Height for `type="image"`.
     */
    height?: number;
    /**
     * Accepted file types (for `type="file"`).
     */
    accept?: string;
    /**
     * Media capture hint (primarily file inputs on mobile).
     *
     * @remarks
     * If set to `true`, the boolean attribute is applied by presence.
     */
    capture?: 'user' | 'environment' | true;
    /**
     * Hint for the virtual keyboard shown on touch devices.
     */
    inputMode?: InputMode;
    /**
     * Hint for the virtual keyboard enter key label/icon.
     */
    enterKeyHint?: EnterKeyHint;
    /**
     * ID of the popover element this input controls (typically `type="button"`).
     */
    popoverTarget?: string;
    /**
     * Action to perform on the targeted popover.
     */
    popoverTargetAction?: PopoverTargetAction;
};
/**
 * Create an input element with attributes.
 *
 * @remarks
 * - `<input>` is a void element; it never receives text content. :contentReference[oaicite:15]{index=15}
 * - Fundatio defaults `type` to `"text"` unless overridden. :contentReference[oaicite:16]{index=16}
 * - Global attributes are applied via Fundatio's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<input>` element.
 *
 * @example
 * ```ts
 * import { createInput } from "@Vastare/Fundatio/elements/form/input";
 *
 * const email = createInput({
 *   type: "email",
 *   name: "email",
 *   autoComplete: "email",
 *   inputMode: "email",
 * });
 * ```
 *
 * @category DOM
 */
export declare function createInput(attrs?: InputAttrs): ElementOf<typeof INPUT_TAG>;
/**
 * Enhance input elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceInputs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map