import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import SiteHeader from "@/components/SiteHeader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";

const Settings: NextPageWithLayout = () => {
    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label="Settings" />
        </Container>
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

Settings.getLayout = (page) => {
    return <Layout type="dashboard">{page}</Layout>
}


export default Settings;