"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { IssueBadge } from "../components";

const statuses: { label: string; value?: Status }[] = [
  { label: "all" },
  { label: "open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "in progress", value: "IN_PROGRESS" },
];

const IssuesFilter = () => {
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
