import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import {
  createTrack,
  enhanceTracks,
  TRACK_SELECTOR,
  TRACK_TAG,
} from '../../../../src/elements/responsive/track';

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
    return Object.prototype.hasOwnProperty.call(this._attrs, name)
      ? this._attrs[name]
      : null;
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
    // Provided so we can assert it is never used.
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

describe('elements/responsive/track', () => {
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

  it('exports the correct tag and selector constants', () => {
    expect(TRACK_TAG).toBe('track');
    expect(TRACK_SELECTOR).toBe('track');
  });

  it('creates a <track> via document.createElement (never createElementNS)', () => {
    const el = createTrack();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['track']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('TRACK');
  });

  it('applies track-specific attributes (kind/src/srclang/label/default) via safe attrs mapping', () => {
    const el = createTrack({
      kind: 'subtitles',
      src: '/captions/en.vtt',
      srclang: 'en',
      label: 'English',
      default: true,
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('kind')).toBe('subtitles');
    expect(fake.getAttribute('src')).toBe('/captions/en.vtt');
    expect(fake.getAttribute('srclang')).toBe('en');
    expect(fake.getAttribute('label')).toBe('English');
    expect(fake.getAttribute('default')).toBe('');
  });

  it('does not set the default attribute when default is false/omitted', () => {
    const el = createTrack({ default: false });
    const fake = el as unknown as FakeElement;

    expect(fake.hasAttribute('default')).toBe(false);
  });

  it('forwards curated global attributes', () => {
    const el = createTrack({
      id: 't',
      className: 'track',
      title: 'Captions',
      lang: 'en',
      dir: 'ltr',
      role: 'note',
      hidden: true,
      tabIndex: 1,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'plaintext-only',
      style: { fontSize: '16px' } as any,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('t');
    expect(fake.className).toBe('track');
    expect(fake.title).toBe('Captions');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');

    expect(fake.hidden).toBe(true);
    expect(fake.tabIndex).toBe(1);

    expect(fake.draggable).toBe(true);
    expect(fake.spellcheck).toBe(true);
    expect(fake.contentEditable).toBe('plaintext-only');

    expect(fake.getAttribute('role')).toBe('note');
    expect(fake.getAttribute('translate')).toBe('no');

    expect((fake.style as any).fontSize).toBe('16px');
    expect(fake.hasAttribute('style')).toBe(false);

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createTrack({
      aria: {
        label: 'English subtitles',
        labelledby: 'subtitle-label',
        hidden: true,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('English subtitles');
    expect(fake.getAttribute('aria-labelledby')).toBe('subtitle-label');
    expect(fake.getAttribute('aria-hidden')).toBe('true');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createTrack({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createTrack({
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enforces security: blocks empty attribute names (including whitespace)', () => {
    expect(() =>
      createTrack({
        attrs: { '   ': 'x' },
      }),
    ).toThrow(/empty attribute name/i);
  });

  it('enhanceTracks is a no-op (but stable hook)', () => {
    expect(() => enhanceTracks()).not.toThrow();
  });
});
