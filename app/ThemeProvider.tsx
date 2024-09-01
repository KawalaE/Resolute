"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemeContextProvider;
