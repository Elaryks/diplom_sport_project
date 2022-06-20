import { GameModel } from "./gameModel";

export type LocationModel = {
  id?: number;
  name?: string;
  games?: GameModel[];
  capacity?: number;
  address?: string;
  contact?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
