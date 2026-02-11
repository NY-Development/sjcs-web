import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "../lib/queryClient.js";
import { PageError } from "../components/ui/PageError.jsx";

export const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallbackRender={PageError}>{children}</ErrorBoundary>
    </QueryClientProvider>
  );
};
