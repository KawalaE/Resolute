import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import BoardTask from "../_components/BoardTask";

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
      <Flex direction="column" gap="2">
        <Flex align="center" justify="between" gap="3" mb="3">
          <Heading>{title}</Heading>
          <Text size="6" color="indigo">
            {issues.length}
          </Text>
        </Flex>

        {issues.map((issue) => {
          return <BoardTask key={issue.id} issue={issue}></BoardTask>;
        })}
      </Flex>
    </Card>
  );
};
export default BoardColumn;
