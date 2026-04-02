import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./sol.vitepress.css";
import "../../styles/sol.scss";

export default {
  extends: DefaultTheme,
} satisfies Theme;
