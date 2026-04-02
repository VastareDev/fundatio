/**
 * Fundatio Design Foundation: Object element helpers.
 *
 * @remarks
 * The object element (`<object>`) embeds external resources (HTML, images, PDFs,
 * SVG, etc.) into the document.
 *
 * Best-practice guidance:
 * - Prefer purpose-built elements when available:
 *   - `<img>` for images
 *   - `<video>` / `<audio>` for media
 *   - `<iframe>` for embedded documents/interactive content (with sandboxing)
 * - Always provide a meaningful fallback inside `<object>` for unsupported content.
 * - Avoid obsolete attributes (e.g. `codebase`, `classid`, `declare`, etc.).
 * - For layout, prefer CSS. If using `width`/`height` attributes, keep them numeric.
 *
 * Attribute guidance:
 * - At least one of `data` or `type` should be provided.
 * - If neither is provided, Fundatio falls back to `data="about:blank"` to avoid an
 *   "empty" embed configuration while staying inert.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create object elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { createElement, type AttrValue, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input supported by Fundatio element factories.
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
   * ID reference to the describing element(s), mapped to `aria-describedby`.
   */
  describedby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * The semantic tag name for object embeds.
 *
 * @category Constants
 */
export const OBJECT_TAG = 'object' as const;

/**
 * A CSS selector targeting object elements.
 *
 * @category Constants
 */
export const OBJECT_SELECTOR = 'object';

/**
 * Dimension values allowed for width/height attributes.
 *
 * @remarks
 * Per best practice, keep these numeric (pixels). Prefer CSS for layout.
 *
 * @category Types
 */
export type ObjectDimension = number | `${number}`;

/**
 * Attribute bag for object creation/enhancement.
 *
 * @remarks
 * - `data` and `type` are the primary configuration attributes.
 * - Provide fallback content via `text` or by appending children after creation.
 * - Global attributes are supported, including a structured ARIA input.
 *
 * @category Attributes
 */
export type ObjectAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Address of the resource to embed (maps to `data`).
   */
  data?: string;

  /**
   * MIME type of the embedded resource (maps to `type`).
   *
   * @example
   * "text/html", "image/svg+xml", "application/pdf"
   */
  type?: string;

  /**
   * Name of the object (maps to `name`).
   */
  name?: string;

  /**
   * Associate the object with a form (maps to `form`).
   */
  form?: string;

  /**
   * Width in CSS pixels (maps to `width`).
   *
   * @remarks
   * Prefer CSS for layout.
   */
  width?: ObjectDimension;

  /**
   * Height in CSS pixels (maps to `height`).
   *
   * @remarks
   * Prefer CSS for layout.
   */
  height?: ObjectDimension;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Validate and normalize a width/height value.
 *
 * @param name - Attribute name for error messages.
 * @param v - The provided dimension.
 * @returns A normalized string suitable for attributes.
 *
 * @category Internal
 */
function normalizeDimension(name: 'width' | 'height', v: ObjectDimension): string {
  if (typeof v === 'number') {
    if (!Number.isFinite(v) || v < 0 || !Number.isInteger(v)) {
      throw new Error(`Invalid ${name}: expected a non-negative integer.`);
    }
    return String(v);
  }

  // String numeric (template literal), but validate anyway.
  if (!/^\d+$/.test(v)) {
    throw new Error(`Invalid ${name}: expected a numeric string.`);
  }

  return v;
}

/**
 * Normalize {@link ObjectAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The object attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: ObjectAttrs): GlobalAttrs | undefined {
  if (!attrs) {
    // Best-practice: an object should have at least data or type.
    // We still allow `createObject()` with no args, but keep it inert.
    return { attrs: { data: 'about:blank' } };
  }

  const { aria, data, type, name, form, width, height, attrs: extraAttrs, ...rest } = attrs;

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.describedby === 'string') mappedAria.describedby = aria.describedby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const mappedAttrs: Record<string, AttrValue> = { ...(extraAttrs ?? {}) };

  // Primary embed configuration.
  if (typeof data === 'string' && data.length > 0) mappedAttrs.data = data;
  if (typeof type === 'string' && type.length > 0) mappedAttrs.type = type;

  // Per guidance/spec: at least one of data/type should exist.
  // If neither is provided, keep it inert rather than "empty".
  if (mappedAttrs.data === undefined && mappedAttrs.type === undefined) {
    mappedAttrs.data = 'about:blank';
  }

  if (typeof name === 'string' && name.length > 0) mappedAttrs.name = name;
  if (typeof form === 'string' && form.length > 0) mappedAttrs.form = form;

  if (width !== undefined) mappedAttrs.width = normalizeDimension('width', width);
  if (height !== undefined) mappedAttrs.height = normalizeDimension('height', height);

  const hasMappedAria = Object.keys(mappedAria).length > 0;
  const hasMappedAttrs = Object.keys(mappedAttrs).length > 0;

  return {
    ...rest,
    ...(hasMappedAria ? { aria: mappedAria } : null),
    ...(hasMappedAttrs ? { attrs: mappedAttrs } : null),
  };
}

/**
 * Create an object element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - For richer fallback, append children after creation.
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text content for the object.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<object>` element.
 *
 * @example
 * ```ts
 * import { createObject } from "@Vastare/Fundatio/elements/media/object";
 *
 * const obj = createObject("Your browser can't display this content.", {
 *   data: "/docs/guide.pdf",
 *   type: "application/pdf",
 *   width: 640,
 *   height: 480,
 * });
 *
 * document.body.appendChild(obj);
 * ```
 *
 * @category DOM
 */
export function createObject(text?: string, attrs?: ObjectAttrs): ElementOf<typeof OBJECT_TAG> {
  return createElement(OBJECT_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance object elements within a given root.
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
export function enhanceObjects(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for object.
  void root;
}
