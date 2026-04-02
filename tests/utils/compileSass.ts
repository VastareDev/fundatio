import { fileURLToPath } from "node:url";
import path from "node:path";
import * as sass from "sass";

type CompileSassOptions = {
  loadPath?: string[];
};

export function compileSass(source: string, options: CompileSassOptions = {}) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const repoRoot = path.resolve(__dirname, "..", "..");

  const defaultLoadPaths = [
    repoRoot,
    path.join(repoRoot, "src", "scss"),
    path.join(repoRoot, "node_modules"),
  ];

  const loadPaths = [...defaultLoadPaths, ...(options.loadPath ?? [])];

  const result = sass.compileString(source, {
    loadPaths,
    style: "expanded",
    quietDeps: true,
    silenceDeprecations: ["color-4-api"]
  });

  return {
    css: result.css.toString(),
    loadedUrls: result.loadedUrls?.map((u) => u.toString()) ?? []
  }
}
