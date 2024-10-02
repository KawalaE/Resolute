"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Reset } from "./ResetFilters";

const IssuesSearchBar = ({ reset, resetHandler }: Reset) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phrase, setPhrase] = useState("");

  //reset
  useEffect(() => {
    if (reset) setPhrase("");
  }, [reset]);

  const handler = (value: string) => {
    setPhrase(value);
    resetHandler(false);
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
      value={phrase}
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
function sanitizeHtml(
  comment: any,
  arg1: { allowedTags: any; allowedAttributes: any; disallowedTagsMode: string }
) {
  throw new Error("Function not implemented.");
}
