import UpdateComment from "@/app/issues/[id]/_components/UpdateComment";
import { Comment, User } from "@prisma/client";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useSession } from "next-auth/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { comments, users } from "../../__mocks__/dataBaseMock";

describe("UpdateComment", () => {
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
    render(<UpdateComment author={author} currentComment={currentComment} />);
  };
  const editComment = async () => {
    render(<UpdateComment author={author} currentComment={currentComment} />);
    const user = userEvent.setup();
    const updateBtn = screen.getByLabelText("update-btn");

    await user.click(updateBtn);
  };
  const updateComment = async (update: string) => {
    await editComment();
    const descriptionElement = screen.getByText(currentComment.description);

    const user = userEvent.setup();
    await user.type(descriptionElement, update);

    const updateBtn = screen.getByText(/update/i);

    await user.click(updateBtn);
  };
  it("should render update comment button", async () => {
    renderComponent();
    expect(screen.getByLabelText("update-btn")).toBeInTheDocument();
  });
  it("should render update comment button", async () => {
    await editComment();
    expect(screen.getByText(/edit comment/i)).toBeInTheDocument();
  });
  it("should render current comment description", async () => {
    await editComment();
    expect(screen.getByText(currentComment.description)).toBeInTheDocument();
  });
  it("should render update and cancel button", async () => {
    await editComment();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
  });
  it("should how many characters are left", async () => {
    await editComment();
    const descriptionElement = screen.getByText(currentComment.description);
    const description = descriptionElement.textContent || " ";
    const charsLeft = 500 - description.length;
    expect(
      screen.getByText(`Characters left: ${charsLeft}`)
    ).toBeInTheDocument();
  });
  it("should how many characters are left", async () => {
    await editComment();
    const descriptionElement = screen.getByText(currentComment.description);
    const description = descriptionElement.textContent || " ";
    const charsLeft = 500 - description.length;
    expect(
      screen.getByText(`Characters left: ${charsLeft}`)
    ).toBeInTheDocument();
  });
  it("should send patch request on update", async () => {
    const update = "additional info";
    screen.debug();
    await updateComment(update);
    screen.debug();
    expect(axios.patch).toHaveBeenCalledWith(
      `/api/comments/${currentComment.id}`,
      {
        description: currentComment.description + update,
      }
    );
  });
});
