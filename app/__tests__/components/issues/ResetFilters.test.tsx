import ResetFilters from "@/app/issues/_components/ResetFilters";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ResetFilters", () => {
  const renderComponent = () => {
    render(<ResetFilters reset={false} resetHandler={() => {}} />);
  };
  it("should render a button component", () => {
    renderComponent();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("should have name idicating reset function", () => {
    renderComponent();

    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });
});
