"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrBug } from "react-icons/gr";

const NavBar = () => {
  const currentPath = usePathname();

  const navElements = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Link href="/">
        <GrBug />
      </Link>
      <ul className="flex space-x-6">
        {navElements.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                "text-zinc-500": currentPath !== link.href,
                "text-zinc-900": currentPath === link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
