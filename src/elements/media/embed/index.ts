/**
 * Sol Design Foundation: Embed element helpers.
 *
 * @remarks
 * The embed element (`<embed>`) embeds external content at a point in the
 * document. Historically this was often browser plug-ins; modern browsers have
 * largely removed plug-in support, so relying on `<embed>` is frequently a poor
 * choice for general-purpose sites. Prefer purpose-built elements when possible
 * (e.g. `<img>`, `<video>`, `<audio>`, `<iframe>`, or `<object>` depending on the use case).
 *
 * Best-practice guidance:
 * - Prefer native elements over `<embed>` when there is a semantic alternative.
 * - Use the `title` attribute to label embedded content for assistive technology.
 * - `width`/`height` should be absolute pixel values (no percentages).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create embed nodes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import {
  createVoidElement,
  type AttrValue,
  type ElementOf,
  type GlobalAttrs,
} from '../../../ts/dom';

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
   * ID reference to labelling element(s), mapped to `aria-labelledby`.
   */
  labelledby?: string;

  /**
   * Decorative/hidden hint, mapped to `aria-hidden`.
   */
  hidden?: boolean;
};

/**
 * The semantic tag name for embed.
 *
 * @category Constants
 */
export const EMBED_TAG = 'embed' as const;

/**
 * A CSS selector targeting embed elements.
 *
 * @category Constants
 */
export const EMBED_SELECTOR = 'embed';

/**
 * Attribute bag for embed creation/enhancement.
 *
 * @remarks
 * `<embed>` supports global attributes plus:
 * - `src` (URL)
 * - `type` (MIME type)
 * - `width` / `height` (absolute pixel values; percentages are invalid)
 *
 * Accessibility:
 * - Provide a `title` (global attribute) to label the embedded content.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, mapped into
 * `aria-*` attributes.
 *
 * @category Attributes
 */
export type EmbedAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * URL of the resource being embedded.
   */
  src?: string;

  /**
   * MIME type used to select the appropriate handler.
   */
  type?: string;

  /**
   * Displayed width in CSS pixels (absolute; percentages are not allowed).
   */
  width?: number | string;

  /**
   * Displayed height in CSS pixels (absolute; percentages are not allowed).
   */
  height?: number | string;

  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;
};

/**
 * Normalize an HTML dimension attribute value.
 *
 * @remarks
 * MDN notes `width`/`height` must be absolute values (percentages are invalid).
 * HTML attribute values for these are effectively numeric pixel counts.
 *
 * @param v - The provided dimension.
 * @param name - Attribute name for error messages.
 * @returns A stringified non-negative integer, or `undefined` if not provided.
 *
 * @category Internal
 */
function normalizeDim(v: EmbedAttrs['width'], name: 'width' | 'height'): string | undefined {
  if (v === undefined || v === null) return undefined;

  if (typeof v === 'number') {
    if (!Number.isFinite(v) || v < 0) {
      throw new Error(`Invalid ${name}: must be a finite, non-negative number.`);
    }
    // HTML width/height attributes are integer-like; normalize safely.
    return String(Math.floor(v));
  }

  const s = String(v).trim();

  if (s.length === 0) return undefined;

  if (s.includes('%')) {
    throw new Error(`Invalid ${name}: percentages are not allowed for <embed> ${name}.`);
  }

  if (!/^\d+$/.test(s)) {
    throw new Error(`Invalid ${name}: must be a non-negative integer (CSS pixels).`);
  }

  return s;
}

/**
 * Normalize {@link EmbedAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The embed attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: EmbedAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const { aria, src, type, width, height, attrs: extraAttrs, ...rest } = attrs;

  const mappedAria: NonNullable<GlobalAttrs['aria']> | undefined = aria
    ? (() => {
        const a: NonNullable<GlobalAttrs['aria']> = {};
        if (typeof aria.label === 'string') a.label = aria.label;
        if (typeof aria.labelledby === 'string') a.labelledby = aria.labelledby;
        if (typeof aria.hidden === 'boolean') a.hidden = aria.hidden;
        return Object.keys(a).length > 0 ? a : undefined;
      })()
    : undefined;

  const w = normalizeDim(width, 'width');
  const h = normalizeDim(height, 'height');

  const mergedAttrs: Record<string, AttrValue> | undefined = (() => {
    const a: Record<string, AttrValue> = { ...(extraAttrs ?? {}) };

    if (typeof src === 'string' && src.length > 0) a.src = src;
    if (typeof type === 'string' && type.length > 0) a.type = type;

    if (typeof w === 'string') a.width = w;
    if (typeof h === 'string') a.height = h;

    return Object.keys(a).length > 0 ? a : undefined;
  })();

  const mapped: GlobalAttrs = {
    ...rest,
    ...(mappedAria ? { aria: mappedAria } : null),
    ...(mergedAttrs ? { attrs: mergedAttrs } : null),
  };

  return mapped;
}

/**
 * Create an embed element and apply attributes.
 *
 * @remarks
 * Global attributes are applied via Sol's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<embed>` element.
 *
 * @example
 * ```ts
 * import { createEmbed } from "@lnpg/sol/elements/media/embed";
 *
 * document.body.appendChild(
 *   createEmbed({ src: "/files/manual.pdf", type: "application/pdf", title: "User manual" })
 * );
 * ```
 *
 * @category DOM
 */
export function createEmbed(attrs?: EmbedAttrs): ElementOf<typeof EMBED_TAG> {
  return createVoidElement(EMBED_TAG, toGlobalAttrs(attrs));
}

/**
 * Enhance embed elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export function enhanceEmbeds(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for embed.
  void root;
}
