/**
 * DOM helpers for Sol element modules.
 *
 * @remarks
 * Sol is a design foundation, not a component framework. These helpers exist to
 * keep element entrypoints small, consistent, and safe across:
 * - Vanilla JS
 * - TypeScript direct consumption
 * - React and Vue lifecycle usage
 *
 * The helpers apply a curated set of common global attributes and provide an
 * escape hatch for additional attributes, while preventing common XSS footguns.
 *
 * @module
 * @category Internal
 */
/**
 * Canonical element return type for a given HTML tag key.
 *
 * @remarks
 * This avoids "invented" DOM types (e.g. `HTMLAddressElement`) and always matches
 * what TypeScript's `lib.dom.d.ts` actually provides.
 *
 * @example
 * type HrEl = ElementOf<'hr'>; // HTMLHRElement
 * type AddressEl = ElementOf<'address'>; // HTMLElement (no special DOM interface)
 *
 * @category Types
 */
export type ElementOf<K extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[K];
/**
 * Values that are safely coerced to strings for attributes.
 *
 * @category Types
 */
export type AttrValue = string | number | boolean;
/**
 * A curated, safe subset of HTML global attributes commonly applied to elements.
 *
 * @remarks
 * This type intentionally focuses on widely used global attributes and provides
 * a generic escape hatch via {@link GlobalAttrs.attrs} for less common cases.
 *
 * Security rules enforced by {@link applyGlobalAttrs}:
 * - Blocks inline event handler attributes like `onclick`
 * - Blocks the raw `style` attribute. Use {@link GlobalAttrs.style} instead
 *
 * @category Attributes
 */
export type GlobalAttrs = {
    /**
     * The element ID.
     *
     * @remarks
     * Must be unique within the document.
     */
    id?: string;
    /**
     * The element class string.
     *
     * @remarks
     * This maps to `class` in HTML. Use this instead of passing `class` through
     * {@link GlobalAttrs.attrs}.
     */
    className?: string;
    /**
     * Advisory information, typically shown as a tooltip in browsers.
     */
    title?: string;
    /**
     * Language of the element's content.
     *
     * @remarks
     * Useful when rendering mixed-language documents, or when an element's content
     * differs from the page language.
     */
    lang?: string;
    /**
     * Text direction of the element's content.
     */
    dir?: 'ltr' | 'rtl' | 'auto';
    /**
     * Optional ARIA role.
     *
     * @remarks
     * Prefer native semantics when possible. Only set `role` when needed.
     */
    role?: string;
    /**
     * Whether the element is hidden.
     *
     * @remarks
     * Mirrors the `hidden` boolean attribute.
     */
    hidden?: boolean;
    /**
     * Tabbing order.
     *
     * @remarks
     * Use with care. Setting a tab index on non-interactive elements can reduce
     * usability and accessibility.
     */
    tabIndex?: number;
    /**
     * Whether the element is draggable.
     */
    draggable?: boolean;
    /**
     * Whether spellchecking is enabled for editable content.
     *
     * @remarks
     * Mirrors `spellcheck`. This has effect primarily when `contentEditable` is used.
     */
    spellCheck?: boolean;
    /**
     * Translation hint for user agents.
     *
     * @remarks
     * Maps to the `translate` attribute.
     */
    translate?: 'yes' | 'no';
    /**
     * Whether the element is editable.
     *
     * @remarks
     * Use sparingly. Many apps are better served by explicit form controls.
     */
    contentEditable?: 'true' | 'false' | 'plaintext-only';
    /**
     * Inline style properties to assign to the element.
     *
     * @remarks
     * This is safer than accepting a raw style string because it avoids the
     * `style="..."` attribute injection surface.
     *
     * This does not make untrusted input "safe". If callers build styles from
     * untrusted sources, they must validate inputs appropriately.
     */
    style?: Partial<CSSStyleDeclaration>;
    /**
     * Dataset values applied as `data-*` attributes.
     *
     * @remarks
     * Keys map to `HTMLElement.dataset` keys (camelCase), and values are coerced
     * to strings.
     *
     * Example: `{ trackingId: "123" }` becomes `data-tracking-id="123"`.
     */
    dataset?: Record<string, AttrValue>;
    /**
     * ARIA attribute values applied as `aria-*` attributes.
     *
     * @remarks
     * Keys are appended to `aria-`. Example: `{ label: "Close" }` becomes
     * `aria-label="Close"`.
     */
    aria?: Record<string, AttrValue>;
    /**
     * Escape hatch for additional attributes not modeled above.
     *
     * @remarks
     * This exists to keep the API practical without turning Sol into a full DOM
     * abstraction layer.
     *
     * Security rules:
     * - Attributes starting with `on` are rejected (blocks inline event handlers)
     * - The `style` attribute is rejected (use {@link GlobalAttrs.style})
     */
    attrs?: Record<string, AttrValue>;
};
/**
 * Apply {@link GlobalAttrs} to an existing element.
 *
 * @remarks
 * - This function does not attempt to "sanitize" content. It avoids the biggest
 *   footguns by refusing inline event handler attributes and raw `style`.
 * - Text content should be assigned via `textContent` rather than `innerHTML`.
 *
 * @param el - The element to apply attributes to.
 * @param a - The attribute bag. If omitted, the function is a no-op.
 *
 * @example
 * Apply common attributes:
 * ```ts
 * const p = document.createElement("p");
 * applyGlobalAttrs(p, { id: "intro", className: "lead", lang: "en" });
 * ```
 *
 * @example
 * Apply dataset and ARIA:
 * ```ts
 * applyGlobalAttrs(p, {
 *   dataset: { trackingId: "123" },
 *   aria: { label: "Intro paragraph" }
 * });
 * ```
 *
 * @throws Error if {@link GlobalAttrs.attrs} or {@link GlobalAttrs.aria} contain
 * an unsafe attribute name.
 *
 * @category Attributes
 */
export declare function applyGlobalAttrs(el: HTMLElement, a?: GlobalAttrs): void;
/**
 * Create a DOM element, apply {@link GlobalAttrs}, and optionally set text content.
 *
 * @remarks
 * This helper is intentionally conservative:
 * - Uses `textContent`, not `innerHTML`, which prevents HTML interpretation.
 * - Does not accept a raw style string.
 *
 * @typeParam K - A key of {@link HTMLElementTagNameMap}, inferred from `tag`.
 * @param tag - The tag name to create.
 * @param attrs - Global attributes to apply.
 * @param text - Optional text content. Assigned via `textContent`.
 * @returns The created element with the correct DOM type for the tag.
 *
 * @example
 * ```ts
 * const p = createElement("p", { className: "lead" }, "Hello.");
 * document.body.appendChild(p);
 * ```
 *
 * @throws Error if unsafe attributes are provided via {@link GlobalAttrs.attrs}
 * or {@link GlobalAttrs.aria}.
 *
 * @category DOM
 */
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: GlobalAttrs, text?: string): ElementOf<K>;
/**
 * Create a void element (e.g. `<hr>`, `<br>`) and apply {@link GlobalAttrs}.
 *
 * @remarks
 * Use this when the element must never carry text content.
 *
 * @typeParam K - A key of {@link HTMLElementTagNameMap}, inferred from `tag`.
 * @param tag - The tag name to create.
 * @param attrs - Global attributes to apply.
 * @returns The created element with the correct DOM type for the tag.
 *
 * @throws Error if unsafe attributes are provided via {@link GlobalAttrs.attrs}
 * or {@link GlobalAttrs.aria}.
 *
 * @category DOM
 */
export declare function createVoidElement<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: GlobalAttrs): ElementOf<K>;
//# sourceMappingURL=dom.d.ts.map