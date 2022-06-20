import { GameModel } from "./gameModel";

export type TournamentModel = {
  id?: number;
  name?: string;
  address?: string;
  userId?: number;
  games?: GameModel[];
  createdAt?: Date;
  updatedAt?: Date;
};
