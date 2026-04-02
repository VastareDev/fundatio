import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createInput, enhanceInputs } from '../../../../src/elements/form/input';

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

describe('elements/form/input', () => {
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

  it('creates an <input> via document.createElement (never createElementNS)', () => {
    const el = createInput();

    expect(el.tagName.toLowerCase()).toBe('input');
    expect(calls.createElement).toEqual(['input']);
    expect(calls.createElementNS).toEqual([]);
  });

  it('does not assign textContent (void element)', () => {
    const el = createInput();

    expect(el.textContent).toBeNull();
  });

  it('defaults type to "text" (matches HTML default)', () => {
    const el = createInput();

    expect(el.hasAttribute('type')).toBe(true);
    expect(el.getAttribute('type')).toBe('text');
  });

  it('respects explicit raw attrs override for type', () => {
    const el = createInput({
      type: 'email',
      attrs: { type: 'password' },
    });

    expect(el.getAttribute('type')).toBe('password');
  });

  it('applies common attributes with correct HTML attribute names', () => {
    const el = createInput({
      type: 'email',
      name: 'email',
      value: 'a@b.com',
      placeholder: 'Email',
      autoComplete: 'email',
      inputMode: 'email',
      enterKeyHint: 'next',
      minLength: 2,
      maxLength: 64,
      pattern: '.+@.+',
    });

    expect(el.getAttribute('type')).toBe('email');
    expect(el.getAttribute('name')).toBe('email');
    expect(el.getAttribute('value')).toBe('a@b.com');
    expect(el.getAttribute('placeholder')).toBe('Email');
    expect(el.getAttribute('autocomplete')).toBe('email');
    expect(el.getAttribute('inputmode')).toBe('email');
    expect(el.getAttribute('enterkeyhint')).toBe('next');
    expect(el.getAttribute('minlength')).toBe('2');
    expect(el.getAttribute('maxlength')).toBe('64');
    expect(el.getAttribute('pattern')).toBe('.+@.+');
  });

  it('applies boolean attributes by presence when true', () => {
    const el = createInput({
      disabled: true,
      readOnly: true,
      required: true,
      multiple: true,
      checked: true,
      autofocus: true,
    });

    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.getAttribute('disabled')).toBe('');

    expect(el.hasAttribute('readonly')).toBe(true);
    expect(el.getAttribute('readonly')).toBe('');

    expect(el.hasAttribute('required')).toBe(true);
    expect(el.getAttribute('required')).toBe('');

    expect(el.hasAttribute('multiple')).toBe(true);
    expect(el.getAttribute('multiple')).toBe('');

    expect(el.hasAttribute('checked')).toBe(true);
    expect(el.getAttribute('checked')).toBe('');

    expect(el.hasAttribute('autofocus')).toBe(true);
    expect(el.getAttribute('autofocus')).toBe('');
  });

  it('maps structured ARIA fields', () => {
    const el = createInput({
      aria: { label: 'Search' },
    });

    expect(el.getAttribute('aria-label')).toBe('Search');
  });

  it('supports image input attributes (src/alt/width/height)', () => {
    const el = createInput({
      type: 'image',
      src: '/img/login.png',
      alt: 'Login',
      width: 80,
      height: 40,
    });

    expect(el.getAttribute('type')).toBe('image');
    expect(el.getAttribute('src')).toBe('/img/login.png');
    expect(el.getAttribute('alt')).toBe('Login');
    expect(el.getAttribute('width')).toBe('80');
    expect(el.getAttribute('height')).toBe('40');
  });

  it('blocks unsafe inline event handler attributes via dom.ts security rules', () => {
    expect(() =>
      createInput({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler/i);
  });

  it('blocks raw style attribute via dom.ts security rules', () => {
    expect(() =>
      createInput({
        attrs: {
          style: 'color: red',
        },
      }),
    ).toThrow(/style/i);
  });

  it('enhanceInputs is a stable no-op', () => {
    expect(() => enhanceInputs()).not.toThrow();
  });
});
