import extractDomain from "extract-domain";
import { ExtendedLink } from "types";

interface LinkDetailsProps {
    link: ExtendedLink
}

const useLinkDetails = ({ link }: LinkDetailsProps) => {
    const domain = extractDomain(link.url);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const shortened = `${origin}/z/${link.slug}`;
    const created = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(link.createdAt));
    const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return {
        domain,
        origin,
        shortened,
        created,
        favicon
    }
}

export default useLinkDetails