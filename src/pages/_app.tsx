import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import toastOptions from "@/utils/toastOptions";
import PageContextProvider from "@/contexts/PageContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster position={"bottom-right"} toastOptions={toastOptions} />
      <PageContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
