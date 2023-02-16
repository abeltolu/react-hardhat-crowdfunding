import { Layout } from "@/containers/layout";
import {
  Box,
  Container,
  Flex,
  Button,
  Group,
  Image,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TextInput,
  Popover,
  Input,
  Anchor,
} from "@mantine/core";
import { CurrencyEthereum, Folder } from "tabler-icons-react";
import Blockies from "react-blockies";
import { CampaignFunder } from "@/components/campaign/funder";

//section with image and details about the campaign
//section with campaign story, donations, and then pledge
export default function Campaign() {
  return (
    <Layout>
      <Container>
        <SimpleGrid
          cols={2}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2, spacing: "sm" },
            { maxWidth: "sm", cols: 1, spacing: "sm" },
          ]}
          mb="lg"
        >
          <Image src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=8" />
          <Stack spacing={"md"}>
            <Stack spacing={"sm"}>
              <Stack spacing={0}>
                <Group spacing={"xs"} mb="0">
                  <Folder size={14} />
                  <Text size={"xs"} color={"dimmed"}>
                    Education
                  </Text>
                </Group>
                <Title order={2}>Norway Fjord Adventures</Title>
              </Stack>
              <Text size={"sm"}>
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
                around the fjords of Norway.
              </Text>
            </Stack>
            <Progress size="sm" value={40} />
            <Group grow>
              <Flex direction={"column"}>
                <Text size={"lg"} weight={"bold"} color="violet">
                  3.5Eth
                </Text>
                <Text size={"xs"} color="dimmed">
                  Raised of 2.0Eth
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text size={"lg"} weight={"bold"} color="violet">
                  173
                </Text>
                <Text size={"xs"} color="dimmed">
                  Total Backers
                </Text>
              </Flex>
              <Flex direction={"column"}>
                <Text size={"lg"} weight={"bold"} color="violet">
                  30
                </Text>
                <Text size={"xs"} color="dimmed">
                  Days Left
                </Text>
              </Flex>
            </Group>

            <Popover width="target" trapFocus position="bottom" withArrow shadow="xl">
              <Popover.Target>
                <Button variant="light">Pledge to Campaign</Button>
              </Popover.Target>
              <Popover.Dropdown
                sx={(theme) => ({ background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white })}
              >
                <Stack>
                  <Text>Pledge without a reward</Text>
                  <Input icon={<CurrencyEthereum size={14} color="violet" />} placeholder="Amount" />
                  <Group>
                    <Button>Submit</Button>
                  </Group>
                </Stack>
              </Popover.Dropdown>
            </Popover>
            <Group>
              <Text size={"sm"}>
                To pledge to this campaign, please{" "}
                <Anchor component="button" type="button" color="violet" variant="text">
                  connect your wallet
                </Anchor>
                .{" "}
              </Text>
            </Group>

            <Stack spacing={"xs"}>
              <Group align={"center"} spacing="xs">
                <Blockies seed={"Ox"} size={8} scale={3} className={"rounded-full"} />
                <Text size={"sm"}>
                  by{" "}
                  <Text weight={"bold"} component="span">
                    Ox24399...23323
                  </Text>
                </Text>
              </Group>
              <Text size={"xs"} color="dimmed">
                This project will only be funded if it reaches its goal by Thu, March 16 2023 12:59 PM CET.
              </Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        <Stack spacing={"xs"} mb="lg">
          <Title order={3}>Story</Title>
          <Text size={"sm"}>
            Clementine Collective houses ethically made, sustainably sourced dolls designed with passion and care. Our
            sweet dolls are lovingly knit with premium, natural cotton and make the best companions for your little
            darling's everyday cuddles and adventures. Clementine dolls are reminders of the simple joys of childhood -
            they turn every day moments into lasting memories. Our timeless dolls are made with beautiful, soft textures
            to open your child's senses and imagination.
          </Text>
        </Stack>
        <Stack spacing={"xs"}>
          <Title order={3}>Funders</Title>
          <Stack>
            {Array(5)
              .fill("*")
              .map((_, index) => (
                <CampaignFunder
                  key={index}
                  amount={"2.34 ETH"}
                  address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
                  createdAt="Thu, March 16 2023 12:59 PM CET"
                  message="This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has water spouts that protrude from its shell. The water spouts are very accurate."
                />
              ))}
          </Stack>
        </Stack>
      </Container>
    </Layout>
  );
}
