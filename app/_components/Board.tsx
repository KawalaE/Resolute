import { Grid } from "@radix-ui/themes";
import BoardColumn from "./BoardColumn";
export const dynamic = "force-dynamic";

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
