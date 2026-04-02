import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { createCanvas, enhanceCanvases } from '../../../../src/elements/media/canvas';

type AttrMap = Record<string, string>;

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
  public textContent: string | null = null;

  private readonly attrs: AttrMap = {};

  public constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attrs[name] = value;
  }

  public getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.attrs, name) ? this.attrs[name] : null;
  }
}

describe('canvas element', () => {
  const originalDocument = globalThis.document;

  beforeEach(() => {
    const fakeDocument = {
      createElement: (tag: string) => new FakeElement(tag) as unknown as HTMLElement,
      // Ensure no code path tries to use namespaced creation.
      createElementNS: () => {
        throw new Error('createElementNS must not be used in Fundatio element factories.');
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.document = fakeDocument as any;
  });

  afterEach(() => {
    globalThis.document = originalDocument;
  });

  it('creates a canvas element', () => {
    const el = createCanvas() as unknown as FakeElement;
    expect(el.tagName).toBe('CANVAS');
  });

  it('uses textContent for fallback content', () => {
    const el = createCanvas('Canvas unsupported') as unknown as FakeElement;
    expect(el.textContent).toBe('Canvas unsupported');
  });

  it('applies width and height attributes when provided', () => {
    const el = createCanvas(undefined, { width: 320, height: 200 }) as unknown as FakeElement;
    expect(el.getAttribute('width')).toBe('320');
    expect(el.getAttribute('height')).toBe('200');
  });

  it('forwards safe global attributes', () => {
    const el = createCanvas(undefined, {
      id: 'chart',
      className: 'sparkline',
      title: 'Revenue',
      lang: 'en',
      dir: 'ltr',
      dataset: { trackingId: '123' },
    }) as unknown as FakeElement;

    expect(el.id).toBe('chart');
    expect(el.className).toBe('sparkline');
    expect(el.title).toBe('Revenue');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.dataset.trackingId).toBe('123');
  });

  it('maps structured aria into aria-* attributes', () => {
    const el = createCanvas(undefined, {
      aria: { label: 'Trend chart', labelledby: 'chart-title', hidden: true },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Trend chart');
    expect(el.getAttribute('aria-labelledby')).toBe('chart-title');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createCanvas(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createCanvas(undefined, {
        attrs: { style: 'color:red' },
      }),
    ).toThrow();

    expect(() =>
      createCanvas(undefined, {
        attrs: { '   ': 'nope' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    // If createElementNS is used, the stub throws and the test fails.
    const el = createCanvas() as unknown as FakeElement;
    expect(el.tagName).toBe('CANVAS');
  });

  it('enhancement is a no-op', () => {
    // Just ensure it does not throw and accepts the root parameter shape.
    enhanceCanvases(document);
  });
});
