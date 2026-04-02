import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createMeter, enhanceMeters } from '../../../../src/elements/form/meter';

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

  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};
  public textContent: string | null = null;

  private _attrs: AttrMap = {};

  public constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this._attrs[name] = String(value);
  }

  public getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this._attrs, name) ? this._attrs[name] : null;
  }

  public hasAttribute(name: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._attrs, name);
  }
}

function installFakeDocument() {
  const g = globalThis as any;
  const prev = g.document;

  const calls: { createElement: string[]; createElementNS: string[] } = {
    createElement: [],
    createElementNS: [],
  };

  g.document = {
    createElement: (tag: string) => {
      calls.createElement.push(tag);
      return new FakeElement(tag);
    },
    // Provided so we can prove it is never used.
    createElementNS: (ns: string, tag: string) => {
      calls.createElementNS.push(`${ns}:${tag}`);
      return new FakeElement(tag);
    },
  };

  return {
    calls,
    restore: () => {
      g.document = prev;
    },
  };
}

describe('elements/form/meter', () => {
  let restoreDocument: (() => void) | null = null;
  let calls: { createElement: string[]; createElementNS: string[] };

  beforeEach(() => {
    const installed = installFakeDocument();
    restoreDocument = installed.restore;
    calls = installed.calls;
  });

  afterEach(() => {
    restoreDocument?.();
    restoreDocument = null;
  });

  it('creates a <meter> via document.createElement (never createElementNS)', () => {
    const el = createMeter();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['meter']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('METER');
  });

  it('sets fallback text via textContent (never HTML interpretation)', () => {
    const el = createMeter('<b>75%</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>75%</b>');
  });

  it('applies predictable defaults for min/max/value when omitted', () => {
    const el = createMeter();
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('min')).toBe('0');
    expect(fake.getAttribute('max')).toBe('1');
    expect(fake.getAttribute('value')).toBe('0');
  });

  it('forwards curated global attributes and meter attributes', () => {
    const el = createMeter('75%', {
      id: 'm1',
      className: 'gauge',
      title: 'Battery',
      lang: 'en',
      dir: 'ltr',
      role: 'meter',
      tabIndex: 0,
      min: 0,
      max: 100,
      value: 75,
      low: 20,
      high: 80,
      optimum: 100,
      form: 'settings',
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('m1');
    expect(fake.className).toBe('gauge');
    expect(fake.title).toBe('Battery');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);
    expect(fake.getAttribute('role')).toBe('meter');

    expect(fake.getAttribute('min')).toBe('0');
    expect(fake.getAttribute('max')).toBe('100');
    expect(fake.getAttribute('value')).toBe('75');
    expect(fake.getAttribute('low')).toBe('20');
    expect(fake.getAttribute('high')).toBe('80');
    expect(fake.getAttribute('optimum')).toBe('100');
    expect(fake.getAttribute('form')).toBe('settings');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
    expect(fake.textContent).toBe('75%');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createMeter(undefined, {
      aria: {
        label: 'Battery level',
        labelledby: 'battery-label',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Battery level');
    expect(fake.getAttribute('aria-labelledby')).toBe('battery-label');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createMeter(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createMeter(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceMeters is a no-op (but stable hook)', () => {
    expect(() => enhanceMeters()).not.toThrow();
  });
});
