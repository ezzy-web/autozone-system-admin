import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import supabase from "../app/models/supabase/index";

const access_token = "auto-access-token";

export type AuthMiddleware = {
  redirect_to: string;
  authorize?: (user: any) => Promise<boolean> | boolean;
};

export const authRequired = async (
  req: NextRequest,
  { redirect_to, authorize }: AuthMiddleware
) => {
  const token = req.cookies.get(access_token);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  console.log("IS USER: ", user)

  if (error) {
    req.cookies.delete(access_token);
  }

  if (authorize) {
    if (user) {
      console.log("Authorization")
      if (await authorize(user)) return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL(redirect_to, req.url))
    }
  } else {
    if (user) return NextResponse.next()
    return NextResponse.redirect(new URL(redirect_to, req.url))
  }
};

export const authentiacated = async (
  req: NextRequest,
  { redirect_to }: AuthMiddleware
) => {
  
  const token = req.cookies.get(access_token);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  console.log("Authenticated USER: ", user)
  if (error) {
    req.cookies.delete(access_token);
  }
  if (!user) return NextResponse.next();
  return NextResponse.redirect(new URL(redirect_to, req.url));
};
