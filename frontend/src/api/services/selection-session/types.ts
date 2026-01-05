export interface ISelectionSession {
  id: number;
  userId: number;
  created_at: string;
  is_completed: boolean;
  //TODO: will be added later
  session_id?: number;
}

export interface ISelectionSessionCreateDto {
  user_id: number;
  interests_ids: number[];
  city_id: number;
}
