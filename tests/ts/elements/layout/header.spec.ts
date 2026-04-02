import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import {
  createHeader,
  enhanceHeaders,
  HEADER_TAG,
  HEADER_SELECTOR,
} from '../../../../src/elements/layout/header';

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
    return Object.prototype.hasOwnProperty.call(this._attrs, name)
      ? this._attrs[name]
      : null;
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

describe('elements/layout/header', () => {
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

  it('exports a constant tag name', () => {
    expect(HEADER_TAG).toBe('header');
  });

  it('exports a constant selector', () => {
    expect(HEADER_SELECTOR).toBe('header');
  });

  it('creates a header element', () => {
    const el = createHeader();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['header']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('HEADER');
  });

  it('creates a header element with text', () => {
    const el = createHeader('Hello');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('Hello');
  });

  it('applies global attributes via attrs', () => {
    const el = createHeader('Hi', {
      id: 'site-header',
      className: 'header',
      title: 'Top',
      lang: 'en',
      dir: 'ltr',
      role: 'banner',
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

    expect(fake.id).toBe('site-header');
    expect(fake.className).toBe('header');
    expect(fake.title).toBe('Top');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(0);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('banner');
    expect(fake.getAttribute('translate')).toBe('no');

    expect(fake.style.fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('maps structured aria into aria-* attributes', () => {
    const el = createHeader(undefined, {
      aria: { label: 'Site header', labelledby: 'site-title', hidden: true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Site header');
    expect(fake.getAttribute('aria-labelledby')).toBe('site-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('is safe: blocks inline event handler attrs', () => {
    expect(() =>
      createHeader(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enhanceHeaders is a stable no-op', () => {
    expect(() => enhanceHeaders()).not.toThrow();
  });
});
