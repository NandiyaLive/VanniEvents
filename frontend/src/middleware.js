import { NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import { jwtVerify } from "jose";

const publicRoutes = ["/auth/login", "/auth/register", "/events"];
const userRoutes = ["/profile", "/tickets"];
const superAdminRoutes = ["/dashboard", "/clubs", "/users"];
const clubAdminRoutes = ["/dashboard", "/events"];

const checkIfSuperAdmin = (payload) => payload.role === "superAdmin";
const checkIfClubAdmin = (payload) => payload.role === "admin";
const checkIfAdmin = (payload) =>
  checkIfSuperAdmin(payload) || checkIfClubAdmin(payload);
const checkIfUser = (payload) => payload.role === "user";

const checkIfUserRoute = (pathname) =>
  userRoutes.some((route) => pathname.startsWith(route));
const checkIfAdminRoute = (pathname) =>
  superAdminRoutes
    .concat(clubAdminRoutes)
    .some((route) => pathname.startsWith(route));
const checkIfSuperAdminRoute = (pathname) =>
  superAdminRoutes.some((route) => pathname.startsWith(route));

const isPublicRoute = (pathname) =>
  publicRoutes.some((route) => pathname.startsWith(route));

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  if (
    pathname.startsWith("/_next") ||
    pathname === "/" ||
    isPublicRoute(pathname)
  ) {
    return NextResponse.next();
  }

  const token = getCookie("token", { req });
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    setCookie("user", payload, { sameSite: "strict", res, req });

    if (
      (checkIfUserRoute(pathname) && checkIfUser(payload)) ||
      (checkIfAdminRoute(pathname) && checkIfAdmin(payload)) ||
      (checkIfSuperAdminRoute(pathname) && checkIfSuperAdmin(payload))
    ) {
      return res;
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.redirect(new URL("/auth/login", req.url));
}
