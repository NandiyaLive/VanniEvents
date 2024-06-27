"use client";

import Logo from "./logo";

import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import useEffectOnce from "@/lib/use-effect-once";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [navLinks, setNavLinks] = useState([
    {
      title: "Profile",
      href: "/profile",
    },
  ]);

  const userRole = getCookie("role");

  const handelLogout = () => {
    deleteCookie("token");
    deleteCookie("role");
    router.push("/auth/login");
  };

  if (pathname.startsWith("/auth")) {
    return null;
  }

  useEffectOnce(() => {
    if (userRole && userRole !== "user") {
      setNavLinks((prev) => [
        {
          title: "Dashboard",
          href: "/dashboard",
        },
        {
          title: "Clubs",
          href: "/dashboard/clubs",
        },
        {
          title: "Users",
          href: "/dashboard/users",
        },
        ...prev,
      ]);
    }
  }, [userRole]);

  return (
    <section className="container max-w-8xl flex justify-between items-center p-4 z-50">
      <Link href="/">
        <Logo />
      </Link>

      <nav className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            <p>{link.title}</p>
          </Link>
        ))}

        <Button variant="destructive" size="sm" onClick={handelLogout}>
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </nav>
    </section>
  );
};

export default Navbar;
