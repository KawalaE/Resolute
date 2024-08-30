"use client";
import { Card, Heading } from "@radix-ui/themes";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  openIssues: number;
  closedIssues: number;
  inProgressIssues: number;
}

const Visualization = ({
  openIssues,
  closedIssues,
  inProgressIssues,
}: Props) => {
  const data = [
    { name: "open", value: openIssues, fill: "#eb8e90" },
    { name: "closed", value: closedIssues, fill: "#adddc0" },
    { name: "in progress", value: inProgressIssues, fill: "#ffc182" },
  ];
  return (
    <Card>
      <Heading>Stats</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={730} height={250}>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Visualization;
