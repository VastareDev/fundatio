import { describe, expect, it } from 'vitest';

import { tailwind } from '../../../../../src';

describe('tailwind preset', () => {
  it('exports a preset object', () => {
    expect(typeof tailwind.solTailwindPreset).toBe('object');
  });

  it('maps Fundatio colour variables into Tailwind colour scales', () => {
    const preset = tailwind.solTailwindPreset as any;
    const colours = preset?.theme?.extend?.colors;

    expect(colours).toBeTruthy();
    expect(colours.blue['500']).toContain('--Fundatio-colour-blue-base-rgb');
    expect(colours.red['50']).toContain('--Fundatio-colour-red-tint-90-rgb');
    expect(colours.grey['900']).toContain('--Fundatio-colour-grey-shade-40-rgb');
  });
});
