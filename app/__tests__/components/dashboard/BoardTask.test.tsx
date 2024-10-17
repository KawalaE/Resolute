import BoardTask from "@/app/_components/BoardTask";
import { Issue } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

describe("BoardTask", () => {
  const renderComponent = (issue: Issue) => {
    render(<BoardTask issue={issue} />);
  };

  it("should render issue title", () => {
    renderComponent(data[0]);
    screen.debug();
    expect(screen.getByText(data[0].title));
  });
  it("should render issue priority", () => {
    renderComponent(data[0]);
    screen.debug();
    expect(screen.getByText(new RegExp(data[0].priority, "i")));
  });
  it("should render preview of the issue", async () => {
    renderComponent(data[0]);
    const user = userEvent.setup();

    const title = screen.getByText(data[0].title);
    await user.hover(title);

    expect(screen.findByText(data[0].description));
  });
  it("should render an avatar if issue is assigned to a user", () => {
    renderComponent(data[0]);
    const avatarRoot = document.querySelector(".rt-AvatarRoot");
    expect(avatarRoot).toBeInTheDocument();
  });
  it("should not render an avatar if issue is not assigned to a user", () => {
    renderComponent(data[1]);
    const avatarRoot = document.querySelector(".rt-AvatarRoot");
    expect(avatarRoot).not.toBeInTheDocument();
  });
});
