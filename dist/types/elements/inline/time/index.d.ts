/**
 * Fundatio Design Foundation: Time element helpers.
 *
 * @remarks
 * The time element (`<time>`) represents a specific period in time.
 *
 * Best-practice guidance (summary):
 * - Provide a machine-readable `datetime` value when possible.
 * - Keep visible text human-friendly (e.g. "Tomorrow", "12 Feb 2026").
 * - Avoid using `<time>` purely for styling.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create `<time>` elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - supply a typed `datetime`/`dateTime` field mapped to the `datetime` attribute
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
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
     * Decorative/hidden hint, mapped to `aria-hidden`.
     */
    hidden?: boolean;
};
/**
 * The semantic tag name for time.
 *
 * @category Constants
 */
export declare const TIME_TAG: "time";
/**
 * A CSS selector targeting time elements.
 *
 * @category Constants
 */
export declare const TIME_SELECTOR = "time";
/**
 * Attribute bag for time creation/enhancement.
 *
 * @remarks
 * In addition to global attributes, `<time>` commonly uses the `datetime`
 * attribute to provide a machine-readable value.
 *
 * Fundatio supports:
 * - `datetime` (preferred, aligns with the HTML attribute name)
 * - `dateTime` (alias for ergonomic camelCase usage)
 *
 * @category Attributes
 */
export type TimeAttrs = Omit<GlobalAttrs, 'aria' | 'attrs'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * Machine-readable time value, mapped to the `datetime` attribute.
     *
     * @remarks
     * Examples:
     * - `2026-02-25`
     * - `2026-02-25T16:30:00Z`
     * - `PT2H`
     *
     * If a {@link Date} is provided, it is converted via `toISOString()`.
     */
    datetime?: string | Date;
    /**
     * Alias of {@link TimeAttrs.datetime}.
     *
     * @remarks
     * Supported for ergonomic camelCase input. If both are provided, `datetime`
     * takes precedence.
     */
    dateTime?: string | Date;
    /**
     * Additional attributes not modeled above.
     *
     * @remarks
     * This exists as an escape hatch while still allowing Fundatio to apply its
     * attribute safety rules via `dom.ts`.
     */
    attrs?: GlobalAttrs['attrs'];
};
/**
 * Create a time element with optional text content and attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Fundatio's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * @param text - Optional text content for the time element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<time>` element.
 *
 * @example
 * ```ts
 * import { createTime } from "@Vastare/Fundatio/elements/inline/time";
 *
 * const t = createTime("25 Feb 2026", { datetime: "2026-02-25" });
 * document.body.appendChild(t);
 * ```
 *
 * @example
 * Using the `dateTime` alias:
 * ```ts
 * const t = createTime("25 Feb 2026", { dateTime: "2026-02-25" });
 * ```
 *
 * @category DOM
 */
export declare function createTime(text?: string, attrs?: TimeAttrs): ElementOf<typeof TIME_TAG>;
/**
 * Enhance time elements within a given root.
 *
 * @remarks
 * This is intentionally a no-op in `1.0.0`.
 *
 * @param root - The node to search within. Defaults to `document`.
 *
 * @category Enhancement
 */
export declare function enhanceTimes(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map