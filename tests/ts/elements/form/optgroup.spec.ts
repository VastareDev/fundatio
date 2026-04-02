import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createOptgroup, enhanceOptgroups } from '../../../../src/elements/form/optgroup';

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

describe('elements/form/optgroup', () => {
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

  it('creates an <optgroup> via document.createElement (never createElementNS)', () => {
    const el = createOptgroup('Group');

    expect(el.tagName.toLowerCase()).toBe('optgroup');
    expect(calls.createElement).toEqual(['optgroup']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('sets the mandatory label attribute from the required argument', () => {
    const el = createOptgroup('Fruits');

    expect(el.hasAttribute('label')).toBe(true);
    expect(el.getAttribute('label')).toBe('Fruits');
  });

  it('respects explicit raw attrs override for label', () => {
    const el = createOptgroup('Ignored', {
      attrs: { label: 'Explicit' },
    });

    expect(el.getAttribute('label')).toBe('Explicit');
  });

  it('applies disabled by presence when true', () => {
    const el = createOptgroup('Fruits', { disabled: true });

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('disabled')).toBe('');
  });

  it('maps structured ARIA fields', () => {
    const el = createOptgroup('Fruits', {
      aria: { label: 'Fruit options' },
    });

    expect(el.getAttribute('aria-label')).toBe('Fruit options');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createOptgroup('Fruits', {
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute via dom.ts security rules', () => {
    expect(() =>
      createOptgroup('Fruits', {
        attrs: {
          style: 'color: red',
        },
      }),
    ).toThrow(/style/i);
  });

  it('enhanceOptgroups is a stable no-op', () => {
    expect(() => enhanceOptgroups()).not.toThrow();
  });
});
