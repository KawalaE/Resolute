"use client";
import { IssueBadge } from "@/app/components";
import { PriorityBadge } from "@/app/components/PriorityBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full dark:markdown-dark">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetail;
