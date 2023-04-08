import { Box } from "@/components/ui/Box/Box";
import { Button } from "@/components/ui/Button/Button";
import PageHeader from "@/components/ui/Layout/PageHeader";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { BiError, BiLogIn } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
  }

  if (!session) {
    return (
      <div className="flex flex-col w-full gap-5 text-center">
        <div className="flex flex-col gap-2 text-center">
          <BiError className="w-24 h-24 my-5 mx-auto fill-white" />
          <h1 className='text-neutral-100 text-4xl font-bold'>Authorization required</h1>
          <p className='text-neutral-400 text-xl'>You must be signed in to view this page</p>
        </div>
        <div className="flex justify-center">
          <Button variant={'blue'} size={'large'} loading={loading} iconRight={BiLogIn} onClick={handleSignIn}>
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader
        title="Dashboard"
        subtitle="Manage your links"
        icon={MdDashboard}
      />
      <Box className="w-full">
        <div className="flex justify-between items-center mb-2">
          <div>Your links</div>
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;