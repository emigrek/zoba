import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useSession } from "next-auth/react";
import { Sheet } from "@/components/ui/Sheet/Sheet";
import { BiLink } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { api } from "@/utils/api";
import SiteHeader from "@/components/SiteHeader";

const Dashboard: NextPageWithLayout = () => {
    const { data: session } = useSession();

    const { data: linksCount } = api.link.count.useQuery();
    const { data: visitsCount } = api.visit.count.useQuery();

    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label={`Hello, ${session?.user.name}!`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <Sheet className="h-40 w-full flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="text-xl text-neutral-400">Links</div>
                        <BiLink className="w-16 h-16 opacity-40" />
                    </div>
                    <div className="text-5xl font-bold">{linksCount}</div>
                </Sheet>
                <Sheet className="h-40 w-full flex flex-col justify-between">
                    <div className="flex justify-between">
                        <div className="text-xl text-neutral-400">Visits</div>
                        <IoEye className="w-16 h-16 opacity-40" />
                    </div>
                    <div className="text-5xl font-bold">{visitsCount}</div>
                </Sheet>
            </div>
        </Container>
    );
};

Dashboard.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard;