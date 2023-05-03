import { siteConfig } from "@/config/site";

export default {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.ico"
        }
    ]
}