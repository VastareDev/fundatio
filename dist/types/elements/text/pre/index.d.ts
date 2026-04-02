/**
 * Sol Design Foundation: Pre element helpers.
 *
 * @remarks
 * The pre element (`<pre>`) represents preformatted text which is intended to be
 * presented "as written", preserving whitespace and line breaks.
 *
 * Best-practice guidance:
 * - Use `<pre>` for text where whitespace is meaningful (e.g. code blocks, ASCII art,
 *   logs, configuration snippets). :contentReference[oaicite:3]{index=3}
 * - For code examples, prefer `<pre><code>...</code></pre>` to provide clearer
 *   semantics for assistive tech and tooling.
 * - Avoid obsolete/non-standard attributes historically associated with `<pre>`
 *   such as `width`, `cols`, or `wrap`; control layout with CSS instead
 *   (e.g. `white-space: pre-wrap` or overflow rules). :contentReference[oaicite:4]{index=4}
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create preformatted blocks in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Sol ever needs runtime behavior
 *
 * This module has no side effects and does not mutate the DOM unless you call
 * its functions.
 *
 * @module
 * @category Elements
 */
import { type ElementOf, type GlobalAttrs } from '../../../ts/dom';
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
 * The semantic tag name for preformatted text blocks.
 *
 * @category Constants
 */
export declare const PRE_TAG: "pre";
/**
 * A CSS selector targeting pre elements.
 *
 * @category Constants
 */
export declare const PRE_SELECTOR = "pre";
/**
 * Attribute bag for pre creation/enhancement.
 *
 * @remarks
 * The `<pre>` element uses standard HTML global attributes.
 *
 * Sol also supports a structured ARIA input for common ARIA fields, which is
 * mapped into {@link GlobalAttrs.aria} without changing Sol's core DOM helpers.
 *
 * @category Attributes
 */
export type PreAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
};
/**
 * Create a pre element with optional text content and global attributes.
 *
 * @remarks
 * - Text content is assigned via `textContent` (never `innerHTML`).
 * - Global attributes are applied via Sol's shared DOM helper,
 *   including security guards that block inline event handler attributes
 *   (e.g. `onclick`) and raw `style` attribute strings.
 *
 * Note:
 * - `<pre>` preserves whitespace by default in browser rendering, but wrapping
 *   behavior is typically controlled with CSS (e.g. `white-space: pre-wrap`). :contentReference[oaicite:5]{index=5}
 *
 * @param text - Optional text content for the pre element.
 * @param attrs - Optional attributes to apply.
 * @returns The created `<pre>` element.
 *
 * @example
 * Create a code block:
 * ```ts
 * import { createPre } from "@lnpg/sol/elements/text/pre";
 *
 * const pre = createPre("npm run build\nnpm run test", {
 *   className: "code-block",
 *   aria: { label: "Command output" }
 * });
 *
 * document.body.appendChild(pre);
 * ```
 *
 * @category DOM
 */
export declare function createPre(text?: string, attrs?: PreAttrs): ElementOf<typeof PRE_TAG>;
/**
 * Enhance pre elements within a given root.
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
export declare function enhancePres(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map