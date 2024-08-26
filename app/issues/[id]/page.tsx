import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssuse from "./DeleteIssuse";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();

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
        <EditButton issueId={issue.id} />
        <DeleteIssuse issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
