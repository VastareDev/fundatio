import { describe, expect, it, beforeEach, afterEach } from 'vitest';

import { createOl, enhanceOls } from '../../../../src/elements/list/ol';

/**
 * Minimal DOM shim for node-based tests.
 * Matches the pattern used by `tests/ts/dom.spec.ts`.
 */

type FakeAttrs = Record<string, string>;

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

  public reversed = false;
  public start = 1;
  public type = '';

  private _attrs: FakeAttrs = {};

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

describe('elements/list/ol', () => {
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

  it('creates an <ol> via document.createElement (never createElementNS)', () => {
    const el = createOl();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['ol']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('OL');
  });

  it('applies global attributes', () => {
    const el = createOl({
      id: 'steps',
      className: 'list',
      title: 'Sequence',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'false',
      dataset: { trackingId: '123' },
      aria: { label: 'Ordered steps' },
    });

    const fe = el as unknown as FakeElement;

    expect(fe.id).toBe('steps');
    expect(fe.className).toBe('list');
    expect(fe.title).toBe('Sequence');
    expect(fe.lang).toBe('en');
    expect(fe.dir).toBe('ltr');
    expect(fe.hidden).toBe(true);
    expect(fe.tabIndex).toBe(0);
    expect(fe.draggable).toBe(true);
    expect(fe.spellcheck).toBe(true);
    expect(fe.getAttribute('translate')).toBe('no');
    expect(fe.contentEditable).toBe('false');
    expect(fe.dataset.trackingId).toBe('123');
    expect(fe.getAttribute('aria-label')).toBe('Ordered steps');
  });

  it('applies <ol>-specific attributes', () => {
    const el = createOl({ reversed: true, start: 5, type: 'i' });
    const fe = el as unknown as FakeElement;

    expect(fe.reversed).toBe(true);
    expect(fe.start).toBe(5);
    expect(fe.type).toBe('i');
  });

  it('does not apply non-finite start values', () => {
    const el = createOl({ start: Number.NaN });
    const fe = el as unknown as FakeElement;

    // Default stays as-is.
    expect(fe.start).toBe(1);
  });

  it('throws on unsafe attrs (event handlers) passed via attrs escape hatch', () => {
    expect(() =>
      createOl({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/Unsafe attribute/i);
  });

  it('throws on unsafe raw style attribute passed via attrs escape hatch', () => {
    expect(() =>
      createOl({
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhanceOls is a no-op (v1)', () => {
    // No assertions other than "it does not throw".
    expect(() => enhanceOls()).not.toThrow();
  });
});
