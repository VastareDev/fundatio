import { describe, expect, it } from 'vitest';
import {
  createStrong,
  enhanceStrongs,
  STRONG_TAG,
} from '../../../../src/elements/inline/strong';

/**
 * Minimal fake element used for Fundatio DOM helper tests.
 *
 * @remarks
 * Fundatio test suites run in a Node environment without jsdom/happy-dom. This fake
 * element implements only what Fundatio needs: attribute setting, a few reflected
 * properties, and `style`/`dataset`.
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
  public textContent: string | null = null;

  public style: Record<string, string> = {};
  public dataset: Record<string, string> = {};

  private attrs = new Map<string, string>();

  public constructor(tagName: string) {
    this.tagName = tagName;
  }

  public setAttribute(name: string, value: string): void {
    this.attrs.set(String(name), String(value));
  }

  public getAttribute(name: string): string | null {
    const v = this.attrs.get(String(name));
    return typeof v === 'string' ? v : null;
  }
}

/**
 * Install a fake `document` for deterministic tests.
 *
 * @returns Call-tracking handles for assertions.
 */
function installFakeDocument(): {
  created: string[];
  createdNS: Array<{ ns: string; tag: string }>;
  restore: () => void;
} {
  const created: string[] = [];
  const createdNS: Array<{ ns: string; tag: string }> = [];

  const prev = (globalThis as unknown as { document?: unknown }).document;

  (globalThis as unknown as { document: unknown }).document = {
    createElement: (tag: string) => {
      created.push(tag);
      return new FakeElement(tag) as unknown as HTMLElement;
    },
    createElementNS: (ns: string, tag: string) => {
      createdNS.push({ ns, tag });
      return new FakeElement(tag) as unknown as HTMLElement;
    },
  };

  return {
    created,
    createdNS,
    restore: () => {
      (globalThis as unknown as { document?: unknown }).document = prev;
    },
  };
}

describe('elements/inline/strong', () => {
  it('creates a <strong> using document.createElement (not createElementNS)', () => {
    const doc = installFakeDocument();

    try {
      const el = createStrong();

      expect(doc.created).toEqual([STRONG_TAG]);
      expect(doc.createdNS).toEqual([]);

      expect((el as unknown as FakeElement).tagName).toBe(STRONG_TAG);
    } finally {
      doc.restore();
    }
  });

  it('assigns text via textContent', () => {
    const doc = installFakeDocument();

    try {
      const el = createStrong('Important');

      expect(doc.created).toEqual([STRONG_TAG]);
      expect((el as unknown as FakeElement).textContent).toBe('Important');
    } finally {
      doc.restore();
    }
  });

  it('applies global attributes (id, className, lang, dir, title, booleans)', () => {
    const doc = installFakeDocument();

    try {
      const el = createStrong('x', {
        id: 'strong-1',
        className: 'important',
        lang: 'en',
        dir: 'ltr',
        title: 'Tooltip',
        hidden: true,
        tabIndex: 1,
        draggable: true,
        spellCheck: true,
        contentEditable: 'plaintext-only',
      });

      expect(doc.created).toEqual([STRONG_TAG]);

      const fe = el as unknown as FakeElement;
      expect(fe.id).toBe('strong-1');
      expect(fe.className).toBe('important');
      expect(fe.lang).toBe('en');
      expect(fe.dir).toBe('ltr');
      expect(fe.title).toBe('Tooltip');
      expect(fe.hidden).toBe(true);
      expect(fe.tabIndex).toBe(1);
      expect(fe.draggable).toBe(true);
      expect(fe.spellcheck).toBe(true);
      expect(fe.contentEditable).toBe('plaintext-only');
    } finally {
      doc.restore();
    }
  });

  it('maps structured ARIA into aria-* attributes', () => {
    const doc = installFakeDocument();

    try {
      const el = createStrong(undefined, {
        aria: {
          label: 'Important text',
          labelledby: 'heading-1',
          hidden: true,
        },
      });

      const fe = el as unknown as FakeElement;
      expect(fe.getAttribute('aria-label')).toBe('Important text');
      expect(fe.getAttribute('aria-labelledby')).toBe('heading-1');
      expect(fe.getAttribute('aria-hidden')).toBe('true');
    } finally {
      doc.restore();
    }
  });

  it('supports dataset and style via safe object bags', () => {
    const doc = installFakeDocument();

    try {
      const el = createStrong('x', {
        dataset: { trackingId: '123' },
        style: { fontWeight: '700' } as Partial<CSSStyleDeclaration>,
      });

      const fe = el as unknown as FakeElement;
      expect(fe.dataset.trackingId).toBe('123');
      expect(fe.style.fontWeight).toBe('700');
    } finally {
      doc.restore();
    }
  });

  it('rejects unsafe attribute escape hatches (on* and raw style)', () => {
    const doc = installFakeDocument();

    try {
      expect(() =>
        createStrong('x', {
          attrs: { onclick: 'alert(1)' },
        }),
      ).toThrow(/event handler/i);

      expect(() =>
        createStrong('x', {
          attrs: { STYLE: 'font-weight: bold' },
        }),
      ).toThrow(/style/i);
    } finally {
      doc.restore();
    }
  });

  it('enhancement hook is stable (no-op in v1.0.0)', () => {
    const doc = installFakeDocument();

    try {
      expect(() => enhanceStrongs()).not.toThrow();
    } finally {
      doc.restore();
    }
  });
});
