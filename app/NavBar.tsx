"use client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrBug } from "react-icons/gr";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: user } = useSession();
  const navElements = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    status === "authenticated"
      ? { label: "Logout", href: "/api/auth/signout" }
      : { label: "Login", href: "/api/auth/signin" },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href="/">
        <GrBug />
      </Link>
      <ul className="flex space-x-6">
        {navElements.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "text-zinc-500": currentPath !== link.href,
                  "text-zinc-900": currentPath === link.href,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
