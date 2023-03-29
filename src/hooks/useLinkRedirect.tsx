import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useLinkRedirect = () => {
    const router = useRouter();
    const { slug } = router.query;
    if(!slug || !slug.length) return;

    const link = api.link.get.useQuery({ slug: slug[0] as string });
    const { mutate: registerVisit } = api.visit.create.useMutation();

    useEffect(() => {
        if(!link.data) return;
        registerVisit({ id: link.data.id });
        router.push(link.data.url);
    }, [link.data]);

    return link;
};

export default useLinkRedirect;