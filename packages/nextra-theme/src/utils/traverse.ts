import type { PageMapItem } from "nextra";

// BFS traverse the page map tree
export default function traverse(
  pageMap: PageMapItem[],
  route: string,
  matcher: (page: PageMapItem, route: string) => boolean | void,
): PageMapItem | null {
  for (const pageMapItem of pageMap) {
    if (matcher(pageMapItem, route)) {
      return pageMapItem;
    }
  }

  for (const item of pageMap) {
    if (item.kind === "Folder") {
      const matched = traverse(item.children, route, matcher);
      if (matched) {
        return matched;
      }
    }
  }
  return null;
}
