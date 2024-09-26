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
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = () => {
  return (
    <nav className="flex items-center space-x-6 border-b mb-5 px-5 h-14  dark:border-b-zinc-600">
      <Container>
        <Flex justify="between">
          <NavLinks />
          <Flex align="center" gap="5">
            <ThemeSwitch />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};
const AuthStatus = () => {
  const { status, data: user } = useSession();

  if (status === "loading") return <Spinner />;
  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Avatar
            src={user!.user?.image!}
            fallback={"?"}
            radius="full"
            referrerPolicy="no-referrer"
          />
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
  const navElements = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "Statistics", href: "/stats" },
  ];
  return (
    <Flex gap="6" align="center">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width="35" height="35"></Image>
      </Link>
      <ul className="flex space-x-6">
        {navElements.map((link) => {
          return (
            <li key={link.href}>
              <Link className="nav-link dark:nav-link-dark" href={link.href}>
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
