/**
 * Sol Design Foundation: IFrame element helpers.
 *
 * @remarks
 * The iframe element (`<iframe>`) embeds another HTML page into the current page.
 *
 * Best-practice guidance:
 * - Prefer `<iframe>` only when you truly need third-party or isolated documents.
 * - Consider `loading="lazy"` for non-critical iframes to reduce initial load cost.
 * - Use `sandbox` with the least permissions possible when embedding untrusted content.
 * - Prefer restrictive `referrerpolicy` when embedding third-party content.
 * - Provide a meaningful `title` for accessibility (screen readers use it to identify the frame).
 * - Avoid obsolete attributes like `frameborder`; use CSS instead.
 *
 * Security notes:
 * - `srcdoc` embeds HTML directly. Sol does not sanitize or validate it.
 *   If you build `srcdoc` from untrusted input, that is on you (and your incident report).
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create iframes in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */

import { createElement, type ElementOf, type GlobalAttrs, type AttrValue } from '../../../ts/dom';

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
 * The semantic tag name for iframe embeds.
 *
 * @category Constants
 */
export const IFRAME_TAG = 'iframe' as const;

/**
 * A CSS selector targeting iframe elements.
 *
 * @category Constants
 */
export const IFRAME_SELECTOR = 'iframe';

/**
 * Allowed values for the iframe `loading` attribute.
 *
 * @category Types
 */
export type IFrameLoading = 'eager' | 'lazy';

/**
 * Allowed values for the iframe `referrerpolicy` attribute.
 *
 * @category Types
 */
export type IFrameReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

/**
 * Allowed values for the `fetchpriority` attribute.
 *
 * @category Types
 */
export type FetchPriority = 'high' | 'low' | 'auto';

/**
 * Attribute bag for iframe creation/enhancement.
 *
 * @remarks
 * Iframes accept standard HTML global attributes plus iframe-specific attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type IFrameAttrs = Omit<GlobalAttrs, 'aria'> & {
  /**
   * Structured ARIA fields mapped into `aria-*` attributes.
   */
  aria?: StructuredAria;

  /**
   * Address of the document to embed.
   */
  src?: string;

  /**
   * Inline HTML to render within the iframe.
   *
   * @remarks
   * Sol does not sanitize `srcdoc`.
   */
  srcdoc?: string;

  /**
   * A name for the browsing context.
   */
  name?: string;

  /**
   * A space-separated list of sandbox tokens.
   *
   * @remarks
   * Use the least permissive sandbox you can.
   */
  sandbox?: string;

  /**
   * Permissions policy for the iframe (previously "feature policy").
   *
   * @remarks
   * Example: `allow="fullscreen; geolocation 'none'"`.
   */
  allow?: string;

  /**
   * Whether fullscreen is allowed.
   *
   * @remarks
   * Mirrors the `allowfullscreen` boolean attribute.
   */
  allowFullScreen?: boolean;

  /**
   * Whether the iframe should be loaded lazily or eagerly.
   */
  loading?: IFrameLoading;

  /**
   * Referrer policy for requests made by the iframe.
   */
  referrerPolicy?: IFrameReferrerPolicy;

  /**
   * Display width, in CSS pixels.
   */
  width?: number | string;

  /**
   * Display height, in CSS pixels.
   */
  height?: number | string;

  /**
   * Fetch priority hint.
   */
  fetchPriority?: FetchPriority;

  /**
   * Content Security Policy to apply to the embedded document.
   *
   * @remarks
   * Support varies by browser and context.
   */
  csp?: string;

  /**
   * Whether to use a credentialless iframe (privacy-oriented isolation).
   *
   * @remarks
   * Mirrors the `credentialless` boolean attribute where supported.
   */
  credentialless?: boolean;
};

/**
 * Normalize {@link IFrameAttrs} into {@link GlobalAttrs} for `dom.ts`.
 *
 * @param attrs - The iframe attributes.
 * @returns A {@link GlobalAttrs} object, or `undefined` if no attrs were provided.
 *
 * @category Internal
 */
function toGlobalAttrs(attrs?: IFrameAttrs): GlobalAttrs | undefined {
  if (!attrs) return undefined;

  const {
    aria,
    src,
    srcdoc,
    name,
    sandbox,
    allow,
    allowFullScreen,
    loading,
    referrerPolicy,
    width,
    height,
    fetchPriority,
    csp,
    credentialless,
    ...rest
  } = attrs;

  // Start with any caller-provided attrs escape hatch (it is still validated by dom.ts).
  const mergedAttrs: Record<string, AttrValue> = { ...(rest.attrs ?? {}) };

  // Helper: only set if caller didn't already set the raw attribute explicitly.
  const setIfUnset = (key: string, value: AttrValue | undefined): void => {
    if (value === undefined) return;
    if (Object.prototype.hasOwnProperty.call(mergedAttrs, key)) return;
    mergedAttrs[key] = value;
  };

  setIfUnset('src', src);
  setIfUnset('srcdoc', srcdoc);
  setIfUnset('name', name);
  setIfUnset('sandbox', sandbox);
  setIfUnset('allow', allow);
  setIfUnset('loading', loading);
  setIfUnset('referrerpolicy', referrerPolicy);
  setIfUnset('width', width);
  setIfUnset('height', height);
  setIfUnset('fetchpriority', fetchPriority);
  setIfUnset('csp', csp);

  // Boolean attributes are represented by presence. We set empty-string when true.
  if (allowFullScreen === true) setIfUnset('allowfullscreen', '');
  if (credentialless === true) setIfUnset('credentialless', '');

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};
  if (aria) {
    if (typeof aria.label === 'string') mappedAria.label = aria.label;
    if (typeof aria.labelledby === 'string') mappedAria.labelledby = aria.labelledby;
    if (typeof aria.hidden === 'boolean') mappedAria.hidden = aria.hidden;
  }

  const hasMappedAria = Object.keys(mappedAria).length > 0;
  const hasMergedAttrs = Object.keys(mergedAttrs).length > 0;

  const next: GlobalAttrs = { ...rest };
  if (hasMergedAttrs) next.attrs = mergedAttrs;
  if (hasMappedAria) next.aria = mappedAria;

  return next;
}

/**
 * Create an iframe element with optional fallback text and attributes.
 *
 * @remarks
 * - Fallback text is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional fallback text content for the iframe (rarely used, but valid).
 * @param attrs - Optional attributes to apply.
 * @returns The created `<iframe>` element.
 *
 * @example
 * ```ts
 * import { createIFrame } from "@lnpg/sol/elements/media/iframe";
 *
 * document.body.appendChild(
 *   createIFrame(undefined, {
 *     title: "Embedded map",
 *     src: "https://example.com/map",
 *     loading: "lazy",
 *     sandbox: "allow-scripts allow-same-origin"
 *   })
 * );
 * ```
 *
 * @category DOM
 */
export function createIFrame(text?: string, attrs?: IFrameAttrs): ElementOf<typeof IFRAME_TAG> {
  return createElement(IFRAME_TAG, toGlobalAttrs(attrs), text);
}

/**
 * Enhance iframe elements within a given root.
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
export function enhanceIFrames(root: ParentNode = document): void {
  // v1.0.0: no runtime behavior for iframe.
  void root;
}
