import { describe, it, expect, beforeEach } from 'vitest';
import { createOutput, enhanceOutputs, OUTPUT_TAG } from '../../../../src/elements/form/output';

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

describe('output element', () => {
  let createElementNSCalls: string[];

  beforeEach(() => {
    const installed = installFakeDocument();
    createElementNSCalls = installed.createElementNSCalls;
  });

  it('creates an output element', () => {
    const el = createOutput();
    expect(el.tagName.toLowerCase()).toBe(OUTPUT_TAG);
  });

  it('sets text via textContent', () => {
    const el = createOutput('42') as unknown as FakeElement;
    expect(el.textContent).toBe('42');
  });

  it('applies output-specific attributes (for/form/name)', () => {
    const el = createOutput(undefined, {
      for: 'a b',
      form: 'calc-form',
      name: 'result',
    }) as unknown as FakeElement;

    expect(el.getAttribute('for')).toBe('a b');
    expect(el.getAttribute('form')).toBe('calc-form');
    expect(el.getAttribute('name')).toBe('result');
  });

  it('maps structured aria fields into aria-* attributes', () => {
    const el = createOutput('x', {
      aria: { label: 'Calculated total', hidden: false },
    }) as unknown as FakeElement;

    expect(el.getAttribute('aria-label')).toBe('Calculated total');
    expect(el.getAttribute('aria-hidden')).toBe('false');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createOutput('x', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createOutput();
    expect(createElementNSCalls.length).toBe(0);
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceOutputs()).not.toThrow();
  });
});
