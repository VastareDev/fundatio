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
export declare const solTailwindPreset: SolTailwindPreset;
//# sourceMappingURL=preset.d.ts.map