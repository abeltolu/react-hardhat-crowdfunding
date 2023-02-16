import { Button, Container, Flex, Group, Header, Input, Text, MediaQuery, Anchor } from "@mantine/core";
import { Search } from "tabler-icons-react";
import Link from "next/link";

export const MainHeader = () => {
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
            <Button>Connect Wallet</Button>
          </Flex>
        </Group>
      </Container>
    </Header>
  );
};
