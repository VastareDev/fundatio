export type PluginApi = {
  addUtilities: (utilities: Record<string, Record<string, string>>) => void;
  theme: (path: string) => unknown;
};

type TailwindPluginFactory = (handler: (api: PluginApi) => void) => unknown;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function loadTailwindPluginFactory(): Promise<TailwindPluginFactory> {
  let mod: unknown;

  try {
    // Dynamic import keeps Tailwind as an optional peer dependency.
    mod = (await import('tailwindcss/plugin')) as unknown;
  } catch {
    throw new Error('Tailwind is not installed. Install "tailwindcss" to use solTailwindPlugin.');
  }

  // Handle both CJS and ESM default export shapes.
  const candidate: unknown = isRecord(mod) && 'default' in mod ? mod.default : mod;

  if (typeof candidate !== 'function') {
    throw new Error('"tailwindcss/plugin" did not export a plugin factory function as expected.');
  }

  return candidate as TailwindPluginFactory;
}

/**
 * Returns the Sol Tailwind plugin.
 *
 * Note: this is async so Tailwind can remain an optional peer dependency.
 */
export async function solTailwindPlugin(): Promise<unknown> {
  const plugin = await loadTailwindPluginFactory();

  return plugin(({ addUtilities }: PluginApi) => {
    addUtilities({
      '.sol-example': {
        fontSize: '1rem',
      },
    });
  });
}
