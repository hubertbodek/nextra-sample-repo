import { NextraThemeLayoutProps } from "nextra";
import { ConfigProvider, MdxContext } from "~/contexts";
import { collectFiles } from "~/utils/collect";
import { InnerLayout } from "./shared/inner-layout-single";
import { ReactElement } from "react";
import { CategoriesSidebar } from "~/components/categories/categories-sidebar";
import { useFSRoute } from "nextra/hooks";
import { NavTabs } from "~/components";
import { ThemeConfig } from "..";

export const CategoriesSingleLayout = ({
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
          sidebar={<CategoriesSidebar route={baseRoute} tabs={navTabs}/>}
          {...context.pageOpts}
        >
          <>{children}</>
        </InnerLayout>
      </MdxContext.Provider>
    </ConfigProvider>
  );
};
