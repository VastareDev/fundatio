import { describe, expect, it } from 'vitest';
import { createLegend, enhanceLegends, LEGEND_SELECTOR, LEGEND_TAG } from '../../../../src/elements/form/legend';

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

describe('form/legend', () => {
  it('exports the correct tag and selector constants', () => {
    expect(LEGEND_TAG).toBe('legend');
    expect(LEGEND_SELECTOR).toBe('legend');
  });

  it('creates a <legend> element', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createLegend();
    expect(el.tagName.toLowerCase()).toBe(LEGEND_TAG);

    globalThis.document = prev;
  });

  it('sets text content via textContent', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createLegend('Legend content');
    expect(el.textContent).toBe('Legend content');

    globalThis.document = prev;
  });

  it('applies common global attributes safely', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createLegend('X', { id: 'a', className: 'b', title: 'c', lang: 'en', dir: 'ltr' });
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

    const el = createLegend('X', { aria: { label: 'Group label', hidden: true } });
    expect(el.getAttribute('aria-label')).toBe('Group label');
    expect(el.getAttribute('aria-hidden')).toBe('true');

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() => createLegend('X', { attrs: { onclick: 'alert(1)' } as any })).toThrow();

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() => createLegend('X', { attrs: { style: 'color:red' } as any })).toThrow();

    globalThis.document = prev;
  });

  it('enhanceLegends is a no-op and does not throw', () => {
    // In this repo, enhancement hooks are intentionally inert in v1.0.0.
    expect(() => enhanceLegends({} as unknown as ParentNode)).not.toThrow();
  });
});
