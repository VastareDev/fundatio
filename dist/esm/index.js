import { i as w } from "./chunks/index.js";
function t(n) {
  return `rgb(var(${n}) / <alpha-value>)`;
}
function e(n) {
  return `--sol-colour-${n}-rgb`;
}
function r(n) {
  return {
    50: t(e(`${n}-tint-90`)),
    100: t(e(`${n}-tint-80`)),
    200: t(e(`${n}-tint-70`)),
    300: t(e(`${n}-tint-60`)),
    500: t(e(`${n}-base`)),
    600: t(e(`${n}-shade-10`)),
    700: t(e(`${n}-shade-20`)),
    800: t(e(`${n}-shade-30`)),
    900: t(e(`${n}-shade-40`))
  };
}
function l() {
  const n = [
    "grey",
    "blue",
    "indigo",
    "purple",
    "pink",
    "red",
    "orange",
    "yellow",
    "green",
    "teal"
  ], o = {
    // Convenience accessors.
    sol: {
      0: t("--sol-colour-black-rgb"),
      1e3: t("--sol-colour-white-rgb")
    }
  };
  for (const i of n)
    o[i] = r(i);
  return o;
}
const s = {
  theme: {
    extend: {
      colors: l()
    }
  }
};
function a(n) {
  return typeof n == "object" && n !== null;
}
async function u() {
  let n;
  try {
    n = await import("./chunks/sol.js");
  } catch {
    throw new Error('Tailwind is not installed. Install "tailwindcss" to use solTailwindPlugin.');
  }
  const o = a(n) && "default" in n ? n.default : n;
  if (typeof o != "function")
    throw new Error('"tailwindcss/plugin" did not export a plugin factory function as expected.');
  return o;
}
async function c() {
  return (await u())(({ addUtilities: o }) => {
    o({
      ".sol-example": {
        fontSize: "1rem"
      }
    });
  });
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  solTailwindPlugin: c,
  solTailwindPreset: s
}, Symbol.toStringTag, { value: "Module" })), f = "1.0.0";
export {
  w as elements,
  f as solVersion,
  d as tailwind
};
//# sourceMappingURL=index.js.map
