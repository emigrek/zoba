import { Button } from "@/components/ui/Button/Button";
import { BiPlus, BiSearch } from "react-icons/bi";
import { NextPageWithLayout } from "@/pages/_app";
import useShortenModal from "@/hooks/useShortenModal";
import { MdClose } from "react-icons/md";
import SiteHeader from "@/components/SiteHeader";
import useSearchModal from "@/hooks/useSearchModal";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";
import InfiniteLinks from "@/components/InfiniteLinks";

const Links: NextPageWithLayout = () => {
    const { setIsOpen: setShortenModalOpen } = useShortenModal();
    const { setIsOpen: setSearchModalOpen, query, setQuery } = useSearchModal();

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
            <InfiniteLinks/>
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