import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesFilter from "./IssuesFilter";
import IssuesSearchBar from "./IssuesSearchBar";

const IssuesMenu = () => {
  return (
    <Flex justify="between">
      <Flex gap="6" align="center">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
        <IssuesSearchBar />
      </Flex>
      <IssuesFilter />
    </Flex>
  );
};

export default IssuesMenu;
