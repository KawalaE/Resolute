import CommentIssue from "@/app/issues/[id]/_components/CommentIssue";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

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
    await clickCommentBtn();
    const commentFiled = screen.getByPlaceholderText(/your comment/i);
    const commentValue = "comment description";
    const charsLeft = charsLimit - commentValue.length;
    const user = userEvent.setup();

    await user.type(commentFiled, commentValue);

    expect(screen.getByText(/add/i)).toBeEnabled();
    expect(
      screen.getByText(`Characters left: ${charsLeft}`)
    ).toBeInTheDocument();
  });
});
