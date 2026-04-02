/**
 * Fundatio Design Foundation: Address (`address`) element helpers.
 *
 * @remarks
 * The address element (`<address>`) represents contact information for a person,
 * people, or an organization.
 *
 * Best-practice guidance:
 * - Use `<address>` for contact information associated with the nearest
 *   `<article>` or `<body>` ancestor.
 * - Do not use `<address>` for arbitrary postal addresses. It is about contact
 *   information for the author/owner/organization associated with the content.
 * - Avoid using `<address>` purely for styling (e.g. italics/indentation).
 *   Presentation is the job of CSS.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create address blocks in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
 * - WHATWG: https://html.spec.whatwg.org/multipage/sections.html#the-address-element
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
   *
   * @remarks
   * Prefer `labelledby` when a visible labeling element exists.
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
 * The semantic tag name for address blocks.
 *
 * @category Constants
 */
export const ADDRESS_TAG = 'address' as const;

/**
 * A CSS selector targeting address elements.
 *
 * @category Constants
 */
export const ADDRESS_SELECTOR = 'address';

/**
 * Attribute bag for address creation/enhancement.
 *
 * @remarks
 * Address elements accept standard HTML global attributes.
 *
 * Fundatio also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Fundatio's core DOM helpers.
 *
 * @category Attributes
 */
export type AddressAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link AddressAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The address attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: AddressAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, ...rest } = attrs;

  if (!aria) return rest;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria.label === 'string') mappedAria.label = aria.label;
  if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
  if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;

  // Only attach `aria` if something was actually defined.
  const hasMapped = Object.keys(mappedAria).length > 0;

  return hasMapped ? { ...rest, aria: mappedAria } : rest;
}

/**
 * Create an address element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the address.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<address>` element.
 *
 * @example
 * ```ts
 * import { createAddress } from "@Vastare/Fundatio/elements/text/address";
 *
 * document.body.appendChild(
 *   createAddress("Contact: hello@example.com", { className: "contact" })
 * );
 * ```
 *
 * @category DOM
 */
export function createAddress(text?: string, attrs?: AddressAttrs): ElementOf<typeof ADDRESS_TAG> {
  return createElement(ADDRESS_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance address elements within a given root.
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
export function enhanceAddresses(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for address.
  void root;
}
