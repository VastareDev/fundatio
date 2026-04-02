import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createTable, enhanceTables } from '../../../../src/elements/table/table';

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

  public setAttribute(name: string, value: string) {
    this._attrs[name] = value;
  }

  public getAttribute(name: string) {
    return this._attrs[name] ?? null;
  }

  public hasAttribute(name: string) {
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

describe('elements/table/table', () => {
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

  it('creates a <table> element via document.createElement', () => {
    const el = createTable();

    expect(el.tagName).toBe('TABLE');
    expect(calls.createElement).toEqual(['table']);
  });

  it('never uses document.createElementNS', () => {
    createTable();
    expect(calls.createElementNS).toEqual([]);
  });

  it('assigns text content via textContent (never innerHTML)', () => {
    const el = createTable('Fallback text');

    expect(el.textContent).toBe('Fallback text');
  });

  it('applies common global attributes', () => {
    const el = createTable(undefined, {
      id: 't1',
      className: 'data',
      title: 'Table title',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
    });

    expect(el.id).toBe('t1');
    expect(el.className).toBe('data');
    expect(el.title).toBe('Table title');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const el = createTable(undefined, {
      aria: { label: 'Pricing table', labelledby: 'tbl-title', hidden: false },
    });

    expect(el.getAttribute('aria-label')).toBe('Pricing table');
    expect(el.getAttribute('aria-labelledby')).toBe('tbl-title');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('applies dataset entries as data-* attributes', () => {
    const el = createTable(undefined, {
      dataset: { trackingId: '123', rowCount: 10 },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.rowCount).toBe('10');
  });

  it('supports raw attrs escape hatch (subject to dom.ts security rules)', () => {
    const el = createTable(undefined, {
      attrs: { 'data-test': 'ok', role: 'grid' },
    });

    expect(el.getAttribute('data-test')).toBe('ok');
    expect(el.getAttribute('role')).toBe('grid');
  });

  it('blocks inline event handler attributes in raw attrs', () => {
    expect(() =>
      createTable(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute in raw attrs', () => {
    expect(() =>
      createTable(undefined, {
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhancement hook is stable and does not throw', () => {
    expect(() => enhanceTables()).not.toThrow();
  });
});
