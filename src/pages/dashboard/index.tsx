import { Container } from "@/components/ui/Container/Container";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useSession } from "next-auth/react";
import { Sheet } from "@/components/ui/Sheet/Sheet";
import { BiLink } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import { api } from "@/utils/api";
import SiteHeader from "@/components/SiteHeader";
import SiteSubheader from "@/components/SiteSubheader";
import MostViewedLinks from "@/components/MostViewedLinks";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner/Spinner";
import OverallChart from "@/components/charts/OverallChart";
import { MdAutoGraph } from "react-icons/md";

const Dashboard: NextPageWithLayout = () => {
    const { data: session } = useSession();

    const { data, isLoading } = api.analytics.getCount.useQuery();

    return (
        <Container className="flex flex-col gap-8 my-0 p-8">
            <SiteHeader label={`Hello ${session ? `${session?.user.name}` : ``} 🤗`} />
            <SiteSubheader label="Overview" actions={[
                <Link href="/dashboard/analytics">
                    <div className="flex gap-2 text-accent-300 items-center justify-center">
                        <div>Show more</div>
                        <BsArrowRightShort className="w-8 h-8 opacity-40" />
                    </div>
                </Link>
            ]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                <Sheet className="w-full h-40 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                        <div className="text-md md:text-xl text-neutral-400">Links</div>
                        <BiLink className="w-8 h-8 md:w-16 md:h-16 opacity-40" />
                    </div>
                    {
                        isLoading ? (
                            <Spinner className="w-10 h-10" />
                        ) : (
                            <div className="text-5xl font-bold">{data?.linksCount}</div>
                        )
                    }
                </Sheet>
                <Sheet className="w-full h-40 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                        <div className="text-md md:text-xl text-neutral-400">Visits</div>
                        <IoEye className="w-8 h-8 md:w-16 md:h-16 opacity-40" />
                    </div>
                    {
                        isLoading ? (
                            <Spinner className="w-10 h-10" />
                        ) : (
                            <div className="text-5xl font-bold">{data?.visitsCount}</div>
                        )
                    }
                </Sheet>
                <Sheet className="w-full h-60 flex flex-col justify-between col-span-2">
                    <div className="flex justify-between gap-2">
                        <div className="text-md md:text-xl text-neutral-400">Visits over time</div>
                        <MdAutoGraph className="w-8 h-8 md:w-16 md:h-16 opacity-40" />
                    </div>
                    <OverallChart/>
                </Sheet>
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
        </Container>
    );
};

Dashboard.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard;