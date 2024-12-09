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
  const [error, setError] = useState("");

  const handleSignIn = async (provider: string) => {
    setLoading(true);
    try {
      const response = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });
      if (response?.error) {
        setError("Login failed. Try with a different account.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh_-_40px)] flex justify-center items-center">
      <Card>
        <Box className="p-5">
          <Flex direction="column" gap="5">
            <Flex align="center" gap="4">
              <Link href="/">
                <Image src="/favicon.ico" alt="logo" width="50" height="50" />
              </Link>
              <Heading>Resolute</Heading>
            </Flex>
            <Text>Login using one of the platforms below:</Text>
            {error && <Text>{error}</Text>}
            <Button
              disabled={loading}
              variant="outline"
              onClick={() => handleSignIn("github")}
              size="4"
              color="indigo"
            >
              <Flex align="center" gap="2">
                <span>Sign in with GitHub</span>
                <GitHubLogoIcon />
                {loading && <Spinner />}
              </Flex>
            </Button>

            <Button
              disabled={loading}
              variant="outline"
              onClick={() => handleSignIn("google")}
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
