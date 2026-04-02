import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createSource, enhanceSources } from '../../../../src/elements/responsive/source';

/**
 * Minimal DOM shim for node-based tests.
 * Vitest environment is node, so `document` doesn't exist unless we provide it.
 */

type AttrMap = Record<string, string>;

class FakeElement {
  public readonly tagName: string;

  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir = '';

  public hidden = false;
  public tabIndex = -1;

  public draggable = false;
  public spellcheck = false;
  public contentEditable = '';

  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};
  public textContent: string | null = null;

  private _attrs: AttrMap = {};

  public constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this._attrs[name] = String(value);
  }

  public getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this._attrs, name) ? this._attrs[name] : null;
  }

  public hasAttribute(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._attrs, name);
  }
}

function installFakeDocument() {
  const g = globalThis as any;
  const prev = g.document;

  const calls: { createElement: string[]; createElementNS: string[] } = {
    createElement: [],
    createElementNS: [],
  };

  g.document = {
    createElement: (tag: string) => {
      calls.createElement.push(tag);
      return new FakeElement(tag);
    },
    // We explicitly provide createElementNS so tests can prove it is never used.
    createElementNS: (ns: string, tag: string) => {
      calls.createElementNS.push(`${ns}:${tag}`);
      return new FakeElement(tag);
    },
  };

  return {
    calls,
    restore: () => {
      g.document = prev;
    },
  };
}

describe('elements/responsive/source', () => {
  let restoreDocument: (() => void) | null = null;
  let calls: { createElement: string[]; createElementNS: string[] };

  beforeEach(() => {
    const installed = installFakeDocument();
    restoreDocument = installed.restore;
    calls = installed.calls;
  });

  afterEach(() => {
    restoreDocument?.();
    restoreDocument = null;
  });

  it('creates a <source> via document.createElement (never createElementNS)', () => {
    const el = createSource({ src: '/media/movie.mp4' });
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['source']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('SOURCE');
  });

  it('is a void element (no text content)', () => {
    const el = createSource({ src: '/media/movie.mp4' });
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBeNull();
  });

  it('maps media-source attributes (src, type, media)', () => {
    const el = createSource({
      src: '/media/movie.webm',
      type: 'video/webm',
      media: '(min-width: 800px)',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('src')).toBe('/media/movie.webm');
    expect(fake.getAttribute('type')).toBe('video/webm');
    expect(fake.getAttribute('media')).toBe('(min-width: 800px)');
  });

  it('maps picture-source attributes (srcset, sizes, type, media)', () => {
    const el = createSource({
      srcSet: '/img/a-800.jpg 800w, /img/a-1600.jpg 1600w',
      sizes: '(max-width: 800px) 100vw, 800px',
      type: 'image/jpeg',
      media: '(min-width: 600px)',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('srcset')).toBe('/img/a-800.jpg 800w, /img/a-1600.jpg 1600w');
    expect(fake.getAttribute('sizes')).toBe('(max-width: 800px) 100vw, 800px');
    expect(fake.getAttribute('type')).toBe('image/jpeg');
    expect(fake.getAttribute('media')).toBe('(min-width: 600px)');
  });

  it('throws when neither src nor srcSet is provided', () => {
    expect(() => createSource({})).toThrow(/requires at least one of "src" or "srcSet"/i);
  });

  it('throws when sizes is provided without srcSet', () => {
    expect(() =>
      createSource({
        src: '/media/movie.mp4',
        sizes: '100vw',
      }),
    ).toThrow(/sizes.+only.+srcSet/i);
  });

  it('forwards curated global attributes', () => {
    const el = createSource({
      src: '/media/movie.mp4',
      id: 's1',
      className: 'asset',
      title: 'Movie source',
      lang: 'en',
      dir: 'ltr',
      role: 'presentation',
      hidden: true,
      tabIndex: 0,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      style: { fontSize: '16px' } as any,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('s1');
    expect(fake.className).toBe('asset');
    expect(fake.title).toBe('Movie source');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(0);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('presentation');
    expect(fake.getAttribute('translate')).toBe('no');

    expect((fake.style as any).fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createSource({
      src: '/media/movie.mp4',
      aria: {
        label: 'Movie source',
        labelledby: 'movie-title',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Movie source');
    expect(fake.getAttribute('aria-labelledby')).toBe('movie-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createSource({
        src: '/media/movie.mp4',
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createSource({
        src: '/media/movie.mp4',
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createSource({
        src: '/media/movie.mp4',
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceSources is a no-op (but stable hook)', () => {
    expect(() => enhanceSources()).not.toThrow();
  });
});
