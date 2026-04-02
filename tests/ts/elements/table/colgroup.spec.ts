import { describe, expect, it, vi } from 'vitest';

import { applyGlobalAttrs } from '../../../../src/ts/dom';
import {
  COLGROUP_TAG,
  createColgroup,
  enhanceColgroups,
  type ColgroupAttrs,
} from '../../../../src/elements/table/colgroup';

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

describe('elements/table/colgroup', () => {
  it('creates a <colgroup> element with the correct tag', () => {
    const { doc } = installFakeDocument();

    const el = createColgroup();

    expect(doc.createElement).toHaveBeenCalledWith(COLGROUP_TAG);
    expect((el as unknown as FakeElement).tagName).toBe('colgroup');
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();

    createColgroup();

    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('applies global attributes via dom.ts helpers', () => {
    const { doc } = installFakeDocument();

    const el = createColgroup({ id: 'cg', className: 'cols', title: 'columns' });

    // This is slightly redundant with dom.ts tests, but matches Fundatio element suite patterns:
    expect(doc.createElement).toHaveBeenCalledWith('colgroup');
    expect((el as unknown as FakeElement).id).toBe('cg');
    expect((el as unknown as FakeElement).className).toBe('cols');
    expect((el as unknown as FakeElement).title).toBe('columns');
  });

  it('maps structured ARIA into aria-* attributes', () => {
    installFakeDocument();

    const el = createColgroup({
      aria: { label: 'Column group', labelledby: 'cg-label', hidden: true },
    });

    const f = el as unknown as FakeElement;

    expect(f.getAttribute('aria-label')).toBe('Column group');
    expect(f.getAttribute('aria-labelledby')).toBe('cg-label');
    expect(f.getAttribute('aria-hidden')).toBe('true');
  });

  it('sets span when provided as a valid positive number', () => {
    installFakeDocument();

    const el = createColgroup({ span: 3 });

    expect((el as unknown as FakeElement).getAttribute('span')).toBe('3');
  });

  it('does not set span when the provided value is invalid', () => {
    installFakeDocument();

    const a: ColgroupAttrs = { span: 0 };
    const b: ColgroupAttrs = { span: -2 };
    const c: ColgroupAttrs = { span: Number.NaN };

    const elA = createColgroup(a) as unknown as FakeElement;
    const elB = createColgroup(b) as unknown as FakeElement;
    const elC = createColgroup(c) as unknown as FakeElement;

    expect(elA.hasAttribute('span')).toBe(false);
    expect(elB.hasAttribute('span')).toBe(false);
    expect(elC.hasAttribute('span')).toBe(false);
  });

  it('prefers explicit raw attrs over typed span (setIfUnset convention)', () => {
    installFakeDocument();

    const el = createColgroup({
      span: 2,
      attrs: { span: 9 },
    });

    expect((el as unknown as FakeElement).getAttribute('span')).toBe('9');
  });

  it('enforces security rules for raw attrs (blocks on* and raw style)', () => {
    installFakeDocument();

    expect(() =>
      createColgroup({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createColgroup({
        attrs: { style: 'color:red' as unknown as boolean },
      }),
    ).toThrow();

    // sanity: applyGlobalAttrs throws too (matches dom.ts behavior)
    const el = new FakeElement('colgroup') as unknown as HTMLElement;
    expect(() => applyGlobalAttrs(el, { attrs: { onload: 'x' } })).toThrow();
  });

  it('enhanceColgroups is a stable no-op', () => {
    installFakeDocument();

    expect(() => enhanceColgroups()).not.toThrow();
    expect(() => enhanceColgroups(document as unknown as ParentNode)).not.toThrow();
  });
});
