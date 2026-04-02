import { describe, it, expect, beforeEach } from 'vitest';
import { createWbr, enhanceWbrs, WBR_TAG } from '../../../../src/elements/break/wbr';

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

describe('wbr element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates a wbr element with correct semantic tag', () => {
    const el = createWbr();
    expect(el.tagName.toLowerCase()).toBe(WBR_TAG);
  });

  it('does not assign text content (void element)', () => {
    const el = createWbr() as unknown as FakeElement;
    expect(el.textContent).toBeNull();
  });

  it('forwards curated global attributes', () => {
    const el = createWbr({
      id: 'optional-break',
      className: 'wbr-test',
      hidden: true,
      tabIndex: 1,
    }) as unknown as FakeElement;

    expect(el.id).toBe('optional-break');
    expect(el.className).toBe('wbr-test');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(1);
  });

  it('maps structured aria fields correctly', () => {
    const el = createWbr({
      aria: {
        label: 'Optional break',
        hidden: true,
      },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Optional break');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('blocks unsafe inline event attributes', () => {
    expect(() =>
      createWbr({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow();
  });

  it('blocks raw style attribute injection', () => {
    expect(() =>
      createWbr({
        attrs: {
          style: 'color:red',
        },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createWbr();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceWbrs()).not.toThrow();
  });
});
