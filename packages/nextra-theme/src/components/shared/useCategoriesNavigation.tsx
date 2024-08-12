import kebabCase from 'lodash/kebabCase';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMdx } from '~/contexts/mdx';

interface Link {
  isActive: boolean;
  label: string;
  href: string;
}


const createRouteFromTag = (route: string, tag: string) => `/${route}/categories/${kebabCase(tag)}`;

const createInitialLink = (route: string, isActive: (route: string) => boolean) => ({
  href: `/${route}`,
  isActive: isActive(`/${route}`),
  label: 'All Categories',
});

const isTagsArray = (element: unknown): element is string[] => element !== null && Array.isArray(element);


interface UseCategoriesNavigationProps {
  route: string
}

export const useCategoriesNavigation = ({ route }: UseCategoriesNavigationProps) => {
  const { asPath } = useRouter();
  const mdxData = useMdx(route);

  const isActive = (route: string) => asPath === route;
  const initialLink = useMemo(() => createInitialLink(route, isActive), []);

  const links = useMemo(
    () =>
      mdxData.reduce(
        (acc, blogPost) => {
          const tags = blogPost.frontMatter?.tags;

          if (!isTagsArray(tags)) {
            return acc;
          }

          const links = tags.map((tag) => {
            const routeFromTag = createRouteFromTag(route, tag);

            return {
              href: routeFromTag,
              isActive: isActive(routeFromTag),
              label: tag,
            };
          });

          return [...acc, ...links.filter((link) => !acc.some((l) => l.label === link.label))];
        },
        [initialLink] as Link[]
      ),
    [mdxData]
  );

  return { links };
};
