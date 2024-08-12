import { useRouter } from "next/router";
import type { Heading, PageOpts } from "nextra";
import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import "focus-visible";
import cn from "clsx";
import { useFSRoute, useMounted } from "nextra/hooks";
import { MDXProvider } from "nextra/mdx";
import "~/polyfill";
import type { Item, PageItem, PageTheme } from "nextra/normalize-pages";
import { normalizePages } from "nextra/normalize-pages";
import { Banner, Breadcrumb, Head, Search, SkipNavContent } from "~/components";
import { DEFAULT_LOCALE } from "~/constants";
import { ActiveAnchorProvider, useConfig } from "~/contexts";
import { renderComponent } from "~/utils";
import { getComponents } from "~/mdx-components";

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
  mobileCategoriesDropdown: ReactNode;
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
  flatDirectories,
  timestamp,
  navigation,
  mobileCategoriesDropdown,
  children,
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
          "nx-pb-[70px] lg:nx-pb-[120px] nx-py-20 mx-auto relative px-16 !nx-max-w-screen-lg",
          "nextra-content nx-min-h-[calc(100vh-var(--nextra-navbar-height))]",
          themeContext.sidebar && "max-lg:!nx-px-4 lg:md:nx-px-16",
          // themeContext.toc && 'xl:nx-pr-10',
        )}
      >
        <div className="nx-flex nx-flex-col nx-gap-2 lg:nx-hidden nx-mb-8">
          {mobileCategoriesDropdown}
        </div>
        {body}
      </article>
    );
  }

  return (
    <article
      className={cn(
        classes.main,
        " nextra-content nx-flex nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-min-w-0 nx-justify-center nx-pb-0 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]",
        themeContext.typesetting === "article" &&
          "nextra-body-typesetting-article",
      )}
    >
      <main
        className={cn(
          "nextra-body nx-w-full nx-min-w-0 lg:md:nx-px-16 nx-pb-[70px] lg:nx-pb-[120px] nx-py-20 !nx-max-w-screen-lg",
          themeContext.sidebar && "lg:md:nx-px-16 max-lg:!nx-px-4",
          // themeContext.toc && 'xl:nx-pr-10'
        )}
      >
        <div className="nx-flex nx-flex-col nx-gap-2 lg:nx-hidden nx-mb-8">
          {mobileCategoriesDropdown}
        </div>
        {breadcrumb}
        {body}
      </main>
    </article>
  );
};

interface InnerLayoutProps extends PageOpts {
  children: ReactNode;
  sidebar: ReactNode;
  mobileCategoriesDropdown: ReactNode;
}

export const InnerLayout = ({
  // filePath,
  pageMap,
  frontMatter,
  headings,
  timestamp,
  children,
  sidebar,
  mobileCategoriesDropdown,
}: InnerLayoutProps): ReactElement => {
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
  } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath,
      }),
    [pageMap, locale, defaultLocale, fsPath],
  );

  const themeContext = { ...activeThemeContext, ...frontMatter };

  const hideSidebar =
    !themeContext.sidebar ||
    themeContext.layout === "raw" ||
    activeType === "page";
  // const tocEl =
  //   !themeContext.toc ||
  //   activeType === 'page'
  //    ? themeContext.layout === 'raw' || themeContext.layout === 'full'
  //    ? null
  //    : <nav className={classes.toc} aria-label="table of contents" />
  //    : (
  //     <nav
  //       className={cn(classes.toc)}
  //       aria-label="table of contents"
  //     >
  //       {renderComponent(config.toc.component, {
  //         headings: config.toc.float ? headings : [],
  //         filePath
  //       })}
  //     </nav>
  //   );
  //

  // cant disable inside _meta.json because of dynamic paths /categories/[category].mdx
  const tocEl = null;

  const localeConfig = config.i18n.find((l) => l.locale === locale);
  const isRTL = localeConfig
    ? localeConfig.direction === "rtl"
    : config.direction === "rtl";

  const direction = isRTL ? "rtl" : "ltr";

  return (
    // This makes sure that selectors like `[dir=ltr] .nextra-container` work
    // before hydration as Tailwind expects the `dir` attribute to exist on the
    // `html` element.
    <div dir={direction} className="bg-black">
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
          "nx-relative -nx-mx-auto nx-flex ",
          themeContext.layout !== "raw" && "mx-auto box-content",
        )}
      >
        <ActiveAnchorProvider>
          {hideSidebar ? null : sidebar}
          {tocEl}
          <SkipNavContent />
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
            mobileCategoriesDropdown={mobileCategoriesDropdown}
          >
            <MDXProvider
              components={getComponents({
                isRawLayout: themeContext.layout === "raw",
                components: config.components,
              })}
            >
              {config.beforeContent &&
                renderComponent(config.beforeContent.component)}
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
