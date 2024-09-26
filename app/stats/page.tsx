import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import delay from "delay";
import PieChartVisualization from "../PieChartVisualization";
import RecentIssues from "../RecentIssues";

export const statsData = async () => {
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

const page = async () => {
  const statusData = [
    { name: "open", value: (await statsData()).openIssues, fill: "#70b8ff" },
    {
      name: "closed",
      value: (await statsData()).closedIssues,
      fill: "#646464",
    },
    {
      name: "in progress",
      value: (await statsData()).inProgressIssues,
      fill: "#d19dff",
    },
  ];
  const priorityData = [
    { name: "low", value: (await statsData()).lowPriority, fill: "#adddc0" },
    {
      name: "medium",
      value: (await statsData()).mediumPriority,
      fill: "#ffc182",
    },
    {
      name: "high",
      value: (await statsData()).highPriority,
      fill: "#eb8e90",
    },
  ];
  await delay(4000);
  const assignedData = [
    {
      name: "assigned",
      value: (await statsData()).assignedIssues,
      fill: "#29b09b",
    },
    {
      name: "not assigned",
      value: (await statsData()).notAssignedIssues,
      fill: "#ff7693ed",
    },
  ];

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <PieChartVisualization
        statsData={statusData}
        title={"Status"}
        angleS={0}
        angleE={360}
      />
      <RecentIssues />
      <PieChartVisualization
        statsData={assignedData}
        title={"Assigned issues"}
        angleS={180}
        angleE={0}
      />
      <PieChartVisualization
        statsData={priorityData}
        title={"Priority"}
        angleS={0}
        angleE={360}
      />
    </Grid>
  );
};

export default page;
