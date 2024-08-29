import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueBadge, Link } from "./components";

const RecentIssues = async () => {
  const newIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    //eager loading
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading m="2" mb="3">
        Recent Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {newIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="4">
                    <Link href={"/issues/" + issue.id} label={issue.title} />
                    <IssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      radius="full"
                      size="2"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default RecentIssues;
