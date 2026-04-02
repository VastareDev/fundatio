import { describe, it, expect, beforeEach } from 'vitest';
import { createSvg, enhanceSvgs, SVG_TAG } from '../../../../src/elements/media/svg';

class FakeElement {
  tagName: string;
  id = '';
  className = '';
  title = '';
  lang = '';
  dir = '';
  hidden = false;
  tabIndex = 0;
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

describe('svg element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates an svg element', () => {
    const el = createSvg();
    expect(el.tagName.toLowerCase()).toBe(SVG_TAG);
  });

  it('defaults to decorative', () => {
    const el = createSvg() as unknown as FakeElement;
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.tabIndex).toBe(-1);
    expect(el.getAttribute('focusable')).toBe('false');
  });

  it('becomes accessible when labelled', () => {
    const el = createSvg(undefined, {
      aria: { label: 'Icon' },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Icon');
    expect(el.getAttribute('aria-hidden')).toBeNull();
    expect(el.getAttribute('role')).toBe('img');
  });

  it('does not override explicit role', () => {
    const el = createSvg(undefined, {
      role: 'presentation',
      aria: { label: 'Icon' },
    }) as unknown as FakeElement;

    expect(el.getAttribute('role')).toBe('presentation');
  });

  it('does not override explicit tabIndex', () => {
    const el = createSvg(undefined, {
      tabIndex: 2,
    }) as unknown as FakeElement;

    expect(el.tabIndex).toBe(2);
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createSvg(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createSvg();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceSvgs()).not.toThrow();
  });
});
