import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Analytics: NextPageWithLayout = () => {
    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            Analytics
        </Container>
    );
};

Analytics.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}


export default Analytics;