import { NextraThemeLayoutProps } from "nextra";
import { ConfigProvider, MdxContext } from "~/contexts";
import { collectFiles } from "~/utils/collect";
import { InnerLayout } from "./shared/inner-layout-single";
import { ReactElement } from "react";
import { ChangeLogSidebar } from "~/components";

export const ChangelogSingleLayout = ({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement => {
  const posts = collectFiles(context.pageOpts.pageMap, "changelog");

  return (
    <ConfigProvider value={context}>
      <MdxContext.Provider value={posts}>
        <InnerLayout sidebar={<ChangeLogSidebar />} {...context.pageOpts}>
          <>{children}</>
        </InnerLayout>
      </MdxContext.Provider>
    </ConfigProvider>
  );
};
