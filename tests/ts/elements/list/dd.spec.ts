import { describe, expect, it } from 'vitest';
import { createDd, DD_SELECTOR, DD_TAG } from '../../../../src/elements/list/dd';

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

  public readonly style: Record<string, unknown> = {};
  public readonly dataset: Record<string, string> = {};

  private readonly attrs = new Map<string, string>();

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attrs.set(String(name), String(value));
  }

  public getAttribute(name: string): string | null {
    return this.attrs.has(String(name)) ? (this.attrs.get(String(name)) ?? null) : null;
  }
}

describe('list/dd', () => {
  it('exports the correct tag and selector constants', () => {
    expect(DD_TAG).toBe('dd');
    expect(DD_SELECTOR).toBe('dd');
  });

  it('creates a <dd> element with textContent', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => {
        const el = new FakeElement(tag) as unknown as HTMLElement;
        Object.defineProperty(el, 'textContent', { value: '', writable: true });
        return el;
      },
    } as unknown as Document;

    const el = createDd('A definition.');
    expect(el.tagName.toLowerCase()).toBe('dd');
    expect((el as unknown as { textContent: string }).textContent).toBe('A definition.');

    globalThis.document = prev;
  });

  it('applies global attributes safely', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag) as unknown as HTMLElement,
    } as unknown as Document;

    const el = createDd('Definition', {
      id: 'def-1',
      className: 'desc',
      title: 'More info',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 2,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      dataset: { trackingId: '123' },
      aria: { label: 'Definition', hidden: true },
    });

    expect(el.id).toBe('def-1');
    expect(el.className).toBe('desc');
    expect(el.title).toBe('More info');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(2);
    expect(el.draggable).toBe(true);
    expect((el as unknown as FakeElement).spellcheck).toBe(true);

    expect((el as unknown as FakeElement).dataset.trackingId).toBe('123');

    expect((el as unknown as FakeElement).getAttribute('aria-label')).toBe('Definition');
    expect((el as unknown as FakeElement).getAttribute('aria-hidden')).toBe('true');
    expect((el as unknown as FakeElement).getAttribute('translate')).toBe('no');

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag) as unknown as HTMLElement,
    } as unknown as Document;

    expect(() => createDd('Nope', { attrs: { onclick: 'alert(1)' } })).toThrow();

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;

    globalThis.document = {
      createElement: (tag: string) => new FakeElement(tag) as unknown as HTMLElement,
    } as unknown as Document;

    expect(() => createDd('Nope', { attrs: { style: 'color: red' } })).toThrow();

    globalThis.document = prev;
  });
});
