import BoardColumn from "@/app/_components/BoardColumn";
import prisma from "@/prisma/__mocks__/client";
import { Status } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

vi.mock("@/prisma/client");

describe("BoardColumn", () => {
  const renderComponent = async (title: string, column: Status) => {
    const jsx = await BoardColumn({ title, column });
    render(jsx);
  };
  it.each([
    { title: "Open", column: Status.OPEN },
    { title: "Closed", column: Status.CLOSED },
    { title: "In Progress", column: Status.IN_PROGRESS },
  ])(
    "should display column title, correct length of issues & query DB - $title",
    async ({ title, column }: { title: string; column: Status }) => {
      prisma.issue.findMany.mockResolvedValue(data);

      await renderComponent(title, column);

      expect(prisma.issue.findMany).toHaveBeenCalledWith({
        where: { status: column },
        include: {
          assignedToUser: true,
        },
      });

      expect(screen.getByText(title)).toBeInTheDocument();

      expect(screen.getByText(data.length.toString())).toBeInTheDocument();
    }
  );
});
