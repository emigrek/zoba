import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Settings: NextPageWithLayout = () => {
    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
         Settings
        </Container>
    );
};
 Settings.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}


export default Settings;