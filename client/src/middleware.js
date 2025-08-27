import { NextResponse } from "next/server";
import { AUTH_PATHNAME } from "./reducer/auth-reducer";

export function middleware(request) {
	const { nextUrl: url, cookies } = request;
	let pathname = url.pathname;

	const access_token = cookies.get("access_token")?.value;
	const isAuthenticated = !!access_token;

	if (!isAuthenticated) {
		if (!AUTH_PATHNAME.includes(pathname)) {
			url.pathname = "auth/login";
			console.log("To login");
			return NextResponse.redirect(url);
		}
	}

	if (isAuthenticated) {
		if (AUTH_PATHNAME.includes(pathname)) {
			url.pathname = "/dashboard";
			console.log("To dashboard");
			return NextResponse.redirect(url);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		// Skip Next.js internals and static assets
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
