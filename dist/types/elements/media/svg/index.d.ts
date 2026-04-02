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
import { type GlobalAttrs } from '../../../ts/dom';
/**
 * Structured ARIA input.
 */
export type StructuredAria = {
    label?: string;
    labelledby?: string;
    hidden?: boolean;
};
export declare const SVG_TAG = "svg";
export declare const SVG_SELECTOR = "svg";
export type SvgAttrs = Omit<GlobalAttrs, 'aria'> & {
    viewBox?: string;
    width?: number | string;
    height?: number | string;
    aria?: StructuredAria;
};
/**
 * Create an SVG element with accessibility defaults.
 */
export declare function createSvg(text?: string, attrs?: SvgAttrs): SVGSVGElement;
/**
 * No-op enhancement hook.
 */
export declare function enhanceSvgs(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map