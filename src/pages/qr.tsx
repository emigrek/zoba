import { Sheet } from "@/components/ui/Sheet/Sheet";
import { type NextPage } from "next";
import { Container } from "@/components/ui/Container/Container";
import QRForm from "@/components/forms/QRForm";

const QR: NextPage = () => {
  return (
    <Container size={'small'}>
      <div className="flex flex-col w-full gap-5 items-center">
        <Sheet className="w-full">
          <QRForm/>
        </Sheet>
      </div>
    </Container>
  );
};

export default QR;