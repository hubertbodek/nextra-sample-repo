import type { NextraThemeLayoutProps } from "nextra";
import type { ReactElement } from "react";
import { collectFiles } from "~/utils/collect";
import { InnerLayout } from "./shared/inner-layout-index";
import { ConfigProvider, MdxContext } from "~/contexts";

import {
  ChangeLogSidebar,
  ChangelogMobileCategoriesDropdown,
} from "~/components";

export const ChangelogLayout = ({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement => {
  const posts = collectFiles(context.pageOpts.pageMap, "changelog");

  return (
    <ConfigProvider value={context}>
      <MdxContext.Provider value={posts}>
        <InnerLayout
          sidebar={<ChangeLogSidebar />}
          mobileCategoriesDropdown={<ChangelogMobileCategoriesDropdown />}
          {...context.pageOpts}
        >
          <>{children}</>
        </InnerLayout>
      </MdxContext.Provider>
    </ConfigProvider>
  );
};
