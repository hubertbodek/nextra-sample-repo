import type { ImageProps } from "next/image";

export interface HeaderSingleLink {
  href: string;
  icon?: ImageProps;
  label: string;
}

export interface HeaderLinksGroup {
  label: string;
  links: (HeaderSingleLink & { description?: string })[];
}

export type HeaderLink = HeaderSingleLink | HeaderLinksGroup;
