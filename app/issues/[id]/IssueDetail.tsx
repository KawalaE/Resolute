"use client";
import { IssueBadge } from "@/app/components";
import { PriorityBadge } from "@/app/components/PriorityBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
const IssueDetail = ({ issue }: { issue: Issue }) => {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="max-w-full">
        <MarkdownPreview
          source={issue.description}
          style={{ padding: 16, background: "#00000000" }}
          wrapperElement={{
            "data-color-mode": resolvedTheme,
          }}
        ></MarkdownPreview>
      </Card>
    </>
  );
};

export default IssueDetail;
