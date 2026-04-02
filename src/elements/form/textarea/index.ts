/**
 * Sol Design Foundation: Textarea element helpers.
 *
 * @remarks
 * The textarea element (`<textarea>`) is a multi-line plain-text form control.
 *
 * Best-practice guidance:
 * - Always provide an accessible name (typically via a `<label>`).
 * - Prefer `placeholder` as a hint, not as a substitute for a label.
 * - Use `rows`/`cols` to set a sensible baseline size, then use CSS for layout.
 * - Use `minLength`/`maxLength` for client-side constraints, but validate on the server.
 * - Use `wrap="hard"` only when you intentionally want line breaks inserted for
 *   form submission, and ensure `cols` is set.
 * - Use `dirname` only when you actually want directionality included in submission.
 *
 * Attributes (element-specific):
 * - `name`, `form`, `disabled`, `required`, `readOnly`
 * - `cols`, `rows`
 * - `minLength`, `maxLength`
 * - `placeholder`
 * - `autoComplete`, `autoFocus`, `autoCapitalize`
 * - `dirName`
 * - `wrap`
 *
 * Security:
 * - Global attribute escape hatches are guarded by Sol's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset that covers common cases and
 * prevents typo-based ARIA bugs (e.g. `lable`).
 *
 * It is mapped into {@link GlobalAttrs.aria} for application by `dom.ts`.
 *
 * @category Attributes
 */
export type StructuredAria = {
  /**
   * Accessible label, mapped to `aria-label`.
   */
  label?: string;

  /**
   * ID reference to the labelling element(s), mapped to `aria-labelledby`.
   */
  labelledby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * The semantic tag name for textarea.
 *
 * @category Constants
 */
export const TEXTAREA_TAG = 'textarea' as const;

/**
 * A CSS selector targeting textarea elements.
 *
 * @category Constants
 */
export const TEXTAREA_SELECTOR = 'textarea';

/**
 * Textarea wrap modes.
 *
 * @remarks
 * - `soft` (default): the submitted value is not forcibly wrapped.
 * - `hard`: line breaks are inserted for submission based on `cols`.
 *
 * @category Types
 */
export type TextareaWrap = 'soft' | 'hard';

/**
 * Autocapitalize values accepted by browsers for form controls.
 *
 * @remarks
 * This is a content attribute commonly supported on form controls.
 *
 * @category Types
 */
export type AutoCapitalize = 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

/**
 * Attribute bag for textarea creation/enhancement.
 *
 * @remarks
 * Textareas accept standard HTML global attributes plus textarea-specific content
 * attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type TextareaAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Name used during form submission.
   */
  name?: string;

  /**
   * Associate the control with a form by ID.
   */
  form?: string;

  /**
   * Whether the textarea is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the textarea is required.
   */
  required?: boolean;

  /**
   * Whether the textarea is read-only.
   *
   * @remarks
   * Maps to the `readonly` content attribute.
   */
  readOnly?: boolean;

  /**
   * The number of visible text columns.
   */
  cols?: number;

  /**
   * The number of visible text rows.
   */
  rows?: number;

  /**
   * Minimum input length.
   *
   * @remarks
   * Maps to the `minlength` content attribute.
   */
  minLength?: number;

  /**
   * Maximum input length.
   *
   * @remarks
   * Maps to the `maxlength` content attribute.
   */
  maxLength?: number;

  /**
   * Placeholder hint text.
   */
  placeholder?: string;

  /**
   * Autofill hint.
   */
  autoComplete?: string;

  /**
   * Whether the control should be focused on page load.
   */
  autoFocus?: boolean;

  /**
   * Autocapitalization behavior.
   */
  autoCapitalize?: AutoCapitalize;

  /**
   * Submission directionality field name.
   *
   * @remarks
   * When set, the value must not be empty.
   * Maps to the `dirname` content attribute.
   */
  dirName?: string;

  /**
   * Wrapping mode for form submission.
   */
  wrap?: TextareaWrap;
};

/**
 * Normalize {@link TextareaAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The textarea attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @throws Error if `dirName` is provided but empty/whitespace.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: TextareaAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const {
    aria,
    name,
    form,
    disabled,
    required,
    readOnly,
    cols,
    rows,
    minLength,
    maxLength,
    placeholder,
    autoComplete,
    autoFocus,
    autoCapitalize,
    dirName,
    wrap,
    ...rest
  } = attrs;

  const mapped: GlobalAttrs = { ...rest };

  const extra: NonNullable<GlobalAttrs['attrs']> = { ...(mapped.attrs ?? {}) };

  if (typeof name === 'string') extra.name = name;
  if (typeof form === 'string') extra.form = form;

  if (disabled === true) extra.disabled = true;
  if (required === true) extra.required = true;
  if (readOnly === true) extra.readonly = true;

  if (typeof cols === 'number' && Number.isFinite(cols)) extra.cols = cols;
  if (typeof rows === 'number' && Number.isFinite(rows)) extra.rows = rows;

  if (typeof minLength === 'number' && Number.isFinite(minLength)) extra.minlength = minLength;
  if (typeof maxLength === 'number' && Number.isFinite(maxLength)) extra.maxlength = maxLength;

  if (typeof placeholder === 'string') extra.placeholder = placeholder;

  if (typeof autoComplete === 'string') extra.autocomplete = autoComplete;
  if (autoFocus === true) extra.autofocus = true;
  if (typeof autoCapitalize === 'string') extra.autocapitalize = autoCapitalize;

  if (typeof dirName === 'string') {
    const dn = dirName.trim();
    if (dn.length === 0) {
      throw new Error('textarea dirName must not be an empty string.');
    }
    extra.dirname = dn;
  }

  if (wrap === 'soft' || wrap === 'hard') {
    extra.wrap = wrap;

    // "hard" wrap only has an effect when cols is set, so we enforce a safe default.
    if (wrap === 'hard' && typeof extra.cols === 'undefined') {
      extra.cols = 20;
    }
  }

  if (Object.keys(extra).length > 0) {
    mapped.attrs = extra;
  }

  if (!aria) return mapped;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  const hasMappedAria = Object.keys(mappedAria).length > 0;

  return hasMappedAria ? { ...mapped, aria: mappedAria } : mapped;
}

/**
 * Create a textarea element with optional initial value and attributes.
 *
 * @remarks
 * For `<textarea>`, the initial value is represented by its text content in HTML.
 * Sol assigns the provided `text` via `textContent` (never `innerHTML`).
 *
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes and escape-hatch attributes are applied via Sol's shared
 *   DOM helper, including security guards that block inline event handler
 *   attributes (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional initial value (assigned as `textContent`).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<textarea>` element.
 *
 * @example
 * ```ts
 * import { createTextarea } from "@lnpg/sol/elements/form/textarea";
 *
 * const t = createTextarea("Hello", { rows: 4, cols: 40, name: "message" });
 * ```
 *
 * @category DOM
 */
export function createTextarea(
  text?: string,
  attrs?: TextareaAttrs,
): ElementOf<typeof TEXTAREA_TAG> {
  return createElement(TEXTAREA_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance textarea elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * Why does it exist?
 * - It establishes a stable integration pattern for frameworks (Vue/React/etc.)
 * - It allows future progressive enhancements without changing consumer code
 *
 * What it will never do:
 * - It will not inject styles (CSS remains the source of truth)
 * - It will not introduce framework-specific behavior
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceTextareas(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for textarea.
  void root;
}
