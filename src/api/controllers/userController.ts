import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { UserModel } from "../models/userModel";

export class UserController extends ApiControllerCrud<UserModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "user");
  }
}
