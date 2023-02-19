export interface CreateCampaignFormValues {
  title: string;
  category: string;
  description: string;
  story: string;
  goal: number;
  image: File | null;
  endDate: Date;
}
