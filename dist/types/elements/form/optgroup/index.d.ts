/**
 * Fundatio Design Foundation: Optgroup element helpers.
 *
 * @remarks
 * The optgroup element (`<optgroup>`) groups related `<option>` elements within
 * a `<select>`, allowing user agents to present grouped choices with a label.
 * :contentReference[oaicite:3]{index=3}
 *
 * Best-practice guidance:
 * - Always provide a meaningful `label`. MDN notes this attribute is mandatory
 *   when the element is used. Fundatio enforces this by requiring `label` when
 *   creating an optgroup. :contentReference[oaicite:4]{index=4}
 * - Use `disabled` to disable all options within the group when appropriate.
 * :contentReference[oaicite:5]{index=5}
 * - Prefer native semantics; avoid ARIA where native semantics already apply.
 *
 * Fundatio-specific conventions:
 * - Requires `label` at creation time to avoid invalid/anonymous optgroups.
 * - Applies global attributes via Fundatio's hardened DOM helpers (`dom.ts`), which
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
 * The semantic tag name for option groups.
 *
 * @category Constants
 */
export declare const OPTGROUP_TAG: "optgroup";
/**
 * A CSS selector targeting optgroup elements.
 *
 * @category Constants
 */
export declare const OPTGROUP_SELECTOR = "optgroup";
/**
 * Attribute bag for optgroup creation/enhancement.
 *
 * @remarks
 * `<optgroup>` accepts global attributes plus:
 * - `disabled` (boolean attribute)
 *
 * The `label` attribute is mandatory for meaningful use. Fundatio requires the label
 * as a separate argument in {@link createOptgroup}. :contentReference[oaicite:6]{index=6}
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, mapped into
 * {@link GlobalAttrs.aria}.
 *
 * @category Attributes
 */
export type OptgroupAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Disables the option group when true.
     *
     * @remarks
     * When disabled, none of the options in the group are selectable. :contentReference[oaicite:7]{index=7}
     */
    disabled?: boolean;
};
/**
 * Create an optgroup element with a required label and optional attributes.
 *
 * @remarks
 * - The label is mapped to the `label` attribute (required for meaningful use). :contentReference[oaicite:8]{index=8}
 * - Global attributes are applied via Fundatio's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param label - The optgroup label shown by the user agent.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<optgroup>` element.
 *
 * @example
 * ```ts
 * import { createOptgroup } from "@Vastare/Fundatio/elements/form/optgroup";
 *
 * const g = createOptgroup("Fruits", { disabled: false });
 * ```
 *
 * @category DOM
 */
export declare function createOptgroup(label: string, attrs?: OptgroupAttrs): ElementOf<typeof OPTGROUP_TAG>;
/**
 * Enhance optgroup elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceOptgroups(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map