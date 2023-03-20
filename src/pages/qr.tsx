import { Box } from "@/components/Box/Box";
import PageHeader from "@/components/Layout/PageHeader";
import { type NextPage } from "next";
import { HiQrcode } from "react-icons/hi";


const QR: NextPage = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader
        title="Create a QR code"
        subtitle="Insert a link to create a QR code"
        icon={HiQrcode}
      />
      <Box className="w-full">
        placeholder
      </Box>
    </div>
  );
};

export default QR;