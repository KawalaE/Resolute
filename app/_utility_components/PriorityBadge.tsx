import { Priority } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

export const priorityBadgeMap: Record<
  Priority,
  { label: String; color: "red" | "yellow" | "green" }
> = {
  LOW: { label: "low", color: "green" },
  MEDIUM: { label: "medium", color: "yellow" },
  HIGH: { label: "high", color: "red" },
};
export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge color={priorityBadgeMap[priority].color}>
      {priorityBadgeMap[priority].label}
    </Badge>
  );
};
