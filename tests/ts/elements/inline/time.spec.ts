import { describe, expect, it } from 'vitest';
import { createTime, TIME_SELECTOR, TIME_TAG } from '../../../../src/elements/inline/time';

class FakeElement {
  public tagName: string;
  public id = '';
  public className = '';
  public title = '';
  public lang = '';
  public dir = '';
  public hidden = false;
  public tabIndex = -1;
  public draggable = false;
  public spellcheck = false;
  public contentEditable = 'inherit';
  public style: Record<string, unknown> = {};
  public dataset: Record<string, string> = {};
  public attributes: Record<string, string> = {};
  public textContent: string | null = null;

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, value: string): void {
    this.attributes[name] = value;
  }

  getAttribute(name: string): string | null {
    return Object.prototype.hasOwnProperty.call(this.attributes, name)
      ? this.attributes[name]
      : null;
  }
}

class FakeDocument {
  createElement(tag: string): FakeElement {
    return new FakeElement(tag);
  }
}

describe('inline/time', () => {
  it('exports the correct tag and selector constants', () => {
    expect(TIME_TAG).toBe('time');
    expect(TIME_SELECTOR).toBe('time');
  });

  it('creates a <time> element with textContent', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createTime('2026-02-25');

    expect(el.tagName).toBe('TIME');
    expect(el.textContent).toBe('2026-02-25');

    globalThis.document = prev;
  });

  it('applies global attributes safely', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createTime('Now', {
      id: 't1',
      className: 'stamp',
      title: 'Timestamp',
      lang: 'en',
      dir: 'ltr',
      hidden: true,
      tabIndex: 0,
      draggable: true,
      spellCheck: true,
      translate: 'no',
      contentEditable: 'false',
      dataset: { trackingId: '123' },
      aria: { label: 'Time label' },
      attrs: { 'data-extra': 'ok' },
    });

    expect(el.id).toBe('t1');
    expect(el.className).toBe('stamp');
    expect(el.title).toBe('Timestamp');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.hidden).toBe(true);
    expect(el.tabIndex).toBe(0);
    expect(el.draggable).toBe(true);
    expect(el.spellcheck).toBe(true);
    expect(el.contentEditable).toBe('false');
    expect(el.dataset.trackingId).toBe('123');
    expect(el.getAttribute('aria-label')).toBe('Time label');
    expect(el.getAttribute('data-extra')).toBe('ok');
    expect(el.getAttribute('translate')).toBe('no');

    globalThis.document = prev;
  });

  it('sets the datetime attribute when provided as a string', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const el = createTime('Yesterday', { datetime: '2026-02-24' });
    expect(el.getAttribute('datetime')).toBe('2026-02-24');

    globalThis.document = prev;
  });

  it('sets the datetime attribute when provided as a Date', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    const d = new Date('2026-02-25T12:34:56.000Z');
    const el = createTime('Today', { datetime: d });
    expect(el.getAttribute('datetime')).toBe(d.toISOString());

    globalThis.document = prev;
  });

  it('blocks inline event handler attributes via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() =>
      createTime('Bad', {
        // @ts-expect-error - intentionally unsafe
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow(/event handler/i);

    globalThis.document = prev;
  });

  it('blocks raw style attribute via attrs', () => {
    const prev = globalThis.document;
    // @ts-expect-error - test double
    globalThis.document = new FakeDocument();

    expect(() =>
      createTime('Bad', {
        // @ts-expect-error - intentionally unsafe
        attrs: { style: 'color:red' },
      }),
    ).toThrow(/style/i);

    globalThis.document = prev;
  });
});
