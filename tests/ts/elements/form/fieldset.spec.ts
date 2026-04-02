import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import {
  createFieldset,
  enhanceFieldsets,
  FIELDSET_SELECTOR,
  FIELDSET_TAG,
} from '../../../../src/elements/form/fieldset';

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

describe('elements/form/fieldset', () => {
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

  it('exports the correct tag and selector constants', () => {
    expect(FIELDSET_TAG).toBe('fieldset');
    expect(FIELDSET_SELECTOR).toBe('fieldset');
  });

  it('creates a <fieldset> via document.createElement (never createElementNS)', () => {
    const el = createFieldset();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['fieldset']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('FIELDSET');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createFieldset('<legend>nope</legend>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<legend>nope</legend>');
    // No innerHTML in FakeElement by design: the API should not use it.
  });

  it('applies fieldset-specific attributes (disabled/form/name) via safe attrs mapping', () => {
    const el = createFieldset(undefined, {
      disabled: true,
      form: 'checkout',
      name: 'delivery',
    });

    const fake = el as unknown as FakeElement;

    // Boolean attribute presence is represented as empty string.
    expect(fake.getAttribute('disabled')).toBe('');
    expect(fake.getAttribute('form')).toBe('checkout');
    expect(fake.getAttribute('name')).toBe('delivery');
  });

  it('does not set disabled attribute when disabled is false/omitted', () => {
    const el = createFieldset(undefined, { disabled: false });
    const fake = el as unknown as FakeElement;

    expect(fake.hasAttribute('disabled')).toBe(false);
  });

  it('forwards curated global attributes', () => {
    const el = createFieldset('hi', {
      id: 'fs',
      className: 'group',
      title: 'Grouping',
      lang: 'en',
      dir: 'ltr',
      role: 'group',
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

    expect(fake.id).toBe('fs');
    expect(fake.className).toBe('group');
    expect(fake.title).toBe('Grouping');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(2);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('group');
    expect(fake.getAttribute('translate')).toBe('no');

    expect(fake.style.fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createFieldset(undefined, {
      aria: {
        label: 'Shipping options',
        labelledby: 'shipping-legend',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Shipping options');
    expect(fake.getAttribute('aria-labelledby')).toBe('shipping-legend');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createFieldset(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createFieldset(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createFieldset(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceFieldsets is a no-op (but stable hook)', () => {
    expect(() => enhanceFieldsets()).not.toThrow();
  });
});
