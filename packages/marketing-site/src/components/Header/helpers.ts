import type { HeaderLink, HeaderLinksGroup } from "./types";

export const isLinksGroup = (link: HeaderLink): link is HeaderLinksGroup =>
  Object.hasOwn(link, "links");
