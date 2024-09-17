import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

const Comments = async ({ issueId }: { issueId: number }) => {
  const session = await getServerSession(authOptions);

  const comments = await prisma.comment.findMany({
    where: { assignToIssueId: issueId },
  });
  const updateComment = async (
    currentComment: Comment,
    commentUpdate: string
  ) => {
    "use server";
    await prisma.comment.update({
      where: { id: currentComment.id },
      data: {
        description: commentUpdate,
      },
    });
    redirect(`/issues/${issueId}`);
  };
  const deleteComment = async (currentComment: Comment) => {
    "use server";
    await prisma.comment.delete({
      where: { id: currentComment.id },
    });
    redirect(`/issues/${issueId}`);
  };
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
                <Flex gap="2">
                  <UpdateComment
                    author={user}
                    currentComment={comment}
                    updateComment={updateComment}
                  />
                  <DeleteComment
                    author={user}
                    currentComment={comment}
                    deleteComment={deleteComment}
                  />
                </Flex>
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
