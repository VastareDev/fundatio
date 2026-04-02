import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createA, enhanceAs } from '../../../../src/elements/inline/a';

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
    // Provided so we can prove it is never used.
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

describe('elements/inline/a', () => {
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

  it('creates an <a> via document.createElement (never createElementNS)', () => {
    const el = createA();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['a']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('A');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createA('<b>hello</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>hello</b>');
  });

  it('applies link-related attributes when provided', () => {
    const el = createA('Docs', {
      href: '/docs',
      target: '_self',
      rel: 'help',
      hreflang: 'en',
      type: 'text/html',
      referrerPolicy: 'no-referrer',
      ping: ['https://example.com/p1', 'https://example.com/p2'],
      download: 'file.txt',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('href')).toBe('/docs');
    expect(fake.getAttribute('target')).toBe('_self');
    expect(fake.getAttribute('rel')).toBe('help');
    expect(fake.getAttribute('hreflang')).toBe('en');
    expect(fake.getAttribute('type')).toBe('text/html');
    expect(fake.getAttribute('referrerpolicy')).toBe('no-referrer');
    expect(fake.getAttribute('ping')).toBe('https://example.com/p1 https://example.com/p2');
    expect(fake.getAttribute('download')).toBe('file.txt');
  });

  it('sets a bare download attribute when download=true', () => {
    const el = createA('Download', { href: '/file', download: true });
    const fake = el as unknown as FakeElement;

    expect(fake.hasAttribute('download')).toBe(true);
    expect(fake.getAttribute('download')).toBe('');
  });

  it('defaults rel to "noopener noreferrer" when target=_blank and rel is not provided', () => {
    const el = createA('External', { href: 'https://example.com', target: '_blank' });
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('target')).toBe('_blank');
    expect(fake.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('does not override an explicit rel when target=_blank', () => {
    const el = createA('External', {
      href: 'https://example.com',
      target: '_blank',
      rel: 'nofollow',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('rel')).toBe('nofollow');
  });

  it('forwards curated global attributes', () => {
    const el = createA('Link', {
      id: 'l1',
      className: 'link',
      title: 'Go somewhere',
      lang: 'en',
      dir: 'ltr',
      role: 'link',
      hidden: true,
      tabIndex: 1,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      style: { fontSize: '16px' } as any,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('l1');
    expect(fake.className).toBe('link');
    expect(fake.title).toBe('Go somewhere');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(1);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('link');
    expect(fake.getAttribute('translate')).toBe('no');

    expect(fake.style.fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createA(undefined, {
      aria: {
        label: 'Go to docs',
        labelledby: 'heading-1',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Go to docs');
    expect(fake.getAttribute('aria-labelledby')).toBe('heading-1');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createA(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createA(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createA(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceAs is a no-op (but stable hook)', () => {
    expect(() => enhanceAs()).not.toThrow();
  });
});
