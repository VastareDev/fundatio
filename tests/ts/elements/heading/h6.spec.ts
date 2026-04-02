import { describe, it, expect, beforeEach } from 'vitest';
import { createH6, enhanceH6s, H6_TAG } from '../../../../src/elements/heading/h6';

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

describe('h6 element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates an h6 element with correct semantic tag', () => {
    const el = createH6();
    expect(el.tagName.toLowerCase()).toBe(H6_TAG);
  });

  it('assigns text content via textContent when provided', () => {
    const el = createH6('Small heading') as unknown as FakeElement;
    expect(el.textContent).toBe('Small heading');
  });

  it('forwards curated global attributes', () => {
    const el = createH6('Title', {
      id: 'h6-title',
      className: 'heading',
      hidden: true,
      tabIndex: 0,
    }) as unknown as FakeElement;

    expect(el.id).toBe('h6-title');
    expect(el.className).toBe('heading');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
  });

  it('maps structured aria fields correctly', () => {
    const el = createH6('Accessible title', {
      aria: {
        label: 'Section title',
        hidden: true,
      },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Section title');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks unsafe inline event attributes', () => {
    expect(() =>
      createH6('Bad', {
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow();
  });

  it('blocks raw style attribute injection', () => {
    expect(() =>
      createH6('Bad', {
        attrs: {
          style: 'color:red',
        },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createH6('Hello');
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceH6s()).not.toThrow();
  });
});
