import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createObject, enhanceObjects } from '../../../../src/elements/media/object';

/**
 * Minimal fake element used by Fundatio tests.
 *
 * @remarks
 * The real test suite in this repo uses a small fake DOM element that supports
 * `setAttribute` / `getAttribute`. This local interface matches the needs of
 * these assertions.
 */
type FakeElement = {
  tagName: string;
  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  // properties `id`, `className`, etc. may be assigned by applyGlobalAttrs
  [k: string]: unknown;
};

function makeFakeElement(tagName: string): FakeElement {
  const attrs = new Map<string, string>();

  return {
    tagName: tagName.toUpperCase(),
    setAttribute(name: string, value: string) {
      attrs.set(String(name), String(value));
    },
    getAttribute(name: string) {
      return attrs.has(String(name)) ? attrs.get(String(name)) ?? null : null;
    },
  };
}

let originalDocument: unknown;

beforeAll(() => {
  // Vitest is running in Node (no DOM), so provide a minimal `document`.
  originalDocument = (globalThis as any).document;

  (globalThis as any).document = {
    createElement: vi.fn((tag: string) => makeFakeElement(tag) as unknown as HTMLElement),
    createElementNS: vi.fn(),
  };
});

afterAll(() => {
  (globalThis as any).document = originalDocument;
});

describe('object element', () => {
  it('creates an object element', () => {
    const createSpy = vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    const el = createObject() as unknown as FakeElement;

    expect(createSpy).toHaveBeenCalledWith('object');
    expect(el.tagName).toBe('OBJECT');

    createSpy.mockRestore();
  });

  it('applies data when provided', () => {
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    const el = createObject(undefined, { data: '/docs/example.pdf' }) as unknown as FakeElement;

    expect(el.getAttribute('data')).toBe('/docs/example.pdf');
  });

  it('applies type when provided', () => {
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    const el = createObject(undefined, { type: 'application/pdf' }) as unknown as FakeElement;

    expect(el.getAttribute('type')).toBe('application/pdf');
  });

  it('falls back to about:blank when no data or type is provided', () => {
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    const el = createObject() as unknown as FakeElement;

    expect(el.getAttribute('data')).toBe('about:blank');
  });

  it('applies width and height when provided', () => {
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    const el = createObject(undefined, { width: 640, height: 480 }) as unknown as FakeElement;

    expect(el.getAttribute('width')).toBe('640');
    expect(el.getAttribute('height')).toBe('480');
  });

  it('blocks unsafe attributes', () => {
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    expect(() =>
      createObject(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    const nsSpy = vi.spyOn(document, 'createElementNS');

    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      return makeFakeElement(tag) as unknown as HTMLElement;
    });

    createObject();

    expect(nsSpy).not.toHaveBeenCalled();

    nsSpy.mockRestore();
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceObjects(document)).not.toThrow();
  });
});
