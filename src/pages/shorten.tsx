import { Box } from "@/components/ui/Box/Box";
import PageHeader from "@/components/ui/Layout/PageHeader";
import { type NextPage } from "next";
import { BiCut } from "react-icons/bi";
import ShortenForm from "@/components/forms/ShortenForm";

const Shorten: NextPage = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader
        title="Shorten your links"
        subtitle="Sign in to persist your data"
        icon={BiCut}
      />
      <Box className="w-full">
        <ShortenForm />
      </Box>
    </div>
  );
};

export default Shorten;