import { Box } from "@/components/ui/Box/Box";
import PageHeader from "@/components/ui/Layout/PageHeader";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { MdDashboard } from "react-icons/md";
import SignIn from "@/components/SignIn";
import { api } from "@/utils/api";
import Link from "@/components/Link";
import LinkGrid from "@/components/LinkGrid";
import { Button } from "@/components/ui/Button/Button";
import { BiCut } from "react-icons/bi";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: links, isLoading } = api.link.getAll.useQuery();

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
        {
          links?.length === 0 ? (
            <div className="flex flex-col gap-3 items-center justify-center py-10 text-neutral-400">
              <p>You don&apos;t have any links yet.</p>
              <Button onClick={() => router.push('/shorten')} variant={'emerald'} iconRight={BiCut}>Add new</Button>
            </div>
          ) : (
            <LinkGrid>
              {
                links?.map((link) => (
                  <Link key={link.id} link={link} />
                ))
              }
            </LinkGrid>
          )
        }
      </Box>
    </div>
  );
};

export default Dashboard;