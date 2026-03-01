import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
    const isLoggedIn = request.cookies.get("isLoggedIn")

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard"]
}