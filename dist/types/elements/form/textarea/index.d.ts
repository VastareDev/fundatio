/**
 * Fundatio Design Foundation: Textarea element helpers.
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
 * - Global attribute escape hatches are guarded by Fundatio's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input supported by Fundatio element factories.
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
export declare const TEXTAREA_TAG: "textarea";
/**
 * A CSS selector targeting textarea elements.
 *
 * @category Constants
 */
export declare const TEXTAREA_SELECTOR = "textarea";
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
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
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
 * Create a textarea element with optional initial value and attributes.
 *
 * @remarks
 * For `<textarea>`, the initial value is represented by its text content in HTML.
 * Fundatio assigns the provided `text` via `textContent` (never `innerHTML`).
 *
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes and escape-hatch attributes are applied via Fundatio's shared
 *   DOM helper, including security guards that block inline event handler
 *   attributes (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional initial value (assigned as `textContent`).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<textarea>` element.
 *
 * @example
 * ```ts
 * import { createTextarea } from "@Vastare/Fundatio/elements/form/textarea";
 *
 * const t = createTextarea("Hello", { rows: 4, cols: 40, name: "message" });
 * ```
 *
 * @category DOM
 */
export declare function createTextarea(text?: string, attrs?: TextareaAttrs): ElementOf<typeof TEXTAREA_TAG>;
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
export declare function enhanceTextareas(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map