import { NextRequest, NextResponse } from "next/server";
import { appendVary, selectRepresentation } from "./lib/agentic";

const PUBLIC_FILE = /\/[^/]+\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    // Raw files are always text/plain, like raw.githubusercontent.com.
    pathname.startsWith("/posts/raw/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const representation = selectRepresentation(request.headers.get("accept"));
  if (representation === null) {
    return new NextResponse(
      "Not Acceptable\n\nThis site provides text/html and text/markdown.\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      }
    );
  }

  if (representation === "markdown") {
    const destination = request.nextUrl.clone();
    destination.pathname = "/api/markdown";
    destination.search = "";
    destination.searchParams.set("path", pathname);
    const response = NextResponse.rewrite(destination);
    response.headers.set("Vary", "Accept");
    response.headers.set(
      "Link",
      `<${pathname}>; rel="canonical"; type="text/html"`
    );
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", appendVary(response.headers.get("Vary")));
  return response;
}

export const config = {
  matcher: "/:path*",
};
