import { CampaignsList } from "@/containers/home/campaigns";
import { Layout } from "@/containers/layout";
import { CrowdFunding } from "@/contract/types";
import { useContractReadWrite } from "@/hooks/useContext";
import { useEffect } from "react";

//header
//logo
//search bar
//start a campaign -> connect wallet
//blockie icon with dropdown
//campaigns

export default function Home() {
  const { loading, fetcher, data, error } = useContractReadWrite<Array<CrowdFunding.CampaignSummaryStruct>>();
  useEffect(() => {
    fetcher("allCampaigns");
  }, [fetcher]);

  console.log({ loading, fetcher, data, error });
  return (
    <Layout>
      <CampaignsList />
    </Layout>
  );
}
