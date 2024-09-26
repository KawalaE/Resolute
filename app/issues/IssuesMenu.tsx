import { Box, Button, Grid } from "@radix-ui/themes";

import Link from "next/link";
import IssuesFilter from "./IssuesFilter";
import IssuesSearchBar from "./IssuesSearchBar";

const IssuesMenu = () => {
  return (
    <Grid columns={{ initial: "1", sm: "3" }} gap="2rem">
      <Grid columns={{ initial: "1", sm: "2" }} gap="2rem">
        <Button>
          <Link href={"/issues/new"}>{"New Issue"}</Link>
        </Button>

        <IssuesSearchBar />
      </Grid>

      <Box className="md:col-span-2">
        <IssuesFilter />
      </Box>
    </Grid>
  );
};

export default IssuesMenu;
