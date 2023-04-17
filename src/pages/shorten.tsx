import { Box } from "@/components/ui/Box/Box";
import { type NextPage } from "next";
import ShortenForm from "@/components/forms/ShortenForm";
import { Container } from "@/components/ui/Container/Container";

const Shorten: NextPage = () => {
  return (
    <Container size={'small'}>
      <div className="flex flex-col w-full gap-5">
        <Box className="w-full">
          <ShortenForm />
        </Box>
      </div>
    </Container>
  );
};

export default Shorten;