import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

export const badgeMap: Record<
  Status,
  { label: String; color: "red" | "orange" | "green" }
> = {
  OPEN: { label: "open", color: "red" },
  IN_PROGRESS: { label: "in progress", color: "orange" },
  CLOSED: { label: "closed", color: "green" },
};
const IssueBadge = ({ status }: { status: Status }) => {
  return <Badge color={badgeMap[status].color}>{badgeMap[status].label}</Badge>;
};

export default IssueBadge;
