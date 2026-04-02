import { describe, expect, it } from 'vitest';
import { MARK_TAG, createMark, enhanceMarks } from '../../../../src/elements/inline/mark';

/**
 * Minimal fake element implementation sufficient for Fundatio DOM helpers.
 *
 * @remarks
 * Fundatio tests intentionally avoid requiring a real DOM (jsdom/happy-dom).
 * We stub `document.createElement` and validate behavior deterministically.
 */
class FakeElement {
  public readonly tagName: string;

  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir = '';
  public hidden = false;
  public tabIndex = 0;
  public draggable = false;
  public spellcheck = false;
  public contentEditable = '';
  public dataset: Record<string, string> = {};
  public style: Record<string, unknown> = {};
  public textContent: string | null = null;

  private attrs = new Map<string, string>();

  public constructor(tag: string) {
    this.tagName = tag.toUpperCase();
  }

  public setAttribute(name: string, value: string): void {
    this.attrs.set(String(name), String(value));
  }

  public getAttribute(name: string): string | null {
    return this.attrs.has(name) ? (this.attrs.get(name) ?? null) : null;
  }

  public hasAttribute(name: string): boolean {
    return this.attrs.has(name);
  }
}

function installFakeDocument(): {
  calls: { createElement: string[]; createElementNS: Array<[string, string]> };
  restore: () => void;
} {
  const calls = { createElement: [] as string[], createElementNS: [] as Array<[string, string]> };

  const original = (globalThis as unknown as { document?: unknown }).document;

  (globalThis as unknown as { document: unknown }).document = {
    createElement: (tag: string) => {
      calls.createElement.push(tag);
      return new FakeElement(tag);
    },
    createElementNS: (ns: string, tag: string) => {
      calls.createElementNS.push([ns, tag]);
      return new FakeElement(tag);
    },
  };

  return {
    calls,
    restore: () => {
      (globalThis as unknown as { document?: unknown }).document = original;
    },
  };
}

describe('elements/inline/mark', () => {
  it('creates a <mark> using document.createElement (never createElementNS)', () => {
    const env = installFakeDocument();

    const el = createMark('Match') as unknown as FakeElement;

    expect(env.calls.createElement).toEqual([MARK_TAG]);
    expect(env.calls.createElementNS).toEqual([]);
    expect(el.tagName).toBe('MARK');
    expect(el.textContent).toBe('Match');

    env.restore();
  });

  it('applies GlobalAttrs (id/class/title/lang/dir/tabIndex/hidden) and mapped ARIA', () => {
    const env = installFakeDocument();

    const el = createMark('Highlighted', {
      id: 'm1',
      className: 'match',
      title: 'Search match',
      lang: 'en',
      dir: 'ltr',
      tabIndex: 0,
      hidden: false,
      aria: { label: 'Highlighted text', labelledby: 'lbl', hidden: true },
    }) as unknown as FakeElement;

    expect(el.id).toBe('m1');
    expect(el.className).toBe('match');
    expect(el.title).toBe('Search match');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.tabIndex).toBe(0);
    expect(el.hidden).toBe(false);

    expect(el.getAttribute('aria-label')).toBe('Highlighted text');
    expect(el.getAttribute('aria-labelledby')).toBe('lbl');
    expect(el.getAttribute('aria-hidden')).toBe('true');

    env.restore();
  });

  it('supports the attrs escape hatch', () => {
    const env = installFakeDocument();

    const el = createMark('x', {
      attrs: { 'data-test': '1' },
    }) as unknown as FakeElement;

    expect(el.getAttribute('data-test')).toBe('1');

    env.restore();
  });

  it('rejects inline event handler attributes via attrs (security guard)', () => {
    const env = installFakeDocument();

    expect(() =>
      createMark('x', {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler attributes are blocked/i);

    env.restore();
  });

  it('rejects raw style attribute via attrs (security guard)', () => {
    const env = installFakeDocument();

    expect(() =>
      createMark('x', {
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);

    env.restore();
  });

  it('enhanceMarks is a stable no-op', () => {
    const env = installFakeDocument();

    expect(() => enhanceMarks()).not.toThrow();

    env.restore();
  });
});
