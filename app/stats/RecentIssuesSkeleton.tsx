import { Card, Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const RecentIssuesSkeleton = () => {
  const newIssues = [1, 2, 3];
  return (
    <Card>
      <Heading m="2" mb="3">
        Most Recent Issues
      </Heading>
      {newIssues.map((issue) => (
        <Card key={issue} mb="2">
          <Skeleton count={2} />
        </Card>
      ))}
    </Card>
  );
};

export default RecentIssuesSkeleton;
