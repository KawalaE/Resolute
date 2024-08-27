"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Spinner,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrBug } from "react-icons/gr";

const NavBar = () => {
  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14">
      <Container>
        <Flex justify="between">
          <NavLinks />
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};
const AuthStatus = () => {
  const { status, data: user } = useSession();
  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated")
    return (
      <Link
        className={classNames({ "nav-link": true })}
        href="/api/auth/signin"
      >
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Avatar src={user!.user?.image!} fallback={"?"} radius="full" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text weight="light" color="gray">
              {user!.user?.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
const NavLinks = () => {
  const currentPath = usePathname();

  const navElements = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <Flex gap="6" align="center">
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
                  "nav-link": true,
                  "!text-zinc-900": link.href === currentPath,
                })}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </Flex>
  );
};
export default NavBar;
