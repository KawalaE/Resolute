"use client";
import { Flex } from "@radix-ui/themes";
import IssuesSelector, { PrioritiesArr, StatusArr } from "./IssuesSelector";

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
    <Flex gap="5">
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
    </Flex>
  );
};

export default IssuesFilter;
