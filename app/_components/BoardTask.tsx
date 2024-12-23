"use client";
import {
  Avatar,
  Box,
  Card,
  Flex,
  HoverCard,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import Link from "../_utility_components/Link";
import { PriorityBadge } from "../_utility_components/PriorityBadge";
import MarkdownDisplay from "../issues/[id]/edit/MarkdownDisplay";
import { IssueWithAssignedUser } from "./BoardColumn";

const BoardTask = ({ issue }: { issue: IssueWithAssignedUser }) => {
  return (
    <Card>
      <Flex justify="between" align="center" gap="6">
        <Flex align="center" gap="4">
          <Flex direction="column">
            <Text>
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Text>
                    <Link href={`/issues/${issue.id}`} label={issue.title} />
                  </Text>
                </HoverCard.Trigger>
                <HoverCard.Content>
                  <ScrollArea
                    scrollbars="vertical"
                    size="2"
                    style={{ maxHeight: 150 }}
                  >
                    <MarkdownDisplay
                      fontsize={0.9}
                      contentWidth={200}
                      markdown={issue.description}
                    />
                  </ScrollArea>
                </HoverCard.Content>
              </HoverCard.Root>
            </Text>

            <Box>
              <PriorityBadge priority={issue.priority} />
            </Box>
          </Flex>
        </Flex>

        {issue.assignedToUserId && (
          <Box>
            <Avatar
              alt="User Avatar"
              src={issue.assignedToUser!.image ?? undefined}
              fallback={"?"}
              radius="full"
              referrerPolicy="no-referrer"
            />
          </Box>
        )}
      </Flex>
    </Card>
  );
};
export default BoardTask;
