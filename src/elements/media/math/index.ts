/**
 * Sol Design Foundation: Math element helpers.
 *
 * @remarks
 * The MathML math element (`<math>`) represents mathematical notation.
 *
 * Best-practice guidance:
 * - Prefer real MathML over images for math content when possible.
 * - Use `display="block"` for standalone equations; inline math remains the default.
 * - Do not rely on raw attribute injection for behavior; keep markup semantic.
 *
 * Accessibility defaults for Sol v1.0.0:
 * - `<math>` is treated as decorative by default:
 *   - `aria-hidden="true"`
 *   - `tabIndex = -1`
 * - If consumers provide explicit overrides (e.g. `aria.hidden`, `tabIndex`), Sol
 *   respects them.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create MathML roots in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { applyGlobalAttrs, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for MathML roots.
 *
 * @category Constants
 */
export const MATH_TAG = 'math' as const;

/**
 * A CSS selector targeting math elements.
 *
 * @category Constants
 */
export const MATH_SELECTOR = 'math';

/**
 * Attribute bag for math creation/enhancement.
 *
 * @remarks
 * MathML `<math>` supports the `display` attribute:
 * - `inline` (default)
 * - `block`
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type MathAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * MathML display mode.
   *
   * @remarks
   * `block` renders as a block-level equation, `inline` renders inline.
   */
  display?: 'block' | 'inline';
};

/**
 * Normalize {@link MathAttrs} into {@link GlobalAttrs} for `dom.ts`,
 * applying Sol's MathML accessibility defaults.
 *
 * @param attrs - The math attributes.
 * @returns A {@link GlobalAttrs} object (always returned to support defaults).
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: MathAttrs): GlobalAttrs {
  const { aria, display, attrs: rawAttrs, tabIndex, ...rest } = attrs ?? {};

  const mapped: GlobalAttrs = { ...rest };

  // Decorative by default, unless explicitly overridden.
  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  if (typeof aria?.label === 'string') mappedAria.label = aria.label;
  if (typeof aria?.labelledby === 'string') mappedAria.labelledby = aria.labelledby;

  const explicitAriaHidden = typeof aria?.hidden === 'boolean';
  if (explicitAriaHidden) {
    mappedAria.hidden = aria.hidden!;
  } else {
    mappedAria.hidden = true;
  }

  if (Object.keys(mappedAria).length > 0) {
    mapped.aria = mappedAria;
  }

  if (typeof tabIndex === 'number') {
    mapped.tabIndex = tabIndex;
  } else {
    mapped.tabIndex = -1;
  }

  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = { ...(rawAttrs ?? {}) };

  if (display) mergedAttrs.display = display;

  if (Object.keys(mergedAttrs).length > 0) {
    mapped.attrs = mergedAttrs;
  }

  return mapped;
}

/**
 * Create a MathML `<math>` element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note: `<math>` is not part of {@link HTMLElementTagNameMap}, so Sol creates it
 * via `document.createElement("math")` and narrows the type to {@link MathMLElement}.
 *
 * @param text - Optional text content for the math element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<math>` element.
 *
 * @category DOM
 */
export function createMath(text?: string, attrs?: MathAttrs): MathMLElement {
  const el = document.createElement(MATH_TAG) as unknown as MathMLElement;

  applyGlobalAttrs(el as unknown as HTMLElement, toGlobalAttrs(attrs));

  if (typeof text === 'string') (el as unknown as Node).textContent = text;

  return el;
}

/**
 * Enhance math elements within a given root.
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
export function enhanceMath(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for math.
  void root;
}
