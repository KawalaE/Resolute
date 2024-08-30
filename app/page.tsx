import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesStats from "./IssuesStats";
import RecentIssues from "./RecentIssues";
import Visualization from "./Visualization";

export default async function Home() {
  const openIssues = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <RecentIssues />
      <Flex direction="column" gap="5" justify="between">
        <IssuesStats
          openIssues={openIssues}
          closedIssues={closedIssues}
          inProgressIssues={inProgressIssues}
        />
        <Visualization
          openIssues={openIssues}
          closedIssues={closedIssues}
          inProgressIssues={inProgressIssues}
        />
      </Flex>
    </Grid>
  );
}
