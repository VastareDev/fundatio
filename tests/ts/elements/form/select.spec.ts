import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createSelect, enhanceSelects } from '../../../../src/elements/form/select';

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
    // Provided so tests can prove it is never used.
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

describe('elements/form/select', () => {
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

  it('creates a <select> via document.createElement (never createElementNS)', () => {
    const el = createSelect();

    expect(el.tagName.toLowerCase()).toBe('select');
    expect(calls.createElement).toEqual(['select']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('does not assign textContent by default', () => {
    const el = createSelect();

    expect(el.textContent).toBeNull();
  });

  it('applies common attributes with correct HTML attribute names', () => {
    const el = createSelect({
      name: 'country',
      form: 'checkout',
      autoComplete: 'country',
      dirName: 'country.dir',
      size: 5,
    });

    expect(el.getAttribute('name')).toBe('country');
    expect(el.getAttribute('form')).toBe('checkout');
    expect(el.getAttribute('autocomplete')).toBe('country');
    expect(el.getAttribute('dirname')).toBe('country.dir');
    expect(el.getAttribute('size')).toBe('5');
  });

  it('applies boolean attributes by presence when true', () => {
    const el = createSelect({
      disabled: true,
      required: true,
      multiple: true,
      autofocus: true,
    });

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('disabled')).toBe('');

    expect(el.hasAttribute('required')).toBe(true);
    expect(el.getAttribute('required')).toBe('');

    expect(el.hasAttribute('multiple')).toBe(true);
    expect(el.getAttribute('multiple')).toBe('');

    expect(el.hasAttribute('autofocus')).toBe(true);
    expect(el.getAttribute('autofocus')).toBe('');
  });

  it('maps structured ARIA fields', () => {
    const el = createSelect({
      aria: { label: 'Choose a country' },
    });

    expect(el.getAttribute('aria-label')).toBe('Choose a country');
  });

  it('respects explicit raw attrs overrides', () => {
    const el = createSelect({
      name: 'ignored',
      attrs: { name: 'explicit' },
    });

    expect(el.getAttribute('name')).toBe('explicit');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createSelect({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute via dom.ts security rules', () => {
    expect(() =>
      createSelect({
        attrs: {
          style: 'color: red',
        },
      }),
    ).toThrow(/style/i);
  });

  it('enhanceSelects is a stable no-op', () => {
    expect(() => enhanceSelects()).not.toThrow();
  });
});
