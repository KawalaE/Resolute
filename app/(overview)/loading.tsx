import { Card, Flex, Grid, Heading, Spinner } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  const columns = ["Open", "In Progress", "Closed"];
  const issues = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Grid columns={{ initial: "1", md: "3" }} gap="6">
        {columns.map((column) => (
          <Card key={column} variant="ghost">
            <Flex direction="column" gap="2">
              <Flex align="center" justify="between" gap="3" mb="3">
                <Heading>{column}</Heading>
                <Spinner />
              </Flex>
              {issues.map((issue) => (
                <Card key={issue}>
                  <Skeleton count={2} />
                </Card>
              ))}
            </Flex>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default loading;
