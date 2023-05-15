import { NextPageWithLayout } from "@/pages/_app";
import SiteHeader from "@/components/SiteHeader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import Layout from "@/components/layouts/Layout";
import MotionContainer from "@/components/MotionContainer";
import { fadeInVariant } from "@/motions/fade";
import SiteSubheader from "@/components/SiteSubheader";
import AccountDetails from "@/components/AccountDetails";
import { Button } from "@/components/ui/Button/Button";
import useAccountDeleteStore from "@/stores/accountDeleteModal";

const Settings: NextPageWithLayout = () => {
    const { toggle: toggleAccountDeleteModal } = useAccountDeleteStore();
    
    return (
        <MotionContainer variants={fadeInVariant} initial="initial" animate="animate" className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label="Settings" />
            <SiteSubheader label="Account" />
            <AccountDetails />
            <SiteSubheader className="text-red-400" label="Delete account" />
            <div className="text-neutral-500">
                Deleting your account is permanent. All of your data will be deleted and you won&apos;t be able to recover it.
            </div>
            <Button variant={'red'} onClick={toggleAccountDeleteModal}>Delete account</Button>
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

Settings.getLayout = (page) => {
    return <Layout type="dashboard">{page}</Layout>
}

export default Settings;