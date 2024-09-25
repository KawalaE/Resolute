import { Issue } from "@prisma/client";
import { Avatar, Box, Card, Flex } from "@radix-ui/themes";
import Link from "./components/Link";
import { PriorityBadge } from "./components/PriorityBadge";

const BoardTask = ({ issue }: { issue: Issue }) => {
  return (
    <Card>
      <Flex justify="between" align="center" gap="6">
        <Flex align="center" gap="4">
          <Flex direction="column">
            <Link href={`/issues/${issue.id}`} label={issue.title} />
            <Box>
              <PriorityBadge priority={issue.priority} />
            </Box>
          </Flex>
        </Flex>

        {issue.assignedToUserId && (
          <Box>
            <Avatar
              src={issue.assignedToUser.image}
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
