import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createTextarea, enhanceTextareas } from '../../../../src/elements/form/textarea';

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

describe('elements/form/textarea', () => {
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

  it('creates a <textarea> via document.createElement (never createElementNS)', () => {
    const el = createTextarea();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['textarea']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('TEXTAREA');
  });

  it('sets initial value via textContent (never HTML interpretation)', () => {
    const el = createTextarea('<b>hi</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>hi</b>');
  });

  it('maps textarea-specific attributes', () => {
    const el = createTextarea('Hello', {
      name: 'message',
      form: 'contact',
      cols: 40,
      rows: 6,
      minLength: 2,
      maxLength: 200,
      placeholder: 'Type here...',
      autoComplete: 'off',
      autoFocus: true,
      autoCapitalize: 'sentences',
      dirName: 'message.dir',
      wrap: 'soft',
      disabled: true,
      required: true,
      readOnly: true,
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('name')).toBe('message');
    expect(fake.getAttribute('form')).toBe('contact');

    expect(fake.getAttribute('cols')).toBe('40');
    expect(fake.getAttribute('rows')).toBe('6');

    expect(fake.getAttribute('minlength')).toBe('2');
    expect(fake.getAttribute('maxlength')).toBe('200');

    expect(fake.getAttribute('placeholder')).toBe('Type here...');

    expect(fake.getAttribute('autocomplete')).toBe('off');
    expect(fake.getAttribute('autofocus')).toBe('true');
    expect(fake.getAttribute('autocapitalize')).toBe('sentences');

    expect(fake.getAttribute('dirname')).toBe('message.dir');
    expect(fake.getAttribute('wrap')).toBe('soft');

    expect(fake.getAttribute('disabled')).toBe('true');
    expect(fake.getAttribute('required')).toBe('true');
    expect(fake.getAttribute('readonly')).toBe('true');
  });

  it('enforces wrap="hard" includes a cols fallback when cols is not provided', () => {
    const el = createTextarea(undefined, { wrap: 'hard' });
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('wrap')).toBe('hard');
    expect(fake.getAttribute('cols')).toBe('20');
  });

  it('throws when dirName is provided as an empty/whitespace string', () => {
    expect(() =>
      createTextarea(undefined, {
        dirName: '   ',
      }),
    ).toThrow(/dirName must not be an empty string/i);
  });

  it('forwards curated global attributes', () => {
    const el = createTextarea('x', {
      id: 'msg',
      className: 'field',
      title: 'Message',
      lang: 'en',
      dir: 'ltr',
      role: 'textbox',
      hidden: true,
      tabIndex: 0,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      style: { fontSize: '16px' } as any,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('msg');
    expect(fake.className).toBe('field');
    expect(fake.title).toBe('Message');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(0);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('textbox');
    expect(fake.getAttribute('translate')).toBe('no');

    expect((fake.style as any).fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createTextarea(undefined, {
      aria: {
        label: 'Message',
        labelledby: 'message-label',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Message');
    expect(fake.getAttribute('aria-labelledby')).toBe('message-label');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createTextarea(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createTextarea(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createTextarea(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceTextareas is a no-op (but stable hook)', () => {
    expect(() => enhanceTextareas()).not.toThrow();
  });
});
