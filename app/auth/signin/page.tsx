"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-[calc(100vh_-_40px)] flex justify-center items-center ">
      <Card>
        <Box className="p-5">
          <Flex direction="column" gap="5">
            <Flex align="center" gap="4">
              <Link href="/">
                <Image src="/logo.png" alt="logo" width="50" height="50" />
              </Link>
              <Heading>Resolute</Heading>
            </Flex>
            <Text>Login using one of below platforms:</Text>
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {
                setLoading(true);
                signIn("github", { callbackUrl: "/" });
              }}
              size="4"
              color="indigo"
            >
              <Flex align="center" gap="2">
                <span>Sign in with Github</span>
                <GitHubLogoIcon />
                {loading && <Spinner />}
              </Flex>
            </Button>
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => {
                setLoading(true);
                signIn("google", { callbackUrl: "/" });
              }}
              color="orange"
              size="4"
            >
              <Flex align="center" gap="2">
                <span>Sign in with Google</span>
                <FcGoogle />
                {loading && <Spinner />}
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Card>
    </div>
  );
};

export default Page;
