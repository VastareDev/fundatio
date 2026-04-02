import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createMath, enhanceMath } from '../../../../src/elements/media/math';

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

describe('elements/media/math', () => {
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

  it('creates a <math> via document.createElement (never createElementNS)', () => {
    const el = createMath();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['math']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('MATH');
  });

  it('defaults to decorative (aria-hidden="true" and tabIndex=-1)', () => {
    const el = createMath() as unknown as FakeElement;

    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.tabIndex).toBe(-1);
  });

  it('respects explicit aria-hidden override', () => {
    const el = createMath(undefined, { aria: { hidden: false } }) as unknown as FakeElement;

    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('respects explicit tabIndex override', () => {
    const el = createMath(undefined, { tabIndex: 0 }) as unknown as FakeElement;

    expect(el.tabIndex).toBe(0);
  });

  it('applies display attribute when provided', () => {
    const el = createMath(undefined, { display: 'block' }) as unknown as FakeElement;

    expect(el.getAttribute('display')).toBe('block');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createMath(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createMath(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceMath is a no-op (but stable hook)', () => {
    expect(() => enhanceMath()).not.toThrow();
  });
});
