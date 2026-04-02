import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createTbody, enhanceTbodies } from '../../../../src/elements/table/tbody';

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

describe('elements/table/tbody', () => {
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

  it('creates a <tbody> element via document.createElement', () => {
    const el = createTbody();

    expect(el.tagName).toBe('TBODY');
    expect(calls.createElement).toEqual(['tbody']);
  });

  it('never uses document.createElementNS', () => {
    createTbody();
    expect(calls.createElementNS).toEqual([]);
  });

  it('assigns text content via textContent (never innerHTML)', () => {
    const el = createTbody('Fallback text');

    expect(el.textContent).toBe('Fallback text');
  });

  it('applies common global attributes', () => {
    const el = createTbody(undefined, {
      id: 'b1',
      className: 'data-body',
      title: 'Body rows',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
    });

    expect(el.id).toBe('b1');
    expect(el.className).toBe('data-body');
    expect(el.title).toBe('Body rows');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const el = createTbody(undefined, {
      aria: { label: 'Table body', labelledby: 'tbl-title', hidden: false },
    });

    expect(el.getAttribute('aria-label')).toBe('Table body');
    expect(el.getAttribute('aria-labelledby')).toBe('tbl-title');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('applies dataset entries as data-* attributes', () => {
    const el = createTbody(undefined, {
      dataset: { trackingId: '123', section: 'body' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.section).toBe('body');
  });

  it('supports raw attrs escape hatch (subject to dom.ts security rules)', () => {
    const el = createTbody(undefined, {
      attrs: { 'data-test': 'ok', role: 'rowgroup' },
    });

    expect(el.getAttribute('data-test')).toBe('ok');
    expect(el.getAttribute('role')).toBe('rowgroup');
  });

  it('blocks inline event handler attributes in raw attrs', () => {
    expect(() =>
      createTbody(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute in raw attrs', () => {
    expect(() =>
      createTbody(undefined, {
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhancement hook is stable and does not throw', () => {
    expect(() => enhanceTbodies()).not.toThrow();
  });
});
