import DeleteIssuse from "@/app/issues/[id]/_components/DeleteIssuse";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { describe, expect, it, vi } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

vi.mock("axios");

describe("DeleteIssue", () => {
  const renderComponent = () => {
    render(<DeleteIssuse issueId={data[0].id} />, {
      wrapper: MemoryRouterProvider,
    });
  };
  it("should render a delete button", () => {
    renderComponent();

    expect(screen.getByText(/delete/i));
  });

  it("should display a description, informing user of the consequences of deleting issue", async () => {
    renderComponent();

    const user = userEvent.setup();
    const deleteBtn = screen.getByText(/delete/i);
    await user.click(deleteBtn);

    //render cancel button and delete button
    expect(screen.getByText(/remove/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
  it("should close modal after clicking cancel button", async () => {
    renderComponent();

    const user = userEvent.setup();
    const deleteBtn = screen.getByText(/delete/i);
    await user.click(deleteBtn);

    const cancel = screen.getByRole("button", { name: /cancel/i });

    await user.click(cancel);

    expect(screen.queryByText(/remove/i)).not.toBeInTheDocument();
  });
  it("should redirect to issues page after clicking delete button", async () => {
    renderComponent();

    const user = userEvent.setup();
    const deleteBtn = screen.getByText(/delete/i);
    await user.click(deleteBtn);

    const deleteIssueBtn = screen.getByLabelText("delete-btn");
    screen.debug();
    await user.click(deleteIssueBtn);

    expect(axios.delete).toHaveBeenCalledWith(`/api/issues/${0}`);
  });
});
