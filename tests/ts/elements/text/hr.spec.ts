import { describe, expect, it } from 'vitest';
import { createHr, enhanceHrs, HR_TAG } from '../../../../src/elements/text/hr';

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

describe('elements/text/hr', () => {
  it('creates an <hr> using document.createElement (never createElementNS)', () => {
    const env = installFakeDocument();

    const el = createHr() as unknown as FakeElement;

    expect(env.calls.createElement).toEqual([HR_TAG]);
    expect(env.calls.createElementNS).toEqual([]);
    expect(el.tagName).toBe('HR');

    env.restore();
  });

  it('applies GlobalAttrs (id/class/title/lang/dir/tabIndex/hidden) and mapped ARIA', () => {
    const env = installFakeDocument();

    const el = createHr({
      id: 'divider',
      className: 'hr',
      title: 'Section break',
      lang: 'en',
      dir: 'ltr',
      tabIndex: -1,
      hidden: true,
      aria: { label: 'Content divider', hidden: false },
    }) as unknown as FakeElement;

    expect(el.id).toBe('divider');
    expect(el.className).toBe('hr');
    expect(el.title).toBe('Section break');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.tabIndex).toBe(-1);
    expect(el.hidden).toBe(true);

    // ARIA mapping (via dom.ts applyGlobalAttrs -> setAttribute).
    expect(el.getAttribute('aria-label')).toBe('Content divider');
    expect(el.getAttribute('aria-hidden')).toBe('false');

    env.restore();
  });

  it('supports the attrs escape hatch (non-obsolete, caller-controlled attributes)', () => {
    const env = installFakeDocument();

    const el = createHr({
      attrs: {
        'data-test': '1',
      },
    }) as unknown as FakeElement;

    expect(el.getAttribute('data-test')).toBe('1');

    env.restore();
  });

  it('rejects inline event handler attributes via attrs (security guard)', () => {
    const env = installFakeDocument();

    expect(() =>
      createHr({
        attrs: {
          onclick: 'alert(1)',
        },
      }),
    ).toThrow(/event handler attributes are blocked/i);

    env.restore();
  });

  it('rejects raw style attribute via attrs (security guard)', () => {
    const env = installFakeDocument();

    expect(() =>
      createHr({
        attrs: {
          style: 'color: red;',
        },
      }),
    ).toThrow(/Unsafe attribute "style" is not allowed/i);

    env.restore();
  });

  it('enhanceHrs is a stable no-op', () => {
    const env = installFakeDocument();

    expect(() => enhanceHrs()).not.toThrow();

    env.restore();
  });
});
