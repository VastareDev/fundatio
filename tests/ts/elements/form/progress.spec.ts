import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { createProgress, enhanceProgresses } from '../../../../src/elements/form/progress';

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

describe('elements/form/progress', () => {
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

  it('creates a <progress> via document.createElement (never createElementNS)', () => {
    const el = createProgress();
    const fake = el as unknown as FakeElement;

    expect(calls.createElement).toEqual(['progress']);
    expect(calls.createElementNS).toEqual([]);
    expect(fake.tagName).toBe('PROGRESS');
  });

  it('sets fallback text via textContent (never HTML interpretation)', () => {
    const el = createProgress('<b>Loading</b>');
    const fake = el as unknown as FakeElement;

    expect(fake.textContent).toBe('<b>Loading</b>');
  });

  it('is indeterminate when value is omitted (no value attribute)', () => {
    const el = createProgress(undefined, { id: 'p1' });
    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('p1');
    expect(fake.getAttribute('value')).toBe(null);
  });

  it('sets value (and defaults max=1) in determinate mode when max is omitted', () => {
    const el = createProgress(undefined, { value: 0.25 });
    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('value')).toBe('0.25');
    expect(fake.getAttribute('max')).toBe('1');
  });

  it('forwards curated global attributes and progress attributes', () => {
    const el = createProgress('Uploading...', {
      id: 'p2',
      className: 'upload',
      title: 'Upload progress',
      lang: 'en',
      dir: 'ltr',
      role: 'progressbar',
      tabIndex: 0,
      value: 30,
      max: 100,
      dataset: { trackingId: 123 },
      attrs: { 'data-test': true },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.id).toBe('p2');
    expect(fake.className).toBe('upload');
    expect(fake.title).toBe('Upload progress');
    expect(fake.lang).toBe('en');
    expect(fake.dir).toBe('ltr');
    expect(fake.tabIndex).toBe(0);
    expect(fake.getAttribute('role')).toBe('progressbar');

    expect(fake.getAttribute('value')).toBe('30');
    expect(fake.getAttribute('max')).toBe('100');

    expect(fake.dataset.trackingId).toBe('123');
    expect(fake.getAttribute('data-test')).toBe('true');
    expect(fake.textContent).toBe('Uploading...');
  });

  it('supports structured ARIA input (mapped to aria-* attributes)', () => {
    const el = createProgress(undefined, {
      aria: {
        label: 'Upload progress',
        labelledby: 'upload-title',
        hidden: false,
      },
    });

    const fake = el as unknown as FakeElement;

    expect(fake.getAttribute('aria-label')).toBe('Upload progress');
    expect(fake.getAttribute('aria-labelledby')).toBe('upload-title');
    expect(fake.getAttribute('aria-hidden')).toBe('false');
  });

  it('enforces security: blocks inline event handler attributes', () => {
    expect(() =>
      createProgress(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);
  });

  it('enforces security: blocks raw style attribute injection (any casing)', () => {
    expect(() =>
      createProgress(undefined, {
        attrs: { STYLE: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);
  });

  it('enhanceProgresses is a no-op (but stable hook)', () => {
    expect(() => enhanceProgresses()).not.toThrow();
  });
});
