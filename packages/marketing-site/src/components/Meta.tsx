import Head from "next/head";
import { useRouter } from "next/router";
import { getBaseUrl } from "~/utils/getBaseUrl";
import type { Metadata } from "~/lib/next";

export const Meta = ({ description, title }: Metadata) => {
  const { pathname } = useRouter();

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${pathname}`;

  return (
    <Head>
      <link
        href="/apple-touch-icon-dark.png"
        media="(prefers-color-scheme: dark)"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/apple-touch-icon-light.png"
        media="(prefers-color-scheme: light)"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        color="#fbe331"
        href="/safari-pinned-tab-dark.svg"
        media="(prefers-color-scheme: dark)"
        rel="mask-icon"
      />
      <link
        color="#212015"
        href="/safari-pinned-tab-light.svg"
        media="(prefers-color-scheme: light)"
        rel="mask-icon"
      />
      <link
        href="/favicon-16x16-dark.png"
        media="(prefers-color-scheme: dark)"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/favicon-16x16-light.png"
        media="(prefers-color-scheme: light)"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/favicon-32x32-dark.png"
        media="(prefers-color-scheme: dark)"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon-32x32-light.png"
        media="(prefers-color-scheme: light)"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link href={url} rel="canonical" />
      <link href="/site.webmanifest" rel="manifest" />
      <meta content="#fbe331" name="msapplication-TileColor" />
      <meta
        content="#212015"
        media="(prefers-color-scheme: dark)"
        name="theme-color"
      />
      <meta
        content="#fbe331"
        media="(prefers-color-scheme: light)"
        name="theme-color"
      />
      <meta content={url} property="og:url" />
      <meta content={`${baseUrl}/og-image-600x900.png`} property="og:image" />
      <meta content="acme" property="og:image:alt" />
      <meta content="600" property="og:image:height" />
      <meta content="900" property="og:image:width" />
      <meta content={`${baseUrl}/og-image-2000x1333.png`} property="og:image" />
      <meta content="acme" property="og:image:alt" />
      <meta content="1333" property="og:image:height" />
      <meta content="2000" property="og:image:width" />
      <meta content={`${baseUrl}/og-image-600x900.png`} name="twitter:image" />
      <meta content="acme" name="twitter:image:alt" />
      <meta content="600" name="twitter:image:height" />
      <meta content="900" name="twitter:image:width" />
      <meta
        content={`${baseUrl}/og-image-2000x1333.png`}
        name="twitter:image"
      />
      <meta content="acme" name="twitter:image:alt" />
      <meta content="1333" name="twitter:image:height" />
      <meta content="2000" name="twitter:image:width" />
      <meta content="summary_large_image" name="twitter:card" />
      {description && <meta content={description} name="description" />}
      {description && <meta content={description} property="og:description" />}
      {description && <meta content={description} name="twitter:description" />}
      {title && <meta content={title} property="og:title" />}
      {title && <meta content={title} name="title" />}
      {title && <title>{title}</title>}
    </Head>
  );
};
