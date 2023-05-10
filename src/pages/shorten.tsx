import { Sheet } from "@/components/ui/Sheet/Sheet";
import { type NextPage } from "next";
import ShortenForm from "@/components/forms/ShortenForm";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";

const Shorten: NextPage = () => {
  return (
    <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" size={'small'}>
      <div className="flex flex-col w-full gap-5">
        <Sheet className="w-full">
          <ShortenForm />
        </Sheet>
      </div>
    </MotionContainer>
  );
};

export default Shorten;