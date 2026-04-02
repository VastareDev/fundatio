/**
 * Responsive media element factories.
 *
 * Provides framework-agnostic factory functions for HTML elements commonly used
 * to deliver responsive, adaptive, and accessible media experiences.
 *
 * These factories:
 * - Create semantic responsive/media structures using Sol's hardened DOM helpers.
 * - Forward curated global attributes.
 * - Enforce structured, typed attribute bags.
 * - Preserve correct relationships between media resources and their metadata
 *   (e.g. `<picture>` + `<source>`, media maps via `<map>` + `<area>`, and timed
 *   text via `<track>`).
 * - Prevent unsafe attribute injection.
 *
 * The elements in this module support native browser features for responsive
 * images, image maps, and timed text tracks without framework assumptions.
 *
 * @module elements/responsive
 * @since 1.0.0
 */

/**
 * `<area>` element factory namespace.
 *
 * Represents a clickable hotspot region within an image map, associated with a
 * `<map>` element. Typically paired with an `<img usemap="...">`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
 */
export * as area from './area';

/**
 * `<map>` element factory namespace.
 *
 * Represents an image map container holding `<area>` definitions that describe
 * interactive regions on an associated image.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
 */
export * as map from './map';

/**
 * `<picture>` element factory namespace.
 *
 * Represents a container for responsive images, allowing multiple `<source>`
 * candidates and a fallback `<img>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
 */
export * as picture from './picture';

/**
 * `<source>` element factory namespace.
 *
 * Represents a media resource candidate for `<picture>`, `<audio>`, or
 * `<video>`, selected by the browser based on type/media conditions.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
 */
export * as source from './source';

/**
 * `<track>` element factory namespace.
 *
 * Represents an external timed text track (subtitles, captions, descriptions,
 * chapters, or metadata) for `<audio>` or `<video>`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 */
export * as track from './track';
