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
  const renderComponent = () => {
    render(
      <PieChartVisualization
        statsData={mockStats}
        title={mockTitle}
        angleS={180}
        angleE={0}
      />
    );
  };
  it("should render a title of the chart", () => {
    renderComponent();

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });
  it("should render a legend", () => {
    renderComponent();
    mockStats.forEach(async (data) => {
      const legend = await screen.findByText(data.name);
      expect(legend).toBeInTheDocument();
    });
  });
});
