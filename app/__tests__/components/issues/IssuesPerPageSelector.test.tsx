import IssuesPerPageSelector from "@/app/issues/_components/IssuesPerPageSelector";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
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
  it("should modify url queries to contain count of pages", async () => {
    mockRouter.push("/issues");
    renderComponent();

    const selector = screen.getByRole("combobox", { hidden: true });
    const user = userEvent.setup();

    [5, 10, 15, 20].forEach(async (amount) => {
      await user.click(selector);

      const issuesPerPageBtn = await screen.findByText(amount);
      await user.click(issuesPerPageBtn);

      expect(mockRouter.asPath).toContain(`count=${amount}`);
    });
  });
});
