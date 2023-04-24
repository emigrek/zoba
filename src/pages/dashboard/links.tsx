import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { api } from "@/utils/api";
import LinkItem from "@/components/LinkItem";
import LinkGrid from "@/components/LinkGrid";
import { Button } from "@/components/ui/Button/Button";
import { BiCut, BiPlus } from "react-icons/bi";
import { useRouter } from "next/router";
import { Container } from "@/components/ui/Container/Container";
import QRModal from "@/components/QRModal";
import { ExtendedLink } from "types";
import { Fragment, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ShortenModal from "@/components/ShortenModal";
import useShortenModal from "@/hooks/useShortenModal";
import { MdOutlet } from "react-icons/md";

const Links: NextPageWithLayout = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { ref, inView } = useInView();
    const { setIsOpen: setShortenModalOpen } = useShortenModal();

    const { data, fetchNextPage } = api.link.getInfinite.useInfiniteQuery(
        { limit: 25 },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    if (!session) {
        return (
            <SignIn />
        );
    }

    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-neutral-100">All links</h1>
                <Button onClick={() => setShortenModalOpen(true)} variant={'blue'} iconRight={BiPlus}>Add</Button>
            </div>
            {
                data?.pages.length === 0 ? (
                    <div className="flex flex-col gap-1 items-center justify-center text-neutral-500 py-10">
                        <MdOutlet className="w-20 h-20" />
                        <p>You don&apos;t have any links yet.</p>
                    </div>
                ) : (
                    <LinkGrid>
                        {
                            data?.pages.map((page, index) => (
                                <Fragment key={index}>
                                    {
                                        page.links.map((link: ExtendedLink, index) => {
                                            const isLast = index === page.links.length - 1;

                                            if (isLast) {
                                                return (
                                                    <div ref={ref} key={link.id}>
                                                        <LinkItem link={link} />
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={link.id}>
                                                        <LinkItem link={link} />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </Fragment>
                            ))
                        }
                    </LinkGrid>
                )
            }
            <ShortenModal />
            <QRModal />
        </Container>
    );
};

Links.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}


export default Links;