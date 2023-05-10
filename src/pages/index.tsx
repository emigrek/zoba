import { Sheet } from "@/components/ui/Sheet/Sheet";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import Anchor from "@/components/ui/Anchor/Anchor";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt, BiSave, BiShareAlt } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import MotionContainer from "@/components/MotionContainer";

import { fadeInVariant } from "@/motions/fade";

const Home: NextPage = () => {
  return (
    <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="py-5" size={'small'}>
      <div className="flex flex-col gap-5 md:gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="relative w-52 h-52 md:w-full md:h-64 mx-auto md:mx-0">
            <Image src="/man-riding-a-rocket.svg" fill alt="Man riding a rocket" />
          </div>
          <div className="text-neutral-100 text-center flex flex-col gap-3 py-2 md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold">
              Shorten your links and watch them fly
            </h1>
            <p className="text-neutral-400">
              Sign in to persist your links and manage them
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <Sheet className="flex flex-col items-center justify-center h-44 gap-2 flex-1 p-2 py-3 md:p-5 w-full">
            <BiSave className="w-12 h-12" />
            <h2 className="text-lg md:text-xl font-bold">Save</h2>
            <p className="text-sm md:text-base text-neutral-400 text-center">Save and use later</p>
          </Sheet>
          <Sheet className="flex flex-col items-center justify-center h-44 gap-2 flex-1 p-2 py-3 md:p-5 w-full">
            <MdManageSearch className="w-12 h-12" />
            <h2 className="text-lg md:text-xl font-bold">Manage</h2>
            <p className="text-sm md:text-base text-neutral-400 text-center">Manage and see what&apos;s clickable</p>
          </Sheet>
          <Sheet className="flex flex-col items-center justify-center h-44 gap-2 flex-1 p-2 py-3 md:p-5 w-full">
            <BiShareAlt className="w-12 h-12" />
            <h2 className="text-lg md:text-xl font-bold">Share</h2>
            <p className="text-sm md:text-base text-neutral-400 text-center">Share with your friends</p>
          </Sheet>
        </div>
        <div className="flex justify-center">
          <Link href="/shorten">
            <Button variant={'accent'} size={'large'} iconRight={BiRightArrowAlt}>
              Get started
            </Button>
          </Link>
        </div>
      </div>
      <footer className="flex justify-center items-center mt-8 py-5 gap-2 px-3">
        <div className="text-center text-neutral-500 text-xs md:text-sm">
          Built by <Anchor target="_blank" href="https://github.com/emigrek">emigrek</Anchor>.
          Illustration by <Anchor target="_blank" href="https://popsy.co/">Popsy</Anchor>.
          Source code on <Anchor target="_blank" href="https://github.com/zoba">Github</Anchor>.
        </div>
      </footer>
    </MotionContainer>
  );
};

export default Home;