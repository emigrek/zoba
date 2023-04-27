import { prisma } from "@/server/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query;

    if(!slug || typeof slug !== "string") {
        return res.status(400).json({ error: "Invalid slug" });
    }

    const data = await prisma.link.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    });

    if(!data) {
        return res.status(404).json({ error: "Link not found. Maybe it was deleted?" });
    }

    await prisma.visit.create({
        data: {
            link: {
                connect: {
                    id: data.id
                }
            }
        }
    });

    return res.json(data);
};