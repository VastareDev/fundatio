declare module 'tailwindcss/plugin' {
  export type CssValue = string | number;
  export type CssObject = { [key: string]: CssValue | CssObject };

  export type PluginApi = {
    addUtilities: (utilities: Record<string, CssObject>, options?: unknown) => void;
    addComponents: (components: Record<string, CssObject>, options?: unknown) => void;

    // Tailwind exposes more, but we only type what we need.
    theme: (path: string, defaultValue?: unknown) => unknown;
    config?: (path: string, defaultValue?: unknown) => unknown;
    e?: (className: string) => string;
    prefix?: (className: string) => string;
  };

  export type PluginHandler = (api: PluginApi) => void;

  export default function plugin(handler: PluginHandler, config?: unknown): unknown;
}
