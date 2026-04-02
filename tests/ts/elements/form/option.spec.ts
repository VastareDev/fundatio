import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createOption, enhanceOptions } from '../../../../src/elements/form/option';

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

describe('elements/form/option', () => {
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

  it('creates an <option> via document.createElement (never createElementNS)', () => {
    const el = createOption();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['option']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('OPTION');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createOption('<b>UK</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>UK</b>');
  });

  it('maps option-specific attributes (value, label, disabled, selected)', () => {
    const el = createOption('United Kingdom', {
      value: 'UK',
      label: 'UK',
      disabled: true,
      selected: true,
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('value')).toBe('UK');
    expect(fake.getAttribute('label')).toBe('UK');
    expect(fake.getAttribute('disabled')).toBe('true');
    expect(fake.getAttribute('selected')).toBe('true');
  });

  it('does not set disabled/selected when false/undefined', () => {
    const el = createOption('A', { disabled: false, selected: false });
    const fake = el as unknown as FakeElement;

    expect(fake.hasAttribute('disabled')).toBe(false);
    expect(fake.hasAttribute('selected')).toBe(false);
  });

  it('forwards curated global attributes', () => {
    const el = createOption('UK', {
      id: 'uk',
      className: 'country',
      title: 'United Kingdom',
      lang: 'en',
      dir: 'ltr',
      role: 'option',
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

    expect(fake.id).toBe('uk');
    expect(fake.className).toBe('country');
    expect(fake.title).toBe('United Kingdom');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(0);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('option');
    expect(fake.getAttribute('translate')).toBe('no');

    expect((fake.style as any).fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createOption('UK', {
      aria: {
        label: 'United Kingdom option',
        labelledby: 'country-label',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('United Kingdom option');
    expect(fake.getAttribute('aria-labelledby')).toBe('country-label');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createOption('UK', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createOption('UK', {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createOption('UK', {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceOptions is a no-op (but stable hook)', () => {
    expect(() => enhanceOptions()).not.toThrow();
  });
});
