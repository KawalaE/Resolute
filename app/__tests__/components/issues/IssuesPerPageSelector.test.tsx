import IssuesPerPageSelector from "@/app/issues/_components/IssuesPerPageSelector";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
describe("IssuesPerPageSelector", () => {
  const renderComponent = () => {
    render(<IssuesPerPageSelector reset={false} resetHandler={() => {}} />, {
      wrapper: Theme,
    });
  };
  it("should display a selector", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  it("should expend the selector upon clicking it", async () => {
    renderComponent();
    const selector = screen.getByRole("combobox", { hidden: true });

    const user = userEvent.setup();

    await user.click(selector);

    [5, 10, 15, 20].forEach((amount) => {
      expect(screen.getByText(amount)).toBeInTheDocument();
    });
  });
});
