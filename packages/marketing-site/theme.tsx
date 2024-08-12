/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { ChangelogLayout, ChangelogSingleLayout } from "@acme/nextra-theme";
import type { NextraThemeLayoutProps } from "nextra";
import { useFSRoute } from "nextra/hooks";
import themeChangelogSingleConfig from "theme.changelog-single.config";
import themeChangelogConfig from "./theme.changelog.config";

export default function Layout({
  children,
  pageOpts,
  pageProps,
}: Omit<NextraThemeLayoutProps, "themeConfig">) {
  const route = useFSRoute();

  if (route === "/changelog") {
    return (
      <ChangelogLayout
        themeConfig={themeChangelogConfig}
        pageOpts={pageOpts}
        pageProps={pageProps}
      >
        {children}
      </ChangelogLayout>
    );
  }

  return (
    <ChangelogSingleLayout
      themeConfig={themeChangelogSingleConfig}
      pageOpts={pageOpts}
      pageProps={pageProps}
    >
      {children}
    </ChangelogSingleLayout>
  );
}
