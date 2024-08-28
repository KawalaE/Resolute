import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelector from "./AssigneeSelector";
import DeleteIssuse from "./DeleteIssuse";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
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
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
