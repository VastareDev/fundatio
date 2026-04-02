import { describe, expect, it, vi } from 'vitest';

import { applyGlobalAttrs } from '../../../../src/ts/dom';
import { CAPTION_TAG, createCaption, enhanceCaptions } from '../../../../src/elements/table/caption';

type AttrMap = Record<string, string>;

class FakeElement {
  public readonly tagName: string;
  public readonly attributes: AttrMap = {};
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
  public dataset: Record<string, string> = {};
  public style: Partial<CSSStyleDeclaration> = {};
  public textContent: string | null = null;

  constructor(tagName: string) {
    this.tagName = tagName;
  }

  setAttribute(name: string, value: string): void {
    this.attributes[name] = value;
  }

  getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null;
  }

  hasAttribute(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.attributes, name);
  }
}

function installFakeDocument() {
  const createElementNS = vi.fn(() => new FakeElement('ns') as unknown as Element);

  const doc = {
    createElement: vi.fn((tag: string) => new FakeElement(tag) as unknown as HTMLElement),
    createElementNS,
  };

  (globalThis as unknown as { document: unknown }).document = doc;

  return { doc, createElementNS };
}

describe('elements/table/caption', () => {
  it('creates a <caption> element with the correct tag', () => {
    const { doc } = installFakeDocument();

    const el = createCaption();

    expect(doc.createElement).toHaveBeenCalledWith(CAPTION_TAG);
    expect((el as unknown as FakeElement).tagName).toBe('caption');
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();

    createCaption('Title');

    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('sets text via textContent when provided', () => {
    installFakeDocument();

    const el = createCaption('Quarterly results');

    expect((el as unknown as FakeElement).textContent).toBe('Quarterly results');
  });

  it('applies global attributes via dom.ts helpers', () => {
    const { doc } = installFakeDocument();

    const el = createCaption('Title', { id: 'cap', className: 'table-caption', title: 'Caption' });

    expect(doc.createElement).toHaveBeenCalledWith('caption');
    expect((el as unknown as FakeElement).id).toBe('cap');
    expect((el as unknown as FakeElement).className).toBe('table-caption');
    expect((el as unknown as FakeElement).title).toBe('Caption');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createCaption('Title', {
      aria: { label: 'Results table caption', labelledby: 'table-title', hidden: false },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('aria-label')).toBe('Results table caption');
    expect(f.getAttribute('aria-labelledby')).toBe('table-title');
    expect(f.getAttribute('aria-hidden')).toBe('false');
  });

  it('enforces security rules for raw attrs (blocks on* and raw style)', () => {
    installFakeDocument();

    expect(() =>
      createCaption('X', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createCaption('X', {
        attrs: { style: 'color:red' as unknown as boolean },
      }),
    ).toThrow();

    // sanity: applyGlobalAttrs throws too (matches dom.ts behavior)
    const el = new FakeElement('caption') as unknown as HTMLElement;
    expect(() => applyGlobalAttrs(el, { attrs: { onload: 'x' } })).toThrow();
  });

  it('enhanceCaptions is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceCaptions()).not.toThrow();
    expect(() => enhanceCaptions(document as unknown as ParentNode)).not.toThrow();
  });
});
