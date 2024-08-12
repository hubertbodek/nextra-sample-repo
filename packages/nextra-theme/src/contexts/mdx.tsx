import { MdxFile } from "nextra";
import { createContext, useContext } from "react";

export const MdxContext = createContext<MdxFile[] | null>(null);

export const useMdx = (route: string) => {
  const mdx = useContext(MdxContext);

  if (!mdx) {
    throw new Error(`useMdx must be used within a ${route.toUpperCase()}Provider`);
  }

  return mdx;
};
