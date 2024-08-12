import { useRouter } from "next/router";
import type { NextraThemeLayoutProps, PageOpts } from "nextra";
import type { ReactElement, ReactNode } from "react";
import { useMemo } from "react";
import "focus-visible";
import { useFSRoute } from "nextra/hooks";
import { MDXProvider } from "nextra/mdx";
import "~/polyfill";
import { normalizePages } from "nextra/normalize-pages";
import { Banner, Head, Search, SkipNavContent } from "~/components";
import { DEFAULT_LOCALE } from "~/constants";
import { ActiveAnchorProvider, ConfigProvider, useConfig } from "~/contexts";
import { getComponents } from "~/mdx-components";
import { renderComponent } from "~/utils";

interface BodyProps {
  children: ReactNode;
}

const Body = ({ children }: BodyProps): ReactElement => (
  <article className="nx-w-full nx-break-words nextra-content nx-flex nx-min-h-[calc(100vh-var(--nextra-navbar-height))] nx-min-w-0 nx-justify-center nx-pb-0 nx-pr-[calc(env(safe-area-inset-right)-1.5rem)]">
    <main className="nextra-body nx-w-full nx-min-w-0 lg:md:nx-pl-20 nx-pb-[70px] lg:nx-pb-[120px]">
      <div className="nx-flex nx-flex-col nx-gap-2 lg:nx-hidden nx-mb-8">
        <Search />
      </div>
      {children}
    </main>
  </article>
);

const InnerLayout = ({
  filePath,
  pageMap,
  frontMatter,
  headings,
  children,
}: PageOpts & { children: ReactNode }): ReactElement => {
  const config = useConfig();
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();

  const { activeThemeContext, topLevelNavbarItems, flatDirectories } = useMemo(
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

  const tocEl = (
    <nav
      aria-label="table of contents"
      className="nextra-bottom-gradient no-scrollbar nx-sticky nx-top-[84px] nx-overflow-y-auto nx-text-sm [hyphens:auto] nx-max-h-screen nx-hidden nx-w-[290px] nx-shrink-0 lg:nx-block print:nx-hidden "
    >
      <div className="mb-4">
        <Search />
      </div>
      {renderComponent(config.toc.component, {
        className:
          "nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom)-120px)] top-0",
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
      <div className="nx-mx-auto nx-flex nx-max-w-screen-2xl px-4 sm:px-12 mx-auto box-content nx-mt-[64px] lg:nx-mt-[60px]">
        <ActiveAnchorProvider>
          {tocEl}
          <SkipNavContent />
          {config.aiButton && renderComponent(config.aiButton.component)}
          <Body>
            <MDXProvider components={getComponents({})}>{children}</MDXProvider>
          </Body>
        </ActiveAnchorProvider>
      </div>
      {themeContext.footer && renderComponent(config.footer.component)}
    </div>
  );
};

export const OpenApiLayout = ({
  children,
  ...context
}: NextraThemeLayoutProps): ReactElement => (
  <ConfigProvider value={context}>
    <InnerLayout {...context.pageOpts}>{children}</InnerLayout>
  </ConfigProvider>
);
