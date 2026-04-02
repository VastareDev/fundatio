import { compileSass } from "./compileSass.ts";

export const escapeRegExp = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

/**
 * Generic version if a different header is ever needed.

 */
export const runSass = (snippet: string, header = ""): string => {
  const {css} = compileSass(`
    @use "sass:map";
    @use "sass:color";
    @use "sass:list";
    @use "sass:meta";
    @use "sass:string";
    @use "sass:math";
    ${header}
    
    ${snippet}
  `);

  // Normalise whitespace so string assetions are stable.
  return css.replace(/\s+/g, "");
};
