import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createH4, enhanceH4s } from '../../../../src/elements/heading/h4';

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

describe('elements/heading/h4', () => {
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

  it('creates a <h4> via document.createElement (never createElementNS)', () => {
    const el = createH4();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['h4']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('H4');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createH4('<b>hello</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>hello</b>');
    // No innerHTML in FakeElement by design: the API should not use it.
  });

  it('forwards curated global attributes', () => {
    const el = createH4('Heading', {
      id: 'h4-1',
      className: 'title',
      title: 'Tooltip',
      lang: 'en',
      dir: 'ltr',
      role: 'heading',
      hidden: true,
      tabIndex: 2,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      style: { fontSize: '16px' } as any,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('h4-1');
    expect(fake.className).toBe('title');
    expect(fake.title).toBe('Tooltip');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(2);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('heading');
    expect(fake.getAttribute('translate')).toBe('no');

    expect(fake.style.fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createH4(undefined, {
      aria: {
        label: 'Section heading',
        labelledby: 'title-1',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Section heading');
    expect(fake.getAttribute('aria-labelledby')).toBe('title-1');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createH4(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createH4(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createH4(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceH4s is a no-op (but stable hook)', () => {
    expect(() => enhanceH4s()).not.toThrow();
  });
});
