import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createDl, DL_TAG, enhanceDls } from '../../../../src/elements/list/dl';

type FakeElement = {
  tagName: string;
  id: string;
  className: string;
  title: string;
  lang: string;
  dir: string;
  hidden: boolean;
  tabIndex: number;
  draggable: boolean;
  spellcheck: boolean;
  contentEditable: string;
  style: Record<string, string>;
  dataset: Record<string, string>;
  textContent: string | null;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
};

type FakeDocument = {
  createElement: (tag: string) => FakeElement;
};

describe('dl element helpers', () => {
  let fake: FakeElement;
  let fakeDocument: FakeDocument;

  beforeEach(() => {
    fake = {
      tagName: 'dl',
      id: '',
      className: '',
      title: '',
      lang: '',
      dir: '',
      hidden: false,
      tabIndex: 0,
      draggable: false,
      spellcheck: false,
      contentEditable: 'inherit',
      style: {},
      dataset: {},
      textContent: null,
      setAttribute(name: string, value: string) {
        (this as any)[`__attr__${name}`] = value;
      },
      getAttribute(name: string) {
        return (this as any)[`__attr__${name}`] ?? null;
      },
    };

    fakeDocument = {
      createElement: (tag: string) => {
        fake.tagName = tag;
        return fake;
      },
    };

    vi.stubGlobal('document', fakeDocument);
  });

  it('creates a dl element', () => {
    const el = createDl();
    expect(el).toBe(fake);
    expect(fake.tagName).toBe(DL_TAG);
  });

  it('assigns text content when provided', () => {
    createDl('Specs');
    expect(fake.textContent).toBe('Specs');
  });

  it('applies common global attributes', () => {
    createDl(undefined, {
      id: 'specs',
      className: 'meta',
      title: 'Product specs',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 2,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'false',
      style: { fontWeight: '700' } as any,
      dataset: { trackingId: '123' },
      attrs: { 'data-extra': 'ok' },
    });

    expect(fake.id).toBe('specs');
    expect(fake.className).toBe('meta');
    expect(fake.title).toBe('Product specs');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(2);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.getAttribute('translate')).toBe('no');
    expect(fake.contentEditable).toBe('false');

    expect(fake.style.fontWeight).toBe('700');
    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-extra')).toBe('ok');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    createDl(undefined, {
      aria: {
        label: 'Specifications',
        labelledby: 'heading-1',
        hidden: true,
      },
    });

    expect(fake.getAttribute('aria-label')).toBe('Specifications');
    expect(fake.getAttribute('aria-labelledby')).toBe('heading-1');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createDl(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createDl(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createDl(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceDls is a no-op (but stable hook)', () => {
    expect(() => enhanceDls()).not.toThrow();
  });
});
