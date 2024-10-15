import ResetFilters from "@/app/issues/_components/ResetFilters";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ResetFilters", () => {
  it("should render a button component", () => {
    render(<ResetFilters reset={false} resetHandler={() => {}} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("should have name idicating reset function", () => {
    render(<ResetFilters reset={false} resetHandler={() => {}} />);

    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });
});
