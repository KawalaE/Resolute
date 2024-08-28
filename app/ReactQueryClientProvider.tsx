"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClientInstance = new QueryClient();

const ReactQueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClientInstance}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
