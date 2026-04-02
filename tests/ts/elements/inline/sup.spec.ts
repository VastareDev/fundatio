import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createSup, enhanceSups, SUP_TAG } from '../../../../src/elements/inline/sup';

/**
 * Minimal fake element used to test Fundatio DOM helpers without a real DOM.
 */
class FakeElement {
  public tagName: string;
  public attributes = new Map<string, string>();
  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};

  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir = '';
  public hidden = false;
  public tabIndex = -1;
  public draggable = false;
  public spellcheck = false;
  public contentEditable = '';
  public textContent: string | null = null;

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }
}

function installFakeDocument() {
  const createElement = vi.fn((tag: string) => new FakeElement(tag));
  const createElementNS = vi.fn(() => new FakeElement('ns'));

  const fakeDocument = {
    createElement,
    createElementNS,
  };

  Object.defineProperty(globalThis, 'document', {
    value: fakeDocument,
    configurable: true,
  });

  return { createElement, createElementNS };
}

describe('inline/sup', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    installFakeDocument();
  });

  it('creates a <sup> element', () => {
    const el = createSup();
    expect(el.tagName.toLowerCase()).toBe(SUP_TAG);
  });

  it('assigns text via textContent when provided', () => {
    const el = createSup('2');
    expect(el.textContent).toBe('2');
  });

  it('applies common global attributes', () => {
    const el = createSup('1', { id: 'fn-1', className: 'footnote-marker', title: 'Footnote' });

    expect(el.id).toBe('fn-1');
    expect(el.className).toBe('footnote-marker');
    expect(el.title).toBe('Footnote');
  });

  it('maps structured aria into aria-* attributes', () => {
    const el = createSup('1', {
      aria: { label: 'Footnote 1', labelledby: 'fn-label', hidden: true },
    });

    expect(el.getAttribute('aria-label')).toBe('Footnote 1');
    expect(el.getAttribute('aria-labelledby')).toBe('fn-label');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks inline event handler attributes via attrs escape hatch', () => {
    expect(() =>
      createSup('x', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('blocks raw style attribute injection via attrs escape hatch', () => {
    expect(() =>
      createSup('x', {
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style.*not allowed/i);
  });

  it('does not use createElementNS', () => {
    const { createElementNS } = installFakeDocument();
    createSup('3');
    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('enhanceSups is a stable no-op', () => {
    const root = {} as unknown as ParentNode;
    expect(() => enhanceSups(root)).not.toThrow();
  });
});
