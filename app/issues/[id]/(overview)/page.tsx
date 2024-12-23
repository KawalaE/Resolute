import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelector from "../_components/AssigneeSelector";
import CommentIssue from "../_components/CommentIssue";
import Comments from "../_components/Comments";
import DeleteIssuse from "../_components/DeleteIssuse";
import EditButton from "../_components/EditButton";
import IssueDetail from "../_components/IssueDetail";

interface Props {
  params: { id: string };
}

export const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="2rem">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Flex direction="column" gap="4">
        {session && <AssigneeSelector issue={issue} />}
        <EditButton issueId={issue.id} />
        {session && <DeleteIssuse issueId={issue.id} />}
        {session && <CommentIssue issueId={issue.id} />}
      </Flex>
      <Comments issueId={issue.id} />
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: `Details of issue: ${issue?.title}`,
    openGraph: {
      title: issue?.title,
      description: `Details of issue: ${issue?.title}`,
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: "Resolute Issue Details",
        },
      ],
    },
  };
}
export default IssueDetailPage;
