import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from "@radix-ui/themes";

import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

const Comments = async ({ issueId }: { issueId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { assignToIssueId: issueId },
  });

  return (
    <Flex className="md:col-span-4" gap="4" direction="column">
      {comments.length > 0 && <Heading>Comments</Heading>}
      {comments.map(async (comment) => {
        const user = await prisma.user.findUnique({
          where: { id: comment.assignedToUserId! },
        });

        return (
          <Card key={comment.id}>
            <Flex direction="column" gap="3">
              <Flex justify="between">
                <Flex align="center" gap="2" wrap="wrap">
                  <Flex gap="2" align="center">
                    <Avatar
                      src={user!.image!}
                      fallback={"?"}
                      radius="full"
                      referrerPolicy="no-referrer"
                    ></Avatar>
                    <Text>{user!.name}</Text>
                  </Flex>
                  <Flex gap="2" align="center">
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
                </Flex>
                {user && (
                  <Flex gap="2">
                    <UpdateComment author={user} currentComment={comment} />
                    <DeleteComment author={user} currentComment={comment} />
                  </Flex>
                )}
              </Flex>
              <ScrollArea
                className="max-w-full"
                scrollbars="vertical"
                style={{ maxHeight: 120 }}
              >
                {comment.description}
              </ScrollArea>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default Comments;
