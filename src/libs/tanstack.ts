import { type DefaultOptions, QueryClient } from "@tanstack/react-query";

// 1 minute in milliseconds
const STALE_TIME = 60000;

const options: DefaultOptions = {
  queries: {
    staleTime: STALE_TIME,
  },
};

export const queryClient = new QueryClient({ defaultOptions: options });
