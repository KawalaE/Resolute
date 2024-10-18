import EditButton from "@/app/issues/[id]/_components/EditButton";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { describe, expect, it } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

describe("EditButton", () => {
  const renderComponent = () => {
    render(<EditButton issueId={data[0].id} />, {
      wrapper: MemoryRouterProvider,
    });
  };
  it("should render a button with edit name", () => {
    renderComponent();
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });
  it("should change path to include the id of the issue on click", async () => {
    renderComponent();

    const editBtn = screen.getByText(/edit/i);

    const user = userEvent.setup();
    await user.click(editBtn);

    expect(mockRouter.asPath).toEqual(`/issues/${data[0].id}/edit`);
  });
});
