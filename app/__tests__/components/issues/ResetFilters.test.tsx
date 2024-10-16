import ResetFilters from "@/app/issues/_components/ResetFilters";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { describe, expect, it } from "vitest";

describe("ResetFilters", () => {
  const renderComponent = () => {
    render(<ResetFilters reset={false} resetHandler={() => {}} />, {
      wrapper: MemoryRouterProvider,
    });
  };
  it("should render a button component", () => {
    renderComponent();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("should have name idicating reset function", () => {
    renderComponent();

    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });
  it("should reset the path by removing additional queries from url", async () => {
    renderComponent();
    //simulate a path with additional queries
    mockRouter.push("/issues?count=5&priority=MEDIUM&status=CLOSED");

    const resetBtn = screen.getByText(/reset/i);
    const user = userEvent.setup();
    await user.click(resetBtn);

    expect(mockRouter.asPath).toEqual("/issues");
  });
});
