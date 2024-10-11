"use client";
import { Spinner } from "@radix-ui/themes";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MarkdownDisplay = ({
  markdown,
  fontsize,
  contentWidth,
}: {
  markdown: string;
  fontsize?: number;
  contentWidth?: number;
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Spinner />;

  return (
    <MarkdownPreview
      source={markdown}
      style={{
        padding: 8,
        background: "#00000000",
        fontSize: fontsize ? `${fontsize}rem` : `${1}rem`,
        width: contentWidth ? contentWidth : "max-w-full",
      }}
      wrapperElement={{
        "data-color-mode": resolvedTheme === "dark" ? "dark" : "light",
      }}
    ></MarkdownPreview>
  );
};

export default MarkdownDisplay;
