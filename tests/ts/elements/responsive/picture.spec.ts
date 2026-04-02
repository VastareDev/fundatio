import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createPicture, enhancePictures } from '../../../../src/elements/responsive/picture';

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

describe('elements/responsive/picture', () => {
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

  it('creates a <picture> via document.createElement (never createElementNS)', () => {
    const el = createPicture();

    expect(el.tagName.toLowerCase()).toBe('picture');
    expect(calls.createElement).toEqual(['picture']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('does not assign textContent by default', () => {
    const el = createPicture();

    expect(el.textContent).toBeNull();
  });

  it('maps structured ARIA fields', () => {
    const el = createPicture({
      aria: { label: 'Hero image' },
    });

    expect(el.getAttribute('aria-label')).toBe('Hero image');
  });

  it('respects explicit raw attrs overrides', () => {
    const el = createPicture({
      attrs: { role: 'presentation' },
    });

    expect(el.getAttribute('role')).toBe('presentation');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createPicture({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute via dom.ts security rules', () => {
    expect(() =>
      createPicture({
        attrs: {
          style: 'color: red',
        },
      }),
    ).toThrow(/style/i);
  });

  it('enhancePictures is a stable no-op', () => {
    expect(() => enhancePictures()).not.toThrow();
  });
});
