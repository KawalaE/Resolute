import { IssueBadge } from "@/app/_utility_components";
import { PriorityBadge } from "@/app/_utility_components/PriorityBadge";
import { Issue } from "@prisma/client";
import { Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import MarkdownDisplay from "./MarkdownDisplay";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" wrap="wrap">
        <IssueBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <ScrollArea
        className="max-w-full"
        scrollbars="vertical"
        style={{ maxHeight: 250 }}
      >
        <MarkdownDisplay markdown={issue.description} />
      </ScrollArea>
    </>
  );
};

export default IssueDetail;
