import { describe, expect, it, vi } from 'vitest';

import { CODE_TAG, CODE_SELECTOR, createCode, enhanceCodes } from '../../../../src/elements/inline/code';

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

describe('elements/inline/code', () => {
  it('exposes tag and selector constants', () => {
    expect(CODE_TAG).toBe('code');
    expect(CODE_SELECTOR).toBe('code');
  });

  it('creates a <code> via document.createElement', () => {
    const doc = installFakeDocument();

    const el = createCode();

    expect(doc.createElement).toHaveBeenCalledTimes(1);
    expect(doc.createElement).toHaveBeenCalledWith('code');
    expect(doc.createElementNS).not.toHaveBeenCalled();

    expect(el.tagName).toBe('CODE');
  });

  it('assigns text via textContent (not innerHTML)', () => {
    installFakeDocument();

    const el = createCode('const x = 1;');

    expect(el.textContent).toBe('const x = 1;');
    // FakeElement does not implement innerHTML; this test is the canary.
    expect((el as unknown as { innerHTML?: unknown }).innerHTML).toBeUndefined();
  });

  it('applies global attributes', () => {
    installFakeDocument();

    const el = createCode('x', {
      id: 'c1',
      className: 'snippet',
      title: 'Code snippet',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 1,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
    });

    expect(el.id).toBe('c1');
    expect(el.className).toBe('snippet');
    expect(el.title).toBe('Code snippet');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(1);
    expect(el.draggable).toBe(true);
    expect(el.spellcheck).toBe(true);
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.contentEditable).toBe('plaintext-only');
  });

  it('applies dataset and style safely', () => {
    installFakeDocument();

    const el = createCode('x', {
      dataset: { trackingId: '123', feature: true },
      style: { fontFamily: 'monospace' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.feature).toBe('true');
    expect((el.style as Record<string, unknown>).fontFamily).toBe('monospace');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createCode('x', {
      aria: { label: 'Code fragment', labelledby: 'code-label', hidden: true },
    });

    expect(el.getAttribute('aria-label')).toBe('Code fragment');
    expect(el.getAttribute('aria-labelledby')).toBe('code-label');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces attribute security rules for escape-hatch attrs', () => {
    installFakeDocument();

    expect(() =>
      createCode('x', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);

    expect(() =>
      createCode('x', {
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style/i);

    expect(() =>
      createCode('x', {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhancement hook is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceCodes()).not.toThrow();
    expect(() => enhanceCodes(document as unknown as ParentNode)).not.toThrow();
  });
});
