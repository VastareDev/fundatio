/**
 * Fundatio Design Foundation: Audio element helpers.
 *
 * @remarks
 * The audio element (`<audio>`) embeds sound content in documents.
 * It can load audio via `src` or nested `<source>` elements, and it can
 * also be a destination for streamed media via MediaStream.
 *
 * Best-practice guidance (MDN + platform norms):
 * - Avoid autoplaying audio unless the user explicitly opts in.
 * - Prefer showing controls (`controls`) when audio playback is user-facing.
 * - Use `preload="metadata"` as a sensible hint if you want duration, etc.
 * - Use CORS (`crossOrigin`) when audio might be reused by `<canvas>` without tainting.
 * - Prefer multiple `<source>` elements for format fallbacks where needed.
 *
 * This module provides small, framework-agnostic helpers so consumers can:
 * - create audio elements in vanilla JS/TS without templates
 * - apply consistent global attributes safely
 * - use a stable "enhancement" hook if Fundatio ever needs runtime behavior
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
 * Allowed `preload` values for media elements.
 *
 * @remarks
 * Per MDN, browsers treat this as a hint and may ignore it; `metadata` is a
 * common best-practice default in specs/guidance.
 *
 * @category Attributes
 */
export type AudioPreload = 'none' | 'metadata' | 'auto';
/**
 * Allowed values for the `crossorigin` attribute for media fetches.
 *
 * @category Attributes
 */
export type AudioCrossOrigin = 'anonymous' | 'use-credentials';
/**
 * Allowed tokens for the `controlslist` attribute (when `controls` is enabled).
 *
 * @remarks
 * MDN lists allowed values including `nodownload`, `nofullscreen`, `noremoteplayback`.
 * (`nofullscreen` is effectively video-oriented but is still a valid token in the attribute.)
 *
 * @category Attributes
 */
export type AudioControlsList = 'nodownload' | 'nofullscreen' | 'noremoteplayback';
/**
 * The semantic tag name for audio elements.
 *
 * @category Constants
 */
export declare const AUDIO_TAG: "audio";
/**
 * A CSS selector targeting audio elements.
 *
 * @category Constants
 */
export declare const AUDIO_SELECTOR = "audio";
/**
 * Attribute bag for audio creation/enhancement.
 *
 * @remarks
 * Audio elements accept HTML global attributes plus a media-specific subset.
 * Fundatio also supports structured ARIA input for common ARIA fields.
 *
 * @category Attributes
 */
export type AudioAttrs = Omit<GlobalAttrs, 'aria'> & {
    /**
     * Structured ARIA fields mapped into `aria-*` attributes.
     */
    aria?: StructuredAria;
    /**
     * The URL of the audio resource to embed.
     *
     * @remarks
     * Optional if you instead provide nested `<source>` elements.
     */
    src?: string;
    /**
     * Whether browser playback controls should be shown.
     */
    controls?: boolean;
    /**
     * Whether playback should begin automatically.
     *
     * @remarks
     * Autoplaying audio is often blocked unless user-initiated. If `autoplay`
     * is enabled and `muted` is not specified, Fundatio defaults `muted` to `true`
     * as a pragmatic alignment with autoplay policies.
     */
    autoplay?: boolean;
    /**
     * Whether the audio should loop back to the start after ending.
     */
    loop?: boolean;
    /**
     * Whether the audio should start out muted.
     */
    muted?: boolean;
    /**
     * Hint about how much to preload.
     */
    preload?: AudioPreload;
    /**
     * CORS mode for fetching the audio resource.
     */
    crossOrigin?: AudioCrossOrigin;
    /**
     * Restrict which built-in controls the user agent exposes (when `controls` is set).
     *
     * @example
     * controlsList: ['nodownload', 'noremoteplayback']
     */
    controlsList?: AudioControlsList[];
    /**
     * Disable remote playback (Chromecast/AirPlay/etc).
     */
    disableRemotePlayback?: boolean;
};
/**
 * Create an audio element with optional attributes.
 *
 * @remarks
 * Global attributes are applied via Fundatio's shared DOM helper, including security
 * guards that block inline event handler attributes (e.g. `onclick`) and raw
 * `style` attribute strings through escape hatches.
 *
 * Media-specific attributes are applied directly to the element.
 *
 * @param attrs - Optional attributes to apply.
 * @returns The created `<audio>` element.
 *
 * @example
 * ```ts
 * import { createAudio } from "@Vastare/Fundatio/elements/media/audio";
 *
 * document.body.appendChild(
 *   createAudio({ controls: true, src: "/audio/intro.mp3", preload: "metadata" })
 * );
 * ```
 *
 * @category DOM
 */
export declare function createAudio(attrs?: AudioAttrs): ElementOf<typeof AUDIO_TAG>;
/**
 * Enhance audio elements within a given root.
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
export declare function enhanceAudios(root?: ParentNode): void;
//# sourceMappingURL=index.d.ts.map