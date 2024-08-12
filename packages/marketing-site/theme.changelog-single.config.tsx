/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { CustomThemeConfig } from "./theme.base.config";
import themeBaseConfig from "./theme.base.config";

export default {
  ...themeBaseConfig,
  // ...
} satisfies CustomThemeConfig;
