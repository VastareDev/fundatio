import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createForm, enhanceForms } from '../../../../src/elements/form/form';

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

describe('elements/form/form', () => {
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

  it('creates a <form> via document.createElement (never createElementNS)', () => {
    const el = createForm();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['form']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('FORM');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createForm('<b>fallback</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>fallback</b>');
  });

  it('forwards curated global attributes and form attributes', () => {
    const el = createForm(undefined, {
      id: 'form-1',
      className: 'checkout',
      title: 'Checkout form',
      lang: 'en',
      dir: 'ltr',
      role: 'form',
      tabIndex: 0,
      action: '/submit',
      method: 'post',
      enctype: 'application/x-www-form-urlencoded',
      acceptCharset: 'utf-8',
      autocomplete: 'on',
      name: 'checkout',
      target: '_self',
      rel: 'noopener',
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('form-1');
    expect(fake.className).toBe('checkout');
    expect(fake.title).toBe('Checkout form');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);

    expect(fake.getAttribute('role')).toBe('form');

    expect(fake.getAttribute('action')).toBe('/submit');
    expect(fake.getAttribute('method')).toBe('post');
    expect(fake.getAttribute('enctype')).toBe('application/x-www-form-urlencoded');
    expect(fake.getAttribute('accept-charset')).toBe('utf-8');
    expect(fake.getAttribute('autocomplete')).toBe('on');
    expect(fake.getAttribute('name')).toBe('checkout');
    expect(fake.getAttribute('target')).toBe('_self');
    expect(fake.getAttribute('rel')).toBe('noopener');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createForm(undefined, {
      aria: {
        label: 'Checkout',
        labelledby: 'checkout-title',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Checkout');
    expect(fake.getAttribute('aria-labelledby')).toBe('checkout-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('supports boolean attributes by presence', () => {
    const el = createForm(undefined, {
      noValidate: true,
    });

    const fake = el as unknown as FakeElement;

    // Boolean attributes are represented by presence; we set empty-string when true.
    expect(fake.getAttribute('novalidate')).toBe('');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createForm(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createForm(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceForms is a no-op (but stable hook)', () => {
    expect(() => enhanceForms()).not.toThrow();
  });
});
