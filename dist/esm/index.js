import { i as w } from "./chunks/index.js";
function t(n) {
  return `rgb(var(${n}) / <alpha-value>)`;
}
function e(n) {
  return `--Fundatio-colour-${n}-rgb`;
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
function a() {
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
  ], i = {
    // Convenience accessors.
    Fundatio: {
      0: t("--Fundatio-colour-black-rgb"),
      1e3: t("--Fundatio-colour-white-rgb")
    }
  };
  for (const o of n)
    i[o] = r(o);
  return i;
}
const l = {
  theme: {
    extend: {
      colors: a()
    }
  }
};
function s(n) {
  return typeof n == "object" && n !== null;
}
async function u() {
  let n;
  try {
    n = await import("./chunks/fundatio.js");
  } catch {
    throw new Error('Tailwind is not installed. Install "tailwindcss" to use solTailwindPlugin.');
  }
  const i = s(n) && "default" in n ? n.default : n;
  if (typeof i != "function")
    throw new Error('"tailwindcss/plugin" did not export a plugin factory function as expected.');
  return i;
}
async function d() {
  return (await u())(({ addUtilities: i }) => {
    i({
      ".Fundatio-example": {
        fontSize: "1rem"
      }
    });
  });
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  solTailwindPlugin: d,
  solTailwindPreset: l
}, Symbol.toStringTag, { value: "Module" })), f = "1.0.1";
export {
  w as elements,
  f as fundatioVersion,
  c as tailwind
};
//# sourceMappingURL=index.js.map
