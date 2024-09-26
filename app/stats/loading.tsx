import { Card, Grid, Heading, Spinner } from "@radix-ui/themes";
import RecentIssuesSkeleton from "../RecentIssuesSkeleton";
const loading = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Card>
        <Heading>Status</Heading>
        <Spinner size="3" />
      </Card>
      <RecentIssuesSkeleton />
      <Card>
        <Heading>Assigned issues</Heading>
        <Spinner size="3" />
      </Card>
      <Card>
        <Heading>Priority</Heading>
        <Spinner size="3" />
      </Card>
    </Grid>
  );
};

export default loading;
