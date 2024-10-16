import Pagination from "@/app/_utility_components/Pagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { describe, expect, it } from "vitest";

describe("Pagination", () => {
  const renderComponent = (
    itemCount: number,
    pageSize: number,
    currentPage: number
  ) => {
    render(
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    );
  };
  it("should render information about current page", () => {
    renderComponent(12, 6, 1);
    expect(
      screen.getByText(/page 1 of 2/i, { selector: ".rt-Text" })
    ).toBeInTheDocument();
  });
  it("should not render information about current page if itemCount < pageSize", () => {
    renderComponent(6, 12, 1);
    expect(
      screen.queryByText(/page/i, { selector: ".rt-Text" })
    ).not.toBeInTheDocument();
  });
  it("should render left button", () => {
    renderComponent(30, 5, 2);
    expect(screen.getByLabelText("left")).toBeInTheDocument();
  });
  it("should be disabled while on first page - left button/double left", () => {
    renderComponent(30, 5, 1);

    const leftBtn = screen.getByLabelText("left");
    const doubleLeftBtn = screen.getByLabelText("double-left");

    expect(leftBtn).toBeDisabled();
    expect(doubleLeftBtn).toBeDisabled();
  });
  it("should not be disabled while page > 1 - left button/double left", () => {
    renderComponent(30, 5, 3);

    const leftBtn = screen.getByLabelText("left");
    const doubleLeftBtn = screen.getByLabelText("double-left");

    expect(leftBtn).not.toBeDisabled();
    expect(doubleLeftBtn).not.toBeDisabled();
  });
  it("should change url query, to previous page on click - left button", async () => {
    mockRouter.push("/issues?page=2");
    renderComponent(30, 5, 2);
    const leftBtn = screen.getByLabelText("left");

    const user = userEvent.setup();
    await user.click(leftBtn);

    expect(mockRouter.asPath).toContain("page=1");
    expect(mockRouter.asPath).not.toContain("page=2");
  });
  it("should change url query, to the first page on click - double left button", async () => {
    mockRouter.push("/issues?page=5");
    renderComponent(30, 5, 2);
    const doubleLeftBtn = screen.getByLabelText("double-left");

    const user = userEvent.setup();
    await user.click(doubleLeftBtn);

    expect(mockRouter.asPath).toContain("page=1");
    expect(mockRouter.asPath).not.toContain("page=5");
  });
  it("should be disabled while on last page - right button/double right", () => {
    renderComponent(30, 5, 6);

    const leftBtn = screen.getByLabelText("right");
    const doubleLeftBtn = screen.getByLabelText("double-right");

    expect(leftBtn).toBeDisabled();
    expect(doubleLeftBtn).toBeDisabled();
  });
  it("should not be disabled while page < last - right button/double right", () => {
    renderComponent(30, 5, 3);

    const leftBtn = screen.getByLabelText("right");
    const doubleLeftBtn = screen.getByLabelText("double-right");

    expect(leftBtn).not.toBeDisabled();
    expect(doubleLeftBtn).not.toBeDisabled();
  });
  it("should change url query, to the next page on click - right button", async () => {
    mockRouter.push("/issues?page=2");
    renderComponent(30, 5, 2);
    const rightBtn = screen.getByLabelText("right");

    const user = userEvent.setup();
    await user.click(rightBtn);

    expect(mockRouter.asPath).toContain("page=3");
    expect(mockRouter.asPath).not.toContain("page=2");
  });
  it("should change url query, to the last page on click - double right button", async () => {
    mockRouter.push("/issues?page=2");
    renderComponent(30, 5, 2);
    const doubleRightBtn = screen.getByLabelText("double-right");

    const user = userEvent.setup();
    await user.click(doubleRightBtn);

    expect(mockRouter.asPath).toContain("page=6");
    expect(mockRouter.asPath).not.toContain("page=2");
  });
});
