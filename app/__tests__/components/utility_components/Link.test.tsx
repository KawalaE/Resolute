import { Link } from "@/app/_utility_components";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { describe, expect, it } from "vitest";

describe("Link", () => {
  it("should render link with correct label", () => {
    render(<Link href="/" label={"label"} />, {
      wrapper: MemoryRouterProvider,
    });
    expect(screen.getByText(/label/i)).toBeInTheDocument();
  });
  it("is should re-route to given adress after click", async () => {
    render(<Link href="/new-path" label={"label"} />, {
      wrapper: MemoryRouterProvider,
    });

    const linkButton = screen.getByText(/label/i);
    const user = userEvent.setup();

    await user.click(linkButton);
    expect(mockRouter.asPath).toEqual("/new-path");
  });
});
