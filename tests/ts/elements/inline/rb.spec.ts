import { describe, expect, it, vi } from 'vitest';

import { RB_TAG, RB_SELECTOR, createRb, enhanceRbs } from '../../../../src/elements/inline/rb';

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

describe('elements/inline/rb', () => {
  it('exposes tag and selector constants', () => {
    expect(RB_TAG).toBe('rb');
    expect(RB_SELECTOR).toBe('rb');
  });

  it('creates an <rb> via document.createElement', () => {
    const doc = installFakeDocument();

    const el = createRb();

    expect(doc.createElement).toHaveBeenCalledTimes(1);
    expect(doc.createElement).toHaveBeenCalledWith('rb');
    expect(doc.createElementNS).not.toHaveBeenCalled();

    expect(el.tagName).toBe('RB');
  });

  it('assigns text via textContent (not innerHTML)', () => {
    installFakeDocument();

    const el = createRb('漢');

    expect(el.textContent).toBe('漢');
    // FakeElement does not implement innerHTML; this test is the canary.
    expect((el as unknown as { innerHTML?: unknown }).innerHTML).toBeUndefined();
  });

  it('applies global attributes', () => {
    installFakeDocument();

    const el = createRb('base', {
      id: 'rb1',
      className: 'ruby-base',
      title: 'Ruby base unit',
      lang: 'ja',
      dir: 'ltr',
      hidden: true,
      tabIndex: 1,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
    });

    expect(el.id).toBe('rb1');
    expect(el.className).toBe('ruby-base');
    expect(el.title).toBe('Ruby base unit');
    expect(el.lang).toBe('ja');
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

    const el = createRb('base', {
      dataset: { trackingId: '123', feature: true },
      style: { display: 'inline' },
    });

    expect(el.dataset.trackingId).toBe('123');
    expect(el.dataset.feature).toBe('true');
    expect((el.style as Record<string, unknown>).display).toBe('inline');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createRb('base', {
      aria: { label: 'Ruby base', labelledby: 'rb-label', hidden: true },
    });

    expect(el.getAttribute('aria-label')).toBe('Ruby base');
    expect(el.getAttribute('aria-labelledby')).toBe('rb-label');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces attribute security rules for escape-hatch attrs', () => {
    installFakeDocument();

    expect(() =>
      createRb('base', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);

    expect(() =>
      createRb('base', {
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style/i);

    expect(() =>
      createRb('base', {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhancement hook is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceRbs()).not.toThrow();
    expect(() => enhanceRbs(document as unknown as ParentNode)).not.toThrow();
  });
});
