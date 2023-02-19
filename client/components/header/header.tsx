import { Button, Container, Flex, Group, Header, Input, Text, MediaQuery, Anchor } from "@mantine/core";
import { Search } from "tabler-icons-react";
import Link from "next/link";
import { useCrowdFundingContext } from "@/hooks/useContext";
import { shortenAddress } from "@/utils/dapp";
import Blockies from "react-blockies";
import { CreateCampaignDrawer } from "../campaign/createCampaign";
import { useState } from "react";

export const MainHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { address, handleConnect, handleDisconnect } = useCrowdFundingContext();
  return (
    <Header height={{}} p="md">
      <Container>
        <Group grow>
          <Flex gap={"md"} align="center">
            <Anchor component={Link} href="/" underline={false}>
              <Text weight={"bold"} size="lg">
                CROWDFUNDR.IO
              </Text>
            </Anchor>
            <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
              <Input radius={"lg"} icon={<Search size={14} />} placeholder="Search campaigns" />
            </MediaQuery>
          </Flex>
          <Flex justify={"flex-end"}>
            {address ? (
              <Group>
                <Button onClick={() => setOpenDrawer(true)}>Start Campaign</Button>
                <Button variant="subtle" onClick={handleDisconnect}>
                  <Group spacing={"xs"}>
                    <Blockies seed={address} size={8} scale={3} className={"rounded-full"} />
                    {shortenAddress(address)}
                  </Group>
                </Button>
              </Group>
            ) : (
              <Button onClick={handleConnect}>Connect Wallet</Button>
            )}
          </Flex>
        </Group>
      </Container>
      <CreateCampaignDrawer opened={openDrawer} toggleOpen={setOpenDrawer} />
    </Header>
  );
};
