import { siteConfig } from "@/config/site";

export default {
    title: siteConfig.name,
    description: siteConfig.description,
    additionalMetaTags: [
        {
            name: "theme-color",
            content: "#000000"
        }
    ],
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.ico"
        }
    ],
    openGraph: {
        type: "website",
        locale: "en_IE",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        images: [
            {
                url: `${siteConfig.url}/logo.png`,
                width: 512,
                height: 512,
                alt: siteConfig.name
            }
        ]
    }
}