import { UserModel } from "./userModel";
import { TeamInTournamentModel } from "./teamInTournamentModel";

export type TeamModel = {
  id?: number;
  name?: string;
  address?: string;
  teamInTournament?: TeamInTournamentModel;
  participants?: UserModel[];
  createdAt?: Date;
  updatedAt?: Date;
};
