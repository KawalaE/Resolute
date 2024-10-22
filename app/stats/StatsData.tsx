import prisma from "@/prisma/client";

const StatsData = async () => {
  const openIssues = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const lowPriority = await prisma.issue.count({
    where: { priority: "LOW" },
  });
  const mediumPriority = await prisma.issue.count({
    where: { priority: "MEDIUM" },
  });
  const highPriority = await prisma.issue.count({
    where: { priority: "HIGH" },
  });
  const assignedIssues = await prisma.issue.count({
    where: { assignedToUserId: { not: null } },
  });

  const notAssignedIssues = await prisma.issue.count({
    where: { assignedToUserId: null },
  });

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
