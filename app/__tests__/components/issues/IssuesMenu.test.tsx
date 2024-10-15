import IssuesMenu from "@/app/issues/_components/IssuesMenu";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("IsseusMenu", () => {
  const renderComponent = () => {
    render(<IssuesMenu />, { wrapper: Theme });
  };
  it("should render 'New Issues' button", () => {
    renderComponent();

    expect(screen.getByText(/new issue/i)).toBeInTheDocument();
  });
  it("should render a searchbar", () => {
    renderComponent();
    const inputField = screen.getByPlaceholderText(/search/i);
    expect(inputField).toBeInTheDocument();
  });
  it("should render three selector elements", () => {
    renderComponent();
    const selectors = screen.getAllByRole("combobox");
    expect(selectors.length).toBe(3);
  });
});
