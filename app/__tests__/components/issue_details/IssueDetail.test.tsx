import IssueDetail from "@/app/issues/[id]/_components/IssueDetail";
import { Issue } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

describe("IssueDetail", () => {
  const renderComponent = ({ issue }: { issue: Issue }) => {
    render(<IssueDetail issue={issue} />);
  };

  data.forEach((issue) => {
    it("should render a title of the issue", () => {
      renderComponent({ issue });
      expect(screen.getByText(issue.title)).toBeInTheDocument();
    });

    it("should render issue status", () => {
      renderComponent({ issue });
      const status = issue.status;
      expect(
        screen.getByText(new RegExp(status.replace(/_/g, " "), "i"))
      ).toBeInTheDocument();
    });

    it("should render issue priority", () => {
      renderComponent({ issue });
      const priority = issue.priority;
      expect(screen.getByText(new RegExp(priority, "i"))).toBeInTheDocument();
    });

    it("should render issue date", () => {
      renderComponent({ issue });
      const date = issue.createdAt;
      expect(screen.getByText(date.toDateString())).toBeInTheDocument();
    });

    it("should render issue description", () => {
      renderComponent({ issue });
      const description = issue.description;
      expect(
        screen.getByText(new RegExp(description, "i"))
      ).toBeInTheDocument();
    });
  });
});
