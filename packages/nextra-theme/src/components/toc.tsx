import cn from "clsx";
import type { Heading } from "nextra";
import type { ReactElement } from "react";
import { useEffect, useMemo, useRef } from "react";
import scrollIntoView from "scroll-into-view-if-needed";
import { useActiveAnchor, useConfig } from "../contexts";
import { renderComponent } from "../utils";
import { BackToTop } from "./back-to-top";

export type TOCProps = {
  className?: string;
  headings: Heading[];
  filePath: string;
};

const linkClassName = cn(
  "nx-text-xs nx-font-medium nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-brand-gray-300 dark:hover:nx-text-gray-100",
  "contrast-more:nx-text-gray-800 contrast-more:dark:nx-text-gray-50"
);

export function TOC({ className, headings }: TOCProps): ReactElement {
  const activeAnchor = useActiveAnchor();
  const config = useConfig();
  const tocRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.depth > 1),
    [headings]
  );

  const hasHeadings = items.length > 0;
  const hasMetaInfo = Boolean(
    config.feedback.content ||
      config.editLink.component ||
      config.toc.extraContent
  );

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive
  )?.[0];

  useEffect(() => {
    if (!activeSlug) return;
    const anchor = tocRef.current?.querySelector(
      `li > a[href="#${activeSlug}"]`
    );

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current,
      });
    }
  }, [activeSlug]);

  return (
    <div
      ref={tocRef}
      className={cn(
        "nextra-bottom-gradient no-scrollbar nx-sticky nx-top-[84px] nx-overflow-y-auto nx-text-sm [hyphens:auto]",
        "nx-max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] nx-pb-4",
        className
      )}
    >
      {hasHeadings && (
        <>
          <p className="nx-sticky nx-top-0 nx-py-2 nx-pl-4 nx-pr-2 nx-text-body2 nx-tracking-tight nx-text-white nx-bg-brand-dark-500 nx-z-10">
            {renderComponent(config.toc.title)}
          </p>
          <ul className='nx-flex nx-flex-col nx-relative before:nx-absolute before:nx-inset-y-1 before:nx-h-full before:nx-top-0 before:nx-w-px before:nx-bg-gray-200 before:nx-content-[""] dark:before:nx-bg-brand-gray-950 ltr:nx-pl-1.5 ltr:before:nx-left-0 rtl:nx-pr-1.5 rtl:before:nx-right-0 ltr:nx-ml-4 rtl:nx-mr-4'>
            {items.map(({ id, value, depth }) => (
              <li
                className={cn(
                  "nx-scroll-my-6 nx-scroll-py-6 nx-flex nx-flex-col nx-relative nx-mt-0.5 dark:hover:nx-text-white",
                  activeAnchor[id]?.isActive
                    ? "nx-bg-brand-dark-600"
                    : "dark:hover:nx-bg-brand-gray-950"
                )}
                key={id}
              >
                <a
                  href={`#${id}`}
                  className={cn(
                    {
                      2: "",
                      3: "",
                      4: "",
                      5: "",
                      6: "",
                    }[depth as Exclude<typeof depth, 1>],
                    "nx-inline-block nx-py-2 nx-pl-4 nx-pr-2",
                    activeAnchor[id]?.isActive
                      ? "nx-text-primary-600 dark:nx-text-white nx-subpixel-antialiased contrast-more:!nx-text-primary-600"
                      : "nx-text-gray-500 hover:nx-text-gray-900 dark:nx-text-brand-gray-300 dark:hover:nx-text-white",
                    "contrast-more:nx-text-gray-900 contrast-more:nx-underline contrast-more:dark:nx-text-gray-50 nx-w-full nx-break-words nx-text-body2"
                  )}
                >
                  {config.toc.headingComponent?.({
                    id,
                    children: value,
                  }) ?? value}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {hasMetaInfo && (
        <div>
          {renderComponent(config.toc.extraContent)}
          {config.toc.backToTop && <BackToTop className={linkClassName} />}
        </div>
      )}
    </div>
  );
}
