/**
 * Sol Design Foundation: Svg element helpers.
 *
 * @remarks
 * The svg element (`<svg>`) defines scalable vector graphics.
 *
 * Sol enforces:
 * - Default decorative behaviour:
 *   - aria-hidden="true"
 *   - tabIndex = -1
 *   - focusable="false"
 * - If aria.label or aria.labelledby is provided:
 *   - role="img" is added (unless explicitly set)
 * - Explicit overrides for role, aria-hidden and tabIndex are respected.
 *
 * @module
 * @category Elements
 */

import { applyGlobalAttrs, type GlobalAttrs } from '../../../ts/dom';

/**
 * Structured ARIA input.
 */
export type StructuredAria = {
  label?: string;
  labelledby?: string;
  hidden?: boolean;
};

export const SVG_TAG = 'svg';
export const SVG_SELECTOR = 'svg';

export type SvgAttrs = Omit<GlobalAttrs, 'aria'> & {
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  aria?: StructuredAria;
};

function toGlobalAttrs(attrs?: SvgAttrs): GlobalAttrs {
  const { aria, viewBox, width, height, role, tabIndex, attrs: rawAttrs, ...rest } = attrs ?? {};

  const mapped: GlobalAttrs = { ...rest };

  // Preserve explicit role
  if (role) {
    mapped.role = role;
  }

  const mappedAria: NonNullable<GlobalAttrs['aria']> = {};

  const hasLabel = typeof aria?.label === 'string';
  const hasLabelledby = typeof aria?.labelledby === 'string';
  const explicitAriaHidden = typeof aria?.hidden === 'boolean';

  if (hasLabel) mappedAria.label = aria.label!;
  if (hasLabelledby) mappedAria.labelledby = aria.labelledby!;
  if (explicitAriaHidden) mappedAria.hidden = aria.hidden!;

  const isDecorative = !hasLabel && !hasLabelledby;

  if (isDecorative && !explicitAriaHidden) {
    mappedAria.hidden = true;
  }

  if (Object.keys(mappedAria).length > 0) {
    mapped.aria = mappedAria;
  }

  // Only auto-assign role if user did not provide one
  if (!isDecorative && !role) {
    mapped.role = 'img';
  }

  if (typeof tabIndex === 'number') {
    mapped.tabIndex = tabIndex;
  } else if (isDecorative) {
    mapped.tabIndex = -1;
  }

  // Merge user attrs with internal attrs
  const mergedAttrs: NonNullable<GlobalAttrs['attrs']> = {
    ...(rawAttrs ?? {}),
  };

  if (isDecorative) {
    mergedAttrs.focusable = 'false';
  }

  if (viewBox) mergedAttrs.viewBox = viewBox;
  if (width !== undefined) mergedAttrs.width = width;
  if (height !== undefined) mergedAttrs.height = height;

  if (Object.keys(mergedAttrs).length > 0) {
    mapped.attrs = mergedAttrs;
  }

  return mapped;
}

/**
 * Create an SVG element with accessibility defaults.
 */
export function createSvg(text?: string, attrs?: SvgAttrs): SVGSVGElement {
  const el = document.createElement('svg') as unknown as SVGSVGElement;

  applyGlobalAttrs(el as unknown as HTMLElement, toGlobalAttrs(attrs));

  if (typeof text === 'string') {
    el.textContent = text;
  }

  return el;
}

/**
 * No-op enhancement hook.
 */
export function enhanceSvgs(root: ParentNode = document): void {
  void root;
}
