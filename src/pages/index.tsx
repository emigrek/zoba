import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { type NextPage } from "next";

import { BiBasket } from "react-icons/bi";

const Home: NextPage = () => {
  return (
    <>
      <Box variant="light" className="flex flex-col gap-3 w-96">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-white">Title</h1>
          <p>Subtitle</p>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button variant="primary">
              <span>Buy</span>
              <BiBasket className="fill-blue-500 w-5 h-5"/>
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;