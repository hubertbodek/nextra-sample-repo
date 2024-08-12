import type { MdxFile, PageMapItem } from "nextra";
import { sortDate } from "./date";
import traverse from "./traverse";

const isMdxOfType = (page: PageMapItem, route: string): page is MdxFile => {
  if (
    page.kind === "Folder" ||
    page.kind === "Meta" ||
    page.name.startsWith("_")
  ) {
    return false;
  }

  // filter by front matter logic may be placed here
  return page.route.startsWith(`/${route}/`) ? true : false;
};

export const collectFiles = (pageMap: PageMapItem[], route: string) => {
  const files: MdxFile[] = [];

  traverse(pageMap, route, (page) => {
    if (isMdxOfType(page, route)) {
      files.push(page);
    }
  });
  files.sort(sortDate);

  return files;
};
