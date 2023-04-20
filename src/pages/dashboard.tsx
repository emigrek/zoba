import { NextPage } from "next";
import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { api } from "@/utils/api";
import LinkItem from "@/components/LinkItem";
import LinkGrid from "@/components/LinkGrid";
import { Button } from "@/components/ui/Button/Button";
import { BiCut } from "react-icons/bi";
import { useRouter } from "next/router";
import { Container } from "@/components/ui/Container/Container";
import QRModal from "@/components/QRModal";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: links } = api.link.getAll.useQuery();

  if (!session) {
    return (
      <SignIn />
    );
  }

  return (
    <Container className="flex flex-col gap-8 my-0 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-100">All links</h1>
        <Button onClick={() => router.push('/shorten')} variant={'emerald'} iconRight={BiCut}>New</Button>
      </div>
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
                <LinkItem key={link.id} link={link} />
              ))
            }
          </LinkGrid>
        )
      }
      <QRModal/>
    </Container>
  );
};

export default Dashboard;