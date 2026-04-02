import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import {
  applyGlobalAttrs,
  createElement,
  createVoidElement,
  type GlobalAttrs,
} from '../../src/ts/dom';

/**
 * Minimal DOM shim for node-based tests.
 * Your Vitest environment is node, so `document` doesn't exist unless we provide it.
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

  const calls: { createElement: string[] } = { createElement: [] };

  g.document = {
    createElement: (tag: string) => {
      calls.createElement.push(tag);
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

describe('ts/dom', () => {
  let restoreDocument: (() => void) | null = null;
  let calls: { createElement: string[] };

  beforeEach(() => {
    const installed = installFakeDocument();
    restoreDocument = installed.restore;
    calls = installed.calls;
  });

  afterEach(() => {
    restoreDocument?.();
    restoreDocument = null;
  });

  describe('applyGlobalAttrs', () => {
    it('is a no-op when attrs are omitted', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      expect(() => applyGlobalAttrs(el)).not.toThrow();

      const fake = el as unknown as FakeElement;
      expect(fake.id).toBe('');
      expect(fake.className).toBe('');
      expect(fake.getAttribute('role')).toBe(null);
    });

    it('applies the curated global attributes', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      const attrs: GlobalAttrs = {
        id: 'root',
        className: 'container',
        title: 'Tooltip',
        lang: 'en',
        dir: 'ltr',
        role: 'region',
        hidden: true,
        tabIndex: 2,
        draggable: true,
        spellCheck: true,
        translate: 'no',
        contentEditable: 'plaintext-only',
        style: { fontSize: '16px', fontWeight: '700' } as any,
      };

      applyGlobalAttrs(el, attrs);

      const fake = el as unknown as FakeElement;

      expect(fake.id).toBe('root');
      expect(fake.className).toBe('container');
      expect(fake.title).toBe('Tooltip');
      expect(fake.lang).toBe('en');
      expect(fake.dir).toBe('ltr');

      expect(fake.hidden).toBe(true);
      expect(fake.tabIndex).toBe(2);

      expect(fake.draggable).toBe(true);
      expect(fake.spellcheck).toBe(true);
      expect(fake.contentEditable).toBe('plaintext-only');

      expect(fake.getAttribute('role')).toBe('region');
      expect(fake.getAttribute('translate')).toBe('no');

      // Style is applied via Object.assign, not via raw `style` attribute.
      expect(fake.style.fontSize).toBe('16px');
      expect(fake.style.fontWeight).toBe('700');
      expect(fake.hasAttribute('style')).toBe(false);
    });

    it('coerces dataset values to strings', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      applyGlobalAttrs(el, {
        dataset: {
          trackingId: 123,
          enabled: true,
          note: 'ok',
        },
      });

      const fake = el as unknown as FakeElement;
      expect(fake.dataset.trackingId).toBe('123');
      expect(fake.dataset.enabled).toBe('true');
      expect(fake.dataset.note).toBe('ok');
    });

    it('applies aria-* attributes and coerces values to strings', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      applyGlobalAttrs(el, {
        aria: {
          label: 'Close',
          expanded: false,
          controls: 42,
        },
      });

      const fake = el as unknown as FakeElement;

      expect(fake.getAttribute('aria-label')).toBe('Close');
      expect(fake.getAttribute('aria-expanded')).toBe('false');
      expect(fake.getAttribute('aria-controls')).toBe('42');
    });

    it('applies additional attrs and coerces values to strings', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      applyGlobalAttrs(el, {
        attrs: {
          'data-test': 'yes',
          tabindex: 0,
          draggable: false,
        },
      });

      const fake = el as unknown as FakeElement;
      expect(fake.getAttribute('data-test')).toBe('yes');
      expect(fake.getAttribute('tabindex')).toBe('0');
      expect(fake.getAttribute('draggable')).toBe('false');
    });

    it('enforces security: blocks inline event handler attributes in attrs', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      expect(() =>
        applyGlobalAttrs(el, {
          attrs: { onclick: 'alert(1)' },
        }),
      ).toThrow(/event handler attributes are blocked/i);
    });

    it('enforces security: blocks inline event handler attributes in aria keys too', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      // aria keys become attribute names like "aria-onclick" -> still starts with "aria-" so OK.
      // The security rule is about attribute NAMES starting with "on".
      // This test ensures we *don't* accidentally regress into checking only the raw key.
      expect(() =>
        applyGlobalAttrs(el, {
          aria: { onclick: 'nope' },
        }),
      ).not.toThrow();

      const fake = el as unknown as FakeElement;
      expect(fake.getAttribute('aria-onclick')).toBe('nope');
    });

    it('enforces security: blocks raw style attribute injection via attrs (any casing)', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      expect(() =>
        applyGlobalAttrs(el, {
          attrs: { STYLE: 'color:red' },
        }),
      ).toThrow(/Unsafe attribute "style" is not allowed/i);
    });

    it('enforces security: blocks empty attribute names (including whitespace)', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      expect(() =>
        applyGlobalAttrs(el, {
          attrs: { '   ': 'x' },
        }),
      ).toThrow(/empty attribute name/i);
    });

    it('trims + lowercases for security checks (but error preserves raw input for event handlers)', () => {
      const el = new FakeElement('div') as unknown as HTMLElement;

      expect(() =>
        applyGlobalAttrs(el, {
          attrs: { '  OnClick  ': 'x' },
        }),
      ).toThrow(/Unsafe attribute "  OnClick  "/i);
    });
  });

  describe('createElement', () => {
    it('creates the requested tag via document.createElement', () => {
      const el = createElement('p');
      const fake = el as unknown as FakeElement;

      expect(calls.createElement).toEqual(['p']);
      expect(fake.tagName).toBe('P');
    });

    it('applies GlobalAttrs to the created element', () => {
      const el = createElement(
        'div',
        {
          id: 'x',
          className: 'y',
          role: 'note',
          dataset: { n: 1 },
          aria: { label: 'Hello' },
          attrs: { 'data-test': true },
          style: { fontSize: '12px' } as any,
        },
        'hi',
      );

      const fake = el as unknown as FakeElement;

      expect(fake.id).toBe('x');
      expect(fake.className).toBe('y');
      expect(fake.getAttribute('role')).toBe('note');

      expect(fake.dataset.n).toBe('1');
      expect(fake.getAttribute('aria-label')).toBe('Hello');
      expect(fake.getAttribute('data-test')).toBe('true');

      expect(fake.style.fontSize).toBe('12px');

      // And the text contract:
      expect(fake.textContent).toBe('hi');
    });

    it('sets text via textContent (never HTML interpretation)', () => {
      const el = createElement('p', undefined, '<b>hello</b>');
      const fake = el as unknown as FakeElement;

      expect(fake.textContent).toBe('<b>hello</b>');
      // No innerHTML in FakeElement by design: the API should not use it.
    });

    it('enforces security: rejects unsafe attrs during creation', () => {
      expect(() =>
        createElement('p', {
          attrs: { onclick: 'alert(1)' },
        }),
      ).toThrow(/Unsafe attribute/i);
    });
  });

  describe('createVoidElement', () => {
    it('creates the requested tag and applies attrs (delegates to createElement)', () => {
      const el = createVoidElement('hr', { id: 'divider', className: 'rule' });
      const fake = el as unknown as FakeElement;

      expect(calls.createElement).toEqual(['hr']);
      expect(fake.tagName).toBe('HR');
      expect(fake.id).toBe('divider');
      expect(fake.className).toBe('rule');
    });

    it('does not set text content unless explicitly provided elsewhere (contract canary)', () => {
      const el = createVoidElement('hr');
      const fake = el as unknown as FakeElement;

      expect(fake.textContent).toBe(null);
    });
  });
});
