import { siteConfig } from "@/config/site";

export default {
    title: siteConfig.name,
    description: siteConfig.description,
    additionalMetaTags: [
        {
            name: "theme-color",
            content: "#000000"
        },
        {
            name: "og:image",
            content: "/public/repo-header.png"
        }
    ],
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.ico"
        }
    ],
}