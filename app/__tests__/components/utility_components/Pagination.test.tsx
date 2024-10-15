import Pagination from "@/app/_utility_components/Pagination";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
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
});
