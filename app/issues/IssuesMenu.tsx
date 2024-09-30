"use client";
import { Box, Button, Grid } from "@radix-ui/themes";

import Link from "next/link";
import { useState } from "react";
import IssuesFilter from "./IssuesFilter";
import IssuesSearchBar from "./IssuesSearchBar";

const IssuesMenu = () => {
  const [reset, setReset] = useState(false);
  return (
    <Grid columns={{ initial: "1", sm: "3" }} gap="2rem">
      <Grid columns={{ initial: "1", sm: "2" }} gap="2rem">
        <Button>
          <Link href={"/issues/new"}>{"New Issue"}</Link>
        </Button>

        <IssuesSearchBar reset={reset} resetHandler={setReset} />
      </Grid>

      <Box className="md:col-span-2">
        <IssuesFilter reset={reset} resetHandler={setReset} />
      </Box>
    </Grid>
  );
};

export default IssuesMenu;
