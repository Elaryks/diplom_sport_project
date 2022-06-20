import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { TournamentModel } from "../models/tournamentModel";

export class TournamentController extends ApiControllerCrud<TournamentModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "tournament");
  }
}
