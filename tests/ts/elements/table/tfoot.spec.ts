import { describe, expect, it, vi } from 'vitest';

import { applyGlobalAttrs } from '../../../../src/ts/dom';
import { TFOOT_TAG, createTfoot, enhanceTfoots } from '../../../../src/elements/table/tfoot';

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

describe('elements/table/tfoot', () => {
  it('creates a <tfoot> element with the correct tag', () => {
    const { doc } = installFakeDocument();

    const el = createTfoot();

    expect(doc.createElement).toHaveBeenCalledWith(TFOOT_TAG);
    expect((el as unknown as FakeElement).tagName).toBe('tfoot');
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();

    createTfoot();

    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('applies global attributes via dom.ts helpers', () => {
    const { doc } = installFakeDocument();

    const el = createTfoot({ id: 'tf', className: 'foot', title: 'Footer rows' });

    expect(doc.createElement).toHaveBeenCalledWith('tfoot');
    expect((el as unknown as FakeElement).id).toBe('tf');
    expect((el as unknown as FakeElement).className).toBe('foot');
    expect((el as unknown as FakeElement).title).toBe('Footer rows');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createTfoot({
      aria: { label: 'Table footer', labelledby: 'table-title', hidden: false },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('aria-label')).toBe('Table footer');
    expect(f.getAttribute('aria-labelledby')).toBe('table-title');
    expect(f.getAttribute('aria-hidden')).toBe('false');
  });

  it('enforces security rules for raw attrs (blocks on* and raw style)', () => {
    installFakeDocument();

    expect(() =>
      createTfoot({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createTfoot({
        attrs: { style: 'color:red' as unknown as boolean },
      }),
    ).toThrow();

    // sanity: applyGlobalAttrs throws too (matches dom.ts behavior)
    const el = new FakeElement('tfoot') as unknown as HTMLElement;
    expect(() => applyGlobalAttrs(el, { attrs: { onload: 'x' } })).toThrow();
  });

  it('enhanceTfoots is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceTfoots()).not.toThrow();
    expect(() => enhanceTfoots(document as unknown as ParentNode)).not.toThrow();
  });
});
