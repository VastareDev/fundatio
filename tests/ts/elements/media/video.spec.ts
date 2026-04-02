import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createVideo, enhanceVideos } from '../../../../src/elements/media/video';

type FakeElement = {
  tagName: string;
  attributes: Map<string, string>;
  getAttribute: (name: string) => string | null;
  setAttribute: (name: string, value: string) => void;

  // minimal reflected properties we care about in tests
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: string;
  poster?: string;
  width?: number;
  height?: number;
  crossOrigin?: string | null;
};

function makeFakeElement(tagName: string): FakeElement {
  const attributes = new Map<string, string>();

  const el: FakeElement = {
    tagName,
    attributes,
    getAttribute: (name: string) => (attributes.has(name) ? attributes.get(name)! : null),
    setAttribute: (name: string, value: string) => {
      attributes.set(name, String(value));
    },
  };

  Object.defineProperties(el, {
    src: {
      get: () => el.getAttribute('src') ?? '',
      set: (v: string) => el.setAttribute('src', String(v)),
      enumerable: true,
    },
    controls: {
      get: () => el.getAttribute('controls') !== null,
      set: (v: boolean) => {
        if (v) el.setAttribute('controls', '');
        else attributes.delete('controls');
      },
      enumerable: true,
    },
    autoplay: {
      get: () => el.getAttribute('autoplay') !== null,
      set: (v: boolean) => {
        if (v) el.setAttribute('autoplay', '');
        else attributes.delete('autoplay');
      },
      enumerable: true,
    },
    loop: {
      get: () => el.getAttribute('loop') !== null,
      set: (v: boolean) => {
        if (v) el.setAttribute('loop', '');
        else attributes.delete('loop');
      },
      enumerable: true,
    },
    muted: {
      get: () => el.getAttribute('muted') !== null,
      set: (v: boolean) => {
        if (v) el.setAttribute('muted', '');
        else attributes.delete('muted');
      },
      enumerable: true,
    },
    preload: {
      get: () => el.getAttribute('preload') ?? '',
      set: (v: string) => el.setAttribute('preload', String(v)),
      enumerable: true,
    },
    poster: {
      get: () => el.getAttribute('poster') ?? '',
      set: (v: string) => el.setAttribute('poster', String(v)),
      enumerable: true,
    },
    width: {
      get: () => {
        const v = el.getAttribute('width');
        return v ? Number(v) : 0;
      },
      set: (v: number) => el.setAttribute('width', String(v)),
      enumerable: true,
    },
    height: {
      get: () => {
        const v = el.getAttribute('height');
        return v ? Number(v) : 0;
      },
      set: (v: number) => el.setAttribute('height', String(v)),
      enumerable: true,
    },
    crossOrigin: {
      get: () => el.getAttribute('crossorigin'),
      set: (v: string | null) => {
        if (v === null) attributes.delete('crossorigin');
        else el.setAttribute('crossorigin', String(v));
      },
      enumerable: true,
    },
  });

  return el;
}

describe('video element', () => {
  const createElementNS = vi.fn();
  let createElement: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    createElementNS.mockReset();

    createElement = vi.fn((tag: string) => makeFakeElement(tag));

    vi.stubGlobal('document', {
      createElement,
      createElementNS,
    });
  });

  it('creates a video element', () => {
    const el = createVideo() as unknown as FakeElement;
    expect(el.tagName).toBe('video');
    expect(createElement).toHaveBeenCalledWith('video');
  });

  it('applies src when provided', () => {
    const el = createVideo(undefined, { src: '/media/test.mp4' }) as unknown as FakeElement;
    expect(el.getAttribute('src')).toBe('/media/test.mp4');
  });

  it('applies controls when provided', () => {
    const el = createVideo(undefined, { controls: true }) as unknown as FakeElement;
    expect(el.getAttribute('controls')).toBe('');
  });

  it('defaults muted when autoplay is enabled and muted is not provided', () => {
    const el = createVideo(undefined, { autoplay: true }) as unknown as FakeElement;
    expect(el.getAttribute('autoplay')).toBe('');
    expect(el.getAttribute('muted')).toBe('');
  });

  it('applies poster and preload when provided', () => {
    const el = createVideo(undefined, { poster: '/img/poster.jpg', preload: 'metadata' }) as unknown as FakeElement;
    expect(el.getAttribute('poster')).toBe('/img/poster.jpg');
    expect(el.getAttribute('preload')).toBe('metadata');
  });

  it('blocks unsafe attributes', () => {
    expect(() =>
      createVideo(undefined, {
        attrs: { onclick: 'alert(1)' },
      }),
    ).toThrow();
  });

  it('does not use createElementNS', () => {
    createVideo();
    expect(createElementNS).not.toHaveBeenCalled();
  });

  it('enhancement is a no-op', () => {
    expect(() => enhanceVideos()).not.toThrow();
  });
});
