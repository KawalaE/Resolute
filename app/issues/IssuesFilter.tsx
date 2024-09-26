"use client";
import { Grid } from "@radix-ui/themes";
import IssuesPerPageSelector from "./IssuesPerPageSelector";
import IssuesSelector, { PrioritiesArr, StatusArr } from "./IssuesSelector";
import ResetFilters from "./ResetFilters";

const statuses: StatusArr = [
  { label: "all" },
  { label: "open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "in progress", value: "IN_PROGRESS" },
];
const priorities: PrioritiesArr = [
  { label: "all" },
  { label: "low", value: "LOW" },
  { label: "medium", value: "MEDIUM" },
  { label: "high", value: "HIGH" },
];

const IssuesFilter = () => {
  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap="2rem">
      <IssuesPerPageSelector />

      <IssuesSelector
        selectBy="status"
        secondarySelector="priority"
        options={statuses}
      />

      <IssuesSelector
        selectBy="priority"
        secondarySelector="status"
        options={priorities}
      />
      <ResetFilters />
    </Grid>
  );
};

export default IssuesFilter;
