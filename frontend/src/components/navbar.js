"use client";

import Logo from "./logo";

import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const commonLinks = [
  {
    title: "Profile",
    href: "/profile",
  },
];

const authLinks = [
  {
    title: "Login",
    href: "/auth/login",
  },
  {
    title: "Register",
    href: "/auth/register",
  },
];

const superAdminLinks = [
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
];

const adminLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Events",
    href: "/dashboard/events",
  },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navLinks, setNavLinks] = useState([...authLinks]);

  const userData = getCookie("user");
  const userRole = user ? user.role : null;

  const handelLogout = () => {
    deleteCookie("token");
    deleteCookie("user");
    router.push("/auth/login");
  };

  useEffect(() => {
    if (userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (userRole) {
      setNavLinks([...commonLinks]);
    }

    if (userRole === "superadmin") {
      setNavLinks([...superAdminLinks, ...commonLinks]);
    }

    if (userRole === "admin") {
      setNavLinks([...adminLinks, ...commonLinks]);
    }
  }, [userRole]);

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <section className="border-b border-gray-200">
      <section className="container max-w-8xl flex justify-between items-center py-6 z-50">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <p>{link.title}</p>
            </Link>
          ))}

          {!loading
            ? userRole && (
                <Button variant="destructive" size="sm" onClick={handelLogout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              )
            : null}
        </nav>
      </section>
    </section>
  );
};

export default Navbar;
