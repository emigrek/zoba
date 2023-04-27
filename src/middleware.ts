import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const slug = req.nextUrl.pathname.split("/").pop();

    const data = await fetch(`${req.nextUrl.origin}/api/link/${slug}`);

    if(data.status === 404 || data.status === 400) {
        return NextResponse.redirect(req.nextUrl.origin);
    }

    const url = (await data.json()).url;

    return NextResponse.redirect(new URL(url));
}

export const config = {
    matcher: "/z/:slug*"
}