import IssueTable from "@/app/issues/_components/IssueTable";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

describe("IssueTable", () => {
  it("should display a table with issues", () => {
    render(<IssueTable searchParams={{}} issues={data} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  it("should display correct headers", () => {
    render(<IssueTable searchParams={{}} issues={data} />);
    const headers = ["title", "status", "priority", "created"];

    headers.forEach((header) => {
      expect(screen.getByText(new RegExp(header, "i"))).toBeInTheDocument();
    });
  });
  it("should display all issues", () => {
    render(<IssueTable searchParams={{}} issues={data} />);

    data.forEach((issue) => {
      expect(
        screen.getByText(new RegExp(issue.title, "i"))
      ).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(issue.status, "i")).length).toBe(2);
      expect(screen.getAllByText(new RegExp(issue.priority, "i")).length).toBe(
        2
      );
      expect(
        screen.getByText(new RegExp(issue.createdAt.toDateString(), "i"))
      ).toBeInTheDocument();
    });
  });
});
