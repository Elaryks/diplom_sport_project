import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { TeamModel } from "../models/teamModel";

export class TeamController extends ApiControllerCrud<TeamModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "team");
  }

  public async add2tournament(model: TeamModel): Promise<any | null> {
    return await this.process(this.post("add2tournament", { data: model }));
  }
}
