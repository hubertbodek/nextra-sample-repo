import type { ThemeConfig } from "@acme/nextra-theme";
import { Screenshot } from "~/components/Screenshot/Screenshot";
import { NavLogo } from "./src/components/Logo/NavLogo";

export interface CustomThemeConfig extends Omit<ThemeConfig, "components"> {
  components: {
    Screenshot: typeof Screenshot;
  };
}

export default {
  logo: <NavLogo />, // <- this breaks the website - pageMap is undefined.
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  primaryHue: 53,
  sidebar: {
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },
  components: {
    Screenshot,
  },
} satisfies CustomThemeConfig;
