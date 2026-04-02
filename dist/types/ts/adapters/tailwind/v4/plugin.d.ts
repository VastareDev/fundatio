export type PluginApi = {
    addUtilities: (utilities: Record<string, Record<string, string>>) => void;
    theme: (path: string) => unknown;
};
/**
 * Returns the Sol Tailwind plugin.
 *
 * Note: this is async so Tailwind can remain an optional peer dependency.
 */
export declare function solTailwindPlugin(): Promise<unknown>;
//# sourceMappingURL=plugin.d.ts.map