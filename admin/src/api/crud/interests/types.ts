export interface IInterest {
  id: string;
  title: string;
  icon_url: string;
}

export type IInterestCreateDto = Omit<IInterest, "id">;
