import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./fundatio.vitepress.css";
import "../../styles/fundatio.scss";

export default {
  extends: DefaultTheme,
} satisfies Theme;
