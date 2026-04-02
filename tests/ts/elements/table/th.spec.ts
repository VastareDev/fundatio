import { describe, expect, it, vi } from 'vitest';

import { applyGlobalAttrs } from '../../../../src/ts/dom';
import { TH_TAG, createTh, enhanceThs, type ThAttrs } from '../../../../src/elements/table/th';

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

describe('elements/table/th', () => {
  it('creates a <th> element with the correct tag', () => {
    const { doc } = installFakeDocument();

    const el = createTh();

    expect(doc.createElement).toHaveBeenCalledWith(TH_TAG);
    expect((el as unknown as FakeElement).tagName).toBe('th');
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();

    createTh('Header');

    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('sets text via textContent when provided', () => {
    installFakeDocument();

    const el = createTh('Amount');

    expect((el as unknown as FakeElement).textContent).toBe('Amount');
  });

  it('applies global attributes via dom.ts helpers', () => {
    const { doc } = installFakeDocument();

    const el = createTh('Total', { id: 'total', className: 'sum', title: 'Totals' });

    expect(doc.createElement).toHaveBeenCalledWith('th');
    expect((el as unknown as FakeElement).id).toBe('total');
    expect((el as unknown as FakeElement).className).toBe('sum');
    expect((el as unknown as FakeElement).title).toBe('Totals');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createTh('Header', {
      aria: { label: 'Column header', labelledby: 'table-title', hidden: true },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('aria-label')).toBe('Column header');
    expect(f.getAttribute('aria-labelledby')).toBe('table-title');
    expect(f.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets table-cell attributes when provided', () => {
    installFakeDocument();

    const el = createTh('Price', {
      abbr: '£',
      scope: 'col',
      headers: 'h-price h-currency',
      colspan: 2,
      rowspan: 3,
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('abbr')).toBe('£');
    expect(f.getAttribute('scope')).toBe('col');
    expect(f.getAttribute('headers')).toBe('h-price h-currency');
    expect(f.getAttribute('colspan')).toBe('2');
    expect(f.getAttribute('rowspan')).toBe('3');
  });

  it('does not set colspan/rowspan when the provided values are invalid', () => {
    installFakeDocument();

    const a: ThAttrs = { colspan: 0, rowspan: 0 };
    const b: ThAttrs = { colspan: -2, rowspan: -1 };
    const c: ThAttrs = { colspan: Number.NaN, rowspan: Number.NaN };

    const elA = createTh('A', a) as unknown as FakeElement;
    const elB = createTh('B', b) as unknown as FakeElement;
    const elC = createTh('C', c) as unknown as FakeElement;

    expect(elA.hasAttribute('colspan')).toBe(false);
    expect(elA.hasAttribute('rowspan')).toBe(false);

    expect(elB.hasAttribute('colspan')).toBe(false);
    expect(elB.hasAttribute('rowspan')).toBe(false);

    expect(elC.hasAttribute('colspan')).toBe(false);
    expect(elC.hasAttribute('rowspan')).toBe(false);
  });

  it('prefers explicit raw attrs over typed values (setIfUnset convention)', () => {
    installFakeDocument();

    const el = createTh('X', {
      scope: 'col',
      colspan: 2,
      rowspan: 3,
      attrs: { scope: 'row', colspan: 9, rowspan: 8 },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('scope')).toBe('row');
    expect(f.getAttribute('colspan')).toBe('9');
    expect(f.getAttribute('rowspan')).toBe('8');
  });

  it('enforces security rules for raw attrs (blocks on* and raw style)', () => {
    installFakeDocument();

    expect(() =>
      createTh('X', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createTh('X', {
        attrs: { style: 'color:red' as unknown as boolean },
      }),
    ).toThrow();

    // sanity: applyGlobalAttrs throws too (matches dom.ts behavior)
    const el = new FakeElement('th') as unknown as HTMLElement;
    expect(() => applyGlobalAttrs(el, { attrs: { onload: 'x' } })).toThrow();
  });

  it('enhanceThs is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceThs()).not.toThrow();
    expect(() => enhanceThs(document as unknown as ParentNode)).not.toThrow();
  });
});
