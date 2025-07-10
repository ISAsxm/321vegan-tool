import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createRQClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

export const createRQWrapper = () => {
  const queryClientTest = createRQClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClientTest}>
      {children}
    </QueryClientProvider>
  );
};
