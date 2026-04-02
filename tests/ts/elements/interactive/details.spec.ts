import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createDetails, enhanceDetails } from '../../../../src/elements/interactive/details';

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

describe('elements/interactive/details', () => {
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

  it('creates a <details> via document.createElement (never createElementNS)', () => {
    const el = createDetails();

    expect(el.tagName.toLowerCase()).toBe('details');
    expect(calls.createElement).toEqual(['details']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('does not set open by default', () => {
    const el = createDetails();

    expect(el.hasAttribute('open')).toBe(false);
  });

  it('sets open by presence when true', () => {
    const el = createDetails({ open: true });

    expect(el.hasAttribute('open')).toBe(true);
    expect(el.getAttribute('open')).toBe('');
  });

  it('sets name when provided', () => {
    const el = createDetails({ name: 'accordion' });

    expect(el.getAttribute('name')).toBe('accordion');
  });

  it('respects explicit raw attrs overrides', () => {
    const el = createDetails({
      open: true,
      name: 'ignored',
      attrs: { open: 'open', name: 'explicit' },
    });

    expect(el.getAttribute('name')).toBe('explicit');
    expect(el.hasAttribute('open')).toBe(true);
    expect(el.getAttribute('open')).toBe('open');
  });

  it('maps structured ARIA fields', () => {
    const el = createDetails({
      aria: { label: 'More info' },
    });

    expect(el.getAttribute('aria-label')).toBe('More info');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createDetails({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute via dom.ts security rules', () => {
    expect(() =>
      createDetails({
        attrs: {
          style: 'color: red',
        },
      }),
    ).toThrow(/style/i);
  });

  it('enhanceDetails is a stable no-op', () => {
    expect(() => enhanceDetails()).not.toThrow();
  });
});
