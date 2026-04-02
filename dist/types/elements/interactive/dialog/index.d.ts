/**
 * Fundatio Design Foundation: Dialog element helpers.
 *
 * @remarks
 * The dialog element (`<dialog>`) represents a modal or non-modal dialog box
 * (e.g. a confirm prompt, inspector, or subwindow).
 *
 * Best-practice guidance:
 * - Prefer using the platform APIs:
 *   - `dialog.showModal()` for modal dialogs
 *   - `dialog.show()` for non-modal dialogs
 *   - `dialog.close()` to close, optionally supplying a return value
 * - Provide an accessible name for the dialog content (e.g. heading + `aria-labelledby`
 *   or `aria-label` when appropriate).
 * - Ensure the dialog contains an obvious close mechanism.
 * - Avoid relying solely on adding/removing `open`; prefer the element's methods
 *   for correct focus and modal behavior.
 *
 * Attributes (element-specific):
 * - `open` (boolean): when present, the dialog is active and available for interaction.
 * - `closedBy` (enumerated): maps to the `closedby` content attribute (spec-defined).
 *
 * Security:
 * - Global attribute escape hatches are guarded by Fundatio's `dom.ts` helpers which
 *   block inline event handler attributes (e.g. `onclick`) and raw `style`
 *   attribute injection (use the `style` object field instead).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
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
 * The semantic tag name for dialog.
 *
 * @category Constants
 */
export declare const DIALOG_TAG: "dialog";
/**
 * A CSS selector targeting dialog elements.
 *
 * @category Constants
 */
export declare const DIALOG_SELECTOR = "dialog";
/**
 * Values supported by the `closedby` content attribute.
 *
 * @remarks
 * This is a newer platform feature that specifies which user actions can close
 * the dialog automatically.
 *
 * - `any`: close requests or clicks outside close the dialog.
 * - `closerequest`: close requests close the dialog.
 * - `none`: no user actions automatically close the dialog.
 *
 * @category Types
 */
export type DialogClosedBy = 'any' | 'closerequest' | 'none';
/**
 * Attribute bag for dialog creation/enhancement.
 *
 * @remarks
 * Dialog elements accept standard HTML global attributes plus a small set of
 * dialog-specific content attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type DialogAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Whether the dialog is open (active).
     *
     * @remarks
     * Maps to the `open` boolean attribute.
     *
     * Prefer controlling visibility via the native methods (`showModal`, `show`,
     * `close`) when possible.
     */
    open?: boolean;
    /**
     * Control user actions that can close the dialog.
     *
     * @remarks
     * Maps to the `closedby` content attribute.
     */
    closedBy?: DialogClosedBy;
};
/**
 * Create a dialog element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the dialog.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<dialog>` element.
 *
 * @example
 * ```ts
 * import { createDialog } from "@Vastare/Fundatio/elements/interactive/dialog";
 *
 * const d = createDialog("Hello", { open: true });
 * ```
 *
 * @category DOM
 */
export declare function createDialog(text?: string, attrs?: DialogAttrs): ElementOf<typeof DIALOG_TAG>;
/**
 * Enhance dialog elements within a given root.
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
export declare function enhanceDialogs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map