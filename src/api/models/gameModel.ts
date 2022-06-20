import { TeamInTournamentModel } from "./teamInTournamentModel";

export type GameModel = {
  id?: number;
  team1Id?: number;
  team2Id?: number;
  team1?: TeamInTournamentModel;
  team2?: TeamInTournamentModel;
  countPointsTeam1?: number;
  countPointsTeam2?: number;
  winningTeamId?: number;
  dateEvent?: string;
  tournamentId?: number;
  locationId?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
