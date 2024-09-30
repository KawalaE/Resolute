"use client";
import { Grid } from "@radix-ui/themes";
import { useState } from "react";
import IssuesPerPageSelector from "./IssuesPerPageSelector";
import IssuesSelector, { PrioritiesArr, StatusArr } from "./IssuesSelector";
import ResetFilters from "./ResetFilters";

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

const IssuesFilter = () => {
  const [reset, setReset] = useState(false);
  return (
    <Grid columns={{ initial: "1", sm: "4" }} gap="2rem">
      <IssuesPerPageSelector reset={reset} resetHandler={setReset} />

      <IssuesSelector
        selectBy="status"
        secondarySelector="priority"
        options={statuses}
        reset={reset}
        resetHandler={setReset}
      />

      <IssuesSelector
        selectBy="priority"
        secondarySelector="status"
        options={priorities}
        reset={reset}
        resetHandler={setReset}
      />
      <ResetFilters reset={reset} resetHandler={setReset} />
    </Grid>
  );
};

export default IssuesFilter;
