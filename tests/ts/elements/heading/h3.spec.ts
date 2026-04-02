import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createH3, enhanceH3s } from '../../../../src/elements/heading/h3';

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
    // Canary: prove we never use namespaces for standard HTML elements.
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

describe('elements/heading/h3', () => {
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

  it('creates a <h3> element via document.createElement', () => {
    const el = createH3();

    expect(el.tagName).toBe('H3');
    expect(calls.createElement).toEqual(['h3']);
  });

  it('never uses document.createElementNS', () => {
    createH3();
    expect(calls.createElementNS).toEqual([]);
  });

  it('assigns text content via textContent (never innerHTML)', () => {
    const el = createH3('Heading');

    expect(el.textContent).toBe('Heading');
  });

  it('applies common global attributes', () => {
    const el = createH3('Heading', {
      id: 'section-heading',
      className: 'heading',
      title: 'Section title',
      lang: 'en',
      dir: 'ltr',
      hidden: false,
      tabIndex: 0,
    });

    expect(el.id).toBe('section-heading');
    expect(el.className).toBe('heading');
    expect(el.title).toBe('Section title');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(false);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const el = createH3('Heading', {
      aria: { label: 'Section heading', labelledby: 'heading-ref', hidden: false },
    });

    expect(el.getAttribute('aria-label')).toBe('Section heading');
    expect(el.getAttribute('aria-labelledby')).toBe('heading-ref');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('applies dataset entries as data-* attributes', () => {
    const el = createH3('Heading', {
      dataset: { trackingId: '123', section: 'features' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.section).toBe('features');
  });

  it('supports raw attrs escape hatch (subject to dom.ts security rules)', () => {
    const el = createH3('Heading', {
      attrs: { 'data-test': 'ok', role: 'heading' },
    });

    expect(el.getAttribute('data-test')).toBe('ok');
    expect(el.getAttribute('role')).toBe('heading');
  });

  it('blocks inline event handler attributes in raw attrs', () => {
    expect(() =>
      createH3('Heading', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute in raw attrs', () => {
    expect(() =>
      createH3('Heading', {
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);
  });

  it('enhancement hook is stable and does not throw', () => {
    expect(() => enhanceH3s()).not.toThrow();
  });
});
