import { describe, it, expect, beforeEach } from 'vitest';
import { createBr, enhanceBrs, BR_TAG } from '../../../../src/elements/break/br';

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

describe('br element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates a br element with correct semantic tag', () => {
    const el = createBr();
    expect(el.tagName.toLowerCase()).toBe(BR_TAG);
  });

  it('does not assign text content (void element)', () => {
    const el = createBr() as unknown as FakeElement;
    expect(el.textContent).toBeNull();
  });

  it('forwards curated global attributes', () => {
    const el = createBr({
      id: 'line-break',
      className: 'separator',
      hidden: true,
      tabIndex: 0,
    }) as unknown as FakeElement;

    expect(el.id).toBe('line-break');
    expect(el.className).toBe('separator');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured aria fields correctly', () => {
    const el = createBr({
      aria: {
        label: 'Line break',
        hidden: true,
      },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Line break');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks unsafe inline event attributes', () => {
    expect(() =>
      createBr({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow();
  });

  it('blocks raw style attribute injection', () => {
    expect(() =>
      createBr({
        attrs: {
          style: 'color:red',
        },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createBr();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceBrs()).not.toThrow();
  });
});
