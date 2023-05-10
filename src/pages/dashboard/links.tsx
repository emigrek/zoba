import { api } from "@/utils/api";
import LinkItem from "@/components/LinkItem";
import LinkGrid from "@/components/LinkGrid";
import { Button } from "@/components/ui/Button/Button";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Container } from "@/components/ui/Container/Container";
import { ExtendedLink } from "types";
import { Fragment, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { NextPageWithLayout } from "@/pages/_app";
import useShortenModal from "@/hooks/useShortenModal";
import { MdClose, MdOutlet } from "react-icons/md";
import SiteHeader from "@/components/SiteHeader";
import useSearchModal from "@/hooks/useSearchModal";
import LinkItemSkeleton from "@/components/LinkItemSkeleton";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";
import ErrorFallback from "@/components/ErrorFallback";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";

const Links: NextPageWithLayout = () => {
    const { ref, inView } = useInView();
    const { setIsOpen: setShortenModalOpen } = useShortenModal();
    const { setIsOpen: setSearchModalOpen, query, setQuery } = useSearchModal();

    const { data, fetchNextPage, isLoading, isError, refetch } = api.link.getInfinite.useInfiniteQuery(
        { limit: 25, query },
        { getNextPageParam: (lastPage) => lastPage.nextCursor }
    );

    const noLinksLogic = data?.pages.length === 0;
    const noSearchResultsLogic = query && data?.pages.length && data?.pages[0]?.links.length === 0;

    useEffect(() => {
        if (inView && !isLoading) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label="Links" actions={[
                <>
                    {
                        query ? (
                            <Button className="w-full" onClick={() => setQuery('')} variant={'red'} iconRight={MdClose}>Clear search</Button>
                        ) : (
                            <Button className="w-full" onClick={() => setSearchModalOpen(true)} iconRight={BiSearch}>Search</Button>
                        )
                    }
                </>,
                <Button className="w-full" onClick={() => setShortenModalOpen(true)} variant={'emerald'} iconRight={BiPlus}>Add</Button>
            ]} />
            {
                isLoading ? (
                    <LinkGrid>
                        {
                            [...Array(6)].map((_, index) => (
                                <LinkItemSkeleton key={index}/>
                            ))
                        }
                    </LinkGrid>
                ) : null
            }
            {
                isError ? (
                    <ErrorFallback reload={refetch} />
                ) : null
            }
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
                                            return isLast ? <LinkItem key={link.id} ref={ref} link={link} /> : <LinkItem key={link.id} link={link} />;
                                        })
                                    }
                                </Fragment>
                            ))
                        }
                    </LinkGrid>
                )
            }
        </MotionContainer>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
};

Links.getLayout = (page) => {
    return <Layout type="dashboard">{page}</Layout>
}

export default Links;