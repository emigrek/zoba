import { Box } from "@/components/ui/Box/Box";
import { Button } from "@/components/ui/Button/Button";
import { type NextPage } from "next";
import Link from "next/link";
import { BiRightArrowAlt, BiSave, BiShareAlt } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-neutral-100 text-center flex flex-col gap-3">
        <h1 className="text-5xl md:text-6xl font-bold">
          Shorten your links and watch them grow
        </h1>
        <p className="text-neutral-400">
          Sign in to persist your links and manage them
        </p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Box className="flex flex-col items-center justify-center gap-2 flex-1">
          <BiSave className="w-12 h-12"/>
          <h2 className="text-lg md:text-xl font-bold">Save</h2>
          <p className="text-sm md:text-base text-neutral-400 text-center">Save and use later</p>
        </Box>
        <Box className="flex flex-col items-center justify-center gap-2 flex-1">
          <MdManageSearch className="w-12 h-12"/>
          <h2 className="text-lg md:text-xl font-bold">Manage</h2>
          <p className="text-sm md:text-base text-neutral-400 text-center">Manage and see what&apos;s clickable</p>
        </Box>
        <Box className="flex flex-col items-center justify-center gap-2 flex-1">
          <BiShareAlt className="w-12 h-12"/>
          <h2 className="text-lg md:text-xl font-bold">Share</h2>
          <p className="text-sm md:text-base text-neutral-400 text-center">Share with your friends</p>
        </Box>
      </div>
      <div className="flex justify-center">
        <Link href="/shorten">
          <Button variant="success" size="large" iconRight={BiRightArrowAlt}>
            Get started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;