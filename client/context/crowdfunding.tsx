import { createContext, ReactNode } from "react";

export const CrowdFundingContext = createContext(null);

export const CrowdFundingProvider = ({ children }: { children: ReactNode }) => {
  return <CrowdFundingContext.Provider value={null}>{children}</CrowdFundingContext.Provider>;
};
