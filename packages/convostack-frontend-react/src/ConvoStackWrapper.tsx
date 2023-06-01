import { Provider } from "react-redux";
import store from "./redux";
import "../src/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ConvoStackWrapperProps {
  children: React.ReactNode;
}

const ConvoStackWrapper: React.FC<ConvoStackWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default ConvoStackWrapper;
