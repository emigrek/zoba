import { Button } from "@/components/Button/Button";
import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="pb-8 text-neutral-100 text-center flex flex-col gap-5">
        <h1 className="text-6xl font-bold">
          Shorten your links and watch them grow
        </h1>
        <p className="text-neutral-400">
          Sign in to persist your links and manage them
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/shorten">
          <Button variant="success" size="large">
            Get started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;