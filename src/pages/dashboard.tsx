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
import { BiCut, BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { usePagination } from "@mantine/hooks";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const { data: totalPages } = api.link.getTotalPages.useQuery();
  const pagination = usePagination({ total: totalPages || 1, initialPage: 1 });
  const { data: links } = api.link.getPage.useQuery({ page: pagination.active });

  const handlePageChange = (page: number | 'dots') => {
    if (page == 'dots') return;
    pagination.setPage(page);
  }

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
      <Box className="w-full flex flex-col gap-3">
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
        <div className="flex flex-col md:flex-row gap-2 md:gap-1 items-center justify-center">
          <Button size={'small'} onClick={() => pagination.previous()} className="w-full md:w-fit" iconRight={BiLeftArrowAlt} disabled={pagination.active === 1} />
          <div className="flex gap-1 w-full justify-evenly md:w-fit">
            {
              pagination.range.map((page) => (
                <Button
                  variant={page == pagination.active ? 'blue' : 'default'}
                  onClick={() => handlePageChange(page)}
                  size={'small'}
                >
                  {page == "dots" ? '...' : page}
                </Button>
              ))
            }
          </div>
          <Button size={'small'} onClick={() => pagination.next()} className="w-full md:w-fit" iconRight={BiRightArrowAlt} disabled={pagination.active === totalPages} />
        </div>
      </Box>
    </div>
  );
};

export default Dashboard;