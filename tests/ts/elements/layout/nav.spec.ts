import { describe, expect, it } from 'vitest';

import { createNav, enhanceNavs, NAV_TAG } from '../../../../src/elements/layout/nav';

// Minimal DOM shim for unit tests (Fundatio is framework-agnostic and DOM-first).
type FakeEl = {
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
  dataset: Record<string, string>;
  style: Record<string, unknown>;
  textContent: string;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
};

function makeEl(tagName: string): FakeEl {
  const attrs = new Map<string, string>();

  return {
    tagName: tagName.toUpperCase(),
    id: '',
    className: '',
    title: '',
    lang: '',
    dir: '',
    hidden: false,
    tabIndex: 0,
    draggable: false,
    spellcheck: false,
    contentEditable: '',
    dataset: {},
    style: {},
    textContent: '',
    setAttribute: (name: string, value: string) => {
      attrs.set(String(name), String(value));
    },
    getAttribute: (name: string) => attrs.get(String(name)) ?? null,
  };
}

// @ts-expect-error - Test environment provides a tiny DOM shim.
globalThis.document = {
  createElement: (tag: string) => makeEl(tag),
};

describe('elements/layout/nav', () => {
  it('exports the expected tag constant', () => {
    expect(NAV_TAG).toBe('nav');
  });

  it('creates a <nav> element', () => {
    const el = createNav();
    expect(el.tagName.toLowerCase()).toBe('nav');
  });

  it('assigns text via textContent when provided', () => {
    const el = createNav('Links');
    expect(el.textContent).toBe('Links');
  });

  it('applies global attributes', () => {
    const el = createNav(undefined, {
      id: 'primary-nav',
      className: 'site-nav',
      title: 'Main navigation',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 1,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'false',
      dataset: { trackingId: '123' },
      attrs: { 'data-extra': 'ok' },
      style: { display: 'block' },
    });

    expect(el.id).toBe('primary-nav');
    expect(el.className).toBe('site-nav');
    expect(el.title).toBe('Main navigation');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(1);
    expect(el.draggable).toBe(true);
    expect(el.spellcheck).toBe(true);
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.contentEditable).toBe('false');
    expect(el.dataset.trackingId).toBe('123');
    expect(el.getAttribute('data-extra')).toBe('ok');
    expect(el.style.display).toBe('block');
  });

  it('maps structured ARIA fields', () => {
    const el = createNav(undefined, {
      aria: {
        label: 'Primary',
        labelledby: 'nav-title',
        hidden: true,
      },
    });

    expect(el.getAttribute('aria-label')).toBe('Primary');
    expect(el.getAttribute('aria-labelledby')).toBe('nav-title');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks inline event handler attributes via attrs', () => {
    expect(() =>
      createNav(undefined, {
        // @ts-expect-error - This is intentionally unsafe, test ensures it is rejected.
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('blocks raw style attribute via attrs', () => {
    expect(() =>
      createNav(undefined, {
        // @ts-expect-error - This is intentionally unsafe, test ensures it is rejected.
        attrs: { style: 'display:block' },
      }),
    ).toThrow();
  });

  it('enhanceNavs is a no-op', () => {
    expect(() => enhanceNavs()).not.toThrow();
  });
});
