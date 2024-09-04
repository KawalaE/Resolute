import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

export const priorityBadgeMap: Record<
  Priority,
  { label: String; color: "red" | "yellow" | "green" }
> = {
  LOW: { label: "low", color: "red" },
  MEDIUM: { label: "medium", color: "yellow" },
  HIGH: { label: "high", color: "green" },
};
export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge color={priorityBadgeMap[priority].color}>
      {priorityBadgeMap[priority].label}
    </Badge>
  );
};
