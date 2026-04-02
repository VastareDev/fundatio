import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createAside, enhanceAsides } from '../../../../src/elements/layout/aside';

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

describe('elements/layout/aside', () => {
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

  it('creates an <aside> via document.createElement (never createElementNS)', () => {
    const el = createAside();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['aside']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('ASIDE');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createAside('<b>Sidebar</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>Sidebar</b>');
  });

  it('forwards curated global attributes', () => {
    const el = createAside('Related', {
      id: 'a1',
      className: 'sidebar',
      title: 'Related content',
      lang: 'en',
      dir: 'ltr',
      role: 'complementary',
      tabIndex: 0,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('a1');
    expect(fake.className).toBe('sidebar');
    expect(fake.title).toBe('Related content');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);

    expect(fake.getAttribute('role')).toBe('complementary');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
    expect(fake.textContent).toBe('Related');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createAside(undefined, {
      aria: {
        label: 'Related links',
        labelledby: 'related-title',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Related links');
    expect(fake.getAttribute('aria-labelledby')).toBe('related-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createAside(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createAside(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceAsides is a no-op (but stable hook)', () => {
    expect(() => enhanceAsides()).not.toThrow();
  });
});
