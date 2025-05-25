import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define public paths that don't require authentication
const publicPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  const accessToken = request.cookies.get("accessToken")?.value;

  if (isPublicPath) {
    if (accessToken) {
      try {
        // Verify token is valid
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp > currentTime) {
          // User is logged in, redirect to dashboard
          return NextResponse.redirect(new URL("/", request.url));
        }
      } catch (error) {
        console.log(error);
        // Invalid token, allow access to public route
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // For protected routes, check if user is authenticated
  if (!accessToken) {
    // Redirect to login if no token
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token is valid
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (!decoded.exp || decoded.exp <= currentTime) {
      // Token expired, redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    // Invalid token, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. All files in the public directory
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
