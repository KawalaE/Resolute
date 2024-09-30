"use client";
import { Grid } from "@radix-ui/themes";
import IssuesPerPageSelector from "./IssuesPerPageSelector";
import IssuesSelector, { PrioritiesArr, StatusArr } from "./IssuesSelector";
import ResetFilters, { Reset } from "./ResetFilters";

const statuses: StatusArr = [
  { label: "open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "in progress", value: "IN_PROGRESS" },
];
const priorities: PrioritiesArr = [
  { label: "low", value: "LOW" },
  { label: "medium", value: "MEDIUM" },
  { label: "high", value: "HIGH" },
];

const IssuesFilter = ({ reset, resetHandler }: Reset) => {
  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap="2rem">
      <IssuesPerPageSelector reset={reset} resetHandler={resetHandler} />

      <IssuesSelector
        selectBy="status"
        secondarySelector="priority"
        options={statuses}
        reset={reset}
        resetHandler={resetHandler}
      />

      <IssuesSelector
        selectBy="priority"
        secondarySelector="status"
        options={priorities}
        reset={reset}
        resetHandler={resetHandler}
      />
      <ResetFilters reset={reset} resetHandler={resetHandler} />
    </Grid>
  );
};

export default IssuesFilter;
