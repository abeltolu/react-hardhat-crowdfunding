import { CrowdFunding } from "@/contract/types/CrowdFunding";
import { LoadingOverlay } from "@mantine/core";
import { ethers } from "ethers";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import { useAccount, useConnect, useContract, useDisconnect, useNetwork, useProvider } from "wagmi";
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
  //   const [campaigns, setCampaigns] = useState<CrowdFunding.CampaignSummaryStruct[]>([]);
  //   const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, chainId: chainIdHex, web3 } = useMoralis();
  //   const chainId = useMemo(() => {
  //     return chainIdHex ? parseInt(chainIdHex) : undefined;
  //   }, [chainIdHex]);

  //   const crowdFunderContract = useMemo(() => {
  //     if (!account || !isWeb3Enabled || !web3 || !contractAddress) return undefined;

  //     const signer = web3.getSigner();
  //     const contract = new ethers.Contract(contractAddress, CrowdFundingAbi, signer as unknown as ethers.Signer);
  //     return contract as CrowdFunding;
  //   }, [account, isWeb3Enabled, web3, contractAddress]);
  //   const getCampaigns = useCallback(() => {
  //     if (!crowdFunderContract) return;
  //   }, []);
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
  const crowdFunderContract = useContract({
    address: contractAddress,
    abi: CrowdFundingAbi,
    signerOrProvider: provider,
  }) as CrowdFunding;
  useEffect(() => {
    async function readCampaigns() {
      return await crowdFunderContract.allCampaigns();
    }
    if (crowdFunderContract) {
      console.log({ crowdFunderContract });
      readCampaigns()
        .then((campaigns) => console.log("campaigns === ", campaigns))
        .catch((err) => console.error("Err === ", err));
    }
  }, [crowdFunderContract]);
  console.log({ chain, isConnected, connectors, activeConnector, isConnecting, isLoading });
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
