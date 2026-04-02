import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createFooter, enhanceFooters } from '../../../../src/elements/layout/footer';

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

describe('elements/layout/footer', () => {
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

  it('creates a <footer> via document.createElement (never createElementNS)', () => {
    const el = createFooter();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['footer']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('FOOTER');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createFooter('<b>©</b> 2026');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>©</b> 2026');
  });

  it('forwards curated global attributes', () => {
    const el = createFooter('© 2026', {
      id: 'f1',
      className: 'site-footer',
      title: 'Footer',
      lang: 'en',
      dir: 'ltr',
      role: 'contentinfo',
      tabIndex: 0,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('f1');
    expect(fake.className).toBe('site-footer');
    expect(fake.title).toBe('Footer');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);

    expect(fake.getAttribute('role')).toBe('contentinfo');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
    expect(fake.textContent).toBe('© 2026');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createFooter(undefined, {
      aria: {
        label: 'Site footer',
        labelledby: 'footer-title',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Site footer');
    expect(fake.getAttribute('aria-labelledby')).toBe('footer-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createFooter(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createFooter(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceFooters is a no-op (but stable hook)', () => {
    expect(() => enhanceFooters()).not.toThrow();
  });
});
