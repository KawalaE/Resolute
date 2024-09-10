"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const IssuesSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phrase, setPhrase] = useState("");

  const handler = (value) => {
    setPhrase(value);
    const params = new URLSearchParams();

    if (phrase) params.set("phrase", phrase);

    ["priority", "status", "orderBy", "count"].forEach((param) => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });
    const query = params.size ? "?" + params.toString() : "";
    router.push("/issues" + query);
  };

  return (
    <TextField.Root
      placeholder="Search the issues…"
      defaultValue={phrase}
      onChange={(e) => {
        handler(e.target.value);
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default IssuesSearchBar;