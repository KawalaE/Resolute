import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
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
    <Grid columns={{ initial: "1", sm: "2" }} gap="2rem">
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
