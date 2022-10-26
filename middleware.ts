import { NextRequest, NextResponse } from "next/server";
import { authRequired, authentiacated } from "./auth/index";

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  console.log(pathname);

  if (pathname.startsWith("/content/admin")) {
    return await authRequired(req, {
      redirect_to: "/",
    });
  } else if (pathname.startsWith("/content")) {
    return await authRequired(req, {
      redirect_to: "/",
    });
  } else if (pathname === '/' || pathname === '/register') {
    return await authentiacated(req, { redirect_to: "/content" });
  } 

  return NextResponse.next()
};
