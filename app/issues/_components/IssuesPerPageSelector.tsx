import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Reset } from "./ResetFilters";

const IssuesPerPageSelector = ({ reset, resetHandler }: Reset) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numbers = [5, 10, 15, 20];
  const [initial, setInitial] = useState(false);
  return (
    <Select.Root
      value={reset || !initial ? "" : searchParams.get("count") || ""}
      defaultValue={searchParams.get("count") || ""}
      onValueChange={(pageNumber) => {
        resetHandler(false);
        setInitial(true);
        const params = new URLSearchParams();
        if (pageNumber) params.set("count", pageNumber);
        ["priority", "status", "orderBy", "phrase"].forEach((param) => {
          const value = searchParams.get(param);
          if (value) params.set(param, value);
        });
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
      <Select.Trigger placeholder={"Issues per page"} />
      <Select.Content>
        {numbers.map((number) => (
          <Select.Item key={number} value={number.toString()}>
            {number}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesPerPageSelector;
