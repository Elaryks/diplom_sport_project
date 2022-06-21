import { AxiosInstance } from "axios";
import { client } from "../plugins/client";
import {
  AuthController,
  GameController,
  LocationController,
  TeamController,
  TeamInTournamentController,
  TournamentController,
  UserController,
} from "../api/controllers";

class Api {
  public auth: AuthController;
  public user: UserController;
  public location: LocationController;
  public team: TeamController;
  public game: GameController;
  public tournament: TournamentController;
  public teamInTournament: TeamInTournamentController;

  constructor(axios: AxiosInstance) {
    this.auth = new AuthController(axios);
    this.user = new UserController(axios);
    this.location = new LocationController(axios);
    this.team = new TeamController(axios);
    this.game = new GameController(axios);
    this.tournament = new TournamentController(axios);
    this.teamInTournament = new TeamInTournamentController(axios);
  }
}

export const api = new Api(client);
