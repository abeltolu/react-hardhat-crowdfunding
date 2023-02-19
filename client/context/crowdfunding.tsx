import { CrowdFunding } from "@/contract/types/CrowdFunding";
import { LoadingOverlay } from "@mantine/core";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useConnect, useContract, useDisconnect, useNetwork, useProvider, useSigner } from "wagmi";
import CrowdFundingAbi from "../contract/abi.json";
import contractAddresses from "../contract/addresses.json";

interface CrowdFundingContextProps {
  address: string | undefined;
  contractAddress: string | undefined;
  crowdFunderContract: CrowdFunding | undefined;
  handleConnect: () => Promise<void>;
  handleDisconnect: () => Promise<void>;
}
const Noop = () => Promise.resolve();
export const CrowdFundingContext = createContext<CrowdFundingContextProps>({
  address: undefined,
  contractAddress: undefined,
  crowdFunderContract: undefined,
  handleConnect: Noop,
  handleDisconnect: Noop,
});

export default function CrowdFundingProvider({ children }: { children: ReactNode }) {
  const { chain } = useNetwork();
  const { connector: activeConnector, isConnected, address, isConnecting } = useAccount();
  const { connectors, isLoading, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const contractAddress = useMemo(() => {
    return chain && chain.id && chain.id in contractAddresses
      ? (contractAddresses as Record<string, string[]>)[chain.id][0]
      : undefined;
  }, [chain]);
  const handleConnect = useCallback(async () => {
    const connector = connectors[0];
    if (!connector || !connector.ready) return;
    await connectAsync({ connector });
  }, [connectors]);
  const handleDisconnect = useCallback(async () => {
    await disconnectAsync();
  }, []);
  const provider = useProvider();
  const signer = useSigner();
  const crowdFunderContract = useContract({
    address: contractAddress,
    abi: CrowdFundingAbi,
    signerOrProvider: signer?.data,
  }) as CrowdFunding;

  console.log({ chain, isConnected, connectors, activeConnector, isConnecting, isLoading });
  if (signer.isLoading || !signer.data) return null;
  return (
    <>
      <CrowdFundingContext.Provider
        value={{ address, contractAddress, crowdFunderContract, handleConnect, handleDisconnect }}
      >
        <LoadingOverlay visible={isLoading || isConnecting} />
        {children}
      </CrowdFundingContext.Provider>
    </>
  );
}
