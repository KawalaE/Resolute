import { Flex, Grid } from "@radix-ui/themes";
import IssuesStats from "./IssuesStats";
import RecentIssues from "./RecentIssues";
import { statsData } from "./stats/page";

export default async function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <RecentIssues />
      <Flex direction="column" gap="5" justify="between">
        <IssuesStats
          openIssues={(await statsData()).openIssues}
          closedIssues={(await statsData()).closedIssues}
          inProgressIssues={(await statsData()).inProgressIssues}
        />
        {/* <Visualization
          openIssues={(await statsData()).openIssues}
          closedIssues={(await statsData()).closedIssues}
          inProgressIssues={(await statsData()).inProgressIssues}
        /> */}
      </Flex>
    </Grid>
  );
}
