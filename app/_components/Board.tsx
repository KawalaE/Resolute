import { Grid } from "@radix-ui/themes";
import React from "react";
import BoardColumn from "./BoardColumn";

const Board = () => {
  return (
    <Grid columns={{ initial: "1", md: "3" }} gap="6">
      <BoardColumn title="Open" column="OPEN" />
      <BoardColumn title="In Progress" column="IN_PROGRESS" />
      <BoardColumn title="Closed" column="CLOSED" />
    </Grid>
  );
};

export default Board;
