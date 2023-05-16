import { Button } from "@/components/ui/Button/Button";
import { BiPlus, BiSearch } from "react-icons/bi";
import { NextPageWithLayout } from "@/pages/_app";
import { MdClose } from "react-icons/md";
import SiteHeader from "@/components/SiteHeader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";
import InfiniteLinks from "@/components/InfiniteLinks";
import useShortenModalStore from "@/stores/shortenModal";
import useSearchModalStore from "@/stores/searchModal";

const Links: NextPageWithLayout = () => {
    const { toggle: toggleShortenModal } = useShortenModalStore();
    const { toggle: toggleSearchModal, query, setQuery } = useSearchModalStore();

    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label="Links" action={
                <>
                    {
                        query ? (
                            <Button className="w-full md:w-fit" onClick={() => setQuery('')} variant={'red'} iconRight={MdClose}>Clear search</Button>
                        ) : (
                            <Button className="w-full md:w-fit" onClick={toggleSearchModal} iconRight={BiSearch}>Search</Button>
                        )
                    }
                    <Button className="w-full md:w-fit" onClick={toggleShortenModal} variant={'emerald'} iconRight={BiPlus}>Add</Button>
                </>
            } />
            <div className="flex items-center justify-between">
                <p className="text-neutral-400">{query ? `Search results for "${query}"` : 'All links'}</p>
            </div>
            <InfiniteLinks />
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