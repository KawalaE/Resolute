import "@testing-library/jest-dom/vitest";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { beforeAll, beforeEach, vi } from "vitest";
import { users } from "./__mocks__/dataBaseMock";

global.ResizeObserver = require("resize-observer-polyfill");
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
  vi.mock("axios");
});
//session mock setup
const author: User = users[0];
beforeEach(() => {
  vi.mocked(useSession).mockReturnValue({
    data: {
      user: {
        id: author.id,
        email: author.email!,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    status: "authenticated", // or "loading" depending on your test case
    update: vi.fn(),
  });
});

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  const { useRouter } = await vi.importActual<
    typeof import("next-router-mock")
  >("next-router-mock");
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return router.pathname;
  });
  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query?.toString());
  });
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

vi.mock("next-auth/react", async () => {
  const originalModule = await vi.importActual<any>("next-auth/react");
  return {
    ...originalModule,
    useSession: vi.fn(),
  };
});
