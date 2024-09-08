import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssuesPerPageSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numbers = [5, 10, 15, 20];
  return (
    <Select.Root
      defaultValue={searchParams.get("count") || ""}
      onValueChange={(pageNumber) => {
        const params = new URLSearchParams();
        if (pageNumber && searchParams.get("count"))
          params.set("count", pageNumber);
        if (pageNumber && !searchParams.get("count"))
          params.append("count", pageNumber);
        if (searchParams.get("priority"))
          params.set("priority", searchParams.get("priority")!);
        if (searchParams.get("status"))
          params.set("status", searchParams.get("status")!);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
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
