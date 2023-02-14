import { CampaignCard } from "@/components/campaign/card";
import { MainHeader } from "@/components/header/header";
import { CampaignsList } from "@/containers/home/campaigns";
import { Box, Text, Container, SimpleGrid, Title } from "@mantine/core";

//header
//logo
//search bar
//start a campaign -> connect wallet
//blockie icon with dropdown
//campaigns

export default function Home() {
  return (
    <Box>
      <MainHeader />
      <CampaignsList />
    </Box>
  );
}
