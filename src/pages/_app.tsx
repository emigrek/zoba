import { AppProps, type AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import toastOptions from "@/utils/toastOptions";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <Toaster position={"bottom-right"} toastOptions={toastOptions} />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
