"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const page = () => {
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
              variant="outline"
              onClick={() => signIn("github")}
              size="4"
              color="indigo"
            >
              <Flex align="center" gap="2">
                <span>Sign in with Github</span>
                <GitHubLogoIcon />
              </Flex>
            </Button>
            <Button
              variant="outline"
              onClick={() => signIn("google")}
              color="orange"
              size="4"
            >
              <Flex align="center" gap="2">
                <span>Sign in with Google</span>
                <FcGoogle />
              </Flex>
            </Button>
          </Flex>
        </Box>
      </Card>
    </div>
  );
};

export default page;
