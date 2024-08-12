import type { AppProps } from "~/lib/next";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default AppWrapper;
