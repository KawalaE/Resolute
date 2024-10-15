import IssueBadge from "@/app/_utility_components/IssueBadge";
import { Status } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("IssueBadge", () => {
  it.each<{ status: Status }>([
    { status: "OPEN" },
    { status: "CLOSED" },
    { status: "IN_PROGRESS" },
  ])("should render $status badge for each status", ({ status }) => {
    render(<IssueBadge status={status} />);
    expect(
      screen.getByText(new RegExp(status.replace(/_/g, " "), "i"))
    ).toBeInTheDocument();
  });
});
