import { CrowdFundingContext } from "@/context/crowdfunding";
import { useContext } from "react";

export const useCrowdFundingContext = () => {
  return useContext(CrowdFundingContext);
};
