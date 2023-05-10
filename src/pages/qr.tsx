import { Sheet } from "@/components/ui/Sheet/Sheet";
import { type NextPage } from "next";
import QRForm from "@/components/forms/QRForm";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";

const QR: NextPage = () => {
  return (
    <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" size={'small'}>
      <div className="flex flex-col w-full gap-5 items-center">
        <Sheet className="w-full">
          <QRForm/>
        </Sheet>
      </div>
    </MotionContainer>
  );
};

export default QR;