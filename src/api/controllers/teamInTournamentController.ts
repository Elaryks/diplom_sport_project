import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { TeamInTournamentModel } from "../models/teamInTournamentModel";

export class TeamInTournamentController extends ApiControllerCrud<TeamInTournamentModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "teamInTournament");
  }
}
