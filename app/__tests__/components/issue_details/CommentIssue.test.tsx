import CommentIssue from "@/app/issues/[id]/_components/CommentIssue";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

vi.mock("axios");
describe("CommentIssue", () => {
  const charsLimit = 500;
  const renderComponent = () => {
    render(<CommentIssue issueId={data[0].id} />);
  };
  const clickCommentBtn = async () => {
    renderComponent();

    const commentBtn = screen.getByText(/comment/i);

    const user = userEvent.setup();

    await user.click(commentBtn);
  };
  const addComment = async (comment: string) => {
    await clickCommentBtn();
    const commentFiled = screen.getByPlaceholderText(/your comment/i);
    const user = userEvent.setup();

    await user.type(commentFiled, comment);

    const add = screen.getByText(/add/i);

    await user.click(add);
  };
  it("should render comment button", () => {
    renderComponent();
    expect(screen.getByText(/comment/i)).toBeInTheDocument();
  });
  it("should render a cancel and add button", async () => {
    await clickCommentBtn();

    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });
  it("if the comment field is empty, add button should be disabled", async () => {
    await clickCommentBtn();
    expect(screen.getByText(/add/i)).toBeDisabled();
  });
  it("if the comment field is empty, add button should be disabled", async () => {
    await clickCommentBtn();
    expect(screen.getByText(/add/i)).toBeDisabled();
  });
  it("should render text filed after clicking on comment button", async () => {
    await clickCommentBtn();
    expect(screen.getByPlaceholderText(/your comment/i)).toBeInTheDocument();
  });
  it("should enable add comment button after populating comment field", async () => {
    const comment = "comment description";
    const charsLeft = charsLimit - comment.length;
    await addComment(comment);
    waitFor(() => {
      expect(screen.getByText(/add/i)).toBeEnabled();
      expect(
        screen.getByText(`Characters left: ${charsLeft}`)
      ).toBeInTheDocument();
    });
  });
  it("should send an post request to the server upon adding non empty comment", async () => {
    const comment = "comment";
    await addComment(comment);
    waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `/api/issues/${data[0].id}/comments`,
        {
          description: comment,
        }
      );
    });
  });
  it("should not send an post request to the server upon adding empty comment", async () => {
    const comment = " ";
    await addComment(comment);
    waitFor(() => {
      expect(axios.patch).not.toHaveBeenCalledWith(
        `/api/issues/${data[0].id}/comments`,
        {
          description: comment,
        }
      );
    });
  });
});
