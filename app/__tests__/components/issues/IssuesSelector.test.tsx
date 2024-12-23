import IssuesSelector, {
  StatusArr,
} from "@/app/issues/_components/IssuesSelector";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { describe, expect, it } from "vitest";
const statuses: StatusArr = [
  { label: "open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "in progress", value: "IN_PROGRESS" },
];
describe("IssuesSelector", () => {
  const renderComponent = () => {
    render(
      <IssuesSelector
        selectBy="status"
        secondarySelector="priority"
        options={statuses}
        reset={false}
        resetHandler={() => {}}
      />,
      { wrapper: Theme }
    );
  };
  it("should render a selector", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  it("should expend the selector upon clicking it", async () => {
    renderComponent();
    const selector = screen.getByRole("combobox", { hidden: true });

    const user = userEvent.setup();

    await user.click(selector);

    statuses.forEach((status) => {
      expect(screen.getByText(status.label)).toBeInTheDocument();
    });
  });
  it("should modify url queries to contain current status", async () => {
    mockRouter.push("/issues");
    renderComponent();

    const selector = screen.getByRole("combobox", { hidden: true });
    const user = userEvent.setup();

    statuses.forEach(async (status) => {
      await user.click(selector);

      const issuesPerPageBtn = await screen.findByText(status.label);
      await user.click(issuesPerPageBtn);

      expect(mockRouter.asPath).toContain(`status=${status.value}`);
    });
  });
});
