import { Link } from "@/app/_utility_components";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Link", () => {
  it("should render link with correct label", () => {
    render(<Link href="/" label={"label"} />);

    expect(screen.getByText(/label/i)).toBeInTheDocument();
  });
});
