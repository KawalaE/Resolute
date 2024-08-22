import Link from "next/link";
import { GrBug } from "react-icons/gr";

const NavBar = () => {
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
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
