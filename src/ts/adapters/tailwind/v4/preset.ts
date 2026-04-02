/**
 * Fundatio Tailwind preset.
 *
 * This intentionally:
 * - does NOT import Tailwind at runtime (so it can be used as a plain object)
 * - maps Fundatio CSS variables to Tailwind theme tokens
 */

export type SolTailwindPreset = {
  theme?: Record<string, unknown>;
};

type TailwindColours = Record<string, Record<string, string>>;

function rgbaVar(varName: string): string {
  // Tailwind supports the <alpha-value> placeholder for arbitrary alpha.
  return `rgb(var(${varName}) / <alpha-value>)`;
}

function solColourVarRgb(token: string): string {
  return `--Fundatio-colour-${token}-rgb`;
}

function makeSolColourScale(colourName: string): Record<string, string> {
  // Fundatio defines: tint-90/80/70/60 + base + shade-10/20/30/40.
  // Map to Tailwind's 50..900 scale.
  return {
    '50': rgbaVar(solColourVarRgb(`${colourName}-tint-90`)),
    '100': rgbaVar(solColourVarRgb(`${colourName}-tint-80`)),
    '200': rgbaVar(solColourVarRgb(`${colourName}-tint-70`)),
    '300': rgbaVar(solColourVarRgb(`${colourName}-tint-60`)),
    '500': rgbaVar(solColourVarRgb(`${colourName}-base`)),
    '600': rgbaVar(solColourVarRgb(`${colourName}-shade-10`)),
    '700': rgbaVar(solColourVarRgb(`${colourName}-shade-20`)),
    '800': rgbaVar(solColourVarRgb(`${colourName}-shade-30`)),
    '900': rgbaVar(solColourVarRgb(`${colourName}-shade-40`)),
  };
}

function makeSolColours(): TailwindColours {
  const names = [
    'grey',
    'blue',
    'indigo',
    'purple',
    'pink',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
  ];

  const colours: TailwindColours = {
    // Convenience accessors.
    Fundatio: {
      '0': rgbaVar('--Fundatio-colour-black-rgb'),
      '1000': rgbaVar('--Fundatio-colour-white-rgb'),
    },
  };

  for (const name of names) {
    colours[name] = makeSolColourScale(name);
  }

  return colours;
}

export const solTailwindPreset: SolTailwindPreset = {
  theme: {
    extend: {
      colors: makeSolColours(),
    },
  },
};
