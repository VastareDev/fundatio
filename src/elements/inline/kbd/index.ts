/**
 * Sol Design Foundation: Kbd (`kbd`) element helpers.
 *
 * @remarks
 * The kbd element (`<kbd>`) represents user input, typically keyboard input,
 * but it may also represent input via other mechanisms (e.g. voice commands).
 *
 * Best-practice guidance:
 * - Use `<kbd>` for inline, human-readable input instructions (keys, shortcuts, commands).
 * - For key combinations, it is common to wrap the whole sequence in an outer `<kbd>`
 *   and each individual key as inner `<kbd>` elements (e.g. `<kbd><kbd>Ctrl</kbd>+<kbd>S</kbd></kbd>`).
 * - Do not rely on default styling; apply CSS for consistent presentation.
 *
 * Security notes:
 * - Sol blocks unsafe attribute *names* (e.g. `onclick`, raw `style`) via `dom.ts`.
 * - Sol does not sanitize attribute *values*. Treat untrusted inputs accordingly.
 *
 * References:
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
 * - WHATWG: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-kbd-element
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
 * The semantic tag name for kbd elements.
 *
 * @category Constants
 */
export const KBD_TAG = 'kbd' as const;

/**
 * A CSS selector targeting kbd elements.
 *
 * @category Constants
 */
export const KBD_SELECTOR = 'kbd';

/**
 * Attribute bag for kbd creation/enhancement.
 *
 * @remarks
 * Kbd elements accept standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type KbdAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize {@link KbdAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The kbd attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: KbdAttrs): GlobalAttrs | undefined {
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
 * Create a kbd element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the kbd element (e.g. "Ctrl", "⌘", "F3").
 * @param attrs - Optional attributes to apply.
 * @returns The created `<kbd>` element.
 *
 * @example
 * ```ts
 * import { createKbd } from "@lnpg/sol/elements/inline/kbd";
 *
 * const shortcut = createKbd(undefined, { className: "keys" });
 * shortcut.append(createKbd("Ctrl"), document.createTextNode("+"), createKbd("S"));
 * ```
 *
 * @category DOM
 */
export function createKbd(text?: string, attrs?: KbdAttrs): ElementOf<typeof KBD_TAG> {
  return createElement(KBD_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance kbd elements within a given root.
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
export function enhanceKbds(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for kbd.
  void root;
}
