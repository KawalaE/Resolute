import IssuesSearchBar from "@/app/issues/_components/IssuesSearchBar";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

describe("IssuesSearchBar", () => {
  const renderComponent = () => {
    render(<IssuesSearchBar reset={false} resetHandler={() => {}} />);
  };
  it("should display a searchbar", () => {
    renderComponent();
    const inputField = screen.getByPlaceholderText(/search/i);
    expect(inputField).toBeInTheDocument();
  });
  it("should display typed value", async () => {
    renderComponent();
    const inputField = screen.getByPlaceholderText(/search/i);
    const value = "Issue";
    const user = userEvent.setup();
    await user.type(inputField, value);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});
