import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createAudio, enhanceAudios } from '../../../../src/elements/media/audio';

type FakeElement = {
  tagName: string;
  id: string;
  className: string;
  title: string;
  lang: string;
  dir: string;
  hidden: boolean;
  tabIndex: number;
  draggable: boolean;
  spellcheck: boolean;
  contentEditable: string;
  style: Record<string, unknown>;
  dataset: Record<string, string>;
  // media props
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: string;
  crossOrigin?: string | null;

  setAttribute: (name: string, value: string) => void;
  getAttribute: (name: string) => string | null;
  removeAttribute: (name: string) => void;
  hasAttribute: (name: string) => boolean;
};

function makeFakeElement(tag: string): FakeElement {
  const attrs = new Map<string, string>();

  const el: FakeElement = {
    tagName: tag.toUpperCase(),
    id: '',
    className: '',
    title: '',
    lang: '',
    dir: '',
    hidden: false,
    tabIndex: 0,
    draggable: false,
    spellcheck: false,
    contentEditable: 'inherit',
    style: {},
    dataset: {},

    src: '',
    controls: false,
    autoplay: false,
    loop: false,
    muted: false,
    preload: '',
    crossOrigin: null,

    setAttribute(name, value) {
      attrs.set(String(name), String(value));
    },
    getAttribute(name) {
      return attrs.has(String(name)) ? (attrs.get(String(name)) as string) : null;
    },
    removeAttribute(name) {
      attrs.delete(String(name));
    },
    hasAttribute(name) {
      return attrs.has(String(name));
    },
  };

  return el;
}

let originalDocument: unknown;

function installDocumentMock(): void {
  originalDocument = (globalThis as any).document;

  (globalThis as any).document = {
    createElement: vi.fn((tag: string) => makeFakeElement(tag)),
    createElementNS: vi.fn(),
  };
}

function restoreDocumentMock(): void {
  (globalThis as any).document = originalDocument;
}

beforeAll(() => installDocumentMock());
afterAll(() => restoreDocumentMock());

describe('audio element', () => {
  it('creates an audio element', () => {
    const el = createAudio() as unknown as FakeElement;
    expect(el.tagName.toLowerCase()).toBe('audio');
  });

  it('applies global attributes', () => {
    const el = createAudio({
      id: 'intro-audio',
      className: 'player',
      title: 'Intro track',
      lang: 'en',
      dir: 'ltr',
      aria: { label: 'Intro audio' },
    }) as unknown as FakeElement;

    expect(el.id).toBe('intro-audio');
    expect(el.className).toBe('player');
    expect(el.title).toBe('Intro track');
    expect(el.lang).toBe('en');
    expect(el.dir).toBe('ltr');
    expect(el.getAttribute('aria-label')).toBe('Intro audio');
  });

  it('sets media attributes', () => {
    const el = createAudio({
      src: '/audio/intro.mp3',
      controls: true,
      loop: true,
      preload: 'metadata',
      crossOrigin: 'anonymous',
      controlsList: ['nodownload', 'noremoteplayback'],
      disableRemotePlayback: true,
    }) as unknown as FakeElement;

    expect(el.src).toBe('/audio/intro.mp3');
    expect(el.controls).toBe(true);
    expect(el.loop).toBe(true);
    expect(el.preload).toBe('metadata');
    expect(el.crossOrigin).toBe('anonymous');
    expect(el.getAttribute('controlslist')).toBe('nodownload noremoteplayback');
    expect(el.hasAttribute('disableremoteplayback')).toBe(true);
  });

  it('defaults muted when autoplay is enabled and muted is not specified', () => {
    const el = createAudio({ autoplay: true }) as unknown as FakeElement;
    expect(el.autoplay).toBe(true);
    expect(el.muted).toBe(true);
  });

  it('does not override explicit muted when autoplay is enabled', () => {
    const el = createAudio({ autoplay: true, muted: false }) as unknown as FakeElement;
    expect(el.autoplay).toBe(true);
    expect(el.muted).toBe(false);
  });

  it('blocks unsafe attributes via global attrs escape hatch', () => {
    expect(() =>
      createAudio({
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    const nsSpy = vi.spyOn(document, 'createElementNS');
    createAudio();
    expect(nsSpy).not.toHaveBeenCalled();
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceAudios(document as unknown as ParentNode)).not.toThrow();
  });
});
