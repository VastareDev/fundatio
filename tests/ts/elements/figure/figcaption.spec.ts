import { describe, expect, it } from 'vitest';
import {
  createFigcaption,
  enhanceFigcaptions,
  FIGCAPTION_SELECTOR,
  FIGCAPTION_TAG,
} from '../../../../src/elements/figure/figcaption';

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

  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};

  private attrs = new Map<string, string>();

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

class FakeDocument {
  public createElement(tag: string): FakeElement {
    return new FakeElement(tag);
  }
}

describe('figure/figcaption', () => {
  it('exports the correct tag and selector constants', () => {
    expect(FIGCAPTION_TAG).toBe('figcaption');
    expect(FIGCAPTION_SELECTOR).toBe('figcaption');
  });

  it('creates a <figcaption> element with textContent', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test DOM shim
    globalThis.document = new FakeDocument();

    const el = createFigcaption('Caption');

    expect(el.tagName.toLowerCase()).toBe(FIGCAPTION_TAG);
    expect(el.textContent).toBe('Caption');

    globalThis.document = prev;
  });

  it('applies global attributes safely', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test DOM shim
    globalThis.document = new FakeDocument();

    const el = createFigcaption('Caption', {
      id: 'cap',
      className: 'caption',
      title: 'Figure caption',
      lang: 'en',
      dir: 'ltr',
      dataset: { trackingId: '123' },
      aria: { label: 'Figure caption' },
    });

    expect(el.id).toBe('cap');
    expect(el.className).toBe('caption');
    expect(el.title).toBe('Figure caption');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.dataset.trackingId).toBe('123');
    expect(el.getAttribute('aria-label')).toBe('Figure caption');

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test DOM shim
    globalThis.document = new FakeDocument();

    expect(() =>
      createFigcaption('Caption', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test DOM shim
    globalThis.document = new FakeDocument();

    expect(() =>
      createFigcaption('Caption', {
        attrs: { style: 'color: red' },
      }),
    ).toThrow(/style/i);

    globalThis.document = prev;
  });

  it('exports a usable selector', () => {
    expect(FIGCAPTION_SELECTOR).toBe('figcaption');
  });

  it('enhanceFigcaptions is a no-op and does not throw', () => {
    expect(() => enhanceFigcaptions({} as unknown as ParentNode)).not.toThrow();
  });
});
