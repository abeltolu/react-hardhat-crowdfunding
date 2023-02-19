import { CrowdFundingContext } from "@/context/crowdfunding";
import { CrowdFunding } from "@/contract/types/CrowdFunding";
import { Contract, ContractTransaction } from "ethers";
import { useCallback, useContext, useState } from "react";

export const useCrowdFundingContext = () => {
  return useContext(CrowdFundingContext);
};

type CrowdFundingFunctionName = keyof CrowdFunding["functions"];
export function useContractReadWrite<DataType = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<DataType | null>(null);
  const { crowdFunderContract } = useCrowdFundingContext();
  const fetcher = useCallback(
    async <Name extends CrowdFundingFunctionName>(
      functionName: Name,
      ...args: Parameters<CrowdFunding["functions"][Name]>
    ) => {
      if (!crowdFunderContract) return;

      const fn = crowdFunderContract[functionName] as (
        ...args: Parameters<CrowdFunding["functions"][Name]>
      ) => Promise<ContractTransaction>;

      if (!fn) throw new Error(`Function ${functionName} does not exist in CrowdFunding interface`);

      try {
        setLoading(true);
        const trx = await fn(...args);
        if (trx?.wait) await trx.wait(1);
        setData(trx as DataType);
        return trx;
      } catch (error) {
        setError(error);
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    },
    [crowdFunderContract]
  );
  return { loading, error, data, fetcher };
}
