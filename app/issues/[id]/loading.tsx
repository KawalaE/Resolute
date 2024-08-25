import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const IssueDetailLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="4" my="2">
        <Skeleton width="4rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoadingPage;
