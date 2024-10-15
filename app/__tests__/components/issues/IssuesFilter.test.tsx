import IssuesFilter from "@/app/issues/_components/IssuesFilter";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("IssuesFilter", () => {
  const renderComponent = () => {
    render(<IssuesFilter reset={false} resetHandler={() => {}} />, {
      wrapper: Theme,
    });
  };
  it("should render three selector elements", () => {
    renderComponent();
    const selectors = screen.getAllByRole("combobox");
    expect(selectors.length).toBe(3);
  });
  it("should render one reset button", () => {
    renderComponent();

    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });
});
