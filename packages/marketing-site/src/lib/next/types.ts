import type { ReactElement, ReactNode } from "react";
import type { NextPage as NextPageType } from "next";
import type { AppProps as AppPropsType } from "next/app";

interface MetadataProps {
  description?: string;
  title?: string;
}

export type Metadata = MetadataProps;

export type ServerMetadata = {
  discriminator: "__$$serverMetadata";
} & MetadataProps;

export type NextPage<P = unknown, IP = P> = NextPageType<P, IP> & {
  getLayout?: (page: ReactElement<P>) => ReactNode;
  metadata?: Metadata;
};

export type AppProps = AppPropsType & {
  Component: NextPage;
};
