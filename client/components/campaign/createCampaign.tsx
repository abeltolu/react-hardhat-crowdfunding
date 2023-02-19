import {
  Drawer,
  Select,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
  NumberInput,
  FileInput,
  Group,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, joiResolver } from "@mantine/form";
import Joi from "joi";

interface IProps {
  opened: boolean;
  toggleOpen: (val: boolean) => void;
}
interface IFormValues {
  title: string;
  category: string;
  description: string;
  story: string;
  goal: number;
  image: File | null;
  endDate: Date | null;
}

const createCampaignSchema = Joi.object({
  title: Joi.string().trim().min(5).label("Title"),
  category: Joi.string().required().label("Category"),
  description: Joi.string().trim().min(20).label("Description"),
  story: Joi.string().trim().min(100).label("Story"),
  goal: Joi.number().min(0.01).label("Goal"),
  image: Joi.object().instance(File).required().label("Image"),
  endDate: Joi.date().iso().required().label("End Date"),
});
export const CreateCampaignDrawer = ({ opened, toggleOpen }: IProps) => {
  const theme = useMantineTheme();
  const form = useForm<IFormValues>({
    initialValues: { title: "", category: "", description: "", story: "", goal: 0, image: null, endDate: null },
    validate: joiResolver(createCampaignSchema),
  });
  return (
    <Drawer
      opened={opened}
      onClose={() => toggleOpen(false)}
      position="right"
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      title="Create Campaign"
      padding="xl"
      size="xl"
    >
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput label="Title" placeholder="Write a title" withAsterisk {...form.getInputProps("title")} />
          <Select
            label="Category"
            placeholder="Pick one"
            withAsterisk
            data={[
              "Art",
              "Comics",
              "Crafts",
              "Dance",
              "Design",
              "Fashion",
              "Film & Video",
              "Food",
              "Games",
              "Journalism",
              "Music",
              "Photography",
              "Technology",
              "Theather",
            ]}
            {...form.getInputProps("category")}
          />
          <Textarea
            label="Description"
            placeholder="Short description about this campaign"
            withAsterisk
            maxRows={2}
            {...form.getInputProps("description")}
          />
          <Textarea
            label="Story"
            placeholder="Detailed description and end goal of this campaign"
            withAsterisk
            minRows={4}
            maxRows={8}
            {...form.getInputProps("story")}
          />
          <NumberInput
            min={0}
            label="Goal"
            placeholder="Funding goal"
            withAsterisk
            noClampOnBlur
            hideControls
            parser={(value) => value!.replace(/\ETH\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value!))
                ? `ETH ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                : "ETH "
            }
            {...form.getInputProps("goal")}
          />
          <FileInput
            placeholder="Campaign photo"
            label="Image"
            accept="image/png,image/jpeg"
            withAsterisk
            {...form.getInputProps("image")}
          />
          <DatePicker
            placeholder="Pick date"
            label="End Date"
            withAsterisk
            minDate={new Date()}
            {...form.getInputProps("endDate")}
          />
          <Group position="apart">
            <Button variant="white" p="0" color="red" type="reset" onClick={() => toggleOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </Drawer>
  );
};
