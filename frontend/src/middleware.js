import { NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const userRoutes = ["/", "/events", "/profile", "/tickets"];

const checkIfAdmin = (payload) => {
  return payload.role === "superadmin" || payload.role === "admin";
};

const checkIfUser = (payload) => {
  return payload.role === "user";
};

const checkIfUserRoute = (pathname) => {
  return userRoutes.some((route) => pathname.startsWith(route));
};

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  const token = getCookie("token", { cookies });
  const res = NextResponse.next();

  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (pathname === "/" || pathname.startsWith("/auth")) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        setCookie("role", payload.role, { res, req });

        if (pathname.startsWith("/auth")) {
          if (checkIfAdmin(payload)) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
          if (checkIfUser(payload)) {
            return NextResponse.redirect(new URL("/", req.url));
          }
        }
      } catch (error) {
        console.log("Invalid token during auth route check", error);
      }
    }
    return res;
  }

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    setCookie("role", payload.role, { res, req });

    if (checkIfAdmin(payload)) {
      return res;
    }

    if (pathname.startsWith("/dashboard") && !checkIfAdmin(payload)) {
      console.log("Admin access required for this route");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (checkIfUser(payload) && checkIfUserRoute(pathname)) {
      return res;
    }

    console.log("User is not allowed to access this route");
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
