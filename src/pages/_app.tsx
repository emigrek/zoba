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
import { AppContextProvider } from "@/contexts/AppContext";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

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
      <DefaultSeo {...nextSeoConfig}/>
      <NextNProgress color="#6b5cff" height={2} options={{ showSpinner: false }} showOnShallow/>
      <AppContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppContextProvider>
      <Toaster position={"bottom-right"} toastOptions={toastOptions} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
