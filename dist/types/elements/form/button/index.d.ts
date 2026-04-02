/**
 * Sol Design Foundation: Button element helpers.
 *
 * @remarks
 * The button element (`<button>`) is an interactive control that users can
 * activate via mouse, keyboard, touch, or assistive technology. :contentReference[oaicite:5]{index=5}
 *
 * Best-practice guidance:
 * - Prefer native `<button>` semantics over non-semantic elements with `role="button"`.
 * - Provide an accessible name via visible text or ARIA labelling.
 * - Avoid placing interactive content inside a button (nested links/inputs/etc.).
 * - In forms, explicitly set a button `type` to avoid accidental submissions.
 *   In HTML, the default `type` is effectively `"submit"` in many form contexts. :contentReference[oaicite:6]{index=6}
 *
 * Sol-specific conventions:
 * - Defaults `type` to `"button"` unless the caller explicitly sets `type`
 *   (via the typed `type` field or via the raw `attrs` escape hatch).
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
 * Allowed `type` values for `<button>`.
 *
 * @remarks
 * HTML supports `submit`, `reset`, and `button`. :contentReference[oaicite:7]{index=7}
 *
 * @category Attributes
 */
export type ButtonType = 'submit' | 'reset' | 'button';
/**
 * Allowed `formenctype` values for submit buttons.
 *
 * @category Attributes
 */
export type ButtonFormEnctype = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
/**
 * Allowed `formmethod` values for submit buttons.
 *
 * @remarks
 * `dialog` is supported for form submission to a dialog in HTML. :contentReference[oaicite:8]{index=8}
 *
 * @category Attributes
 */
export type ButtonFormMethod = 'get' | 'post' | 'dialog';
/**
 * Allowed `popovertargetaction` values for popover trigger buttons.
 *
 * @remarks
 * Mirrors the `popovertargetaction` attribute. :contentReference[oaicite:9]{index=9}
 *
 * @category Attributes
 */
export type PopoverTargetAction = 'toggle' | 'show' | 'hide';
/**
 * The semantic tag name for buttons.
 *
 * @category Constants
 */
export declare const BUTTON_TAG: "button";
/**
 * A CSS selector targeting button elements.
 *
 * @category Constants
 */
export declare const BUTTON_SELECTOR = "button";
/**
 * Attribute bag for button creation/enhancement.
 *
 * @remarks
 * `<button>` supports global attributes plus button/form-associated attributes.
 * This type models the most commonly used attributes in a typed way, while still
 * providing {@link GlobalAttrs.attrs} as an escape hatch (validated by `dom.ts`).
 *
 * Notes:
 * - `type` defaults to `"button"` in Sol to avoid accidental form submission.
 * - Boolean attributes are applied by presence (empty string) when `true`.
 * - `command` and `commandfor` are part of the HTML Invoker Commands model. :contentReference[oaicite:10]{index=10}
 *
 * @category Attributes
 */
export type ButtonAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * The button type. Sol defaults to `"button"` when not provided.
     */
    type?: ButtonType;
    /**
     * The button name (used during form submission).
     */
    name?: string;
    /**
     * The button value (used during form submission).
     */
    value?: string;
    /**
     * Disables the button when true.
     */
    disabled?: boolean;
    /**
     * Autofocus hint.
     */
    autofocus?: boolean;
    /**
     * Associates the button with a form element by ID.
     */
    form?: string;
    /**
     * Overrides the form `action` for submit buttons.
     */
    formAction?: string;
    /**
     * Overrides the form encoding type for submit buttons.
     */
    formEnctype?: ButtonFormEnctype;
    /**
     * Overrides the form HTTP method for submit buttons.
     */
    formMethod?: ButtonFormMethod;
    /**
     * When true, prevents constraint validation on submission.
     */
    formNoValidate?: boolean;
    /**
     * Overrides the form target for submission.
     *
     * @remarks
     * Can be a special keyword like `_blank` or a named browsing context.
     */
    formTarget?: string;
    /**
     * ID of the popover element this button targets.
     */
    popoverTarget?: string;
    /**
     * Action to perform on the targeted popover.
     */
    popoverTargetAction?: PopoverTargetAction;
    /**
     * Invoker Commands: the command name.
     */
    command?: string;
    /**
     * Invoker Commands: the element ID to invoke/control.
     */
    commandFor?: string;
};
/**
 * Create a button element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Sol defaults `type` to `"button"` to reduce accidental form submissions. :contentReference[oaicite:11]{index=11}
 * - Global attributes are applied via Sol's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param text - Optional text content for the button.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<button>` element.
 *
 * @example
 * ```ts
 * import { createButton } from "@lnpg/sol/elements/form/button";
 *
 * document.body.appendChild(createButton("Save", { className: "btn" }));
 * ```
 *
 * @category DOM
 */
export declare function createButton(text?: string, attrs?: ButtonAttrs): ElementOf<typeof BUTTON_TAG>;
/**
 * Enhance button elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceButtons(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map