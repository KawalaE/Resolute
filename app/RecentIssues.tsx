import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading } from "@radix-ui/themes";
import { IssueBadge, Link } from "./components";
import { PriorityBadge } from "./components/PriorityBadge";

const RecentIssues = async () => {
  const newIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    //eager loading
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading m="2" mb="3">
        Most Recent Issues
      </Heading>
      {newIssues.map((issue) => (
        <Card key={issue.id} mb="2">
          <Flex justify="between" align="center">
            <Flex direction="column" align="start" gap="4">
              <Link href={"/issues/" + issue.id} label={issue.title} />
              <Flex gap="2">
                <IssueBadge status={issue.status} />
                <PriorityBadge priority={issue.priority} />
              </Flex>
            </Flex>
            {issue.assignedToUser && (
              <Avatar
                src={issue.assignedToUser.image!}
                fallback="?"
                radius="full"
              />
            )}
          </Flex>
        </Card>
      ))}
    </Card>
  );
};

export default RecentIssues;
