import { data } from "@/app/__tests__/__mocks__/dataBaseMock";
import RecentIssues from "@/app/stats/RecentIssues";
import prisma from "@/prisma/__mocks__/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/prisma/client");

describe("RecentIssues", () => {
  const renderComponent = async () => {
    const jsx = await RecentIssues();
    render(jsx);
  };
  it("should display a title", async () => {
    prisma.issue.findMany.mockResolvedValue(data);
    await renderComponent();
    expect(screen.getByText(/recent issues/i)).toBeInTheDocument();
  });
  it("should display issues from the DB", async () => {
    prisma.issue.findMany.mockResolvedValue(data);
    await renderComponent();
    data.forEach((issue) => {
      expect(
        screen.getByText(new RegExp(issue.title, "i"))
      ).toBeInTheDocument();
      const status = issue.status.replace(/_/g, " ");
      expect(screen.getByText(new RegExp(status, "i"))).toBeInTheDocument();

      expect(
        screen.getByText(new RegExp(issue.priority, "i"))
      ).toBeInTheDocument();
    });
  });
});
