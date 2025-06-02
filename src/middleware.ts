// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
/* import { NextResponse } from "next/server"; */
/* import { checkUserHasSubscription } from "@/lib/subscriptions"; */

// Offentlige ruter
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/website",
  "/kontakt",
  "/om",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/create-checkout-session",
    "/account",           // ← tilføj adgang til konto-side
  "/tools(.*)", 
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;

  await auth.protect();

  /* const hasSubscription = await checkUserHasSubscription();
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/tools");

  if (!hasSubscription && isDashboardRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/pricing";
    return NextResponse.redirect(url);
  } */
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
