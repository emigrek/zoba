import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import { api } from "@/utils/api";
import LinkItem from "@/components/LinkItem";
import LinkGrid from "@/components/LinkGrid";
import { Button } from "@/components/ui/Button/Button";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Container } from "@/components/ui/Container/Container";
import QRModal from "@/components/modals/QRModal";
import { ExtendedLink } from "types";
import { Fragment, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ShortenModal from "@/components/modals/ShortenModal";
import useShortenModal from "@/hooks/useShortenModal";
import { MdClose, MdOutlet } from "react-icons/md";
import SiteHeader from "@/components/SiteHeader";
import useSearchModal from "@/hooks/useSearchModal";
import SearchModal from "@/components/modals/SearchModal";

const Links: NextPageWithLayout = () => {
    const { data: session } = useSession();
    const { ref, inView } = useInView();
    const { setIsOpen: setShortenModalOpen } = useShortenModal();
    const { setIsOpen: setSearchModalOpen, query, setQuery } = useSearchModal();

    const { data, fetchNextPage } = api.link.getInfinite.useInfiniteQuery(
        { limit: 25, query },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    const noLinksLogic = data?.pages.length === 0;
    const noSearchResultsLogic = query && data?.pages.length && data?.pages[0]?.links.length === 0;

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
            <SiteHeader label="Links" actions={[
                <>
                    {
                        query ? (
                            <Button className="w-full" onClick={() => setQuery('')} variant={'red'} iconRight={MdClose}>Clear search</Button>
                        ) : (
                            <Button className="w-full" onClick={() => setSearchModalOpen(true)} variant={'blue'} iconRight={BiSearch}>Search</Button>
                        )
                    }
                </>,
                <Button className="w-full" onClick={() => setShortenModalOpen(true)} variant={'emerald'} iconRight={BiPlus}>Add</Button>
            ]} />
            {
                noSearchResultsLogic ? (
                    <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
                        <MdOutlet className="w-20 h-20" />
                        <p>No links matched your search.</p>
                    </div>
                ) : null
            }
            {
                noLinksLogic ? (
                    <div className="flex flex-col gap-3 items-center justify-center text-neutral-500 py-10">
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
            <SearchModal />
        </Container>
    );
};

Links.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}


export default Links;