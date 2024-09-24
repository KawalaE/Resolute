import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TokensIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { PriorityBadge } from "./components/PriorityBadge";

const Task = ({ issue }: { issue: Issue }) => {
  return (
    <Card>
      <Flex justify="between" align="center" gap="6">
        <Flex align="center" gap="4">
          <IconButton color="indigo" variant="soft">
            <TokensIcon width="18" height="18" />
          </IconButton>

          <Flex direction="column">
            <Text>{issue.title}</Text>
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

const BoardColumn = async ({
  title,
  column,
}: {
  title: string;
  column: Status;
}) => {
  const issues = await prisma.issue.findMany({
    where: { status: column },
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card variant="ghost">
      <Heading>{title}</Heading>
      {issues.map((issue) => {
        return <Task key={issue.id} issue={issue}></Task>;
      })}
    </Card>
  );
};

const Board = () => {
  return (
    <Flex justify="between" gap="6">
      <BoardColumn title="Open" column="OPEN" />
      <BoardColumn title="In Progress" column="IN_PROGRESS" />
      <BoardColumn title="Closed" column="CLOSED" />
    </Flex>
  );
};

export default Board;
