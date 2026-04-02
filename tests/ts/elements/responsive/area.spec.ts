import { describe, it, expect, beforeEach } from 'vitest';
import { createArea, enhanceAreas, AREA_TAG } from '../../../../src/elements/responsive/area';

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

describe('area element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates an area element', () => {
    const el = createArea();
    expect(el.tagName.toLowerCase()).toBe(AREA_TAG);
  });

  it('omits alt when href is not provided (dead area)', () => {
    const el = createArea() as unknown as FakeElement;
    expect(el.hasAttribute('alt')).toBe(false);
  });

  it('omits alt even if provided when href is not provided (spec-aligned)', () => {
    const el = createArea({ alt: 'Ignored' }) as unknown as FakeElement;
    expect(el.hasAttribute('alt')).toBe(false);
  });

  it('includes alt when href is provided, defaulting to empty string', () => {
    const el = createArea({ href: '/somewhere' }) as unknown as FakeElement;
    expect(el.getAttribute('href')).toBe('/somewhere');
    expect(el.getAttribute('alt')).toBe('');
  });

  it('applies provided alt text when href is provided', () => {
    const el = createArea({ href: '/somewhere', alt: 'Go somewhere' }) as unknown as FakeElement;
    expect(el.getAttribute('alt')).toBe('Go somewhere');
  });

  it('applies common area attributes', () => {
    const el = createArea({
      href: '/x',
      alt: 'X',
      shape: 'rect',
      coords: '0,0,10,10',
      target: '_blank',
      rel: 'noopener',
      referrerPolicy: 'no-referrer',
    }) as unknown as FakeElement;

    expect(el.getAttribute('shape')).toBe('rect');
    expect(el.getAttribute('coords')).toBe('0,0,10,10');
    expect(el.getAttribute('target')).toBe('_blank');
    expect(el.getAttribute('rel')).toBe('noopener');
    expect(el.getAttribute('referrerpolicy')).toBe('no-referrer');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createArea({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createArea();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceAreas()).not.toThrow();
  });
});
