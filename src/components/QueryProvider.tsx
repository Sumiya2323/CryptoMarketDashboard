"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import React from "react";
interface QueryProviderProps {
  children: ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
}
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(makeQueryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
