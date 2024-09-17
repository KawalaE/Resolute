import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
const Comments = async ({ issueId }: { issueId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { assignToIssueId: issueId },
  });
  return (
    <Flex className="md:col-span-4" gap="4" direction="column">
      <Heading>Comments</Heading>
      {comments.map(async (comment) => {
        const user = await prisma.user.findUnique({
          where: { id: comment.assignedToUserId! },
        });
        return (
          <Card key={comment.id}>
            <Flex direction="column" gap="3">
              <Flex align="center" gap="2">
                <Avatar
                  src={user!.image!}
                  fallback={"?"}
                  radius="full"
                  referrerPolicy="no-referrer"
                ></Avatar>
                <Text>{user!.name}</Text>

                <Text color="gray">
                  {comment.createdAt.toLocaleDateString()}
                </Text>
                <Text color="gray">
                  {comment.createdAt.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
              </Flex>
              <Text>{comment.description}</Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default Comments;
