import { shortenAddress } from "@/utils/dapp";
import { Text, Group, Box } from "@mantine/core";
import Blockies from "react-blockies";

interface CampaignFunderProps {
  createdAt: string;
  message: string;
  address: string;
  amount: string;
}

export function CampaignFunder({ createdAt, message, address, amount }: CampaignFunderProps) {
  return (
    <Box>
      <Group position="apart">
        <Group>
          <Blockies seed={address} size={8} scale={4} className={"rounded-full"} />
          <div>
            <Text size="sm">{shortenAddress(address)}</Text>
            <Text size="xs" color="dimmed">
              {createdAt}
            </Text>
          </div>
        </Group>
        <Text size={"sm"} weight={"bold"}>
          {amount}
        </Text>
      </Group>
      <Text pt={"sm"} size="sm">
        {message}
      </Text>
    </Box>
  );
}
