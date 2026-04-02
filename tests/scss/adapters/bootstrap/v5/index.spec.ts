import { describe, expect, it } from 'vitest';

import { compileSass } from '../../../../utils/compileSass';

function compile(source: string): string {
  return compileSass(source).css;
}

describe('adapters/bootstrap/v5/index', () => {
  it('compiles successfully (default)', () => {
    expect(() => {
      compile('@use "src/scss/adapters/bootstrap/v5/index";');
    }).not.toThrow();
  });

  it('supports baseline: none (Bootstrap only)', () => {
    const css = compile(
      '@use "src/scss/adapters/bootstrap/v5/index" with ($vs-bootstrap-baseline: none);',
    );

    expect(css).toContain('.btn');
    expect(css).not.toContain('--vs-');
  });

  it('supports baseline: core', () => {
    const css = compile(
      '@use "src/scss/adapters/bootstrap/v5/index" with ($vs-bootstrap-baseline: core);',
    );

    expect(css).toContain('.btn');
    expect(css).toContain('--vs-');
  });

  it('supports baseline: main', () => {
    const css = compile(
      '@use "src/scss/adapters/bootstrap/v5/index" with ($vs-bootstrap-baseline: main);',
    );

    expect(css).toContain('.btn');
    expect(css).toContain('--vs-');
  });

  it('throws on invalid baseline value', () => {
    expect(() => {
      compile(
        '@use "src/scss/adapters/bootstrap/v5/index" with ($vs-bootstrap-baseline: banana);',
      );
    }).toThrow();
  });
});
