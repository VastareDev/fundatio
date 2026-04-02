import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createIFrame, enhanceIFrames } from '../../../../src/elements/media/iframe';

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
    // We explicitly provide createElementNS so tests can prove it is never used.
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

describe('elements/media/iframe', () => {
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

  it('creates an <iframe> via document.createElement (never createElementNS)', () => {
    const el = createIFrame();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['iframe']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('IFRAME');
  });

  it('sets fallback text via textContent (never HTML interpretation)', () => {
    const el = createIFrame('<b>fallback</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>fallback</b>');
  });

  it('forwards curated global attributes and iframe attributes', () => {
    const el = createIFrame(undefined, {
      id: 'frame-1',
      className: 'embed',
      title: 'Embedded content',
      lang: 'en',
      dir: 'ltr',
      role: 'region',
      tabIndex: 0,
      src: 'https://example.com',
      name: 'example-frame',
      loading: 'lazy',
      referrerPolicy: 'no-referrer',
      width: 640,
      height: 480,
      fetchPriority: 'low',
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('frame-1');
    expect(fake.className).toBe('embed');
    expect(fake.title).toBe('Embedded content');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);

    expect(fake.getAttribute('role')).toBe('region');

    expect(fake.getAttribute('src')).toBe('https://example.com');
    expect(fake.getAttribute('name')).toBe('example-frame');
    expect(fake.getAttribute('loading')).toBe('lazy');
    expect(fake.getAttribute('referrerpolicy')).toBe('no-referrer');
    expect(fake.getAttribute('width')).toBe('640');
    expect(fake.getAttribute('height')).toBe('480');
    expect(fake.getAttribute('fetchpriority')).toBe('low');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createIFrame(undefined, {
      aria: {
        label: 'Embedded dashboard',
        labelledby: 'dashboard-title',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Embedded dashboard');
    expect(fake.getAttribute('aria-labelledby')).toBe('dashboard-title');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('supports sandbox/allow and boolean attributes by presence', () => {
    const el = createIFrame(undefined, {
      sandbox: 'allow-scripts',
      allow: 'fullscreen',
      allowFullScreen: true,
      credentialless: true,
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('sandbox')).toBe('allow-scripts');
    expect(fake.getAttribute('allow')).toBe('fullscreen');

    // Boolean attributes are represented by presence; we set empty-string when true.
    expect(fake.getAttribute('allowfullscreen')).toBe('');
    expect(fake.getAttribute('credentialless')).toBe('');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createIFrame(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createIFrame(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceIFrames is a no-op (but stable hook)', () => {
    expect(() => enhanceIFrames()).not.toThrow();
  });
});
