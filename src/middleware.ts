import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/embed(.*)',
    '/forum(.*)',
    '/chat(.*)',
    '/[...url]'
])


export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
})

// export function middleware() {
//     const response = NextResponse.next();

//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
//     response.headers.set("Access-Control-Allow-Headers", "Content-Type");

//     return response;
// }

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};