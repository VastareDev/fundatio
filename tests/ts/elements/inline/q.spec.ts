import { describe, expect, it } from 'vitest';
import { createQ, enhanceQs, Q_TAG } from '../../../../src/elements/inline/q';

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

describe('elements/inline/q', () => {
  it('creates a <q> using document.createElement (not createElementNS)', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ();

      expect(doc.created).toEqual([Q_TAG]);
      expect(doc.createdNS).toEqual([]);

      expect((el as unknown as FakeElement).tagName).toBe(Q_TAG);
    } finally {
      doc.restore();
    }
  });

  it('assigns text via textContent', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ('Hello.');

      expect(doc.created).toEqual([Q_TAG]);
      expect((el as unknown as FakeElement).textContent).toBe('Hello.');
    } finally {
      doc.restore();
    }
  });

  it('applies the cite attribute when provided', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ('Quote', { cite: 'https://example.com/source' });

      const fe = el as unknown as FakeElement;
      expect(fe.getAttribute('cite')).toBe('https://example.com/source');
    } finally {
      doc.restore();
    }
  });

  it('does not override cite when attrs.attrs already provides it', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ('Quote', {
        cite: 'https://example.com/should-not-win',
        attrs: { cite: 'https://example.com/wins' },
      });

      const fe = el as unknown as FakeElement;
      expect(fe.getAttribute('cite')).toBe('https://example.com/wins');
    } finally {
      doc.restore();
    }
  });

  it('applies global attributes (id, className, lang, dir, title, booleans)', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ('x', {
        id: 'q-1',
        className: 'quote',
        lang: 'en',
        dir: 'ltr',
        title: 'Inline quote',
        hidden: true,
        tabIndex: 1,
        draggable: true,
        spellCheck: true,
        contentEditable: 'plaintext-only',
      });

      expect(doc.created).toEqual([Q_TAG]);

      const fe = el as unknown as FakeElement;
      expect(fe.id).toBe('q-1');
      expect(fe.className).toBe('quote');
      expect(fe.lang).toBe('en');
      expect(fe.dir).toBe('ltr');
      expect(fe.title).toBe('Inline quote');
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
      const el = createQ(undefined, {
        aria: {
          label: 'Inline quotation',
          labelledby: 'heading-1',
          hidden: true,
        },
      });

      const fe = el as unknown as FakeElement;
      expect(fe.getAttribute('aria-label')).toBe('Inline quotation');
      expect(fe.getAttribute('aria-labelledby')).toBe('heading-1');
      expect(fe.getAttribute('aria-hidden')).toBe('true');
    } finally {
      doc.restore();
    }
  });

  it('supports dataset and style via safe object bags', () => {
    const doc = installFakeDocument();

    try {
      const el = createQ('x', {
        dataset: { trackingId: '123' },
        style: { fontStyle: 'italic' } as Partial<CSSStyleDeclaration>,
      });

      const fe = el as unknown as FakeElement;
      expect(fe.dataset.trackingId).toBe('123');
      expect(fe.style.fontStyle).toBe('italic');
    } finally {
      doc.restore();
    }
  });

  it('rejects unsafe attribute escape hatches (on* and raw style)', () => {
    const doc = installFakeDocument();

    try {
      expect(() =>
        createQ('x', {
          attrs: { onclick: 'alert(1)' },
        }),
      ).toThrow(/event handler/i);

      expect(() =>
        createQ('x', {
          attrs: { STYLE: 'color: red' },
        }),
      ).toThrow(/style/i);
    } finally {
      doc.restore();
    }
  });

  it('enhancement hook is stable (no-op in v1.0.0)', () => {
    const doc = installFakeDocument();

    try {
      expect(() => enhanceQs()).not.toThrow();
    } finally {
      doc.restore();
    }
  });
});
