"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { IssueBadge } from "../components";

const IssuesFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "all" },
    { label: "open", value: "OPEN" },
    { label: "closed", value: "CLOSED" },
    { label: "in progress", value: "IN_PROGRESS" },
  ];
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status?.value || "all"}>
            {status.label === "all" ? (
              "all issues"
            ) : (
              <IssueBadge status={status.value!} />
            )}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesFilter;
