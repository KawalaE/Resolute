"use client";
import { Priority, Status } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { IssueBadge } from "../components";
import { PriorityBadge } from "../components/PriorityBadge";

const statuses: { label: string; value?: Status }[] = [
  { label: "all" },
  { label: "open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "in progress", value: "IN_PROGRESS" },
];
const priorities: { label: string; value?: Priority }[] = [
  { label: "all" },
  { label: "low", value: "LOW" },
  { label: "medium", value: "MEDIUM" },
  { label: "high", value: "HIGH" },
];

const IssuesFilter = () => {
  return (
    <Flex gap="5">
      <StatusSelector />
      <PrioritySelector />
    </Flex>
  );
};

const PrioritySelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("priority") || ""}
      onValueChange={(priority) => {
        const params = new URLSearchParams();
        if (priority) params.append("priority", priority);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by priority..." />
      <Select.Content variant="soft">
        {priorities.map((priority) => (
          <Select.Item key={priority.label} value={priority?.value || "all"}>
            {priority.label === "all" ? (
              "all priorities"
            ) : (
              <PriorityBadge priority={priority.value!} />
            )}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const StatusSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        if (searchParams.get("priority"))
          params.append("priority", searchParams.get("priority")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content variant="soft">
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
