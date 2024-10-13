import PieChartVisualization from "@/app/stats/PieChartVisualization";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
describe("PieChartVisualization", () => {
  const mockTitle = "Mock stats";
  const mockStats = [
    {
      name: "closed",
      value: 30,
      fill: "#646464",
    },
    {
      name: "in progress",
      value: 1,
      fill: "#d19dff",
    },
  ];

  it("should render a title of the chart", () => {
    render(
      <PieChartVisualization
        statsData={mockStats}
        title={mockTitle}
        angleS={180}
        angleE={0}
      />
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });
});
