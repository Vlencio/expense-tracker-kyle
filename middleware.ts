import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isLogedIn = request.cookies.get("loggedIn")

    if (!isLogedIn) {
        NextResponse.redirect(new URL("/", request.url))
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: "/dashboard"
}