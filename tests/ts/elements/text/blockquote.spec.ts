import { describe, expect, it, vi } from 'vitest';

import {
  BLOCKQUOTE_TAG,
  BLOCKQUOTE_SELECTOR,
  createBlockquote,
  enhanceBlockquotes,
} from '../../../../src/elements/text/blockquote';

type AttrMap = Record<string, string>;

class FakeElement {
  public readonly tagName: string;

  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir = '';
  public hidden = false;
  public tabIndex = 0;
  public draggable = false;
  public spellcheck = false;
  public contentEditable = '';

  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};

  private readonly _attrs: AttrMap = {};

  public textContent: string | null = null;

  public constructor(tag: string) {
    this.tagName = tag.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this._attrs[name] = value;
  }

  public getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this._attrs, name) ? this._attrs[name] : null;
  }

  public hasAttribute(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._attrs, name);
  }
}

function installFakeDocument() {
  const createElement = vi.fn((tag: string) => new FakeElement(tag));
  const createElementNS = vi.fn(() => new FakeElement('ns'));

  // Minimal document stub used by Sol's dom helpers.
  // @ts-expect-error - test environment intentionally stubs document.
  globalThis.document = {
    createElement,
    createElementNS,
  };

  return { createElement, createElementNS };
}

describe('elements/text/blockquote', () => {
  it('exposes tag and selector constants', () => {
    expect(BLOCKQUOTE_TAG).toBe('blockquote');
    expect(BLOCKQUOTE_SELECTOR).toBe('blockquote');
  });

  it('creates a <blockquote> via document.createElement', () => {
    const doc = installFakeDocument();

    const el = createBlockquote();

    expect(doc.createElement).toHaveBeenCalledTimes(1);
    expect(doc.createElement).toHaveBeenCalledWith('blockquote');
    expect(doc.createElementNS).not.toHaveBeenCalled();

    expect(el.tagName).toBe('BLOCKQUOTE');
  });

  it('assigns text via textContent (not innerHTML)', () => {
    installFakeDocument();

    const el = createBlockquote('Quoted text.');

    expect(el.textContent).toBe('Quoted text.');
    // FakeElement does not implement innerHTML; this test is the canary.
    expect((el as unknown as { innerHTML?: unknown }).innerHTML).toBeUndefined();
  });

  it('applies global attributes', () => {
    installFakeDocument();

    const el = createBlockquote('Hello', {
      id: 'q1',
      className: 'quote',
      title: 'A quote',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 2,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
    });

    expect(el.id).toBe('q1');
    expect(el.className).toBe('quote');
    expect(el.title).toBe('A quote');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(2);
    expect(el.draggable).toBe(true);
    expect(el.spellcheck).toBe(true);
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.contentEditable).toBe('plaintext-only');
  });

  it('applies dataset and style safely', () => {
    installFakeDocument();

    const el = createBlockquote('Hello', {
      dataset: { trackingId: '123', feature: true },
      style: { display: 'block' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.feature).toBe('true');
    expect((el.style as Record<string, unknown>).display).toBe('block');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createBlockquote('Hello', {
      aria: { label: 'Quotation', labelledby: 'q-label', hidden: true },
    });

    expect(el.getAttribute('aria-label')).toBe('Quotation');
    expect(el.getAttribute('aria-labelledby')).toBe('q-label');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('maps cite into the cite attribute', () => {
    installFakeDocument();

    const el = createBlockquote('Hello', {
      cite: 'https://example.com/source',
    });

    expect(el.getAttribute('cite')).toBe('https://example.com/source');
  });

  it('enforces attribute security rules for escape-hatch attrs', () => {
    installFakeDocument();

    expect(() =>
      createBlockquote('Hello', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);

    expect(() =>
      createBlockquote('Hello', {
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style/i);

    expect(() =>
      createBlockquote('Hello', {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhancement hook is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceBlockquotes()).not.toThrow();
    expect(() => enhanceBlockquotes(document as unknown as ParentNode)).not.toThrow();
  });
});
