import { describe, expect, it } from 'vitest';
import { createLi, enhanceLis, LI_SELECTOR, LI_TAG } from '../../../../src/elements/list/li';

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
  public contentEditable = 'inherit';
  public dataset: Record<string, string> = {};
  public style: Record<string, unknown> = {};
  public textContent: string | null = null;

  // `<li>` specific
  public value = 0;

  private readonly attrs = new Map<string, string>();

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, value: string) {
    this.attrs.set(String(name), String(value));
  }

  getAttribute(name: string) {
    return this.attrs.has(String(name)) ? this.attrs.get(String(name))! : null;
  }
}

describe('list/li', () => {
  it('creates an <li> element', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createLi();
    expect(el.tagName.toLowerCase()).toBe(LI_TAG);

    globalThis.document = prev;
  });

  it('sets text content via textContent', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createLi('Item 1');
    expect(el.textContent).toBe('Item 1');

    globalThis.document = prev;
  });

  it('applies common global attributes', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createLi('Item', { id: 'x', className: 'y', title: 'z' });
    expect(el.id).toBe('x');
    expect(el.className).toBe('y');
    expect(el.title).toBe('z');

    globalThis.document = prev;
  });

  it('supports value for ordered list numbering', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createLi('Item', { value: 7 });
    expect((el as unknown as FakeElement).value).toBe(7);

    globalThis.document = prev;
  });

  it('supports legacy type marker attribute (deprecated)', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createLi('Item', { type: 'i' });
    expect(el.getAttribute('type')).toBe('i');

    globalThis.document = prev;
  });

  it('exports a usable selector', () => {
    expect(LI_SELECTOR).toBe('li');
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    expect(() => createLi('X', { attrs: { onclick: 'alert(1)' } })).toThrow();

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    expect(() => createLi('X', { attrs: { style: 'color:red' } })).toThrow();

    globalThis.document = prev;
  });

  it('enhanceLis is a no-op and does not throw', () => {
    // No global `document` reliance required when a root is passed.
    expect(() => enhanceLis({} as unknown as ParentNode)).not.toThrow();
  });
});
