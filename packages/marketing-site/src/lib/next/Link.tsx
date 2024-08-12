import type { ComponentProps } from "react";
import NextLink from "next/link";

type LinkProps = ComponentProps<typeof NextLink>;

const isHrefAString = (href: LinkProps["href"]): href is string =>
  typeof href === "string";

const checkIfExternal = (href: string) => href.startsWith("http");

const Link = (props: LinkProps) => {
  const { children, href, ...rest } = props;
  const isExternal = isHrefAString(href) && checkIfExternal(href);

  return isExternal ? (
    <a href={href} {...rest}>
      {children}
    </a>
  ) : (
    /**
     * prefetch={false} is used to prevent loading Nextra chunks on pages that don't relay on it.
     * We will still get prefetch on hover
     */
    <NextLink {...props} prefetch={false} />
  );
};

export default Link;
