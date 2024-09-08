import { Priority, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { IssueBadge } from "../components";
import { PriorityBadge } from "../components/PriorityBadge";

export type StatusArr = { label: string; value?: Status }[];
export type PrioritiesArr = { label: string; value?: Priority }[];

interface Props {
  selectBy: "priority" | "status";
  secondarySelector: "priority" | "status";
  options: StatusArr | PrioritiesArr;
}
const IssuesSelector = ({ selectBy, secondarySelector, options }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get(selectBy) || ""}
      onValueChange={(selected) => {
        const params = new URLSearchParams();
        if (selected) params.append(selectBy, selected);

        ["orderBy", "count", secondarySelector].forEach((param) => {
          const value = searchParams.get(param);
          if (value) params.append(param, value);
        });

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder={`Filter by ${selectBy}...`} />
      <Select.Content variant="soft">
        {options.map((option) => (
          <Select.Item key={option.label} value={option?.value || "all"}>
            {option.label === "all" ? (
              "all"
            ) : selectBy === "status" ? (
              <IssueBadge status={option.value!} />
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
