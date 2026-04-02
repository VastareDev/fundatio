/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['src'],
  entryPointStrategy: 'expand',
  out: 'docs/api/ts',
  plugin: ['typedoc-plugin-markdown'],
  theme: 'markdown',
  categorizeByGroup: true,
  hideBreadcrumbs: true,
  readme: 'none',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeInternal: true,
  includeVersion: true,
  sort: ['kind', 'visibility', 'alphabetical'],
  tsconfig: 'tsconfig.json',
  externalSymbolLinkMappings: {
    typescript: {
      // Existing
      HTMLParagraphElement: 'https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement',
      HTMLElementTagNameMap: 'https://developer.mozilla.org/docs/Web/API/HTMLElementTagNameMap',

      // Add these to kill the warnings
      HTMLElement: 'https://developer.mozilla.org/docs/Web/API/HTMLElement',
      MathMLElement: 'https://developer.mozilla.org/docs/Web/API/MathMLElement',
      Date: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date'
    }
  }
};
