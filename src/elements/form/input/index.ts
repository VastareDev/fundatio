/**
 * Sol Design Foundation: Input element helpers.
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
 * Sol-specific conventions:
 * - Defaults `type` to `"text"` unless explicitly overridden (typed field or raw
 *   attrs escape hatch), matching HTML's default behavior. :contentReference[oaicite:8]{index=8}
 * - Applies global attributes via Sol's hardened DOM helpers (`dom.ts`),
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

import {
  createVoidElement,
  type AttrValue,
  type ElementOf,
  type GlobalAttrs,
} from '../../../ts/dom';

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
 * Common input `type` values.
 *
 * @remarks
 * The `type` attribute controls which control is rendered and how values are
 * processed. :contentReference[oaicite:9]{index=9}
 *
 * Sol models the widely used types while still allowing the raw `attrs` escape
 * hatch for unusual/experimental values.
 *
 * @category Attributes
 */
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time'
  | 'color'
  | 'checkbox'
  | 'radio'
  | 'file'
  | 'hidden'
  | 'image'
  | 'range'
  | 'reset'
  | 'submit'
  | 'button';

/**
 * Values for the `inputmode` hint.
 *
 * @remarks
 * `inputmode` is a hint to user agents about what kind of virtual keyboard to
 * show. :contentReference[oaicite:10]{index=10}
 *
 * @category Attributes
 */
export type InputMode =
  | 'none'
  | 'text'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'search';

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
export const INPUT_TAG = 'input' as const;

/**
 * A CSS selector targeting input elements.
 *
 * @category Constants
 */
export const INPUT_SELECTOR = 'input';

/**
 * Attribute bag for input creation/enhancement.
 *
 * @remarks
 * `<input>` supports a large surface area of attributes, many of which are
 * type-dependent. Sol models common attributes explicitly and provides
 * {@link GlobalAttrs.attrs} as an escape hatch (validated by `dom.ts`).
 *
 * Notes:
 * - Sol defaults `type` to `"text"` unless explicitly overridden. :contentReference[oaicite:12]{index=12}
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
   * The input type. Defaults to `"text"` in Sol.
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
 * Normalize {@link InputAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @remarks
 * Pattern:
 * - Start with any caller-provided raw attrs escape hatch.
 * - Apply typed attributes without overriding explicit raw attributes.
 * - Map structured ARIA into {@link GlobalAttrs.aria}.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: InputAttrs): GlobalAttrs {
  const {
    aria,
    type,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    multiple,
    checked,
    min,
    max,
    step,
    minLength,
    maxLength,
    pattern,
    size,
    autoComplete,
    autofocus,
    list,
    form,
    formAction,
    formEnctype,
    formMethod,
    formNoValidate,
    formTarget,
    src,
    alt,
    width,
    height,
    accept,
    capture,
    inputMode,
    enterKeyHint,
    popoverTarget,
    popoverTargetAction,
    ...rest
  } = attrs ?? {};

  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, v: AttrValue | undefined): void => {
    if (v === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = v;
  };

  // Default type to "text" unless explicitly overridden.
  setIfUnset('type', type ?? 'text');

  setIfUnset('name', name);
  setIfUnset('value', value);
  setIfUnset('placeholder', placeholder);
  setIfUnset('min', min);
  setIfUnset('max', max);
  setIfUnset('step', step);
  setIfUnset('minlength', typeof minLength === 'number' ? minLength : undefined);
  setIfUnset('maxlength', typeof maxLength === 'number' ? maxLength : undefined);
  setIfUnset('pattern', pattern);
  setIfUnset('size', typeof size === 'number' ? size : undefined);
  setIfUnset('autocomplete', autoComplete);
  setIfUnset('list', list);
  setIfUnset('form', form);

  setIfUnset('formaction', formAction);
  setIfUnset('formenctype', formEnctype);
  setIfUnset('formmethod', formMethod);
  setIfUnset('formtarget', formTarget);

  setIfUnset('src', src);
  setIfUnset('alt', alt);
  setIfUnset('width', typeof width === 'number' ? width : undefined);
  setIfUnset('height', typeof height === 'number' ? height : undefined);

  setIfUnset('accept', accept);
  setIfUnset('inputmode', inputMode);
  setIfUnset('enterkeyhint', enterKeyHint);

  setIfUnset('popovertarget', popoverTarget);
  setIfUnset('popovertargetaction', popoverTargetAction);

  // Boolean attributes: presence (empty string) when true.
  if (disabled === true) setIfUnset('disabled', '');
  if (readOnly === true) setIfUnset('readonly', '');
  if (required === true) setIfUnset('required', '');
  if (multiple === true) setIfUnset('multiple', '');
  if (checked === true) setIfUnset('checked', '');
  if (autofocus === true) setIfUnset('autofocus', '');
  if (formNoValidate === true) setIfUnset('formnovalidate', '');

  if (capture === true) setIfUnset('capture', '');
  if (capture === 'user') setIfUnset('capture', 'user');
  if (capture === 'environment') setIfUnset('capture', 'environment');

  const mapped: GlobalAttrs = { ...rest, attrs: mergedAttrs };

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  if (Object.keys(mappedAria).length > 0) {
    mapped.aria = mappedAria;
  }

  if (Object.keys(mergedAttrs).length === 0) {
    const { attrs: _unused, ...withoutAttrs } = mapped;
    return withoutAttrs;
  }

  return mapped;
}

/**
 * Create an input element with attributes.
 *
 * @remarks
 * - `<input>` is a void element; it never receives text content. :contentReference[oaicite:15]{index=15}
 * - Sol defaults `type` to `"text"` unless overridden. :contentReference[oaicite:16]{index=16}
 * - Global attributes are applied via Sol's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<input>` element.
 *
 * @example
 * ```ts
 * import { createInput } from "@lnpg/sol/elements/form/input";
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
export function createInput(attrs?: InputAttrs): ElementOf<typeof INPUT_TAG> {
  return createVoidElement(INPUT_TAG, toGlobalAttrs(attrs));
}

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
export function enhanceInputs(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for input.
  void root;
}
