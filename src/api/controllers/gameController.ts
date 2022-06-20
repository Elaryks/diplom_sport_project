import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { GameModel } from "../models/gameModel";

export class GameController extends ApiControllerCrud<GameModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "game");
  }
}
