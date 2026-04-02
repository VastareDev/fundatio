/**
 * Media element factories.
 *
 * Provides framework-agnostic factory functions for embedded, graphical,
 * and time-based media elements.
 *
 * These factories:
 * - Create semantic HTML media elements using Fundatio's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Apply sensible fallbacks where required by the HTML specification.
 * - Prevent unsafe attribute injection.
 *
 * @module elements/media
 * @since 1.0.0
 */
/**
 * `<img>` element factory namespace.
 *
 * Embeds raster images into the document.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 */
export * as img from './img';
/**
 * `<svg>` element factory namespace.
 *
 * Embeds scalable vector graphics content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/svg
 */
export * as svg from './svg';
/**
 * `<math>` element factory namespace.
 *
 * Embeds MathML content for mathematical notation.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/math
 */
export * as math from './math';
/**
 * `<canvas>` element factory namespace.
 *
 * Provides a bitmap rendering surface for scripted drawing.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
 */
export * as canvas from './canvas';
/**
 * `<iframe>` element factory namespace.
 *
 * Embeds another HTML page within the current document.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
 */
export * as iframe from './iframe';
/**
 * `<embed>` element factory namespace.
 *
 * Embeds external content such as plugins or media resources.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
 */
export * as embed from './embed';
/**
 * `<object>` element factory namespace.
 *
 * Embeds external resources such as images, PDFs, or interactive content.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
 */
export * as object from './object';
/**
 * `<video>` element factory namespace.
 *
 * Embeds time-based video media.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
export * as video from './video';
/**
 * `<audio>` element factory namespace.
 *
 * Embeds time-based audio media.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export * as audio from './audio';
//# sourceMappingURL=index.d.ts.map