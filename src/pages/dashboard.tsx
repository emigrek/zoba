import { Box } from "@/components/ui/Box/Box";
import { Button } from "@/components/ui/Button/Button";
import PageHeader from "@/components/ui/Layout/PageHeader";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { BiError, BiLogIn } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import SignIn from "@/components/SignIn";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <SignIn />
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