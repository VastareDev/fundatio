import { describe, expect, it, vi } from 'vitest';

import { applyGlobalAttrs } from '../../../../src/ts/dom';
import { H2_TAG, createH2, enhanceH2s } from '../../../../src/elements/heading/h2';

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

describe('elements/heading/h2', () => {
  it('creates an <h2> element with the correct tag', () => {
    const { doc } = installFakeDocument();

    const el = createH2();

    expect(doc.createElement).toHaveBeenCalledWith(H2_TAG);
    expect((el as unknown as FakeElement).tagName).toBe('h2');
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();

    createH2('Section title');

    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('sets text via textContent when provided', () => {
    installFakeDocument();

    const el = createH2('Section title');

    expect((el as unknown as FakeElement).textContent).toBe('Section title');
  });

  it('applies global attributes via dom.ts helpers', () => {
    const { doc } = installFakeDocument();

    const el = createH2('Title', { id: 'h2', className: 'heading', title: 'Heading' });

    expect(doc.createElement).toHaveBeenCalledWith('h2');
    expect((el as unknown as FakeElement).id).toBe('h2');
    expect((el as unknown as FakeElement).className).toBe('heading');
    expect((el as unknown as FakeElement).title).toBe('Heading');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createH2('Title', {
      aria: { label: 'Section heading', labelledby: 'page-title', hidden: false },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('aria-label')).toBe('Section heading');
    expect(f.getAttribute('aria-labelledby')).toBe('page-title');
    expect(f.getAttribute('aria-hidden')).toBe('false');
  });

  it('enforces security rules for raw attrs (blocks on* and raw style)', () => {
    installFakeDocument();

    expect(() =>
      createH2('X', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createH2('X', {
        attrs: { style: 'color:red' as unknown as boolean },
      }),
    ).toThrow();

    // sanity: applyGlobalAttrs throws too (matches dom.ts behavior)
    const el = new FakeElement('h2') as unknown as HTMLElement;
    expect(() => applyGlobalAttrs(el, { attrs: { onload: 'x' } })).toThrow();
  });

  it('enhanceH2s is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceH2s()).not.toThrow();
    expect(() => enhanceH2s(document as unknown as ParentNode)).not.toThrow();
  });
});
