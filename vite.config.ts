import { defineConfig } from 'vite';
import { resolve } from 'path';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  elements: resolve(__dirname, 'src/elements/index.ts'),
  'elements/container': resolve(__dirname, 'src/elements/container/index.ts'),
  'elements/container/div': resolve(__dirname, 'src/elements/container/div/index.ts'),
  'elements/container/span': resolve(__dirname, 'src/elements/container/span/index.ts'),
  'elements/break': resolve(__dirname, 'src/elements/break/index.ts'),
  'elements/break/br': resolve(__dirname, 'src/elements/break/br/index.ts'),
  'elements/break/wbr': resolve(__dirname, 'src/elements/break/wbr/index.ts'),
  'elements/media': resolve(__dirname, 'src/elements/media/index.ts'),
  'elements/media/img': resolve(__dirname, 'src/elements/media/img/index.ts'),
  'elements/media/svg': resolve(__dirname, 'src/elements/media/svg/index.ts'),
  'elements/media/math': resolve(__dirname, 'src/elements/media/math/index.ts'),
  'elements/media/canvas': resolve(__dirname, 'src/elements/media/canvas/index.ts'),
  'elements/media/iframe': resolve(__dirname, 'src/elements/media/iframe/index.ts'),
  'elements/media/embed': resolve(__dirname, 'src/elements/media/embed/index.ts'),
  'elements/media/object': resolve(__dirname, 'src/elements/media/object/index.ts'),
  'elements/media/video': resolve(__dirname, 'src/elements/media/video/index.ts'),
  'elements/media/audio': resolve(__dirname, 'src/elements/media/audio/index.ts'),
  'elements/table': resolve(__dirname, 'src/elements/table/index.ts'),
  'elements/table/table': resolve(__dirname, 'src/elements/table/table/index.ts'),
  'elements/table/colgroup': resolve(__dirname, 'src/elements/table/colgroup/index.ts'),
  'elements/table/col': resolve(__dirname, 'src/elements/table/col/index.ts'),
  'elements/table/thead': resolve(__dirname, 'src/elements/table/thead/index.ts'),
  'elements/table/tbody': resolve(__dirname, 'src/elements/table/tbody/index.ts'),
  'elements/table/tfoot': resolve(__dirname, 'src/elements/table/tfoot/index.ts'),
  'elements/table/tr': resolve(__dirname, 'src/elements/table/tr/index.ts'),
  'elements/table/th': resolve(__dirname, 'src/elements/table/th/index.ts'),
  'elements/table/td': resolve(__dirname, 'src/elements/table/td/index.ts'),
  'elements/table/caption': resolve(__dirname, 'src/elements/table/caption/index.ts'),
  'elements/heading': resolve(__dirname, 'src/elements/heading/index.ts'),
  'elements/heading/h1': resolve(__dirname, 'src/elements/heading/h1/index.ts'),
  'elements/heading/h2': resolve(__dirname, 'src/elements/heading/h2/index.ts'),
  'elements/heading/h3': resolve(__dirname, 'src/elements/heading/h3/index.ts'),
  'elements/heading/h4': resolve(__dirname, 'src/elements/heading/h4/index.ts'),
  'elements/heading/h5': resolve(__dirname, 'src/elements/heading/h5/index.ts'),
  'elements/heading/h6': resolve(__dirname, 'src/elements/heading/h6/index.ts'),
  'elements/text': resolve(__dirname, 'src/elements/text/index.ts'),
  'elements/text/paragraph': resolve(__dirname, 'src/elements/text/paragraph/index.ts'),
  'elements/text/hr': resolve(__dirname, 'src/elements/text/hr/index.ts'),
  'elements/text/pre': resolve(__dirname, 'src/elements/text/pre/index.ts'),
  'elements/text/blockquote': resolve(__dirname, 'src/elements/text/blockquote/index.ts'),
  'elements/text/address': resolve(__dirname, 'src/elements/text/address/index.ts'),
  'elements/inline': resolve(__dirname, 'src/elements/inline/index.ts'),
  'elements/inline/a': resolve(__dirname, 'src/elements/inline/a/index.ts'),
  'elements/inline/abbr': resolve(__dirname, 'src/elements/inline/abbr/index.ts'),
  'elements/inline/b': resolve(__dirname, 'src/elements/inline/b/index.ts'),
  'elements/inline/cite': resolve(__dirname, 'src/elements/inline/cite/index.ts'),
  'elements/inline/code': resolve(__dirname, 'src/elements/inline/code/index.ts'),
  'elements/inline/data': resolve(__dirname, 'src/elements/inline/data/index.ts'),
  'elements/inline/dfn': resolve(__dirname, 'src/elements/inline/dfn/index.ts'),
  'elements/inline/em': resolve(__dirname, 'src/elements/inline/em/index.ts'),
  'elements/inline/i': resolve(__dirname, 'src/elements/inline/i/index.ts'),
  'elements/inline/kbd': resolve(__dirname, 'src/elements/inline/kbd/index.ts'),
  'elements/inline/mark': resolve(__dirname, 'src/elements/inline/mark/index.ts'),
  'elements/inline/q': resolve(__dirname, 'src/elements/inline/q/index.ts'),
  'elements/inline/rb': resolve(__dirname, 'src/elements/inline/rb/index.ts'),
  'elements/inline/rt': resolve(__dirname, 'src/elements/inline/rt/index.ts'),
  'elements/inline/rtc': resolve(__dirname, 'src/elements/inline/rtc/index.ts'),
  'elements/inline/ruby': resolve(__dirname, 'src/elements/inline/ruby/index.ts'),
  'elements/inline/s': resolve(__dirname, 'src/elements/inline/s/index.ts'),
  'elements/inline/samp': resolve(__dirname, 'src/elements/inline/samp/index.ts'),
  'elements/inline/small': resolve(__dirname, 'src/elements/inline/small/index.ts'),
  'elements/inline/strong': resolve(__dirname, 'src/elements/inline/strong/index.ts'),
  'elements/inline/sub': resolve(__dirname, 'src/elements/inline/sub/index.ts'),
  'elements/inline/sup': resolve(__dirname, 'src/elements/inline/sup/index.ts'),
  'elements/inline/time': resolve(__dirname, 'src/elements/inline/time/index.ts'),
  'elements/inline/u': resolve(__dirname, 'src/elements/inline/u/index.ts'),
  'elements/inline/var': resolve(__dirname, 'src/elements/inline/var/index.ts'),
  'elements/list': resolve(__dirname, 'src/elements/list/index.ts'),
  'elements/list/dd': resolve(__dirname, 'src/elements/list/dd/index.ts'),
  'elements/list/dl': resolve(__dirname, 'src/elements/list/dl/index.ts'),
  'elements/list/dt': resolve(__dirname, 'src/elements/list/dt/index.ts'),
  'elements/list/li': resolve(__dirname, 'src/elements/list/li/index.ts'),
  'elements/list/ol': resolve(__dirname, 'src/elements/list/ol/index.ts'),
  'elements/list/ul': resolve(__dirname, 'src/elements/list/ul/index.ts'),
  'elements/figure': resolve(__dirname, 'src/elements/figure/index.ts'),
  'elements/figure/figcaption': resolve(__dirname, 'src/elements/figure/figcaption/index.ts'),
  'elements/figure/figure': resolve(__dirname, 'src/elements/figure/figure/index.ts'),
  'elements/form': resolve(__dirname, 'src/elements/form/index.ts'),
  'elements/form/button': resolve(__dirname, 'src/elements/form/button/index.ts'),
  'elements/form/datalist': resolve(__dirname, 'src/elements/form/datalist/index.ts'),
  'elements/form/fieldset': resolve(__dirname, 'src/elements/form/fieldset/index.ts'),
  'elements/form/form': resolve(__dirname, 'src/elements/form/form/index.ts'),
  'elements/form/input': resolve(__dirname, 'src/elements/form/input/index.ts'),
  'elements/form/label': resolve(__dirname, 'src/elements/form/label/index.ts'),
  'elements/form/legend': resolve(__dirname, 'src/elements/form/legend/index.ts'),
  'elements/form/meter': resolve(__dirname, 'src/elements/form/meter/index.ts'),
  'elements/form/optgroup': resolve(__dirname, 'src/elements/form/optgroup/index.ts'),
  'elements/form/option': resolve(__dirname, 'src/elements/form/option/index.ts'),
  'elements/form/output': resolve(__dirname, 'src/elements/form/output/index.ts'),
  'elements/form/progress': resolve(__dirname, 'src/elements/form/progress/index.ts'),
  'elements/form/select': resolve(__dirname, 'src/elements/form/select/index.ts'),
  'elements/form/textarea': resolve(__dirname, 'src/elements/form/textarea/index.ts'),
  'elements/interactive': resolve(__dirname, 'src/elements/interactive/index.ts'),
  'elements/interactive/details': resolve(__dirname, 'src/elements/interactive/details/index.ts'),
  'elements/interactive/dialog': resolve(__dirname, 'src/elements/interactive/dialog/index.ts'),
  'elements/interactive/summary': resolve(__dirname, 'src/elements/interactive/summary/index.ts'),
  'elements/responsive': resolve(__dirname, 'src/elements/responsive/index.ts'),
  'elements/responsive/picture': resolve(__dirname, 'src/elements/responsive/picture/index.ts'),
  'elements/responsive/source': resolve(__dirname, 'src/elements/responsive/source/index.ts'),
  'elements/responsive/track': resolve(__dirname, 'src/elements/responsive/track/index.ts'),
  'elements/responsive/map': resolve(__dirname, 'src/elements/responsive/map/index.ts'),
  'elements/responsive/area': resolve(__dirname, 'src/elements/responsive/area/index.ts'),
  'elements/layout': resolve(__dirname, 'src/elements/layout/index.ts'),
  'elements/layout/article': resolve(__dirname, 'src/elements/layout/article/index.ts'),
  'elements/layout/aside': resolve(__dirname, 'src/elements/layout/aside/index.ts'),
  'elements/layout/footer': resolve(__dirname, 'src/elements/layout/footer/index.ts'),
  'elements/layout/header': resolve(__dirname, 'src/elements/layout/header/index.ts'),
  'elements/layout/main': resolve(__dirname, 'src/elements/layout/main/index.ts'),
  'elements/layout/nav': resolve(__dirname, 'src/elements/layout/nav/index.ts'),
  'elements/layout/section': resolve(__dirname, 'src/elements/layout/section/index.ts'),
} as const;

function fileName(ext: 'js' | 'cjs', entryName: string): string {
  if (entryName === 'index') {
    return `index.${ext}`;
  }

  if (entryName.startsWith('elements/')) {
    const base = entryName.split('/').pop();
    return `${entryName}/${base}.${ext}`;
  }

  return `${entryName}.${ext}`;
}

export default defineConfig(({ mode }) => {
  const isCjs = mode === 'cjs';

  return {
    publicDir: false,
    build: {
      sourcemap: true,
      outDir: isCjs ? 'dist/cjs' : 'dist/esm',
      emptyOutDir: true,

      lib: {
        entry: entries,
        formats: [isCjs ? 'cjs' : 'es'],
        fileName: (_format, entryName) =>
          fileName(isCjs ? 'cjs' : 'js', entryName),
      },

      rollupOptions: {
        external: [],
        output: {
          chunkFileNames: isCjs ? 'chunks/[name].cjs' : 'chunks/[name].js',
        },
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['src'],
        },
      },
    },
  };
});
