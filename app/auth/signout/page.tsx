"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-[calc(100vh_-_40px)] flex justify-center items-center ">
      <Card>
        <Box className="p-5">
          <Flex direction="column" gap="5">
            <Flex align="center" gap="4">
              <Link href="/">
                <Image src="/favicon.ico" alt="logo" width="50" height="50" />
              </Link>
              <Heading>Resolute</Heading>
            </Flex>
            <Text>To sign out, click below button:</Text>
            <Button
              variant="outline"
              disabled={loading}
              size="3"
              color="indigo"
              onClick={() => {
                setLoading(true);
                signOut({ callbackUrl: "/", redirect: true });
              }}
            >
              Sign Out
              {loading && <Spinner />}
            </Button>
          </Flex>
        </Box>
      </Card>
    </div>
  );
};

export default Page;
