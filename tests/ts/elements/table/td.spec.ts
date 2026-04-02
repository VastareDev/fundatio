import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createTd, enhanceTds } from '../../../../src/elements/table/td';

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
    // Canary: prove we never use namespaces for HTML table helpers.
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

describe('elements/table/td', () => {
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

  it('creates a <td> element via document.createElement', () => {
    const el = createTd();

    expect(el.tagName).toBe('TD');
    expect(calls.createElement).toEqual(['td']);
  });

  it('never uses document.createElementNS', () => {
    createTd();
    expect(calls.createElementNS).toEqual([]);
  });

  it('assigns text content via textContent (never innerHTML)', () => {
    const el = createTd('Value');

    expect(el.textContent).toBe('Value');
  });

  it('applies common global attributes', () => {
    const el = createTd(undefined, {
      id: 'c1',
      className: 'cell',
      title: 'Cell title',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
    });

    expect(el.id).toBe('c1');
    expect(el.className).toBe('cell');
    expect(el.title).toBe('Cell title');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const el = createTd(undefined, {
      aria: { label: 'Data cell', labelledby: 'hdr-a', hidden: false },
    });

    expect(el.getAttribute('aria-label')).toBe('Data cell');
    expect(el.getAttribute('aria-labelledby')).toBe('hdr-a');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('applies dataset entries as data-* attributes', () => {
    const el = createTd(undefined, {
      dataset: { trackingId: '123', col: 2 },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.col).toBe('2');
  });

  it('sets colspan and rowspan when provided (positive integers only)', () => {
    const el = createTd('X', { colspan: 2, rowspan: 3 });

    expect(el.getAttribute('colspan')).toBe('2');
    expect(el.getAttribute('rowspan')).toBe('3');
  });

  it('throws for invalid colspan/rowspan values', () => {
    expect(() => createTd('X', { colspan: 0 })).toThrow(/colspan/i);
    expect(() => createTd('X', { colspan: -1 })).toThrow(/colspan/i);
    expect(() => createTd('X', { colspan: 1.2 })).toThrow(/colspan/i);

    expect(() => createTd('X', { rowspan: 0 })).toThrow(/rowspan/i);
    expect(() => createTd('X', { rowspan: -1 })).toThrow(/rowspan/i);
    expect(() => createTd('X', { rowspan: 2.5 })).toThrow(/rowspan/i);
  });

  it('sets headers when provided (trimmed, non-empty)', () => {
    const el = createTd('X', { headers: '  h1 h2  ' });

    expect(el.getAttribute('headers')).toBe('h1 h2');
  });

  it('throws for empty headers strings', () => {
    expect(() => createTd('X', { headers: '   ' })).toThrow(/headers/i);
  });

  it('does not override caller raw attrs for table-model attributes', () => {
    const el = createTd('X', {
      colspan: 2,
      rowspan: 3,
      headers: 'h1',
      attrs: { colspan: 9, rowspan: 8, headers: 'h9 h8' },
    });

    expect(el.getAttribute('colspan')).toBe('9');
    expect(el.getAttribute('rowspan')).toBe('8');
    expect(el.getAttribute('headers')).toBe('h9 h8');
  });

  it('supports raw attrs escape hatch (subject to dom.ts security rules)', () => {
    const el = createTd(undefined, {
      attrs: { 'data-test': 'ok', role: 'cell' },
    });

    expect(el.getAttribute('data-test')).toBe('ok');
    expect(el.getAttribute('role')).toBe('cell');
  });

  it('blocks inline event handler attributes in raw attrs', () => {
    expect(() =>
      createTd(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute in raw attrs', () => {
    expect(() =>
      createTd(undefined, {
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhancement hook is stable and does not throw', () => {
    expect(() => enhanceTds()).not.toThrow();
  });
});
