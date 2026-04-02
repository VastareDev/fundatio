import { describe, expect, it } from 'vitest';
import { createFigure, enhanceFigures, FIGURE_SELECTOR, FIGURE_TAG } from '../../../../src/elements/figure/figure';

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
  public readonly style: Record<string, string> = {};
  public readonly dataset: Record<string, string> = {};
  public textContent: string | null = null;

  private readonly attrs = new Map<string, string>();

  constructor(tag: string) {
    this.tagName = tag.toUpperCase();
  }

  setAttribute(name: string, value: string): void {
    this.attrs.set(String(name), String(value));
  }

  getAttribute(name: string): string | null {
    return this.attrs.has(name) ? (this.attrs.get(name) as string) : null;
  }
}

class FakeDocument {
  createElement(tag: string): FakeElement {
    return new FakeElement(tag);
  }
}

describe('figure/figure', () => {
  it('exports the correct tag and selector constants', () => {
    expect(FIGURE_TAG).toBe('figure');
    expect(FIGURE_SELECTOR).toBe('figure');
  });

  it('creates a <figure> element', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createFigure();
    expect(el.tagName.toLowerCase()).toBe(FIGURE_TAG);

    globalThis.document = prev;
  });

  it('sets text content via textContent', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createFigure('Figure content');
    expect(el.textContent).toBe('Figure content');

    globalThis.document = prev;
  });

  it('applies common global attributes safely', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createFigure('X', { id: 'a', className: 'b', title: 'c', lang: 'en', dir: 'ltr' });
    expect(el.id).toBe('a');
    expect(el.className).toBe('b');
    expect(el.title).toBe('c');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');

    globalThis.document = prev;
  });

  it('maps structured aria fields into aria-* attributes', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createFigure('X', { aria: { label: 'Media', hidden: true } });
    expect(el.getAttribute('aria-label')).toBe('Media');
    expect(el.getAttribute('aria-hidden')).toBe('true');

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() => createFigure('X', { attrs: { onclick: 'alert(1)' } as any })).toThrow();

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() => createFigure('X', { attrs: { style: 'color:red' } as any })).toThrow();

    globalThis.document = prev;
  });

  it('enhanceFigures is a no-op and does not throw', () => {
    // In this repo, enhancement hooks are intentionally inert in v1.0.0.
    expect(() => enhanceFigures({} as unknown as ParentNode)).not.toThrow();
  });
});
