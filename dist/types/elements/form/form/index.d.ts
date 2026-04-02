/**
 * Sol Design Foundation: Form element helpers.
 *
 * @remarks
 * The form element (`<form>`) groups interactive controls for submitting data.
 *
 * Best-practice guidance:
 * - Prefer HTTPS endpoints for `action` to protect user data in transit.
 * - Use `method="post"` for submissions that change server state or include sensitive data.
 * - Use `enctype="multipart/form-data"` when uploading files.
 * - Provide explicit labels for controls and ensure accessible naming.
 * - Consider `rel="noopener"` when using `target="_blank"` to avoid `window.opener` exposure.
 *
 * Sol notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Sol's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<form>` element :contentReference[oaicite:3]{index=3}
 * - WHATWG HTML: Forms & submission attributes :contentReference[oaicite:4]{index=4}
 * - MDN: `rel` on `<form>` / `noopener` :contentReference[oaicite:5]{index=5}
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input supported by Sol element factories.
 *
 * @remarks
 * This is intentionally a small, typed subset that covers common cases and
 * prevents typo-based ARIA bugs.
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
 * The semantic tag name for forms.
 *
 * @category Constants
 */
export declare const FORM_TAG: "form";
/**
 * A CSS selector targeting form elements.
 *
 * @category Constants
 */
export declare const FORM_SELECTOR = "form";
/**
 * Allowed values for the form `method` attribute.
 *
 * @remarks
 * HTML supports `get`, `post`, and `dialog` (for dialog-associated forms).
 *
 * @category Types
 */
export type FormMethod = 'get' | 'post' | 'dialog';
/**
 * Allowed values for the form `enctype` attribute.
 *
 * @category Types
 */
export type FormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
/**
 * Allowed values for the form `autocomplete` attribute.
 *
 * @category Types
 */
export type FormAutocomplete = 'on' | 'off';
/**
 * Attribute bag for form creation/enhancement.
 *
 * @remarks
 * `<form>` supports standard HTML global attributes plus submission-related
 * attributes (action, method, enctype, target, etc.).
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type FormAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * URL that processes the form submission.
     *
     * @remarks
     * If omitted, the user agent submits to the current document URL.
     */
    action?: string;
    /**
     * HTTP method used to submit the form.
     *
     * @remarks
     * Valid values are `get`, `post`, and `dialog`.
     */
    method?: FormMethod;
    /**
     * Encoding type for the form submission.
     *
     * @remarks
     * Use `multipart/form-data` when uploading files.
     */
    enctype?: FormEnctype;
    /**
     * Character encodings that are acceptable for server processing.
     *
     * @remarks
     * Maps to the `accept-charset` attribute.
     */
    acceptCharset?: string;
    /**
     * Whether the browser may autofill this form.
     */
    autocomplete?: FormAutocomplete;
    /**
     * Name of the form, used for referencing the form in scripts and documents.
     */
    name?: string;
    /**
     * Disable constraint validation when submitting the form.
     *
     * @remarks
     * Maps to the boolean `novalidate` attribute (represented by attribute presence).
     */
    noValidate?: boolean;
    /**
     * Where to display the response after submitting the form.
     *
     * @remarks
     * Common values: `_self`, `_blank`, `_parent`, `_top`, or a named browsing context.
     */
    target?: '_self' | '_blank' | '_parent' | '_top' | (string & {});
    /**
     * Relationship (link types) for the form submission when `target` creates a new context.
     *
     * @remarks
     * This is a space-separated list of tokens (e.g. `noopener noreferrer`).
     */
    rel?: string;
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a form element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the form (rare, but supported for parity).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<form>` element.
 *
 * @example
 * ```ts
 * import { createForm } from "@lnpg/sol/elements/form/form";
 *
 * const form = createForm(undefined, {
 *   action: "/submit",
 *   method: "post",
 *   enctype: "application/x-www-form-urlencoded",
 * });
 * document.body.appendChild(form);
 * ```
 *
 * @category DOM
 */
export declare function createForm(text?: string, attrs?: FormAttrs): ElementOf<typeof FORM_TAG>;
/**
 * Enhance form elements within a given root.
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
export declare function enhanceForms(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map