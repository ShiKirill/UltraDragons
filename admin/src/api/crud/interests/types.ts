export interface IInterest {
  id: number;
  title: string;
  icon_url: string;
}

export type IInterestCreateDto = Omit<IInterest, "id">;
