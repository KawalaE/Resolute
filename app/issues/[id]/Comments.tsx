import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";

const Comments = async ({ issueId }: { issueId: number }) => {
  const comments = await prisma.comment.findMany({
    where: { assignToIssueId: issueId },
  });
  return (
    <Flex className="md:col-span-4" gap="4" direction="column">
      <Heading>Comments</Heading>
      {comments.map((comment) => (
        <Card key={comment.id}>{comment.description}</Card>
      ))}
    </Flex>
  );
};

export default Comments;
