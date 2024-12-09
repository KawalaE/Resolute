import prisma from "@/prisma/client";

const StatsData = async () => {
  const [
    openIssues,
    closedIssues,
    inProgressIssues,
    lowPriority,
    mediumPriority,
    highPriority,
    assignedIssues,
    notAssignedIssues,
  ] = await Promise.all([
    prisma.issue.count({ where: { status: "OPEN" } }),
    prisma.issue.count({ where: { status: "CLOSED" } }),
    prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    prisma.issue.count({ where: { priority: "LOW" } }),
    prisma.issue.count({ where: { priority: "MEDIUM" } }),
    prisma.issue.count({ where: { priority: "HIGH" } }),
    prisma.issue.count({
      where: { assignedToUserId: { not: null } },
    }),
    prisma.issue.count({
      where: { assignedToUserId: null },
    }),
  ]);

  return {
    openIssues,
    closedIssues,
    inProgressIssues,
    lowPriority,
    mediumPriority,
    highPriority,
    assignedIssues,
    notAssignedIssues,
  };
};
export default StatsData;
