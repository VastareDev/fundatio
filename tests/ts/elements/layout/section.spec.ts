import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createSection, enhanceSections, SECTION_TAG } from '../../../../src/elements/layout/section';

/**
 * Minimal DOM shim for node-based tests.
 * Vitest environment is node, so `document` doesn't exist unless we provide it.
 */

type AttrMap = Record<string, string>;

class FakeElement {
  public readonly tagName: string;

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
  public style: Partial<CSSStyleDeclaration> = {};
  public dataset: Record<string, string> = {};

  public textContent: string | null = null;

  private readonly attrs: AttrMap = {};

  public constructor(tag: string) {
    this.tagName = tag.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attrs[name] = value;
  }

  public getAttribute(name: string): string | null {
    return this.attrs[name] ?? null;
  }

  public hasAttribute(name: string): boolean {
    return name in this.attrs;
  }
}

type FakeDocument = {
  createElement: (tag: string) => FakeElement;
  createElementNS: (ns: string, tag: string) => FakeElement;
};

function installFakeDocument(): { createElementNSCalls: string[]; restore: () => void } {
  const createElementNSCalls: string[] = [];

  const original = (globalThis as unknown as { document?: unknown }).document;

  const fake: FakeDocument = {
    createElement: (tag: string) => new FakeElement(tag),
    createElementNS: (_ns: string, tag: string) => {
      createElementNSCalls.push(tag);
      return new FakeElement(tag);
    },
  };

  (globalThis as unknown as { document: FakeDocument }).document = fake;

  return {
    createElementNSCalls,
    restore: () => {
      (globalThis as unknown as { document?: unknown }).document = original;
    },
  };
}

describe('section element', () => {
  let createElementNSCalls: string[];
  let restore: () => void;

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
    restore = installed.restore;
  });

  afterEach(() => {
    restore();
  });

  it('creates a <section> via document.createElement (never createElementNS)', () => {
    const el = createSection();
    expect(el.tagName.toLowerCase()).toBe(SECTION_TAG);
    expect(createElementNSCalls).toHaveLength(0);
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createSection('<b>nope</b>') as unknown as FakeElement;
    expect(el.textContent).toBe('<b>nope</b>');
  });

  it('forwards curated global attributes', () => {
    const el = createSection(undefined, {
      id: 'a',
      className: 'b',
      title: 'c',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 2,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      dataset: { trackingId: '123' },
      style: { borderWidth: '1px' },
      attrs: { 'data-extra': 'ok' },
    }) as unknown as FakeElement;

    expect(el.id).toBe('a');
    expect(el.className).toBe('b');
    expect(el.title).toBe('c');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(2);
    expect(el.draggable).toBe(true);
    expect(el.spellcheck).toBe(true);
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.contentEditable).toBe('plaintext-only');

    expect(el.dataset.trackingId).toBe('123');
    expect(el.style.borderWidth).toBe('1px');
    expect(el.getAttribute('data-extra')).toBe('ok');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createSection(undefined, {
      aria: { label: 'Features', labelledby: 'h-features', hidden: false },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Features');
    expect(el.getAttribute('aria-labelledby')).toBe('h-features');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createSection(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createSection(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createSection(undefined, {
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceSections is a no-op (but stable hook)', () => {
    expect(() => enhanceSections()).not.toThrow();
  });
});
