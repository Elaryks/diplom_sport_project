import { AxiosInstance } from "axios";
import { client } from "../plugins/cliens";
import { AuthController } from "../api/controllers";

class Api {
  public auth: AuthController;

  constructor(axios: AxiosInstance) {
    this.auth = new AuthController(axios);
  }
}

export const api = new Api(client);
