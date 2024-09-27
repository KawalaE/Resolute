"use client";
import { IssueBadge } from "@/app/components";
import { PriorityBadge } from "@/app/components/PriorityBadge";
import { Issue } from "@prisma/client";
import { Flex, Heading, ScrollArea, Spinner, Text } from "@radix-ui/themes";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const issueLength = issue.description.length;
  useEffect(() => setMounted(true), []);

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2">
        <IssueBadge status={issue.status} />
        <PriorityBadge priority={issue.priority} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <ScrollArea
        className="max-w-full"
        scrollbars="vertical"
        style={{ maxHeight: 250 }}
      >
        {!mounted && <Spinner />}
        {mounted && (
          <MarkdownPreview
            source={issue.description}
            style={{ padding: 16, background: "#00000000" }}
            wrapperElement={{
              "data-color-mode": resolvedTheme === "dark" ? "dark" : "light",
            }}
          ></MarkdownPreview>
        )}
      </ScrollArea>
    </>
  );
};

export default IssueDetail;
