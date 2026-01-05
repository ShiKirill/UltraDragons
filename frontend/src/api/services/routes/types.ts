import { IPlace } from "../types";

export interface IRoute {
  id: number;
  title: string;
  icon_url: string;
  sessionId: number;
  userId: number;
  created_at: Date;
  places: IPlace[];
}
