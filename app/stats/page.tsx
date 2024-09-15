import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Visualization from "../Visualization";

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

  return {
    openIssues,
    closedIssues,
    inProgressIssues,
    lowPriority,
    mediumPriority,
    highPriority,
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
  return (
    <Flex direction="column" gap="6">
      <Visualization statsData={statusData} title={"Status"} />
      <Visualization statsData={priorityData} title={"Priority"} />
    </Flex>
  );
};

export default page;
