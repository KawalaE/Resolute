import IssueForm from "@/app/issues/[id]/_components/IssueForm";
import { Theme } from "@radix-ui/themes";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

//mock markdown-editior - internal library issue
vi.mock("@uiw/react-markdown-editor", () => ({
  __esModule: true,
  default: () => <div data-testid="markdown-editor" />,
}));

//in e2e test we will have more comprenehsive tests
// to account for the markdown-edition issue

describe("IssueForm - no issue", () => {
  const renderComponent = () => {
    render(<IssueForm />, { wrapper: Theme });
  };
  it("should render a issue form title - add new issue", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
  });
  it("should render a issue form priority selector - add new issue", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  it("should render a issue form submit button - add new issue", () => {
    renderComponent();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });
});
describe("IssueForm - issue", () => {
  const renderComponent = () => {
    render(<IssueForm issue={data[0]} />, { wrapper: Theme });
  };
  it("should render a issue form title - update issue", () => {
    renderComponent();
    expect(screen.getByDisplayValue(data[0].title)).toBeInTheDocument();
  });
  it("should render a issue form priority selector - update issue", () => {
    renderComponent();
    expect(screen.getAllByRole("combobox").length).toBe(2);
  });
  it("should render a issue form submit button - update issue", () => {
    renderComponent();
    screen.debug();
    expect(screen.getByText(/update/i)).toBeInTheDocument();
  });
});
