import { Card, Image, Text, Stack, Flex, Group, useMantineTheme } from "@mantine/core";
import { Folder } from "tabler-icons-react";
import Blockies from "react-blockies";
import Link from "next/link";

export const CampaignCard = () => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder component={Link} href="/details/1">
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Stack mt="md" mb="sm" spacing={0}>
        <Group spacing={"xs"} mb="0">
          <Folder size={14} />
          <Text size={"xs"} color={"dimmed"}>
            Education
          </Text>
        </Group>
        <Text weight={"bolder"}>Norway Fjord Adventures</Text>
      </Stack>

      <Text size="xs" color="dimmed" mb={"sm"}>
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      <Group grow mb={"sm"}>
        <Flex direction={"column"}>
          <Text size={"xs"} weight={"bold"}>
            3.5Eth
          </Text>
          <Text size={"xs"} color="dimmed">
            Raised of 2.0Eth
          </Text>
        </Flex>
        <Flex direction={"column"}>
          <Text size={"xs"} weight={"bold"}>
            3.5Eth
          </Text>
          <Text size={"xs"} color="dimmed">
            Raised of 2.0Eth
          </Text>
        </Flex>
      </Group>
      <Group align={"center"} spacing="xs">
        <Blockies seed={"Ox"} size={8} scale={3} className={"rounded-full"} />
        <Text size={"xs"}>
          by{" "}
          <Text weight={"bold"} component="span">
            Ox24399...23323
          </Text>
        </Text>
      </Group>
    </Card>
  );
};
