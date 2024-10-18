import AssigneeSelector from "@/app/issues/[id]/_components/AssigneeSelector";
import useUsers from "@/app/issues/[id]/_components/useUsers";
import ReactQueryClientProvider from "@/app/ReactQueryClientProvider";
import { User } from "@prisma/client";
import { Theme } from "@radix-ui/themes";
import { UseQueryResult } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { data } from "../../__mocks__/dataBaseMock";

vi.mock("@/app/issues/[id]/_components/useUsers");
vi.mock("axios");

type UseUsersReturnType = UseQueryResult<User[], unknown>;
type CustomWrapperProps = {
  children: ReactNode;
};

const CustomWrapper: React.FC<CustomWrapperProps> = ({ children }) => {
  return (
    <Theme>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </Theme>
  );
};

describe("AssigneeSelector", () => {
  const loadedData: User[] = [
    {
      id: "0",
      name: "John",
      email: "john.doe@gmail.com",
      emailVerified: null,
      image: "john.png",
    },
  ];

  vi.mocked(useUsers).mockReturnValue({
    data: undefined,
    isLoading: true,
    error: null,
  } as UseUsersReturnType);
  const renderComponent = () => {
    render(<AssigneeSelector issue={data[0]} />, {
      wrapper: CustomWrapper,
    });
  };

  it("should show loading state initially", () => {
    renderComponent();

    const skeleton = document.querySelector(".react-loading-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render selector element when users are loaded", async () => {
    vi.mocked(useUsers).mockReturnValue({
      data: loadedData,
      isLoading: false,
      error: null,
    } as UseUsersReturnType);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
  it("should render selector element when users are loaded", async () => {
    vi.mocked(useUsers).mockReturnValue({
      data: loadedData,
      isLoading: false,
      error: null,
    } as UseUsersReturnType);

    renderComponent();

    const user = userEvent.setup();
    const selector = await screen.findByRole("combobox");

    await user.click(selector);
    await waitFor(() => {
      expect(screen.getByText("Unassigned")).toBeInTheDocument();
      expect(screen.getByText(/john/i)).toBeInTheDocument();
    });
  });
  it("should assign the issue to the user", async () => {
    vi.mocked(useUsers).mockReturnValue({
      data: loadedData,
      isLoading: false,
      error: null,
    } as UseUsersReturnType);

    renderComponent();

    const user = userEvent.setup();
    const selector = await screen.findByRole("combobox");

    await user.click(selector);

    const john = screen.getByText(/john/i);
    await user.click(john);

    expect(axios.patch).toHaveBeenCalledWith(
      `/api/issues/${loadedData[0].id}`,
      {
        assignedToUserId:
          loadedData[0].id === "unassigned" ? null : loadedData[0].id,
      }
    );
  });
});
