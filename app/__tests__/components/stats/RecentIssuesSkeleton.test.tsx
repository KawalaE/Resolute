import RecentIssuesSkeleton from "@/app/stats/RecentIssuesSkeleton";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("RecentIssuesSkeleton", () => {
  const renderComponent = () => {
    render(<RecentIssuesSkeleton />);
  };

  it("should display a heading", () => {
    renderComponent();

    const heading = screen.getByText(/issues/i);
    expect(heading).toBeInTheDocument();
  });
  it("should display at least one card-skeleton", () => {
    renderComponent();

    const skeletons = document.querySelectorAll(".react-loading-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
