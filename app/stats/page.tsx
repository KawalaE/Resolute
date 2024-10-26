import { Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import PieChartVisualization from "./PieChartVisualization";
import RecentIssues from "./RecentIssues";
import StatsData from "./StatsData";
export const dynamic = "force-dynamic";

const page = async () => {
  const statusData = [
    { name: "open", value: (await StatsData()).openIssues, fill: "#70b8ff" },
    {
      name: "closed",
      value: (await StatsData()).closedIssues,
      fill: "#646464",
    },
    {
      name: "in progress",
      value: (await StatsData()).inProgressIssues,
      fill: "#d19dff",
    },
  ];
  const priorityData = [
    { name: "low", value: (await StatsData()).lowPriority, fill: "#adddc0" },
    {
      name: "medium",
      value: (await StatsData()).mediumPriority,
      fill: "#ffc182",
    },
    {
      name: "high",
      value: (await StatsData()).highPriority,
      fill: "#eb8e90",
    },
  ];

  const assignedData = [
    {
      name: "assigned",
      value: (await StatsData()).assignedIssues,
      fill: "#29b09b",
    },
    {
      name: "not assigned",
      value: (await StatsData()).notAssignedIssues,
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

export const metadata: Metadata = {
  title: "Resolute - Stats",
  description: `View detailed statistics on issue status, priority, 
  and assignment, along with a summary of the most recent issues.`,
  openGraph: {
    title: "Resolute - Stats",
    description: `Detailed statistics and summaries on issues.`,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Resolute Issue Tracker Statistics",
      },
    ],
  },
};

export default page;
