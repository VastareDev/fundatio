import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createData, enhanceDatas } from '../../../../src/elements/inline/data';

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

describe('elements/inline/data', () => {
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

  it('creates a <data> via document.createElement (never createElementNS)', () => {
    const el = createData();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['data']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('DATA');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createData('<b>Mini Ketchup</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>Mini Ketchup</b>');
  });

  it('sets the value attribute when provided', () => {
    const el = createData('Mini Ketchup', { value: 398 });
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('value')).toBe('398');
  });

  it('falls back value to text when value is omitted', () => {
    const el = createData('Mini Ketchup', {});
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('value')).toBe('Mini Ketchup');
  });

  it('does not set value when value is omitted and text is not provided', () => {
    const el = createData(undefined, {});
    const fake = el as unknown as FakeElement;

    expect(fake.hasAttribute('value')).toBe(false);
  });

  it('forwards curated global attributes', () => {
    const el = createData('Item', {
      id: 'd1',
      className: 'data',
      title: 'Machine value is stored in value',
      lang: 'en',
      dir: 'ltr',
      role: 'note',
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

    expect(fake.id).toBe('d1');
    expect(fake.className).toBe('data');
    expect(fake.title).toBe('Machine value is stored in value');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(1);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('note');
    expect(fake.getAttribute('translate')).toBe('no');

    expect(fake.style.fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createData('Item', {
      aria: { label: 'Product', labelledby: 'heading-1', hidden: true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Product');
    expect(fake.getAttribute('aria-labelledby')).toBe('heading-1');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createData('Item', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createData('Item', {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createData('Item', {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceDatas is a no-op (but stable hook)', () => {
    expect(() => enhanceDatas()).not.toThrow();
  });
});
