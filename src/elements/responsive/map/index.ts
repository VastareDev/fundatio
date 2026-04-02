/**
 * Sol Design Foundation: Map element helpers.
 *
 * @remarks
 * The map element (`<map>`) defines an image map: a set of clickable regions
 * (typically via descendant `<area>` elements) that can be referenced from an
 * `<img>` (or other image-like element) using the `usemap` attribute.
 *
 * Best-practice guidance:
 * - Always provide a meaningful, unique `name` for the map.
 * - Use `<area>` children to define interactive regions.
 * - Keep `name` free of whitespace and ensure it is unique within the document/tree.
 * - If you also set `id`, it should match `name` (spec requirement).
 *
 * Sol notes:
 * - This module is framework-agnostic and has no side effects.
 * - Global attributes are applied via Sol's shared DOM helper, which blocks:
 *   - inline event handler attributes (e.g. `onclick`)
 *   - raw `style` attribute injection (use the `style` object instead)
 * - Text passed to factories is assigned via `textContent` (never `innerHTML`).
 *
 * References:
 * - MDN: `<map>` element
 * - WHATWG HTML: map element and `name` requirements
 *
 * @module
 * @category Elements
 */

import { createElement, type AttrValue, type ElementOf, type GlobalAttrs } from '../../../ts/dom';

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
 * The semantic tag name for map.
 *
 * @category Constants
 */
export const MAP_TAG = 'map' as const;

/**
 * A CSS selector targeting map elements.
 *
 * @category Constants
 */
export const MAP_SELECTOR = 'map';

/**
 * Attribute bag for map creation/enhancement.
 *
 * @remarks
 * Element-specific attributes:
 * - `name` (required by spec for referencing via `usemap`)
 *
 * Spec notes:
 * - `name` must be present, non-empty, and contain no ASCII whitespace.
 * - If `id` is also specified, it must match `name`.
 *
 * Sol behavior:
 * - If `name` is omitted, Sol provides a deterministic fallback:
 *   - uses `id` if provided
 *   - otherwise defaults to `"map"`
 *   Callers should set a unique name in real documents.
 *
 * @category Attributes
 */
export type MapAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Name of the image map.
   *
   * @remarks
   * Used by `<img usemap="#NAME">` to reference this `<map>`.
   */
  name?: string;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Validate a map `name` value according to spec constraints.
 *
 * @param name - The name to validate.
 * @throws Error if the name is empty or contains whitespace.
 *
 * @category Internal
 */
function assertValidMapName(name: string): void {
  const raw = String(name);
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    throw new Error('Map "name" must be a non-empty string.');
  }

  // Spec: no ASCII whitespace. We conservatively reject any whitespace.
  if (/\s/.test(trimmed)) {
    throw new Error('Map "name" must not contain whitespace.');
  }
}

/**
 * Normalize {@link MapAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @remarks
 * - Preserves caller-provided `attrs` escape hatch (still validated by `dom.ts`).
 * - Applies/validates the required `name` attribute deterministically.
 * - Enforces the spec rule that `id` and `name` must match if both are provided.
 *
 * @param attrs - The map attributes.
 * @returns A {@link GlobalAttrs} object.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: MapAttrs): GlobalAttrs {
  const a: MapAttrs = attrs ?? {};

  const { aria, name, ...rest } = a;

  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  const setIfUnset = (key: string, v: AttrValue | undefined): void => {
    if (v === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = v;
  };

  // Determine name:
  // - explicit `name`
  // - else use `id` if present (and ensure spec match if both were provided)
  // - else deterministic fallback "map"
  const resolvedName =
    typeof name === 'string' ? name : typeof rest.id === 'string' ? rest.id : 'map';

  assertValidMapName(resolvedName);

  if (typeof name === 'string' && typeof rest.id === 'string' && name !== rest.id) {
    throw new Error('Map "id" must match "name" when both are provided.');
  }

  setIfUnset('name', resolvedName);

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const next: GlobalAttrs = { ...rest, attrs: mergedAttrs };

  if (Object.keys(mappedAria).length > 0) {
    next.aria = mappedAria;
  }

  return next;
}

/**
 * Create a map element with optional text content and attributes.
 *
 * @remarks
 * While `<map>` typically contains `<area>` elements (not text), Sol still
 * supports optional `text` for:
 * - fallback content
 * - simple labelling in environments that inspect textContent
 *
 * - Text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<map>` element.
 *
 * @example
 * ```ts
 * import { createMap } from "@lnpg/sol/elements/responsive/map";
 *
 * const m = createMap(undefined, { name: "product-map" });
 * ```
 *
 * @category DOM
 */
export function createMap(text?: string, attrs?: MapAttrs): ElementOf<typeof MAP_TAG> {
  return createElement(MAP_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance map elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceMaps(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for map.
  void root;
}
