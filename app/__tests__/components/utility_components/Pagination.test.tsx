import Pagination from "@/app/_utility_components/Pagination"; // Adjust this path based on your setup
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest"; // Vitest functions for testing
// Mock the next/navigation functions
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams("?page=2"),
}));

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
});
