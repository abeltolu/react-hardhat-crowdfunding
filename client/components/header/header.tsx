import { Button, Container, Flex, Group, Header, Input, Text, MediaQuery } from "@mantine/core";
import { Search } from "tabler-icons-react";

export const MainHeader = () => {
  return (
    <Header height={{}} p="md">
      <Container>
        <Group grow>
          <Flex gap={"md"} align="center">
            <Text weight={"bold"} size="lg">
              CROWDFUNDR.IO
            </Text>
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
