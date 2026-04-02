/**
 * Sol Design Foundation: Optgroup element helpers.
 *
 * @remarks
 * The optgroup element (`<optgroup>`) groups related `<option>` elements within
 * a `<select>`, allowing user agents to present grouped choices with a label.
 * :contentReference[oaicite:3]{index=3}
 *
 * Best-practice guidance:
 * - Always provide a meaningful `label`. MDN notes this attribute is mandatory
 *   when the element is used. Sol enforces this by requiring `label` when
 *   creating an optgroup. :contentReference[oaicite:4]{index=4}
 * - Use `disabled` to disable all options within the group when appropriate.
 * :contentReference[oaicite:5]{index=5}
 * - Prefer native semantics; avoid ARIA where native semantics already apply.
 *
 * Sol-specific conventions:
 * - Requires `label` at creation time to avoid invalid/anonymous optgroups.
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

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for option groups.
 *
 * @category Constants
 */
export const OPTGROUP_TAG = 'optgroup' as const;

/**
 * A CSS selector targeting optgroup elements.
 *
 * @category Constants
 */
export const OPTGROUP_SELECTOR = 'optgroup';

/**
 * Attribute bag for optgroup creation/enhancement.
 *
 * @remarks
 * `<optgroup>` accepts global attributes plus:
 * - `disabled` (boolean attribute)
 *
 * The `label` attribute is mandatory for meaningful use. Sol requires the label
 * as a separate argument in {@link createOptgroup}. :contentReference[oaicite:6]{index=6}
 *
 * Sol also supports a structured ARIA input for common ARIA fields, mapped into
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
 * Normalize {@link OptgroupAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param label - The required optgroup label, mapped to the `label` attribute.
 * @param attrs - The optgroup attributes.
 * @returns A {@link GlobalAttrs} object containing mapped attributes.
 *
 * @category Internal
 */
function toGlobalAttrs(label: string, attrs?: OptgroupAttrs): GlobalAttrs {
  const { aria, disabled, ...rest } = attrs ?? {};

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = { ...(rest.attrs ?? {}) };

  // Always set the mandatory label attribute unless explicitly overridden via raw attrs.
  if (!Object.prototype.hasOwnProperty.call(mergedAttrs, 'label')) {
    mergedAttrs.label = label;
  }

  // Boolean attribute by presence when true.
  if (disabled === true && !Object.prototype.hasOwnProperty.call(mergedAttrs, 'disabled')) {
    mergedAttrs.disabled = '';
  }

  const mapped: GlobalAttrs = { ...rest };

  if (Object.keys(mergedAttrs).length > 0) mapped.attrs = mergedAttrs;

  if (Object.keys(mappedAria).length > 0) {
    mapped.aria = mappedAria;
  }

  return mapped;
}

/**
 * Create an optgroup element with a required label and optional attributes.
 *
 * @remarks
 * - The label is mapped to the `label` attribute (required for meaningful use). :contentReference[oaicite:8]{index=8}
 * - Global attributes are applied via Sol's shared DOM helper, including security
 *   guards that block inline event handler attributes (e.g. `onclick`) and raw
 *   `style` attribute strings.
 *
 * @param label - The optgroup label shown by the user agent.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<optgroup>` element.
 *
 * @example
 * ```ts
 * import { createOptgroup } from "@lnpg/sol/elements/form/optgroup";
 *
 * const g = createOptgroup("Fruits", { disabled: false });
 * ```
 *
 * @category DOM
 */
export function createOptgroup(
  label: string,
  attrs?: OptgroupAttrs,
): ElementOf<typeof OPTGROUP_TAG> {
  return createElement(OPTGROUP_TAG, toGlobalAttrs(label, attrs));
}

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
export function enhanceOptgroups(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for optgroup.
  void root;
}
