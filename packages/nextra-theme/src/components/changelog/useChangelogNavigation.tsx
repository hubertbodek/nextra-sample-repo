import kebabCase from "lodash/kebabCase";
import { useRouter } from "next/router";
import { MdxFile } from "nextra";
import { useMemo } from "react";
import { useMdx } from "~/contexts";
import { SidebarItem } from "../shared/sidebar";

const createRouteFromCategory = (category: string) =>
  `/changelog/categories/${kebabCase(category)}`;

const createInitialLink = (
  route: string,
  isActive: (route: string) => boolean,
) => ({
  href: `/${route}`,
  isActive: isActive(`/${route}`),
  label: "All",
});

const getCategoryFromDate = (post: MdxFile) => {
  const date = new Date(post.frontMatter?.date as string);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const getMonth = (post: MdxFile) => {
  const date = new Date(post.frontMatter?.date as string);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
};

const getYear = (post: MdxFile) => {
  const date = new Date(post.frontMatter?.date as string);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(date);
};

interface Link {
  isActive: boolean;
  label: string;
  href: string;
}

export const useCategorizedChangelogNavigation = () => {
  const { asPath } = useRouter();
  const mdxData = useMdx("changelog");

  const isActive = (route: string) => asPath === route;
  const initialLink = createInitialLink("changelog", isActive);

  const links = useMemo(
    () =>
      mdxData.reduce(
        (acc, post) => {
          const category = getCategoryFromDate(post);
          const routeFromCategory = createRouteFromCategory(category);

          const monthItem = {
            href: routeFromCategory,
            isActive: isActive(routeFromCategory),
            label: getMonth(post),
          };

          const yearItem = { label: getYear(post), items: [] };

          const yearItemIndex = acc.findIndex(
            (link) => link.label === getYear(post),
          );

          if (yearItemIndex === -1 || !("items" in acc[yearItemIndex])) {
            return [...acc, yearItem];
          }

          if (
            yearItemIndex > -1 &&
            !acc[yearItemIndex]?.items.find(
              (item) => item.label === monthItem.label,
            )
          ) {
            acc[yearItemIndex]?.items?.push(monthItem);
          }

          return acc;
        },
        [initialLink] as SidebarItem[],
      ),
    [mdxData],
  );

  return { links };
};

export const useChangelogNavigation = () => {
  const { asPath } = useRouter();
  const mdxData = useMdx("changelog");

  const isActive = (route: string) => asPath === route;
  const initialLink = createInitialLink("changelog", isActive);

  const links = useMemo(
    () =>
      mdxData.reduce(
        (acc, post) => {
          const category = getCategoryFromDate(post);
          const routeFromCategory = createRouteFromCategory(category);

          const categoryLink = {
            href: routeFromCategory,
            isActive: isActive(routeFromCategory),
            label: category,
          };

          if (!acc.find((link) => link.label === categoryLink.label)) {
            return [...acc, categoryLink];
          }

          return acc;
        },
        [initialLink] as Link[],
      ),
    [mdxData],
  );

  return { links };
};
