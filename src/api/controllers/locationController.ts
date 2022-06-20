import { AxiosInstance } from "axios";
import { ApiControllerCrud } from "../helpers";
import { LocationModel } from "../models/locationModel";

export class LocationController extends ApiControllerCrud<LocationModel, any> {
  constructor(cl: AxiosInstance, v: string = "v1") {
    super(cl, v, "location");
  }
}
