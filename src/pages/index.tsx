import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zoba - url shortener</title>
        <meta name="description" content="Shorten links and manage them in fashionable way" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
      </main>
    </>
  );
};

export default Home;