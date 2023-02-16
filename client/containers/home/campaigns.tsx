import { CampaignCard } from "@/components/campaign/card";
import { Text, Container, SimpleGrid, Title } from "@mantine/core";
export const CampaignsList = () => {
  return (
    <Container>
      <Title order={3} mb="lg">
        Campaigns{" "}
        <Text color={"red"} span>
          (4)
        </Text>
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "sm" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        {Array(10)
          .fill("*")
          .map((_, index) => (
            <CampaignCard key={index} />
          ))}
      </SimpleGrid>
    </Container>
  );
};
