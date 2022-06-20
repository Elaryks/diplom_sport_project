import { TeamModel } from "./teamModel";

export type TeamInTournamentModel = {
  id?: number;
  teamId?: number;
  tournamentId?: number;
  team?: TeamModel;
  countWins?: number;
  countGames?: number;
  countDefeats?: number;
  points?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
