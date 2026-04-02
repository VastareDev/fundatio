import { describe, expect, it } from 'vitest';
import { createUl, enhanceUls, UL_SELECTOR, UL_TAG } from '../../../../src/elements/list/ul';

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

  public dataset: Record<string, string> = {};
  public style: Record<string, string> = {};

  public textContent: string | null = null;

  private readonly attrs = new Map<string, string>();

  public constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attrs.set(String(name), String(value));
  }

  public getAttribute(name: string): string | null {
    return this.attrs.has(String(name)) ? (this.attrs.get(String(name)) ?? null) : null;
  }
}

describe('list/ul', () => {
  it('exports the correct tag and selector constants', () => {
    expect(UL_TAG).toBe('ul');
    expect(UL_SELECTOR).toBe('ul');
  });

  it('creates a <ul> element', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createUl();
    expect(el.tagName.toLowerCase()).toBe(UL_TAG);

    globalThis.document = prev;
  });

  it('sets text content via textContent', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createUl('List');
    expect(el.textContent).toBe('List');

    globalThis.document = prev;
  });

  it('applies common global attributes safely', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createUl(undefined, { id: 'x', className: 'y', title: 'z', lang: 'en', dir: 'ltr' });
    expect(el.id).toBe('x');
    expect(el.className).toBe('y');
    expect(el.title).toBe('z');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');

    globalThis.document = prev;
  });

  it('supports legacy type marker attribute (deprecated)', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    const el = createUl(undefined, { type: 'square' });
    expect(el.getAttribute('type')).toBe('square');

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    expect(() => createUl(undefined, { attrs: { onclick: 'alert(1)' } })).toThrow();

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag),
    } as unknown as Document;

    expect(() => createUl(undefined, { attrs: { style: 'color: red' } })).toThrow();

    globalThis.document = prev;
  });

  it('enhanceUls is a no-op and does not throw', () => {
    expect(() => enhanceUls({} as unknown as ParentNode)).not.toThrow();
  });
});
