import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Layout from "@/components/layouts/Layout";
import { Toaster } from "react-hot-toast";
import toastOptions from "@/utils/toastOptions";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Modal from "react-modal";
import QRModalContextProvider from "@/contexts/QRModalContext";
import Head from "next/head";
import { siteConfig } from "@/config/site";
import { AppContextProvider } from "@/contexts/AppContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

Modal.setAppElement("#__next");

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position={"bottom-right"} toastOptions={toastOptions} />
      <AppContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
