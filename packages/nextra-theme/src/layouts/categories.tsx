import type { NextraThemeLayoutProps } from "nextra";
import type { ReactElement } from "react";
import { collectFiles } from "~/utils/collect";
import { InnerLayout } from "./shared/inner-layout-index";
import { ConfigProvider, MdxContext } from "~/contexts";
import { BlogSidebar, NavTabs } from "~/components";
import { useFSRoute } from "nextra/hooks";
import { ThemeConfig } from "..";
import { MobileCategoriesDropdown } from "~/components/categories/mobile-categories-dropdown";

export const CategoriesLayout = ({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement => {
  const fsPath = useFSRoute();
  const baseRoute = fsPath.split("/")[1];

  const posts = collectFiles(context.pageOpts.pageMap, baseRoute);
  const themeConfig = context.themeConfig as ThemeConfig;

  const tabsData =
    themeConfig.sidebar?.tabs &&
    themeConfig.sidebar.tabs.map((tab) => ({
      label: tab.label ?? "",
      route: tab.route ?? "",
      active: tab.route === fsPath,
    }));

  const navTabs = tabsData && <NavTabs tabs={tabsData} />;

  return (
    <ConfigProvider value={context}>
      <MdxContext.Provider value={posts}>
        <InnerLayout
          sidebar={<BlogSidebar tabs={navTabs} route={baseRoute} />}
          mobileCategoriesDropdown={
            <MobileCategoriesDropdown route={baseRoute} />
          }
          {...context.pageOpts}
        >
          <>{children}</>
        </InnerLayout>
      </MdxContext.Provider>
    </ConfigProvider>
  );
};
