import { describe, it, expect, beforeEach } from 'vitest';
import { createImg, enhanceImgs, IMG_TAG } from '../../../../src/elements/media/img';

class FakeElement {
  tagName: string;
  id = '';
  className = '';
  title = '';
  lang = '';
  dir = '';
  hidden = false;
  tabIndex = -1;
  draggable = false;
  spellcheck = false;
  contentEditable = '';
  style: Partial<CSSStyleDeclaration> = {};
  dataset: Record<string, string> = {};
  textContent: string | null = null;

  private _attrs: Record<string, string> = {};

  constructor(tag: string) {
    this.tagName = tag.toUpperCase();
  }

  setAttribute(name: string, value: string): void {
    this._attrs[name] = value;
  }

  getAttribute(name: string): string | null {
    return this._attrs[name] ?? null;
  }

  hasAttribute(name: string): boolean {
    return name in this._attrs;
  }
}

function installFakeDocument(): { createElementNSCalls: string[] } {
  const createElementNSCalls: string[] = [];

  (globalThis as unknown as { document: unknown }).document = {
    createElement: (tag: string) => new FakeElement(tag),
    createElementNS: (_ns: string, tag: string) => {
      createElementNSCalls.push(tag);
      return new FakeElement(tag);
    },
  };

  return { createElementNSCalls };
}

describe('img element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates an img element', () => {
    const el = createImg();
    expect(el.tagName.toLowerCase()).toBe(IMG_TAG);
  });

  it('always includes alt attribute', () => {
    const el = createImg() as unknown as FakeElement;
    expect(el.getAttribute('alt')).toBe('');
  });

  it('applies provided alt text', () => {
    const el = createImg({ alt: 'Logo' }) as unknown as FakeElement;
    expect(el.getAttribute('alt')).toBe('Logo');
  });

  it('applies src when provided', () => {
    const el = createImg({ src: '/logo.png' }) as unknown as FakeElement;
    expect(el.getAttribute('src')).toBe('/logo.png');
  });

  it('falls back to data URI if no src or srcset', () => {
    const el = createImg({ alt: 'Fallback' }) as unknown as FakeElement;
    expect(el.getAttribute('src')).toBe('data:,');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createImg({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createImg();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceImgs()).not.toThrow();
  });
});
