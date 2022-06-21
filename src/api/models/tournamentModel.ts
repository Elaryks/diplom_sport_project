import { GameModel } from "./gameModel";
import { UserModel } from "./userModel";

export type TournamentModel = {
  id?: number;
  name?: string;
  address?: string;
  userId?: number;
  games?: GameModel[];
  creator?: UserModel;
  createdAt?: Date;
  updatedAt?: Date;
};
