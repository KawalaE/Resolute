import { Priority, Status } from "@prisma/client";
import { Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IssueBadge } from "../components";
import { PriorityBadge } from "../components/PriorityBadge";
export type StatusArr = { label: string; value?: Status }[];
export type PrioritiesArr = { label: string; value?: Priority }[];

interface Props {
  selectBy: "priority" | "status";
  secondarySelector: "priority" | "status";
  options: StatusArr | PrioritiesArr;
  reset: boolean;
  resetHandler: (value: boolean) => void;
}

const IssuesSelector = ({
  selectBy,
  secondarySelector,
  options,
  reset,
  resetHandler,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initial, setInitial] = useState(false);

  return (
    <Select.Root
      value={reset || !initial ? "" : searchParams.get(selectBy) || ""}
      onValueChange={(selected) => {
        resetHandler(false);
        setInitial(true);
        const params = new URLSearchParams();
        if (selected && selected !== "all") params.append(selectBy, selected);

        ["orderBy", "count", secondarySelector, "phrase"].forEach((param) => {
          const value = searchParams.get(param);
          if (value) params.append(param, value);
        });

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder={`Filter by ${selectBy}...`} />
      <Select.Content variant="soft">
        <Select.Item value={"all"}>
          <Text color="gray">all</Text>
        </Select.Item>
        {options.map((option) => (
          <Select.Item key={option.label} value={option.value!}>
            {selectBy === "status" ? (
              <IssueBadge status={option.value} />
            ) : (
              <PriorityBadge priority={option.value!} />
            )}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesSelector;
