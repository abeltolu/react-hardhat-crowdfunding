import { MainHeader } from "@/components/header/header";
import { CampaignsList } from "@/containers/home/campaigns";
import { Layout } from "@/containers/layout";
import { Box } from "@mantine/core";

//header
//logo
//search bar
//start a campaign -> connect wallet
//blockie icon with dropdown
//campaigns

export default function Home() {
  return (
    <Layout>
      <CampaignsList />
    </Layout>
  );
}
