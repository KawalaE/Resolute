import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesFilter from "./IssuesFilter";

const AddIssueButton = () => {
  return (
    <Flex className="mb-5" justify="between">
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
      <IssuesFilter />
    </Flex>
  );
};

export default AddIssueButton;
