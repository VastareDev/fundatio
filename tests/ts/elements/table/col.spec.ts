import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createCol, enhanceCols } from '../../../../src/elements/table/col';

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

describe('elements/table/col', () => {
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

  it('creates a <col> element via document.createElement', () => {
    const el = createCol();

    expect(el.tagName).toBe('COL');
    expect(calls.createElement).toEqual(['col']);
  });

  it('never uses document.createElementNS', () => {
    createCol();
    expect(calls.createElementNS).toEqual([]);
  });

  it('applies common global attributes', () => {
    const el = createCol({
      id: 'c1',
      className: 'col-a',
      title: 'Column A',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
    });

    expect(el.id).toBe('c1');
    expect(el.className).toBe('col-a');
    expect(el.title).toBe('Column A');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const el = createCol({
      aria: { label: 'Numeric columns', labelledby: 'colgroup-title', hidden: false },
    });

    expect(el.getAttribute('aria-label')).toBe('Numeric columns');
    expect(el.getAttribute('aria-labelledby')).toBe('colgroup-title');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('applies dataset entries as data-* attributes', () => {
    const el = createCol({
      dataset: { trackingId: '123', group: 'pricing' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.group).toBe('pricing');
  });

  it('sets span when provided (positive integer only)', () => {
    const el = createCol({ span: 2 });

    expect(el.getAttribute('span')).toBe('2');
  });

  it('throws for invalid span values', () => {
    expect(() => createCol({ span: 0 })).toThrow(/span/i);
    expect(() => createCol({ span: -1 })).toThrow(/span/i);
    expect(() => createCol({ span: 1.5 })).toThrow(/span/i);
  });

  it('does not override caller raw attrs for span', () => {
    const el = createCol({
      span: 3,
      attrs: { span: 5 },
    });

    expect(el.getAttribute('span')).toBe('5');
  });

  it('supports raw attrs escape hatch (subject to dom.ts security rules)', () => {
    const el = createCol({
      attrs: { 'data-test': 'ok' },
    });

    expect(el.getAttribute('data-test')).toBe('ok');
  });

  it('blocks inline event handler attributes in raw attrs', () => {
    expect(() =>
      createCol({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute in raw attrs', () => {
    expect(() =>
      createCol({
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhancement hook is stable and does not throw', () => {
    expect(() => enhanceCols()).not.toThrow();
  });
});
