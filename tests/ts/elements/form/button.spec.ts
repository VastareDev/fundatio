import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createButton, enhanceButtons } from '../../../../src/elements/form/button';

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

describe('elements/form/button', () => {
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

  it('creates a <button> via document.createElement (never createElementNS)', () => {
    const el = createButton('Click');

    expect(el.tagName.toLowerCase()).toBe('button');
    expect(calls.createElement).toEqual(['button']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('assigns textContent (never innerHTML)', () => {
    const el = createButton('Save');

    expect(el.textContent).toBe('Save');
  });

  it('defaults type to "button" (Sol safety)', () => {
    const el = createButton('Safe');

    expect(el.hasAttribute('type')).toBe(true);
    expect(el.getAttribute('type')).toBe('button');
  });

  it('respects explicit raw attrs override for type', () => {
    const el = createButton('Override', {
      type: 'reset',
      attrs: { type: 'submit' },
    });

    expect(el.getAttribute('type')).toBe('submit');
  });

  it('applies structured ARIA fields', () => {
    const el = createButton('X', {
      aria: { label: 'Close' },
    });

    expect(el.getAttribute('aria-label')).toBe('Close');
  });

  it('applies boolean attributes by presence when true', () => {
    const el = createButton('Disabled', { disabled: true, autofocus: true });

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('disabled')).toBe(''); // presence form
    expect(el.hasAttribute('autofocus')).toBe(true);
    expect(el.getAttribute('autofocus')).toBe('');
  });

  it('maps form-associated attributes using correct HTML attribute names', () => {
    const el = createButton('Submit', {
      type: 'submit',
      formAction: '/submit',
      formMethod: 'post',
      formNoValidate: true,
      formTarget: '_blank',
    });

    expect(el.getAttribute('type')).toBe('submit');
    expect(el.getAttribute('formaction')).toBe('/submit');
    expect(el.getAttribute('formmethod')).toBe('post');
    expect(el.hasAttribute('formnovalidate')).toBe(true);
    expect(el.getAttribute('formtarget')).toBe('_blank');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createButton('Nope', {
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('enhanceButtons is a stable no-op', () => {
    expect(() => enhanceButtons()).not.toThrow();
  });
});
