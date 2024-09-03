import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

export const badgeMap: Record<
  Status,
  { label: String; color: "blue" | "purple" | "gray" }
> = {
  OPEN: { label: "open", color: "blue" },
  IN_PROGRESS: { label: "in progress", color: "purple" },
  CLOSED: { label: "closed", color: "gray" },
};
const IssueBadge = ({ status }: { status: Status }) => {
  return <Badge color={badgeMap[status].color}>{badgeMap[status].label}</Badge>;
};

export default IssueBadge;
