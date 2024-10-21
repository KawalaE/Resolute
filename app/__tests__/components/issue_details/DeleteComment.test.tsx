import DeleteComment from "@/app/issues/[id]/_components/DeleteComment";
import { User } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useSession } from "next-auth/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { comments, users } from "../../__mocks__/dataBaseMock";

vi.mock("axios");

describe("DeleteComment", () => {
  const author: User = users[0];
  const currentComment: Comment = comments[0];

  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: {
          id: author.id,
          name: author.name,
        },
      },
      status: "authenticated", // or "loading" depending on your test case
    });
  });
  const renderComponent = () => {
    render(<DeleteComment author={author} currentComment={currentComment} />);
  };
  const clickDelete = async () => {
    render(<DeleteComment author={author} currentComment={currentComment} />);
    const user = userEvent.setup();
    const deleteBtn = screen.getByLabelText("delete-btn");

    await user.click(deleteBtn);
  };
  it("should render delete comment button", async () => {
    renderComponent();
    expect(screen.getByLabelText("delete-btn")).toBeInTheDocument();
  });
  it("should render a modal with a `Delete comment` title", async () => {
    await clickDelete();
    expect(screen.getByText(/delete comment/i)).toBeInTheDocument();
  });
  it("should render a modal with a question assuring if user wants to remove a comment", async () => {
    await clickDelete();
    expect(screen.getByText(/sure/i)).toBeInTheDocument();
  });
  it("should render a modal with a cancel button", async () => {
    await clickDelete();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });
  it("should render a modal with a delete button", async () => {
    await clickDelete();
    expect(screen.getByText(/delete this comment/i)).toBeInTheDocument();
  });
  it("should close the modal on cancel", async () => {
    await clickDelete();
    const cancelBtn = screen.getByText(/cancel/i);

    const user = userEvent.setup();
    await user.click(cancelBtn);

    expect(screen.queryByText(/delete comment/i)).not.toBeInTheDocument();
  });
  it("should send a delete request on clicking `delete this comment`", async () => {
    await clickDelete();
    const deleteBtn = screen.getByText(/delete this comment/i);

    const user = userEvent.setup();
    await user.click(deleteBtn);

    expect(axios.delete).toHaveBeenCalledWith(
      `/api/comments/${currentComment.id}`
    );
  });
});
