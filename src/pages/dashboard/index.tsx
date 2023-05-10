import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import { useSession } from "next-auth/react";
import { BsArrowRightShort } from "react-icons/bs";
import SiteHeader from "@/components/SiteHeader";
import SiteSubheader from "@/components/SiteSubheader";
import MostViewedLinks from "@/components/MostViewedLinks";
import Link from "next/link";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";

import LinksCountCard from "@/components/LinksCountCard";
import VisitsCountCard from "@/components/VisitsCountCard";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";

const Dashboard: NextPageWithLayout = () => {
    const { data: session } = useSession();

    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label={`Hello ${session ? `${session?.user.name}` : ``} 🤗`} />
            <SiteSubheader label="Overview" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <LinksCountCard/>
                <VisitsCountCard/>
            </div>
            <SiteSubheader label="Most viewed links" actions={[
                <Link href="/dashboard/links">
                    <div className="flex gap-2 text-accent-300 items-center justify-center">
                        <div>Show all</div>
                        <BsArrowRightShort className="w-8 h-8 opacity-40" />
                    </div>
                </Link>
            ]} />
            <MostViewedLinks />
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

Dashboard.getLayout = (page) => {
    return <Layout type="dashboard">{page}</Layout>
}

export default Dashboard;