import { Sheet } from "@/components/ui/Sheet/Sheet";
import { type NextPage } from "next";
import ShortenForm from "@/components/forms/ShortenForm";
import { Container } from "@/components/ui/Container/Container";

const Shorten: NextPage = () => {
  return (
    <Container size={'small'}>
      <div className="flex flex-col w-full gap-5">
        <Sheet className="w-full">
          <ShortenForm />
        </Sheet>
      </div>
    </Container>
  );
};

export default Shorten;