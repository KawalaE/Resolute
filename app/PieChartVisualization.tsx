"use client";
import { Card, Heading } from "@radix-ui/themes";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface statsInstance {
  name: string;
  value: number;
  fill: string;
}

interface Props {
  statsData: statsInstance[];
  title: string;
  angleS: number;
  angleE: number;
}

const PieChartVisualization = ({ statsData, title, angleS, angleE }: Props) => {
  return (
    <Card>
      <Heading>{title}</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={730} height={250}>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip />
          <Pie
            data={statsData}
            dataKey="value"
            startAngle={angleS}
            endAngle={angleE}
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

export default PieChartVisualization;
