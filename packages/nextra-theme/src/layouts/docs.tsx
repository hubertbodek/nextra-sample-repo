import { useRouter } from "next/router";
import type { Heading, NextraThemeLayoutProps, PageOpts } from "nextra";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import "focus-visible";
import cn from "clsx";
import { useFSRoute, useMounted } from "nextra/hooks";
import { MDXProvider } from "nextra/mdx";
import "~/polyfill";
import {
  normalizePages,
  type Item,
  type PageItem,
  type PageTheme,
} from "nextra/normalize-pages";
import {
  Banner,
  Breadcrumb,
  Head,
  MobileNavigation,
  NavTabs,
  Search,
  Sidebar,
  SkipNavContent,
} from "~/components";
import { DEFAULT_LOCALE } from "~/constants";
import { ActiveAnchorProvider, ConfigProvider, useConfig } from "~/contexts";
import { getComponents } from "~/mdx-components";
import { renderComponent } from "~/utils";

interface BodyProps {
  themeContext: PageTheme;
  breadcrumb: ReactNode;
  docsDirectories: PageItem[];
  flatDirectories: Item[];
  fullDirectories: Item[];
  timestamp?: number;
  navigation: ReactNode;
  children: ReactNode;
  headings: Heading[];
  navTabs?: ReactNode;
}

const classes = {
  toc: cn(
    "nx-order-last nx-hidden nx-w-[250px] nx-shrink-0 xl:nx-block print:nx-hidden",
  ),
  main: cn("nx-w-full nx-break-words"),
};

const Body = ({
  themeContext,
  breadcrumb,
  docsDirectories,
  flatDirectories,
  fullDirectories,
  timestamp,
  navigation,
  children,
  headings,
  navTabs,
}: BodyProps): ReactElement => {
  const config = useConfig();
  const mounted = useMounted();

  if (themeContext.layout === "raw") {
    return <div className={classes.main}>{children}</div>;
  }

  const date =
    themeContext.timestamp && config.gitTimestamp && timestamp
      ? new Date(timestamp)
      : null;

  const gitTimestampEl =
    // Because a user's time zone may be different from the server page
    mounted && date ? (
      <div className="nx-mt-12 nx-mb-8 nx-block nx-text-xs nx-text-gray-500 ltr:nx-text-right rtl:nx-text-left dark:nx-text-gray-400">
        {renderComponent(config.gitTimestamp, { timestamp: date })}
      </div>
    ) : (
      <div className="nx-mt-16" />
    );

  const content = (
    <>
      {children}
      {gitTimestampEl}
      {navigation}
    </>
  );

  const body = config.main?.({ children: content }) || content;

  if (themeContext.layout === "full") {
    return (
      <article
        className={cn(
          classes.main,
          `nx-min-w-0`,
          "nextra-content nx-min-h-[calc(100vh-var(--nextra-navbar-height))]",
          themeContext.sidebar && "lg:md:nx-px-16",
          themeContext.toc && "xl:nx-pr-10",
        )}
      >
        <div className="nx-flex nx-flex-col nx-gap-2 lg:nx-hidden nx-mb-8">
          {navTabs}
          <Search />
          <MobileNavigation
            docsDirectories={docsDirectories}
            flatDirectories={flatDirectories}
            fullDirectories={fullDirectories}
            headings={headings}
            asPopover={false}
            includePlaceholder={false}
          />
        </div>
        {body}
      </article>
    );
  }

  return (
    <article
      className={cn(
        classes.main,
        "nextra-content nx-flex nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-min-w-0 nx-justify-center nx-pb-0 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]",
        themeContext.typesetting === "article" &&
          "nextra-body-typesetting-article",
      )}
    >
      <main
        className={cn(
          "nextra-body nx-w-full nx-min-w-0 pt-10 lg:md:nx-pl-20",
          themeContext.sidebar && "lg:md:nx-pl-20",
          themeContext.toc && "xl:nx-pr-10",
        )}
      >
        <div className="nx-flex nx-flex-col nx-gap-2 lg:nx-hidden nx-mb-8">
          {navTabs}
          <Search />
          <div>
            <MobileNavigation
              docsDirectories={docsDirectories}
              flatDirectories={flatDirectories}
              fullDirectories={fullDirectories}
              headings={headings}
              asPopover={false}
              includePlaceholder={themeContext.layout === "default"}
            />
          </div>
        </div>
        {breadcrumb}
        {body}
      </main>
    </article>
  );
};

const InnerLayoutDocs = ({
  filePath,
  pageMap,
  frontMatter,
  headings,
  timestamp,
  children,
}: PageOpts & { children: ReactNode }): ReactElement => {
  const config = useConfig();
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

  const {
    activeType,
    activeThemeContext,
    activePath,
    topLevelNavbarItems,
    docsDirectories,
    flatDirectories,
    directories,
  } = useMemo(() => {
    const pages = normalizePages({
      list: pageMap,
      locale,
      defaultLocale,
      route: fsPath,
    });

    return pages;
  }, [pageMap, locale, defaultLocale, fsPath]);

  const themeContext = { ...activeThemeContext, ...frontMatter };

  const hideSidebar =
    !themeContext.sidebar ||
    themeContext.layout === "raw" ||
    activeType === "page";
  const tocEl =
    !themeContext.toc || activeType === "page" ? (
      themeContext.layout === "raw" || themeContext.layout === "full" ? null : (
        <nav className={classes.toc} aria-label="table of contents" />
      )
    ) : (
      <nav className={cn(classes.toc)} aria-label="table of contents">
        {renderComponent(config.toc.component, {
          headings: config.toc.float ? headings : [],
          filePath,
        })}
      </nav>
    );

  const localeConfig = config.i18n.find((l) => l.locale === locale);
  const isRTL = localeConfig
    ? localeConfig.direction === "rtl"
    : config.direction === "rtl";

  const direction = isRTL ? "rtl" : "ltr";

  const tabsData =
    config.sidebar.tabs &&
    config.sidebar.tabs.map((tab) => ({
      ...tab,
      active: tab.route === fsPath,
    }));

  const navTabs = tabsData && <NavTabs tabs={tabsData} />;

  return (
    // This makes sure that selectors like `[dir=ltr] .nextra-container` work
    // before hydration as Tailwind expects the `dir` attribute to exist on the
    // `html` element.
    <div dir={direction}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('dir','${direction}')`,
        }}
      />
      <Head />
      <Banner />
      {themeContext.navbar &&
        renderComponent(config.navbar.component, {
          flatDirectories,
          items: topLevelNavbarItems,
        })}
      <div
        className={cn(
          "nx-mx-auto nx-flex",
          themeContext.layout !== "raw" &&
            "nx-max-w-screen-2xl sm:px-6 mx-auto box-content",
        )}
      >
        <ActiveAnchorProvider>
          {hideSidebar ? null : (
            <Sidebar
              docsDirectories={docsDirectories}
              flatDirectories={flatDirectories}
              fullDirectories={directories}
              headings={headings}
              asPopover={hideSidebar}
              includePlaceholder={themeContext.layout === "default"}
              navTabs={navTabs}
            />
          )}
          {tocEl}
          <SkipNavContent />
          {config.aiButton && renderComponent(config.aiButton.component)}
          <Body
            docsDirectories={docsDirectories}
            flatDirectories={flatDirectories}
            fullDirectories={directories}
            headings={headings}
            themeContext={themeContext}
            breadcrumb={
              activeType !== "page" && themeContext.breadcrumb ? (
                <Breadcrumb activePath={activePath} />
              ) : null
            }
            timestamp={timestamp}
            navigation={null}
            navTabs={navTabs}
          >
            <MDXProvider
              components={getComponents({
                isRawLayout: themeContext.layout === "raw",
                components: config.components,
              })}
            >
              {children}
            </MDXProvider>
          </Body>
        </ActiveAnchorProvider>
      </div>
      {themeContext.footer &&
        renderComponent(config.footer.component, { menu: hideSidebar })}
    </div>
  );
};

export const DocsLayout = ({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement => {
  return (
    <ConfigProvider value={context}>
      <InnerLayoutDocs {...context.pageOpts}>{children}</InnerLayoutDocs>
    </ConfigProvider>
  );
};
