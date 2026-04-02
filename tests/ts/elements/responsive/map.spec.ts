import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createMap, enhanceMaps } from '../../../../src/elements/responsive/map';

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

describe('elements/responsive/map', () => {
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

  it('creates a <map> via document.createElement (never createElementNS)', () => {
    const el = createMap();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['map']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('MAP');
  });

  it('sets text via textContent (never HTML interpretation)', () => {
    const el = createMap('<b>Areas</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>Areas</b>');
  });

  it('applies a deterministic fallback name when omitted', () => {
    const el = createMap();
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('name')).toBe('map');
  });

  it('uses id as the name when name is omitted but id is provided', () => {
    const el = createMap(undefined, { id: 'product-map' });
    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('product-map');
    expect(fake.getAttribute('name')).toBe('product-map');
  });

  it('throws if id and name are both provided but do not match', () => {
    expect(() =>
      createMap(undefined, {
        id: 'a',
        name: 'b',
      }),
    ).toThrow(/id.*match.*name/i);
  });

  it('throws if name is empty or contains whitespace', () => {
    expect(() => createMap(undefined, { name: '' })).toThrow(/non-empty/i);
    expect(() => createMap(undefined, { name: 'has space' })).toThrow(/whitespace/i);
  });

  it('forwards curated global attributes', () => {
    const el = createMap('Map', {
      id: 'm1',
      className: 'img-map',
      title: 'Image map',
      lang: 'en',
      dir: 'ltr',
      role: 'presentation',
      tabIndex: 0,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
      name: 'm1',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('m1');
    expect(fake.className).toBe('img-map');
    expect(fake.title).toBe('Image map');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);

    expect(fake.getAttribute('role')).toBe('presentation');
    expect(fake.getAttribute('name')).toBe('m1');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
    expect(fake.textContent).toBe('Map');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createMap(undefined, {
      aria: {
        label: 'Product hotspots',
        labelledby: 'map-title',
        hidden: true,
      },
      name: 'product-map',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Product hotspots');
    expect(fake.getAttribute('aria-labelledby')).toBe('map-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createMap(undefined, {
        name: 'secure-map',
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createMap(undefined, {
        name: 'secure-map',
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceMaps is a no-op (but stable hook)', () => {
    expect(() => enhanceMaps()).not.toThrow();
  });
});
