import authOptions from "@/app/auth/AuthOptions";
import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";

const IssueDetailLoadingPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="2rem">
      <Box className="md:col-span-4">
        <Skeleton width="40%" count={2} />
        <Card className="mt-5">
          <Skeleton count={1} />
        </Card>
      </Box>
      <Flex direction="column" gap="4">
        {session && <Skeleton height={25} />}
        <Skeleton height={30} />
        {session && <Skeleton height={30} />}
        {session && <Skeleton height={30} />}
      </Flex>
    </Grid>
  );
};

export default IssueDetailLoadingPage;
