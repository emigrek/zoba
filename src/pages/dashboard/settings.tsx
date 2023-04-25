import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SiteHeader from "@/components/SiteHeader";

const Settings: NextPageWithLayout = () => {
    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label="Settings" />
        </Container>
    );
};
 Settings.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}


export default Settings;