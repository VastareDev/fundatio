import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { createEmbed, enhanceEmbeds, EMBED_TAG } from '../../../../src/elements/media/embed';

type FakeAttrs = Map<string, string>;

class FakeElement {
  public readonly tagName: string;
  private readonly _attrs: FakeAttrs = new Map();

  // Properties used by applyGlobalAttrs
  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir: 'ltr' | 'rtl' | 'auto' | '' = '';
  public hidden = false;
  public tabIndex = 0;
  public draggable = false;
  public spellcheck = false;
  public translate = '';
  public contentEditable = '';

  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, value: string): void {
    this._attrs.set(String(name), String(value));
  }

  getAttribute(name: string): string | null {
    return this._attrs.get(String(name)) ?? null;
  }
}

describe('embed element', () => {
  const createElementSpy = vi.fn((tag: string) => new FakeElement(tag));
  const createElementNSSpy = vi.fn();

  beforeEach(() => {
    createElementSpy.mockClear();
    createElementNSSpy.mockClear();

    // Minimal document stub for dom.ts helpers
    (globalThis as unknown as { document: unknown }).document = {
      createElement: createElementSpy,
      createElementNS: createElementNSSpy,
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates an embed element', () => {
    const el = createEmbed() as unknown as FakeElement;

    expect(createElementSpy).toHaveBeenCalledWith(EMBED_TAG);
    expect(el.tagName).toBe('EMBED');
  });

  it('applies src when provided', () => {
    const el = createEmbed({ src: '/file.pdf' }) as unknown as FakeElement;

    expect(el.getAttribute('src')).toBe('/file.pdf');
  });

  it('applies type when provided', () => {
    const el = createEmbed({ type: 'application/pdf' }) as unknown as FakeElement;

    expect(el.getAttribute('type')).toBe('application/pdf');
  });

  it('applies width/height when provided as numbers', () => {
    const el = createEmbed({ width: 250, height: 200 }) as unknown as FakeElement;

    expect(el.getAttribute('width')).toBe('250');
    expect(el.getAttribute('height')).toBe('200');
  });

  it('rejects percentage dimensions', () => {
    expect(() => createEmbed({ width: '100%' })).toThrow();
    expect(() => createEmbed({ height: '50%' })).toThrow();
  });

  it('maps structured aria into aria-* attributes', () => {
    const el = createEmbed({
      aria: { label: 'Embedded manual', hidden: true },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Embedded manual');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createEmbed({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();

    expect(() =>
      createEmbed({
        attrs: { style: 'color:red' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createEmbed({ src: '/file.pdf' });

    expect(createElementNSSpy).not.toHaveBeenCalled();
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceEmbeds()).not.toThrow();
  });
});
